import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="list-reset flex">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500 capitalize">{name}</span>
              ) : (
                <Link to={routeTo} className="text-primary hover:underline capitalize">
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
