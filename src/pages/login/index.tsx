import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

import styles from './styles.module.css';

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
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-sm-12 mb-5 mb-md-3 border-right">
            <div className="col-sm-12">
              <h1 className="text-md-left text-center mediumTitle">Já sou cliente</h1>
            </div>
            <div className="col-sm-12">
              <form action="javascript:void(0)" className={`${styles['w-sm-100']} ${styles['w-md-75']}`}>
                <div className="form-group">
                  <label htmlFor="email" className={`${styles['label']}`}>E-mail</label>
                  <input type="email" className={`${styles['bg-input']} form-control`} name="email" placeholder="usuario@email.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className={`${styles['label']}`}>Senha</label>
                  <input type="password" className={`${styles['bg-input']} form-control`} name="password" placeholder="Digite sua senha" />
                </div>
                <div className="form-group d-flex justify-content-center pt-3">
                  <button type="submit" className="button button-primary">Acessar conta</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <h1 className="text-center mediumTitle">Não sou cliente ainda</h1>
            <div className="d-flex justify-content-center pt-3">
              <Link href="/cadastro" >
                <button className="button button-primary">Cadastre-se</button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}