import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Form from "../components/Form";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Formulário para acesso ao evento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form />
      <Footer />
    </div>
  );
};

export default Home;
