import { useRouter } from 'next/navigation';
import { URL_PATHS } from '@/commons/constants/url';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';

export function useHeaderAuthVisibility() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthGuard();

  const onClickLogin = () => {
    router.push(URL_PATHS.LOGIN);
  };

  const onClickLogout = async () => {
    await Promise.resolve(logout());
  };

  return {
    isAuthenticated,
    userProfileImageUrl: user?.profileImage ?? undefined,
    onClickLogin,
    onClickLogout,
  };
}
