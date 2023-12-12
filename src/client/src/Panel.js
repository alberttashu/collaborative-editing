
const Panel = ({ panel, onUpdate }) => {
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
    const updatedList = operation === 'add' ? [...list, `new${list.length + 1}`] : list.slice(0, -1);
    onUpdate({
      ...panel,
      list: updatedList,
    });
  };

  return (
    <div>
      <h2>Panel Visualization</h2>
      <div>
        <p>Counter: {counter}</p>
        <button onClick={() => handleCounterChange('increment')}>+</button>
        <button onClick={() => handleCounterChange('decrement')}>-</button>
      </div>
      <div>
        <p>List:</p>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button onClick={() => handleListChange('add')}>Add Item</button>
        <button onClick={() => handleListChange('remove')}>Remove Item</button>
      </div>
      <div>
        <p>Switches:</p>
        {Object.keys(switches).map((switchName) => (
          <div key={switchName}>
            <label>
              {switchName}
              <input
                type="checkbox"
                checked={switches[switchName]}
                onChange={() => handleSwitchToggle(switchName)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panel;
