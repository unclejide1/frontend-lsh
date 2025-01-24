import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import { Link } from 'react-router-dom';

function QuizDetail() {
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
                                {/* Card body */}
                                <div className="card-body">
                                    {/* quiz */}
                                    <div className="d-lg-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            {/* quiz img */}
                                            <a href="#">
                                                <img
                                                    src="https://geeksui.codescandy.com/geeks/assets/images/course/course-react.jpg"
                                                    alt="course"
                                                    className="rounded img-4by3-lg"
                                                    style={{ width: "100px", height: "70px", borderRadius: "50%", objectFit: "cover" }}
                                                />
                                            </a>
                                            {/* quiz content */}
                                            <div className="ms-3">
                                                <h3 className="mb-2">
                                                    <a href="#" className="text-inherit text-decoration-none text-dark">
                                                        React Basic Quiz
                                                    </a>
                                                </h3>
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
                                        <div className="d-none d-lg-block">
                                            <Link to={`/instructor/quiz/quiz_id/edit/`} className="btn btn-secondary">
                                                Edit Quiz <i className='fas fa-edit'></i>
                                            </Link>
                                            <a href="#" className="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#addQuizQuestionModal" onClick={handleShow}>
                                                Add new Questions <i className='fas fa-plus'></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* card */}
                            <div className="card mb-4">
                                {/* card body */}
                                <div className="card-body">
                                    <h3 className="mb-3">React is mainly used for building ___.</h3>
                                    {/* list group */}
                                    <div className="list-group">
                                        <div
                                            className="list-group-item list-group-item-action"
                                            aria-current="true"
                                        >
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault1"
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Database
                                                </label>
                                            </div>
                                        </div>
                                        {/* list group */}
                                        <div className="list-group-item list-group-item-action bg-light">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault2"
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Connectivity
                                                </label>
                                            </div>
                                        </div>
                                        {/* list group */}
                                        <div className="list-group-item list-group-item-action">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault3"
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                    User interface
                                                </label>
                                            </div>
                                        </div>
                                        {/* list group */}
                                        <div className="list-group-item list-group-item-action">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault4"
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault4">Design Platform</label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* buttons */}
                                    <div className="mt-3">
                                        <Link to={`/instructor/quiz/quiz_id/question_id/`} className="ms-2 btn btn-secondary btn-sm mt-3">
                                            <span><i className="fa fa-edit" /></span> Edit
                                        </Link>
                                        <Link to={``} className="ms-2 btn btn-danger btn-sm mt-3">
                                            <span><i className="fa fa-trash" /></span> Trash
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </section>

            <Modal show={show} size='xl' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Quiz Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="needs-validation" noValidate="">
                        <div className="mb-5">
                            <h4 className="mb-3">General</h4>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="question">
                                    Write your question
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Quiz title"
                                    id="question"
                                    required=""
                                />
                                <div className="invalid-feedback">Please enter your question.</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-3">Answer</h4>
                            <div className="row p-2">
                                <div className="col-lg-6 border p-2  rounded-3 mb-2">
                                    <div className="mb-2">
                                        <div className="mb-2 d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="mb-0 fw-normal">Choice 1</h5>
                                            </div>
                                            <div>
                                                <div className="d-flex align-items-center lh-1">
                                                    <span>Correct answer</span>
                                                    <div className="form-check form-switch ms-2">
                                                        <input
                                                            className="form-check-input me-0"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="flexSwitchfCheckDefault"
                                                            required=""
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexSwitchCheckDefault"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Write the answer"
                                            className="form-control"
                                            id="correctAnswer"
                                            required=""
                                        />
                                        <div className="invalid-feedback">Please enter your answer.</div>
                                    </div>
                                </div>
                                <div className="col-lg-6 border p-2 rounded-3 mb-2">
                                    <div className="mb-2">
                                        <div className="mb-2 d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="mb-0 fw-normal">Choice 2</h5>
                                            </div>
                                            <div>
                                                <div className="d-flex align-items-center lh-1">
                                                    <span>Correct answer</span>
                                                    <div className="form-check form-switch ms-2">
                                                        <input
                                                            className="form-check-input me-0"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="flexSwitchfCheckDefault"
                                                            required=""
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexSwitchCheckDefault"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Write the answer"
                                            className="form-control"
                                            id="correctAnswer"
                                            required=""
                                        />
                                        <div className="invalid-feedback">Please enter your answer.</div>
                                    </div>
                                </div>
                                <div className="col-lg-6 border p-2 rounded-3 mb-2">
                                    <div className="mb-2">
                                        <div className="mb-2 d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="mb-0 fw-normal">Choice 3</h5>
                                            </div>
                                            <div>
                                                <div className="d-flex align-items-center lh-1">
                                                    <span>Correct answer</span>
                                                    <div className="form-check form-switch ms-2">
                                                        <input
                                                            className="form-check-input me-0"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="flexSwitchfCheckDefault"
                                                            required=""
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexSwitchCheckDefault"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Write the answer"
                                            className="form-control"
                                            id="correctAnswer"
                                            required=""
                                        />
                                        <div className="invalid-feedback">Please enter your answer.</div>
                                    </div>
                                </div>
                                <div className="col-lg-6 border p-2 rounded-3 mb-2">
                                    <div className="mb-2">
                                        <div className="mb-2 d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="mb-0 fw-normal">Choice 4</h5>
                                            </div>
                                            <div>
                                                <div className="d-flex align-items-center lh-1">
                                                    <span>Correct answer</span>
                                                    <div className="form-check form-switch ms-2">
                                                        <input
                                                            className="form-check-input me-0"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="flexSwitchfCheckDefault"
                                                            required=""
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexSwitchCheckDefault"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Write the answer"
                                            className="form-control"
                                            id="correctAnswer"
                                            required=""
                                        />
                                        <div className="invalid-feedback">Please enter your answer.</div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary ms-2">
                            Add Quiz
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>

            <BaseFooter />
        </>
    )
}

export default QuizDetail