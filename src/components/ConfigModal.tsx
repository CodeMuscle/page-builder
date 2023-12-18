// components/ConfigModal.tsx
import React, { useState } from 'react';

interface ConfigModalProps {
  element: {
    id: string;
    type: string;
    x: number;
    y: number;
    // Additional properties based on the element type
  };
  onSaveConfig: (config: any) => void;
  onDelete: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ onSaveConfig, onDelete }) => {
  const [config, setConfig] = useState<any>({
    // Initialize with existing element properties
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
        {/* Additional input fields based on the element type */}
        <button onClick={handleSaveChanges}>Save Changes</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ConfigModal;
