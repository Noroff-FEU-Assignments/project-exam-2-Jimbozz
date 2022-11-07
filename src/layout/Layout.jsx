import {
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Button,
} from "react-bootstrap";
import MainNav from "./MainNav";
import UserCard from "./UserCard";

function Layout(props) {
  return (
    <div className="wrapper">
      <MainNav />
      <main className="main-content">{props.children}</main>
      <UserCard />
    </div>
  );
}

export default Layout;
