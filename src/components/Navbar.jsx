import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-warning border-bottom">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">CONTACT LIST</span>
				</Link>
			</div>
		</nav>
	);
};