import "@assets/styles/globals.css";
import "@assets/styles/globals.sass";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    mutateUserProfile,
    useUserProfile,
    useAdminProfile,
    mutateAdminProfile,
} from "@lib/hooks";
import { getUserIdIfLogged, saveUserId } from "@lib/auth";
import { clearToken, saveToken } from "@lib/auth";
import { SessionContext } from "@lib/context";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/default.css";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const userIdLocal = getUserIdIfLogged();
    const [authorized, setAuthorized] = useState(false);
    const [userId, setUserId] = useState("");
    const { data: user, loading } = useUserProfile(userId || userIdLocal);

    const signIn = async (data) => {
        setUserId(data.data.id);
        await saveToken(data);
        await saveUserId(data.data.id);
        await mutateUserProfile(data.data.id);
        setAuthorized(true);
    };

    const signOut = async () => {
        await clearToken();
        await mutateUserProfile();
        setAuthorized(false);
    };
    function authCheck(url) {
        const publicPaths = [
            // "/",
            "/#",
            "/login",
            "/register",
            "/recovery",
            "/nfts",
            "/proposals",
            "/treasury",
            "/#about",
            "/#roadmap",
            "/#faq",
            "/faq",
            "/builds",
            "/detail",
            "/dao",
            "/createProposal",
            "/adminRegister",
            "/adminLogin",
        ];

        const regexPublicPath = /^\/(nfts)\/(\w|\d){1,}/;
        const path = url.split("?")[0];
        const includedPath =
            publicPaths.includes(path) || regexPublicPath.test(path);
        if (!user && !includedPath && !loading) {
            setAuthorized(false);
            router.push("/login");
        }
        setAuthorized(true);
    }

    useEffect(() => {
        authCheck(router.asPath);
    }, [user, loading, router.asPath]);

    useEffect(() => {
        //When website reloads completely show web page
        const hideContent = () => setAuthorized(false);

        router.events.on("routeChangeStart", hideContent);
        router.events.on("routeChangeComplete", authCheck);

        return () => {
            router.events.off("routeChangeStart", hideContent);
            router.events.off("routeChangeComplete", authCheck);
        };
    }, [user, router.asPath, loading]);

    useEffect(() => {
        // Removing FOUC/Flash of Unstyled Content/ class
        document.documentElement.className =
            document.documentElement.className.replace("no-fouc", "fouc");
        // Disable context menu
        // if (process.env.NODE_ENV === 'production') {
        //   document.addEventListener('contextmenu', function (e) {
        //     e.preventDefault()
        //   })
        //   document.onkeydown = function (e) {
        //     if (e.keyCode === 123) {
        //       return false
        //     }
        //     if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
        //       return false
        //     }
        //     if (e.ctrlKey && e.shifteKey && e.keyCode === 'C'.charCodeAt(0)) {
        //       return false
        //     }
        //     if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
        //       return false
        //     }
        //     if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
        //       return false
        //     }
        //   }
        // }
    }, []);

    return (
        <SessionContext.Provider value={{ user, loading, signIn, signOut }}>
            {authorized && <Component {...pageProps} />}
        </SessionContext.Provider>
    );
}
