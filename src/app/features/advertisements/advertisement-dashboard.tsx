import React from 'react';
import css from './advertisement-dashboard.module.scss';
import { Advertisement } from 'app/models/Advertisement';
import AdvertisementList from './advertisement-list/advertisement-list';
import AdvertisementDetails from './advertisement-deatails/advertisement-details';
import AdvertisementCreateWindow from './advertisement-create/advertisement-create';

interface Props {
    advertisements: Advertisement[];
    onCreateOrEdit: (advertisement: Advertisement) => void;
    selectedAdvertisement: Advertisement | undefined;
    setSelectedAdvertisement: (advertisement: Advertisement | undefined) => void;
    handleSelectedAdvertisement: (id: string) => void;
    handleCancelSelectedAdvertisement: () => void;
    editMode: boolean;
    submitting: boolean;
    onFormClose: () => void;
}

export default function AdvertisementDashboard({ advertisements, onCreateOrEdit, selectedAdvertisement, setSelectedAdvertisement, handleSelectedAdvertisement, handleCancelSelectedAdvertisement, editMode, submitting, onFormClose}: Props) {
    return (
        <div className={css.dashboard}>
            <div className={css.list}>
                {
                    selectedAdvertisement && editMode ?
                        <AdvertisementCreateWindow advertisement={selectedAdvertisement} submitting={submitting} setAdvertisement={setSelectedAdvertisement} onClose={onFormClose} onCreate={onCreateOrEdit}/>
                        : <AdvertisementList advertisements={advertisements} onAddSelect={handleSelectedAdvertisement} />
                }
            </div>
            {selectedAdvertisement && <div className={css.details}>
                <AdvertisementDetails advertisement={selectedAdvertisement} onAddClose={handleCancelSelectedAdvertisement} editMode={editMode} />
            </div>}
        </div>
    )
}