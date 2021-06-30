import Head from 'next/head'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

import styles from './styles.module.css';

export default function Cadastro() {
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
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="text-center mediumTitle">Sobre sua conta</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-center">
                        <form action="javascript:void(0)" className={`${styles['w-sm-75']} ${styles['w-md-50']}`}>
                            <div className="form-group">
                                <label htmlFor="email" className={`${styles['label']}`}>E-mail</label>
                                <input type="email" className={`${styles['bg-input']} form-control`} name="email" placeholder="usuario@email.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className={`${styles['label']}`}>Nome</label>
                                <input type="text" className={`${styles['bg-input']} form-control`} name="name" placeholder="Fulano da Silva Lima" />
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="cpf" className={`${styles['label']}`}>CPF</label>
                                        <input type="cpf" className={`${styles['bg-input']} form-control`} name="text" placeholder="000.000.000-00" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="phone" className={`${styles['label']}`}>Telefone</label>
                                        <input type="text" className={`${styles['bg-input']} form-control`} name="phone" placeholder="(84) 99999-9999" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className={`${styles['label']}`}>Criar sua senha</label>
                                <input type="password" className={`${styles['bg-input']} form-control`} name="password" placeholder="Digite sua senha" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_confirmation" className={`${styles['label']}`}>Confirmar sua senha</label>
                                <input type="password" className={`${styles['bg-input']} form-control`} name="password_confirmation" placeholder="Digite sua senha novamente" />
                            </div>
                            <div className="form-group d-flex justify-content-center pt-3">
                                <button type="submit" className="button button-primary">Criar Conta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}