import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
      </ul>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/profile">Mon Profil</Link>
            </li>
            <li>
              <button onClick={logout} className="logout">Déconnexion</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/signup">Inscription</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;