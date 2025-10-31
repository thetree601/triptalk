import { gql } from '@apollo/client';

export const FETCH_BOARD_COMMENTS = gql`
  query FetchBoardComments($boardId: ID!, $page: Int) {
    fetchBoardComments(boardId: $boardId, page: $page) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
    }
  }
`;

export interface BoardComment {
  _id: string;
  writer?: string | null;
  contents: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
}

export interface FetchBoardCommentsResponse {
  fetchBoardComments: BoardComment[];
}


