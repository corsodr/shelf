import { useState } from "react"

const CollectionForm = ({setIsFormOpen, setCollections, setActiveCollection}) => {
    const [name, setName] = useState('')
    const [links, setLinks] = useState([''])

    // does it need the e? 
    const saveCollection = (e) => {
        e.preventDefault();

        const newCollection = { 
            name, 
            links
        };
        
        setCollections(collections => [...collections, newCollection]);
      
        setActiveCollection(newCollection)
        setIsFormOpen(false)
    
        setName('');
        setLinks(['']);
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
                 <button>Delete</button>
            </div>
    </form>

        </>
    )
}

export default CollectionForm