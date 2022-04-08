import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/header/header'
import Order from './components/order/order'
import Info from './components/info/info'
import Checkout from './components/checkout/checkout'
import Payment from './components/payment/payment'

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Order />} />
          <Route path="/info" element={<Info />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
