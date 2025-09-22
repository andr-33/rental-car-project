import { Button, Box, Container, Typography, Stack, Grid } from '@mui/material';

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #F5F7FA, #E3F2FD)',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3} alignItems="center">
          <Stack spacing={2}>
            <Typography variant="h1" sx={{ fontSize: { xs: '4rem', sm: '6rem' }, fontWeight: 'bold', color: '#1976D2' }}>
              404
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'medium', color: '#1F2937' }}>
              Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ color: '#6B7280' }}>
              The page you're looking for doesn't exist or may have been moved.
            </Typography>
          </Stack>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="/"
                aria-label="Return to homepage"
              >
                Return Home
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => window.history.back()}
                aria-label="Go back to previous page"
              >
                Go Back
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}