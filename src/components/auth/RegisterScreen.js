import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui )

    const [ formValues, handleInputChange ] = useForm({
        name: 'Marcos',
        email: 'marcos@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        //dispatch( startLoginEmailPassword( email, password ) );
        
        if (isFormValid()) {
            
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );

        }
    }

    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is required') )
            //console.log('name is required')
            return false;
        }else if ( !validator.isEmail( email )) {
            dispatch( setError('Email isnt valid') )
            //console.log( 'Email isnt valid' )
            return false;
        }else if ( password !== password2 || password.length <= 5 ){
            dispatch( setError('Passwords incorrect') )
            //console.log( 'Passwords incorrect' )
            return false;
        }
        
        dispatch( removeError() )

        return true;

    }

    return (
        <>
            <h3 className="atuh__title">Register</h3>
            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                    <div className="auth__alert-error">
                        {
                            msgError
                        }
                    </div>
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value={ name }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value={ email }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ password }
                />

                <input 
                    type="password"
                    placeholder="Confirm your Password"
                    name="password2"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ password2 }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

            </form>
            
            <Link to="/auth/login"
                className="link"
            >
                Already register?
            </Link>

        </>
    )
}
