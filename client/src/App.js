import React from 'react';
import { DataProvider } from './GlobalState';
import { BrowserRouter as Router} from 'react-router-dom'
import Header from './components/header/Header';
import Pages from './pages/Pages';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <DataProvider>
      <div className='App'>
        <Router>
          <Header />
            <Pages />
          <Footer />
        </Router> 
      </div>
    </DataProvider>
  )
}

export default App