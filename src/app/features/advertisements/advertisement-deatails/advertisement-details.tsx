import React, { useEffect, useState } from 'react'
import CloseIcon from 'app/shared/icons/close-icon'
import css from './advertisement-details.module.scss'
import { HiEye, HiOutlineCog, HiOutlineDocumentText, HiOutlineGlobe } from 'react-icons/hi'
import { useStore } from 'app/stores/store'
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Advertisement,
  AdvertisementPermissions,
  AdvertisementState,
} from 'app/models/Advertisement'
import { observer } from 'mobx-react-lite'
import LoadingComponent from 'app/layout/loadingComponent'
import { UserRoles } from '../../../models/user'
import { Card, createStyles, Badge, Group, Image, Box } from '@mantine/core'
import { Map2, FileInfo, Eye } from 'tabler-icons-react'

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    card: {
      height: '100%',
    },
    badgeIcon: {
      display: 'flex',
    },
    imageBox: {
      marginTop: '15px',
      borderRadius: theme.radius.md,
      border: '1px solid #e9ecef',
    },
  }
})

export default observer(function AdvertisementDetails() {
  let navigate = useNavigate()
  const { advertisementStore, userStore } = useStore()
  const { loadAdvertisement, openedAdvertisement } = advertisementStore
  const { classes } = useStyles()

  const { user } = userStore

  const { advertisementId } = useParams<{ advertisementId: string }>()
  const [advertisement, setAdvertisement] = useState<Advertisement>(new Advertisement())

  useEffect(() => {
    if (advertisementId)
      loadAdvertisement(advertisementId).then((response) => {
        setAdvertisement(response!)
      })
  }, [advertisementId, loadAdvertisement])

  const deleteAdvertisement = async () => {
    await advertisementStore.deleteAdvertisement(advertisement.id)
    navigate('..')
  }

  const changeAdvertisementState = async () => {
    const isApproved = advertisement.state === AdvertisementState.Approved
    if (isApproved) {
      advertisement.state = AdvertisementState.New
    } else {
      advertisement.state = AdvertisementState.Approved
    }

    await advertisementStore.updateAdvertisement(advertisement)
  }

  const handleAdvertisementClose = () => {
    advertisementStore.setIsDetailsOpen(undefined)
    navigate('..')
  }

  //material ui
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  //

  if (advertisementStore.loadingDetails) return <LoadingComponent content="Kraunamas skelbimas" />

  return (
    <Card withBorder radius="md" className={classes.card}>
      <div className={css.header}>
        <div className={css.optionButton}>
          {advertisement.permissions.find((x) => x == AdvertisementPermissions.Update) && (
            <IconButton onClick={handleClick}>
              <HiOutlineCog />
            </IconButton>
          )}
          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                navigate(`/edit/${advertisement.id}`)
              }}
            >
              Redaguoti
            </MenuItem>
            <MenuItem onClick={() => deleteAdvertisement()}>Ištrinti</MenuItem>
          </Menu>
        </div>
        <div className={css.closeIconContainer}>
          <CloseIcon onClick={handleAdvertisementClose} />
        </div>
        <div className={css.title}>{advertisement.title}</div>
      </div>
      <div className={css.body}>
        <Group mt={9}>
          <Badge leftSection={<Map2 size="16" className={classes.badgeIcon} />}>
            {advertisement.city}
          </Badge>
          <Badge leftSection={<FileInfo size="16" className={classes.badgeIcon} />}>
            {advertisement.category.name}
          </Badge>
          <Badge leftSection={<Eye size="16" className={classes.badgeIcon} />}>
            {advertisement.views}
          </Badge>
        </Group>
        <Box className={classes.imageBox}>
          <Image height="350px" radius="md" src={openedAdvertisement?.imageUrl} />
        </Box>
        <div className={css.price}>
          Kaina: {advertisement.price == null ? '--' : advertisement.price} €
        </div>
        <div>{advertisement.description}</div>
      </div>
      <div className={css.footer}>
        {user?.userRoles.find((role) => role === UserRoles.Support || role === UserRoles.Admin) && (
          <Button variant="outlined" color="primary" onClick={changeAdvertisementState}>
            {advertisement.state === AdvertisementState.Approved ? 'Atmesti' : 'Patvirtinti'}
          </Button>
        )}
      </div>
    </Card>
  )
})
