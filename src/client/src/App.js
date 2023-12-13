import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import PouchDB from 'pouchdb';
import axios from 'axios';
import PanelVisualization from './PanelVisualization';



const Panel = () => {
    const { id } = useParams();
    const [panel, setPanel] = useState(null);
    useEffect(() => {
        const fetchPanel = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/panels/${id}`);
                const data = response.data;

                // here conflict resolution can happen
                setPanel(data.panel);

                const pouchDb = new PouchDB('local_db');

                const sync = pouchDb.sync(`http://localhost:5984/panels/${id}`, {
                    live: true,
                    retry: true,
                });

                sync.on('change', (info) => {
                    console.log('Sync change: ', info);
                });

                sync.on('error', (info) => {
                    console.log('Sync error: ', info);
                });

                return () => {
                    sync.cancel();
                };
            }
            catch (error) {
                console.error('Error fetching document:', error);
            }

        };

        fetchPanel();
    }, [id, setPanel]);


    return (
        <div>
    {
        panel 
        ? <PanelVisualization panel={panel} onUpdate={setPanel} />
        : "PANEL NOT LOADED"

    }
        </div>
    )

};


let App = () => {
    let [panel, setPanel] = useState({
        counter: 1,
        list: ["one", "two"],
        switches: {
            a: true,
            b: false,
            c: true,
            d: false
        }
    });

    const handlePanelUpdate = (updatedPanel) => {
        setPanel(updatedPanel);
    }

    return (
        <Routes>
            <Route path="test/:id" element={<PanelVisualization panel={panel} onUpdate={setPanel} />} />
            <Route path="panels/:id" element={<Panel />} />
        </Routes>
    );
}

// <Panel panel={panel} onUpdate={handlePanelUpdate} />

export default App;
