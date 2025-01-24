import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import Toast from "../plugin/Toast";
import { teacherId } from "../../utils/constants";
import moment from "moment";

function Coupon() {
  const [coupons, setCoupons] = useState([]);
  const [fetchingCoupon, setFetchingCoupon] = useState(false);
  const [createCoupon, setCreateCoupon] = useState({ code: "", discount: 0 });
  const [selectedCoupon, setSelectedCoupon] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (coupon) => {
    setShow(true);
    setSelectedCoupon(coupon);
  };

  console.log(selectedCoupon);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const handleAddCouponClose = () => setShowAddCoupon(false);
  const handleAddCouponShow = () => setShowAddCoupon(true);

  const fetchCoupons = async () => {
    setFetchingCoupon(true);
    useAxios()
      .get(`teacher/coupon-list/${teacherId}/`)
      .then((res) => {
        console.log(res.data);
        setCoupons(res.data);
        setFetchingCoupon(false);
      });
  };

  useEffect(() => {
    fetchCoupons();
    console.log(coupons);
  }, []);

  const handleCreateCoupon = (event) => {
    setCreateCoupon({
      ...createCoupon,
      [event.target.name]: event.target.value,
    });
  };

  console.log(createCoupon);

  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("teacher", teacherId);
    formdata.append("code", createCoupon.code);
    formdata.append("discount", createCoupon.discount);

    try {
      useAxios()
        .post(`teacher/coupon-list/${teacherId}/`, formdata)
        .then((res) => {
          console.log(res.data);
          handleAddCouponClose();
          fetchCoupons();
          Toast().fire({
            icon: "success",
            title: "Coupon Created.",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      useAxios()
        .delete(`teacher/coupon-detail/${teacherId}/${couponId}/`)
        .then((res) => {
          console.log(res.data);
          fetchCoupons();
          Toast().fire({
            icon: "success",
            title: "Coupon Deleted.",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("teacher", teacherId);
    formdata.append("code", createCoupon.code);
    formdata.append("discount", createCoupon.discount);

    try {
      useAxios()
        .patch(
          `teacher/coupon-detail/${teacherId}/${selectedCoupon.id}/`,
          formdata
        )
        .then((res) => {
          console.log(res.data);
          handleClose();
          fetchCoupons();
          Toast().fire({
            icon: "success",
            title: "Coupon Updated.",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

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
                {/* Card header */}
                <div className="card-header d-lg-flex align-items-center justify-content-between">
                  <div className="mb-3 mb-lg-0">
                    <h3 className="mb-0">Coupons</h3>
                    <span>Manage all your coupons from here</span>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddCouponShow}
                  >
                    Add Coupon
                  </button>
                </div>
                {/* Card body */}
                <div className="card-body">
                  {/* List group */}
                  <ul className="list-group list-group-flush">
                    {/* List group item */}
                    {coupons?.map((c, index) => (
                      <li
                        className="list-group-item p-4 shadow rounded-3 mb-4"
                        key={index}
                      >
                        <div className="d-flex">
                          <div className="ms-3 mt-2">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h4 className="mb-0">{c.code}</h4>
                                <span>{c.used_by?.length} Student</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="mt-2">
                                <span className="me-2 fw-bold">
                                  Discount:{" "}
                                  <span className="fw-light">
                                    {c.discount}% Discount
                                  </span>
                                </span>
                              </p>
                              <p className="mt-1">
                                <span className="me-2 fw-bold">
                                  Date Created:{" "}
                                  <span className="fw-light">
                                    {moment(c.date).format("DD MMMM, YYYY")}
                                  </span>
                                </span>
                              </p>
                              <p>
                                <button
                                  class="btn btn-outline-secondary"
                                  type="button"
                                  onClick={() => handleShow(c)}
                                >
                                  Update Coupon
                                </button>
                                <button
                                  class="btn btn-danger ms-2"
                                  type="button"
                                  onClick={() => handleDeleteCoupon(c.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}

                    {coupons?.length < 1 && (
                      <p className="p-3 mt-3">No Coupons Yet</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update Coupon - <span className="fw-bold">CODE1</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateCoupon}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Code
              </label>
              <input
                type="text"
                placeholder="Code"
                defaultValue={selectedCoupon.code}
                className="form-control"
                name="code"
                onChange={handleCreateCoupon}
                id=""
              />
              <label for="exampleInputEmail1" class="form-label mt-3">
                Discount
              </label>
              <input
                type="text"
                placeholder="Discount"
                defaultValue={selectedCoupon.discount}
                className="form-control"
                onChange={handleCreateCoupon}
                name="discount"
                id=""
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Update Coupon <i className="fas fa-check-circle"> </i>
            </button>

            <Button className="ms-2" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showAddCoupon} onHide={handleAddCouponClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitCoupon}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Code
              </label>
              <input
                type="text"
                placeholder="Code"
                value={createCoupon.code}
                className="form-control"
                name="code"
                onChange={handleCreateCoupon}
              />
              <label for="exampleInputEmail1" class="form-label mt-3">
                Discount
              </label>
              <input
                type="text"
                placeholder="Discount"
                className="form-control"
                name="discount"
                value={createCoupon.discount}
                onChange={handleCreateCoupon}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Create Coupon <i className="fas fa-plus"> </i>
            </button>

            <Button
              className="ms-2"
              variant="secondary"
              onClick={handleAddCouponClose}
            >
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <BaseFooter />
    </>
  );
}

export default Coupon;
