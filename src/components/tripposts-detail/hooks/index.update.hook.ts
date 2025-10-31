"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { UPDATE_BOARD, type UpdateBoardInput, type UpdateBoardResponse } from '@/lib/graphql/mutations/boards';
import { FETCH_BOARD } from '@/lib/graphql/queries/boards';
import { URL_UTILS } from '@/commons/constants/url';

const editSchema = z.object({
  writer: z.string().optional(), // 표시만, 비활성화 예정
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
  title: z.string().min(1, '제목을 입력해 주세요.'),
  contents: z.string().min(1, '내용을 입력해 주세요.'),
  zipcode: z.string().optional().or(z.literal('')),
  address1: z.string().optional().or(z.literal('')),
  address2: z.string().optional().or(z.literal('')),
  youtube: z.string().url('유효한 URL을 입력해 주세요.').optional().or(z.literal('')),
  images: z.array(z.instanceof(File)).optional(),
});

export type TripPostEditForm = z.infer<typeof editSchema>;

export interface UseTripPostUpdateFormResult {
  register: ReturnType<typeof useForm<TripPostEditForm>>['register'];
  handleSubmit: ReturnType<typeof useForm<TripPostEditForm>>['handleSubmit'];
  formState: ReturnType<typeof useForm<TripPostEditForm>>['formState'];
  errors: ReturnType<typeof useForm<TripPostEditForm>>['formState']['errors'];
  setValue: ReturnType<typeof useForm<TripPostEditForm>>['setValue'];
  isSubmitting: boolean;
  onSubmit: (values: TripPostEditForm) => Promise<void>;
  // 이미지 업로드 미리보기
  fileInputRef: React.RefObject<HTMLInputElement>;
  previews: (string | null)[];
  triggerFileSelect: (slotIndex: number) => void;
  onFilesSelected: (files: FileList | null) => void;
  removePreviewAt: (index: number) => void;
  // 초기 데이터 세팅 완료 여부
  isInitialized: boolean;
  // 주소 검색
  isPostcodeOpen: boolean;
  openPostcode: () => void;
  closePostcode: () => void;
  onPostcodeComplete: (data: { zonecode?: string; address?: string }) => void;
  setError: ReturnType<typeof useForm<TripPostEditForm>>['setError'];
}

export function useTripPostUpdateForm(boardId: string, initialData?: {
  writer?: string | null;
  title?: string | null;
  contents?: string | null;
  youtubeUrl?: string | null;
  images?: (string | null)[] | null;
  zipcode?: string | null;
  address?: string | null;
  addressDetail?: string | null;
}): UseTripPostUpdateFormResult {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState, setValue, setError } = useForm<TripPostEditForm>({
    resolver: zodResolver(editSchema),
    mode: 'onChange',
    defaultValues: {
      writer: initialData?.writer ?? '',
      password: '',
      title: initialData?.title ?? '',
      contents: initialData?.contents ?? '',
      zipcode: initialData?.zipcode ?? '',
      address1: initialData?.address ?? '',
      address2: initialData?.addressDetail ?? '',
      youtube: initialData?.youtubeUrl ?? '',
      images: [],
    },
  });

  const errors = formState.errors;

  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null]);
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
  const [initialImageUrls, setInitialImageUrls] = useState<(string | null)[]>([null, null, null]);
  const uploadSlotRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const openPostcode = useCallback(() => setIsPostcodeOpen(true), []);
  const closePostcode = useCallback(() => setIsPostcodeOpen(false), []);
  const onPostcodeComplete = useCallback((data: { zonecode?: string; address?: string }) => {
    if (data.zonecode) setValue('zipcode', data.zonecode, { shouldValidate: true });
    if (data.address) setValue('address1', data.address, { shouldValidate: true });
    setIsPostcodeOpen(false);
  }, [setValue]);

  useEffect(() => {
    // 초기 데이터 반영 (prop이 변경될 수 있는 경우 대비)
    setValue('writer', initialData?.writer ?? '');
    setValue('title', initialData?.title ?? '');
    setValue('contents', initialData?.contents ?? '');
    setValue('zipcode', initialData?.zipcode ?? '');
    setValue('address1', initialData?.address ?? '');
    setValue('address2', initialData?.addressDetail ?? '');
    setValue('youtube', initialData?.youtubeUrl ?? '');
    // 기존 이미지 미리보기 반영 (최대 3개)
    const toPublicUrl = (src?: string | null): string | null => {
      if (!src) return null;
      return src.startsWith('http') ? src : `https://storage.googleapis.com/${src}`;
    };
    const initialPreviewUrls = (initialData?.images ?? []).slice(0, 3).map(toPublicUrl);
    const filled = [...initialPreviewUrls, null, null].slice(0, 3);
    setPreviews(filled);
    setInitialImageUrls(filled);
    setIsInitialized(true);
  }, [initialData?.writer, initialData?.title, initialData?.contents, initialData?.zipcode, initialData?.address, initialData?.addressDetail, initialData?.youtubeUrl, initialData?.images, setValue]);

  const [updateBoardMutation, { loading: isSubmitting }] = useMutation<UpdateBoardResponse, { updateBoardInput: UpdateBoardInput; password?: string | null; boardId: string }>(UPDATE_BOARD, {
    refetchQueries: [{ query: FETCH_BOARD, variables: { boardId } }],
    awaitRefetchQueries: true,
  });

  const uploadFileViaFetch = useCallback(async (file: File): Promise<string> => {
    const endpoint = 'https://main-practice.codebootcamp.co.kr/graphql';
    const form = new FormData();
    const operations = JSON.stringify({
      query: 'mutation UploadFile($file: Upload!) { uploadFile(file: $file) { url } }',
      variables: { file: null },
    });
    const map = JSON.stringify({ '0': ['variables.file'] });
    form.append('operations', operations);
    form.append('map', map);
    form.append('0', file, file.name);
    const res = await fetch(endpoint, { method: 'POST', body: form });
    const json = await res.json();
    const url: string | undefined = json?.data?.uploadFile?.url;
    return url ?? '';
  }, []);

  const triggerFileSelect = useCallback((slotIndex: number) => {
    uploadSlotRef.current = slotIndex;
    fileInputRef.current?.click();
  }, []);

  const onFilesSelected = useCallback((list: FileList | null) => {
    if (!list || list.length === 0) return;
    const slotIndex = uploadSlotRef.current; if (slotIndex == null) return;
    const maxSize = 5 * 1024 * 1024; const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    const file = Array.from(list)[0]; if (!file) return;
    if (!allowed.includes(file.type)) return; if (file.size > maxSize) return;
    setFiles((prev) => { const next = [...prev]; next[slotIndex] = file; return next; });
    setPreviews((prev) => { const next = [...prev]; next[slotIndex] = URL.createObjectURL(file); return next; });
    // 새 파일로 교체 시 기존 초기 URL은 제거하여 병합 시 재등장하지 않도록 함
    setInitialImageUrls((prev) => { const next = [...prev]; next[slotIndex] = null; return next; });
  }, []);

  const removePreviewAt = useCallback((index: number) => {
    setPreviews((prev) => { const next = [...prev]; next[index] = null; return next; });
    setFiles((prev) => { const next = [...prev]; next[index] = null; return next; });
    // 사용자가 제거한 슬롯은 기존 이미지도 삭제 대상으로 간주
    setInitialImageUrls((prev) => { const next = [...prev]; next[index] = null; return next; });
  }, []);

  const onSubmit = useCallback(async (values: TripPostEditForm) => {
    // 이미지 업로드 (선택, 슬롯별 업로드)
    const uploadSlots: number[] = [];
    files.forEach((f, idx) => { if (f) uploadSlots.push(idx); });

    const uploadedUrls: Record<number, string> = {};
    if (uploadSlots.length > 0) {
      const results = await Promise.all(uploadSlots.map((slot) => uploadFileViaFetch(files[slot]!)));
      uploadSlots.forEach((slot, i) => {
        const url = results[i];
        if (url) uploadedUrls[slot] = url;
      });
    }

    // 최종 이미지 배열 구성: 업로드된 슬롯은 새 URL, 나머지는 기존 URL 유지
    const finalImages: string[] = [0, 1, 2]
      .map((slot) => uploadedUrls[slot] ?? initialImageUrls[slot])
      .filter((u): u is string => Boolean(u));

    const input: UpdateBoardInput = {
      title: values.title,
      contents: values.contents,
      youtubeUrl: values.youtube || null,
      images: finalImages.length > 0 ? finalImages : undefined,
      boardAddress: (values.zipcode || values.address1 || values.address2) ? {
        zipcode: values.zipcode || null,
        address: values.address1 || null,
        addressDetail: values.address2 || null,
      } : null,
    };

    try {
      const { data } = await updateBoardMutation({ variables: { updateBoardInput: input, password: values.password, boardId } });
      if (data?.updateBoard?._id) {
        alert('수정되었습니다');
        const path = URL_UTILS.createTripPostDetailPath(boardId);
        router.push(path);
      }
    } catch {
      setError('password', { type: 'manual', message: '비밀번호가 틀렸습니다. 재입력해주세요.' });
      return;
    }
  }, [boardId, files, initialImageUrls, router, setError, updateBoardMutation, uploadFileViaFetch]);

  return {
    register,
    handleSubmit,
    formState,
    errors,
    setValue,
    isSubmitting,
    onSubmit,
    fileInputRef,
    previews,
    triggerFileSelect,
    onFilesSelected,
    removePreviewAt,
    isInitialized,
    isPostcodeOpen,
    openPostcode,
    closePostcode,
    onPostcodeComplete,
    setError,
  };
}

export default useTripPostUpdateForm;


