import MyTextInput from 'app/common/form/MyTextInput'
import { useStore } from 'app/stores/store'
import { Formik } from 'formik'
import { values } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Form } from 'semantic-ui-react'


export default observer( function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik initialValues={{ email: '', password: '' }} onSubmit={values => userStore.login(values)}>
            {({ handleSubmit, isSubmitting }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Pass' type='password' />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>

            )}


        </Formik>
    )
})