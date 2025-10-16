import './Footer.css'
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <>
    
  <footer className="bg-white  w-full z-20 shadow-sm dark:bg-gray-900 ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <NavLink to='/'  className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          <img src="/src/assets/Images/logo-BfNap0Pe.png" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Recipe</span>
        </NavLink>

      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <span>Aisha Ashraf</span>. All Rights Reserved.</span>
    </div>
  </footer>

    </>    
  )
}

