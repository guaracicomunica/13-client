import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    await signIn(data)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleSignIn)}>
        <input
          { ...register('email') }
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          { ...register('password') }
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
        />
        <button>Entrar</button>
      </form>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        input {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}