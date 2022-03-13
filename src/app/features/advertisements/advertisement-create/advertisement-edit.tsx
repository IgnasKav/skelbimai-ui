import React, {useEffect, useState} from 'react';
import css from './advertisement-edit.module.scss';
import CommonInput from "app/shared/inputs/common-input/common-input-field";
import {Button} from '@material-ui/core';
import {useStore} from "app/stores/store";
import SelectInput from "app/shared/inputs/category-input/category-select-field";
import {useNavigate, useParams} from "react-router-dom";
import {Advertisement} from "app/models/Advertisement";
import {HiOutlineDocumentText, HiOutlineGlobe} from "react-icons/hi";
import {observer} from "mobx-react-lite";
import LoadingComponent from "app/layout/loadingComponent";
import TreeSelect from 'app/shared/inputs/tree-select/tree-select';

export default observer(function AdvertisementEditPage() {
    let navigate = useNavigate();
    const {advertisementStore} = useStore();
    const {
        createAdvertisement,
        updateAdvertisement,
        loadAdvertisement
    } = advertisementStore;

    const {advertisementId} = useParams<{ advertisementId: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisement>(new Advertisement());

    useEffect(() => {
        if (advertisementId) loadAdvertisement(advertisementId).then(response => setAdvertisement(response!));
    }, [advertisementId, loadAdvertisement]);

    const isNew = advertisement.id === '';

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setAdvertisement({...advertisement, [name]: value});
    }

    const createOrEditAdvertisement = async () => {
        if(isNew) {
            await createAdvertisement(advertisement);
        } else {
            await updateAdvertisement(advertisement);
        }
        navigate('/advertisementDashboard');
    }

    //loading
    if (advertisementStore.loadingDetails) {
        return (
            <div className={css.dashboard}>
                <div className={css.createAdvertisementCard}>
                    <LoadingComponent/>
                </div>
                <div className={css.preview}>
                    <LoadingComponent/>
                </div>
            </div>
        )
    }

    return (
        <div className={css.dashboard}>
            <div className={css.createAdvertisementCard}>
                <div className={css.title}>
                    {isNew ? 'Skelbimo pridėjimas' : 'Skelbimo redagavimas'}
                </div>
                <div className={css.form}>
                    <CommonInput label="Pavadinimas" name="title" value={advertisement.title}
                                 onChange={handleInputChange}/>
                    <TreeSelect label="Kategorija" multipleSelect={false} value={advertisement.category} onChange={handleInputChange}/>
                    <div className={css.formRow}>
                        <CommonInput name="city" value={advertisement.city} onChange={handleInputChange}
                                     label="Miestas"/>
                        {/*<SelectInput name="category" value={advertisement.category} label="Kategorija"*/}
                        {/*             onChange={handleInputChange}/>*/}
                        <CommonInput name="price" value={advertisement.price} onChange={handleInputChange} label="Kaina"
                                     type="number"/>
                    </div>
                    <CommonInput name="description" value={advertisement.description} onChange={handleInputChange}
                                 className={css.description} label="Aprašymas" type="textarea"/>
                </div>
                <div className={css.buttonGroup}>
                    <Button variant="outlined" color="secondary" onClick={() => navigate('/advertisementDashboard')}>
                        Atšaukti
                    </Button>
                    <Button variant="outlined" color="primary"
                            onClick={() => createOrEditAdvertisement()}>
                        {isNew ? 'Sukurti' : 'Išsaugoti'}
                    </Button>
                </div>
            </div>
            <div className={css.preview}>
                <div className={css.title}>{advertisement.title}</div>
                <div className={css.info}>
                    <div className={css.group}>
                        <HiOutlineGlobe/>
                        <span>{advertisement.city}</span>
                    </div>
                    <span className={css.separator}>&bull;</span>
                    <div className={css.group}>
                        <HiOutlineDocumentText/>
                        <span>{advertisement.category.name}</span>
                    </div>
                </div>
                <div className={css.gallery}>
                    <div className={css.left}></div>
                    <div className={css.right}>
                        <div></div>
                        <div className={css.topRight}></div>
                        <div></div>
                        <div className={css.bottomRight}></div>
                    </div>
                </div>
                <div className={css.price}>Kaina: {advertisement.price == null ? '--' : advertisement.price} €</div>
                <div>{advertisement.description}</div>
            </div>
        </div>
    )
})
