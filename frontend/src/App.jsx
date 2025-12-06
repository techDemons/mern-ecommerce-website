import { Route, Routes } from 'react-router-dom';
import AllRoute from './customer/Routes/AllRoutes.jsx';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path={"/*"} element={<AllRoute/>}></Route>
        
      </Routes>
     

    </div>
  )
}

export default App