import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';

export default function SuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loader2Icon className="size-6 animate-spin" />}>
      {children}
    </Suspense>
  );
}
