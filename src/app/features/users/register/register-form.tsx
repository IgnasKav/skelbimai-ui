import {useStore} from 'app/stores/store'
import {observer} from 'mobx-react-lite'
import React from 'react'
import {UserFormValues} from "app/models/user";
import {useNavigate} from "react-router-dom";
import {Anchor, Container, Paper, PasswordInput, Text, TextInput, Title, Button} from "@mantine/core";
import {useForm} from "@mantine/form";

export default observer(function RegisterForm() {
    let navigate = useNavigate();
    const {userStore} = useStore();

    const submit = async (values: UserFormValues) => {
       await userStore.register(values).catch(error => console.log(error));
       navigate('/advertisementDashboard');
    }

    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            displayName: '',
            password: ''
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <Container size={420} my={40}>
            <form onSubmit={form.onSubmit((values) => submit(values))} autoComplete='off'>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Register new account
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Already have an account?{' '}
                    <Anchor<'a'> href="#" size="sm" onClick={() => navigate('/login')}>
                        Login
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput  label="Email" {...form.getInputProps('email')} placeholder="you@email.com" required mt="md"/>
                    <TextInput  label="Username" {...form.getInputProps('username')} placeholder="Unique username" required mt="md"/>
                    <TextInput  label="Display Name" {...form.getInputProps('displayName')} placeholder="Your name and surname" required mt="md"/>
                    <PasswordInput label="Password" {...form.getInputProps('password')} placeholder="Your password" required mt="md" />

                    <Button type="submit" fullWidth mt="xl">
                        Register
                    </Button>
                </Paper>
            </form>
        </Container>
    )
})
