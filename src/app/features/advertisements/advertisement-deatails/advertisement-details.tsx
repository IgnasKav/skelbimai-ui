import React, {useEffect, useState} from 'react';
import CloseIcon from 'app/shared/icons/close-icon';
import css from './advertisement-details.module.scss';
import {HiEye, HiOutlineCog, HiOutlineDocumentText, HiOutlineGlobe} from "react-icons/hi";
import {useStore} from "app/stores/store";
import {Button, IconButton, Menu, MenuItem} from "@material-ui/core";
import {useNavigate, useParams} from "react-router-dom";
import {Advertisement, AdvertisementPermissions, AdvertisementState} from "app/models/Advertisement";
import {observer} from "mobx-react-lite";
import LoadingComponent from "app/layout/loadingComponent";
import {UserRoles} from "../../../models/user";

export default observer(function AdvertisementDetails() {
    let navigate = useNavigate();
    const {advertisementStore, userStore} = useStore();
    const {
        loadAdvertisement
    } = advertisementStore;

    const {user} = userStore;

    const {advertisementId} = useParams<{ advertisementId: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisement>(new Advertisement());

    useEffect(() => {
        if (advertisementId) loadAdvertisement(advertisementId).then(response => {
            setAdvertisement(response!);
            advertisementStore.setIsDetailsOpen(response!);
        });
    }, [advertisementId, loadAdvertisement]);

    const deleteAdvertisement = async () => {
        await advertisementStore.deleteAdvertisement(advertisement.id);
        navigate('/advertisementDashboard');
    }

    const changeAdvertisementState = async () => {
        const isApproved = advertisement.state === AdvertisementState.Approved;
        if(isApproved) {
            advertisement.state = AdvertisementState.New;
        } else {
            advertisement.state = AdvertisementState.Approved;
        }

        await advertisementStore.updateAdvertisement(advertisement);
    }

    const handleAdvertisementClose = () => {
        advertisementStore.setIsDetailsOpen(undefined);
        navigate('/advertisementDashboard')
    }

    //material ui
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    //

    if(advertisementStore.loadingDetails) return <LoadingComponent content="Kraunamas skelbimas"/>

    return (
        <>
            <div className={css.header}>
                <div className={css.optionButton}>
                    {advertisement.permissions.find(x => x == AdvertisementPermissions.Update) && <IconButton onClick={handleClick}><HiOutlineCog/></IconButton>}
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => {
                            navigate(`/edit/${advertisement.id}`)
                        }}>Redaguoti</MenuItem>
                        <MenuItem onClick={() => deleteAdvertisement()}>Ištrinti</MenuItem>
                    </Menu>
                </div>
                <div className={css.closeIconContainer}>
                    <CloseIcon onClick={handleAdvertisementClose}/>
                </div>
                <div className={css.title}>{advertisement.title}</div>
            </div>
            <div className={css.body}>
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
            </div>
            <div className={css.footer}>
                {user?.userRoles.find(role => (role === UserRoles.Support || role === UserRoles.Admin)) &&
                    <Button variant="outlined" color="primary" onClick={changeAdvertisementState}>{advertisement.state === AdvertisementState.Approved ? 'Atmesti': 'Patvirtinti'}</Button>
                }
            </div>
        </>
    )
})
