import Link from 'next/link';

import styles from "./styles.module.css";

export function Navbar() {
  return (
    <header>
      <nav className={`navbar navbar-expand-lg py-4 border-bottom ${styles["navbar-padding"]}`}>
        <Link href="/">
          <a className="mr-xl-5" >
            <img
              className={styles["logo-icon"]}
              src="/logo.svg"
              alt="Logo"
              aria-label="Logo Geral.com"
            />
          </a>
        </Link>  

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Expandir menu"
        >
          <img src="/icons/menu.svg" alt="Menu" className={styles["nav-icon"]} />
        </button>

        <div
          className="ml-lg-5 pt-5 pb-3 py-lg-0 collapse navbar-collapse"
          id="navbar"
        >
          <ul className={`nav w-100 ${styles["nav-column"]} ${styles["justify-me"]}`}>
            <li className="nav-item mb-3 mb-lg-0">
              <form className={styles["search-bar"]}>
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
              </form>
            </li>

            <div className={`${styles["nav-group-items"]}`}>
              <li className={`nav-item ${styles["navbar-link"]}`}>
                <Link href="/produtos">
                  <a className="nav-link">Camisas</a>
                </Link>
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
                  <a className="dropdown-item" href="#">Seleções tailandesas</a>
                  <a className="dropdown-item" href="#">Seleções europeias</a>
                  <a className="dropdown-item" href="#">Seleções brasileiras</a>
                </div>
              </li>
            </div>

            <div className={`${styles["nav-group-items"]}`}>
              <li className="nav-item">
                <Link href="#">
                  <a className="nav-link">
                    <img
                      src="/icons/heart.svg"
                      alt="Produtos favoritos"
                      aria-label="Produtos favoritos"
                      className={styles["nav-icon"]}
                    />
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/carrinho">
                  <a className="nav-link">
                    <img
                      src="/icons/cart.svg"
                      alt="Carrinho de compras"
                      aria-label="Carrinho de compras"
                      className={styles["nav-icon"]}
                    />
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="#">
                  <a className="nav-link">
                    <img
                      src="/icons/user.svg"
                      alt="Área do usuário"
                      aria-label="Área do usuário"
                      className={styles["nav-icon"]}
                    />
                  </a>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}