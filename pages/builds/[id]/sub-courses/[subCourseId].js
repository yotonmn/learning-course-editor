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
    Switch,
} from "antd";
import { useRouter } from "next/router";
import {
    useCourseById,
    createChapter,
    createSubCourse,
    useSubCourseById,
    updateSubCourse,
} from "@lib/service";
import { useState } from "react";
import dynamic from "next/dynamic";
import CourseGroup from "@components/modal/courseGroup";
import NewCourse from "@components/modal/newCourse";
import Breadcrumb from "@components/molecule/breadcrumb";
import LeftMenu from "@components/molecule/LeftMenu";

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
    console.log(router.query.subCourseId);
    const subCourseId = +router.query.subCourseId;

    const [editMode, setEditMode] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const { data: course, loading: courseLoading } = useCourseById(id);
    console.log("🚀 ~ file: [subCourseId].js:64 ~ Detail ~ course", course);
    const { data: subCourse } = useSubCourseById(subCourseId);
    console.log(
        "🚀 ~ file: [subCourseId].js:66 ~ Detail ~ subCourse",
        subCourse
    );
    const [title, setTitle] = useState(subCourse?.data?.subCourseName);

    console.log("🚀 ~ file: [subCourseId].js:71 ~ Detail ~ title", title);

    const [desc, setDesc] = useState(subCourse?.data?.content);

    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? "success" : "error",
            description: data,
        });
    };

    const save = async () => {
        var object = {
            subCourseName: title,
            content: desc,
        };
        const { data, status } = await updateSubCourse(subCourseId, object);
        if (status === 200) {
            openNotificationWithIcon(
                "success",
                "Successfully updated sub course!"
            );

            setEditMode(false);
        } else {
            openNotificationWithIcon(
                "error",
                data?.message || "Failed to update sub course!"
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
                        <LeftMenu detail={course} id={id} />
                        <div className="w-full p-8 max-h-screen overflow-y-auto">
                            <Breadcrumb
                                courseName={course?.course?.courseName}
                            />

                            <div>
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
                                    <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                                        {subCourse?.data?.subCourseName}
                                    </h2>
                                )}
                            </div>
                            <div className="max-h-screen overflow-y-auto">
                                {editMode ? (
                                    <QuillNoSSRWrapper
                                        modules={modules}
                                        theme="snow"
                                        className="hs-editor mt-3 pb-36"
                                        value={desc || subCourse?.data?.content}
                                        onChange={addContent}
                                    />
                                ) : (
                                    <p>{subCourse?.data?.content}</p>
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
