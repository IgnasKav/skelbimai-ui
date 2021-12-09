import {useStore} from 'app/stores/store'
import {useFormik} from 'formik'
import {observer} from 'mobx-react-lite'
import React, {useState} from 'react'
import CommonInput from "app/shared/inputs/common-input/common-input-field";
import * as Yup from 'yup';
import {UserFormValues} from "app/models/user";
import FormError from "app/shared/inputs/form-error/form-error";
import {history} from "index";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    const [formError, setFormError] = useState<string>("");

    const submit = (values: UserFormValues) => {
        userStore.login(values).catch(error => setFormError( 'Invalid email or password'))
    }

    const formik = useFormik({
        initialValues: {email: '', password: '', error: null},
        validationSchema: Yup.object({
            email: Yup.string().email('Neteisingas el.pašto formatas').required('*'),
            password: Yup.string().required('*')
        }),
        onSubmit: (values) => submit(values)
    });


    return (
        <div>
            <h1>Prisijungimas</h1>
            <form onSubmit={formik.handleSubmit} autoComplete='off'>
                <CommonInput label="E-mail" name="email" value={formik.values.email} onChange={formik.handleChange}
                             error={formik.errors.email}/>
                <CommonInput label="Slaptažodis" name="password" type="password" value={formik.values.password}
                             onChange={formik.handleChange} error={formik.errors.password}/>
                <FormError error={formError}/>
                <div>
                    <button onClick={() => history.push('/register')}>
                        Registracija
                    </button>
                    <button type="submit">
                        Prisijungti
                    </button>
                </div>
            </form>
        </div>
    )
})
