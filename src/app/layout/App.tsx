import React, {useEffect, useState} from 'react';
import './styles.css';
import {Advertisement} from 'app/models/Advertisement';
import {Category} from 'app/models/Category'
import AdvertisementDashboard from 'app/features/advertisements/advertisement-dashboard';
import Header from './Header/header';
import agent from 'app/api/agent';
import LoadingComponent from "./loadingComponent";
import {v4 as uuid} from 'uuid';
import CategoryCreate from "../features/categories/category-create/category-create";

function App() {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [selectedAdvertisement, setSelectedAdvertisement] = useState<Advertisement | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [editCategoryMode, setEditCategoryMode] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        agent.Advertisements.list().then(response => {
            setAdvertisements(response);
            setLoading(false);
        });
    }, [])

    const handleAddSelect = (id: string) => {
        setSelectedAdvertisement(advertisements.find(advertisement => advertisement.id === id));
    }

    const handleAddClose = () => setSelectedAdvertisement(undefined);

    const handleFormOpen = (id?: string) => {
        id ? handleAddSelect(id) : setSelectedAdvertisement({id: 'new'} as Advertisement);
        setEditMode(true);
    }

    const handleFormClose = () => {
        setSelectedAdvertisement(undefined);
        setEditMode(false);
    }

    //kategorijos
    const categoryFormOpen = () => {
        setEditCategoryMode(true);
    }

    const categoryFormClose = () => {
        setEditCategoryMode(false);
    }

    const handleCreateOrEditAdvertisement = (advertisement: Advertisement) => {
        console.log(advertisement);
        const resetState = () => {
            setSubmitting(false);
            setEditMode(false);
            setSelectedAdvertisement(advertisement);
        }

        setSubmitting(true);

        if (advertisement.id === 'new') {
            advertisement.id = uuid();
            agent.Advertisements.create(advertisement).then(() => {
                setAdvertisements([...advertisements, advertisement]);
                resetState();
            });
        } else {
            agent.Advertisements.edit(advertisement).then(() => {
                setAdvertisements([...advertisements.filter(x => x.id !== advertisement.id), advertisement]);
                resetState();
            });
        }
    }

    if (loading) return <LoadingComponent content={'Loading app'}/>

    return (
        <>
            <Header switchCreateAdvertisementState={handleFormOpen} switchCreateCategoryState={categoryFormOpen}/>
            {editCategoryMode ? <CategoryCreate onCreate={() => {}} onClose={categoryFormClose}/>
                : <AdvertisementDashboard advertisements={advertisements} submitting={submitting}
                                          onCreateOrEdit={handleCreateOrEditAdvertisement}
                                          selectedAdvertisement={selectedAdvertisement}
                                          setSelectedAdvertisement={setSelectedAdvertisement}
                                          handleSelectedAdvertisement={handleAddSelect}
                                          handleCancelSelectedAdvertisement={handleAddClose} editMode={editMode}
                                          onFormClose={handleFormClose}/>}
        </>
    );
}

export default App;
