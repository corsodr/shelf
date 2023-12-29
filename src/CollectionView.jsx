const CollectionView = ({ activeCollection, setIsFormOpen, setActiveCollection }) => {

  const handleEdit = () => {
    setIsFormOpen(true);
    setActiveCollection(activeCollection);
  };

  const renderLinkItem = (link, index) => {
    const preview = activeCollection.previews[link];
    const hasPreview = preview?.image && preview?.title;

    if (hasPreview) {
      return (
        <a key={index} className="item" href={link}>
          <img src={preview.image} alt={preview.title} />
          <div>
            <p className="item-title">{preview.title}</p>
            <p className="item-source">{new URL(link).hostname}</p>
          </div>
        </a>
      );
    }

    return (
      <a key={index} className="item" href={link}>
        <p className="item-url">{link}</p>
      </a>
    );
  };

  return (
    <div className="collection-view">
      <h1>{activeCollection.name}</h1>
      {activeCollection.links.map((link, index) => renderLinkItem(link, index))}
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default CollectionView;