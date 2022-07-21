import type { NextPage } from "next";
import Footer from "../components/Footer";
import Form from "../components/Form";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <Form />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
