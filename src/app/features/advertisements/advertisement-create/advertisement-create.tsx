import React from 'react';
import css from './advertisement-create.module.scss';
import CommonInput from "app/shared/inputs/common-input-field";
import {Button} from '@material-ui/core';
import {Advertisement} from "app/models/Advertisement";

interface Props {
    advertisement: Advertisement;
    submitting: boolean;
    setAdvertisement: (advertisement: Advertisement | undefined) => void;
    onCreate: (advertisement: Advertisement) => void;
    onClose: () => void;
}

export default function AdvertisementCreateWindow({advertisement, submitting, setAdvertisement, onClose, onCreate}: Props) {

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setAdvertisement({...advertisement, [name]: value});
    }

    return(
        <>
            <div className={css.createAdvertisementCard}>
                <div className={css.title}>Skelbimo pridėjimas</div>
                <div className={css.form}>
                    <CommonInput label="Pavadinimas" name="title" value={advertisement.title} onChange={handleInputChange}/>
                    <div className={css.formRow}>
                        <CommonInput name="city" value={advertisement.city} onChange={handleInputChange} label="Miestas"/>
                        <CommonInput name="category" value={advertisement.category} onChange={handleInputChange} label="Kategorija"/>
                        <CommonInput name="price" value={advertisement.price} onChange={handleInputChange} label="Kaina" type="number"/>
                    </div>
                    <CommonInput name="description" value={advertisement.description} onChange={handleInputChange} className={css.description} label="Aprašymas" type="textarea"/>
                </div>
                <div className={css.buttonGroup}>
                    <Button variant="outlined" color="secondary" onClick={() => onClose()}>
                        Atšaukti
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => onCreate(advertisement)}>
                        Sukurti
                    </Button>
                </div>
            </div>
        </>
    )
}