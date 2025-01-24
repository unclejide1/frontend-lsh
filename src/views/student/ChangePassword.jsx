import React, { useState, useRef, useEffect } from "react";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import useAxios from "../../utils/useAxios";
import { userId } from "../../utils/constants";
import Toast from "../plugin/Toast";

function ChangePassword() {
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
  };

  const changePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password.confirm_new_password !== password.new_password) {
      Toast().fire({
        icon: "warning",
        title: "Incorrect Password",
      });
    }

    if (password.old_password == password.new_password) {
      Toast().fire({
        icon: "warning",
        title: "Use a new password that you have not used before",
      });
    }

    const formdata = new FormData();

    formdata.append("user_id", userId);
    formdata.append("old_password", password.old_password);
    formdata.append("new_password", password.new_password);

    try {
      await useAxios()
        .post(`user/change-password/`, formdata)
        .then((res) => {
          console.log(res.data);
          Toast().fire({
            icon: "success",
            title: "Password Changed Successfully",
          });
          setIsLoading(false);

          setPassword({
            old_password: "",
            new_password: "",
            confirm_new_password: "",
          });
        });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      Toast().fire({
        icon: error.response.data.icon,
        title: error.response.data.message,
      });
      setIsLoading(false);

      setPassword({
        old_password: "",
        new_password: "",
        confirm_new_password: "",
      });
    }
  };

  console.log(password);
  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header Here */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */}
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              {/* Card */}
              <div className="card">
                {/* Card header */}
                <div className="card-header">
                  <h3 className="mb-0">Change Password</h3>
                </div>
                {/* Card body */}
                <div className="card-body">
                  <div>
                    <form className="row gx-3 needs-validation" noValidate="">
                      {/* First name */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="fname">
                          Old Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="**************"
                          required=""
                          name="old_password"
                          onChange={handlePasswordChange}
                        />
                      </div>
                      {/* Last name */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="lname">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="**************"
                          required=""
                          name="new_password"
                          onChange={handlePasswordChange}
                        />
                      </div>

                      {/* Country */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="editCountry">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="**************"
                          required=""
                          name="confirm_new_password"
                          onChange={handlePasswordChange}
                        />
                        <div className="invalid-feedback">
                          Please choose country.
                        </div>
                      </div>
                      <div className="col-12">
                        {/* Button */}
                        {isLoading === true ? (
                          <button
                            onClick={changePasswordSubmit}
                            className="btn btn-primary"
                            type="submit"
                            disabled
                          >
                            Processing
                            <i className="fas fa-spinner fa-spin"></i>
                          </button>
                        ) : (
                          <button
                            onClick={changePasswordSubmit}
                            className="btn btn-primary"
                            type="submit"
                          >
                            Save New Password{" "}
                            <i className="fas fa-check-circle"></i>
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default ChangePassword;
