import React from 'react';
import { Form } from 'react-bootstrap';
import i18next from 'i18next';

export const LanguageSelection: React.FC = () => {
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    i18next.changeLanguage(event.target.value);
  };
  return (
    <Form.Control className="lan_selector" as="select" onChange={changeHandler} defaultValue={i18next.language}>
      <option value="ru">ru</option>
      <option value="by">by</option>
      <option value="en">en</option>
    </Form.Control>
  );
};
