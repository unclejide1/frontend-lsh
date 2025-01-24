import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import { Link } from 'react-router-dom';


function Quiz() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <div>
                                        <h3 className="mb-0">Quiz</h3>
                                    </div>
                                    <div>
                                        <button onClick={handleShow} className="btn btn-primary btn-sm">
                                            Add New Quiz
                                        </button>
                                    </div>
                                </div>
                                {/* Card body */}
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-centered text-nowrap">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {/* quiz img */}
                                                            <a href="#">
                                                                <img
                                                                    src="https://geeksui.codescandy.com/geeks/assets/images/course/course-javascript.jpg"
                                                                    style={{ width: "100px", height: "70px", borderRadius: "50%", objectFit: "cover" }}
                                                                    alt="course"
                                                                    className="rounded img-4by3-lg"
                                                                />
                                                            </a>
                                                            {/* quiz content */}
                                                            <div className="ms-3">
                                                                <h4 className="mb-2">
                                                                    <Link
                                                                        to={`/instructor/quiz/quiz_id/`}
                                                                        className="text-inherit"
                                                                    >
                                                                        Javascript Basic Quiz
                                                                    </Link>
                                                                </h4>
                                                                <div>
                                                                    <span>
                                                                        <span className="me-2 align-middle">
                                                                            <i className="fe fe-list" />
                                                                        </span>
                                                                        15 Questions
                                                                    </span>

                                                                    <a href="instructor-quiz-result.html" className="ms-2 btn btn-outline-primary btn-sm">
                                                                        <span className="me-2">
                                                                            <i className="fa fa-file-text" />
                                                                        </span>
                                                                        Results
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* icon */}
                                                        <div>
                                                            <a href="instructor-quiz-result.html" className="ms-2 btn btn-primary btn-sm mt-3">
                                                                <span className="me-2"><i className="fa fa-edit" /></span> Edit
                                                            </a>
                                                            <a href="/" className="ms-2 btn btn-danger btn-sm mt-3">
                                                                <span className="me-2"><i className="fa fa-trash" /></span> Trash
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination m-2">
                                                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                            </ul>
                                        </nav>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            <Modal show={show} size='xl' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="needs-validation" noValidate="">
                        <div className="mb-5">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="question">
                                    Choose Course
                                </label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>- Select Course -</option>
                                    <option value="1">React JS For Beginners</option>
                                    <option value="2">Learn Angular 2024</option>
                                    <option value="3">Django and React LMS Webapp</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="questionType">
                                    Quiz Title
                                </label>
                                <input type="text" className='form-control' placeholder='Enter a quiz title' name="" id="" />
                                <div className="invalid-feedback">
                                    Please enter your question type.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="questionType">
                                    Total Points (e.g 100 points)
                                </label>
                                <input type="number" className='form-control' placeholder='Enter total quiz points' name="" id="" />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="questionType">
                                            Failed Score (e.g 25 points and below)
                                        </label>
                                        <input type="number" className='form-control' placeholder='Enter total quiz points' name="" id="" />
                                    </div>

                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="questionType">
                                            Pass Score (e.g 75 points and above)
                                        </label>
                                        <input type="number" className='form-control' placeholder='Enter total quiz points' name="" id="" />
                                    </div>

                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-secondary" onClick={handleClose}>
                                    Close
                                </button>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary ms-2">
                                        Create Quiz
                                    </button>
                                </div>
                            </div>
                        </div>


                    </form>
                </Modal.Body>

            </Modal>

            <BaseFooter />
        </>
    )
}

export default Quiz