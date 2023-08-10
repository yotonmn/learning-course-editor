import React from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import { Space, Button } from "antd";
import Twitter from "@assets/svgs/twitter.svg";
import CourseCard from "@components/courseCard";
import { useSession } from "@lib/context";
import { useCoursesByCategory } from "@lib/service";
import Image from "next/image";

const GOOGLE_CLIENT_ID =
    process.env.GOOGLE_CLIENT_ID ||
    "761687243021-tb0bskb31t21eqgr8qogap0evs44knk0.apps.googleusercontent.com";
export default function Login() {
    const { user } = useSession();

    const { data: courses } = useCoursesByCategory();

    return (
        <div className="bg-trueGray-900">
            <Navbar />
            <div className="container max-w-screen-xl min-h-screen mx-auto">
                <div className="bg-[url('/gradientBack.jpg')] object-cover bg-cover bg-center h-40 relative rounded-xl z-0"></div>
                <div className="px-16">
                    <Space className="justify-between w-full">
                        <div>
                            <Image
                                src={
                                    user?.picture ||
                                    "https://source.boringavatars.com/"
                                }
                                width={96}
                                height={96}
                                alt=""
                                className="rounded-full mt-[-40px] h-24  relative"
                            />
                            <Space direction="vertical" size="7">
                                <h2 className=" mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl dark:text-white">
                                    {user?.userName}
                                </h2>
                                <p className=" text-lg leading-normal  lg:text-xl  dark:text-gray-300">
                                    Admin
                                </p>
                            </Space>
                        </div>
                        <div>
                            {/* <Button
                                type="default"
                                className="hs-btn-default"
                                icon={
                                    <span className="customicon">
                                        <Twitter />
                                    </span>
                                }
                            >
                                Twitter
                            </Button> */}
                        </div>
                    </Space>
                    <div className="my-16">
                        <h3 className=" mb-8 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl dark:text-white">
                            Created courses
                        </h3>
                        <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6">
                            {courses?.data?.rows?.map((course) => (
                                <CourseCard key={course.id} data={course} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
