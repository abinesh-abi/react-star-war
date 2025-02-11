// import React from 'react'

// export default function Login() {
//   return (
//     <div>Login</div>
//   )
// }

import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { FormEventHandler, useState } from 'react';
import { User } from '../../types/global';
import { useAppStore } from '../../store/app.store';
import { useNavigate } from 'react-router-dom';

const user = { email: 'testuser@test.com', password: '1234' }

export default function Login() {
    const navigate = useNavigate();

    const { setAuth } = useAppStore()
    const [formData, setFormData] = useState<User>({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleLogin: FormEventHandler<HTMLFormElement> = function (e) {
        e.preventDefault()
        const { email, password } = formData
        if (!email || !password) return setError('Email And Passwords Are required')
        if (email !== user.email ||
            password !== user.password
        ) return setError('Invalid User or Password')

        setError('')

        setAuth(true)
        navigate('/')

    }
    return (
        <form onSubmit={handleLogin} className='flex justify-center items-center h-full'>
            <Container size={420} my={40}>
                <Title ta="center" >
                    Welcome back!
                </Title>
                {/* <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text> */}

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput
                        label="Email"
                        placeholder="Enter Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(data => ({ ...data, email: e.target.value }))}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required mt="md"
                        value={formData.password}
                        onChange={(e) => setFormData(data => ({ ...data, password: e.target.value }))}
                    />
                    {/* <Group mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group> */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Button type='submit' fullWidth mt="xl">
                        Sign in
                    </Button>
                </Paper>
            </Container>
        </form>
    );
}