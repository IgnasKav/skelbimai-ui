import React from 'react'
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'

export default function Settings() {
  const form = useForm({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  return (
    <>
      <Center>
        <form action="">
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Display name"
              {...form.getInputProps('displayName')}
              placeholder="you@email.com"
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
              mt="md"
            />
          </Paper>
        </form>
      </Center>
    </>
  )
}
