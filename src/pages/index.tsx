// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /auth/login by default
    router.push('/auth/login');
  }, [router]);

  // Empty or placeholder content for the index page
  return <div>Redirecting...</div>;
};

export default HomePage;
