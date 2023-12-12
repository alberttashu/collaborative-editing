import React, { useState } from 'react';
import Panel from './Panel';

let App = () => {
    let [panel, setPanel] = useState({
        counter: 1,
        list: [ "one", "two" ],
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
        <div className="model-container">
            <Panel panel={panel} onUpdate={handlePanelUpdate} />
        </div>
    );
}


export default App;
