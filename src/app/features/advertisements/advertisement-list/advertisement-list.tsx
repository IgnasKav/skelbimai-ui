import React from 'react';
import css from './advertisement-list.module.scss';
import {useStore} from "app/stores/store";
import {useNavigate} from "react-router-dom";
import { Image } from '@mantine/core';

export default function AdvertisementList() {
    let navigate = useNavigate();
    const {advertisementStore} = useStore();
    const {advertisements} = advertisementStore;
    const imageUrl = "cnet.com/a/img/At7JXOb2erGg-eOdKylQhFKfeJY=/2021/10/23/80425069-0d3e-4c67-9085-a66e6177fc60/macbook-pro-2021-cnet-review-12.jpg";
    const imageUrl2 = "https://images.unsplash.com/photo-1586699253884-e199770f63b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
    return (
        <>
            {advertisements.map(advertisement => (
                <div key={advertisement.id} className={css.item} onClick={() => {
                    navigate(`/advertisementDashboard/details/${advertisement.id}`)
                }}>
                    {/*<div className={css.left}>*/}
                    {/*</div>*/}
                    <Image src={imageUrl2} />
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
