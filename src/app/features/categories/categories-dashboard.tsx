import React, {useState} from 'react';
import css from './categories-dashboard.module.scss';
import {useStore} from "app/stores/store";
import {HiPencil, MdAdd} from "react-icons/all";
import {observer} from "mobx-react-lite";
import {Fab, IconButton} from "@material-ui/core";
import CategoryEditDialog from "./category-edit/category-edit";
import {Category} from "../../models/Category";

export default observer(function CategoriesDashboard() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const {categoryStore} = useStore();
    const {categories, createCategory} = categoryStore;

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
                <Fab color="secondary" onClick={openEditOrCreateDialog}>
                    <MdAdd/>
                </Fab>
            </div>
            {categories.map(category => (
                <div key={category.id} className={css.category}>
                    <div>{category.name}</div>
                    <IconButton>
                        <HiPencil/>
                    </IconButton>
                </div>
            ))}
            <CategoryEditDialog open={dialogOpen} onClose={closeEditOrCreateDialog} onSubmit={create}/>
        </div>
    )
})