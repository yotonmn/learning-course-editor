import React from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import { useState } from "react";
import dynamic from "next/dynamic";
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
import Link from "next/link";
import { createCourse } from "@lib/service";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

// const modules= {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline'],
//       ['image', 'code-block']
//     ]
//   },

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

export default function CreateCourse() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
    const [subLessons, setSubLessons] = useState([]);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onFinish = async (values) => {
        console.log(values);
        setSubLessons([...subLessons, values]);
        form.resetFields();
    };

    const save = async () => {
        var jsonData = {
            courseName: title,
            courseDescription: desc,
            categoryId: 1,
        };
        console.log(
            "🚀 ~ file: createCourse.js:68 ~ save ~ jsonData",
            jsonData
        );

        const { data, status } = await createCourse(jsonData);
        console.log("🚀 ~ file: createCourse.js:70 ~ save ~ status", status);
        console.log("🚀 ~ file: createCourse.js:70 ~ save ~ data", data);

        if (status === 200) {
            openNotificationWithIcon("success", "Successfully created course!");
            // setEmailSent(true);
            // setLoading(false);
        } else {
            openNotificationWithIcon(
                "error",
                data?.message || "Failed to create course!"
            );
            // setLoading(false);
        }
    };

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? "success" : "error",
            description: data,
        });
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModalGroup = () => {
        setIsModalOpenGroup(true);
    };
    const handleOkGroup = () => {
        setIsModalOpenGroup(false);
    };
    const handleCancelGroup = () => {
        setIsModalOpenGroup(false);
    };

    const addContent = (value) => {
        console.log(
            "🚀 ~ file: createCourse.js:79 ~ addContent ~ value",
            value
        );

        setDesc(value);
    };

    // const [code, setCode] = useState(
    //     `  {props.children && (
    //         <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
    //             {props.children}
    //         </p>
    //     )}`
    // );
    // console.log(code);
    return (
        <div className="bg-trueGray-900 h-screen overflow-clip">
            <Navbar />
            <div className=" mx-auto pt-16  ">
                <div className="justify-center flex mb-8">
                    <input
                        className="hs-input"
                        type="text"
                        placeholder="Гарчиг"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {/* <h5>Гарчиг</h5> */}
                </div>
                <div className="min-h-screen ">
                    <div className="min-h-screen border-t border-trueGray-700 ">
                        <div className="min-h-screen container mx-auto flex px-2">
                            <div className=" w-80 border-r shrink-0 border-trueGray-700 pb-8 pt-8">
                                <Link href="/createCourse">
                                    <h5 className="pt-3">Overview</h5>
                                </Link>
                                {subLessons.map((course) => (
                                    <p className="pt-1" key={course.title}>
                                        {course.title}
                                    </p>
                                ))}
                            </div>
                            <div className="w-full p-8">
                                <QuillNoSSRWrapper
                                    modules={modules}
                                    theme="snow"
                                    className="hs-editor "
                                    value={desc}
                                    onChange={addContent}
                                />
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
                                <Button
                                    type="primary"
                                    className="hs-btn hs-btn-primary my-auto "
                                    onClick={() => save()}
                                >
                                    Save content
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                name="title"
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
                            <Form.Item
                                name="title"
                                className="hs-form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Title",
                                    },
                                ]}
                                required
                            >
                                <Select
                                    placeholder="Select group"
                                    // onChange={onGenderChange}
                                    allowClear
                                    className="hs-modal"
                                >
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                    <Option value="other">other</Option>
                                </Select>
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
            <Modal
                open={isModalOpenGroup}
                onOk={handleOkGroup}
                onCancel={handleCancelGroup}
                className="hs-modal"
            >
                <Space className="w-full" direction="vertical" size={16}>
                    <h5>Шинэ бүлгийн гарчиг</h5>
                    <input type="text" className="hs-input w-full" />
                </Space>
            </Modal>
            {/* <Footer /> */}
        </div>
    );
}
