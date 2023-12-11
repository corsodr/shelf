import CollectionForm from "./CollectionForm"
import Collections from "./Collections";
import { useState } from "react"

const App = () => {
    const [collections, setCollections] = useState([]);

    return (
        <>
            <CollectionForm 
                collections={collections}
                setCollections={setCollections} 
            /> 
            <Collections 
                collections={collections}
                setCollections={setCollections}
            />
        </>
    )
}

export default App