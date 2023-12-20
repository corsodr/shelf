const CollectionView = ({collection}) => {

    return (
      <div className="collection-view">
        <h1>{collection.name}</h1>
        
        {collection.links.map((link, index) => (
           <div key={index} className="collection-view-link">
              <a href={link}>{link}</a>
         </div>
        ))}
      </div>
    )
}

export default CollectionView 