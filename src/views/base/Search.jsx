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

function Search() {
    const [courses, setCourses] = useState([]);
    const [addToCartStatus, setAddToCartStatus] = useState({});
    const [cartCount, setCartCount] = useContext(CartContext);
    const [fetchingCourse, setFetchingCourse] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");

    const fetchCourse = () => {
        apiInstance.get(`course/course-list/`).then((res) => {
            setCourses(res.data);
            setFetchingCourse(false);
        });
    };
    useEffect(() => {
        fetchCourse();
    }, []);

    const country = GetCurrentAddress()?.country;

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
                Toast().fire({
                    icon: "success",
                    title: "Added To Wishlist",
                });
            });
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            fetchCourse();
        } else {
            const course = courses.filter((course) => {
                return course.title.toLowerCase().includes(query);
            });
            setCourses(course);
        }
    };

    return (
        <>
            <BaseHeader />

            <section className="mb-5" style={{ marginTop: "100px" }}>
                <div className="container mb-lg-8 ">
                    <div className="row mb-5 mt-3">
                        {/* col */}
                        <div className="col-12">
                            <div className="mb-6">
                                <h2 className="mb-1 h1">Showing Results for "{searchQuery || "No Searched Item"}"</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <input type="text" className="form-control lg mt-3" placeholder="Search Courses..." onChange={(e) => handleSearch(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                                {courses?.map((c, index) => (
                                    <div className="col" key={index}>
                                        {/* Card */}
                                        <div className="card card-hover">
                                            <Link to={`/course-detail/${c?.slug}/`}>
                                                <img
                                                    src={c.image}
                                                    alt={c.title}
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
                                                    <span className="badge bg-info">{c.level}</span>
                                                    <a onClick={() => addToWishlist(c.id)} className="fs-5">
                                                        <i className="fas fa-heart text-danger align-middle" />
                                                    </a>
                                                </div>
                                                <h4 className="mb-2 text-truncate-line-2 ">
                                                    <Link to={`/course-detail/${c?.slug}/`} className="text-inherit text-decoration-none text-dark fs-5">
                                                        {c.title?.slice(0, 26)}
                                                    </Link>
                                                </h4>
                                                <small>By: {c.teacher?.full_name}</small> <br />
                                                <small>{c.students?.length} Student(s)</small> <br />
                                                <div className="lh-1 mt-3 d-flex align-items-center">
                                                    <span className="align-text-top">
                                                        <span className="fs-6">
                                                            <Rater total={5} rating={c.average_rating || 0} />
                                                        </span>
                                                    </span>
                                                    {c.average_rating !== null ? (
                                                        <span className="text-black ms-1 mt-1">{c.average_rating || "0354"}</span>
                                                    ) : (
                                                        <span className="text-black ms-1 mt-1">
                                                            <small>Not Rated Yet</small>
                                                        </span>
                                                    )}
                                                    {c.rating_count !== 0 && <span className="fs-6 ms-2 mt-1">({c.rating_count})</span>}
                                                </div>
                                            </div>
                                            {/* Card Footer */}
                                            <div className="card-footer">
                                                <div className="row align-items-center g-0">
                                                    <div className="col">
                                                        <h5 className="mb-0">${c.price || "0.00"}</h5>
                                                    </div>
                                                    <div className="col-auto">
                                                        <button onClick={() => addToCart(c.id, userId, c.price, country, CartId())} type="button" className="text-inherit text-decoration-none btn btn-primary me-2">
                                                            {addToCartStatus[`course_${c.id}`] === "Adding To Cart" && <FaSpinner className="spinner-icon" />}
                                                            {addToCartStatus[`course_${c.id}`] === "Added To Cart" && <FaCheck className="check-icon" />}
                                                            {addToCartStatus[`course_${c.id}`] === undefined && <FaShoppingCart />}
                                                        </button>
                                                        <Link to={""} className="text-inherit text-decoration-none btn btn-primary">
                                                            Enroll Now <i className="fas fa-arrow-right text-primary align-middle me-2 text-white" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-8 py-lg-8">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
                        {/* col */}
                        <div className="col-lg-6 col-12 d-none d-lg-block">
                            <div className="d-flex justify-content-center pt-4">
                                {/* img */}
                                <div className="position-relative">
                                    <img src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png" alt="image" className="img-fluid mt-n8" />
                                    <div className="ms-n8 position-absolute bottom-0 start-0 mb-6">
                                        <img src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg" alt="dollor" />
                                    </div>
                                    {/* img */}
                                    <div className="me-n4 position-absolute top-0 end-0">
                                        <img src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg" alt="graph" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            <div className="text-white p-5 p-lg-0">
                                {/* text */}
                                <h2 className="h1 text-white">Become an instructor today</h2>
                                <p className="mb-0">Instructors from around the world teach millions of students on Geeks. We provide the tools and skills to teach what you love.</p>
                                <a href="#" className="btn bg-white text-dark fw-bold mt-4">
                                    Start Teaching Today <i className="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    );
}

export default Search;
