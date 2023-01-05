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
    Divider,
} from "antd";
import FacebookButton from "@components/common/FacebookButton";
import GoogleButton from "@components/common/GoogleButton";

import { login, register } from "@lib/service";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSession } from "@lib/context";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const GOOGLE_CLIENT_ID =
    process.env.GOOGLE_CLIENT_ID ||
    "761687243021-tb0bskb31t21eqgr8qogap0evs44knk0.apps.googleusercontent.com";

export default function Register() {
    const router = useRouter();
    const [form] = Form.useForm();
    const { signIn, user } = useSession();
    const { t } = useTranslation();
    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? t("success") : t("error"),
            description: data,
        });
    };

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

    useEffect(() => {
        // user && router.push('/profile/wallet')
        user && router.back();
    }, [user, router]);
    return (
        <div className="bg-trueGray-900  h-screen">
            <Navbar />
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10  dark:text-gray-100 h-full mt-[-50px] mx-auto">
                <div className="align-middle  my-auto ">
                    <div className="mb-8 text-center">
                        <h2 className="my-3 text-4xl font-bold">
                            Welcome back
                        </h2>
                        <p className="text-sm dark:text-gray-400">
                            Sign in to access your account
                        </p>
                    </div>
                    <div className="w-full hs-login-container ">
                        <Form
                            className="hs-row"
                            form={form}
                            layout="vertical"
                            requiredMark={true}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Space
                                size={30}
                                direction="vertical"
                                className="w-full"
                            >
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
                                    label={t("username")}
                                    name="firstName"
                                    className="hs-form-item"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("enterYourName"),
                                        },
                                    ]}
                                    required
                                >
                                    <Input
                                        className="hs-input"
                                        type="text"
                                        autoComplete="off"
                                        placeholder={t("username")}
                                    />
                                </Form.Item>
                                {/* <Form.Item
                    label={t('phoneNumber')}
                    name="phoneNumber"
                    className="hs-form-item"
                    rules={[
                      {
                        required: true,
                        message: t('enterYourPhone'),
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
                      placeholder={t('phoneNumber')}
                    />
                  </Form.Item> */}
                                <Form.Item
                                    label={t("password")}
                                    className="hs-form-item"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("enterYourPass"),
                                        },
                                    ]}
                                    required
                                >
                                    <Input.Password
                                        className="hs-input"
                                        type="password"
                                        autoComplete="off"
                                        placeholder={t("password")}
                                    />
                                </Form.Item>
                                <Form.Item className="hs-form-item">
                                    <Button
                                        type="primary"
                                        className="hs-btn hs-btn-primary"
                                        htmlType="submit"
                                        block
                                    >
                                        {t("signup")}
                                    </Button>
                                </Form.Item>
                                <Form.Item className="hs-form-item">
                                    <Divider className="capitalize">
                                        {t("or")}
                                    </Divider>
                                </Form.Item>
                                <Form.Item className="hs-form-item">
                                    <FacebookButton />
                                </Form.Item>
                                <Form.Item className="hs-form-item">
                                    <GoogleOAuthProvider
                                        clientId={GOOGLE_CLIENT_ID}
                                    >
                                        <GoogleButton isLogin={false} />
                                    </GoogleOAuthProvider>
                                </Form.Item>
                                <Form.Item className="hs-form-item hs-form-item-other">
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
                                </Form.Item>
                            </Space>
                        </Form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
