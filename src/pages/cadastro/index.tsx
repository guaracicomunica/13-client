import Head from 'next/head'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { getAPIClient } from '../../services/apiClient';

export default function Cadastro() {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
   

   const handleParam = setValue => e => setValue(e.target.value)

    async function handleRegister(event: any) {
        event.preventDefault();

        let data = {
            email: email,
            telefone: telefone,
            password: password,
            password_confirmation: password_confirmation,
            role: "2",
        }
        await register(data)
    }


    async function register({email, telefone, password}){
        const api = getAPIClient()
        const response = await api.post('/auth/register', {
          email,
          telefone,
          name,
          cpf,
          password,
          password_confirmation,
          role:2,
        }        
        ).then((response) => {
          history.back()
          console.log(response)
        });
    }

    return (
        <>
            <Head>
                <title>Cadastro</title>
            </Head>

            <main className="container my-5">
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="text-center mediumTitle">Sobre sua conta</h1>
                    </div>
                </div>
                <div className="row">

                    <div className="col-sm-12 d-flex justify-content-center">
                        <form onSubmit={handleRegister} className={`${styles['w-sm-85']} ${styles['w-md-50']}`}>
                            <div className="form-group">
                                <label htmlFor="email" className={`${styles['label']}`}>E-mail*</label>
                                <input type="email" className={`${styles['bg-input']} form-control`} 
                                name="email" 
                                value={email}
                                onChange={handleParam(setEmail)}
                                placeholder="usuario@email.com" />
                            </div>
                         
                            <div className="form-group">
                                <label htmlFor="name" className={`${styles['label']}`}>Nome*</label>
                                <input type="text" className={`${styles['bg-input']} form-control`} 
                                value={name}
                                onChange={handleParam(setName)}
                                name="name" placeholder="Fulano da Silva Lima" />
                            </div>
                         
                            <div className="row">
                                
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="cpf" className={`${styles['label']}`}>CPF</label>
                                        <input type="cpf" className={`${styles['bg-input']} form-control`} 
                                        value={cpf}
                                        onChange={handleParam(setCpf)}
                                        name="text" placeholder="000.000.000-00" />
                                    </div>
                                </div>
                                
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="phone" className={`${styles['label']}`}>Telefone*</label>
                                        <input type="text" className={`${styles['bg-input']} form-control`} 
                                        name="phone"
                                        value={telefone}
                                        onChange={handleParam(setTelefone)}
                                        placeholder="(84) 99999-9999" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className={`${styles['label']}`}>Criar sua senha*</label>
                                <input type="password" className={`${styles['bg-input']} form-control`} name="password" 
                                value={password}
                                onChange={handleParam(setPassword)}
                                placeholder="Digite sua senha" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_confirmation" className={`${styles['label']}`}>Confirmar sua senha*</label>
                                <input type="password" className={`${styles['bg-input']} form-control`} 
                                value={password_confirmation}
                                onChange={handleParam(setPassword_confirmation)}
                                name="password_confirmation" placeholder="Digite sua senha novamente" />
                            </div>

                            <div className="row">
                                <div className="col-sm-1">    
                                    <div className={`${styles['round']}`}>
                                        <input type="checkbox" id="checkbox" />
                                        <label className="" htmlFor="checkbox"> </label>
                                    </div>
                                </div>
                                <div className="col-sm-11">
                                    <span className="">
                                        Eu aceito o contrato de privacidade e todos os termos de segurança.
                                        <a href="" target="_blank"> Leia os termos aqui.</a> 
                                    </span>
                                </div>
                            </div>
                         


                            <div className="form-group d-flex justify-content-center pt-3">
                                <button type="submit" className="button button-primary">Criar Conta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}