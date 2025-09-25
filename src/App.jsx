import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LanguageProvider } from './contexts/LanguageContext';
import theme from "./theme.js"
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;