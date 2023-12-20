const SideBar = ({collections, setActiveCollection, setIsFormOpen}) => {
    
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