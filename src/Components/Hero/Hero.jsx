import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAfrica } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  //  Get all categories
  function getAllCategories() {
    return axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
  }

  //  Get meals by category
  function getMealsByCategory(category) {
    return axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
  }

  //  Get detailed meals with area
  async function getMealsWithArea(category) {
    const mealsRes = await getMealsByCategory(category);
    const meals = mealsRes.data.meals || [];

    const mealsWithArea = await Promise.all(
      meals.map(async (meal) => {
        const detailsRes = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const details = detailsRes.data.meals[0];
        return {
          ...meal,
          strArea: details.strArea,
        };
      })
    );

    return mealsWithArea;
  }

  //  Get multiple random meals (16 this time)
  async function getRandomMeals() {
    const requests = Array.from({ length: 16 }, () =>
      axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
    );
    const responses = await Promise.all(requests);
    return responses.map((res) => res.data.meals[0]);
  }

  const { data: categoriesData } = useQuery({
    queryKey: ["GetCategories"],
    queryFn: getAllCategories,
  });
  const allCategories = categoriesData?.data?.meals;

  const { data: meals } = useQuery({
    queryKey: ["GetMealsByCategory", selectedCategory],
    queryFn: () => getMealsWithArea(selectedCategory),
    enabled: !!selectedCategory,
  });

  const { data: randomMeals } = useQuery({
    queryKey: ["GetRandomMeals"],
    queryFn: getRandomMeals,
    enabled: !selectedCategory, 
  });

  const displayedMeals = selectedCategory ? meals : randomMeals;

  return (
    <>
      <Sidebar />

        <div className="ml-0 md:ml-64 bg-gray-200 min-h-screen z-30 p-4 transition-all duration-300">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
                  Learn, Cook, Eat Your Food
                </p>

        {/* Category buttons */}
        {allCategories?.map((cat) => (
          <button
            key={cat.strCategory}
            onClick={() => setSelectedCategory(cat.strCategory)}
            type="button"
            className="text-gray-900 border border-white my-6 hover:border-gray-200 
              dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white 
              focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base 
              font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white cursor-pointer 
              dark:focus:ring-gray-800"
          >
            {cat.strCategory}
          </button>
        ))}

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {displayedMeals?.map((meal) => (
            <div
              key={meal.idMeal}
              className="h-73 w-65 rounded-3xl mb-12 bg-white text-center hover:scale-110 group duration-50 relative pt-20"
            >
              <img
                className="w-50 h-50 rounded-full absolute -top-10 left-1/2 -translate-x-1/2 object-cover transform duration-700 group-hover:rotate-[360deg]"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <h2 className="mt-23 font-semibold text-xl">{meal.strMeal.split(" ").slice(0, 2).join(" ")}</h2>
              {/* <h2 className="mt-23 font-bold text-2xl">{meal.strMeal}</h2> */}
              {meal.strArea && (
                <>
                  <FontAwesomeIcon icon={faEarthAfrica} />{" "}
                  <span>{meal.strArea}</span>
                </>
              )}
              <Link
                to={`/RecipeDetails/${meal.idMeal}`}
                state={{ meal }} 

                className="text-white w-1/2 mx-auto block  cursor-pointer mt-2 bg-green-700 hover:bg-green-800 
                focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full 
                text-sm px-5 py-2.5 text-center"
              >
                Recipe
              </Link>
            </div>
          ))}
        </div>
        </div>
      <div/>

      <Footer />
    </>
  );
}
