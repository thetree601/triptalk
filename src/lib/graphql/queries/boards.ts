import { gql } from '@apollo/client';
import type { 
  FetchBoardsResponse, 
  FetchBoardsVariables, 
  FetchBoardsOfTheBestResponse 
} from '@/lib/apollo/client';

// 오늘 핫한 게시글 조회 쿼리
export const FETCH_BOARDS_OF_THE_BEST = gql`
  query FetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      user {
        _id
        name
        email
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

// 게시글 목록 조회 쿼리 (페이지네이션, 검색, 날짜 필터 지원)
export const FETCH_BOARDS = gql`
  query FetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      user {
        _id
        name
        email
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

// 타입 내보내기
export type { 
  FetchBoardsResponse, 
  FetchBoardsVariables, 
  FetchBoardsOfTheBestResponse 
};
