'use client'
import { useRouter } from "next/navigation";
import LinkPreviewList from '@/app/components/LinkPreviewList';
import { DBCollection } from "@/app/types/types";

interface CollectionViewProps {
  collection: DBCollection;
}

export default function CollectionView({ collection }: CollectionViewProps) {
  const router = useRouter();
  
  const { name, linkPreviews } = collection;

  const handleEdit = () => {
    router.push(`/collections/${collection.id}/update`);
  }

  const handleDelete = async () => {
    try {
      const response = await fetch (`/api/collections/${collection.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/collections');
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{name}</h1>
      {linkPreviews && linkPreviews.length > 0 ? (
        <LinkPreviewList linkPreviews={linkPreviews} />
      ) : (
        <p>This collection is empty.</p>
      )}
       <div className="flex gap-5">
          <button 
            className="bg-blue-500 text-white px-5 py-3 rounded-lg self-start"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
              className="bg-red-500 text-white px-5 py-3 rounded-lg"
              onClick={handleDelete}
          >
            Delete
          </button>
        </div>
    </div>
  );
}