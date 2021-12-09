import React, {useEffect, useState} from 'react';
import css from './categories-dashboard.module.scss';
import {useStore} from "app/stores/store";
import {HiPencil, MdAdd} from "react-icons/all";
import {observer} from "mobx-react-lite";
import CategoryEditDialog from "./category-edit/category-edit";
import {Category} from "app/models/Category";

export default observer(function CategoriesDashboard() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const {categoryStore} = useStore();
    const {categories, createCategory} = categoryStore;

    useEffect(() => {
        categoryStore.loadCategories();
    }, [categoryStore])

    const openEditOrCreateDialog = () => {
        setDialogOpen(true);
    }

    const closeEditOrCreateDialog = () => {
        setDialogOpen(false);
    }

    const create = async (categoryName: string) => {
        let newCategory = new Category();
        newCategory.name = categoryName;
        await createCategory(newCategory);
        closeEditOrCreateDialog();
    }

    return (
        <div className={css.dashboard}>
            <div className={css.header}>
                <div className={css.title}>Kategorijos</div>
                <button color="secondary" onClick={openEditOrCreateDialog}>
                    <MdAdd/>
                </button>
            </div>
            {categories.map(category => (
                <div key={category.id} className={css.category}>
                    <div>{category.name}</div>
                    <button>
                        <HiPencil/>
                    </button>
                </div>
            ))}
            <CategoryEditDialog open={dialogOpen} onClose={closeEditOrCreateDialog} onSubmit={create}/>
        </div>
    )
})
