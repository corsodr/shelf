const CollectionView = ({ setIsFormOpen, activeCollection }) => {

  const renderLinkPreview = (link, index) => {
    const preview = activeCollection.previews[link];
    const hasPreview = preview?.image && preview?.title;

    if (hasPreview) {
      return (
        <a key={index} className="link-container" href={link}>
          {/* why does this div make image widths the same */}
          <div>
            <img className="link-image" src={preview.image} alt={preview.title} />
          </div>
          <div>
            <p className="link-title">{preview.title}</p>
            <p className="link-source">{new URL(link).hostname}</p>
          </div>
        </a>
      );
    }

    return (
      <a key={index} className="link-container" href={link}>
        <p className="link-url">{link}</p>
      </a>
    );
  };

  return (
    <div className="collection-view">
      <h1>{activeCollection.name}</h1>
      {activeCollection.links.map((link, index) => renderLinkPreview(link, index))}
      <button onClick={() => setIsFormOpen(true)}>Edit</button>
    </div>
  );
};

export default CollectionView;