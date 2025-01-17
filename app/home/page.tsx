import { SignOut } from "@/components/Signout";
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <div>
      <p>Home page</p>
      {user && <p>Welcome, {user.name}</p>}
      {user && <p>your email is, {user.email}</p>}
      <SignOut />
    </div>
  );
};

export default Home;
