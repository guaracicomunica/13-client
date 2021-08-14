import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { getAPIClient } from '../../services/apiClient';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies, setCookie } from 'nookies';
import Router from 'next/router';

type User = {
    id: number;
    name: string;
    email: string;
    cpf: string;
  }


export default function Cadastro() {
    //const { set } = AuthContext();
    const options: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const { user, setUser, logoff } = useContext(AuthContext);
    
   const { register, handleSubmit} = useForm();

    async function onSubmit(event: any) {
        await registerfunc(event)
    }


    async function registerfunc(data: any){

        try {
            const api = getAPIClient()
            const response = await api.post('/auth/register', 
            data ,
                {
                    headers:{
                        'Content-Type': 'application/json',
                    }
                }    
            
            )
              setCookie(undefined, 'ecommerce.token', response.data.access_token, {
                maxAge: 60 * 60, // 1 hour
              });
          
              api.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;
              console.log(response.data.user);
              setUser(response.data.user);

          
              Router.push('/dashboard');
            toast.success('Sucesso! Você foi cadastrado!', options); 

        } catch (error) {
            console.log(error.response)
            if(error.response.status == 400){

                var obj = JSON.parse(error.response.data.error);
                
                obj?.name?.map( (item) => {
                    toast.error(item, options);     
                })
                obj?.cpf?.map( (item) => {
                    toast.error(item, options);     
                })
                obj?.email?.map( (item) => {
                    toast.error(item, options);     
                })
                obj?.telefone?.map( (item) => {
                    toast.error(item, options);     
                })
                obj?.password?.map( (item) => {
                    toast.error(item, options);     
                })
            }
        }
     
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