import Head from 'next/head'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    await signIn(data)
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Navbar />

      <main className="container my-5">
        <div className="row justify-content-between">
          <div className="col-lg-5 mb-5 mb-lg-0">
            <form onSubmit={handleSubmit(handleSignIn)}>
              <h1>Já sou cliente</h1>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  { ...register('email') }
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  { ...register('password') }
                  type="passowrd"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                />
              </div>

              <small>
                <a href="#">Esqueceu sua senha?</a>
              </small>

              <button className="button button-primary">Acessar conta</button>
            </form>
          </div>

          <div className="col-lg-5">
            <form>
              <h1>Não sou cliente ainda</h1>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <button className="button button-primary">Continuar</button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}