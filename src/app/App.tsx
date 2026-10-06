import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './router';

export function App() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-ivory" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
