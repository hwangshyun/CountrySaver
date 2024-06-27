import React from "react";
import { Country } from "../types/country";
import { getCountries } from "../api/countries";
import { saveSelectedCountries } from "../api/saveCountries";
import { getSelectedCountries } from "../api/getSelectedCountries";
import { deleteCountry } from "../api/deleteCountry";
import CountryCard from "./CountryCard";
import styled from "styled-components";

const StyledCountryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

const StyledSaveButton = styled.button`
  margin-left: 15px;
  width: 50px;
  height: 30px;
  margin-top: 26px;
  background-color: orange;
  font-weight: bold;
  border: 1px solid orange;
  border-radius: 3px;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: #ffe8be;
    border: none; 
  }
`;

const CountryList: React.FC = () => {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = React.useState<Country[]>([]);

  const handleSelectCountry = (country: Country): void => {
    if (!selectedCountries.find((selectedCountry: Country) => selectedCountry.name.common === country.name.common)) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      setSelectedCountries(selectedCountries.filter((selectedCountry: Country) => selectedCountry.name.common !== country.name.common));
    }
  };

  const handleSaveCountries = async () => {
    // Supabase에 저장 전에 현재 저장된 나라 목록을 가져옵니다.
    const existingCountries = await getSelectedCountries();

    // 삭제된 나라들을 찾아서 Supabase에서 삭제합니다.
    const countriesToDelete = existingCountries.filter((existingCountry: Country) => 
      !selectedCountries.find((selectedCountry: Country) => 
        selectedCountry.name.common === existingCountry.name.common
      )
    );

    for (const country of countriesToDelete) {
      await deleteCountry(country);
    }

    // 나머지 나라들을 Supabase에 저장합니다.
    await saveSelectedCountries(selectedCountries);
    alert("저장됐습니다~하핫");
  };

  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data: Country[] = await getCountries();
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchCountries();
  }, []);

  React.useEffect(() => {
    const fetchSelectedCountries = async () => {
      const data: Country[] = await getSelectedCountries();
      setSelectedCountries(data);
    };
    fetchSelectedCountries();
  }, []);

  return (
    <div style={{ justifyContent: "center" }}>
      <div>
        <span style={{ display: "flex" }}>
          <h1>선택된 나라 목록</h1>{" "}
          <StyledSaveButton onClick={handleSaveCountries}>
            저장
          </StyledSaveButton>
        </span>
        <StyledCountryBox>
          {selectedCountries.map((country: Country) => (
            <CountryCard
              country={country}
              key={country.name.common}
              handleSelectCountry={handleSelectCountry}
            />
          ))}
        </StyledCountryBox>
      </div>
      <div>
        <h1>나라 목록</h1>
        <StyledCountryBox>
          {countries.map((country: Country) => (
            <CountryCard
              country={country}
              key={country.name.common}
              handleSelectCountry={handleSelectCountry}
            />
          ))}
        </StyledCountryBox>
      </div>
    </div>
  );
};

export default CountryList;
