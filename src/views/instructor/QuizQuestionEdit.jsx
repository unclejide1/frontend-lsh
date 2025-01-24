import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import { Link } from 'react-router-dom';

function QuizQuestionEdit() {
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
                            <form className="shadow rounded-3 p-3">
                                <div className="mb-5">
                                    <h4 className="mb-3">Update Question - React is mainly used for building ___.</h4>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="question">Question</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Quiz title"
                                            id="question"
                                            required=""
                                            value={`React is mainly used for building ___`}
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
                                    <button className='btn btn-success'>Save Changes <i className='fas fa-check-circle'></i></button>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    )
}

export default QuizQuestionEdit