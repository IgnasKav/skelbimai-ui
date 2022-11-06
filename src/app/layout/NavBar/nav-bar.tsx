import React, { useState } from 'react'
import { createStyles, Navbar } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Businessplan, FilePlus, Heart, Home, SquarePlus, X } from 'tabler-icons-react'
import { CategoryFilter } from '../../models/SearchRequest'
import css from './nav-bar.module.scss'
import { Category } from '../../models/Category'
import TreeSelect from '../../shared/inputs/tree-select/tree-select'
import { useFilters } from '../../stores/useFilters'
import { UserRoles } from '../../models/user'
import { useAuth } from '../../stores/useAuth'

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

export function NavBar() {
  const [active, setActive] = useState<string>('')
  const auth = useAuth()
  const { setCategoryFilters } = useFilters()
  let navigate = useNavigate()

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
        {auth.user?.userRoles.find(
          (role) => role === UserRoles.Support || role === UserRoles.Admin
        ) && (
          <NavBarLink
            onClick={(activeLink: string) => onLinkClick('/unapproved', activeLink)}
            icon={<X />}
            label="Unapproved"
            activeLink={active}
          />
        )}
        {auth.user?.userRoles.find(
          (role) => role === UserRoles.Support || role === UserRoles.Admin
        ) && (
          <NavBarLink
            onClick={(activeLink: string) => onLinkClick('/categoriesDashboard', activeLink)}
            icon={<FilePlus />}
            label="New category"
            activeLink={active}
          />
        )}
        <NavBarLink
          onClick={(activeLink: string) => onLinkClick('/createAdvertisement', activeLink)}
          icon={<SquarePlus />}
          label="New advertisement"
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
          icon={<Heart />}
          label="Watch later"
          activeLink={active}
        />
        {auth.user?.userRoles.find(
          (role) => role === UserRoles.Support || role === UserRoles.Admin
        ) && (
          <NavBarLink
            onClick={(activeLink: string) => onLinkClick('/backgroundJobs', activeLink)}
            icon={<FilePlus />}
            label="Background jobs"
            activeLink={active}
          />
        )}
        <TreeSelect
          className={css.categoryFilter}
          name="category"
          label="Category"
          multipleSelect={true}
          value={new Category()}
          onChange={handleCategoriesFilterChange}
        />
      </Navbar.Section>
    </Navbar>
  )
}
