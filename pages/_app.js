import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// Create a client for React Query
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Exclude the Layout for specific pages like login and register
  const noLayoutPages = ['/login', '/register', '/'];
  const shouldUseLayout = router.pathname && !noLayoutPages.includes(router.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {shouldUseLayout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
