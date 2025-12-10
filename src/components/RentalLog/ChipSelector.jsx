import { Select, MenuItem, Chip, useTheme } from '@mui/material';

const ChipSelector = ({ value, onChange, options, getOptionProps }) => {
  const theme = useTheme();

  return (
    <Select
      value={value}
      onChange={onChange}
      fullWidth
      sx={{
        height: '100%',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
      }}
      renderValue={(selected) => {
        const { label, color } = getOptionProps(selected);
        return (
          <Chip
            label={label}
            sx={{
              bgcolor: theme.palette[color].light,
              color: theme.palette[color].dark,
              fontWeight: 'bold',
              height: '24px' // adjusting to fit
            }}
            size="small"
          />
        );
      }}
    >
      {options.map((option) => {
        const { label, color } = getOptionProps(option);
        return (
          <MenuItem key={option} value={option}>
            <Chip
              label={label}
              size="small"
              sx={{
                bgcolor: theme.palette[color].light,
                color: theme.palette[color].dark,
                fontWeight: 'bold',
              }}
            />
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default ChipSelector;
