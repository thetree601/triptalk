import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// HTTP Link 설정
const httpLink = createHttpLink({
  uri: '/api/graphql',
});

// 에러 처리 Link (간단한 버전)
const errorLink = onError((error) => {
  console.error('GraphQL Error:', error);
});

// 캐시 설정
const cache = new InMemoryCache({
  typePolicies: {
    Board: {
      fields: {
        // Board 타입의 캐시 정책
        likeCount: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        dislikeCount: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
    Query: {
      fields: {
        // 페이지네이션 캐시 정책
        fetchBoards: {
          keyArgs: ['page', 'search', 'startDate', 'endDate'],
          // 동일한 페이지 요청 시 항상 서버 응답으로 교체하여 중복 누적 방지
          merge(existing, incoming) {
            return incoming;
          },
        },
        // 인기 게시글 캐시 정책
        fetchBoardsOfTheBest: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// Apollo Client 생성
export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// 타입 정의
export interface Board {
  _id: string;
  writer?: string;
  title: string;
  contents: string;
  youtubeUrl?: string;
  likeCount: number;
  dislikeCount: number;
  images?: string[];
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface FetchBoardsVariables {
  endDate?: string;
  startDate?: string;
  search?: string;
  page?: number;
}

export interface FetchBoardsResponse {
  fetchBoards: Board[];
}

export interface FetchBoardsOfTheBestResponse {
  fetchBoardsOfTheBest: Board[];
}
