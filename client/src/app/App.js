import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';

import Root from '../components/Root';
import Home from '../pages/Home';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root/> }>
    <Route index element={ <Home/> }/>
  </Route>
))

function App() {
    return (
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    );
}

export default App;
