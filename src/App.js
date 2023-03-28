import { Routes,Route } from 'react-router-dom';
import { AddProducts } from './Components/AddProducts';
import { Cart } from './Components/Cart';
import { EditProducts } from './Components/EditProducts';
import { FormEdit } from './Components/FormEdit';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { Order } from './Components/Order';
import { Signup } from './Components/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/addproducts" element={<AddProducts/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/editproducts" element={<EditProducts/>}/>
        <Route path="/edit" element={<FormEdit/>}/>
      </Routes>
    </div>
  );
}

export default App;
