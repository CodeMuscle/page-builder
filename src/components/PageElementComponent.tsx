// components/PageElement.tsx
import React from 'react';

interface PageElementProps {
  element: {
    id: string;
    type: string;
    x: number;
    y: number;
    text?: string;
    // Additional properties based on the element type
  };
  onClick: () => void;
}

const PageElementComponent: React.FC<PageElementProps> = ({ element, onClick }) => {
  const renderElementContent = () => {
    // Customize the rendering based on the element type
    switch (element.type) {
      case 'label':
        return <span>{element.text}</span>;
      case 'input':
        return <input type="text" />;
      case 'button':
        return <button>{element.text}</button>;
      default:
        return null;
    }
  };

  return (
    <div
      className="page-element"
      style={{ left: `${element.x}px`, top: `${element.y}px` }}
      onClick={onClick}
    >
      <img src="/drag-and-drop.png" alt="dots" width={12} height={12} />
      {renderElementContent()}
    </div>
  );
};

export default PageElementComponent;
