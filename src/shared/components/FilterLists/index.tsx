import { SearchOutlined } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useState } from 'react';

interface IOption {
  value: string;
  label: string;
}

interface Props {
  filterOptions: IOption[];
  searchSelectOptions: IOption[];
  setFilterValue: (value: string) => void;
  setFilterType: (value: string) => void;
  searchText: boolean;
}

const FilterLists = ({
  filterOptions,
  searchSelectOptions,
  setFilterValue,
  setFilterType,
  searchText,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    filterOptions[0].value,
  );
  const [searchSelectOption, setSearchSelectOption] = useState<string>('');

  function OnChangeType(value: string) {
    setFilterType(value);
    setSelectedOption(value);
  }

  function OnChangeSelectSearch(value: string) {
    setFilterValue(value);
    setSearchSelectOption(value);
  }

  return (
    <div className="flex gap-3 w-full">
      <FormControl fullWidth>
        <InputLabel data-test="selectInput" id="select-label">
          Filtrar Por
        </InputLabel>
        <Select
          labelId="select-label"
          fullWidth
          label="Filtrar Por"
          value={selectedOption}
          onChange={(e) => OnChangeType(e.target.value)}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {searchText ? (
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment">Buscar</InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            label="Buscar"
            endAdornment={<SearchOutlined sx={{ color: 'gray' }} />}
            fullWidth
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </FormControl>
      ) : (
        <FormControl fullWidth>
          <InputLabel data-test="selectInput" id="select-label">
            Buscar
          </InputLabel>
          <Select
            labelId="select-label"
            fullWidth
            label="Buscar"
            value={searchSelectOption}
            onChange={(e) => OnChangeSelectSearch(e.target.value)}
          >
            {searchSelectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default FilterLists;
