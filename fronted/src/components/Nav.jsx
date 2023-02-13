import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const naviget = useNavigate();
  const auth = localStorage.getItem("user");
  const logOut = () => {
    localStorage.clear();
    naviget("/signup");
  };
  return (
    <div>
      <img src="https://www.logodee.com/wp-content/uploads/2020/07/LD-C-39.jpg" alt="logo" className="logo"/>
      { auth ? 
      <ul className="nav-ul">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/add">Add Products</Link>
        </li>
        <li>
          <Link to="/update">Update Product</Link>
        </li>
        <li></li>
        <li>
          <Link to="/profile">Profiles</Link>
        </li>
        <li>
            <Link to="/signup" onClick={logOut}>Logout ({JSON.parse(auth).name})</Link>
        </li>
      </ul>
      : 
      <ul className="nav-ul nav-right">
        <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">LogIn</Link></li>
      </ul>
}
    </div>
  );
};
export default Nav;
