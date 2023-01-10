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

export default function LeftMenu({ detail, id }) {
    console.log("🚀 ~ file: LeftMenu.js:15 ~ LeftMenu ~ detail", detail);
    const router = useRouter();
    return (
        <div className="w-80 border-r shrink-0 border-trueGray-700 pb-8 pt-8">
            <Space direction="vertical" size={30}>
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
                    Object.keys(detail).map((chapter) => (
                        <div key={chapter}>
                            <h3>{chapter}</h3>

                            <Space
                                direction="vertical"
                                size={4}
                                className="pt-4"
                            >
                                {detail[chapter].map((child) => (
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
