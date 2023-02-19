import React, { useEffect } from 'react';
import {
    Center, Paper, PasswordInput, TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../../stores/useAuth';

export default function Settings() {
    const { user } = useAuth();
    const form = useForm({
        initialValues: {
            displayName: user?.displayName,
            email: user?.username ?? '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <>
            <Center>
                <form action="">
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput
                            label="Display name"
                            {...form.getInputProps('displayName')}
                            placeholder="Display name"
                            required
                        />
                        <TextInput
                            label="Email"
                            {...form.getInputProps('email')}
                            placeholder="you@email.com"
                            required
                        />
                        <PasswordInput
                            label="Password"
                            {...form.getInputProps('password')}
                            placeholder="Your password"
                            required
                        />
                    </Paper>
                </form>
            </Center>
        </>
    );
}
