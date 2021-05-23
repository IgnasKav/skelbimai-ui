import {useStore} from 'app/stores/store'
import {useFormik} from 'formik'
import css from '../login-form.module.scss'
import {observer} from 'mobx-react-lite'
import React, {useState} from 'react'
import * as Yup from "yup";
import {UserFormValues} from "app/models/user";
import CommonInput from "app/shared/inputs/common-input/common-input-field";
import FormError from "app/shared/inputs/form-error/form-error";
import {Card, Button} from "@material-ui/core";
import {history} from "../../../../index";

export default observer(function RegisterForm() {
    const {userStore} = useStore();

    const [formError, setFormError] = useState<string>("");

    const submit = (values: UserFormValues) => {
        userStore.register(values).catch(error => setFormError(error))
    }

    const formik = useFormik({
        initialValues: {displayName: '', username: '', email: '', password: '', error: null},
        validationSchema: Yup.object({
            displayName: Yup.string().required('*'),
            username: Yup.string().required('*'),
            email: Yup.string().email('Neteisingas el.pašto formatas').required('*'),
            password: Yup.string().required('*')
        }),
        onSubmit: (values) => submit(values)
    });

    return (
        <Card className={css.loginForm}>
            <h1>Registracija</h1>
            <form onSubmit={formik.handleSubmit} autoComplete='off'>
                <CommonInput label="Display Name" name="displayName" value={formik.values.displayName}
                             onChange={formik.handleChange}
                             error={formik.errors.displayName}/>
                <CommonInput label="Username" name="username" value={formik.values.username}
                             onChange={formik.handleChange}
                             error={formik.errors.username}/>
                <CommonInput label="E-mail" name="email" value={formik.values.email} onChange={formik.handleChange}
                             error={formik.errors.email}/>
                <CommonInput label="Slaptažodis" name="password" type="password" value={formik.values.password}
                             onChange={formik.handleChange} error={formik.errors.password}/>
                <FormError error={formError}/>
                <div className={css.formButtons}>
                    <Button variant="outlined" color="secondary" onClick={() => history.push('/login')}>
                        Prisijungimas
                    </Button>
                    <Button variant="outlined" color="primary" type="submit">
                        Registruotis
                    </Button>
                </div>
            </form>
        </Card>

    )
})