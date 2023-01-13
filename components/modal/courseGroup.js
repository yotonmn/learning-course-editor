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
import { useState } from "react";
import {
    useCourseById,
    createChapter,
    createSubCourse,
    useSubCourseById,
    updateSubCourse,
} from "@lib/service";

export default function CourseGroup({ visible, setVisible, course, id }) {
    const [deleteMode, setDeleteMode] = useState(false);

    const [form] = Form.useForm();

    const onChange = (checked) => {
        setDeleteMode(checked);
    };

    const onFinishGroup = async (values) => {
        console.log(values);
        // var object = {
        //     chapterName: values.title,
        // };

        const { data, status } = await createChapter(id, values);

        if (status === 200) {
            openNotificationWithIcon(
                "success",
                "Successfully created chapter!"
            );
            form.resetFields();
        } else {
            openNotificationWithIcon(
                "error",
                data?.error || "Failed to create course!"
            );
            // setLoading(false);
        }
    };

    const onFinishDelete = async (values) => {
        console.log(values);
        // var object = {
        //     chapterName: values.title,
        // };

        const { data, status } = await createChapter(id, values);

        if (status === 200) {
            openNotificationWithIcon(
                "success",
                "Successfully created chapter!"
            );
            form.resetFields();
        } else {
            openNotificationWithIcon(
                "error",
                data?.error || "Failed to create course!"
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
                footer={null}
                className="hs-modal"
            >
                <Space className="w-full" direction="vertical" size={16}>
                    <h5>Шинэ бүлэг</h5>
                    <Space>
                        <Switch onChange={onChange} className="bg-gray-400" />
                        <h5 className="text-white">Бүлэг устгах </h5>
                    </Space>
                    {deleteMode ? (
                        <Form
                            className="hs-row"
                            form={form}
                            layout="vertical"
                            requiredMark={true}
                            onFinish={onFinishDelete}
                            autoComplete="off"
                        >
                            <Space
                                className="w-full"
                                direction="vertical"
                                size={16}
                            >
                                {" "}
                                <h5>Устгах бүлэг сонгох</h5>
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
                                                <option
                                                    key={index}
                                                    value={item}
                                                >
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
                                        type="default"
                                        className="hs-btn hs-btn-default"
                                        htmlType="submit"
                                        block
                                    >
                                        Delete
                                    </Button>
                                </Form.Item>{" "}
                            </Space>
                        </Form>
                    ) : (
                        <Form
                            className="hs-row"
                            form={form}
                            layout="vertical"
                            requiredMark={true}
                            onFinish={onFinishGroup}
                            autoComplete="off"
                        >
                            <Space
                                className="w-full"
                                direction="vertical"
                                size={16}
                            >
                                <Form.Item
                                    name="chapterName"
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
                                        placeholder="Deploy ..."
                                    />
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
                    )}
                </Space>
            </Modal>
            ;
        </div>
    );
}
