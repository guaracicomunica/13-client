import styles from "./styles.module.css";

export function Navbar() {
  return (
    <nav>
      <ul className={`nav ${styles.navbar} py-4 justify-content-between align-items-center`}>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img
              className={styles["logo-icon"]}
              src="/logo.svg"
              alt="Logo"
              aria-label="Logo Geral.com"
            />
          </a>
        </li>

        <li className="nav-item">
          <div className={`${styles["search-bar"]} input-group`}>
            <input
              type="text"
              className="form-control"
              aria-label="Pesquisa"
              placeholder="O que você precisa?"
            />
            <div className="input-group-append">
              <a href="#" className={`${styles["search-icon"]} input-group-text`}>
                <img src="/icons/search.svg" alt="Ícone de pesquisa" />
              </a>
            </div>
          </div>
        </li>

        <div className={styles["nav-group-items"]}>
          <li className={`nav-item ${styles["navbar-link"]}`}>
            <a className="nav-link" href="#">Camisas</a>
          </li>

          <li className={`nav-item ${styles["navbar-link"]} dropdown`}>
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="true"
            >Todas as categorias</a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Seção masculina</a>
              <a className="dropdown-item" href="#">Seção feminina</a>
              <a className="dropdown-item" href="#">Seção infantil</a>
            </div>
          </li>
        </div>

        <div className={styles["nav-group-items"]}>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <img
                src="/icons/heart.svg"
                alt="Produtos favoritos"
                aria-label="Produtos favoritos"
                className={styles["nav-icon"]}
              />
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              <img
                src="/icons/cart.svg"
                alt="Carrinho de compras"
                aria-label="Carrinho de compras"
                className={styles["nav-icon"]}
              />
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              <img
                src="/icons/user.svg"
                alt="Área do usuário"
                aria-label="Área do usuário"
                className={styles["nav-icon"]}
              />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}