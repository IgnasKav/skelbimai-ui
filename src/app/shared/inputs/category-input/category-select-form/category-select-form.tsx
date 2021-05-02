import css from "../category-select-field.module.scss";
import React from "react";
import CloseIcon from "app/shared/icons/close-icon";
import {useStore} from "app/stores/store";
import styled from 'styled-components';
import {observer} from "mobx-react-lite";
import {Button} from "@material-ui/core";
import {Category} from "app/models/Category";

const CategoryChip = styled.div<any>(props => ({
    cursor: 'pointer',
    display: 'initial',
    borderRadius: '5px',
    border: '2px solid',
    padding: '3px',
    borderColor: props.selected ? '#4343ff' : 'transparent',
    ":hover": {
        borderColor: '#4343ff'
    }
}));

interface Props {
    close: () => void;
    submit: (selectedCategory: Category | undefined) => void;
}

export default observer(function CategorySelectForm({submit, close}: Props) {
    const {categoryStore} = useStore();
    const {categories, selectedCategory, selectCategory} = categoryStore;

    return(
        <div className={css.selectContainerBackground}>
            <div className={css.selectContainer}>
                <div className={css.closeIconContainer}>
                    <CloseIcon onClick={() => close()} />
                </div>
                <div className={css.title}>
                    Kategorijos pasirinkimas
                </div>
                <div className={css.categoryContainer}>
                    {
                        categories.map(category => {
                            const isCategorySelected = selectedCategory && selectedCategory.id === category.id;
                            return (
                                <CategoryChip key={category.id}
                                          selected={isCategorySelected}
                                          onClick={ () => selectCategory(category.id)}
                                >
                                    {category.name}
                                </CategoryChip>
                            )
                        })
                    }
                </div>
                <Button variant="outlined" color="primary" onClick={() => submit(selectedCategory)}>
                    Pasirinkti
                </Button>
            </div>
        </div>
    )
})