import { useState, useEffect } from "react";
import moment from "moment";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import { teacherId } from "../../utils/constants";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(true);

  useEffect(() => {
    useAxios()
      .get(`teacher/course-order-list/${teacherId}/`)
      .then((res) => {
        setOrders(res.data);
        setFetchingOrders(false);
      });
  }, []);

  console.log(orders);

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
                <div className="card-header border-bottom-0">
                  <h3 className="mb-0">Orders</h3>
                  <span>
                    Order Dashboard is a quick overview of all current orders.
                  </span>
                </div>
                {/* Table */}
                <div className="table-responsive">
                  <table className="table mb-0 text-nowrap table-hover table-centered">
                    <thead className="table-light">
                      <tr>
                        <th>Courses</th>
                        <th>Amount</th>
                        <th>Invoice</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((o, index) => (
                        <tr>
                          <td>
                            <h5 className="mb-0">
                              <a
                                href="#"
                                className="text-inherit text-decoration-none text-dark"
                              >
                                {o.course.title}
                              </a>
                            </h5>
                          </td>
                          <td>${o.price}</td>
                          <td>#{o.order?.oid}</td>
                          <td>{moment(o.date).format("MMM DD, YYYY")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default Orders;
