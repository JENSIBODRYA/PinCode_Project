import { Routes, Route } from "react-router-dom"
import './App.css'

import NumberListPage from "./NumberListPage";
import OrderPage from "./Order";


function App() {


  console.log()
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NumberListPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
