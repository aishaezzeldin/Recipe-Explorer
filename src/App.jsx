import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./Components/Hero/Hero";
import Details from "./Components/RecipeDetails/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/RecipeDetails/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;




