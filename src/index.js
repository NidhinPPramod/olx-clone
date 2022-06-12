import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, {FirebaseContext} from "./Firebase/Context"
import {auth, db, Firebase} from "./Firebase/config";


ReactDOM.render(
    <FirebaseContext.Provider value={{Firebase, db, auth}}>
        <Context>
            <App/>
        </Context>
    </FirebaseContext.Provider>
    , document.getElementById('root'));
