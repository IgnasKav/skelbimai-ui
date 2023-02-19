import React, { useEffect, useState } from 'react';
import { useStore } from 'app/stores/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Advertisement } from 'app/models/Advertisement';
import LoadingComponent from 'app/layout/loadingComponent';
import TreeSelect from 'app/shared/inputs/tree-select/tree-select';
import {
    Badge,
    Box,
    Button,
    Card,
    createStyles,
    Group,
    Image,
    MantineTheme,
    NumberInput,
    Text,
    Textarea,
    TextInput,
    Title,
    useMantineTheme,
} from '@mantine/core';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import {
    Eye, FileInfo, Icon as TablerIcon, Map2, Photo, Upload, X,
} from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import css from './advertisement-edit.module.scss';

const useStyles = createStyles((theme, _params, getRef) => ({
    categoryInput: {
        marginTop: '20px',
    },
    card: {
        height: '100%',
        display: 'grid',
        position: 'relative',
        gridTemplateRows: '36px calc(100% - 36px)',
    },
    badgeIcon: {
        display: 'flex',
    },
    imageBox: {
        marginTop: '15px',
        borderRadius: theme.radius.md,
        border: '1px solid #e9ecef',
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
    },
    price: {
        fontSize: '30px',
    },
    title: {
        fontSize: '32px',
        fontWeight: 500,
    },
    currencyBadge: {
        backgroundColor: theme.colors.gray[1],
        textAlign: 'center',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
        color: theme.colors.blue[6],
    },
    description: {
        flex: '1',
        padding: '13px',
        border: `1px solid ${theme.colors.gray[4]}`,
        borderRadius: theme.radius.md,
        overflowY: 'auto',
    },
    wrapper: {
        position: 'relative',
        marginBottom: 30,
    },

    dropzone: {
        borderWidth: 1,
        paddingBottom: 50,
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
}));

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
    return status.accepted
        ? theme.colors[theme.primaryColor][6]
        : status.rejected
            ? theme.colors.red[6]
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7];
}

function ImageUploadIcon({
    status,
    ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
    if (status.accepted) {
        return <Upload {...props} />;
    }

    if (status.rejected) {
        return <X {...props} />;
    }

    return <Photo {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
        <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

        <div>
            <Text size="xl" inline>
        Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
            </Text>
        </div>
    </Group>
);

export default function AdvertisementEditPage() {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const { advertisementStore } = useStore();
    const { createAdvertisement, updateAdvertisement, loadAdvertisement } = advertisementStore;

    const { advertisementId } = useParams<{ advertisementId: string }>();
    const isNew = !advertisementId;
    const [advertisement, setAdvertisement] = useState<Advertisement>(new Advertisement());
    const [image, setImage] = useState<File>();

    useEffect(() => {
        if (advertisementId) {
            loadAdvertisement(advertisementId).then((response) => {
                setAdvertisement(response!);
            });
        }
    }, [advertisementId, loadAdvertisement]);

    const form = useForm({
        initialValues: {
            title: advertisement.title,
            category: advertisement.category,
            city: advertisement.city,
            price: advertisement.price,
            description: advertisement.description,
        },
    });

    const submit = () => {
        createOrEditAdvertisement();
    };

    const handleInputChange = (fieldName: string, event: any) => {
        const { value } = event.target;
        // @ts-ignore
        form.setFieldValue(fieldName, value);
        setAdvertisement({ ...advertisement, [fieldName]: value });
    };

    const handleNumberInputChange = (fieldName: string, value: number | undefined) => {
    // @ts-ignore
        form.setFieldValue(fieldName, value);
        setAdvertisement({ ...advertisement, [fieldName]: value });
    };

    const createOrEditAdvertisement = async () => {
        if (isNew) {
            await createAdvertisement(advertisement, image);
        } else {
            await updateAdvertisement(advertisement, image);
        }
        navigate('/advertisementDashboard');
    };

    const onDrop = (files: File[]) => {
        const imagePreview = URL.createObjectURL(files[0]);
        setImage(files[0]);
        setAdvertisement({ ...advertisement, imageUrl: imagePreview });
    };

    // loading
    if (advertisementStore.loadingDetails) {
        return (
            <div className={css.dashboard}>
                <div className={css.createAdvertisementCard}>
                    <LoadingComponent />
                </div>
                <div className={css.preview}>
                    <LoadingComponent />
                </div>
            </div>
        );
    }

    return (
        <div className={css.dashboard}>
            <form className={css.createAdvertisementCard} onSubmit={form.onSubmit(() => submit())}>
                <div className={css.title}>{isNew ? 'New product' : 'Edit product'}</div>
                <div className={css.form}>
                    <TextInput
                        label="Title"
                        {...form.getInputProps('title')}
                        placeholder="Title"
                        value={advertisement.title}
                        required
                        onChange={(event) => handleInputChange('title', event)}
                    />
                    <TreeSelect
                        name="category"
                        label="Kategorija"
                        className={classes.categoryInput}
                        multipleSelect={false}
                        value={advertisement.category}
                        onChange={(event) => handleInputChange('category', event)}
                    />
                    <Group mt={20} grow>
                        <TextInput
                            label="City"
                            {...form.getInputProps('city')}
                            placeholder="City"
                            value={advertisement.city}
                            onChange={(event) => handleInputChange('city', event)}
                            required
                        />
                        <NumberInput
                            label="Price"
                            {...form.getInputProps('price')}
                            value={advertisement.price}
                            onChange={(price) => handleNumberInputChange('price', price)}
                            placeholder="Price"
                            hideControls
                            required
                        />
                    </Group>
                    <Textarea
                        mt={20}
                        label="Description"
                        {...form.getInputProps('description')}
                        value={advertisement.description}
                        minRows={4}
                        maxRows={6}
                        onChange={(event) => handleInputChange('description', event)}
                    />
                    <Dropzone
                        mt={20}
                        onDrop={(files) => onDrop(files)}
                        onReject={(files) => console.log('rejected files', files)}
                    >
                        {(status) => dropzoneChildren(status, theme)}
                    </Dropzone>
                </div>
                <div className={css.buttonGroup}>
                    <Button
                        variant="outline"
                        color="secondary"
                        onClick={() => navigate('/advertisementDashboard')}
                    >
            Atšaukti
                    </Button>
                    <Button variant="outline" color="primary" type="submit">
                        {isNew ? 'Sukurti' : 'Išsaugoti'}
                    </Button>
                </div>
            </form>
            <div className={css.preview}>
                <Card withBorder radius="md" shadow="md" className={classes.card}>
                    <div className={css.header}>
                        <Group position="apart" noWrap>
                            <Group mt={9}>
                                <Badge leftSection={<Map2 size="16" className={classes.badgeIcon} />}>
                                    {advertisement.city}
                                </Badge>
                                <Badge
                                    color="violet"
                                    leftSection={<FileInfo size="16" className={classes.badgeIcon} />}
                                >
                                    {advertisement.category.name}
                                </Badge>
                                <Badge color="yellow" leftSection={<Eye size="16" className={classes.badgeIcon} />}>
                                    {advertisement.views}
                                </Badge>
                            </Group>
                        </Group>
                    </div>
                    <div className={classes.body}>
                        <Box className={classes.imageBox}>
                            <Image height="350px" radius="md" src={advertisement?.imageUrl} withPlaceholder />
                        </Box>
                        <Text lineClamp={2} mt={10}>
                            <Title order={1} className={classes.title}>
                                {advertisement.title}
                            </Title>
                        </Text>
                        <Box mt={15} className={classes.description}>
                            {advertisement.description.split(/\n/g).map((line) => (
                                <Text color="dimmed">{line}</Text>
                            ))}
                        </Box>
                        <Group mt={20}>
                            <Box className={classes.currencyBadge}>
                                <Text className={classes.price} weight={700} sx={{ lineHeight: 1 }}>
                  €{advertisement.price}
                                </Text>
                            </Box>
                        </Group>
                    </div>
                </Card>
            </div>
        </div>
    );
}
