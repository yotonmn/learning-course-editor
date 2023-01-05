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

export default function NewCourse({ visible, setVisible, course, id }) {
    const [form] = Form.useForm();

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
        </div>
    );
}
