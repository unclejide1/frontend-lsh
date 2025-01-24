import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { FaCheck, FaShoppingCart, FaSpinner } from "react-icons/fa";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";

import useAxios from "../../utils/useAxios";
import { userId } from "../../utils/constants";
import Toast from "../plugin/Toast";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [fetchingCourse, setFetchingCourse] = useState(true);

  const fetchWishlist = () => {
    useAxios()
      .get(`student/wishlist/${userId}/`)
      .then((res) => {
        setWishlist(res.data);
        setFetchingCourse(false);
      });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = (courseId) => {
    const formdata = new FormData();

    formdata.append("user_id", userId);
    formdata.append("course_id", courseId);
    useAxios()
      .post(`student/wishlist/${userId}/`, formdata)
      .then((res) => {
        fetchWishlist();
        Toast().fire({
          icon: "success",
          title: "Removed From Wishlist",
        });
      });
  };

  console.log(wishlist);
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
              <h4 className="mb-0 mb-4">
                {" "}
                <i className="fas fa-heart"></i> Wishlist{" "}
              </h4>

              <div className="row">
                <div className="col-md-12">
                  {fetchingCourse === false && (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                      {wishlist?.map((w, index) => (
                        <div className="col-lg-4" key={index}>
                          {/* Card */}
                          <div className="card card-hover">
                            <Link to={`/course-detail/${w.course?.slug}/`}>
                              <img
                                src={w.course.image}
                                alt={w.course.title}
                                className="card-img-top"
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                              />
                            </Link>
                            {/* Card Body */}
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="badge bg-info">
                                  {w.course.level}
                                </span>
                                <a
                                  onClick={() => addToWishlist(w.course.id)}
                                  className="fs-5"
                                >
                                  <i className="fas fa-heart text-danger align-middle" />
                                </a>
                              </div>
                              <h4 className="mb-2 text-truncate-line-2 ">
                                <Link
                                  to={`/course-detail/${w.course?.slug}/`}
                                  className="text-inherit text-decoration-none text-dark fs-5"
                                >
                                  {w.course.title?.slice(0, 26)}
                                </Link>
                              </h4>
                              <small>By: {w.course.teacher?.full_name}</small>{" "}
                              <br />
                              <small>
                                {w.course.students?.length} Student(s)
                              </small>{" "}
                              <br />
                              <div className="lh-1 mt-3 d-flex align-items-center">
                                <span className="align-text-top">
                                  <span className="fs-6">
                                    <Rater
                                      total={5}
                                      rating={w.course.average_rating || 0}
                                    />
                                  </span>
                                </span>
                                {w.course.average_rating !== null ? (
                                  <span className="text-black ms-1 mt-1">
                                    {w.course.average_rating}
                                  </span>
                                ) : (
                                  <span className="text-black ms-1 mt-1">
                                    <small>Not Rated Yet</small>
                                  </span>
                                )}
                                {w.course.rating_count !== 0 && (
                                  <span className="fs-6 ms-2 mt-1">
                                    ({w.course.rating_count || "0 Rating"})
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* Card Footer */}
                            <div className="card-footer">
                              <div className="row align-items-center g-0">
                                <div className="col">
                                  <h5 className="mb-0">
                                    ${w.course.price || "0.00"}
                                  </h5>
                                </div>
                                <div className="col-auto">
                                  <Link
                                    to={`/course-detail/${w.course?.slug}/`}
                                    className="text-inherit text-decoration-none btn btn-primary"
                                  >
                                    View Course
                                    <i className="fas fa-arrow-right ms-2 text-primary align-middle me-2 text-white" />
                                  </Link>
                                  <button
                                    onClick={() => addToWishlist(w.course.id)}
                                    className="text-inherit text-decoration-none btn btn-danger ms-2"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {wishlist.length < 1 && (
                        <p className="p-4 mt-2">Wishlist Is Empty</p>
                      )}
                    </div>
                  )}

                  {fetchingCourse === true && (
                    <p className="p-4 mt-2">
                      Loading <i className="fas fa-spinner fa-spin"></i>
                    </p>
                  )}
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

export default Wishlist;
