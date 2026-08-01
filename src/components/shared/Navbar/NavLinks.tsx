import { NavLink } from "react-router";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Farmers",
    path: "/farmers",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Add Product",
    path: "/add-product"
  }
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `font-medium transition ${
              isActive
                ? "text-green-600"
                : "text-gray-700 hover:text-green-600"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </>
  );
};

export default NavLinks;