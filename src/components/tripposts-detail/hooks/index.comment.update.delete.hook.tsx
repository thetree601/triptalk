"use client";

import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import {
  UPDATE_BOARD_COMMENT,
  DELETE_BOARD_COMMENT,
  type UpdateBoardCommentInput,
  type UpdateBoardCommentResponse,
  type DeleteBoardCommentResponse,
} from '@/lib/graphql/mutations/boardComments';

export interface InlineErrorMap {
  [commentId: string]: string | undefined;
}

export interface EditStateMap {
  [commentId: string]: {
    isEditing: boolean;
    contents: string;
    rating: number;
    password: string;
  } | undefined;
}

export interface UseTripPostCommentUpdateDeleteResult {
  editState: EditStateMap;
  errors: InlineErrorMap;
  startEdit: (commentId: string, initial: { contents: string; rating: number }) => void;
  cancelEdit: (commentId: string) => void;
  setEditField: (commentId: string, patch: Partial<{ contents: string; rating: number; password: string }>) => void;
  submitEdit: (commentId: string) => Promise<void>;
  deleteComment: (commentId: string, password: string) => Promise<void>;
  isMutating: boolean;
}

export function useTripPostCommentUpdateDelete(onRefetched?: () => void): UseTripPostCommentUpdateDeleteResult {
  const [editState, setEditState] = useState<EditStateMap>({});
  const [errors, setErrors] = useState<InlineErrorMap>({});

  const [updateMutate, { loading: updating }] = useMutation<UpdateBoardCommentResponse, { updateBoardCommentInput: UpdateBoardCommentInput; password?: string | null; boardCommentId: string }>(UPDATE_BOARD_COMMENT);
  const [deleteMutate, { loading: deleting }] = useMutation<DeleteBoardCommentResponse, { password?: string | null; boardCommentId: string }>(DELETE_BOARD_COMMENT);

  const startEdit = useCallback((commentId: string, initial: { contents: string; rating: number }) => {
    setEditState((prev) => ({
      ...prev,
      [commentId]: { isEditing: true, contents: initial.contents, rating: initial.rating, password: '' },
    }));
    setErrors((prev) => ({ ...prev, [commentId]: undefined }));
  }, []);

  const cancelEdit = useCallback((commentId: string) => {
    setEditState((prev) => ({ ...prev, [commentId]: undefined }));
    setErrors((prev) => ({ ...prev, [commentId]: undefined }));
  }, []);

  const setEditField = useCallback((commentId: string, patch: Partial<{ contents: string; rating: number; password: string }>) => {
    setEditState((prev) => {
      const cur = prev[commentId];
      if (!cur) return prev;
      return { ...prev, [commentId]: { ...cur, ...patch } };
    });
  }, []);

  const submitEdit = useCallback(async (commentId: string) => {
    const state = editState[commentId];
    if (!state) return;
    if (!state.password) {
      setErrors((prev) => ({ ...prev, [commentId]: '비밀번호를 입력해 주세요.' }));
      return;
    }
    try {
      await updateMutate({
        variables: {
          updateBoardCommentInput: { contents: state.contents, rating: state.rating },
          password: state.password,
          boardCommentId: commentId,
        },
      });
      setEditState((prev) => ({ ...prev, [commentId]: undefined }));
      setErrors((prev) => ({ ...prev, [commentId]: undefined }));
      onRefetched?.();
    } catch {
      setErrors((prev) => ({ ...prev, [commentId]: '비밀번호가 틀렸습니다. 재입력해주세요.' }));
    }
  }, [editState, onRefetched, updateMutate]);

  const deleteComment = useCallback(async (commentId: string, password: string) => {
    if (!password) {
      setErrors((prev) => ({ ...prev, [commentId]: '비밀번호를 입력해 주세요.' }));
      return;
    }
    try {
      await deleteMutate({ variables: { password, boardCommentId: commentId } });
      setEditState((prev) => ({ ...prev, [commentId]: undefined }));
      setErrors((prev) => ({ ...prev, [commentId]: undefined }));
      onRefetched?.();
    } catch {
      setErrors((prev) => ({ ...prev, [commentId]: '비밀번호가 틀렸습니다. 재입력해주세요.' }));
    }
  }, [deleteMutate, onRefetched]);

  return {
    editState,
    errors,
    startEdit,
    cancelEdit,
    setEditField,
    submitEdit,
    deleteComment,
    isMutating: updating || deleting,
  };
}

export default useTripPostCommentUpdateDelete;


