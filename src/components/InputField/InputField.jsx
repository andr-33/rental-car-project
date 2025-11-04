import {
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';

import { useLanguage } from '../../contexts/LanguageContext';

const InputField = ({
  labelKey,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  disabled = false,
  error = false,
  fullWidth = true,
  placeholder,
}) => {
  const { translation } = useLanguage();

  return (
     <FormControl
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      error={error}
     >
      <FormLabel sx={{fontSize: '16px'}}>{translation(labelKey)}</FormLabel>
      <TextField 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
     </FormControl>   
  );
};

export default InputField