import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Home() {
  const [auth] = useLocalStorage('auth', {})
  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />
  }

  return (
    <div className="h-screen bg-red-700 p-4 text-white flex flex-col items-center space-y-6 ">
      <header className="container  flex justify-center max-w-5xl p-4">
        <img src="./src/assets/public/imagem/img.png" className="w-40"></img>
      </header>
      <div className="container max-w-5xl p-4 flex-1 flex flex-col  items-center md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="md:flex-1 flex justify-center">
          {/* alterar imagem do cabeçalho aqui */}
          <img
            src="./src/assets/public/imagem/Mask group.png"
            className="w-full max-w-sm "
          />
        </div>

        <div className="md:flex-1 flex flex-col space-y-6">
          <h1 className="text-3xl text-center md:text-left font-bold">
            Bolão Para à Copa do Mundo, Jogue com seus amigos !!
          </h1>
          <a
            href="/signup"
            className="text-center text-red-700 bg-white text-xl px-8 py-4 rounded-xl"
          >
            Criar Minha Conta
          </a>
          <a
            href="/login"
            className="text-center text-white border border-white text-xl px-8 py-4 rounded-xl"
          >
            Fazer Login
          </a>
        </div>
      </div>
    </div>
  )
}
