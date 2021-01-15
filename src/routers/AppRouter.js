import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged( async(user) =>{
            
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                console.log(user.uid)
                //Aca es la primera vez que tenemos contacto con el uid
                //await 
                dispatch( startLoadingNotes( user.uid ) );
            }else{
                setIsLoggedIn( false );
            }
            setChecking(false);
        });

    }, [dispatch, setChecking])

    if (checking) {
        return (
            <div className="auth__main">
                <div className="auth__box-container">
                <h1 className="atuh__title">Wait...</h1>
                    
                </div>
            </div>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes 
                        path="/auth" 
                        component={ AuthRouter }
                        isLoggedIn={ isLoggedIn } 
                    />

                    <PrivateRoutes
                        exact
                        path="/" 
                        component={ JournalScreen }
                        isLoggedIn={ isLoggedIn } 
                    />

                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
