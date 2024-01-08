const SideBar = ({ setIsFormOpen, collections, setActiveCollection }) => {
    
    return (
        <div className="sidebar">
            <button 
                onClick={() => {
                    setIsFormOpen(true);
                    setActiveCollection(null);
                }}
            >
                Create collection
            </button>
            {collections.map((collection, index) => (
                <div 
                    key={index} 
                    className="collection-card"
                    // review how activeCollection is set to collection 
                    onClick={() => {
                        setActiveCollection(collection);
                        setIsFormOpen(false);
                    }}
                >
                    {collection.name}
                </div>
            ))}
        </div>
    )
} 

export default SideBar