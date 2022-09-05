import React, { useEffect } from 'react'
import css from './header.module.scss'
import { useStore } from 'app/stores/store'
import {
  Header as MantineHeader,
  Group,
  Menu,
  Avatar,
  Text,
  UnstyledButton,
  createStyles,
  Input,
} from '@mantine/core'
import { useFilters } from '../../stores/useFilters'
import { ChevronDown, Logout, Search, Settings } from 'tabler-icons-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../stores/useAuth'

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: '5px',

    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
  searchInput: {
    margin: 'auto',
    width: '400px',
  },
}))

export function Header() {
  const { categoryStore } = useStore()
  const auth = useAuth()
  const { setSearchQuery } = useFilters()
  const { classes } = useStyles()
  let navigate = useNavigate()

  const logout = async () => {
    auth.logout()
    navigate('/')
  }

  const handleInputChange = (event: any) => {
    const searchText = event.target.value
    setSearchQuery(searchText)
  }

  useEffect(() => {
    categoryStore.loadCategories()
  }, [categoryStore])

  return (
    <>
      <MantineHeader height={70} p="xs">
        <Group sx={{ height: '100%' }}>
          <div className={css.webSiteLogo}></div>

          <Input
            icon={<Search />}
            placeholder="Enter search text"
            size="md"
            onChange={handleInputChange}
            className={classes.searchInput}
          />
          <Menu
            control={
              <UnstyledButton className={classes.user} color="green">
                <Group>
                  <Avatar size={30} color="cyan" radius="xl">
                    {auth.user?.username[0].toUpperCase()}
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                      {auth.user?.username}
                    </Text>

                    <Text color="dimmed" size="xs">
                      {auth.user?.userRoles[0]}
                    </Text>
                  </div>
                  <ChevronDown size={'10px'} />
                </Group>
              </UnstyledButton>
            }
          >
            <Menu.Item
              icon={<Settings color="blue" size={20} />}
              onClick={() => navigate('/settings')}
            >
              {' '}
              Settings
            </Menu.Item>
            <Menu.Item icon={<Logout color="red" size={20} />} onClick={() => logout()}>
              {' '}
              Logout
            </Menu.Item>
          </Menu>
        </Group>
      </MantineHeader>
    </>
  )
}
