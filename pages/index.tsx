/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Form from "../components/Form";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center" style={{
      backgroundImage: "url(https://i.ibb.co/jhYMwNw/Fundo-Azul.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    }}>
      <Head>
        <title>Formulário para acesso ao evento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        src={"https://i.ibb.co/g3b0gR2/COMPET-eventos1.png"}
        alt="Logo do COMPET"
        width={380}
        height={300}
        className="lg:absolute lg:top-0 lg:left-0"
      />
      <Form />
      <Footer/>
    </div>
  );
};

export default Home;
