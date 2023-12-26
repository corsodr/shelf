const CollectionView = ({activeCollection}) => {

  return (
      <div className="collection-view">
      <h1>{activeCollection.name}</h1>

      {activeCollection.links.map((link, index) => (
        // review rendering logic + simplify if possible
        <a key={index} className="item" href={link}>
          {activeCollection.previews[link]?.image && activeCollection.previews[link]?.title ? (
            <>
              <img src={activeCollection.previews[link].image} alt={activeCollection.previews[link].title} />
              <div>
                <p className="link-title">{activeCollection.previews[link].title}</p>
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
