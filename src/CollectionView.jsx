import { useState, useEffect } from 'react';
 
const fetchLinkPreview = async (link, setPreviews) => {
  try {
    const response = await fetch(`https://api.linkpreview.net/?key=[407b1bbc6ac4f9a2ecdd9a2aaad59bf5]&q=${link}`);
    const data = await response.json();
    setPreviews(prev => ({ ...prev, [link]: data }));
    console.log('linkdata: ', data)
  } catch (error) {
    console.error("Error fetching link preview:", error);
    setPreviews(prev => ({ ...prev, [link]: { error: true } }));
  }
};

const CollectionView = ({ collection }) => {
  const [previews, setPreviews] = useState({});

  useEffect(() => {
    // review how setTimeout works
    collection.links.forEach((link, index) => {
      setTimeout(() => {
        if (!previews[link]) {
          fetchLinkPreview(link, setPreviews);
        }
      }, 1000 * index)
    });
  // why this vs []:
  }, [collection.links]);

  return (
    <div className="collection-view">
      <h1>{collection.name}</h1>

      {collection.links.map((link, index) => (
          <a key={index} className="item" href={link}>
            {/* why are the ? necessary  */}
            {previews[link]?.image && previews[link]?.title ? (
              <>
                <img src={previews[link].image} alt={previews[link].title} />
                <div>
                  <p className="link-title">{previews[link].title}</p>
                  <p className="link-source">{new URL(link).hostname}</p>
                </div>
              </>
            ) : (
              <p className="link-url">{link}</p>
            )}
          </a>
      ))}
    </div>
  );
}
export default CollectionView;
