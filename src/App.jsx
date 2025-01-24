import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { userId } from "./utils/constants";
import CartId from "./views/plugin/CartId";

import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";

import "../src/index.css";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreateNewPassword from "./views/auth/CreateNewPassword";

import Index from "./views/base/Index";
import CourseDetail from "./views/base/CourseDetail";
import Checkout from "./views/base/Checkout";
import Cart from "./views/base/Cart";
import Success from "./views/base/Success";
import StudentDashboard from "./views/student/Dashboard";
import StudentCourses from "./views/student/Courses";
import StudentQuiz from "./views/student/Quiz";
import StudentQuizDetail from "./views/student/QuizDetail";
import StudentQuizResult from "./views/student/QuizResult";
import Wishlist from "./views/student/Wishlist";
import StudentQA from "./views/student/QA";
import StudentQADetail from "./views/student/QADetail";
import StudentProfile from "./views/student/Profile";
import StudentChangePassword from "./views/student/ChangePassword";
import StudentCourseDetail from "./views/student/CourseDetail";
import StudentCourseLectureDetail from "./views/student/StudentCourseLectureDetail";
import Dashboard from "./views/instructor/Dashboard";
import Courses from "./views/instructor/Courses";
import Review from "./views/instructor/Review";
import Students from "./views/instructor/Students";
import Earning from "./views/instructor/Earning";
import Quiz from "./views/instructor/Quiz";
import Orders from "./views/instructor/Orders";
import QuizDetail from "./views/instructor/QuizDetail";
import QuizEdit from "./views/instructor/QuizEdit";
import QuizQuestionEdit from "./views/instructor/QuizQuestionEdit";
import QA from "./views/instructor/QA";
import QADetail from "./views/instructor/QADetail";
import Profile from "./views/instructor/Profile";
import ChangePassword from "./views/instructor/ChangePassword";
import CourseCreate from "./views/instructor/CourseCreate";
import CourseEdit from "./views/instructor/CourseEdit";
import Coupon from "./views/instructor/Coupon";
import apiInstance from "./utils/axios";
import { CartContext, ProfileContext } from "./views/plugin/Context";
import TeacherNotification from "./views/instructor/TeacherNotification";
import useAxios from "./utils/useAxios";
import Search from "./views/base/Search";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const url = userId
      ? `cart/list/${CartId()}/${userId}/`
      : `cart/${CartId()}/`;
    apiInstance.get(url).then((res) => {
      setCartCount(res.data.length);
    });

    useAxios()
      .get(`user/profile/${userId}/`)
      .then((res) => {
        setProfile(res.data);
      });
  }, []);

  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
      <ProfileContext.Provider value={[profile, setProfile]}>
        <BrowserRouter>
          <MainWrapper>
            <Routes>
              {/* Authentication */}
              <Route path="/register/" element={<Register />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/logout/" element={<Logout />} />
              <Route path="/forgot-password/" element={<ForgotPassword />} />
              <Route
                path="/create-new-password/"
                element={<CreateNewPassword />}
              />

              <Route path="/" element={<Index />} />
              <Route path="/course-detail/:slug/" element={<CourseDetail />} />
              <Route path="/cart/" element={<Cart />} />
              <Route path="/checkout/:order_oid/" element={<Checkout />} />
              <Route
                path="/payment-success/:order_oid/"
                element={<Success />}
              />
              <Route path="/search/" element={<Search />} />

              {/* Student Routes */}
              <Route
                path="/student/dashboard/"
                element={
                  <PrivateRoute>
                    <StudentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/courses/"
                element={
                  <PrivateRoute>
                    <StudentCourses />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/courses/:enrollment_id/"
                element={
                  <PrivateRoute>
                    <StudentCourseDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/courses/:enrollment_id/:lecture_id/"
                element={
                  <PrivateRoute>
                    <StudentCourseLectureDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/quiz/"
                element={
                  <PrivateRoute>
                    <StudentQuiz />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/quiz/:course_id/:quiz_id/"
                element={
                  <PrivateRoute>
                    <StudentQuizDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/quiz/:course_id/:quiz_id/result/"
                element={
                  <PrivateRoute>
                    <StudentQuizResult />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/wishlist/"
                element={
                  <PrivateRoute>
                    <Wishlist />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/question-answer/"
                element={
                  <PrivateRoute>
                    <StudentQA />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/question-answer/:course_id/"
                element={
                  <PrivateRoute>
                    <StudentQADetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/profile/"
                element={
                  <PrivateRoute>
                    <StudentProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/change-password/"
                element={
                  <PrivateRoute>
                    <StudentChangePassword />
                  </PrivateRoute>
                }
              />

              {/* Instructor Routes */}
              <Route path="/instructor/dashboard/" element={<Dashboard />} />
              <Route path="/instructor/courses/" element={<Courses />} />
              <Route path="/instructor/reviews/" element={<Review />} />
              <Route path="/instructor/students/" element={<Students />} />
              <Route path="/instructor/earning/" element={<Earning />} />
              <Route path="/instructor/quiz/" element={<Quiz />} />
              <Route
                path="/instructor/quiz/:quiz_id/"
                element={<QuizDetail />}
              />
              <Route
                path="/instructor/quiz/:quiz_id/:question_id/"
                element={<QuizQuestionEdit />}
              />
              <Route
                path="/instructor/quiz/:quiz_id/edit/"
                element={<QuizEdit />}
              />
              <Route path="/instructor/orders/" element={<Orders />} />
              <Route path="/instructor/question-answer/" element={<QA />} />
              <Route
                path="/instructor/question-answer/:course_id/"
                element={<QADetail />}
              />
              <Route path="/instructor/profile/" element={<Profile />} />
              <Route
                path="/instructor/change-password/"
                element={<ChangePassword />}
              />
              <Route
                path="/instructor/create-course/"
                element={<CourseCreate />}
              />
              <Route
                path="/instructor/edit-course/:course_id/"
                element={<CourseEdit />}
              />
              <Route path="/instructor/coupon/" element={<Coupon />} />
              <Route
                path="/instructor/notification/"
                element={<TeacherNotification />}
              />
            </Routes>
          </MainWrapper>
        </BrowserRouter>
      </ProfileContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
