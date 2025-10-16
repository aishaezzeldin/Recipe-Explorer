import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sidebar-color
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto sidebar-color">
          <img
            src="/src/assets/Images/logo-BfNap0Pe.png"
            alt="recipe"
            className="mb-4"
          />

          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white duration-300 hover:scale-110 hover:bg-gray-100 active:bg-amber-600 dark:hover:bg-amber-600 group"
              >
                <FontAwesomeIcon className="text-black" icon={faUtensils} />
                <span className="flex-1 ms-3 whitespace-nowrap text-black">
                  Users
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-amber-600 group"
              >
                <FontAwesomeIcon className="text-black" icon={faUtensils} />
                <span className="flex-1 ms-3 whitespace-nowrap text-black">
                  Products
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-amber-600 group"
              >
                <FontAwesomeIcon className="text-black" icon={faUtensils} />
                <span className="flex-1 ms-3 whitespace-nowrap text-black">
                  Sign In
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 sm:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

