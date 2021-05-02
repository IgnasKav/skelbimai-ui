import React, {useEffect, useState} from 'react';
import CloseIcon from 'app/shared/icons/close-icon';
import css from './advertisement-details.module.scss';
import {HiOutlineGlobe, HiOutlineDocumentText, HiEye, HiOutlineCog} from "react-icons/hi";
import {useStore} from "app/stores/store";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import {useParams, useHistory} from "react-router-dom";
import {Advertisement} from "app/models/Advertisement";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../layout/loadingComponent";

export default observer(function AdvertisementDetails() {
    let history = useHistory();
    const {advertisementStore} = useStore();
    const {
        deleteAdvertisement,
        loadAdvertisement
    } = advertisementStore;

    const {advertisementId} = useParams<{ advertisementId: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisement>(new Advertisement());

    useEffect(() => {
        if (advertisementId) loadAdvertisement(advertisementId).then(response => setAdvertisement(response!));
    }, [advertisementId, loadAdvertisement]);

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
                <IconButton onClick={handleClick}><HiOutlineCog/></IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        history.push(`/edit/${advertisement.id}`)
                    }}>Redaguoti</MenuItem>
                    <MenuItem onClick={() => deleteAdvertisement(advertisement.id)}>Ištrinti</MenuItem>
                </Menu>
            </div>
            <div className={css.closeIconContainer}>
                <CloseIcon onClick={() => history.replace('/')}/>
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