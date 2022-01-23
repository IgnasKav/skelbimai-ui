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

interface Props {
    open: boolean,
    onClose: () => void,
    onSubmit: (name: string) => void;
}

export default function CategoryEditDialog({open, onClose, onSubmit}: Props) {
    const [value, setValue] = useState<string>("");

    const handleInputChange = (event: any) => {
        const {value} = event.target;
        setValue(value);
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={css.header}>
                <div>Sukurti kategoriją</div>
                <IconButton aria-label="close" onClick={onClose}>
                    <MdClose/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <CommonInput label="Pavadinimas" name="category-name" value={value} onChange={handleInputChange}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onSubmit(value)} color="primary">
                    Pridėti
                </Button>
            </DialogActions>
        </Dialog>
    )
}
