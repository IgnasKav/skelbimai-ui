import React from 'react';
import { Button, createStyles, Stack } from '@mantine/core';
import agent from '../../api/agent';
import { AdvertisementBackgroundJob } from '../../models/Advertisement';

const useStyles = createStyles(() => ({
    stack: {
        width: 300,
    },
}));

export default function BackgroundJobs() {
    const { classes } = useStyles();
    const { BackgroundJobs } = agent;

    return (
        <>
            <Stack className={classes.stack}>
                <Button onClick={() => BackgroundJobs.job(AdvertisementBackgroundJob.Delete)}>
          Delete Advertisement index
                </Button>
                <Button onClick={() => BackgroundJobs.job(AdvertisementBackgroundJob.Create)}>
          Create Advertisement index
                </Button>
                <Button onClick={() => BackgroundJobs.job(AdvertisementBackgroundJob.Reindex)}>
          Reindex Advertisements
                </Button>
            </Stack>
        </>
    );
}
