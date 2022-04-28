import React, {useState} from 'react';
import css from './advertisement-list.module.scss';
import {useStore} from "app/stores/store";
import {useNavigate} from "react-router-dom";
import {Grid, Image, Card, Group, Badge, Text, createStyles} from '@mantine/core';
import {Advertisement} from "../../../models/Advertisement";

const useStyles = createStyles((theme, _params, getRef) => {
    const image = getRef('image');
    const selected = getRef('selected');

     return({
         grid: {
             display: 'grid',
             gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
             gridGap: '1rem'
         },
         card: {
             backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
             width: 260,
             height: 357,
             cursor: 'pointer',
             margin: '0 auto',

             [`&:hover .${image}`]: {
                 transform: 'scale(1.03)',
             },
         },

         section: {
             borderBottom: `1px solid ${
                 theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
             }`,
             paddingLeft: theme.spacing.md,
             paddingRight: theme.spacing.md,
             paddingBottom: theme.spacing.md,
         },

         selected: {
             border: "2px solid #248ae6;",

             [`.${image}`]: {
                 transform: 'scale(1.03)',
             }
         },

         imageContainer: {
             height: 180,
             position: 'relative'
         },

         image: {
             ref: image,
             position: 'absolute',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             backgroundSize: 'cover',
             transition: 'transform 500ms ease',
         },

         title: {
             height: 36
         },

         description: {
             height: 44
         },

         nameGroup: {
             overflow: 'hidden'
         },

         like: {
             color: theme.colors.red[6],
         },

         label: {
             textTransform: 'uppercase',
             fontSize: theme.fontSizes.xs,
             fontWeight: 700,
         },
     });
});

export default function AdvertisementList() {
    let navigate = useNavigate();
    const { classes } = useStyles();
    const [ selectedAdvertisement, setSelectedAdvertisement ] = useState<Advertisement>(new Advertisement());

    const {advertisementStore} = useStore();
    const {advertisements, openedAdvertisement} = advertisementStore;
    const imageUrl2 = "https://images.unsplash.com/photo-1586699253884-e199770f63b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

    const handleAdvertisementClick= (advertisement: Advertisement) => {
        navigate(`/advertisementDashboard/details/${advertisement.id}`);
        setSelectedAdvertisement(advertisement);
    }

    return (
        <>
            <div className={classes.grid}>
                {advertisements.map(advertisement => (
                    <Card withBorder
                          className={openedAdvertisement?.id === advertisement.id
                              ? [classes.card, classes.selected].join(" ")
                              : classes.card}
                          onClick={() => handleAdvertisementClick(advertisement)}
                    >
                        <Card.Section>
                            <div className={classes.imageContainer}>
                                <div className={classes.image} style={{ backgroundImage: `url(${imageUrl2})` }}> </div>
                            </div>
                        </Card.Section>
                        <Card.Section className={classes.section} mt="md">
                            <Text size="lg" weight={500} inline className={classes.title}>
                                {advertisement.title}
                            </Text>
                            <Text size="sm" mt="xs" className={classes.description}>
                                {advertisement.description}
                            </Text>
                        </Card.Section>
                        <Group spacing={30} mt="md">
                            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                                €{advertisement.price}
                            </Text>
                        </Group>
                    </Card>
                ))}
            </div>
        </>
    )
}
