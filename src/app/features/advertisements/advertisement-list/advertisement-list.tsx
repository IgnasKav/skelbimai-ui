import React from 'react';
import css from './advertisement-list.module.scss';
import {useStore} from "app/stores/store";
import {useNavigate} from "react-router-dom";

export default function AdvertisementList() {
    let navigate = useNavigate();
    const {advertisementStore} = useStore();
    const {advertisements} = advertisementStore;

    return (
        <>
            {advertisements.map(advertisement => (
                <div key={advertisement.id} className={css.item} onClick={() => {
                    navigate(`/advertisementDashboard/details/${advertisement.id}`)
                }}>
                    <div className={css.left}>
                    </div>
                    <div className={css.right}>
                        <div>
                            <div className={css.city}>{advertisement.city}</div>
                            <div className={css.title}>{advertisement.title}</div>
                            <hr className={css.separator}/>
                        </div>
                        <div className={css.middleSection}>{advertisement.description}</div>
                        <div className={css.bottomSection}>{advertisement.price} €</div>
                    </div>
                </div>
            ))}
        </>
    )
}
