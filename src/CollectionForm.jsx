// modularize this component 

import { useState } from "react"

const CollectionForm = ({setIsFormOpen, collections, setCollections, setActiveCollection}) => {
    const [name, setName] = useState('')
    const [links, setLinks] = useState([''])

    // should I use useEffect here? 
    const fetchLinkPreviews = async (links) => {
        const previews = {};
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
        }
        return previews;
    }

    const saveCollection = async (e) => {
        e.preventDefault();

        const previews = await fetchLinkPreviews(links);

        const newCollection = { 
            name, 
            links,
            previews
        };

        setCollections(prevCollections => [...prevCollections, newCollection]);
        setActiveCollection(newCollection)
        setIsFormOpen(false)
    
        setName('');
        setLinks(['']);
    };

    // const deleteCollection = (index) => {
    //     const newCollections = collections.filter((_, idx) => idx !== index);
    //     setCollections(newCollections)
    // }

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
                 <button>Delete</button>
            </div>
    </form>

        </>
    )
}

export default CollectionForm