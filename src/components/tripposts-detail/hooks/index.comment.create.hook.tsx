"use client";

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { CREATE_BOARD_COMMENT, type CreateBoardCommentInput, type CreateBoardCommentResponse } from '@/lib/graphql/mutations/boardComments';
import { FETCH_BOARD_COMMENTS } from '@/lib/graphql/queries/boardComments';

const schema = z.object({
  writer: z.string().min(1, '작성자를 입력해 주세요.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
  contents: z.string().min(1, '내용을 입력해 주세요.').max(100, '최대 100자까지 입력 가능합니다.'),
});

export type CommentCreateForm = z.infer<typeof schema>;

type FieldRegisterReturn = ReturnType<ReturnType<typeof useForm<CommentCreateForm>>['register']>;

export interface UseTripPostCommentCreateResult {
  writerRegister: FieldRegisterReturn;
  passwordRegister: FieldRegisterReturn;
  contentsRegister: FieldRegisterReturn;
  errors: ReturnType<typeof useForm<CommentCreateForm>>['formState']['errors'];
  isSubmitting: boolean;
  contentsLength: number;
  rating: number;
  setRating: (r: number) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
}

export function useTripPostCommentCreate(boardId: string): UseTripPostCommentCreateResult {
  const { register, handleSubmit, formState, reset, watch, setError } = useForm<CommentCreateForm>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { writer: '', password: '', contents: '' },
  });

  const contentsValue = watch('contents');
  const contentsLength = contentsValue?.length ?? 0;
  const [rating, setRating] = useState<number>(0);

  const [create, { loading: isSubmitting }] = useMutation<CreateBoardCommentResponse, { createBoardCommentInput: CreateBoardCommentInput; boardId: string }>(CREATE_BOARD_COMMENT, {
    refetchQueries: [{ query: FETCH_BOARD_COMMENTS, variables: { boardId, page: 1 } }],
    awaitRefetchQueries: true,
  });

  const onValid = useCallback(async (values: CommentCreateForm) => {
    if (rating < 1 || rating > 5) {
      setError('contents', { type: 'manual', message: '별점을 선택해 주세요.' });
      return;
    }
    const input: CreateBoardCommentInput = {
      writer: values.writer,
      password: values.password,
      contents: values.contents,
      rating,
    };
    await create({ variables: { createBoardCommentInput: input, boardId } });
    reset({ writer: '', password: '', contents: '' });
    setRating(0);
  }, [boardId, create, rating, reset, setError]);

  return {
    writerRegister: register('writer'),
    passwordRegister: register('password'),
    contentsRegister: register('contents'),
    errors: formState.errors,
    isSubmitting,
    contentsLength,
    rating,
    setRating,
    onSubmit: handleSubmit(onValid),
  };
}

export default useTripPostCommentCreate;


