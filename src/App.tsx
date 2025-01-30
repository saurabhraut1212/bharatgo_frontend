import { Toaster } from 'react-hot-toast'
import './App.css'
import Signup from './components/Auth/Signup'
import SignIn from './components/Auth/Signin'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import BlogsPage from './components/Blogs/BlogsPage'
import BlogDetailPage from './components/Blogs/BlogsDetails'
import Contact from './components/Contact/Contact'
function App() {

  return (
    <div >
   <Router>
    <Toaster/>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:category" element={<Home/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/news-and-blogs" element={<BlogsPage/>}/>
        <Route path="/news-and-blogs/:id" element={<BlogDetailPage/>}/>
        <Route path="/contact-us" element={<Contact/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
   </Router>
   </div>
 
  )
}

export default App
