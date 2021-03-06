import React, {useState} from 'react';
import css from './category-edit.module.scss';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from "@material-ui/core";
import {MdClose} from "react-icons/md";
import CommonInput from "app/shared/inputs/common-input/common-input-field";
import TreeSelect from "../../../shared/inputs/tree-select/tree-select";
import {Category} from "../../../models/Category";
import { NIL as NIL_UUID } from "uuid";

interface Props {
    open: boolean,
    value?: Category;
    onClose: () => void,
    onSubmit: (category: Category) => void;
}

export default function CategoryEditDialog({open, onClose, onSubmit, value}: Props) {
    const [category, setCategory] = useState<Category>(value ?? new Category());

    const handleInputChange = (event: any) => {
        if(!category) return;

        const {name, value} = event.target;
        setCategory({...category, [name]: value});
    }

    const handleSelecChange = (event: any) => {
        if(!category) return;

        const {name, value} = event.target;
        if(value) {
            setCategory({...category, [name]: value.id});
        } else {
            setCategory({...category, [name]: NIL_UUID});
        }
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={css.header}>
                <div>Sukurti kategorijÄ…</div>
                <IconButton aria-label="close" onClick={onClose}>
                    <MdClose/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <CommonInput label="Pavadinimas" name="name" value={category.name} onChange={handleInputChange}/>
                <TreeSelect name="parentId" label="Parent Category" multipleSelect={false} onChange={handleSelecChange}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onSubmit(category)} color="primary">
                    PridÄ—ti
                </Button>
            </DialogActions>
        </Dialog>
    )
}
