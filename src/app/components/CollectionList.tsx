import Link from 'next/link';
import { getCollections } from '@/app/lib/collections';

export default async function CollectionList() {
  const collections = await getCollections();

  return (
    <nav className="w-80 border-r border-slate-300 overflow-y-auto">
      <div className="flex flex-col justify-center p-4 mt-4">
        <div className="flex justify-center mb-4">
          <Link 
            href="/collections/new" 
            className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-2 px-5 rounded"
          >
            Create
          </Link>
        </div>
        <ul className="space-y-3">
          {collections.map(collection => (
            <li key={collection.id}>
              <Link 
                href={`/collections/${collection.id}`} 
                className="block px-4 py-6 rounded-md text-gray-700 hover:bg-slate-300 transition-colors duration-150 border border-slate-300"
              >
                <h3 className="font-medium">{collection.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}