import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { signInGoogle } from "@lib/auth";
import { SessionContext } from "@lib/context";
import { notification } from "antd";
import { useContext, useState } from "react";
import useMediaQuery from "use-media-antd-query";

export default function GoogleButton({ isLogin = true }) {
    const { signIn } = useContext(SessionContext);
    const [loading, setLoading] = useState(false);
    const colSize = useMediaQuery();
    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? "Success" : "Error",
            description: data,
        });
    };

    const handleFailure = (error) => {
        // console.log('handleFailure - ', error)
    };
    // use this by GoogleLogin
    const responseGoogle = async (response) => {
        fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${response?.credential}`
        )
            .then((res) => res.json())
            .then(async (userResponse) => {
                if (userResponse && userResponse?.sub) {
                    const { credential } = response;
                    const { sub } = userResponse;
                    const data = await signInGoogle(credential, sub);

                    if (!!data) {
                        openNotificationWithIcon("success", "Welcome");
                        // setWelcomeModal(true)
                        await signIn(data);
                    }
                    setLoading(false);
                } else {
                    setLoading(false);
                    openNotificationWithIcon(
                        "error",
                        "Амжилтгүй боллоо. Та дахин оролдоно уу!"
                    );
                }
            })
            .catch((error) => {
                setLoading(false);
                openNotificationWithIcon(
                    "error",
                    "Амжилтгүй боллоо. Та дахин оролдоно уу!"
                );
            });
    };
    return (
        <div className="hs-google-button">
            <GoogleLogin
                size="large"
                // type="icon"
                theme="filled_black"
                shape="circle"
                // width={colSize !== "xs" ? 400 : 250}
                onSuccess={responseGoogle}
                onError={handleFailure}
                text={isLogin ? "signin_with" : "signup_with"}
                logo_alignmen="center"
            />
        </div>
    );
}
