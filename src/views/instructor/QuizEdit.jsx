import { useState } from 'react';

import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'

function QuizEdit() {
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
                            <form className="shadow p-3 rounded-3">
                            <h4 className='mb-5'>Update Quiz - Learn React.Js</h4>
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

export default QuizEdit