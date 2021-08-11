import Head from 'next/head'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { getAPIClient } from '../../services/apiClient';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Cadastro() {

    const options: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    /*
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    */
   const { register, handleSubmit} = useForm();

   const handleParam = setValue => e => setValue(e.target.value)

    async function onSubmit(event: any) {
       // console.log(event)
        
        //let data = JSON.stringify(event);
        await registerfunc(event)
        
    }


    async function registerfunc(data: any){
        console.log(data.email)
        const api = getAPIClient()
        const response = await api.post('/auth/register', 
        data ,
        {
            headers:{
                'Content-Type': 'application/json',
            }
        }        
        ).then((response) => {
            //TODO: mostrar mensagem de sucesso
            toast.success('Sucesso! Você foi cadastrado.', options); 
          
          console.log(response)
        }).catch((response) => {
            //TODO: mostrar mensagem de validação
            toast.error(response.error, options);
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
                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles['w-sm-85']} ${styles['w-md-50']}`}>
                            <div className="form-group">
                                <label htmlFor="email" className={`${styles['label']}`}>E-mail*</label>
                                <input type="email" className={`${styles['bg-input']} form-control`} 
                                name="email" 
                                {... register("email")}
                                placeholder="usuario@email.com"  {... register("email")} />
                            </div>
                         
                            <div className="form-group">
                                <label htmlFor="name" className={`${styles['label']}`}>Nome*</label>
                                <input type="text" className={`${styles['bg-input']} form-control`} 
                                {... register("name")}
                                name="name" placeholder="Fulano da Silva Lima" />
                            </div>
                         
                            <div className="row">
                                
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="cpf" className={`${styles['label']}`}>CPF</label>
                                        <input type="cpf" className={`${styles['bg-input']} form-control`} 
                                        {... register("cpf")}
                                        name="cpf" placeholder="000.000.000-00" />
                                    </div>
                                </div>
                                
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="phone" className={`${styles['label']}`}>Telefone*</label>
                                        <input type="text" className={`${styles['bg-input']} form-control`} 
                                         {... register("telefone")} name="telefone"
                                        placeholder="(84) 99999-9999" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className={`${styles['label']}`}>Criar sua senha*</label>
                                <input type="password" className={`${styles['bg-input']} form-control`} name="password" 
                                {... register("password")}
                                placeholder="Digite sua senha" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_confirmation" className={`${styles['label']}`}>Confirmar sua senha*</label>
                                <input type="password" className={`${styles['bg-input']} form-control`} 
                                {... register("password_confirmation")}
                                name="password_confirmation" placeholder="Digite sua senha novamente" />
                            </div>

                            <input type="hidden" name="role" value="2"  {... register("role")} />

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
            <ToastContainer />
        </>
    );
}