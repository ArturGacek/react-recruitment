import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto mt-10 max-w-[90%] sm:max-w-[420px] mb-10">
      {children}
    </div>
  );
};

export default Container;
