import styled from "styled-components";
import { Country } from "../types/country";



const StyledCard = styled.div`
    width : auto;
    height : auto;
    border : 2px , solid , #7b7b7b;
    border-radius: 20px;
    text-align : center;
    padding : 12px;   
    transition: 0.2s;
    &:hover {
       background-color : #7b7b7b;
        transform :scale(1.05);
        border:solid,  white;
        
    }
`   

interface CountryCardProps {
  country: Country;
  handleSelectCountry: (country: Country) => void;  
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  handleSelectCountry,
}) => {
  return (
    <StyledCard onClick={() => handleSelectCountry(country)}>
      <img src={country.flags.svg} style={{ width: "auto", height: "80px", borderRadius: "8px"}} />
      <h3>{country.name.common}</h3>
        <h4>수도 : {country.capital}</h4>
        <h5>언어 : {country.languages ? country.languages[Object.keys(country.languages)[0]] : '언어 정보 없음'}</h5>

    </StyledCard>
  );
};

export default CountryCard;
