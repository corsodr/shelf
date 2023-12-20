import { useState } from "react"

const CollectionForm = ({setCollections, setActiveCollection, setIsFormOpen}) => {
    const [name, setName] = useState('')
    const [links, setLinks] = useState([''])

    const saveCollection = (e) => {
        e.preventDefault();

        // where do name and links come from 
        const newCollection = { name, links };
        // why pass a function 
        setCollections(collections => [...collections, newCollection]);

        setActiveCollection(newCollection)
        setIsFormOpen(false)
    
        setName('');
        setLinks(['']);
    };

    const addLink = () => {
        setLinks([...links, ''])
    }

    // const deleteLink = (index) => {
    //     const newLinks = links.filter((_, idx) => idx !== index)
    //     setLinks(newLinks)
    // }

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
                // <button type="button" onClick={() => deleteLink(index)}>X</button>
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