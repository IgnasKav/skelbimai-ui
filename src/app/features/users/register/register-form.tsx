import MyTextInput from 'app/common/form/MyTextInput'
import {useStore} from 'app/stores/store'
import {ErrorMessage, Formik} from 'formik'
import css from '../login-form.module.scss'
import {observer} from 'mobx-react-lite'
import React from 'react'
import {Button, Form, Label} from 'semantic-ui-react'

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    return (
        <div className={css.loginForm}>
            <Formik
                initialValues={{displayName: '', username: '', email: '', password: '', error: null}}

                onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => {
                    setErrors({error: 'Invalid email or password'});
                })}>
                {({handleSubmit, isSubmitting, errors}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='displayName' placeholder='Display Name'/>
                        <MyTextInput name='username' placeholder='Username'/>
                        <MyTextInput name='email' placeholder='Email'/>
                        <MyTextInput name='password' placeholder='Pass' type='password'/>
                        <ErrorMessage name='error' render={() =>
                            <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
                        />
                        <Button loading={isSubmitting} positive content='Registruotis' type='submit' fluid/>
                    </Form>

                )}
            </Formik>
        </div>

    )
})