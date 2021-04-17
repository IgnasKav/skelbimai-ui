import React, {useState} from 'react';
import css from './category-create.module.scss';
import {Button} from "@material-ui/core";
import CommonInput from "../../../shared/inputs/common-input-field";
import {Category} from "../../../../app/models/Category";

interface Props {
    onCreate: () => void;
    onClose: () => void;
}

export default function CategoryCreate({onCreate, onClose}: Props) {
    const [categoryName, setCategoryName] = useState("");
    const handleInputChange = (event: any) => {
        setCategoryName(event.target.value);
    }
    return (
        <div className={css.backGround}>
            <div className={css.createCategoryCard}>
                <div className={css.title}>Kategorijos sukūrimas</div>
                <div className={css.form}>
                    <CommonInput name="city" value={categoryName} onChange={handleInputChange} label="Pavadinimas"/>
                </div>
                <div className={css.buttonGroup}>
                    <Button variant="outlined" color="secondary" onClick={() => onClose()}>
                        Atšaukti
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => {onCreate(); alert(categoryName)}}>
                        Sukurti
                    </Button>
                </div>
            </div>
        </div>
    )
}