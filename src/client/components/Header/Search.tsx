import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { ICountry, useCountry } from '../../context/country.context';
import i18next from 'i18next';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Search: React.FC = () => {
  const { setIsSearch, setSuitableCountries, countries, suitableCountries } = useCountry();
  const [searchValue, setSearchValue] = useState<string>('');
  const { t } = useTranslation();

  const history = useHistory();
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    if (event.target.value !== '') {
      setIsSearch(true);
      setSuitableCountries(
        countries.filter((el: ICountry) => {
          return (
            el[`name_${i18next.language}` as keyof ICountry].toLowerCase().includes(event.target.value.toLowerCase()) ||
            el[`capital_${i18next.language}` as keyof ICountry].toLowerCase().includes(event.target.value.toLowerCase())
          );
        }),
      );
    } else {
      setIsSearch(false);
    }
  }
  function searchHandler() {
    if (suitableCountries.length === 1) {
      history.push(`/card/${suitableCountries[0].alpha2}`);
      cleanHandler();
    }
  }
  function cleanHandler() {
    setSearchValue('');
    setIsSearch(false);
  }
  return (
    <>
      <InputGroup className="search-wrapper">
        <FormControl
          size="lg"
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchValue}
          autoFocus
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeHandler(event)}
          onKeyPress={(event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
              searchHandler();
            }
          }}
        />
        <InputGroup.Append>
          <InputGroup.Text className="clear-btn" id="basic-addon2" onClick={cleanHandler}></InputGroup.Text>
        </InputGroup.Append>
        <Button className="search-btn" variant="danger" onClick={searchHandler}></Button>
      </InputGroup>
    </>
  );
};
