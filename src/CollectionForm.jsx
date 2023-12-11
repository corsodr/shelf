import { useState } from "react"

const CollectionForm = ({collections, setCollections}) => {
    const [name, setName] = useState('')
    const [links, setLinks] = useState([''])

    const saveCollection = (e) => {
        e.preventDefault()
        setCollections([...collections, {name, links}]);
        setName('')
        setLinks([''])
    }

    const addLink = () => {
        setLinks([...links, ''])
    }

    const deleteLink = (index) => {
        const newLinks = links.filter((_, idx) => idx !== index)
        setLinks(newLinks)
    }

    const linkChange = (index, value) => {
        const newLinks = [...links]
        newLinks[index] = value
        setLinks(newLinks)
    }

    return (
        <>
            <h1>Create a collection</h1>
            <form onSubmit={saveCollection} className="collection-form">
                <input 
                    type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            {links.map((link, index) => (
                <div key={index}>
                    <input 
                        type="text"
                        placeholder="Link"
                        value={link}
                        onChange={(e) => linkChange(index, e.target.value)}
                    />
                    <button type="button" onClick={() => deleteLink(index)}>X</button>
                </div>
            ))}
            <button type="button" onClick={addLink}>Add link</button>
            <button>Save</button>
    </form>

        </>
    )
}

export default CollectionForm