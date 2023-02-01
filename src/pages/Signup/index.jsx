import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup '
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

import { Icon, Input } from '~/components'

const validationSchema = yup.object().shape({
  name: yup.string().required('Insira um nome'),
  username: yup.string().required('Insira um apelido'),
  email: yup.string().required('Insira um email'),
  password: yup.string().required('Digite uma senha')
})

export const Signup = () => {
  const [auth, setAuth] = useLocalStorage('auth', {})
  const formik = useFormik({
    onSubmit: async values => {
      const res = await axios({
        method: 'post',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/users',
        data: values
      })
      setAuth(res.data)
      // console.log(res.data)
      // window.localStorage.setItem('auth', JSON.stringify(res.data))
    },
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
    validationSchema
  })

  console.log(formik.errors)

  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />
  }

  return (
    <div>
      <header className="p-4 border-b border-red-300">
        <div className="container flex justify-center max-w-xl">
          <img src="./public/logo/logo.svg" className="w-32 md:w-40"></img>
        </div>
      </header>

      <main className="container max-w-xl">
        <div className="p-4 flex space-x-4 items-center">
          <a href="/">
            <Icon name="back" className="h-7" />
          </a>
          <h2 className="text-xl font-bold">Criar uma Conta</h2>
        </div>

        <form className="p-4 space-y-5" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Seu nome"
            error={formik.touched.name && formik.errors.name}
            placeholder="Digite o seu nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            type="text"
            name="username"
            label="Seu nome de usuário"
            error={formik.touched.username && formik.errors.username}
            placeholder="Digite um nome de usuário"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            type="text"
            name="email"
            label="Seu e-mail"
            error={formik.touched.email && formik.errors.email}
            placeholder="Digite o seu e-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            type="password"
            name="password"
            label="Seu senha"
            error={formik.touched.password && formik.errors.password}
            placeholder="Digite a sua senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button
            type="submit"
            className="block w-full text-center text-white bg-red-500 px-6 py-3 rounded-xl disabled:opacity-50"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Carregando...' : 'Criar minha conta'}
          </button>
        </form>
      </main>
    </div>
  )
}
