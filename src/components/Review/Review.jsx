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
      <Typography variant="h6" fontWeight={'bold'}>{translation("selectedCar")}</Typography>
      <Typography variant="body1">{overview.car_name}</Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h6"
            fontWeight={'bold'}
            sx={{ textDecoration: 'underline' }}
          >
            {translation("pickup")}
          </Typography>
          <Typography variant="body1">
            <Typography
              component="span"
              fontWeight="bold"
            >
              {translation("airport")}:{" "}
            </Typography>
            {overview.airport_city}
          </Typography>
          <Typography variant="body1">
            <Typography
              component="span"
              fontWeight="bold"
            >
              {translation("date")}:{" "}
            </Typography>
            {dayjs(overview.pickup_date).format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="body1">
            <Typography
              component="span"
              fontWeight="bold"
            >
              {translation("time")}:{" "}
            </Typography>
            {dayjs(overview.pickup_date).format('HH:mm')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h6"
            fontWeight={'bold'}
            sx={{ textDecoration: 'underline' }}
          >
            {translation("return")}
          </Typography>
          <Typography variant="body1">
            <Typography
              component="span"
              fontWeight="bold"
            >
              {translation("airport")}:{" "}
            </Typography>
            {overview.airport_city}
          </Typography>
          <Typography variant="body1">
            <Typography
              component="span"
              fontWeight="bold"
            >
              {translation("date")}:{" "}
            </Typography>
            {dayjs(overview.return_date).format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="body1">
            <Typography
              component="span"
              fontWeight="bold"
            >
              {translation("time")}:{" "}
            </Typography>
            {dayjs(overview.return_date).format('HH:mm')}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">
        <Typography
          component="span"
          fontWeight="bold"
        >
          {translation("reservationTime")}:{" "}
        </Typography>
        {overview.days} {overview.days > 1 ? translation("days") : translation("day")}
      </Typography>
    </>
  );
};

export default Review;