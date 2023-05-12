import { FC, useState, useEffect, Suspense, createContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme, useTheme, Shadows, responsiveFontSizes } from '@mui/material/styles';
import { useLocalStorage } from './hooks/useLocalStorage';
import { HomePage } from "./pages/HomePage";
import { UserPage } from "./pages/UserPage";
import { Page404 } from './pages/Page404';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Spinner } from './components/Spinner';
import { LightTheme, DarkTheme } from './styles/themes';
import './styles/fonts';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App: FC = () => {
  const [themeSetting, setThemeSetting] = useLocalStorage<'light' | 'dark' | undefined>('theme', undefined);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  const Theme = useTheme();

  useEffect(() => {
    themeSetting ? setMode(themeSetting) : setThemeSetting(mode);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }), 
    [],
  );

  useEffect(() => {
    setThemeSetting(mode);
  }, [mode]);

  const customColors = mode === 'light' ? LightTheme : DarkTheme;
  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...customColors
        },
        typography: {
          button: {
            textTransform: 'none'
          }
        },
        shadows: Theme.shadows.map(() => "none") as Shadows
      }),
    [mode],
  );
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <Router>
            <Header />
                <Container maxWidth="xl" sx={{mt: 4}}>
                  <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/user/'>
                          <Route index element={<UserPage />} />
                          <Route path=':id' element={<UserPage />} />
                        </Route>
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                  </Suspense>
                </Container>
            <Footer />
        </Router>
      </ThemeProvider>
      </ColorModeContext.Provider>

  );
}
export default App;