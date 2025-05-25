import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { CreateRecipes } from "./pages/CreateRecipes";
import { SavedRecipe } from "./pages/SavedRecipe";
import { Navbar } from "./components/Navbar";
import './App.css'
function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create-recipes' element={<CreateRecipes />} />
          <Route path='/saved-recipe' element={<SavedRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
