import './App.css';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import SmartContainer from "./SmartContainer";
import {Grid, Box, Paper} from "@mui/material";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <Grid container={true}>
          <Grid item xs={1} />

          <Grid item xs={10}>
            <Paper sx={
              {paddingTop: '10px'}
            }>
              <SmartContainer />
            </Paper>
          </Grid>
          <Grid item xs={1} />
        </Grid>

      </StyledEngineProvider>

    </QueryClientProvider>
  );
}

export default App;
