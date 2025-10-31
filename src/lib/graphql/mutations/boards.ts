import { gql } from '@apollo/client';

// 게시글 생성 뮤테이션 (일반적인 CreateBoard 스키마 가정)
export const CREATE_BOARD = gql`
  mutation CreateBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export interface CreateBoardInput {
  writer: string;
  password: string;
  title: string;
  contents: string;
  youtubeUrl?: string | null;
  images?: string[] | null;
  boardAddress?: {
    zipcode?: string | null;
    address?: string | null;
    addressDetail?: string | null;
  } | null;
}

export interface CreateBoardResponse {
  createBoard: {
    _id: string;
  };
}

// 좋아요/싫어요 뮤테이션 (일반적인 스키마 가정)
export const LIKE_BOARD = gql`
  mutation LikeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export const DISLIKE_BOARD = gql`
  mutation DislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;

export interface LikeBoardResponse { likeBoard: number }
export interface DislikeBoardResponse { dislikeBoard: number }

// 파일 업로드 (단건)
export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export interface UploadFileResponse {
  uploadFile: { url: string };
}

// 게시글 수정 뮤테이션
export const UPDATE_BOARD = gql`
  mutation UpdateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {
    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {
      _id
      title
      contents
      youtubeUrl
      images
      updatedAt
    }
  }
`;

export interface UpdateBoardInput {
  title?: string | null;
  contents?: string | null;
  youtubeUrl?: string | null;
  images?: string[] | null;
  boardAddress?: {
    zipcode?: string | null;
    address?: string | null;
    addressDetail?: string | null;
  } | null;
}

export interface UpdateBoardResponse {
  updateBoard: {
    _id: string;
    title: string;
    contents: string;
    youtubeUrl?: string | null;
    images?: string[] | null;
    updatedAt: string;
  };
}

// 게시글 삭제 뮤테이션
export const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export interface DeleteBoardResponse {
  deleteBoard: string; // ID!
}

