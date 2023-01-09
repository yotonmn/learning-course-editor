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
    Select,
    Option,
} from "antd";
import { useRouter } from "next/router";
import {
    useCourseById,
    createChapter,
    createSubCourse,
    updateCourse,
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
    const [editMode, setEditMode] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
    //todo hereggui state
    const [selectedOption, setSelectedOption] = useState();

    const { data: course, loading: courseLoading } = useCourseById(id);
    const [title, setTitle] = useState(course?.course?.courseName);
    const [desc, setDesc] = useState(course?.course?.courseDescription);

    const [form] = Form.useForm();

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? "success" : "error",
            description: data,
        });
    };

    const onFinish = async (values) => {
        var object = {
            chapter: values.chapter,
            subCourseName: values.subCourseName,
            courseId: id,
        };
        // setSubLessons([...subLessons, values]);
        const { data, status } = await createSubCourse(object);
        console.log("🚀 ~ file: [id].js:73 ~ onFinishGroup ~ status", status);
        console.log("🚀 ~ file: [id].js:73 ~ onFinishGroup ~ data", data);
        if (status === 200) {
            openNotificationWithIcon(
                "success",
                "Successfully created sub course!"
            );
            form.resetFields();
        } else {
            openNotificationWithIcon(
                "error",
                data?.message || "Failed to create sub course!"
            );
            // setLoading(false);
        }
    };

    const save = async () => {
        var object = {
            courseName: title,
            courseDescription: desc,
        };
        const { data, status } = await updateCourse(id, object);
        if (status === 200) {
            openNotificationWithIcon("success", "Successfully updated course!");

            setEditMode(false);
        } else {
            openNotificationWithIcon(
                "error",
                data?.message || "Failed to update course!"
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
            <div className="h-full ">
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
                                        value={course?.course?.courseName}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                ) : (
                                    <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                                        {course?.course?.courseName}
                                    </h2>
                                )}
                            </div>
                            <div>
                                {editMode ? (
                                    <QuillNoSSRWrapper
                                        modules={modules}
                                        theme="snow"
                                        className="hs-editor mt-3"
                                        value={
                                            desc ||
                                            course?.course?.courseDescription
                                        }
                                        onChange={addContent}
                                    />
                                ) : (
                                    <p>{course?.course?.courseDescription}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" border-t border-trueGray-700 bottom-0 fixed w-full h-16 flex ">
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
                                        Add group
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
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                className="hs-modal"
                footer={null}
            >
                <Space className="w-full" direction="vertical" size={16}>
                    <h5>Шинэ course-ийн гарчиг</h5>
                    <Form
                        className="hs-row"
                        form={form}
                        layout="vertical"
                        requiredMark={true}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Space
                            className="w-full"
                            direction="vertical"
                            size={16}
                        >
                            <Form.Item
                                name="subCourseName"
                                className="hs-form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Title",
                                    },
                                ]}
                                required
                            >
                                <Input
                                    className="hs-input"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="ERC 20 ..."
                                />
                            </Form.Item>
                            <h5>Бүлэг сонгох</h5>
                            <Form.Item
                                name="chapter"
                                className="hs-form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Chapter",
                                    },
                                ]}
                                required
                            >
                                <select
                                    value={selectedOption}
                                    onChange={handleChange}
                                    placeholder="select"
                                    className=" hs-input-custom w-full px-4"
                                >
                                    <option value="⬇️ Select a chapters ⬇️">
                                        {" "}
                                        -- Select a chapter --{" "}
                                    </option>
                                    {course?.course?.courseChapter?.map(
                                        (item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        )
                                    )}
                                </select>
                                {/* <Select
                                placeholder="Select group"
                                className="hs-modal"
                                option={course?.course?.courseChapter}
                            >
                                <Option value="⬇️ Select a chapters ⬇️">
                                    {" "}
                                    -- Select a chapter --{" "}
                                </Option>
                                {course?.course?.courseChapter.map(
                                    (item, index) => (
                                        <Option key={index} label={item}>
                                            {item}
                                        </Option>
                                    )
                                )}
                            </Select> */}
                            </Form.Item>
                            <Form.Item className="hs-form-item">
                                <Button
                                    type="primary"
                                    className="hs-btn hs-btn-primary"
                                    htmlType="submit"
                                    block
                                >
                                    Create
                                </Button>
                            </Form.Item>
                        </Space>
                    </Form>
                </Space>
            </Modal>
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
