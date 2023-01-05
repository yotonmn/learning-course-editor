import React from "react";
import { signInFacebook } from "@lib/auth";
import Facebook from "@assets/svgs/facebook.svg";
import { useSession } from "@lib/context";
import { Button, notification } from "antd";
import { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useTranslation } from "react-i18next";

const FACEBOOK_ID = process.env.FACEBOOK_CLIENT_ID || "658790026029000";

export default function FacebookButton() {
    const { t } = useTranslation();
    const { signIn } = useSession();
    const [loading, setLoading] = useState(false);
    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? "Success" : "Error",
            description: data,
        });
    };

    const handleFailure = (error) => {
        // console.log('handleFailure - ', error)
    };

    const responseFacebook = async (response) => {
        const { accessToken, userID } = response;
        const data = await signInFacebook(accessToken, userID);
        if (!!data) {
            openNotificationWithIcon("success", t("welcome"));
        }
        await signIn(data);
    };

    const onClick = (renderProps) => {
        if (!!renderProps) {
            setLoading(true);
            renderProps?.onClick();
        }
        return null;
    };

    const renderFacebookButton = (renderProps) => {
        return (
            <Button
                onClick={() => onClick(renderProps)}
                type="default"
                icon={
                    <span className="customicon">
                        <Facebook />
                    </span>
                }
                block
                className="hs-btn hs-btn-default"
                loading={loading}
            >
                Facebook
            </Button>
        );
    };

    return (
        <FacebookLogin
            appId={FACEBOOK_ID}
            disableMobileRedirect={true}
            fields="name,email,picture"
            callback={responseFacebook}
            render={renderFacebookButton}
        />
    );
}
