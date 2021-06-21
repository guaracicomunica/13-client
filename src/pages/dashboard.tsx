import { GetServerSideProps } from "next";
import { useContext } from "react"
import { parseCookies } from 'nookies'
import { AuthContext } from "../contexts/AuthContext"
import { getAPIClient } from "../services/apiClient";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>usuário autenticado</h1>
      <p>user: {user?.name} - {user?.email}</p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['ecommerce.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}