import React, { useEffect, useState } from 'react'
import css from './advertisement-details.module.scss'
import { useStore } from 'app/stores/store'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Advertisement,
  AdvertisementPermissions,
  AdvertisementState,
} from 'app/models/Advertisement'
import { observer } from 'mobx-react-lite'
import LoadingComponent from 'app/layout/loadingComponent'
import { UserRoles } from '../../../models/user'
import {
  Card,
  createStyles,
  Badge,
  Group,
  Image,
  Box,
  Text,
  ActionIcon,
  Menu,
  Title,
} from '@mantine/core'
import { Map2, FileInfo, Eye, Settings, X, Edit, Trash, Check } from 'tabler-icons-react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import agent from '../../../api/agent'
import { WatchLater } from '../../../models/WatchLater'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth } from '../../../stores/useAuth'

const useStyles = createStyles((theme, _params, getRef) => {
  return {
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
    descriptionBox: {
      flex: '1',
      padding: '13px',
      border: `1px solid ${theme.colors.gray[4]}`,
      borderRadius: theme.radius.md,
      overflowY: 'auto',
      wordBreak: 'break-word',
    },
  }
})

export default observer(function AdvertisementDetails() {
  let navigate = useNavigate()
  const { advertisementStore } = useStore()
  const auth = useAuth()
  const { loadAdvertisement, openedAdvertisement } = advertisementStore
  const { classes } = useStyles()
  const queryClient = useQueryClient()

  const advertisementMutation = useMutation(
    (updatedAdvertisement: Advertisement) => {
      return agent.Advertisements.edit(updatedAdvertisement)
    },
    {
      onSettled: (data, variables, context) => {
        queryClient.invalidateQueries('unapprovedAdvertisements')
      },
    }
  )

  const watchLaterMutation = useMutation(
    (watchLaterRequest: WatchLater) => {
      return agent.Advertisements.toggleWatchLater(watchLaterRequest)
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('watchLater')
      },
    }
  )

  const deleteMutation = useMutation(
    (advertisementId: string) => {
      return agent.Advertisements.delete(advertisementId)
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('myAdvertisements')
        queryClient.invalidateQueries('mainAdvertisements')
        queryClient.invalidateQueries('watchLater')
      },
    }
  )

  const { advertisementId } = useParams<{ advertisementId: string }>()
  const [advertisement, setAdvertisement] = useState<Advertisement>(new Advertisement())

  useEffect(() => {
    if (advertisementId)
      loadAdvertisement(advertisementId).then((response) => {
        setAdvertisement(response!)
      })
  }, [advertisementId, loadAdvertisement])

  const deleteAdvertisement = async () => {
    await deleteMutation.mutate(advertisement.id)
    navigate('..')
  }

  const changeAdvertisementState = async () => {
    const isApproved = advertisement.state === AdvertisementState.Approved
    if (isApproved) {
      advertisement.state = AdvertisementState.New
    } else {
      advertisement.state = AdvertisementState.Approved
    }

    await advertisementMutation.mutate(advertisement)
  }

  const handleAdvertisementClose = () => {
    advertisementStore.setIsDetailsOpen(undefined)
    navigate('..')
  }

  //watch later
  const handleWatchLater = async () => {
    if (!auth.user) return

    const watchLaterRequest: WatchLater = {
      userId: auth.user.id,
      advertisementId: advertisement.id,
    }
    await watchLaterMutation.mutate(watchLaterRequest)
    setAdvertisement({ ...advertisement, watchLater: !advertisement.watchLater })
  }

  if (advertisementStore.loadingDetails) return <LoadingComponent content="Kraunamas skelbimas" />

  return (
    <Card withBorder radius="md" className={classes.card}>
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
          <Group spacing="xs" noWrap>
            <ActionIcon variant="default" radius="md" size={36} onClick={handleWatchLater}>
              {advertisement.watchLater ? (
                <AiFillHeart color="#ff5656" size={18} />
              ) : (
                <AiOutlineHeart color="#ff5656" size={18} />
              )}
            </ActionIcon>
            {advertisement.permissions.find((x) => x == AdvertisementPermissions.Update) && (
              <Menu
                control={
                  <ActionIcon color="blue" variant="outline" radius="md" size={36}>
                    <Settings size={25} />
                  </ActionIcon>
                }
              >
                <Menu.Item
                  color="primary"
                  icon={<Edit size={14} />}
                  onClick={() => {
                    navigate(`/edit/${advertisement.id}`)
                  }}
                >
                  {' '}
                  Edit
                </Menu.Item>
                {auth.user?.userRoles.find(
                  (role) => role === UserRoles.Support || role === UserRoles.Admin
                ) && (
                  <Menu.Item
                    color={advertisement.state === AdvertisementState.Approved ? 'red' : 'green'}
                    icon={
                      advertisement.state === AdvertisementState.Approved ? (
                        <X size={14} />
                      ) : (
                        <Check size={14} />
                      )
                    }
                    onClick={changeAdvertisementState}
                  >
                    {advertisement.state === AdvertisementState.Approved ? 'Unapprove' : 'Approve'}
                  </Menu.Item>
                )}
                <Menu.Item
                  color="red"
                  icon={<Trash size={14} />}
                  onClick={() => deleteAdvertisement()}
                >
                  Delete
                </Menu.Item>
              </Menu>
            )}
            <ActionIcon
              color="blue"
              variant="outline"
              radius="md"
              size={36}
              onClick={handleAdvertisementClose}
            >
              <X size={25} />
            </ActionIcon>
          </Group>
        </Group>
      </div>
      <div className={classes.body}>
        <Box className={classes.imageBox}>
          <Image height="350px" radius="md" src={openedAdvertisement?.imageUrl} withPlaceholder />
        </Box>
        <Text lineClamp={2} mt={10}>
          <Title order={1} className={classes.title}>
            {advertisement.title}
          </Title>
        </Text>
        <Box mt={15} className={classes.descriptionBox}>
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
  )
})
