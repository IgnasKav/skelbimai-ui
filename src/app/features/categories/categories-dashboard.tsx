import React, { useEffect, useState } from 'react';
import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import { Fab, IconButton } from '@material-ui/core';
import { Category } from 'app/models/Category';
import { HiPencil } from 'react-icons/hi';
import { MdAdd } from 'react-icons/md';
import CategoryEditDialog from './category-edit/category-edit';
import css from './categories-dashboard.module.scss';

export default observer(() => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { categoryStore } = useStore();
    const { categories, createCategory } = categoryStore;

    useEffect(() => {
        categoryStore.loadCategories();
    }, [categoryStore]);

    const openEditOrCreateDialog = () => {
        setDialogOpen(true);
    };

    const closeEditOrCreateDialog = () => {
        setDialogOpen(false);
    };

    const create = async (category: Category) => {
        await createCategory(category);
        closeEditOrCreateDialog();
    };

    return (
        <div className={css.dashboard}>
            <div className={css.header}>
                <div className={css.title}>Kategorijos</div>
                <Fab color="secondary" onClick={openEditOrCreateDialog}>
                    <MdAdd />
                </Fab>
            </div>
            {categories.map((category) => (
                <div key={category.id} className={css.category}>
                    <div>{category.name}</div>
                    <IconButton>
                        <HiPencil />
                    </IconButton>
                </div>
            ))}
            <CategoryEditDialog open={dialogOpen} onClose={closeEditOrCreateDialog} onSubmit={create} />
        </div>
    );
});
