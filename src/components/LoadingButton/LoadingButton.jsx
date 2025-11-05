import {
  Button,
  CircularProgress
} from '@mui/material';

const LoadingButton = ({ text, onClick, loading }) => {
  return(
    <Button 
      onClick={onClick}
      disabled={loading}
      variant='contained' 
      color='primary'
    >
      {loading ? <CircularProgress size={24} /> : text}
    </Button>
  );
};

export default LoadingButton;