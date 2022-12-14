import Button from "react-bootstrap/Button";
import useAxios from "../../hooks/useAxios";

export default function DeleteButton({ id, getPosts }) {
  const http = useAxios();
  const url = `social/posts/${id}`;

  async function manageDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      try {
        await http.delete(url);
        getPosts();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Button variant="danger" type="submit" onClick={manageDelete}>
      Delete
    </Button>
  );
}
