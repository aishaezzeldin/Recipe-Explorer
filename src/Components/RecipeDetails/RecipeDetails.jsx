import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function Details() {
  const { id } = useParams(); 
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal:", error);
      }
    }

    fetchMeal();
  }, [id]);

  if (!meal) {
    return (
      <div className="ml-0 md:ml-64 min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <>
      <Sidebar />

      <div className="ml-0 md:ml-64 min-h-screen bg-[#f7f3ef] p-4 sm:p-6 md:p-8">
        {/* Meal Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-10 font-[cursive]">
          {meal.strMeal}
        </h1>

        <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center lg:items-start gap-6 md:gap-10">
          {/* Image + Buttons */}
          <div className="flex flex-col items-center">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-2xl shadow-lg mb-6 object-cover"
            />

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {meal.strYoutube && (
                <Link
                  to={meal.strYoutube}
                  target="_blank"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 sm:px-5 py-2 transition-all text-sm sm:text-base"
                >
                  YouTube
                </Link>
              )}

              {meal.strSource && (
                <Link
                  to={meal.strSource}
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-4 sm:px-5 py-2 transition-all text-sm sm:text-base"
                >
                  Source
                </Link>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="max-w-lg text-base sm:text-lg leading-relaxed px-2 sm:px-0 text-center lg:text-left">
            <p>{meal.strInstructions}</p>
          </div>

          {/* Ingredients Table */}
          <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 w-full sm:w-[80%] md:w-[60%] lg:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              Ingredients
            </h2>
            <table className="w-full text-sm sm:text-base text-left text-gray-600">
              <tbody>
                {ingredients.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 font-semibold">{item.ingredient}:</td>
                    <td className="py-2">{item.measure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}


