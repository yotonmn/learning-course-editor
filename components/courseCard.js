import React from "react";
import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import { data } from "autoprefixer";
export default function CourseCard(data) {
    const detail = data?.data;

    const router = useRouter();

    return (
        <div className="group">
            <div
                className="rounded-2xl shadow-md dark:bg-trueGray-800 dark:text-gray-100 group-hover:scale-102 transform
                                        transition duration-300 "
            >
                <a
                    onClick={() => {
                        router.push({
                            pathname: "/builds/[id]",
                            query: {
                                id: detail.id,
                            },
                        });
                    }}
                >
                    {/* <div
                        className='bg-[url("https://source.unsplash.com/random/300x300/?2")] bg-opacity-50 rounded-t-2xl object-cover bg-cover bg-center h-40 relative
                               '
                    >
                        <p className="text-xl font-semibold tracking-wide p-6 bottom-0 absolute ">
                            Start learning ERC 20
                        </p>
                    </div> */}
                    <div className="h-40">
                        <Image
                            src={
                                "https://source.unsplash.com/random/300x300/?2"
                            }
                            height={160}
                            width={368}
                            alt="Cover"
                            priority="true"
                            className="object-cover   w-full h-full rounded-t-2xl shadow-lg"
                        />
                        <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-40 overflow-hidden bg-fixed bg-black bg-opacity-50 group-hover:opacity-0 transition duration-300 ease-in-out "></div>
                        <h3 className="text-xl font-semwibold tracking-wide p-6 mt-20 top-0 absolute ">
                            {detail?.courseName}
                        </h3>
                    </div>
                    <div className="flex flex-col justify-between p-6 space-y-8 ">
                        <div className="space-y-2">
                            <p className="dark:text-gray-100">
                                {detail?.courseDescription}
                            </p>
                        </div>
                        <Button
                            type="primary"
                            className="hs-btn-primary hs-btn"
                            // onClick={() => goToDetail()}
                        >
                            Start learning
                        </Button>
                    </div>
                </a>
            </div>
        </div>
    );
}
