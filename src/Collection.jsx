const Collection = ({collection, onDelete}) => {
    return (
        <div className="collection">
            <h3>{collection.name}</h3>
            {collection.links.map((link, index) => (
                <p key={index}><a href={link} target="_blank" rel="noreferrer" >{link}</a></p>
            ))}
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}

export default Collection