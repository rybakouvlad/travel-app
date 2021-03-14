import React from 'react';
import { Button, Form } from 'react-bootstrap';

export const Search: React.FC = () => {
  return (
    <>
      <Form.Group>
        <Form.Control size="lg" type="text" placeholder="Russia" autoFocus />
        <Button className="search-btn" variant="danger"></Button>
      </Form.Group>
    </>
  );
};
