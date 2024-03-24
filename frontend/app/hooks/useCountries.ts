import countries from "world-countries";

const formattedCountries = countries.map((country) => {
  const countryData = {
    value: country.cca2,
    label: country.name.common,
  };
  return countryData;
});

export const useCountries = () => {
  const getAllCountries = () => formattedCountries;
  const getCountryByValue = (value: string) => {
    return formattedCountries.find((item) => item.value == value);
  };
  return {
    getAllCountries,
    getCountryByValue,
  };
};
