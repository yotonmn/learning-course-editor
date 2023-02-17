import React from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import {
    Button,
    Modal,
    Space,
    Form,
    Input,
    notification,
    Descriptions,
    Radio,
} from "antd";
import { useRouter } from "next/router";
import {
    useCourseById,
    createChapter,
    createSubCourse,
    useSubCourseById,
    updateSubCourse,
    deleteSubCourse,
    mutateSubCourseById,
} from "@lib/service";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import CourseGroup from "@components/modal/courseGroup";
import NewCourse from "@components/modal/newCourse";
import Breadcrumb from "@components/molecule/breadcrumb";
import LeftMenu from "@components/molecule/LeftMenu";
import { Editor } from "@tinymce/tinymce-react";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import { marked } from "marked";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video", "code-block"],
        ["clean"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

export default function Detail() {
    const router = useRouter();
    const id = +router.query.id;

    const subCourseId = +router.query.subCourseId;

    const [editMode, setEditMode] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [submissionModal, setSubmissionModal] = useState(false);

    const { data: course, loading: courseLoading } = useCourseById(id);

    const { data: subCourse } = useSubCourseById(subCourseId);

    const [airdropAmount, setAirdropAmount] = useState(
        subCourse?.data?.airdropAmount
    );
    const [title, setTitle] = useState(subCourse?.data?.subCourseName);

    const [desc, setDesc] = useState(subCourse?.data?.content);
    const [submitType, setSubmitType] = useState(
        subCourse?.data?.examValidation?.exam?.type
    );

    const [submissionDesc, setSubmissionDesc] = useState(
        subCourse?.data?.examValidation?.exam?.question
    );

    const markDown = subCourse?.data?.content;

    useEffect(() => {
        hljs.highlightAll();
    }, [subCourse]);

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? "success" : "error",
            description: data,
        });
    };

    const save = async () => {
        if (!title) {
            openNotificationWithIcon("error", "Please enter a title");
            return;
        }
        if (!desc) {
            openNotificationWithIcon("error", "Please enter a title");
            return;
        }
        var object = {
            subCourseName: title,
            content: desc,
            // examValidation: {
            //     exam: {
            //         type: submitType,
            //         question: submissionDesc,
            //     },
            // },
        };
        console.log(object);
        const { data, status } = await updateSubCourse(subCourseId, object);
        if (status === 200) {
            openNotificationWithIcon(
                "success",
                "Successfully updated sub course!"
            );
            mutateSubCourseById(subCourseId);
            setEditMode(false);
        } else {
            openNotificationWithIcon(
                "error",
                data?.message || "Failed to update sub course!"
            );
            // setLoading(false);
        }
    };

    const saveValidation = async () => {
        if (!submitType || !submissionDesc) {
            openNotificationWithIcon(
                "error",

                "Failed to update sub course submission! Insert data"
            );
        }
        var object = {
            airdropAmount,
            examValidation: {
                exam: {
                    type:
                        submitType ||
                        subCourse?.data?.examValidation?.exam?.type,
                    question: submissionDesc,
                },
            },
        };
        const { data, status } = await updateSubCourse(subCourseId, object);
        if (status === 200) {
            openNotificationWithIcon(
                "success",
                "Successfully updated sub course submission!"
            );
            mutateSubCourseById(subCourseId);
            setEditMode(false);
        } else {
            openNotificationWithIcon(
                "error",
                data?.message || "Failed to update sub course submission!"
            );
            // setLoading(false);
        }
    };

    const deleteSub = async () => {
        const { data, status } = await deleteSubCourse(subCourseId);
        if (status === 200) {
            openNotificationWithIcon(
                "success",
                "Successfully deleted sub course!"
            );
            mutateSubCourseById(subCourseId);
            setEditMode(false);
        } else {
            openNotificationWithIcon(
                "error",
                data?.message || "Failed to delete sub course!"
            );
            // setLoading(false);
        }
    };

    const addContent = (value) => {
        console.log(
            "🚀 ~ file: createCourse.js:79 ~ addContent ~ value",
            value
        );

        setDesc(value);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModalGroup = () => {
        setIsModalOpenGroup(true);
    };

    return (
        <div className=" bg-trueGray-900 h-screen overflow-clip">
            <div className="container mx-auto">
                <Navbar />
            </div>
            <div className="h-full overflow-y-auto">
                <div className="h-full border-t border-trueGray-700 ">
                    <div className="h-full container mx-auto flex px-2">
                        {/* {course?.course?.courseName} */}
                        <LeftMenu
                            detail={course?.subCourses}
                            course={course?.course}
                            id={id}
                        />
                        <div className="w-full p-8 max-h-screen overflow-y-auto">
                            <Breadcrumb
                                courseName={course?.course?.courseName}
                            />

                            <div className=" pb-3">
                                {editMode ? (
                                    <input
                                        className="hs-input"
                                        type="text"
                                        placeholder="Гарчиг"
                                        value={
                                            title ||
                                            subCourse?.data?.subCourseName
                                        }
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                ) : (
                                    <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl text-white">
                                        {subCourse?.data?.subCourseName}
                                    </h2>
                                )}
                            </div>
                            <div className="max-h-screen overflow-y-auto pb-32">
                                {editMode ? (
                                    <textarea
                                        id="w3review"
                                        className="hs-input w-full "
                                        rows="300"
                                        cols="50"
                                        value={desc || subCourse?.data?.content}
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                    />
                                ) : (
                                    markDown && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: marked(markDown),
                                            }}
                                            className="hs-markdown"
                                        ></div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" border-t bg-trueGray-900 border-trueGray-700 bottom-0 fixed w-full h-16 flex ">
                    <div className="container mx-auto flex  px-2">
                        <div className="justify-start flex">
                            <div className="flex w-80 border-r border-trueGray-700">
                                <div className="my-auto flex space-x-4">
                                    {" "}
                                    <Button
                                        type="primary"
                                        className="hs-btn hs-btn-primary  "
                                        onClick={showModal}
                                    >
                                        Add sub-lesson
                                    </Button>
                                    <Button
                                        type="default"
                                        className="hs-btn hs-btn-default "
                                        onClick={showModalGroup}
                                    >
                                        Group
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-end">
                            {editMode ? (
                                <Space>
                                    <Button
                                        type="primary"
                                        className="hs-btn hs-btn-primary my-auto "
                                        onClick={() => save()}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        type="default"
                                        className="hs-btn hs-btn-default my-auto "
                                        onClick={() => setEditMode(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Space>
                            ) : (
                                <Space className="justify-between">
                                    <Button
                                        type="primary"
                                        className="hs-btn hs-btn-primary my-auto "
                                        onClick={() => setEditMode(true)}
                                    >
                                        Edit{" "}
                                    </Button>
                                    <Button
                                        type="default"
                                        className="hs-btn hs-btn-white my-auto "
                                        onClick={() => setSubmissionModal(true)}
                                    >
                                        Submission
                                    </Button>
                                    <Button
                                        type="default"
                                        className="hs-btn hs-btn-text my-auto "
                                        onClick={() => {
                                            setDeleteModalOpen(true);
                                        }}
                                    >
                                        Delete this sub-lesson
                                    </Button>
                                </Space>
                            )}
                        </div>
                    </div>
                </div>
            </div>{" "}
            <CourseGroup
                visible={isModalOpenGroup}
                setVisible={() => setIsModalOpenGroup(false)}
                course={course}
                id={id}
            />
            <NewCourse
                visible={isModalOpen}
                setVisible={() => setIsModalOpen(false)}
                course={course}
                id={id}
            />
            <Modal
                open={submissionModal}
                onCancel={() => setSubmissionModal(false)}
                footer={null}
                className="hs-modal"
            >
                <Space className="w-full" direction="vertical" size={20}>
                    <h4 className="text-center">Insert submission</h4>
                    <Radio.Group
                        defaultValue={
                            submitType ||
                            subCourse?.data?.examValidation?.exam?.type
                        }
                        buttonStyle="solid"
                        className="justify-center flex"
                        onChange={(e) => setSubmitType(e.target.value)}
                    >
                        <Radio.Button value="LINK">Link</Radio.Button>
                        <Radio.Button value="IMAGE">Image</Radio.Button>
                        <Radio.Button value="FILE">File</Radio.Button>
                        {/* <Radio.Button value="d">Chengdu</Radio.Button> */}
                    </Radio.Group>
                    <input
                        className="hs-input w-full"
                        type="text"
                        placeholder="Оролтын тайлбар"
                        value={
                            submissionDesc ||
                            subCourse?.data?.examValidation?.exam?.question
                        }
                        onChange={(e) => setSubmissionDesc(e.target.value)}
                    />
                    <input
                        className="hs-input w-full"
                        type="number"
                        placeholder="Өгөх токены тоо"
                        value={airdropAmount || subCourse?.data?.airdropAmount}
                        onChange={(e) => setAirdropAmount(e.target.value)}
                    />
                    <Space
                        className="w-full justify-end"
                        direction="vertical"
                        size={10}
                    >
                        <Button
                            type="primary"
                            className="hs-btn hs-btn-primary w-full"
                            block
                            onClick={() => saveValidation()}
                        >
                            Save
                        </Button>
                        <Button
                            type="default"
                            className="hs-btn hs-btn-default"
                            block
                            onClick={() => setSubmissionModal(false)}
                        >
                            Cancel
                        </Button>
                    </Space>
                </Space>
            </Modal>
            <Modal
                open={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                footer={null}
                className="hs-modal"
            >
                <Space className="w-full" direction="vertical" size={16}>
                    <h5>Are you sure to delete this sub-lesson?</h5>
                    <Descriptions
                        className="hs-descriptions"
                        column={1}
                        bordered
                    >
                        <Descriptions.Item label="Sub-lesson name">
                            {subCourse?.data?.subCourseName}
                        </Descriptions.Item>
                    </Descriptions>
                    <Space className="w-full justify-end" size={16}>
                        <Button
                            type="primary"
                            className="hs-btn hs-btn-primary w-full"
                            onClick={() => setDeleteModalOpen(false)}
                            block
                        >
                            Cancel
                        </Button>
                        <Button
                            type="default"
                            className="hs-btn hs-btn-default"
                            onClick={() => deleteSub()}
                            block
                        >
                            Delete
                        </Button>
                    </Space>
                </Space>
            </Modal>
        </div>
    );
}

// import fsPromises from "fs/promises";
// import path from "path";
// export async function getStaticProps() {
//     const filePath = path.join(process.cwd(), "lessons.json");
//     const jsonData = await fsPromises.readFile(filePath);
//     const objectData = JSON.parse(jsonData);

//     return {
//         props: objectData,
//     };
// }
