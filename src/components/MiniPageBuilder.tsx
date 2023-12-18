// components/MiniPageBuilder.tsx
import React, { useState, useEffect, DragEvent } from 'react';
import BlockSidebar from './BlockSidebar';
import ConfigModal from './ConfigModal';
import PageElementComponent from './PageElementComponent';
import { PageElement } from '../utils/types';

const MiniPageBuilder: React.FC = () => {
  const [elements, setElements] = useState<PageElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    console.log('Drop event triggered');
    e.preventDefault();

    const elementType = e.dataTransfer.getData('text/plain');
    const x = e.clientX;
    const y = e.clientY;
    console.log('Drop coordinates:', x, y);

    // Check if the drop occurred inside the main page area
    const mainPageRect = e.currentTarget.getBoundingClientRect();
    console.log('Main page rect:', mainPageRect); // Add this log
    if (
      mainPageRect &&
      x >= mainPageRect.left &&
      x <= mainPageRect.right &&
      y >= mainPageRect.top &&
      y <= mainPageRect.bottom
    ) {
      // Simulate a drop at the mouse coordinates
      onDrop(x, y, elementType);
    }
  };

  const onDrop = (x: number, y: number, elementType: string) => {
    const sidebarWidth = 200;
    const adjustedX = x - sidebarWidth;

    const newElement: PageElement = {
      id: `element-${elements.length + 1}`,
      type: elementType,
      x: adjustedX,
      y,
    };

    setElements((prevElements) => [...prevElements, newElement]);
    setSelectedElement(newElement);
  };

  const handleElementClick = (element: PageElement) => {
    setSelectedElement(element);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveConfig = (config: any) => {
    if (selectedElement) {
      const updatedElements = elements.map((el) =>
        el.id === selectedElement.id ? { ...el, ...config } : el
      );
      setElements(updatedElements);
      setSelectedElement(null);
    }
  };

  const handleDeleteElement = () => {
    if (selectedElement) {
      setElements(elements.filter((el) => el.id !== selectedElement.id));
      setSelectedElement(null);
    }
  };

  const handleExport = () => {
    const jsonConfig = JSON.stringify(elements, null, 2);
  
    const blob = new Blob([jsonConfig], { type: 'application/json' });
  
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'page_config.json';
  
    document.body.appendChild(a);
  
    a.click();
  
    document.body.removeChild(a);
  };

  useEffect(() => {
    // Handle opening the configuration modal when selectedElement changes
    if (selectedElement !== null) {
      console.log('Opening Config Modal:', selectedElement);
    }
  }, [selectedElement]);

  return (
    <div>
      <BlockSidebar onDragStart={() => {}} />
      <div className="page" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {elements.map((element) => (
          <PageElementComponent
            key={element.id}
            element={element}
            onClick={() => handleElementClick(element)}
          />
        ))}
      </div>
      {selectedElement && (
        <ConfigModal
          element={selectedElement}
          onSaveConfig={handleSaveConfig}
          onDelete={handleDeleteElement}
        />
      )}
      <button onClick={handleExport}>Export Configuration</button>
    </div>
  );
};

export default MiniPageBuilder;
