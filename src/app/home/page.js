import { dologout } from "../actions";
import { auth } from "@/auth";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

const fetchUsersList = async () => {
  try {
    const response = await fetch("http://localhost:3000/api");
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: error.message ? error.message : "Something went wrong",
    });
  }
};

const Home = async () => {
  const usersList = await fetchUsersList();
  const session = await auth();
  console.log("session hai", session);
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="mt-4 px-4">
      <div className="d-flex justify-content-between mb-3">
        <h1>{`Hi, ${session?.user?.name}`}</h1>
        <form action={dologout} className="align-self-center">
          <button type="submit" className="btn btn-danger">
            Logout
          </button>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          {usersList.length &&
            usersList.map((value, index) => (
              <tr key={value._id}>
                <th scope="row">{index + 1}</th>
                <td>{value?.name}</td>
                <td>{value?.email}</td>
                <td>{value?.password}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
