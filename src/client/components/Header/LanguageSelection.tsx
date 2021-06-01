import React from 'react';
import i18next from 'i18next';
import Select from 'react-select';

type OptionType = { label: string; value: string };

const options: OptionType[] = [
  { value: 'ru', label: 'ru' },
  { value: 'by', label: 'by' },
  { value: 'en', label: 'en' },
];

export const LanguageSelection: React.FC = () => {
  const changeHandler = (selected?: OptionType): void => {
    i18next.changeLanguage(selected.value);
  };
  return (
    <Select
      className="lan_selector"
      defaultValue={{ value: i18next.language, label: i18next.language }}
      onChange={changeHandler}
      options={options}
    />
  );
};
