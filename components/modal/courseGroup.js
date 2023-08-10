import React from 'react';
import {
    Button,
    Modal,
    Space,
    Form,
    Input,
    notification,
    Radio,
    Switch,
} from 'antd';
import { useState } from 'react';
import {
    useCourseById,
    createChapter,
    createSubCourse,
    updateChapter,
    deleteChapter,
    mutateCourseById,
} from '@lib/service';

export default function CourseGroup({ visible, setVisible, course, id }) {
    const [deleteMode, setDeleteMode] = useState(false);
    const [submitType, setSubmitType] = useState('');
    const [createdoOrder, setCreatedOrder] = useState([]);
    const [currentChapter, setCurrentChapter] = useState('');

    const [order, setOrder] = useState(1);
    console.log('🚀 ~ file: courseGroup.js:29 ~ CourseGroup ~ order:', order);

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
                'success',
                'Successfully created chapter!'
            );
            mutateCourseById(id);
            form.resetFields();
        } else {
            openNotificationWithIcon(
                'error',
                data?.error || 'Failed to create course!'
            );
            // setLoading(false);
        }
    };

    const onFinishDelete = async (values) => {
        var object = {
            chapterName: values.chapterName,
        };
        console.log('-----', object);

        const { data, status } = await deleteChapter(id, object);

        if (status === 200) {
            openNotificationWithIcon(
                'success',
                'Successfully deleted chapter!'
            );
            form.resetFields();
            mutateCourseById(id);
        } else {
            openNotificationWithIcon(
                'error',
                data?.error || 'Failed to create course!'
            );
            // setLoading(false);
        }
    };

    const onFinishUpdate = async (values) => {
        console.log('-----', values);
        var object;
        if (!values.chapterName && !order) {
            openNotificationWithIcon('error', 'Failed to update chapter!');
            return;
        }
        if (values.chapterName === undefined) {
            object = {
                chapterName: values.chapter,
                order: order,
            };
        } else if (order === undefined) {
            object = {
                chapterName: values.chapter,
                newChapterName: values.chapterName,
            };
        } else {
            object = {
                chapterName: values.chapter,
                newChapterName: values.chapterName,
                order: order,
            };
        }
        console.log(object);

        const { data, status } = await updateChapter(id, object);

        if (status === 200) {
            openNotificationWithIcon(
                'success',
                'Successfully updated chapter!'
            );
            form.resetFields();
            mutateCourseById(id);
        } else {
            openNotificationWithIcon(
                'error',
                data?.error || 'Failed to update course!'
            );
            // setLoading(false);
        }
    };

    const getOrder = (e) => {
        console.log(course);

        const arr = course?.course?.courseChapter;
        const currentChapter = Object.values(arr)
            .flat()
            .filter((subCourse) => subCourse === e.target.value);
        setCurrentChapter(currentChapter);

        const length = arr.length;
        var order = [];
        for (let i = 1; i <= length; i++) {
            order.push(i);
        }
        console.log(order);
        setCreatedOrder(order);

        // const chosenChapter = chapters[e.target.value];
    };

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === 'success' ? 'success' : 'error',
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
                    <Space className="justify-center flex">
                        <Radio.Group
                            defaultValue={submitType}
                            buttonStyle="solid"
                            className="justify-center flex"
                            onChange={(e) => setSubmitType(e.target.value)}
                        >
                            <Radio.Button value="insert">Үүсгэх</Radio.Button>
                            <Radio.Button value="update">Шинэчлэх</Radio.Button>
                            <Radio.Button value="delete">Устгах</Radio.Button>
                        </Radio.Group>
                    </Space>
                    {submitType == 'delete' && (
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
                                {' '}
                                <h5>Устгах бүлэг сонгох</h5>
                                <Form.Item
                                    name="chapterName"
                                    className="hs-form-item"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter Chapter',
                                        },
                                    ]}
                                    required
                                >
                                    <select
                                        placeholder="select"
                                        className=" hs-input-custom w-full px-4"
                                    >
                                        <option value="⬇️ Select a chapters ⬇️">
                                            {' '}
                                            -- Select a chapter --{' '}
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
                                </Form.Item>{' '}
                            </Space>
                        </Form>
                    )}
                    {submitType == 'update' && (
                        <Form
                            className="hs-row"
                            form={form}
                            layout="vertical"
                            requiredMark={true}
                            onFinish={onFinishUpdate}
                            autoComplete="off"
                        >
                            <Space
                                className="w-full"
                                direction="vertical"
                                size={16}
                            >
                                {' '}
                                <h5>Шинэчлэх бүлэг сонгох</h5>
                                <Form.Item
                                    name="chapter"
                                    className="hs-form-item"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter Chapter',
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
                                            {' '}
                                            -- Select a chapter --{' '}
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
                                </Form.Item>
                                {createdoOrder.length != 0 && (
                                    <Form.Item
                                        name="order"
                                        className="hs-form-item"
                                        rules={[
                                            {
                                                message: 'Enter Order',
                                            },
                                        ]}
                                        required
                                    >
                                        <p className="text-white">Дараалал</p>
                                        <select
                                            placeholder="select"
                                            className=" hs-input-custom w-full px-4"
                                            onChange={(e) =>
                                                setOrder(e.target.value)
                                            }
                                            value={order}
                                        >
                                            {createdoOrder.map(
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
                                    </Form.Item>
                                )}
                                {createdoOrder.length != 0 && (
                                    <Form.Item
                                        name="chapterName"
                                        className="hs-form-item"
                                        rules={[
                                            {
                                                message: 'Enter Title',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="hs-input"
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Updated chapter name"
                                        />
                                    </Form.Item>
                                )}
                                <Form.Item className="hs-form-item">
                                    <Button
                                        type="default"
                                        className="hs-btn hs-btn-default"
                                        htmlType="submit"
                                        block
                                    >
                                        Update
                                    </Button>
                                </Form.Item>{' '}
                            </Space>
                        </Form>
                    )}
                    {submitType == 'insert' && (
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
                                            message: 'Enter Title',
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
