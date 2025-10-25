import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';

import Root from '../components/Root';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import ProjectPage from '../pages/ProjectPage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root/> }>
    <Route index element={ <Home/> }/>
    <Route path='projects' element={ <Projects/> }/>
    <Route path='projectpage/:id' element={ <ProjectPage/> }/>
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
