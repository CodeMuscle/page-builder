/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface ConfigModalProps {
  element: {
    id: string;
    type: string;
    x: number;
    y: number;
    text?: string;
    fontSize?: number; // Add fontSize property
    fontWeight?: string; // Add fontWeight property
    // Additional properties based on the element type
  };
  onSaveConfig: (config: any) => void;
  onDelete: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ element, onSaveConfig, onDelete }) => {
  const [config, setConfig] = useState<any>({
    text: element.text || '', // Initialize with existing element properties
    x: element.x || 0, // Initialize with existing x coordinate
    y: element.y || 0, // Initialize with existing y coordinate
    fontSize: element.fontSize || 12, // Initialize with existing fontSize or a default value
    fontWeight: element.fontWeight || 'normal', // Initialize with existing fontWeight or a default value
    // Additional properties based on the element type
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    onSaveConfig(config);
  };

  return (
    <div className="config-modal-overlay">
      <div className="config-modal">
        <h3>Configuration</h3>
        <label>
          Text:
          <input type="text" name="text" value={config.text} onChange={handleInputChange} />
        </label>
        <label>
          X:
          <input type="number" name="x" value={config.x} onChange={handleInputChange} />
        </label>
        <label>
          Y:
          <input type="number" name="y" value={config.y} onChange={handleInputChange} />
        </label>
        <label>
          Font Size:
          <input type="number" name="fontSize" value={config.fontSize} onChange={handleInputChange} />
        </label>
        <label>
          Font Weight:
          <input type="text" name="fontWeight" value={config.fontWeight} onChange={handleInputChange} />
        </label>
        {/* Additional input fields based on the element type */}
        <button onClick={handleSaveChanges}>Save Changes</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ConfigModal;
