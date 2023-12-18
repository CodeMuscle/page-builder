// components/BlockSidebar.tsx
import React from 'react';
import './BlockSidebar.css';

interface BlockSidebarProps {
  // onDragStart: (elementType: string) => void;
  // onDragStart: (e: DragEvent<HTMLDivElement>, elementType: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
}

const BlockSidebar: React.FC<BlockSidebarProps> = ({ onDragStart }) => {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, elementType: string) => {
    console.log('Drag Start:', elementType);
    onDragStart(e, elementType);
    e.dataTransfer.setData('text/plain', elementType);
  };

  return (
    <div className="sidebar-wrapper expanded">
      <div className="sidebar">
        <h2>BLOCKS</h2>
        <div
          className="block"
          draggable
          onDragStart={(e) => handleDragStart(e, 'label')}
        >
          <img src="/drag-and-drop.png" alt="dots" width={12} height={12} />
          Label
        </div>
        <div
          className="block"
          draggable
          onDragStart={(e) => handleDragStart(e, 'input')}
        >
          <img src="/drag-and-drop.png" alt="dots" width={12} height={12} />
          Input
        </div>
        <div
          className="block"
          draggable
          onDragStart={(e) => handleDragStart(e, 'button')}
        >
          <img src="/drag-and-drop.png" alt="dots" width={12} height={12} />
          Button
        </div>
      </div>
    </div>
  );
};

export default BlockSidebar;
