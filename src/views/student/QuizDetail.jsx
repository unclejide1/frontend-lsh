import React from 'react'
import { Link } from 'react-router-dom'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'


function QuizDetail() {
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
                            <h4 className="mb-0 mb-4"> <i className='fas fa-book'></i> Learn React Course - Quiz </h4>


                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            Question 1
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                                        <div class="accordion-body">
                                            <h5 className='mb-4'>What programming language has it's extenstion as .py?</h5>

                                            <div className="card-body">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q1" id="q1_r1" defaultValue="r1" />
                                                    <label className="form-check-label" htmlFor="q1_r1">
                                                        Pycode Language
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q1" id="q1_r2" defaultValue="r2" />
                                                    <label className="form-check-label" htmlFor="q1_r2">
                                                        Pytouch Language
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q1" id="q1_r3" defaultValue="r3" />
                                                    <label className="form-check-label" htmlFor="q1_r3">
                                                        Python Language
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q1" id="q1_r4" defaultValue="r4" />
                                                    <label className="form-check-label" htmlFor="q1_r4">
                                                        Pyconda Language
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                            Question 2
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            <h5 className='mb-4'>What stack is React.js used on?</h5>

                                            <div className="card-body">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q2" id="q2_r1" defaultValue="r1" />
                                                    <label className="form-check-label" htmlFor="q2_r1">
                                                        Backend Stack
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q2" id="q2_r2" defaultValue="r2" />
                                                    <label className="form-check-label" htmlFor="q2_r2">
                                                        Frontend Stack
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q2" id="q2_r3" defaultValue="r3" />
                                                    <label className="form-check-label" htmlFor="q2_r3">
                                                        Full Stack
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q2" id="q2_r4" defaultValue="r4" />
                                                    <label className="form-check-label" htmlFor="q2_r4">
                                                        None of the above
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                            Question 3
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            <h5 className='mb-4'>What does HTML stand for?</h5>

                                            <div className="card-body">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q2" id="q2_r1" defaultValue="r1" />
                                                    <label className="form-check-label" htmlFor="q2_r1">
                                                        Hypertext Markup Language
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q2" id="q2_r2" defaultValue="r2" />
                                                    <label className="form-check-label" htmlFor="q2_r2">
                                                        Highlevel Text Markup Language
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q2" id="q2_r3" defaultValue="r3" />
                                                    <label className="form-check-label" htmlFor="q2_r3">
                                                        HighendText Markup Language
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="q2" id="q2_r4" defaultValue="r4" />
                                                    <label className="form-check-label" htmlFor="q2_r4">
                                                        None of the above
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to={`/student/quiz/course_id/quiz_id/result/`} className='btn btn-primary mt-3'>Submit Quiz</Link>


                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    )
}

export default QuizDetail