import React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './Context/Context'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Categories from './components/Categories'
// import Subcategories from './components/Subcategories'
// import Products from './components/Products'

function App() {
  return (
    <ChakraProvider>
        <Router>
      <AuthProvider>
          <Box>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              {/* <Route path="/subcategories" element={<Subcategories />} /> */}
              {/* <Route path="/products" element={<Products />} /> */}
            </Routes>
          </Box>
      </AuthProvider>
        </Router>
    </ChakraProvider>
  )
}

export default App