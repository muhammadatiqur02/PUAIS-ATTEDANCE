import React, { createContext, useReducer } from 'react'

import auth from './reducers/auth';
import session from './reducers/session'
import user from './reducers/user'

import authInitialState from './initialStates/authState'
import sessionInitialState from './initialStates/sessionState'
import userInitialState from './initialStates/userState'



export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {

    const [authState, authDispatch] = useReducer(auth, authInitialState)
    const [sessionState, sessionDispatch] = useReducer(session, sessionInitialState)
    const [userState, userDispatch] = useReducer(user, userInitialState)


    return (
        <GlobalContext.Provider
            value={{ authState, authDispatch, sessionState, sessionDispatch, userState, userDispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
