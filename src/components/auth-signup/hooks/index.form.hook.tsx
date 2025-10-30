"use client";
import { useCallback } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CREATE_USER } from '@/lib/graphql/mutations/auth';
import type {
  CreateUserMutationResponse,
  CreateUserMutationVariables,
} from '@/lib/graphql/types/auth';
import { useModal } from '@/commons/providers/modal/modal.provider';
// Using raw div content for modal consistency with login
import { apolloClient } from '@/lib/apollo/client';
import { URL_PATHS } from '@/commons/constants/url';

// Zod schema for signup form
const signupSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 8글자 이상 입력해주세요.')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        '비밀번호는 영문과 숫자를 포함해야 합니다.'),
    confirmPassword: z.string(),
    name: z.string().min(1, '이름은 최소 1글자 이상 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupFormSchema = z.infer<typeof signupSchema>;

export function useSignupForm() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (variables: CreateUserMutationVariables) => {
      const { data } = await apolloClient.mutate<CreateUserMutationResponse, CreateUserMutationVariables>({
        mutation: CREATE_USER,
        variables,
      });
      return data;
    },
  });

  const isSubmitDisabled = !form.formState.isValid || createUserMutation.isPending;

  const onSubmit = useCallback(async (values: SignupFormSchema) => {
    const { email, password, name } = values;
    try {
      const data = await createUserMutation.mutateAsync({
        createUserInput: { email, password, name },
      });
      const createdId = data?.createUser?._id ?? (data as unknown as { _id?: string })?._id;
      console.log('Signup success id:', createdId, 'raw:', data);
      if (createdId) {
        openModal(
          <div>
            <h2 className="text-lg font-semibold mb-4">회원가입 완료</h2>
            <p className="mb-6">회원가입이 완료되었습니다.</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => {
                  closeModal();
                  router.replace(URL_PATHS.LOGIN);
                }}
              >
                확인
              </button>
            </div>
          </div>
        );
      } else {
        openModal(
          <div>
            <h2 className="text-lg font-semibold mb-4">회원가입 실패</h2>
            <p className="mb-6">일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={() => closeModal()}
              >
                확인
              </button>
            </div>
          </div>
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      openModal(
        <div>
          <h2 className="text-lg font-semibold mb-4">회원가입 실패</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              onClick={() => closeModal()}
            >
              확인
            </button>
          </div>
        </div>
      );
    }
  }, [createUserMutation, openModal, closeModal, router]);

  return {
    form,
    onSubmit,
    isSubmitting: createUserMutation.isPending || form.formState.isSubmitting,
    isSubmitDisabled,
  };
}


