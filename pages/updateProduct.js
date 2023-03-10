import React from 'react';
import Navbar from '@components/navbar';
import { useProducts } from '@lib/hooks';
import { Space, Button, Modal } from 'antd';
import { priceT } from '@lib/utils';
import { useState } from 'react';

export default function UpdateProduct() {
    const { data: products } = useProducts();
    const [editModal, setEditModal] = useState(false);
    return (
        <div className="bg-trueGray-900 h-screen overflow-clip">
            <Navbar />
            <div className=" mx-auto pt-16  ">
                <div className="min-h-screen ">
                    <h5 className="pt-3 text-center">Token багц шинэчлэх</h5>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 h-full">
                        {products?.data?.data?.rows.map((product) => (
                            <div key={product.id} className="group">
                                <div
                                    className="rounded-2xl shadow-md bg-trueGray-800 text-gray-100 group-hover:scale-102 transform
                                        transition duration-300 "
                                >
                                    <h5 className="text-xl font-semibold tracking-wide pt-6 px-6 pb-3  text-center border-b border-trueGray-700">
                                        {/* {title} */}

                                        <Space className="justify-center">
                                            <img
                                                src="/monk.jpg"
                                                alt="N"
                                                width="24"
                                                height="24"
                                                className="w-8 align-middle rounded-full"
                                            />
                                            <div>{product?.amount} $MONK</div>
                                        </Space>
                                    </h5>

                                    <div className="flex flex-col justify-center p-6 space-y-4 ">
                                        {product?.price == 120000 ||
                                        product?.price == 600000 ? (
                                            <Space className="justify-center">
                                                <h2 className="text-center text-primary text-2xl font-medium ">
                                                    {priceT(product?.price)}₮
                                                </h2>
                                                {product?.price == 120000 && (
                                                    <h3 className="text-gray-300 line-through">
                                                        {priceT(150000)}₮
                                                    </h3>
                                                )}
                                                {product?.price == 600000 && (
                                                    <h3 className="text-gray-300 line-through">
                                                        {priceT(1000000)}₮
                                                    </h3>
                                                )}
                                            </Space>
                                        ) : (
                                            <h2 className="text-center text-2xl font-medium ">
                                                {priceT(product?.price)}₮
                                            </h2>
                                        )}
                                        <Button
                                            type="primary"
                                            className="hs-btn-primary hs-btn"
                                            onClick={() => handleEdit(product)}
                                            // loading={product.id == loadingCard}
                                        >
                                            Засах
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                className="hs-modal"
                footer={null}
                open={editModal}
                onCancel={() => setEditModal(false)}
                // afterClose={handleModalAfterClose}
            >
                <div className="hs-modal-head">
                    <h3 className=" mb-3 text-3xl font-bold text-center leading-snug tracking-tight  lg:leading-tight lg:text-4xl text-white">
                        $MONK худалдаж авах
                    </h3>
                </div>
            </Modal>
        </div>
    );
}
