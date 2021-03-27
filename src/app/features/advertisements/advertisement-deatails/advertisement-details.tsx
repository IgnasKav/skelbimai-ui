import React, { useState } from 'react';
import { Advertisement } from 'app/models/Advertisement';
import CloseIcon from 'app/icons/close-icon';
import css from './advertisement-details.module.scss';
import { HiOutlineGlobe, HiOutlineDocumentText, HiEye } from "react-icons/hi";

interface Props {
    advertisement: Advertisement
    onAddClose: () => void;
}

export default function AdvertisementDetails({ advertisement, onAddClose }: Props) {
    return (
        <>
            <div className={css.iconWrapper}>
                <CloseIcon onClick={onAddClose} />
            </div>
            <div className={css.title}>{advertisement.title}</div>
            <div className={css.info}>
                <div className={css.group}>
                    <HiOutlineGlobe />
                    <span>{advertisement.city}</span>
                </div>
                <span className={css.separator}>&bull;</span>
                <div className={css.group}>
                    <HiOutlineDocumentText />
                    <span>{advertisement.category}</span>
                </div>
                <span className={css.separator}>&bull;</span>
                <div className={css.group}>
                    <HiEye />
                    <span>{advertisement.views}</span>
                </div>
            </div>
            <div className={css.gallery}>
                <div className={css.left}></div>
                <div className={css.right}>
                    <div></div>
                    <div className={css.topRight}></div>
                    <div></div>
                    <div className={css.bottomRight}></div>
                </div>
            </div>
            <div className={css.price}>Kaina: {advertisement.price} €</div>
            <div>{advertisement.description}</div>
        </>
    )
}