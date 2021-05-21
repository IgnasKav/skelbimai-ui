import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {useStore} from "app/stores/store";
import { Table } from 'react-bootstrap';
import {BsCheck} from "react-icons/all";
import { Button } from '@material-ui/core';
import { Advertisement } from 'app/models/Advertisement';

export default observer(function Show_Advertisement() {
    const {advertisementStore} = useStore();
    const {advertisements} = advertisementStore;

    const {updateAdvertisement} = advertisementStore;


    const Update = (ad: Advertisement) => {
        ad.state = "Patvirtintas";
        updateAdvertisement(ad)
    }
    return(
        <>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>Skelbimas</th>
                <th>Aprašymas</th>
                <th>Patvirtinta</th>
                </tr>
            </thead>
        {advertisements.map(advertisement => (
                        <tr>
                        <td>{advertisement.id}</td>
                        <td>{advertisement.title}</td>
                        <td>{advertisement.description}</td>
                        <td> {advertisement.state != "Patvirtintas" ? (<Button onClick={() => Update(advertisement)}>Patvirtinti</Button>)
                        :
                        (
                          <td>{advertisement.state}</td>
                        )}</td>
                        </tr>
        ))}
        </Table>
        </>
        )
});