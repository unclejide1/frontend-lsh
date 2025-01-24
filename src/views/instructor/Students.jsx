import { useState, useEffect } from "react";
import moment from "moment";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import { API_BASE_URL, SERVER_URL, teacherId } from "../../utils/constants";

function Students() {
  const [students, setStudents] = useState([]);
  const [fetchingStdents, setFetchingStdents] = useState(true);

  const fetchStudentsData = () => {
    useAxios()
      .get(`teacher/student-lists/${teacherId}/`)
      .then((res) => {
        setStudents(res.data);
        setFetchingStdents(false);
      });
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  console.log(students);
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
              <div className="card mb-4">
                {/* Card body */}
                <div className="p-4 d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="mb-0">Students ({students?.length}) </h3>
                    <span>Meet people taking your course.</span>
                  </div>
                  {/* Nav */}
                </div>
              </div>
              {/* Tab content */}
              <div className="row">
                {fetchingStdents === true ? (
                  <p>
                    Loading Students <i className="fas fa-spinner fa-spin"></i>
                  </p>
                ) : (
                  <>
                    {students?.map((s, index) => (
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="p-3 rounded-3 mb-4 shadow">
                          <div className="card-body">
                            <div className="text-center">
                              <img
                                src={SERVER_URL + s.image}
                                className="rounded-circle avatar-xl mb-3"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                alt="avatar"
                              />
                              <h4 className="mb-1">{s.full_name}</h4>
                              <p className="mb-0">
                                {" "}
                                <i className="fas fa-map-pin me-1" />{" "}
                                {s.country}{" "}
                              </p>
                            </div>
                            <div className="d-flex justify-content-between py-2 mt-4 fs-6">
                              <span>Enrolled</span>
                              <span className="text-dark">
                                {moment(s.date).format("MMM DD, YYYY")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Students;
