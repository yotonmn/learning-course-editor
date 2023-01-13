import React from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
    Button,
    Modal,
    Space,
    Form,
    Input,
    notification,
    Select,
    Option,
} from "antd";
import Link from "next/link";
import {
    createCourse,
    useCoursesByCategory,
    getCoursesByCategory,
} from "@lib/service";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateCourse() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [subDesc, setSubDesc] = useState("");
    const [headerImageUrl, setHeaderImageUrl] = useState("");
    const [headerBannerUrl, setHeaderBannerUrl] = useState("");

    const router = useRouter();
    const editorRef = useRef(null);

    const save = async () => {
        var jsonData = {
            courseName: title,
            courseDescription: editorRef.current.getContent(),
            courseImageUrl: headerImageUrl,
            courseSubDescription: subDesc,
            categoryId: 1,
        };

        const { data, status } = await createCourse(jsonData);
        console.log("🚀 ~ file: createCourse.js:70 ~ save ~ status", status);
        console.log("🚀 ~ file: createCourse.js:70 ~ save ~ data", data);

        // console.log("🚀 ~ file: createCourse.js:100 ~ save ~ dataNew", dataNew);
        if (status === 200) {
            openNotificationWithIcon("success", "Successfully created course!");
            jumpToLatestCourse(data.courseId);
            // setEmailSent(true);
            // setLoading(false);
        } else {
            openNotificationWithIcon(
                "error",
                data?.message || "Failed to create course!"
            );
            // setLoading(false);
        }
    };

    const jumpToLatestCourse = async (id) => {
        router.push({
            pathname: "/builds/[id]",
            query: {
                id,
            },
        });
    };

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === "success" ? "success" : "error",
            description: data,
        });
    };

    const addContent = (value) => {
        setDesc(value);
    };

    // const [code, setCode] = useState(
    //     `  {props.children && (
    //         <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
    //             {props.children}
    //         </p>
    //     )}`
    // );
    // console.log(code);
    return (
        <div className="bg-trueGray-900 h-screen overflow-clip">
            <Navbar />
            <div className=" mx-auto pt-16  ">
                <div className="min-h-screen ">
                    <div className="min-h-screen border-t border-trueGray-700 ">
                        <div className="min-h-screen container mx-auto flex px-2">
                            <div className=" w-80 border-r shrink-0 border-trueGray-700 pb-8 pt-8">
                                <Link href="/createCourse">
                                    <h5 className="pt-3">Overview</h5>
                                </Link>
                            </div>
                            <div className="w-full p-8">
                                <input
                                    className="hs-input w-full"
                                    type="text"
                                    placeholder="Гарчиг"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input
                                    className="hs-input mt-3 w-full"
                                    type="text"
                                    placeholder="Thumbnail image URL"
                                    value={headerImageUrl}
                                    onChange={(e) =>
                                        setHeaderImageUrl(e.target.value)
                                    }
                                />
                                <input
                                    className="hs-input mt-3 w-full"
                                    type="text"
                                    placeholder="Banner image URL"
                                    value={headerBannerUrl}
                                    onChange={(e) =>
                                        setHeaderBannerUrl(e.target.value)
                                    }
                                />
                                <input
                                    className="hs-input my-3 w-full"
                                    type="text"
                                    placeholder="Богино тайлбар"
                                    value={subDesc}
                                    onChange={(e) => setSubDesc(e.target.value)}
                                />

                                <Editor
                                    className="mt-3"
                                    apiKey="6txtqjyoakt14laf9nspotnfhh3a39axurq82x8ego0yq4h1"
                                    onInit={(evt, editor) =>
                                        (editorRef.current = editor)
                                    }
                                    // initialValue="<p>This is the initial content of the editor.</p>"
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "preview",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "code",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                            "code",
                                            "help",
                                            "wordcount",
                                            "codesample",
                                            "code",
                                        ],
                                        codesample_languages: [
                                            {
                                                text: "HTML/XML",
                                                value: "markup",
                                            },
                                            {
                                                text: "JavaScript",
                                                value: "javascript",
                                            },
                                            { text: "CSS", value: "css" },
                                            { text: "PHP", value: "php" },
                                            { text: "Ruby", value: "ruby" },
                                            {
                                                text: "Python",
                                                value: "python",
                                            },
                                            { text: "Java", value: "java" },
                                            { text: "C", value: "c" },
                                            { text: "C#", value: "csharp" },
                                            { text: "C++", value: "cpp" },
                                        ],
                                        toolbar:
                                            "undo redo | blocks | " +
                                            "bold italic forecolor | alignleft aligncenter " +
                                            "alignright alignjustify | bullist numlist outdent indent | " +
                                            "removeformat | help |" +
                                            "codesample " +
                                            "image",
                                        content_style:
                                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" border-t border-trueGray-700 bottom-0 fixed w-full h-16 flex ">
                        <div className="container mx-auto flex  px-2">
                            <div className="justify-start flex">
                                <div className="flex w-80 border-r border-trueGray-700">
                                    <div className="my-auto flex space-x-4">
                                        {" "}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full justify-end">
                                <Button
                                    type="primary"
                                    className="hs-btn hs-btn-primary my-auto "
                                    onClick={() => save()}
                                >
                                    Create course
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
