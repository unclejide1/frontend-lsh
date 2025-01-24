import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import Toast from "../plugin/Toast";

import apiInstance from "../../utils/axios";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiInstance.get(`user/password-reset/${email}/`).then((res) => {
        Toast().fire({
          icon: "success",
          title: "Password Reset Email Sent!",
        });
        setIsLoading(false);
        setEmail("");
      });
      setEmail("");
    } catch (error) {
      setEmail("");
      setIsLoading(false);
      if (error.response.data.includes("User matching query does not exist.")) {
        Toast().fire({
          icon: "error",
          title: "Email Address Does Not Exist",
        });
      }
    }
  };

  return (
    <>
      <BaseHeader />

      <section
        className="container d-flex flex-column vh-100"
        style={{ marginTop: "150px" }}
      >
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold">Forgot Password</h1>
                  <span>Let's help you get back into your account</span>
                </div>
                <form className="needs-validation" onSubmit={handleEmailSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="johndoe@gmail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="d-grid">
                      {isLoading === true ? (
                        <button disabled className="btn btn-primary">
                          {" "}
                          Processing <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          {" "}
                          Reset Password <i className="fas fa-arrow-right"></i>
                        </button>
                      )}
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
  );
}

export default ForgotPassword;
