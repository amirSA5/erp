// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/navbar/Navbar';
import Categories from './components/pages/Categories';
import Produits from './components/pages/Produits';
import Factures from './components/pages/Factures';
import NewFactures from './components/pages/NewFactures';
import CategoriesDetails from './components/pages/CategoriesDetails';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Adjust the color to your preference
    },
    // Add other palette configurations if needed
  },
  // Add other theme configurations if needed
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/categories" element={<Categories />} />
            <Route path="/category-details/:id" element={<CategoriesDetails />} />
            <Route path="/produits" element={<Produits />} />
            <Route path="/factures" element={<Factures />} />
            <Route path="/new-factures" element={<NewFactures />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
