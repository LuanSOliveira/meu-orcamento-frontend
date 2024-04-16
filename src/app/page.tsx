'use client';

import { useToastify } from '@/hooks/Toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main>
      <p onClick={() => useToastify.error('teste')}>teste</p>
    </main>
  );
}
