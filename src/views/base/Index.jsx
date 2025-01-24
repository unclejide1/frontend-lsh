import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { FaCheck, FaShoppingCart, FaSpinner } from "react-icons/fa";

import apiInstance from "../../utils/axios";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import CartId from "../plugin/CartId";
import { userId } from "../../utils/constants";
import GetCurrentAddress from "../plugin/UserCountry";
import { CartContext } from "../plugin/Context";
import Toast from "../plugin/Toast";
import useAxios from "../../utils/useAxios";
import heroImage from "../../hero.jpeg"; 
import "../../App.css"; // Import the CSS file

function Index() {
    const [courses, setCourses] = useState([]);
    const [addToCartStatus, setAddToCartStatus] = useState({});
    const [cartCount, setCartCount] = useContext(CartContext);
    const [fetchingCourse, setFetchingCourse] = useState(true);

    useEffect(() => {
        apiInstance.get(`course/course-list/`).then((res) => {
            setCourses(res.data);
            setFetchingCourse(false);
        });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const country = GetCurrentAddress()?.country;

    console.log(courses);

    const addToCart = async (courseId, userId, price, country, cartId) => {
        const formdata = new FormData();
        const key = `course_${courseId}`;
        setAddToCartStatus({ ...addToCartStatus, [key]: "Adding To Cart" });

        formdata.append("course_id", courseId);
        formdata.append("user", userId);
        formdata.append("price", price);
        formdata.append("country", country);
        formdata.append("cart_id", cartId);

        const url = userId ? `cart/list/${CartId()}/${userId}/` : `cart/list/${CartId()}/`;

        try {
            await apiInstance.post(`cart/create/`, formdata).then((res) => {
                setAddToCartStatus({ ...addToCartStatus, [key]: "Added To Cart" });
                Toast().fire({
                    icon: "success",
                    title: "Added To Cart",
                });
            });

            await apiInstance.get(url).then((res) => {
                setCartCount(res.data.length);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addToWishlist = (courseId) => {
        const formdata = new FormData();

        formdata.append("user_id", userId);
        formdata.append("course_id", courseId);
        useAxios()
            .post(`student/wishlist/${userId}/`, formdata)
            .then((res) => {
                console.log(res.data);
                Toast().fire({
                    icon: "success",
                    title: "Added To Wishlist",
                });
            });
    };

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            <BaseHeader />

            <section className="py-lg-8 py-5">
                {/* container */}
                <div className="container my-lg-8">
                    {/* row */}
                    <div className="row align-items-center">
                        {/* col */}
                        <div className="col-lg-6 mb-6 mb-lg-0">
                            <div>
                                {/* heading */}
                                <h5 className="text-dark mb-4">
                                    <i className="fe fe-check icon-xxs icon-shape bg-light-success text-success rounded-circle me-2" />
                                    Learn SQL
                                </h5>
                                {/* heading */}
                                <h1 className="display-3 fw-bold mb-3">Grow your SQL skills and advance your knowledge</h1>
                                
                                {/* btn */}
                                <a href="#" className="btn btn-primary fs-4 text-inherit ms-3">
                                    Start Learning <i className="fas fa-plus"></i>
                                </a>
                            </div>
                        </div>
                        {/* col */}
                        <div className="col-lg-6 d-flex justify-content-center">
                            {/* images */}
                            <div className="position-relative ">
                                <img className=" hero-image" src={heroImage} alt="girl"  />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <BaseFooter />
        </>
    );
}

export default Index;
