import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { getCollection } from '@/app/lib/collections';
import CollectionView from '@/app/components/CollectionView';
import { DBCollection } from '@/app/types/types';

export default async function CollectionPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login'); 
  }

  const collection: DBCollection = await getCollection(params.id);

  return (
    <CollectionView collection={collection} />
  );
}