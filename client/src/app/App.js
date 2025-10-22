import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';

import Root from '../components/Root';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import ProjectPage from '../pages/ProjectPage';
import Contact from '../pages/Contact';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root/> }>
    <Route index element={ <Home/> }/>
    <Route path='projects' element={ <Projects/> }/>
    <Route path='projectpage' element={ <ProjectPage/> }/>
    <Route path='contact' element={ <Contact/> }/>
  </Route>
));

function App() {
    return (
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    );
};

export default App;
