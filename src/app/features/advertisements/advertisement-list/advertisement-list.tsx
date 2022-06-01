import React from 'react'
import { useStore } from 'app/stores/store'
import { useNavigate } from 'react-router-dom'
import { Card, Group, Text, createStyles, Image } from '@mantine/core'
import { Advertisement } from '../../../models/Advertisement'

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef('image')

  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gridGap: '1rem',
    },
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      width: 260,
      height: 344,
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
      border: '2px solid #248ae6;',

      [`.${image}`]: {
        transform: 'scale(1.03)',
      },
    },

    imageContainer: {
      height: 180,
      position: 'relative',
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transition: 'transform 500ms ease',
    },

    description: {
      height: 44,
    },

    nameGroup: {
      overflow: 'hidden',
    },

    like: {
      color: theme.colors.red[6],
    },

    label: {
      textTransform: 'uppercase',
      fontSize: theme.fontSizes.xs,
      fontWeight: 700,
    },
  }
})

interface Props {
  advertisements?: Advertisement[]
}

export default function AdvertisementList({ advertisements }: Props) {
  let navigate = useNavigate()
  const { classes } = useStyles()

  const { advertisementStore } = useStore()
  const { openedAdvertisement } = advertisementStore

  const handleAdvertisementClick = (advertisement: Advertisement) => {
    advertisementStore.setIsDetailsOpen(advertisement)
    navigate(`./details/${advertisement.id}`)
  }

  if (!advertisements) {
    return <div>No advertisements found</div>
  }

  return (
    <>
      <div id="grid" className={classes.grid}>
        {advertisements.map((advertisement) => (
          <Card
            shadow="md"
            withBorder
            radius="md"
            key={advertisement.id}
            className={
              openedAdvertisement?.id === advertisement.id
                ? [classes.card, classes.selected].join(' ')
                : classes.card
            }
            onClick={() => handleAdvertisementClick(advertisement)}
          >
            <Card.Section>
              <div className={classes.imageContainer}>
                <Image
                  className={classes.image}
                  src={advertisement.imageUrl}
                  height={180}
                  withPlaceholder
                />
              </div>
            </Card.Section>
            <Card.Section className={classes.section} mt="md">
              <Text size="lg" weight={500} lineClamp={1}>
                {advertisement.title}
              </Text>
              <Text size="sm" mt="5px" className={classes.description} color="dimmed" lineClamp={2}>
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
