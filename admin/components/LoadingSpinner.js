import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = ({ size = 40, message = 'Loading...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress size={size} />
      <Box color="text.secondary">{message}</Box>
    </Box>
  );
};

export default LoadingSpinner;
