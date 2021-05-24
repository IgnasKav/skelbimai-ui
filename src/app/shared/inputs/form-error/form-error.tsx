import React from "react";
import css from './form-error.module.scss';

interface Props {
    error: string;
}

export default function FormError({error}: Props) {
    return (
        error != '' ? <div className={css.errorField}>{error}</div> : null
    )
}