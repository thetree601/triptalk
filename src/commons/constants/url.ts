/**
 * URL 경로에 관한 모든 것을 한 번에 관리하는 상수 파일
 * 다이나믹 라우팅과 링크 이동을 고려하여 설계됨
 */

// 접근 가능 상태 타입
export type AccessStatus = 'public' | 'member-only';

// 노출 가능 목록 타입
export interface VisibilityConfig {
  header: boolean;
  logo: boolean;
  banner: boolean;
}

// URL 경로 정보 타입
export interface RouteInfo {
  path: string;
  accessStatus: AccessStatus;
  visibility: VisibilityConfig;
}

// URL 경로 상수
export const URL_PATHS = {
  // 인증 관련
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  
  // 여행 포스트 관련
  TRIPPOSTS: '/tripposts',
  TRIPPOSTS_DETAIL: '/tripposts/[id]',
  TRIPPOSTS_NEW: '/tripposts/new',
} as const;

// URL 경로별 상세 정보
export const ROUTE_CONFIG: Record<string, RouteInfo> = {
  // 로그인
  [URL_PATHS.LOGIN]: {
    path: URL_PATHS.LOGIN,
    accessStatus: 'public',
    visibility: {
      header: false,
      logo: false,
      banner: false,
    },
  },

  // 회원가입
  [URL_PATHS.SIGNUP]: {
    path: URL_PATHS.SIGNUP,
    accessStatus: 'public',
    visibility: {
      header: false,
      logo: false,
      banner: false,
    },
  },

  // 여행포스트목록
  [URL_PATHS.TRIPPOSTS]: {
    path: URL_PATHS.TRIPPOSTS,
    accessStatus: 'public',
    visibility: {
      header: true,
      logo: true,
      banner: true,
    },
  },

  // 여행포스트상세
  [URL_PATHS.TRIPPOSTS_DETAIL]: {
    path: URL_PATHS.TRIPPOSTS_DETAIL,
    accessStatus: 'member-only',
    visibility: {
      header: true,
      logo: true,
      banner: true,
    },
  },

  // 여행포스트등록
  [URL_PATHS.TRIPPOSTS_NEW]: {
    path: URL_PATHS.TRIPPOSTS_NEW,
    accessStatus: 'member-only',
    visibility: {
      header: true,
      logo: true,
      banner: false,
    },
  },
};

// 유틸리티 함수들
export const URL_UTILS = {
  /**
   * 특정 경로의 설정 정보를 가져옵니다
   */
  getRouteConfig: (path: string): RouteInfo | undefined => {
    return ROUTE_CONFIG[path];
  },

  /**
   * 경로가 공개 접근 가능한지 확인합니다
   */
  isPublicRoute: (path: string): boolean => {
    const config = ROUTE_CONFIG[path];
    return config?.accessStatus === 'public';
  },

  /**
   * 경로가 회원 전용인지 확인합니다
   */
  isMemberOnlyRoute: (path: string): boolean => {
    const config = ROUTE_CONFIG[path];
    return config?.accessStatus === 'member-only';
  },

  /**
   * 헤더가 노출되어야 하는지 확인합니다
   */
  shouldShowHeader: (path: string): boolean => {
    const config = ROUTE_CONFIG[path];
    return config?.visibility.header ?? false;
  },

  /**
   * 로고가 노출되어야 하는지 확인합니다
   */
  shouldShowLogo: (path: string): boolean => {
    const config = ROUTE_CONFIG[path];
    return config?.visibility.logo ?? false;
  },

  /**
   * 배너가 노출되어야 하는지 확인합니다
   */
  shouldShowBanner: (path: string): boolean => {
    const config = ROUTE_CONFIG[path];
    return config?.visibility.banner ?? false;
  },


  /**
   * 다이나믹 라우팅 경로를 생성합니다
   */
  createDynamicPath: (basePath: string, params: Record<string, string | number>): string => {
    let path = basePath;
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`[${key}]`, String(value));
    });
    return path;
  },

  /**
   * 여행포스트 상세 페이지 경로를 생성합니다
   */
  createTripPostDetailPath: (id: string | number): string => {
    return URL_PATHS.TRIPPOSTS_DETAIL.replace('[id]', String(id));
  },
} as const;

// 기본 내보내기
const URL_CONSTANTS = {
  URL_PATHS,
  ROUTE_CONFIG,
  URL_UTILS,
};

export default URL_CONSTANTS;
