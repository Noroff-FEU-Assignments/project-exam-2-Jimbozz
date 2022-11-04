import { Card } from "react-bootstrap";
import Heading from "../../layout/Heading";
import Layout from "../../layout/Layout";

function ProfilesPage() {
  return (
    <Layout>
      <Heading content="Profiles Page" />
      <Card bg="dark">
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Layout>
  );
}

export default ProfilesPage;
