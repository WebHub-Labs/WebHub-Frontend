

import Navbar  from './components/navbar';
import Header from './components/header';
import Videocontainer from './components/video';
import Container from './components/container';
import Footer from './components/footer';
import Second from './components/secondcontainer';



function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <Header/>
      <Videocontainer/>
      <Container/>
      <Second/>
      <Footer/>
    </div>
  );
}

export default App;
