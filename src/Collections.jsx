import Collection from "./Collection"

const Collections = ({collections, setCollections}) => {

    const deleteCollection = (index) => {
        const newCollections = collections.filter((_, idx) => idx !== index)
        setCollections(newCollections)
    }

    return (
        <>
            {collections.map((collection, index) => (
                < Collection 
                    key={index}
                    collection={collection}
                    onDelete={() => deleteCollection(index)}
                />
            ))}
        </>
    )
}

export default Collections 