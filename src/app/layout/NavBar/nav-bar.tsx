import React, { useState } from 'react'
import { Group, Navbar, UnstyledButton, ThemeIcon, Text, createStyles } from '@mantine/core'
import { useStore } from '../../stores/store'
import { useNavigate } from 'react-router-dom'
import {
  FilePlus,
  SquarePlus,
  Logout,
  Home,
  FaceId,
  AddressBook,
  Businessplan,
} from 'tabler-icons-react'
import { CategoryFilter } from '../../models/SearchRequest'
import css from './nav-bar.module.scss'
import { Category } from '../../models/Category'
import TreeSelect from '../../shared/inputs/tree-select/tree-select'
import { useFilters } from '../../stores/useFilters'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')

  return {
    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        },
      },
    },
  }
})

interface NavBarLinkProps {
  icon: React.ReactNode
  label: string
  onClick: (activeLink: string) => void
  activeLink: string
}

function NavBarLink({ icon, label, onClick, activeLink }: NavBarLinkProps) {
  const { classes, cx } = useStyles()

  return (
    <a
      className={cx(classes.link, { [classes.linkActive]: label === activeLink })}
      key={label}
      onClick={(event) => {
        event.preventDefault()
        onClick(label)
      }}
    >
      <div className={classes.linkIcon}>{icon}</div>
      <span>{label}</span>
    </a>
  )
}

interface LogOutLinkProps {
  icon: React.ReactNode
  color: string
  label: string
  onClick: () => void
  activeLink: string
}

function LogOutLink({ icon, color, label, onClick }: LogOutLinkProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.black,

        '&:hover': {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

export function NavBar() {
  const [active, setActive] = useState<string>('')
  const { userStore } = useStore()
  const { setCategoryFilters } = useFilters()
  let navigate = useNavigate()

  const logout = async () => {
    userStore.logout()
    navigate('/')
  }

  const handleCategoriesFilterChange = (event: any) => {
    const { value }: { value: CategoryFilter[] } = event.target
    setCategoryFilters(value)
  }

  const onLinkClick = (url: string, activeLink: string) => {
    navigate(url)
    setActive(activeLink)
  }

  return (
    <Navbar width={{ base: 300 }}>
      <Navbar.Section grow mt="md">
        <NavBarLink
          onClick={(activeLink: string) => onLinkClick('/advertisementDashboard', activeLink)}
          icon={<Home />}
          label="Home"
          activeLink={active}
        />
        <NavBarLink
          onClick={(activeLink: string) => onLinkClick('/categoriesDashboard', activeLink)}
          icon={<FilePlus />}
          label="New category"
          activeLink={active}
        />
        <NavBarLink
          onClick={(activeLink: string) => onLinkClick('/createAdvertisement', activeLink)}
          icon={<SquarePlus />}
          label="New advertisement"
          activeLink={active}
        />
        <NavBarLink
          onClick={(activeLink: string) => onLinkClick('/advertisementDashboard', activeLink)}
          icon={<FaceId />}
          label="User list"
          activeLink={active}
        />
        <NavBarLink
          onClick={(activeLink: string) => onLinkClick('/myAdvertisements', activeLink)}
          icon={<Businessplan />}
          label="My advertisements"
          activeLink={active}
        />
        <NavBarLink
          onClick={(activeLink: string) => onLinkClick('/watchLater', activeLink)}
          icon={<AddressBook />}
          label="Watch later"
          activeLink={active}
        />
        <TreeSelect
          className={css.categoryFilter}
          name="category"
          label="Category"
          multipleSelect={true}
          value={new Category()}
          onChange={handleCategoriesFilterChange}
        />
      </Navbar.Section>
      <Navbar.Section>
        <LogOutLink
          onClick={logout}
          icon={<Logout size={16} />}
          color="red"
          label="Log out"
          activeLink={active}
        />
      </Navbar.Section>
    </Navbar>
  )
}
