import { useCountries } from "@/app/hooks/useCountries";
import React, { FC } from "react";
import Select from "react-select";

export type SelectCountryValue = {
  label: string;
  value: string;
};

interface SelectCountryProps {
  value?: SelectCountryValue;
  onChange: (value: SelectCountryValue) => void;
}

const SelectCountry: FC<SelectCountryProps> = ({ value, onChange }) => {
  const { getAllCountries } = useCountries();
  return (
    <>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAllCountries()}
        value={value}
        onChange={(value) => onChange(value as SelectCountryValue)}
      />
    </>
  );
};

export default SelectCountry;
