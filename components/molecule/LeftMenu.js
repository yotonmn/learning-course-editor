import React from "react";
import {
    Button,
    Modal,
    Space,
    Form,
    Input,
    notification,
    Descriptions,
    Switch,
} from "antd";
import { useRouter } from "next/router";
import Image from "next/image";

export default function LeftMenu({ detail, id, course }) {
    const router = useRouter();
    return (
        <div className="w-80 border-r shrink-0 border-trueGray-700 pb-8 pt-8 max-h-screen overflow-y-auto">
            <Space direction="vertical" size={30}>
                <Image
                    src={
                        course?.courseThumbNailUrl ||
                        "https://source.unsplash.com/random/300x300/?2"
                    }
                    height={160}
                    width={368}
                    alt="Cover"
                    priority="true"
                    className="object-cofver   w-full h-full rounded-t-2xl shadow-lg"
                />
                <a
                    onClick={() => {
                        router.push({
                            pathname: "/builds/[id]",
                            query: {
                                id,
                            },
                        });
                    }}
                >
                    <h3>Overview</h3>
                </a>
                {detail &&
                    typeof detail === "object" &&
                    Object.keys(detail).map((chapter) => (
                        <div key={chapter}>
                            <h3>{chapter}</h3>

                            <Space
                                direction="vertical"
                                size={4}
                                className="pt-4"
                            >
                                {typeof detail === "object" &&
                                    Array.isArray(detail[chapter]) &&
                                    detail[chapter].map((child) => (
                                        <a
                                            key={child.id}
                                            onClick={() => {
                                                router.push({
                                                    pathname:
                                                        "/builds/[id]/sub-courses/[subCourseID]",
                                                    query: {
                                                        id,
                                                        subCourseID: child.id,
                                                    },
                                                });
                                            }}
                                        >
                                            <Space>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={3}
                                                    stroke="currentColor"
                                                    className="w-4 h-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                                    />
                                                </svg>
                                                {child.subCourseName}
                                            </Space>
                                        </a>
                                    ))}
                            </Space>
                        </div>
                    ))}
            </Space>
        </div>
    );
}
