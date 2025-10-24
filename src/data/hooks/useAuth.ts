import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();

  return {
    ...store,
    router,
  };
};

export default useAuth;