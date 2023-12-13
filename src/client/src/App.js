import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PouchDB from 'pouchdb';
import authentication from 'pouchdb-authentication';
import { Panel } from './Panel';

PouchDB.plugin(authentication);

let App = () => {
    return (
        <Routes>
            <Route path="panels/:id" element={<Panel />} />
        </Routes>
    );
}

export default App;
