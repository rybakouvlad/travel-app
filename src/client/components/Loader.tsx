import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader: React.FC = () => {
  return (
    <div className="loader">
      <Spinner animation="border" variant="info" />
    </div>
  );
};
