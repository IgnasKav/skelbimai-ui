import React, { useEffect, useState } from 'react';
import './styles.css';
import { Advertisement } from 'app/models/Advertisement';
import AdvertisementDashboard from 'app/features/advertisements/advertisement-dashboard';
import Header from './Header/header';
<<<<<<< Updated upstream
import agent from 'app/api/agent';
import LoadingComponent from "./loadingComponent";
import {v4 as uuid} from 'uuid';

function App() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState<Advertisement | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const handleCreateOrEditAdvertisement = (advertisement: Advertisement) => {
    console.log(advertisement);
    const resetState = () => {
      setSubmitting(false);
      setEditMode(false);
      setSelectedAdvertisement(advertisement);
    }

    setSubmitting(true);

    if(advertisement.id === 'new') {
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

  if(loading) return <LoadingComponent content={'Loading app'}/>

  return (
    <>
      <Header switchCreateAdvertisementState={handleFormOpen}/>
      <AdvertisementDashboard advertisements={advertisements} submitting={submitting} onCreateOrEdit={handleCreateOrEditAdvertisement} selectedAdvertisement={selectedAdvertisement} setSelectedAdvertisement={setSelectedAdvertisement} handleSelectedAdvertisement={handleAddSelect} handleCancelSelectedAdvertisement={handleAddClose} editMode={editMode} onFormClose={handleFormClose}/>
    </>
  );
=======
import Search from './Search/search';
import {observer} from "mobx-react-lite";
import {useStore} from 'app/stores/store';
import {Route, Switch} from 'react-router-dom';
import CategoriesDashboard from "app/features/categories/categories-dashboard";
import AdvertisementEditPage from "app/features/advertisements/advertisement-create/advertisement-edit";
import DashBoard from "app/features/dashboard/dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const {advertisementStore, categoryStore} = useStore();

    useEffect(() => {
        advertisementStore.loadAdvertisements();
        categoryStore.loadCategories();
    }, [advertisementStore, categoryStore])

    return (
        <>
            <Header/>
            <Search/>
            <Switch>
                <Route path='/dashboard' component={DashBoard}/>
                <Route path='/categoriesDashboard' component={CategoriesDashboard}/>
                <Route path="/createAdvertisement" component={AdvertisementEditPage}/>
                <Route path="/edit/:advertisementId" component={AdvertisementEditPage}/>
                <Route path='/' component={AdvertisementDashboard}/>
            </Switch>
        </>
    );
>>>>>>> Stashed changes
}

export default App;
