import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import Swal from "sweetalert2";
import apiInstance from "../../utils/axios";
import { teacherId } from "../../utils/constants";

function CourseCreate() {
    const [course, setCourse] = useState({
        category: "",
        file: "",
        image: "",
        title: "",
        description: "",
        price: "",
        level: "",
        language: "",
        teacher_course_status: "",
    });
    const [category, setCategory] = useState([]);
    const [progress, setProgress] = useState(0);

    // CKEditor State
    const [ckEditorData, setCKEditorData] = useState("");
    // Course Variants State
    const [variants, setVariants] = useState([
        {
            title: "",
            items: [{ title: "", description: "", file: "", preview: false }],
        },
    ]);
    console.log(teacherId);
    const [creatingCourse, setCreatingCourse] = useState("Create Course");

    // Fetch All Categories
    useEffect(() => {
        useAxios()
            .get("course/category/")
            .then((res) => {
                setCategory(res.data);
            });
    }, []);

    console.log(category);

    const handleInputChange = (index, field, value, setStateFunction) => {
        setStateFunction((prevState) => {
            const newState = [...prevState];
            newState[index][field] = value;
            return newState;
        });
    };

    const handleVariantChange = (index, propertyName, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][propertyName] = value;
        setVariants(updatedVariants);

        console.log(`Name: ${propertyName} - Index: ${index} - value: ${value}`);
        console.log(variants);
    };

    const handleItemChange = (variantIndex, itemIndex, propertyName, value, type) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].items[itemIndex][propertyName] = value;
        setVariants(updatedVariants);

        console.log(`Name: ${propertyName} - Item Index: ${itemIndex} - Variant Index: ${variantIndex} - value: ${value} - type: ${type}`);

        console.log(variants);
    };

    const addVariant = () => {
        setVariants([
            ...variants,
            {
                title: "",
                items: [{ title: "", description: "", file: "", preview: false }],
            },
        ]);
    };

    const removeVariant = (index) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const addItem = (variantIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].items.push({
            title: "",
            description: "",
            file: "",
            preview: false,
        });
        setVariants(updatedVariants);
    };

    const removeItem = (variantIndex, itemIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].items.splice(itemIndex, 1);
        setVariants(updatedVariants);
    };

    const handleCourseInputChange = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
        });
    };

    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        setCKEditorData(data);
        console.log(ckEditorData);
    };

    const handleCourseImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setCourse({
                    ...course,
                    image: {
                        file: event.target.files[0],
                        preview: reader.result,
                    },
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCourseIntroVideoChange = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.files[0],
        });
    };
    console.log(course);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreatingCourse("Creating");

        if (course.title == "") {
            Swal.fire({
                icon: "warning",
                title: "Title Is Required!",
            });
            setProgress(0);
            setCreatingCourse("Try Again");
            return;
        } else if (ckEditorData === "") {
            Swal.fire({
                icon: "warning",
                title: "Description Is Required!",
            });
            setProgress(0);
            setCreatingCourse("Try Again");
            return;
        } else if (course.price === "") {
            Swal.fire({
                icon: "warning",
                title: "Sale Price Is Required!",
            });
            setProgress(0);
            setCreatingCourse("Try Again");
            return;
        } else if (course.category === "") {
            Swal.fire({
                icon: "warning",
                title: "Category Is Required!",
            });
            setProgress(0);
            setCreatingCourse("Try Again");
            return;
        } else if (course.image === null) {
            Swal.fire({
                icon: "warning",
                title: "Please upload a thumbnail",
                text: "High quality thumbnail will lead to more sales.",
            });
            setProgress(0);
            setCreatingCourse("Try Again");
            return;
        }

        try {
            const formData = new FormData();
            console.log(parseInt(teacherId));
            formData.append("title", course.title);
            formData.append("description", ckEditorData);
            formData.append("category", course.category);
            formData.append("price", course.price);
            formData.append("level", course.level);
            formData.append("language", course.language);
            formData.append("teacher", parseInt(teacherId));

            console.log(course.image);

            formData.append("image", course.image.file);
            // if (course.image !== null || course.image !== "") {
            // }

            if (course.file !== null || course.file !== "") {
                formData.append("file", course.file || "");
            }

            variants.forEach((variant, variantIndex) => {
                Object.entries(variant).forEach(([key, value]) => {
                    console.log(`Key: ${key} - value: ${value}`);
                    formData.append(`variants[${variantIndex}][variant_${key}]`, String(value)); // Prefix variant field names with "variant_"
                });

                variant.items.forEach((item, itemIndex) => {
                    Object.entries(item).forEach(([itemKey, itemValue]) => {
                        console.log(`itemKey: ${itemKey} - itemValue: ${itemValue}`);
                        formData.append(`variants[${variantIndex}][items][${itemIndex}][${itemKey}]`, itemValue);
                    });
                });
            });

            console.log(variants);

            const response = await useAxios().post(
                `teacher/course-create/`,
                formData
                // {
                //   headers: {
                //     "Content-Type": "multipart/form-data",
                //   },

                //   onUploadProgress: (progressEvent) => {
                //     const percentCompleted = Math.round(
                //       (progressEvent.loaded * 100) / progressEvent.total
                //     );
                //     console.log(`Uploading: ${percentCompleted}%`);
                //     setProgress(percentCompleted);
                //   },
                // }
            );

            setCreatingCourse("Created");

            Swal.fire({
                icon: "success",
                title: "Course Created Successfully",
                text: "This Course has been successfully created",
            });

            navigate(`/vendor/product/update/${response.data.pid}/?type=${productType}`);

            console.log("response: ", response.data);
        } catch (error) {
            // setCreatingCourse("Try Again");
            // console.log(error);
            // if (
            //   error.response?.data.sub_category[0] ===
            //   "Incorrect type. Expected pk value, received str."
            // ) {
            //   Swal.fire({
            //     icon: "warning",
            //     title: "Please select a sub category",
            //   });
            //   setProgress(0);
            //   setCreatingCourse("Try Again");
            // } else {
            //   Swal.fire({
            //     icon: "error",
            //     title: "An Error Occured",
            //     text: `Opps... We encountered an error while creating the product, please try again later. (Error Message: ${error})`,
            //   });
            // }
        }
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
                            <form onSubmit={handleSubmit}>
                                <section className="py-4 py-lg-6 bg-primary rounded-3">
                                    <div className="container">
                                        <div className="row">
                                            <div className="offset-lg-1 col-lg-10 col-md-12 col-12">
                                                <div className="d-lg-flex align-items-center justify-content-between">
                                                    {/* Content */}
                                                    <div className="mb-4 mb-lg-0">
                                                        <h1 className="text-white mb-1">Add New Course</h1>
                                                        <p className="mb-0 text-white lead">Just fill the form and create your courses.</p>
                                                    </div>
                                                    <div>
                                                        <Link to="/instructor/courses/" className="btn" style={{ backgroundColor: "white" }}>
                                                            {" "}
                                                            <i className="fas fa-arrow-left"></i> Back to Course
                                                        </Link>
                                                        <a href="instructor-courses.html" className="btn btn-dark ms-2">
                                                            Save <i className="fas fa-check-circle"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="pb-8 mt-5">
                                    <div className="card mb-3">
                                        {/* Basic Info Section */}
                                        <div className="card-header border-bottom px-4 py-3">
                                            <h4 className="mb-0">Basic Information</h4>
                                        </div>
                                        <div className="card-body">
                                            <label htmlFor="courseTHumbnail" className="form-label w-100">
                                                <img
                                                    style={{
                                                        width: "100%",
                                                        height: "330px",
                                                        objectFit: "cover",
                                                        borderRadius: "10px",
                                                    }}
                                                    className="mb-4"
                                                    src={course.image.preview || "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"}
                                                    alt=""
                                                />
                                            </label>

                                            <div className="mb-3">
                                                <label htmlFor="courseTHumbnail" className="form-label">
                                                    Course Thumbnail
                                                </label>
                                                <input id="courseTHumbnail" className="form-control" type="file" name="image" onChange={handleCourseImageChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="courseTitle" className="form-label">
                                                    Intro Video
                                                </label>
                                                <input id="introvideo" className="form-control" type="file" name="file" onChange={handleCourseIntroVideoChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="courseTitle" className="form-label">
                                                    Title
                                                </label>
                                                <input id="courseTitle" className="form-control" type="text" placeholder="" name="title" onChange={handleCourseInputChange} />
                                                <small>Write a 60 character course title.</small>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Courses category</label>
                                                <select className="form-select" name="category" onChange={handleCourseInputChange}>
                                                    <option value="">-------------</option>
                                                    {category?.map((c, index) => (
                                                        <option value={c.id}>{c.title}</option>
                                                    ))}
                                                </select>
                                                <small>Help people find your courses by choosing categories that represent your course.</small>
                                            </div>
                                            <div className="mb-3">
                                                <select className="form-select" name="level" onChange={handleCourseInputChange}>
                                                    <option value="">Select level</option>
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Advanced">Advanced</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <select className="form-select" name="language" onChange={handleCourseInputChange}>
                                                    <option value="">Select Language</option>
                                                    <option value="English">English</option>
                                                    <option value="Spanish">Spanish</option>
                                                    <option value="French">French</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Course Description</label>
                                                <CKEditor editor={ClassicEditor} data={ckEditorData} onChange={handleCKEditorChange} style={{ height: "400px" }} name="description" value={course.description || ""} />
                                                <small>A brief summary of your courses.</small>
                                            </div>
                                            <label htmlFor="courseTitle" className="form-label">
                                                Price
                                            </label>
                                            <input id="courseTitle" className="form-control" type="number" placeholder="$20.99" name="price" onChange={handleCourseInputChange} />
                                        </div>

                                        {/* Curriculum Section */}
                                        <div className="card-header border-bottom px-4 py-3">
                                            <h4 className="mb-0">Curriculum</h4>
                                        </div>
                                        <div className="card-body ">
                                            <>
                                                {variants.map((variant, variantIndex) => (
                                                    <div className="border p-2 rounded-3 mb-3" style={{ backgroundColor: "#ededed" }} key={variantIndex}>
                                                        <div className="d-flex mb-4">
                                                            <input type="text" placeholder="Section Name" required className="form-control" onChange={(e) => handleVariantChange(variantIndex, "title", e.target.value)} />
                                                            <button className="btn btn-danger ms-2" type="button" onClick={() => removeVariant(variantIndex)}>
                                                                <i className="fas fa-trash"></i> {variantIndex}
                                                            </button>
                                                        </div>

                                                        {variant.items.map((item, itemIndex) => (
                                                            <div className="mb-2 mt-2 shadow p-2 rounded-3" style={{ border: "1px #bdbdbd solid" }} key={itemIndex}>
                                                                <input type="text" placeholder="Lesson Title" className="form-control me-1 mt-2" name="title" onChange={(e) => handleItemChange(variantIndex, itemIndex, "title", e.target.value, e.target.type)} />
                                                                <textarea name="" id="" cols="30" className="form-control mt-2" placeholder="Lesson Description" rows="4" onChange={(e) => handleItemChange(variantIndex, itemIndex, "description", e.target.value, e.target.type)}></textarea>
                                                                <div className="row d-flex align-items-center">
                                                                    <div className="col-lg-8">
                                                                        <input type="file" placeholder="Item File" className="form-control me-1 mt-2" name="file" onChange={(e) => handleItemChange(variantIndex, itemIndex, "file", e.target.files[0], e.target.type)} />
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <label htmlFor={`checkbox${1}`}>Preview</label>
                                                                        <input type="checkbox" className="form-check-input ms-2" name="" id={`checkbox${1}`} onChange={(e) => handleItemChange(variantIndex, itemIndex, "preview", e.target.checked, e.target.type)} />
                                                                    </div>
                                                                </div>
                                                                <button className="btn btn-sm btn-outline-danger me-2 mt-2" type="button" onClick={() => removeItem(variantIndex, itemIndex)}>
                                                                    Delete Lesson <i className="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        ))}

                                                        <button className="btn btn-sm btn-primary mt-2" type="button" onClick={() => addItem(variantIndex)}>
                                                            + Add Lesson
                                                        </button>
                                                    </div>
                                                ))}
                                                <button className="btn btn-sm btn-secondary w-100 mt-2" type="button" onClick={addVariant}>
                                                    + New Section
                                                </button>
                                            </>
                                        </div>
                                    </div>
                                    <button className="btn btn-lg btn-success w-100 mt-2" type="submit">
                                        Create Course <i className="fas fa-check-circle"></i>
                                    </button>
                                </section>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    );
}

export default CourseCreate;
