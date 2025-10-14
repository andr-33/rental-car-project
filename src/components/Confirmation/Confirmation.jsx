import {
  Button,
  Stack,
  Typography,
} from "@mui/material";

import { useLanguage } from "../../contexts/LanguageContext";
import { useOverview } from "../../contexts/OverViewContext";

const Confirmation = () => {
  const { translation } = useLanguage();
  const { toggleOverviewDialog } = useOverview();

  return (
    <Stack spacing={2} useFlexGap>
      <Typography variant="h1">📦</Typography>
      <Typography variant="h5">{translation("reservationRequested")}</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {translation("reservationConfirmationMessage")}
      </Typography>
      <Button
        variant="contained"
        sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
        onClick={toggleOverviewDialog}
      >
        {translation("close")}
      </Button>
    </Stack>
  );
};

export default Confirmation;