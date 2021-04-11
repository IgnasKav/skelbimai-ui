import React from 'react';
import css from './category-create.module.scss';
import {Button} from "@material-ui/core";
import CommonInput from "../../../shared/inputs/common-input-field";
import {Category} from "../../../../app/models/Category";
import {Advertisement} from "../../../models/Advertisement";

interface Props {
    onCreate: () => void;
    onClose: () => void;
}

export default function CategoryCreate({onCreate, onClose}: Props) {
    const category = {
        id: "",
        name: ""
    }
    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
    }
    return (
        <div className={css.backGround}>
            <div className={css.createCategoryCard}>
                <div className={css.title}>Kategorijos sukūrimas</div>
                <div className={css.form}>
                    <CommonInput name="city" value={category.name} onChange={handleInputChange} label="Pavadinimas"/>
                </div>
                <div className={css.buttonGroup}>
                    <Button variant="outlined" color="secondary" onClick={() => onClose()}>
                        Atšaukti
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => {onCreate(); alert(category.name)}}>
                        Sukurti
                    </Button>
                </div>
            </div>
        </div>
    )
}