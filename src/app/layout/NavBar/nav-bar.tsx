import React from 'react';
import {Group, Navbar, UnstyledButton, ThemeIcon, Text} from "@mantine/core";
import {useStore} from "../../stores/store";
import {useNavigate} from "react-router-dom";
import { FilePlus, SquarePlus, Logout } from 'tabler-icons-react';
import {CategoryFilter} from "../../models/SearchRequest";
import css from "./nav-bar.module.scss";
import {Category} from "../../models/Category";
import TreeSelect from "../../shared/inputs/tree-select/tree-select";

interface NavBarLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    onClick?: () => void;
}

function NavBarLink({ icon, color, label, onClick}: NavBarLinkProps) {
    return(
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
    const {userStore, advertisementStore} = useStore();
    let navigate = useNavigate();

    const logout = async () => {
        userStore.logout();
        navigate('/');
    }

    const handleCategoriesFilterChange = (event: any) => {
        const {value}: {value: CategoryFilter[]} = event.target;
        advertisementStore.setCategoryFilters(value);
    }

    return (
        <Navbar width={{base: 300}}>
            <Navbar.Section grow mt="md">
                <NavBarLink onClick={() => navigate('/categoriesDashboard')} icon={<FilePlus size={16}/>} color="blue" label="New category" />
                <NavBarLink onClick={() => navigate('/createAdvertisement')} icon={<SquarePlus size={16}/>} color="blue" label="New advertisement" />
                <TreeSelect className={css.categoryFilter} name="category" label="Category" multipleSelect={true} value={new Category()} onChange={handleCategoriesFilterChange}/>
            </Navbar.Section>
            <Navbar.Section>
                <NavBarLink onClick={logout} icon={<Logout size={16}/>} color="red" label="Log out" />
            </Navbar.Section>
        </Navbar>
    )
}