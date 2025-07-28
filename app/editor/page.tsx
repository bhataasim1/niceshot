import { isProUser } from '@/actions/purchase.action';
import { EditorPage } from '@/components/editor-page';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const isPro = await isProUser();

  console.log('isPro', isPro);
  if (!isPro) {
    redirect('/pricing');
  }

  return <EditorPage />;
}
