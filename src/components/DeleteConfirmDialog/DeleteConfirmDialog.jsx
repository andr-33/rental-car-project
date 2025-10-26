import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { useLanguage } from '../../contexts/LanguageContext'; 

const DeleteConfirmDialog = ({ open, onClose, onConfirm, carInfo }) => {
  const { translation } = useLanguage();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{translation('deleteDialog.title')}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {translation('deleteDialog.message')}
        </Typography>
        {carInfo && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {carInfo}
          </Typography>
        )}
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {translation('deleteDialog.warning')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {translation('deleteDialog.cancel')}
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          {translation('deleteDialog.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;