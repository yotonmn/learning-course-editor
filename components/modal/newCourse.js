import React from "react";
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
import {
    useCourseById,
    createChapter,
    createSubCourse,
    useSubCourseById,
    updateSubCourse,
} from "@lib/service";
import { useState } from "react";

export default function NewCourse({ visible, setVisible, course, id }) {
    const [form] = Form.useForm();
    const [chosenArray, setChosenArray] = useState([]);

    const [order, setOrder] = useState(chosenArray.length + 1);

    const onFinish = async (values) => {
        var object = {
            chapter: values.chapter,
            subCourseName: values.subCourseName,
            courseId: id,
            order: order,
        };
        console.log(object);

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
    const getOrder = (e) => {
        const arr = course?.subCourses;
        const chapters = Object.values(arr)
            .flat()
            .filter((subCourse) => subCourse.chapter === e.target.value);

        setChosenArray(chapters);

        // const chosenChapter = chapters[e.target.value];
    };

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? "success" : "error",
            description: data,
        });
    };
    return (
        <div>
            <Modal
                open={visible}
                onCancel={setVisible}
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
                                    placeholder="select"
                                    className=" hs-input-custom w-full px-4"
                                    onChange={(e) => getOrder(e)}
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
                            {chosenArray.length != 0 && (
                                // <Form.Item
                                //     name="order"
                                //     className="hs-form-item"
                                //     rules={[
                                //         {
                                //             required: true,
                                //             message: "Enter Order",
                                //         },
                                //     ]}
                                //     required
                                // >
                                <select
                                    placeholder="select"
                                    className=" hs-input-custom w-full px-4"
                                    onChange={(e) => setOrder(e.target.value)}
                                    value={order}
                                >
                                    <option value={chosenArray.length + 1}>
                                        Хамгийн сүүлд харуулах
                                    </option>
                                    {chosenArray.map((item, index) => (
                                        <option
                                            key={index.order}
                                            value={item.order}
                                        >
                                            {item.order}
                                        </option>
                                    ))}
                                </select>
                                // </Form.Item>
                            )}
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
        </div>
    );
}
