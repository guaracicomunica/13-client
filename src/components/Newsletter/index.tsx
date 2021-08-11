import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { api } from "../../services/api";
import styles from "./styles.module.css";

export default function Newsletter() {

    const [email, setEmail] = useState("");

    async function handleSubmit(event: any) {
        event.preventDefault();
        try {
            await api.post('newsletter/subscribe', {
                email
            });
        } catch (error) {
            toast.error('Erro ao se cadastrar na newsletter!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className={`py-5 ${styles.newsletter}`}>
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-around">
                    <h5 className="mb-3">Quero receber promos!</h5>
                    <div className="d-flex flex-column flex-md-row w-100">
                        <input
                            type="email"
                            className="form-control mb-3 mr-4 ml-lg-4"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button type="submit" className={`mb-3 button ${styles["newsletter-btn"]}`}>
                            Receber
                        </button>
                    </div>
                </div>

                <div className="mt-4 d-flex justify-content-center">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-newsletter"
                        />
                        <label
                            className={`${styles["newsletter-checkbox"]} custom-control-label`}
                            htmlFor="checkbox-newsletter"
                        >
                            Eu aceito o contrato de privacidade e todos os termos de segurança do Geral.com. Leia os termos <a href="#">aqui</a>.
                        </label>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
