import styles from "./styles.module.css";

export default function Newsletter() {
    return (
        <div className={`py-5 ${styles.newsletter}`}>
            <form>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-around">
                    <h5 className="mb-3">Quero receber promos!</h5>
                    <div className="d-flex flex-column flex-md-row w-100">
                        <input
                            type="text"
                            className="form-control mb-3 mr-4 ml-lg-4"
                            placeholder="Digite seu e-mail"
                        />
                        <a href="#" className={`mb-3 button ${styles["newsletter-btn"]}`}>
                            Receber
                        </a>
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
        </div>
    );
}
