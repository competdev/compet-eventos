import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Form from "../components/Form";

const Home: NextPage = () => {
  return (
    <div
      style={{
        backgroundImage: "url(https://i.ibb.co/jhYMwNw/Fundo-Azul.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
      }}
      className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Formulário para acesso ao evento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <img
          src={"https://i.ibb.co/gWK2w70/Inscri-es-OBR-3.png"}
          alt="Logo do COMPET"
          width={400}
          height={300}
        />
      </div>
      <Form />
      <Footer />
    </div>
  );
};

export default Home;
