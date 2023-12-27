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
                        setIsFormOpen={setIsFormOpen}
                        collections={collections} 
                        setActiveCollection={setActiveCollection}
                    />
                    <MainContent >
                        {isFormOpen ? (
                            <CollectionForm 
                                setIsFormOpen={setIsFormOpen}
                                collections={collections}
                                setCollections={setCollections}
                                activeCollection={activeCollection}
                                setActiveCollection={setActiveCollection}
                            />
                        ) : activeCollection ? (
                            <CollectionView 
                                activeCollection={activeCollection} 
                                setCollections={setCollections}
                                setIsFormOpen={setIsFormOpen}
                                setActiveCollection={setActiveCollection}
                            />
                        ) : (
                            <p className="notification">No collections</p>
                        )}
                    </MainContent>
                </main>
            </div>      
        </>
    )
}

export default App