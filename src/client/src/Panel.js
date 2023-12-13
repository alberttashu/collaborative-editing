import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PouchDB from 'pouchdb';
import axios from 'axios';
import PanelVisualization from './PanelVisualization';

export const Panel = () => {
    const { id } = useParams();
    const [panel, setPanel] = useState(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetchPanel = async () => {
            try {
                setFetching(true);
                const response = await axios.get(`http://localhost:5001/panels/${id}`);
                const { panel: fetchedPanel } = response.data;

                setPanel(fetchedPanel);

                const localDb = new PouchDB('local_db');

                const existingDoc = await localDb.get(id).catch((error) => {
                    if (error.status === 404) {
                        return null;
                    } else {
                        throw error;
                    }
                });

                let putModel = {
                    _id: id,
                    _rev: existingDoc ? existingDoc._rev : undefined, // setting rev only for existing documents 
                    panel: { ...fetchedPanel },
                };

                await localDb.put(putModel, { force: true });

                const serverDb = new PouchDB("http://localhost:5984/panels", { skip_setup: true });

                await serverDb.logIn('admin', 'password');

                const sync = localDb.sync(serverDb, {
                    live: true,
                    retry: true,
                });

                sync.on('change', (info) => {
                    console.log('Sync change: ', info);
                    localDb.get(id).then((updatedDoc) => {
                        setPanel(updatedDoc.panel);
                    });
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
            finally {
                setFetching(false);
            }
        };

        if (!fetching) {
            fetchPanel();
        }
    }, [id]);

    const onUpdate = async (updatedPanel) => {
        try {
            const localDb = new PouchDB('local_db');
            const doc = await localDb.get(id);

            let updatedDoc = {
                ...doc,
                panel: { ...updatedPanel }
            };

            try {
                await localDb.put(updatedDoc);
            } catch (error) {

                // logic to handle conflicts can be put here
                // currently just override with the new updated version

                console.error('Possible local conflic:', error);
                const latestDoc = await localDb.get(id);
                updatedDoc._rev = latestDoc._rev;
                console.log(doc);
                console.log(updatedDoc);
                await localDb.put(updatedDoc);
            }

            setPanel({
                ...doc,
                ...updatedPanel,
            });
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    return (
        <div>
            {panel
                ? <PanelVisualization panel={panel} onUpdate={onUpdate} />
                : "PANEL NOT LOADED"}
        </div>
    );

};
