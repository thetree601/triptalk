export function useAuthGuard() {
  // Basic auth guard implementation
  return {
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
    checkPermission: () => true,
  };
}
