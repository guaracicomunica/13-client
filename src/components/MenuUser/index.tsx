import Link from 'next/link';

import styles from './styles.module.css';

export default function MenuUser() {
  return (
    <aside className={`${styles.menu} card-style py-5 px-4`}>
      <Link href="/pedidos">
        <a className={styles["menu-link"]}>
          <img src="./icons/truck-black.svg" alt="Pedidos" height={20} />
          <span>Pedidos</span>
        </a>
      </Link>

      <hr />

      <Link href="#">
        <a className={styles["menu-link"]}>
          <img src="./icons/exchange.svg" alt="Trocas" height={20} />
          <span>Trocas</span>
        </a>
      </Link>

      <hr />

      <Link href="#">
        <a className={styles["menu-link"]}>
          <img src="./icons/cash.svg" alt="Moedas" height={18} />
          <span>Moedas</span>
        </a>
      </Link>

      <hr />

      <Link href="#">
        <a className={styles["menu-link"]}>
          <img src="./icons/user-black.svg" alt="Seus dados" height={25} />
          <span>Seus dados</span>
        </a>
      </Link>

      <hr />

      <Link href="#">
        <a className={styles["menu-link"]}>
          <img src="./icons/home.svg" alt="Endereços" height={25} />
          <span>Endereços</span>
        </a>
      </Link>

      <hr />

      <Link href="#">
        <a className={styles["menu-link"]}>
          <img src="./icons/credit-card.svg" alt="Cartões salvos" height={18} />
          <span>Cartões salvos</span>
        </a>
      </Link>

      <hr />

      <Link href="#">
        <a className={styles["menu-link"]}>
          <img src="./icons/heart-black.svg" alt="Lista de desejos" height={20} />
          <span>Lista de desejos</span>
        </a>
      </Link>

      <hr />

      <Link href="#">
        <a className={styles["menu-link"]}>
          <img src="./icons/logout.svg" alt="Sair" height={25} />
          <span>Sair</span>
        </a>
      </Link>
    </aside>
  );
}