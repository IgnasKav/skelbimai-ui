import React, {useState} from 'react';
import CloseIcon from 'app/shared/icons/close-icon';
import css from './advertisement-details.module.scss';
import { HiOutlineGlobe, HiOutlineDocumentText, HiEye, HiOutlineCog } from "react-icons/hi";
import {useStore} from "app/stores/store";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import {observer} from "mobx-react-lite";

export default observer(function AdvertisementDetails() {
    const {advertisementStore} = useStore();
    const {selectedAdvertisement:advertisement, editMode, deselectAdvertisement, deleteAdvertisement, openEditOrCreateForm} = advertisementStore;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    if(!advertisement) return <div>lol</div>;

    return (
        <>
            { !editMode &&
                <>
                    <div className={css.optionButton}>
                        <IconButton onClick={handleClick}><HiOutlineCog/></IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => openEditOrCreateForm(advertisement.id)}>Redaguoti</MenuItem>
                            <MenuItem onClick={() => deleteAdvertisement(advertisement.id)}>Ištrinti</MenuItem>
                        </Menu>
                    </div>
                    <div className={css.closeIconContainer}>
                        <CloseIcon onClick={() => deselectAdvertisement()} />
                    </div>
                </>
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
                            <span>{advertisement.category.name}</span>
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
})