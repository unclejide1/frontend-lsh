import React from 'react'

function BaseFooter() {
  return (
    <footer className="pt-lg-8 pt-5 footer bg-dark text-white mt-5">
      <div className="container mt-lg-2">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 text-white">
            {/* about company */}
            <div className="mb-4">
              <h1>LSH</h1>
              <div className="mt-4">
                <p>
                  LSH is a learning management system for you to enroll and learn SQL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default BaseFooter