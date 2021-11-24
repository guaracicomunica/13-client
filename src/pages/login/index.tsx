import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.css';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { options } from '../../utils/defaultToastOptions';

export default function Login() {
  const { register, handleSubmit } = useForm({defaultValues: {
    email: "",
    password: "",
  },
  });
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    
    try {
      await  signIn(data)
      toast.success("Sucesso! Você entrou no sistema.", options)
    } catch (error) {
      if (!error.response) {
        // network error
        return toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', options);
      }
      switch (error.response.status) {

          //erro no (email ou senha) ou (não foi cadastrado)
          case 401:
              toast.error(error.response?.data.error.trim() ? error.response?.data.error.trim() 
              :  "Ops! Algo não saiu como o esperado, tente novamente ou entre em contato com o suporte.", options);
              break;
      
          case 500: 
              toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', options);
              break;
          default:
              toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', options);
              break;
          }
      
    } 
  }
  const onSubmit = async data => { handleSignIn(data);};
  

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-sm-12 mb-5 mb-md-3 border-right">
            <div className="col-sm-12">
              <h1 className="text-md-left text-center title-secondary mb-4">
                Já sou cliente
              </h1>
            </div>
            <div className="col-sm-12">
              <form
                id="login"
                onSubmit={handleSubmit(onSubmit)}
                className={`${styles['w-sm-100']} ${styles['w-md-75']}`}
                method="post"
              >
                <div className="form-group">
                  <label htmlFor="email" className={`${styles['label']}`}>E-mail</label>
                  <input type="email" className={`${styles['bg-input']} form-control`} 
                  {...register('email')} 
                  name="email" placeholder="usuario@email.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className={`${styles['label']}`}>Senha</label>
                  <input type="password" className={`${styles['bg-input']} form-control`} 
                  {...register('password')} 
                  name="password" placeholder="Digite sua senha" />
                </div>
                <div className="form-group d-flex justify-content-center pt-3">
                  <button form="login" type="submit" className="button button-primary">
                    Acessar conta
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <h1 className="text-center title-secondary mb-5">
              Não sou cliente ainda
            </h1>
            <div className="d-flex justify-content-center">
              <Link href="/cadastro" >
                <a className="button button-primary">
                  Cadastre-se
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />  
    </>
  );
}