import React, {useEffect, useState} from 'react';
import CloseIcon from 'app/shared/icons/close-icon';
import css from './advertisement-details.module.scss';
import {HiOutlineGlobe, HiOutlineDocumentText, HiEye, HiOutlineCog} from "react-icons/hi";
import {useStore} from "app/stores/store";
import {useParams} from "react-router-dom";
import {Advertisement} from "app/models/Advertisement";
import {observer} from "mobx-react-lite";
import LoadingComponent from "app/layout/loadingComponent";
import {history} from "index";

export default observer(function AdvertisementDetails() {
    const {advertisementStore} = useStore();
    const {
        loadAdvertisement
    } = advertisementStore;

    const {advertisementId} = useParams<{ advertisementId: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisement>(new Advertisement());

    useEffect(() => {
        if (advertisementId) loadAdvertisement(advertisementId).then(response => setAdvertisement(response!));
    }, [advertisementId, loadAdvertisement]);

    const deleteAdvertisement = async () => {
        await advertisementStore.deleteAdvertisement(advertisement.id);
        history.push('/advertisementDashboard');
    }

    //material ui
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    //

    if(advertisementStore.loadingDetails) return <LoadingComponent content="Kraunamas skelbimas"/>

    return (
        <>
            <div className={css.optionButton}>
                <button onClick={handleClick}><HiOutlineCog/></button>
                {/*<select*/}
                {/*    open={Boolean(anchorEl)}*/}
                {/*    onClose={handleClose}*/}
                {/*>*/}
                {/*    <option onClick={() => {*/}
                {/*        history.push(`/edit/${advertisement.id}`)*/}
                {/*    }}>Redaguoti</option>*/}
                {/*    <option onClick={() => deleteAdvertisement()}>Ištrinti</option>*/}
                {/*</select>*/}
            </div>
            <div className={css.closeIconContainer}>
                <CloseIcon onClick={() => history.push('/advertisementDashboard')}/>
            </div>
            <div className={css.title}>{advertisement.title}</div>
            <div className={css.info}>
                <div className={css.group}>
                    <HiOutlineGlobe/>
                    <span>{advertisement.city}</span>
                </div>
                <span className={css.separator}>&bull;</span>
                <div className={css.group}>
                    <HiOutlineDocumentText/>
                    <span>{advertisement.category.name}</span>
                </div>
                <span className={css.separator}>&bull;</span>
                <div className={css.group}>
                    <HiEye/>
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
            <div className={css.price}>Kaina: {advertisement.price == null ? '--' : advertisement.price} €</div>
            <div>{advertisement.description}</div>
        </>
    )
})
