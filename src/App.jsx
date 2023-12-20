import TopBar from "./TopBar"
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import CollectionForm from "./CollectionForm"
import CollectionView from "./CollectionView";
import { useState } from "react"

const App = () => {
    const [collections, setCollections] = useState([]);
    const [activeCollection, setActiveCollection] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <>  
            <div className="wrapper">
                <TopBar /> 
                <main className="main-container">
                    <SideBar 
                        isFormOpen={isFormOpen} 
                        collections={collections} 
                        setActiveCollection={setActiveCollection}
                        setIsFormOpen={setIsFormOpen}
                    />
                    {/* review this: */}
                    <MainContent >
                        {isFormOpen ? (
                            <CollectionForm 
                                setCollections={setCollections}
                                setActiveCollection={setActiveCollection}
                                setIsFormOpen={setIsFormOpen}
                            />
                        ) : activeCollection ? (
                            <CollectionView collection={activeCollection} />
                        ) : (
                            <p className="main-empty">No collections</p>
                        )}
                    </MainContent>
                </main>
            </div>      
        </>
    )
}

export default App