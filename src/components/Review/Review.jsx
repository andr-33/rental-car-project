import {
  Typography,
  Grid,
  Divider,
} from "@mui/material";

import { useLanguage } from "../../contexts/LanguageContext";
import { useOverview } from "../../contexts/OverViewContext";

import dayjs from "dayjs";

const Review = () => {
  const { overview } = useOverview();
  const { translation } = useLanguage();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {translation("rentalSummary")}
      </Typography>
      <Typography variant="body1">
        {translation("selectedCar")}: {overview.car_name} ({translation("orSimilar")})
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">{translation("pickup")}</Typography>
          <Typography variant="body2">
            {overview.airport_code} - {overview.airport_city}
          </Typography>
          <Typography variant="body2">
            {dayjs(overview.pickup_date).format('DD/MM/YYYY HH:mm')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">{translation("return")}</Typography>
          <Typography variant="body2">
            {overview.airport_code} - {overview.airport_city}
          </Typography>
          <Typography variant="body2">
            {dayjs(overview.return_date).format('DD/MM/YYYY HH:mm')}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">
        {translation("days")}: {overview.days}
      </Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>
        Total: {overview.total_amount?.toFixed(2) || "0.00"} €
      </Typography>
    </>
  );
};

export default Review;