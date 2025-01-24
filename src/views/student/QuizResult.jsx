import React from 'react'
import { Link } from 'react-router-dom'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'

function QuizResult() {
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
                            <h4 className="mb-0 mb-4"> <i className='fas fa-book'></i> Learn React Course - Quiz Result </h4>

                            <div className="p-4 rounded shadow mt-4">
                                <div className="card-body">
                                    <p className='mt-0 mb-2'>Score: <span className='fw-bold'>25/100</span></p>
                                    <p className='mt-0 mb-0'>Grade: <span className='fw-bold text-danger'>Failed</span></p>
                                    <div
                                        className="progress mt-3 mb-3"
                                        role="progressbar"
                                        aria-label="Example with label"
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div className="progress-bar" style={{ width: "25%" }}>
                                            25%
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <Link to={`/student/quiz/`} className='btn btn-primary mt-3'> <i className='fas fa-arrow-left'></i> Go Back</Link>

                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    )
}

export default QuizResult