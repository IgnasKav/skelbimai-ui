import React, {useState} from 'react';
import css from './category-select-field.module.scss';
import CategorySelectForm from "./category-select-form/category-select-form";
import {Category} from "../../../models/Category";

interface Props {
    label: string;
    name: string;
    onChange: (event: any) => void;
    className?: string;
    value: Category| undefined;
}

export default function SelectInput({className, label, name, onChange, value}: Props) {
    const [selectMode, setSelectMode] = useState(false);

    const closeSelect = (selectedValue: Category | undefined) => {
        setSelectMode(false);
        const event = {
            target: {
                value: selectedValue,
                name: name
            }
        }
        onChange(event);
    }

    return (
        <>
            <div className={[css.inputFieldContainer, className].join(' ')}>
                <div className={css.label}>{label}</div>
                <div className={[css.inputField, selectMode ? css.focused : ''].join(' ')}
                     onClick={() => setSelectMode(true)}>
                    {value?.name}
                </div>
                {selectMode && <CategorySelectForm submit={closeSelect} close={() => setSelectMode(false)}/>}
            </div>
        </>
    )
}