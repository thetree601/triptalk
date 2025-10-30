"use client";

import { useCallback, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apolloClient } from "@/lib/apollo/client";
import { LOGIN_USER } from "@/lib/graphql/mutations/auth";
import { FETCH_USER_LOGGED_IN } from "@/lib/graphql/queries/auth";
import type {
  LoginInput,
  LoginResponse,
  FetchUserLoggedInResponse,
} from "@/lib/graphql/types/auth";
import { useRouter } from "next/navigation";
import { URL_PATHS } from "@/commons/constants/url";
import { useModal } from "@/commons/providers/modal/modal.provider";

const schema = z.object({
  email: z.string().min(1).includes("@", { message: "이메일 형식이 올바르지 않습니다." }),
  password: z.string().min(1, "비밀번호를 입력해 주세요."),
});

export type LoginFormValues = z.infer<typeof schema>;

export default function useLoginForm() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: async (variables: LoginInput) => {
      const { data } = await apolloClient.mutate<LoginResponse>({
        mutation: LOGIN_USER,
        variables,
      });
      return data?.loginUser.accessToken ?? "";
    },
  });

  const fetchUser = useCallback(async (accessToken: string) => {
    const { data } = await apolloClient.query<FetchUserLoggedInResponse>({
      query: FETCH_USER_LOGGED_IN,
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      fetchPolicy: "no-cache",
    });
    if (!data) throw new Error("사용자 정보를 가져오지 못했습니다.");
    return data.fetchUserLoggedIn;
  }, []);

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (values) => {
        try {
          const accessToken = await loginMutation.mutateAsync(values);
          if (!accessToken) throw new Error("로그인에 실패했습니다.");

          localStorage.setItem("accessToken", accessToken);

          const user = await fetchUser(accessToken);
          localStorage.setItem("user", JSON.stringify({ _id: user._id, name: user.name }));

          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("auth:changed"));
          }

          openModal(
            <div>
              <h2 className="text-lg font-semibold mb-4">로그인 되었습니다</h2>
              <p className="mb-6">{`${user.name}님 환영합니다!`}</p>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => {
                    closeModal();
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new Event("auth:changed"));
                    }
                    router.replace(URL_PATHS.TRIPPOSTS);
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          );

          reset();
        } catch {
          openModal(
            <div>
              <h2 className="text-lg font-semibold mb-4">로그인 실패</h2>
              <p className="mb-6">이메일 또는 비밀번호를 확인해 주세요.</p>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          );
        }
      }),
    [handleSubmit, loginMutation, fetchUser, openModal, closeModal, router, reset]
  );

  const isSubmitting = loginMutation.isPending;

  // Fallback: if accessToken exists but user might not, fetch user and show modal once
  useEffect(() => {
    (async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        const alreadyShown = typeof window !== "undefined" ? sessionStorage.getItem("loginModalShown") : "1";
        if (!token || alreadyShown) return;

        const userRaw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
        let user: { _id: string; name?: string } | null = null;

        if (userRaw) {
          user = JSON.parse(userRaw) as { _id: string; name?: string };
        } else {
          const { data } = await apolloClient.query<FetchUserLoggedInResponse>({
            query: FETCH_USER_LOGGED_IN,
            context: { headers: { Authorization: `Bearer ${token}` } },
            fetchPolicy: "no-cache",
          });
          if (!data) throw new Error('사용자 정보를 가져오지 못했습니다.');
          user = data.fetchUserLoggedIn;
          localStorage.setItem("user", JSON.stringify({ _id: user._id, name: user.name }));
        }

        // Mark as shown BEFORE opening modal to avoid effect loop
        sessionStorage.setItem("loginModalShown", "1");
        openModal(
          <div>
            <h2 className="text-lg font-semibold mb-4">로그인 완료</h2>
            <p className="mb-6">{`${user?.name ?? "사용자"}님 환영합니다!`}</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => {
                  closeModal();
                  router.replace(URL_PATHS.TRIPPOSTS);
                }}
              >
                확인
              </button>
            </div>
          </div>
        );
      } catch {
        // ignore
      }
    })();
  }, [openModal, closeModal, router]);

  return {
    register,
    onSubmit,
    isValid,
    isSubmitting,
    errors,
  };
}


