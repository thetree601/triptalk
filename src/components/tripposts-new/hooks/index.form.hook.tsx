"use client";

import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { CREATE_BOARD, type CreateBoardInput, type CreateBoardResponse } from '@/lib/graphql/mutations/boards';
import { URL_UTILS } from '@/commons/constants/url';
import { FETCH_BOARDS, FETCH_BOARDS_OF_THE_BEST } from '@/lib/graphql/queries/boards';

// 폼 스키마: 필수(작성자, 비밀번호, 제목, 내용), 선택(주소, 유튜브, 이미지)
const formSchema = z.object({
  writer: z.string().min(1, '작성자를 입력해 주세요.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
  title: z.string().min(1, '제목을 입력해 주세요.'),
  contents: z.string().min(1, '내용을 입력해 주세요.'),
  zipcode: z.string().optional().or(z.literal('')),
  address1: z.string().optional().or(z.literal('')),
  address2: z.string().optional().or(z.literal('')),
  youtube: z.string().url('유효한 URL을 입력해 주세요.').optional().or(z.literal('')),
  images: z.array(z.instanceof(File)).optional(),
});

export type TripPostNewForm = z.infer<typeof formSchema>;

export interface UseTripPostNewFormResult {
  register: ReturnType<typeof useForm<TripPostNewForm>>['register'];
  handleSubmit: ReturnType<typeof useForm<TripPostNewForm>>['handleSubmit'];
  formState: ReturnType<typeof useForm<TripPostNewForm>>['formState'];
  errors: ReturnType<typeof useForm<TripPostNewForm>>['formState']['errors'];
  setValue: ReturnType<typeof useForm<TripPostNewForm>>['setValue'];
  onSubmit: (values: TripPostNewForm) => Promise<void>;
  isSubmitting: boolean;
  // 주소 검색
  isPostcodeOpen: boolean;
  openPostcode: () => void;
  closePostcode: () => void;
  onPostcodeComplete: (data: { zonecode?: string; address?: string }) => void;
  // 이미지 업로드 미리보기
  fileInputRef: React.RefObject<HTMLInputElement>;
  previews: (string | null)[];
  triggerFileSelect: (slotIndex: number) => void;
  onFilesSelected: (files: FileList | null) => void;
  removePreviewAt: (index: number) => void;
}

export function useTripPostNewForm(): UseTripPostNewFormResult {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState,
    setValue,
  } = useForm<TripPostNewForm>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      writer: '',
      password: '',
      title: '',
      contents: '',
      zipcode: '',
      address1: '',
      address2: '',
      youtube: '',
      images: [],
    },
  });

  const errors = formState.errors;

  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null]);
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
  const uploadSlotRef = useRef<number | null>(null);

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const openPostcode = useCallback(() => setIsPostcodeOpen(true), []);
  const closePostcode = useCallback(() => setIsPostcodeOpen(false), []);
  const onPostcodeComplete = useCallback((data: { zonecode?: string; address?: string }) => {
    if (data.zonecode) setValue('zipcode', data.zonecode, { shouldValidate: true });
    if (data.address) setValue('address1', data.address, { shouldValidate: true });
    setIsPostcodeOpen(false);
  }, [setValue]);

  const [createBoardMutation, { loading: isSubmitting }] = useMutation<CreateBoardResponse, { createBoardInput: CreateBoardInput }>(CREATE_BOARD);
  const uploadFileViaFetch = useCallback(async (file: File): Promise<string> => {
    const endpoint = '/api/graphql';
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

    const slotIndex = uploadSlotRef.current;
    if (slotIndex == null) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    const file = Array.from(list)[0];
    if (!file) return;
    if (!allowed.includes(file.type)) return;
    if (file.size > maxSize) return;

    setFiles((prev) => {
      const next = [...prev];
      next[slotIndex] = file;
      // images 폼 값은 null 제거 후 반영
      setValue('images', next.filter(Boolean) as File[], { shouldValidate: true });
      return next;
    });
    setPreviews((prev) => {
      const next = [...prev];
      // 기존 URL revoke는 생략(페이지 이탈 시 브라우저가 회수), 필요하다면 별도 관리
      next[slotIndex] = URL.createObjectURL(file);
      return next;
    });
  }, [setValue]);

  const removePreviewAt = useCallback((index: number) => {
    setPreviews((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setFiles((prev) => {
      const next = [...prev];
      next[index] = null;
      setValue('images', next.filter(Boolean) as File[], { shouldValidate: true });
      return next;
    });
  }, [setValue]);

  const onSubmit = useCallback(async (values: TripPostNewForm) => {
    let imageUrls: string[] = [];
    // 선택된 파일들을 업로드하여 URL 배열 생성
    const selectedFiles = files.filter(Boolean) as File[];
    if (selectedFiles.length > 0) {
      const results = await Promise.all(selectedFiles.map((f) => uploadFileViaFetch(f)));
      imageUrls = results.filter(Boolean);
    }

    const input: CreateBoardInput = {
      writer: values.writer,
      password: values.password,
      title: values.title,
      contents: values.contents,
      youtubeUrl: values.youtube || null,
      images: imageUrls,
      boardAddress: (values.zipcode || values.address1 || values.address2) ? {
        zipcode: values.zipcode || null,
        address: values.address1 || null,
        addressDetail: values.address2 || null,
      } : null,
    };

    const { data } = await createBoardMutation({
      variables: { createBoardInput: input },
      refetchQueries: [
        { query: FETCH_BOARDS, variables: { page: 1 } },
        { query: FETCH_BOARDS_OF_THE_BEST },
      ],
      awaitRefetchQueries: true,
    });
    const createdId = data?.createBoard?._id;
    if (createdId) {
      const path = URL_UTILS.createTripPostDetailPath(createdId);
      router.push(path);
    }
  }, [createBoardMutation, files, router, uploadFileViaFetch]);

  return {
    register,
    handleSubmit,
    formState,
    errors,
    setValue,
    onSubmit,
    isSubmitting,
    isPostcodeOpen,
    openPostcode,
    closePostcode,
    onPostcodeComplete,
    fileInputRef,
    previews,
    triggerFileSelect,
    onFilesSelected,
    removePreviewAt,
  };
}

export default useTripPostNewForm;

