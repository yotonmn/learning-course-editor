import React from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import {
    Button,
    Form,
    notification,
    Space,
    Typography,
    Input,
    Avatar,
} from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSession } from "@lib/context";
const { TextArea } = Input;

export default function EditProfile() {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const { user } = useSession();

    const onFinish = async (values) => {
        const { data, status } = await register(values);
        if (status === 200) {
            const { email, password } = values;
            const { data, status } = await login({ email, password });
            await signIn(data);
            openNotificationWithIcon(
                "success",
                "Таны бүртгэл амжилттай үүслээ! Email руу баталгаажуулах код явуулсан"
            );
        } else {
            openNotificationWithIcon("error", data);
        }
    };
    return (
        <div className="bg-trueGray-900">
            <Navbar />
            <div className="container mx-auto pt-16 max-w-screen-xl">
                <div className="px-16 space-y-7">
                    <Form
                        className="hs-row"
                        form={form}
                        layout="vertical"
                        requiredMark={true}
                        onFinish={onFinish}
                        initialValues={{
                            email: user?.email,
                            firstName: user?.firstName,
                            phoneNumber: user?.phoneNumber,
                            social: user?.social,
                            // address: address,
                        }}
                    >
                        <div className="border border-trueGray-700 rounded-xl">
                            <p className=" text-lg leading-normal p-4 pl-7  border-b border-trueGray-700 lg:text-xl  dark:text-gray-300">
                                General
                            </p>
                            <Space
                                size={30}
                                direction="vertical"
                                className="w-full p-7"
                            >
                                <div className="w-full flex flex-row">
                                    <Form.Item
                                        name="firstName"
                                        className="hs-form-item"
                                    >
                                        <Space
                                            direction="vertical"
                                            className="flex grow mr-8"
                                        >
                                            <Avatar
                                                size={48}
                                                src={
                                                    user?.picture
                                                        ? user.picture
                                                        : "https://source.boringavatars.com/"
                                                }
                                                className="justify-center flex mx-auto"
                                            />
                                            <Button
                                                type="default"
                                                className="hs-btn-s hs-btn-default "
                                                block
                                            >
                                                Upload file
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                    <Form.Item
                                        label={t("username")}
                                        name="firstName"
                                        className="hs-form-item w-full items-stretch min-w-xl"
                                        rules={[
                                            {
                                                required: true,
                                                message: t("enterYourName"),
                                            },
                                        ]}
                                        required
                                    >
                                        <Input
                                            className="hs-input "
                                            type="text"
                                            placeholder={t("username")}
                                            value={user?.firstName}
                                        />
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    label={t("email")}
                                    name="email"
                                    className="hs-form-item"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("enterYourEmail"),
                                        },
                                    ]}
                                    required
                                >
                                    <Input
                                        className="hs-input"
                                        type="email"
                                        autoComplete="off"
                                        placeholder="name@example.com"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={t("phoneNumber")}
                                    name="phoneNumber"
                                    className="hs-form-item"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("enterYourPhone"),
                                            min: 8,
                                        },
                                    ]}
                                    required
                                >
                                    <Input
                                        className="hs-input"
                                        type="text"
                                        maxLength="8"
                                        autoComplete="off"
                                        placeholder={t("phoneNumber")}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Bio"
                                    className="hs-form-item"
                                    name="bio"
                                >
                                    <TextArea
                                        rows={4}
                                        placeholder="Role and company"
                                        className="hs-text-area"
                                    />
                                </Form.Item>
                                <Form.Item className="hs-form-item">
                                    <Button
                                        type="primary"
                                        className="hs-btn hs-btn-primary"
                                        htmlType="submit"
                                        block
                                    >
                                        Update my info
                                    </Button>
                                </Form.Item>
                                {/* <Form.Item className="hs-form-item">
                            <Divider className="capitalize">{t("or")}</Divider>
                        </Form.Item> */}
                                {/* <Form.Item className="hs-form-item">
                            <FacebookButton />
                        </Form.Item>
                        <Form.Item className="hs-form-item">
                            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                                <GoogleButton isLogin={false} />
                            </GoogleOAuthProvider>
                        </Form.Item> */}
                                {/* <Form.Item className="hs-form-item hs-form-item-other">
                            <Typography.Paragraph className="paragraph2">
                                {t("registered")}?
                            </Typography.Paragraph>
                            <Link href="/login">
                                <Button
                                    className="hs-btn hs-btn-text"
                                    type="text"
                                >
                                    {t("signin")}
                                </Button>
                            </Link>
                        </Form.Item> */}
                            </Space>
                        </div>
                    </Form>
                    <div className="border border-trueGray-700 rounded-xl">
                        <p className=" text-lg leading-normal p-4 pl-7  border-b border-trueGray-700 lg:text-xl  dark:text-gray-300">
                            Socials
                        </p>
                        <div className="p-7">
                            <Space
                                size={30}
                                direction="vertical"
                                className="w-full"
                            >
                                <Space direction="vertical" className="w-full">
                                    <label
                                        htmlFor="github"
                                        title="Github"
                                        className="mb-3"
                                    >
                                        Github
                                    </label>

                                    <Input
                                        defaultValue="https://ant.design"
                                        className="hs-input "
                                    />
                                </Space>
                                <Space direction="vertical" className="w-full">
                                    <label
                                        htmlFor="github"
                                        title="Github"
                                        className="mb-3"
                                    >
                                        Twitter
                                    </label>

                                    <Input
                                        defaultValue="https://ant.design"
                                        className="hs-input "
                                    />
                                </Space>
                                <Space direction="vertical" className="w-full">
                                    <label
                                        htmlFor="github"
                                        title="Github"
                                        className="mb-3"
                                    >
                                        Twitter
                                    </label>

                                    <Input
                                        defaultValue="https://ant.design"
                                        className="hs-input "
                                    />
                                </Space>
                                <Button
                                    type="primary"
                                    className="hs-btn w-full"
                                >
                                    Save Social links
                                </Button>
                            </Space>
                        </div>
                    </div>
                    <div className="border border-trueGray-700 rounded-xl">
                        <p className=" text-lg leading-normal p-4 pl-7 border-b border-trueGray-700 lg:text-xl  dark:text-gray-300">
                            Web 3
                        </p>
                        <div className="p-7">
                            <Space
                                size={30}
                                direction="vertical"
                                className="w-full"
                            >
                                <Button
                                    type="default"
                                    className="hs-btn hs-btn-default w-full"
                                >
                                    Connect Metamask
                                </Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
