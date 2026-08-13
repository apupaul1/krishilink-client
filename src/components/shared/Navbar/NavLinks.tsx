import { NavLink } from "react-router";
import useRole from "../../../hooks/useRole";
import { useAppSelector } from "../../../redux/hooks";

const NavLinks = () => {
  const { role } = useRole();

  const { user } = useAppSelector((state) => state.auth);

  console.log(role);

  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-medium transition ${
            isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          `font-medium transition ${
            isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
          }`
        }
      >
        Products
      </NavLink>

      <NavLink
        to="/farmers"
        className={({ isActive }) =>
          `font-medium transition ${
            isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
          }`
        }
      >
        Farmers
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `font-medium transition ${
            isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
          }`
        }
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `font-medium transition ${
            isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
          }`
        }
      >
        Contact
      </NavLink>

      {user && role !== "admin" && (
        <>
          <NavLink
            to="/be-a-farmer"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            Be A Farmer
          </NavLink>

          <NavLink
            to="/be-a-rider"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            Be A Rider
          </NavLink>
        </>
      )}

      {user && (
        <>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            Dashboard
          </NavLink>
        </>
      )}
    </>
  );
};

export default NavLinks;
