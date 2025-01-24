import { useEffect, useState } from 'react';
import { register } from '../../utils/auth';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Toast from '../plugin/Toast';


function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next');


  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, []);

  const resetForm = () => {
    setFullname('');
    setEmail('');
    setPhone('');
    setPassword('');
    setPassword2('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set isLoading to true when the form is submitted
    setIsLoading(true);

    const { error } = await register(fullname, email, phone, password, password2);
    if (error) {
      Toast().fire({
        icon: "error",
        text: JSON.stringify(error),
      })
    } else {
      if (next === null) {
        navigate('/');
      } else {
        navigate(next);
      }
      resetForm();
    }

    // Reset isLoading to false when the operation is complete
    setIsLoading(false);
  };
  return (
    <>
      <BaseHeader />

      <section className="container d-flex flex-column vh-100" style={{ marginTop: "150px" }}>
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold">Sign up</h1>
                  <span>
                    Already have an account?
                    <Link to="/login/" className="ms-1">
                      Sign In
                    </Link>
                  </span>
                </div>
                {/* Form */}
                <form className="needs-validation" onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      required
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      required=""
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}

                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="d-grid">
                      {isLoading === true ?
                        <button disabled className="btn btn-primary"> Processing <i className='fas fa-spinner fa-spin'></i></button>
                        :
                        <button type="submit" className="btn btn-primary"> Sign Up <i className='fas fa-sign-in-alt'></i></button>
                      }
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  )
}

export default Register