// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/landing');
  }, [router]);

  return null; // Return null since we're redirecting
};

export default Index;