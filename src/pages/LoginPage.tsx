import { useEffect, useState, type FormEvent } from 'react'
import Button from '../components/ui/Button'
import { useLogin } from '../features/auth'

const LoginPage = () => {
  const { mutate: login, isPending } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) return

    login({ email, password })
  }

  useEffect(() => {
    document.body.classList.add('bg-primary')

    return () => {
      document.body.classList.remove('bg-primary')
    }
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                </div>
                <form onSubmit={handleSubmit} className="user">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email address..."
                      className="form-control py-4"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control py-4"
                      placeholder="Enter your password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    text="Login"
                    className="py-3 font-weight-bold btn btn-primary btn-block btn-user"
                    loading={isPending}
                    disabled={isPending}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
