import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from "./component/Login";
import { Box } from "@mui/material";
const queryClient = new QueryClient();

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Box display="flex" justifyContent="center" mt={2} alignItems="center">
            <Typography variant="h6">Book Shop</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <Login/>
      </QueryClientProvider>
    </Container>
  );
}

export default App;
