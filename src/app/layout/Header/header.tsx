import React, { useEffect } from 'react'
import css from './header.module.scss'
import { useStore } from 'app/stores/store'
import SearchInput from 'app/shared/inputs/search-input/search-input'
import {
  Header as MantineHeader,
  Group,
  Menu,
  Button,
  Avatar,
  Text,
  UnstyledButton,
  createStyles,
} from '@mantine/core'
import { useFilters } from '../../stores/useFilters'
import { ChevronDown, Logout } from 'tabler-icons-react'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: '5px',

    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
}))

export function Header() {
  const { categoryStore, userStore } = useStore()
  const { user } = userStore
  const { searchRequest, setSearchQuery } = useFilters()
  const { classes } = useStyles()
  let navigate = useNavigate()

  const logout = async () => {
    userStore.logout()
    navigate('/')
  }

  const handleInputChange = (searchText: string) => {
    console.log('header')
    console.log(JSON.parse(JSON.stringify(searchRequest)))
    setSearchQuery(searchText)
    console.log(searchRequest)
  }

  // useEffect(() => {
  //   categoryStore.loadCategories()
  // }, [categoryStore])

  return (
    <>
      <MantineHeader height={70} p="xs">
        <Group sx={{ height: '100%' }}>
          <div className={css.webSiteLogo}></div>
          <SearchInput onChange={(searchText) => handleInputChange(searchText)} />
          <Menu
            control={
              <UnstyledButton className={classes.user} color="green">
                <Group>
                  <Avatar size={30} color="cyan" radius="xl">
                    {user?.username[0].toUpperCase()}
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                      {user?.username}
                    </Text>

                    <Text color="dimmed" size="xs">
                      {user?.userRoles[0]}
                    </Text>
                  </div>
                  <ChevronDown size={'10px'} />
                </Group>
              </UnstyledButton>
            }
          >
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
