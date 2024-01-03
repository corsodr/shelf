import { useState } from "react"

const CollectionForm = ({ setIsFormOpen, collections, setCollections, activeCollection, setActiveCollection }) => {
    // review activeCollection data flow 
    const [name, setName] = useState(activeCollection ? activeCollection.name : '');
    const [links, setLinks] = useState(activeCollection ? activeCollection.links : ['']);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLinkPreviews = async (links, existingPreviews = {}) => {
        const previews = { ...existingPreviews };
        const delay = ms => new Promise(res => setTimeout(res, ms));
    
        for (const link of links) {
            if (!previews[link]) {
                try {
                    const apiKey = import.meta.env.VITE_LINK_PREVIEW_API_KEY;
                    console.log(apiKey)
                    const response = await fetch(`https://api.linkpreview.net/?key=${apiKey}&q=${link}`);
                    const data = await response.json();
                    previews[link] = data;
                } catch (error) {
                    console.error("Error fetching link preview:", error);
                    previews[link] = { error: true };
                }
                await delay(1000); 
            }
        }
        return previews;
    };

    const saveCollection = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const existingPreviews = activeCollection ? activeCollection.previews : {};
        const previews = await fetchLinkPreviews(links, existingPreviews);

        if (activeCollection) {
            const updatedCollections = collections.map(collection => 
                collection === activeCollection ? {...collection, name, links, previews} : collection
            );
            setCollections(updatedCollections);
            setActiveCollection({ ...activeCollection, name, links, previews });
        } else {
            const newCollection = { name, links, previews };
            setCollections(prevCollections => [...prevCollections, newCollection]);
            setActiveCollection(newCollection);
        }

        setIsLoading(false)
        setIsFormOpen(false);
        setName('');
        setLinks(['']);
    };

    const deleteCollection = () => {
        const index = collections.indexOf(activeCollection);
        const newCollections = collections.filter(collection => collection !== activeCollection);
        setCollections(newCollections);

        if (newCollections.length > 0) {
            if (index > 0) {
                setActiveCollection(newCollections[index - 1]);
            } else {
                setActiveCollection(newCollections[0]);
            }
        } else {
            setActiveCollection(null);
        }
        
        setIsFormOpen(false);
    };

    const addLink = () => {
        setLinks([...links, ''])
    }

    const linkChange = (index, value) => {
        const newLinks = [...links]
        newLinks[index] = value
        setLinks(newLinks)
    }

    const deleteItem = (index) => {
        const newLinks = links.filter((_, idx) => idx !== index);
        setLinks(newLinks);
    }

    return (
        <>  
            {!isLoading ? (
                <form onSubmit={saveCollection} className="collection-form">
                    <input 
                        type="text" 
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {links.map((link, index) => (
                        <div className="item-input-container" key={index}>
                            <input 
                                className="item-input"
                                type="url"
                                placeholder="Item"
                                value={link}
                                onChange={(e) => linkChange(index, e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => deleteItem(index)}>X</button>
                        </div>
                    ))}
                    <button type="button" onClick={addLink}>Add item</button>
                    <div className="save-delete-buttons">
                        <button type="submit">Save</button>
                        <button onClick={deleteCollection}>Delete</button>
                    </div>
                </form>
            ) : (
                <p className="notification">Loading...</p>
            )}
        </>
    )
}

export default CollectionForm