import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // 👇 detect role from the URL
  const isAdmin = location.pathname.startsWith("/admin");
  const isResident = location.pathname.startsWith("/resident");

  // 👇 set Home link based on role
  const homePath = isAdmin ? "/admin" : isResident ? "/resident" : "/";

  return (
    <nav className="text-gray-600 mb-6">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to={homePath} className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          return (
            <li key={routeTo} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-800 font-semibold capitalize">{name}</span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:underline capitalize">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
