import React from 'react';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
    Button,
    Modal,
    Space,
    Form,
    Input,
    notification,
    Select,
    Option,
    Switch,
} from 'antd';
import Link from 'next/link';
import {
    createCourse,
    useCoursesByCategory,
    getCoursesByCategory,
    createProduct,
} from '@lib/service';
import { useRouter } from 'next/router';
import { Editor } from '@tinymce/tinymce-react';

export default function CreateCourse() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [subDesc, setSubDesc] = useState('');
    const [headerImageUrl, setHeaderImageUrl] = useState('');
    const [headerBannerUrl, setHeaderBannerUrl] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [paid, setPaid] = useState(false);

    const router = useRouter();
    const editorRef = useRef(null);

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setPaid(checked);
    };

    const save = async () => {
        var jsonData;
        if (amount == 0 && price == 0) {
            openNotificationWithIcon('error', 'Enter price!');
        }

        jsonData = {
            name: title,
            description: subDesc,
            price,
            amount,
            productCollectionId: 1,
        };

        const { data, status } = await createProduct(jsonData);
        console.log('🚀 ~ file: createCourse.js:70 ~ save ~ status', status);
        console.log('🚀 ~ file: createCourse.js:70 ~ save ~ data', data);

        // console.log("🚀 ~ file: createCourse.js:100 ~ save ~ dataNew", dataNew);
        if (status === 200) {
            openNotificationWithIcon('success', 'Successfully created course!');
            // jumpToLatestCourse(data.courseId);
            // setEmailSent(true);
            // setLoading(false);
        } else {
            openNotificationWithIcon(
                'error',
                data?.message || 'Failed to create course!'
            );
            // setLoading(false);
        }
    };

    const jumpToLatestCourse = async (id) => {
        router.push({
            pathname: '/builds/[id]',
            query: {
                id,
            },
        });
    };

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === 'success' ? 'success' : 'error',
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
                                {/* <Link href="/createCourse"> */}
                                <h5 className="pt-3">Token багц үүсгэх</h5>
                                {/* </Link> */}
                            </div>
                            <div className="w-full p-8">
                                <input
                                    className="hs-input w-full"
                                    type="text"
                                    placeholder="Гарчиг"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />

                                <input
                                    className="hs-input my-3 w-full"
                                    type="text"
                                    placeholder="Богино тайлбар"
                                    value={subDesc}
                                    onChange={(e) => setSubDesc(e.target.value)}
                                />
                                <input
                                    className="hs-input my-3 w-full"
                                    type="number"
                                    placeholder="Үнэ"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <input
                                    className="hs-input my-3 w-full"
                                    type="number"
                                    placeholder="Токены хэмжээ"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" border-t border-trueGray-700 bottom-0 fixed w-full h-16 flex ">
                        <div className="container mx-auto flex  px-2">
                            <div className="justify-start flex">
                                <div className="flex w-80 border-r border-trueGray-700">
                                    <div className="my-auto flex space-x-4">
                                        {' '}
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
