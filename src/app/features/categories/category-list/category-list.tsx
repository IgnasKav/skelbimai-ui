import React from "react";
import {Category} from "../../../models/Category";
import css from "category-list.module.scss";

interface Props {
    categories: Category[];
    onAddSelect: (id: string) => void;
}

export default function AdvertisementList({ categories, onAddSelect }: Props) {
    return (
        <>
            {categories.map(category => (
                <div className={css.display} onClick={() => onAddSelect(category.id)}>
                    <div> {category} </div>
                </div>
            ))}
        </>
    )
}