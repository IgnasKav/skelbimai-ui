import React from 'react';
import { Advertisement } from 'app/models/Advertisement';
import CloseIcon from 'app/shared/icons/close-icon';
import css from './advertisement-details.module.scss';
import { HiOutlineGlobe, HiOutlineDocumentText, HiEye } from "react-icons/hi";

interface Props {
    advertisement: Advertisement
    onAddClose: () => void;
    editMode: boolean;
}

export default function AdvertisementDetails({ advertisement, onAddClose, editMode }: Props) {
    return (
        <>
            { !editMode &&
                <div className={css.iconWrapper}>
                    <CloseIcon onClick={onAddClose} />
                </div>
            }
            <div className={css.title}>{advertisement.title}</div>
            <div className={css.info}>
                { advertisement.city &&
                    <div className={css.group}>
                        <HiOutlineGlobe />
                        <span>{advertisement.city}</span>
                    </div>
                }
                { advertisement.category &&
                    <>
                        <span className={css.separator}>&bull;</span>
                        <div className={css.group}>
                            <HiOutlineDocumentText />
                            <span>{advertisement.category}</span>
                        </div>
                    </>
                }
                { !editMode &&
                    <>
                        <span className={css.separator}>&bull;</span>
                        <div className={css.group}>
                            <HiEye />
                            <span>{advertisement.views}</span>
                        </div>
                    </>
                }
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
            <div className={css.price}>Kaina: {advertisement.price == null ? '--' : advertisement.price} €</div>
            <div>{advertisement.description}</div>
        </>
    )
}