import {
  FormControl,
  FormLabel,
  Select
} from "@mui/material";

import { useLanguage } from "../../contexts/LanguageContext";


const SelectField = ({
  labelKey,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  fullWidth = true,
  children,
  sx = {},
}) => {
  const { translation } = useLanguage();

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      error={error}
    >
      <FormLabel sx={{
        fontSize: '16px',
        '&.Mui-focused': {
          color: 'text.primary',
        },
      }}>
        {translation(labelKey)}
      </FormLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          borderRadius: "0.8em",
          height: "45px"
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectField;