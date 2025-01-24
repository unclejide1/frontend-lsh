import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactPlayer from "react-player";
import moment from "moment";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import useAxios from "../../utils/useAxios";
import { userId } from "../../utils/constants";
import Toast from "../plugin/Toast";
import { FaCheckCircle, FaSpinner, FaTrash } from "react-icons/fa";

function CourseDetail() {
  const [course, setCourse] = useState([]);
  const param = useParams();
  const [variantitem, setVariantItem] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [createNote, setCreateNote] = useState({ title: "", note: "" });
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [noteDeleteStatus, setNoteDeleteStatus] = useState({});
  const [createMessage, setCreateMessage] = useState({
    title: "",
    message: "",
  });
  const lastElementRef = useRef(null);
  const [sendMessageStatus, setSendMessageStatus] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [markAsCompletedStatus, setMarkAsCompletedStatus] = useState({});
  const [createReview, setCreateReview] = useState({ rating: 1, review: "" });
  const [studentReview, setStudentReview] = useState([]);
  const [fetchingCourse, setFetchingCourse] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (variant_item) => {
    setShow(true);
    setVariantItem(variant_item);
  };

  const [noteShow, setNoteShow] = useState(false);
  const handleNoteClose = () => setNoteShow(false);
  const handleNoteShow = (note) => {
    setNoteShow(true);
    setSelectedNote(note);
  };

  const [ConversationShow, setConversationShow] = useState(false);
  const handleConversationClose = () => setConversationShow(false);
  const handleConversationShow = (Conversation) => {
    setConversationShow(true);
    setSelectedConversation(Conversation);
  };

  const [addQuestionShow, setAddQuestionShow] = useState(false);
  const handleQuestionClose = () => setAddQuestionShow(false);
  const handleAddQuestionShow = () => {
    setAddQuestionShow(true);
  };

  const fetchCourseDetail = () => {
    useAxios()
      .get(`student/course-detail/${userId}/${param.enrollment_id}`)
      .then((res) => {
        setCourse(res.data);
        const percentageCompleted =
          (res.data.completed_lesson?.length / res.data.lectures?.length) * 100;
        setCompletionPercentage(percentageCompleted.toFixed(0));
        setQuestions(res.data.question_answer);
        setStudentReview(res.data.review);
        setFetchingCourse(false);
      });
  };
  useEffect(() => {
    fetchCourseDetail();
    // console.log(studentReview);
  }, []);

  const handleMarkCourseAsCompleted = (VariantItemId) => {
    const key = `lecture_${VariantItemId}`;
    setMarkAsCompletedStatus({
      ...markAsCompletedStatus,
      [key]: "Updating",
    });

    const formdata = new FormData();
    formdata.append("user_id", userId);
    formdata.append("course_id", course.course?.id);
    formdata.append("variant_item_id", VariantItemId);

    useAxios()
      .post(`student/course-completed/`, formdata)
      .then((res) => {
        fetchCourseDetail();
        setMarkAsCompletedStatus({
          ...markAsCompletedStatus,
          [key]: "Updated",
        });
      });
  };

  const handleNoteChange = (event) => {
    setCreateNote({
      ...createNote,
      [event.target.name]: event.target.value,
    });
  };

  

  const handleSubmitCreateNote = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("title", createNote?.title);
    formdata.append("note", createNote?.note);
    formdata.append("user_id", userId);
    formdata.append("enrollment_id", param.enrollment_id);

    try {
      await useAxios()
        .post(`student/course-note/${userId}/${param.enrollment_id}/`, formdata)
        .then((res) => {
          Toast().fire({
            icon: "success",
            title: "Note Created",
          });

          // Reset the message fields to empty strings after the note is created
          resetMessageFields();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEditNote = async (e, noteId) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", createNote?.title || selectedNote?.title);
    formdata.append("note", createNote?.note || selectedNote?.note);
    formdata.append("user_id", userId);
    formdata.append("enrollment_id", param.enrollment_id);

    try {
      await useAxios()
        .patch(
          `student/course-note-detail/${userId}/${param.enrollment_id}/${noteId}/`,
          formdata
        )
        .then((res) => {
          fetchCourseDetail();
          Toast().fire({
            icon: "success",
            title: "Note Updated",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNote = (noteId) => {
    const key = `note_${noteId}`;
    setNoteDeleteStatus({
      ...noteDeleteStatus,
      [key]: "Deleting",
    });

    useAxios()
      .delete(
        `student/course-note-detail/${userId}/${param.enrollment_id}/${noteId}/`
      )
      .then((res) => {
        fetchCourseDetail();
        Toast().fire({
          icon: "success",
          title: "Note Deleted",
        });
        setNoteDeleteStatus({
          ...noteDeleteStatus,
          [key]: "Deleted",
        });
      });
  };

  const handleMessageChange = (event) => {
    setCreateMessage({
      ...createMessage,
      [event.target.name]: event.target.value,
    });
  };
  console.log(createMessage);

  const resetMessageFields = () => {
    setCreateMessage({
      title: "",
      message: "",
    });
  };

  const sendNewMessage = async (e) => {
    e.preventDefault();
    setSendMessageStatus(true);

    const formdata = new FormData();
    formdata.append("course_id", course.course?.id);
    formdata.append("user_id", userId);
    formdata.append("qa_id", selectedConversation?.qa_id);
    formdata.append("message", createMessage.message);

    try {
      await useAxios()
        .post(`student/question-answer-message-create/`, formdata)
        .then((res) => {
          resetMessageFields();
          console.log(res.data);
          setSelectedConversation(res.data.question);
          setSendMessageStatus(false);
          fetchCourseDetail();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    setSendMessageStatus(true);

    const formdata = new FormData();
    formdata.append("course_id", course.course?.id);
    formdata.append("user_id", userId);
    formdata.append("title", createMessage.title);
    formdata.append("message", createMessage.message);

    try {
      await useAxios()
        .post(`student/question-answer-create/`, formdata)
        .then((res) => {
          resetMessageFields();
          handleQuestionClose();
          console.log(res.data);
          setSelectedConversation(res.data.question);
          setSendMessageStatus(false);
          fetchCourseDetail();
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(course);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation]);

  const handleSearchQuestions = (event) => {
    const query = event.target.value.toLowerCase();
    console.log(query);
    if (query === "") {
      fetchCourseDetail();
    } else {
      const filtered = questions?.filter((question) => {
        return question.title.toLowerCase().includes(query);
      });
      setQuestions(filtered);
    }
  };

  const handleReviewChange = (event) => {
    setCreateReview({
      ...createReview,
      [event.target.name]: event.target.value,
    });
  };

  console.log(studentReview);

  const handleCreateReviewSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("user_id", userId);
    formdata.append("course_id", course.course.id);
    formdata.append("rating", createReview.rating);
    formdata.append("review", createReview.review);

    await useAxios()
      .post(`student/rate-course/`, formdata)
      .then((res) => {
        console.log(res.data);
        fetchCourseDetail();
      });
  };

  const handleUpdateReviewSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("user", userId);
    formdata.append("course", course.course.id);
    formdata.append("rating", createReview.rating || studentReview?.rating);
    formdata.append("review", createReview.review || studentReview?.review);

    await useAxios()
      .patch(`student/review-detail/${userId}/${studentReview?.id}/`, formdata)
      .then((res) => {
        console.log(res.data);
        fetchCourseDetail();
      });
  };
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
              {fetchingCourse === true && (
                <p className="mt-2 p-4">
                  Loading... <i className="fas fa-spinner fa-spin"></i>
                </p>
              )}

              {fetchingCourse === false && (
                <section className="mt-4">
                  <div className="container">
                    <div className="row">
                      {/* Main content START */}
                      <div className="col-12">
                        <div className="card shadow rounded-2 p-0 mt-n5">
                          {/* Tabs START */}
                          <div className="card-header border-bottom px-4 pt-3 pb-0">
                            <ul
                              className="nav nav-bottom-line py-0"
                              id="course-pills-tab"
                              role="tablist"
                            >
                              {/* Tab item */}
                              <li
                                className="nav-item me-2 me-sm-4"
                                role="presentation"
                              >
                                <button
                                  className="nav-link mb-2 mb-md-0 active"
                                  id="course-pills-tab-1"
                                  data-bs-toggle="pill"
                                  data-bs-target="#course-pills-1"
                                  type="button"
                                  role="tab"
                                  aria-controls="course-pills-1"
                                  aria-selected="true"
                                >
                                  Course Lectures
                                </button>
                              </li>
                              {/* Tab item */}
                              <li
                                className="nav-item me-2 me-sm-4"
                                role="presentation"
                              >
                                <button
                                  className="nav-link mb-2 mb-md-0"
                                  id="course-pills-tab-2"
                                  data-bs-toggle="pill"
                                  data-bs-target="#course-pills-2"
                                  type="button"
                                  role="tab"
                                  aria-controls="course-pills-2"
                                  aria-selected="false"
                                >
                                  Notes
                                </button>
                              </li>
                              {/* Tab item */}
                              <li
                                className="nav-item me-2 me-sm-4"
                                role="presentation"
                              >
                                <button
                                  className="nav-link mb-2 mb-md-0"
                                  id="course-pills-tab-3"
                                  data-bs-toggle="pill"
                                  data-bs-target="#course-pills-3"
                                  type="button"
                                  role="tab"
                                  aria-controls="course-pills-3"
                                  aria-selected="false"
                                >
                                  Discussion
                                </button>
                              </li>

                              <li
                                className="nav-item me-2 me-sm-4"
                                role="presentation"
                              >
                                <button
                                  className="nav-link mb-2 mb-md-0"
                                  id="course-pills-tab-4"
                                  data-bs-toggle="pill"
                                  data-bs-target="#course-pills-4"
                                  type="button"
                                  role="tab"
                                  aria-controls="course-pills-4"
                                  aria-selected="false"
                                >
                                  Leave a Review
                                </button>
                              </li>
                            </ul>
                          </div>
                          {/* Tabs END */}
                          {/* Tab contents START */}
                          <div className="card-body p-sm-4">
                            <div
                              className="tab-content"
                              id="course-pills-tabContent"
                            >
                              {/* Content START */}
                              <div
                                className="tab-pane fade show active"
                                id="course-pills-1"
                                role="tabpanel"
                                aria-labelledby="course-pills-tab-1"
                              >
                                {/* Accordion START */}
                                <div className="" id="accordionExample2">
                                  <div className="progress mb-3">
                                    <div
                                      className={
                                        completionPercentage < 100
                                          ? `progress-bar`
                                          : `progress-bar bg-success`
                                      }
                                      role="progressbar"
                                      style={{
                                        width: `${completionPercentage}%`,
                                      }}
                                      aria-valuenow={completionPercentage}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    >
                                      {completionPercentage}%
                                    </div>
                                  </div>

                                  {/* Item */}
                                  {course?.curriculum?.map((c, index) => (
                                    <div
                                      className="accordion-item mb-3 p-3 bg-light rounded-3"
                                      key={index}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <h6
                                          className="accordion-header font-base"
                                          id={`heading-${c.variant_id}`}
                                        >
                                          <button
                                            className="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse-${c.variant_id}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse-${c.variant_id}`}
                                          >
                                            {c.title}
                                            <span className="small ms-0 ms-sm-2">
                                              ({c.variant_items?.length} Lecture
                                              {c.variant_items?.length > 1 &&
                                                "s"}
                                              )
                                            </span>
                                          </button>
                                        </h6>
                                        <h6>
                                          <i className="fas fa-caret-down"></i>
                                        </h6>
                                      </div>
                                      <div
                                        id={`collapse-${c.variant_id}`}
                                        className="accordion-collapse collapse show"
                                        aria-labelledby={`heading-${c.variant_id}`}
                                        data-bs-parent="#accordionExample2"
                                      >
                                        <div className="accordion-body mt-3">
                                          {/* Course lecture */}
                                          {c.variant_items?.map((l, index) => (
                                            <>
                                              <div
                                                className="d-flex justify-content-between align-items-center"
                                                key={index}
                                              >
                                                <>
                                                  <div className="position-relative d-flex align-items-center">
                                                    <button
                                                      onClick={() =>
                                                        handleShow(l)
                                                      }
                                                      className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"
                                                    >
                                                      <i className="fas fa-play me-0" />
                                                    </button>
                                                    <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">
                                                      {l.title}
                                                    </span>
                                                  </div>
                                                  <div className="d-flex">
                                                    <p className="mb-0">
                                                      {l.content_duration}
                                                    </p>
                                                    {/* <input type="checkbox" onChange={(e) => handleMarkCourseAsCompleted(e, l.variant_item_id)} className='form-check-input ms-2' name="" id="" /> */}

                                                    {markAsCompletedStatus[
                                                      `lecture_${l.variant_item_id}`
                                                    ] === "Updated" && (
                                                      <i className="fas fa-check-circle ms-2"></i>
                                                    )}

                                                    {markAsCompletedStatus[
                                                      `lecture_${l.variant_item_id}`
                                                    ] === undefined && (
                                                      <input
                                                        type="checkbox"
                                                        onChange={() =>
                                                          handleMarkCourseAsCompleted(
                                                            l.variant_item_id
                                                          )
                                                        }
                                                        className="form-check-input ms-2"
                                                        checked={course.completed_lesson?.some(
                                                          (cl) =>
                                                            cl.variant_item
                                                              .id === l.id
                                                        )}
                                                      />
                                                    )}

                                                    {markAsCompletedStatus[
                                                      `lecture_${l.variant_item_id}`
                                                    ] === "Updating" && (
                                                      <i className="fas fa-spinner fa-spin ms-2"></i>
                                                    )}
                                                  </div>
                                                </>
                                              </div>
                                              <hr />
                                            </>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {/* Accordion END */}
                              </div>

                              <div
                                className="tab-pane fade"
                                id="course-pills-2"
                                role="tabpanel"
                                aria-labelledby="course-pills-tab-2"
                              >
                                <div className="card">
                                  <div className="card-header border-bottom p-0 pb-3">
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                      <h4 className="mb-0 p-3">All Notes</h4>
                                      {/* Add Note Modal */}
                                      <button
                                        type="button"
                                        className="btn btn-primary me-3"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                      >
                                        Add Note <i className="fas fa-pen"></i>
                                      </button>
                                      <div
                                        className="modal fade"
                                        id="exampleModal"
                                        tabIndex={-1}
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                      >
                                        <div className="modal-dialog modal-dialog-centered">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5
                                                className="modal-title"
                                                id="exampleModalLabel"
                                              >
                                                Add New Note{" "}
                                                <i className="fas fa-pen"></i>
                                              </h5>
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              />
                                            </div>
                                            <div className="modal-body">
                                              <form
                                                onSubmit={
                                                  handleSubmitCreateNote
                                                }
                                              >
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="exampleInputEmail1"
                                                    className="form-label"
                                                  >
                                                    Note Title
                                                  </label>
                                                  <input
                                                    onChange={handleNoteChange}
                                                    name="title"
                                                    type="text"
                                                    className="form-control"
                                                  />
                                                </div>
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="exampleInputPassword1"
                                                    className="form-label"
                                                  >
                                                    Note Content
                                                  </label>
                                                  <textarea
                                                    onChange={handleNoteChange}
                                                    name="note"
                                                    className="form-control"
                                                    cols="30"
                                                    rows="10"
                                                  ></textarea>
                                                </div>
                                                <button
                                                  type="button"
                                                  className="btn btn-secondary me-2"
                                                  data-bs-dismiss="modal"
                                                >
                                                  <i className="fas fa-arrow-left"></i>{" "}
                                                  Close
                                                </button>
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary"
                                                >
                                                  Save Note{" "}
                                                  <i className="fas fa-check-circle"></i>
                                                </button>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-body p-0 pt-3">
                                    {/* Note item start */}
                                    <div className="row g-4 p-3">
                                      {course?.note?.map((n, index) => (
                                        <div className="col-sm-11 col-xl-11 shadow p-3 m-3 rounded">
                                          <h5> {n.title || ""}</h5>
                                          <p>{n.note || ""}</p>
                                          {/* Buttons */}
                                          <div className="hstack gap-3 flex-wrap">
                                            <button
                                              onClick={() => handleNoteShow(n)}
                                              type="button"
                                              className="btn btn-success mb-0"
                                            >
                                              <i className="bi bi-pencil-square me-2" />{" "}
                                              Edit
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleDeleteNote(n.id)
                                              }
                                              type="button"
                                              className="btn btn-danger mb-0"
                                            >
                                              {noteDeleteStatus[
                                                `note_${n.id}`
                                              ] === "Deleting" && (
                                                <span>
                                                  Deleting{" "}
                                                  <FaSpinner className="fa-spin" />
                                                </span>
                                              )}
                                              {noteDeleteStatus[
                                                `note_${n.id}`
                                              ] === "Deleted" && (
                                                <span>
                                                  Deleted <FaCheckCircle />
                                                </span>
                                              )}
                                              {noteDeleteStatus[
                                                `note_${n.id}`
                                              ] === undefined && (
                                                <span>
                                                  Delete <FaTrash />
                                                </span>
                                              )}
                                            </button>
                                          </div>
                                        </div>
                                      ))}

                                      {course?.note?.length < 1 && (
                                        <p>No notes yet</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="course-pills-3"
                                role="tabpanel"
                                aria-labelledby="course-pills-tab-3"
                              >
                                <div className="card">
                                  {/* Card header */}
                                  <div className="card-header border-bottom p-0 pb-3">
                                    {/* Title */}
                                    <h4 className="mb-3 p-3">Discussion</h4>
                                    <form className="row g-4 p-3">
                                      {/* Search */}
                                      <div className="col-sm-6 col-lg-9">
                                        <div className="position-relative">
                                          <input
                                            onChange={handleSearchQuestions}
                                            className="form-control pe-5 bg-transparent"
                                            type="search"
                                            placeholder="Search Questions"
                                            aria-label="Search"
                                          />
                                          <button
                                            className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset"
                                            type="submit"
                                          >
                                            <i className="fas fa-search fs-6 " />
                                          </button>
                                        </div>
                                      </div>
                                      <div className="col-sm-6 col-lg-3">
                                        <a
                                          onClick={handleAddQuestionShow}
                                          className="btn btn-primary mb-0 w-100"
                                          data-bs-toggle="modal"
                                          data-bs-target="#modalCreatePost"
                                        >
                                          Ask Question
                                        </a>
                                      </div>
                                    </form>
                                  </div>
                                  {/* Card body */}
                                  <div className="card-body p-0 pt-3">
                                    <div className="vstack gap-3 p-3">
                                      {/* Question item START */}
                                      {questions?.map((q, index) => (
                                        <div
                                          className="shadow rounded-3 p-3"
                                          key={index}
                                        >
                                          <div className="d-sm-flex justify-content-sm-between mb-3">
                                            <div className="d-flex align-items-center">
                                              <div className="avatar avatar-sm flex-shrink-0">
                                                <img
                                                  src={q.profile?.image}
                                                  className="avatar-img rounded-circle"
                                                  alt="avatar"
                                                  style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                  }}
                                                />
                                              </div>
                                              <div className="ms-2">
                                                <h6 className="mb-0">
                                                  <a
                                                    href="#"
                                                    className="text-decoration-none text-dark"
                                                  >
                                                    {q.profile?.full_name}
                                                  </a>
                                                </h6>
                                                <small>
                                                  Asked 10 Hours ago
                                                </small>
                                              </div>
                                            </div>
                                          </div>
                                          <h5>
                                            {q.title}{" "}
                                            <span className="badge bg-success">
                                              {q.messages.length}
                                            </span>
                                          </h5>
                                          <p className="mb-2">{q.note}</p>
                                          <button
                                            onClick={() =>
                                              handleConversationShow(q)
                                            }
                                            className="btn btn-primary btn-sm mb-3 mt-3"
                                          >
                                            Join Conversation{" "}
                                            <i className="fas fa-arrow-right"></i>
                                          </button>
                                        </div>
                                      ))}

                                      {questions?.length < 1 && (
                                        <p>No Questions</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="course-pills-4"
                                role="tabpanel"
                                aria-labelledby="course-pills-tab-4"
                              >
                                <div className="card">
                                  {/* Card header */}

                                  <div className="card-header border-bottom p-0 pb-3">
                                    {/* Title */}
                                    {studentReview && (
                                      <>
                                        <h4 className="mb-2 p-3">
                                          Update Review
                                        </h4>
                                        <div className="mt-1">
                                          <form
                                            className="row g-3 p-3"
                                            onSubmit={handleUpdateReviewSubmit}
                                          >
                                            {/* Rating */}
                                            <div className="col-12 bg-light-input">
                                              <select
                                                id="inputState2"
                                                className="form-select js-choice"
                                                name="rating"
                                                onChange={handleReviewChange}
                                                defaultValue={
                                                  studentReview?.rating
                                                }
                                              >
                                                <option value={1}>
                                                  ★☆☆☆☆ (1/5)
                                                </option>
                                                <option value={2}>
                                                  ★★☆☆☆ (2/5)
                                                </option>
                                                <option value={3}>
                                                  ★★★☆☆ (3/5)
                                                </option>
                                                <option value={4}>
                                                  ★★★★☆ (4/5)
                                                </option>
                                                <option value={5}>
                                                  ★★★★★ (5/5)
                                                </option>
                                              </select>
                                            </div>
                                            {/* Message */}
                                            <div className="col-12 bg-light-input">
                                              <textarea
                                                className="form-control"
                                                placeholder="Your review"
                                                rows={3}
                                                defaultValue={
                                                  studentReview?.review
                                                }
                                                name="review"
                                                onChange={handleReviewChange}
                                              />
                                            </div>
                                            {/* Button */}
                                            <div className="col-12">
                                              <button
                                                type="submit"
                                                className="btn btn-primary mb-0"
                                              >
                                                Post Review
                                              </button>
                                            </div>
                                          </form>
                                        </div>
                                      </>
                                    )}

                                    {!studentReview && (
                                      <>
                                        <h4 className="mb-2 p-3">
                                          Leave a Review
                                        </h4>
                                        <div className="mt-1">
                                          <form
                                            className="row g-3 p-3"
                                            onSubmit={handleCreateReviewSubmit}
                                          >
                                            {/* Rating */}
                                            <div className="col-12 bg-light-input">
                                              <select
                                                id="inputState2"
                                                className="form-select js-choice"
                                                name="rating"
                                                onChange={handleReviewChange}
                                              >
                                                <option value={1}>
                                                  ★☆☆☆☆ (1/5)
                                                </option>
                                                <option value={2}>
                                                  ★★☆☆☆ (2/5)
                                                </option>
                                                <option value={3}>
                                                  ★★★☆☆ (3/5)
                                                </option>
                                                <option value={4}>
                                                  ★★★★☆ (4/5)
                                                </option>
                                                <option value={5}>
                                                  ★★★★★ (5/5)
                                                </option>
                                              </select>
                                            </div>
                                            {/* Message */}
                                            <div className="col-12 bg-light-input">
                                              <textarea
                                                className="form-control"
                                                placeholder="Your review"
                                                rows={3}
                                                defaultValue={""}
                                                name="review"
                                                onChange={handleReviewChange}
                                              />
                                            </div>
                                            {/* Button */}
                                            <div className="col-12">
                                              <button
                                                type="submit"
                                                className="btn btn-primary mb-0"
                                              >
                                                Post Review
                                              </button>
                                            </div>
                                          </form>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lecture Modal */}
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lesson: {variantitem?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer
            url={`${variantitem?.file}`}
            controls
            playing
            width={"100%"}
            height={"100%"}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Note Edit Modal */}
      <Modal show={noteShow} size="lg" onHide={handleNoteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lesson: {selectedNote?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSubmitEditNote(e, selectedNote?.id)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Note Title
              </label>
              <input
                onChange={handleNoteChange}
                defaultValue={selectedNote?.title}
                name="title"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Note Content
              </label>
              <textarea
                onChange={handleNoteChange}
                defaultValue={selectedNote?.note}
                name="note"
                className="form-control"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={handleNoteClose}
            >
              <i className="fas fa-arrow-left"></i> Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save Note <i className="fas fa-check-circle"></i>
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Conversations Modal */}
      <Modal show={ConversationShow} size="lg" onHide={handleConversationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lesson: {selectedConversation?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border p-2 p-sm-4 rounded-3">
            <ul
              className="list-unstyled mb-0"
              style={{ overflowY: "scroll", height: "500px" }}
            >
              {selectedConversation?.messages?.map((m, index) => (
                <li className="comment-item mb-3">
                  <div className="d-flex">
                    <div className="avatar avatar-sm flex-shrink-0">
                      <a href="#">
                        <img
                          className="avatar-img rounded-circle"
                          src={
                            m.profile.image?.startsWith("http://127.0.0.1:8000")
                              ? m.profile?.image
                              : `http://127.0.0.1:8000${m.profile.image}`
                          }
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          alt="womans image"
                        />
                      </a>
                    </div>
                    <div className="ms-2">
                      {/* Comment by */}
                      <div className="bg-light p-3 rounded w-100">
                        <div className="d-flex w-100 justify-content-center">
                          <div className="me-2 ">
                            <h6 className="mb-1 lead fw-bold">
                              <a
                                href="#!"
                                className="text-decoration-none text-dark"
                              >
                                {" "}
                                {m.profile?.full_name}
                              </a>
                              <br />
                              <span style={{ fontSize: "12px", color: "gray" }}>
                                {moment(m.date).format("DDD MMM, YYYY")}
                              </span>
                            </h6>

                            <p
                              className="mb-3"
                              dangerouslySetInnerHTML={{
                                __html: `${m?.message}`,
                              }}
                            ></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              <div ref={lastElementRef} />
            </ul>

            {sendMessageStatus === true ? (
              <form class="w-100 d-flex" onSubmit={sendNewMessage}>
                <textarea
                  value={createMessage?.message}
                  readOnly
                  onChange={handleMessageChange}
                  name="message"
                  class="one form-control pe-4 w-75 bg-light"
                  id="autoheighttextarea"
                  rows="2"
                  placeholder="What's your question?"
                ></textarea>
                <button class="btn btn-primary ms-2 mb-0 w-25" type="submit">
                  Sending... <i className="fas fa-spinner fa-spin"></i>
                </button>
              </form>
            ) : (
              <form class="w-100 d-flex" onSubmit={sendNewMessage}>
                <textarea
                  required
                  value={createMessage?.message}
                  onChange={handleMessageChange}
                  name="message"
                  class="one form-control pe-4 w-75"
                  id="autoheighttextarea"
                  rows="2"
                  placeholder="What's your question?"
                ></textarea>
                <button class="btn btn-primary ms-2 mb-0 w-25" type="submit">
                  Post <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* Ask Question */}
      <Modal show={addQuestionShow} size="lg" onHide={handleQuestionClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ask New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveQuestion}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Question Title
              </label>
              <input
                onChange={handleMessageChange}
                defaultValue={selectedNote?.title}
                name="title"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                What's your question?
              </label>
              <textarea
                onChange={handleMessageChange}
                defaultValue={createMessage?.message}
                name="message"
                className="form-control"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={handleQuestionClose}
            >
              <i className="fas fa-arrow-left"></i> Close
            </button>
            <button type="submit" className="btn btn-primary">
              Post Question <i className="fas fa-check-circle"></i>
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <BaseFooter />
    </>
  );
}

export default CourseDetail;
