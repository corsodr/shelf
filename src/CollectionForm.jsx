// modularize this component 

import { useState } from "react"

const CollectionForm = ({setIsFormOpen, collections, setCollections, activeCollection, setActiveCollection}) => {
    const [name, setName] = useState(activeCollection ? activeCollection.name : '');
    const [links, setLinks] = useState(activeCollection ? activeCollection.links : ['']);

    // should I use useEffect here? 
    const fetchLinkPreviews = async (links) => {
        const previews = {};
        // review this and compare to how I'd use setTimeout
        const delay = ms => new Promise(res => setTimeout(res, ms));

        for (const link of links) {
            try {
                const response = await fetch(`https://api.linkpreview.net/?key=[407b1bbc6ac4f9a2ecdd9a2aaad59bf5]&q=${link}`);
                const data = await response.json();
                previews[link] = data;
            } catch (error) {
                console.error("Error fetching link preview:", error);
                // review error
                previews[link] = { error: true };
            }

            await delay(1000); 
        }
        return previews;
    }


       

    const saveCollection = async (e) => {
        e.preventDefault();

        const previews = await fetchLinkPreviews(links);

        if (activeCollection) {
            // Update existing collection
            const updatedCollections = collections.map(collection => 
                collection === activeCollection ? {...collection, name, links, previews} : collection
            );
            setCollections(updatedCollections);
            setActiveCollection({ ...activeCollection, name, links, previews });
        } else {
            // Add new collection
            const newCollection = { name, links, previews };
            setCollections(prevCollections => [...prevCollections, newCollection]);
            setActiveCollection(newCollection);
        }
        setIsFormOpen(false)
        setName('');
        setLinks(['']);
    };

    const deleteCollection = () => {
        const index = collections.indexOf(activeCollection);
        const newCollections = collections.filter(collection => collection !== activeCollection);
        setCollections(newCollections);

        // Adjust the active collection
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

    return (
        <>
            <form onSubmit={saveCollection} className="collection-form">
                <input 
                    type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            {links.map((link, index) => (
                <input 
                    key={index}
                    type="text"
                    placeholder="Item"
                    value={link}
                    onChange={(e) => linkChange(index, e.target.value)}
                />
            ))}
            <button type="button" onClick={addLink}>Add item</button>
            <div className="save-delete-buttons">
                 <button type="submit">Save</button>
                 <button onClick={deleteCollection}>Delete</button>
            </div>
    </form>

        </>
    )
}

export default CollectionForm