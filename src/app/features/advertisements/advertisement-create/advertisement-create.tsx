import React from 'react';
import css from './advertisement-create.module.scss';
import CommonInput from "app/shared/inputs/common-input-field";
import {Button} from '@material-ui/core';
import {useStore} from "app/stores/store";

export default function AdvertisementCreateWindow() {
    const {advertisementStore} = useStore();
    const {
        selectedAdvertisement: advertisement,
        setSelectedAdvertisement,
        closeEditOrCreateForm,
        createAdvertisement,
        updateAdvertisement
    } = advertisementStore;

    if (!advertisement) return <div>lol</div>;

    const isNew = advertisement.id === 'new';

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setSelectedAdvertisement({...advertisement, [name]: value});
    }

    return (
        <>
            <div className={css.createAdvertisementCard}>
                <div className={css.title}>
                    {isNew ? 'Skelbimo pridėjimas' : 'Skelbimo redagavimas'}
                </div>
                <div className={css.form}>
                    <CommonInput label="Pavadinimas" name="title" value={advertisement.title}
                                 onChange={handleInputChange}/>
                    <div className={css.formRow}>
                        <CommonInput name="city" value={advertisement.city} onChange={handleInputChange}
                                     label="Miestas"/>
                        <CommonInput name="category" value={advertisement.category} onChange={handleInputChange}
                                     label="Kategorija"/>
                        <CommonInput name="price" value={advertisement.price} onChange={handleInputChange} label="Kaina"
                                     type="number"/>
                    </div>
                    <CommonInput name="description" value={advertisement.description} onChange={handleInputChange}
                                 className={css.description} label="Aprašymas" type="textarea"/>
                </div>
                <div className={css.buttonGroup}>
                    <Button variant="outlined" color="secondary" onClick={() => closeEditOrCreateForm()}>
                        Atšaukti
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => isNew? createAdvertisement(advertisement) : updateAdvertisement(advertisement)}>
                        {isNew ? 'Sukurti' : 'Išsaugoti'}
                    </Button>
                </div>
            </div>
        </>
    )
}