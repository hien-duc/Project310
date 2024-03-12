import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Container maxWidth="xl">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h6">Book Shop</Typography>
        </Toolbar>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;
