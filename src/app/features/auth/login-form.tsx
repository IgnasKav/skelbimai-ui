import React, { useState } from 'react'
import { UserFormValues } from 'app/models/user'
import { useNavigate } from 'react-router-dom'
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAuth } from '../../stores/useAuth'

export default function LoginForm() {
  const auth = useAuth()
  let navigate = useNavigate()
  const [formError, setFormError] = useState<string>('')

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const submit = async (values: UserFormValues) => {
    await auth.login(values).catch((error) => setFormError('Invalid email or password'))
    navigate('/advertisementDashboard')
  }

  return (
    <Container size={420} my={40}>
      <form onSubmit={form.onSubmit((values) => submit(values))} autoComplete="off">
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor<'a'> href="#" size="sm" onClick={() => navigate('/register')}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
            mt="md"
          />
          <Group position="apart" mt="md">
            <Checkbox
              label="Remember me"
              {...form.getInputProps('rememberMe', { type: 'checkbox' })}
            />
            <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
