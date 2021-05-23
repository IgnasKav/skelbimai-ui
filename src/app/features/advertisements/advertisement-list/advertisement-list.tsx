import React from 'react';
import css from './advertisement-list.module.scss';
import {useStore} from "app/stores/store";
import {history} from 'index';

export default function AdvertisementList() {
    const {advertisementStore} = useStore();
    const {advertisements} = advertisementStore;

    return (
        <>
            {advertisements.map(advertisement => (
                <div key={advertisement.id} className={css.item} onClick={() => {
                    history.push(`/advertisementDashboard/details/${advertisement.id}`)
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