import Link from "next/link";
import { useRouter } from "next/router";
import {
    Affix,
    Anchor,
    Avatar,
    Button,
    Col,
    Divider,
    Dropdown,
    Menu,
    Row,
    Space,
    Typography,
} from "antd";
import Hamburger from "@assets/svgs/menu.svg";
import ChevronDown from "@assets/svgs/bx-chevron-down.svg";
import Logo from "@assets/svgs/logo.svg";
import { useSession } from "@lib/context";
import { useTranslation } from "react-i18next";
import UserCircle from "@assets/svgs/user-circle.svg";
import Wallet from "@assets/svgs/wallet.svg";
import LogOut from "@assets/svgs/log-out-circle.svg";

export default function Navbar() {
    const { user, signOut, admin } = useSession();

    const router = useRouter();
    const { t } = useTranslation();

    const handleSignOut = async (evt) => {
        await signOut();
        router.push("/");
    };
    const pushToLogin = () => {
        router.push("/");
    };

    const mobileMenu = [
        {
            key: "/builds",
            label: (
                <Link href="/builds" className="flex items-center">
                    Courses
                </Link>
            ),
        },
        {
            key: "/liveSessions",
            label: (
                <Link href="/createCourse" className="flex items-center">
                    Create course
                </Link>
            ),
        },
        {
            key: "/dao",
            label: (
                <Link href="/dao" className="flex items-center">
                    Docs
                </Link>
            ),
        },

        !user && {
            key: "/",
            label: (
                <Link href="/login" className="flex items-center">
                    {t("login")}
                </Link>
            ),
        },
    ];

    const profileMenu = [
        {
            key: "/profile",
            // icon: <UserCircle />,
            label: <Link href="/profile">{t("Profile")}</Link>,
        },
        {
            key: "/profile/wallet",
            // icon: <Wallet />,
            label: <Link href="/editProfile">Edit profile</Link>,
        },
        {
            key: "/liveSessions",
            label: (
                <Link href="/createCourse" className="flex items-center">
                    Create course
                </Link>
            ),
        },
        {
            key: "logout",
            label: t("logout"),
            // icon: <LogOut />,
            onClick: handleSignOut,
        },
    ];

    return (
        <Affix offsetTop={0} className=" z-20">
            <header className="py-1.5 backdrop-blur-3xl hs-header mx-auto ">
                <Row
                    justify="end"
                    align="center"
                    className="container mx-auto  max-w-screen-xl  align-middle justify-between"
                >
                    <div className="flex-start my-auto">
                        <Link
                            href="/"
                            className="flex justify-center align-middle"
                        >
                            <img
                                src="/img/logo.svg"
                                alt="N"
                                width="32"
                                height="32"
                                className="w-8 align-middle"
                            />
                            <h3 className="pl-2 align-middle my-auto">
                                build.mn
                            </h3>
                        </Link>
                    </div>

                    {/* <div className="hs-nav-center hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 text-lg "
                                    href="/builds"
                                >
                                    Builds
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 text-lg"
                                    href="/createCourse"
                                >
                                    Create course
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 text-lg"
                                    href="/"
                                >
                                    Docs
                                </Link>
                            </li>
                        </ul>
                    </div> */}

                    <div className="flex items-center justify-end">
                        {/* <Button
                            type="primary"
                            className="hs-btn hs-btn-primary"
                            onClick={() => pushToLogin()}
                        >
                            Login
                        </Button> */}
                        {user ? (
                            <Dropdown
                                overlay={
                                    <Menu
                                        defaultSelectedKeys={[router.asPath]}
                                        items={profileMenu}
                                    />
                                }
                                placement="bottomRight"
                                overlayClassName="hs-dropdown hs-dropdown-profile"
                            >
                                <Space
                                    align="center"
                                    justify="center"
                                    className="py-1.5 pl-5"
                                >
                                    <Avatar
                                        size={32}
                                        src={
                                            user?.picture
                                                ? user.picture
                                                : "https://source.boringavatars.com/"
                                        }
                                    />
                                    <ChevronDown />
                                </Space>
                            </Dropdown>
                        ) : (
                            <div className="hidden md:block py-1.5 pl-5">
                                <Link href="/login">
                                    <Button
                                        className="hs-btn hs-btn-primary"
                                        type="primary"
                                    >
                                        {t("login")}
                                    </Button>
                                </Link>
                            </div>
                        )}

                        <div className="md:hidden">
                            <Dropdown
                                overlay={
                                    <Menu
                                        defaultSelectedKeys={[router.asPath]}
                                        className="hs-mobile-menu"
                                        items={mobileMenu}
                                    />
                                }
                                placement="bottomRight"
                                overlayClassName="hs-dropdown"
                            >
                                <div className="py-1.5 pl-5">
                                    <Hamburger />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </Row>
            </header>
        </Affix>
    );
}
