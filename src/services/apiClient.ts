import axios from "axios";
import * as next from "next";
import { parseCookies } from "nookies";

// para chamadas no lado do servidor (SSR)
export function getAPIClient(ctx?: Pick<next.NextPageContext, 'req'> | {
  req: next.NextApiRequest;
} | null | undefined) {
  const { 'ecommerce.token': token } = parseCookies();

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_API}`
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}