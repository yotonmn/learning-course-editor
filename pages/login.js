import React from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import {
    Button,
    Divider,
    Form,
    notification,
    Space,
    Typography,
    Input,
} from "antd";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import FacebookButton from "@components/common/FacebookButton";
import GoogleButton from "@components/common/GoogleButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { signInManual } from "@lib/auth";
import { SessionContext } from "@lib/context";
import { useRouter } from "next/router";
import { signInManualAdmin } from "@lib/auth";
const { Title, Paragraph } = Typography;

const GOOGLE_CLIENT_ID =
    process.env.GOOGLE_CLIENT_ID ||
    "761687243021-tb0bskb31t21eqgr8qogap0evs44knk0.apps.googleusercontent.com";

export default function Login() {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { user, signIn } = useContext(SessionContext);
    useEffect(() => {
        // user && router.push('/profile/wallet')
        user && router.back();
    }, [user, router]);

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? t("success") : t("error"),
            description: data,
        });
    };

    const onFinish = async (values) => {
        setLoading(true);
        const data = await signInManualAdmin(values);
        //data buruu uchir sign in hj chadku
        //todo aldaa zasah
        if (!data?.success) {
            // const errorTxt = await data.json();
            console.log("error");
            setLoading(false);
            openNotificationWithIcon("error", "error");
        } else {
            openNotificationWithIcon("success", t("welcome"));
            await signIn(data);
        }
    };

    const onFinishFailed = (errorInfo) => {};
    return (
        <div className="bg-trueGray-900 h-screen ">
            <Navbar />
            <h1 className="sr-only">Checkout</h1>

            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10  dark:text-gray-100 h-full mt-[-50px] mx-auto">
                <div className="align-middle  my-auto ">
                    <div className="mb-8 text-center">
                        <h2 className="my-3 text-4xl font-bold">Admin login</h2>
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
                            onFinish={(values) => onFinish(values)}
                            onFinishFailed={onFinishFailed}
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
                                        placeholder="name@example.com"
                                    />
                                </Form.Item>
                                <div className="hs-form-item-pass">
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
                                            placeholder="Password"
                                        />
                                    </Form.Item>
                                    <Link href="/recovery">
                                        <Button
                                            className="hs-btn-text"
                                            type="text"
                                        >
                                            {t("forgotPassword")}?
                                        </Button>
                                    </Link>
                                </div>
                                <Form.Item className="hs-form-item">
                                    <Button
                                        type="primary"
                                        className="hs-btn hs-btn-primary"
                                        htmlType="submit"
                                        block
                                        loading={loading}
                                    >
                                        {t("login")}
                                    </Button>
                                </Form.Item>
                                {/* <Form.Item className="hs-form-item">
                                    <Divider className="capitalize">or</Divider>
                                </Form.Item>
                                <Form.Item className="hs-form-item">
                                    <FacebookButton />
                                </Form.Item>

                                <Form.Item className="hs-form-item">
                                    <GoogleOAuthProvider
                                        clientId={GOOGLE_CLIENT_ID}
                                    >
                                        <GoogleButton />
                                    </GoogleOAuthProvider>
                                </Form.Item> */}
                                <Form.Item className="hs-form-item hs-form-item-other">
                                    <Paragraph className="paragraph2">
                                        {t("newUser")}?
                                    </Paragraph>
                                    <Link href="/adminRegister">
                                        <Button
                                            className="hs-btn hs-btn-text"
                                            type="text"
                                        >
                                            {t("signup")}
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
