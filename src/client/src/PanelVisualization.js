import React, { useEffect, useState } from 'react';

const PanelVisualization = ({ id, panel, onUpdate }) => {
  const { counter, list, switches } = panel;

  const handleSwitchToggle = (switchName) => {
    onUpdate({
      ...panel,
      switches: {
        ...switches,
        [switchName]: !switches[switchName],
      },
    });
  };

  const handleCounterChange = (operation) => {
    onUpdate({
      ...panel,
      counter: operation === 'increment' ? counter + 1 : counter - 1,
    });
  };

  const handleListChange = (operation) => {
    const updatedList =
      operation === 'add' ? [...list, `new${list.length + 1}`] : list.slice(0, -1);
    onUpdate({
      ...panel,
      list: updatedList,
    });
  };

  return (
    <div style={styles.panelContainer}>
      <h2 style={styles.header}>Panel: {id}</h2>
      <div style={styles.section}>
        <p>Counter: {counter}</p>
        <button style={styles.button} onClick={() => handleCounterChange('increment')}>
          +
        </button>
        <button style={styles.button} onClick={() => handleCounterChange('decrement')}>
          -
        </button>
      </div>
      <div style={styles.section}>
        <p>Switches:</p>
        {Object.keys(switches).map((switchName) => (
          <div key={switchName} style={styles.switchContainer}>
            <label style={styles.switchLabel}>
              {switchName}
              <input
                type="checkbox"
                checked={switches[switchName]}
                onChange={() => handleSwitchToggle(switchName)}
                style={styles.checkbox}
              />
            </label>
          </div>
        ))}
      </div>
      <div style={styles.section}>
        <p>List:</p>
        <button style={styles.button} onClick={() => handleListChange('add')}>
          Add Item
        </button>
        <button style={styles.button} onClick={() => handleListChange('remove')}>
          Remove Item
        </button>
        <ul style={styles.list}>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  panelContainer: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    margin: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '15px',
  },
  section: {
    marginBottom: '20px',
  },
  button: {
    marginRight: '10px',
    padding: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  switchContainer: {
    marginBottom: '10px',
  },
  switchLabel: {
    marginLeft: '5px',
    cursor: 'pointer',
  },
  checkbox: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
};

export default PanelVisualization;

// const PanelVisualization = ({ panel, onUpdate }) => {
//   const { counter, list, switches } = panel;
//
//   const handleSwitchToggle = (switchName) => {
//     onUpdate({
//       ...panel,
//       switches: {
//         ...switches,
//         [switchName]: !switches[switchName],
//       },
//     });
//   };
//
//   const handleCounterChange = (operation) => {
//     onUpdate({
//       ...panel,
//       counter: operation === 'increment' ? counter + 1 : counter - 1,
//     });
//   };
//
//   const handleListChange = (operation) => {
//     const updatedList = operation === 'add' ? [...list, `new${list.length + 1}`] : list.slice(0, -1);
//     onUpdate({
//       ...panel,
//       list: updatedList,
//     });
//   };
//
//   return (
//     <div>
//       <h2>Panel Visualization</h2>
//       <div>
//         <p>Counter: {counter}</p>
//         <button onClick={() => handleCounterChange('increment')}>+</button>
//         <button onClick={() => handleCounterChange('decrement')}>-</button>
//       </div>
//       <div>
//         <p>List:</p>
//         <ul>
//           {list.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//         <button onClick={() => handleListChange('add')}>Add Item</button>
//         <button onClick={() => handleListChange('remove')}>Remove Item</button>
//       </div>
//       <div>
//         <p>Switches:</p>
//         {Object.keys(switches).map((switchName) => (
//           <div key={switchName}>
//             <label>
//               {switchName}
//               <input
//                 type="checkbox"
//                 checked={switches[switchName]}
//                 onChange={() => handleSwitchToggle(switchName)}
//               />
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
//
// export default PanelVisualization;
