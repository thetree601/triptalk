import { gql } from '@apollo/client';

export const CREATE_BOARD_COMMENT = gql`
  mutation CreateBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {
    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;

export interface CreateBoardCommentInput {
  writer: string;
  password: string;
  contents: string;
  rating: number; // Float in schema; use number in TS
}

export interface CreateBoardCommentResponse {
  createBoardComment: {
    _id: string;
    writer: string;
    contents: string;
    rating: number;
    createdAt: string;
  };
}

export const UPDATE_BOARD_COMMENT = gql`
  mutation UpdateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String
    $boardCommentId: ID!
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      password: $password
      boardCommentId: $boardCommentId
    ) {
      _id
      writer
      contents
      rating
      updatedAt
    }
  }
`;

export interface UpdateBoardCommentInput {
  contents?: string | null;
  rating?: number | null; // Float
}

export interface UpdateBoardCommentResponse {
  updateBoardComment: {
    _id: string;
    writer: string;
    contents: string;
    rating: number;
    updatedAt: string;
  };
}

export const DELETE_BOARD_COMMENT = gql`
  mutation DeleteBoardComment($password: String, $boardCommentId: ID!) {
    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)
  }
`;

export interface DeleteBoardCommentResponse {
  deleteBoardComment: string; // deleted comment id
}


