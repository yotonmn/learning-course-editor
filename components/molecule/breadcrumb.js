import React from "react";

export default function Breadcrumb({ courseName }) {
    return (
        <ol role="list" class="flex items-center  text-sm text-gray-600">
            <li>
                <a href="#" class="block transition hover:text-gray-700">
                    <h3 className="max-w-2xl  text-3xl font-bold leading-snug tracking-tight text-trueGray-400 lg:leading-tight lg:text-4xl ">
                        {" "}
                        Builds{" "}
                    </h3>
                </a>
            </li>

            <li>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 fill-trueGray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                    />
                </svg>
            </li>

            <li>
                <a href="#" class="block transition hover:text-gray-700">
                    <h3 className="max-w-2xl  text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl dark:text-white">
                        {courseName}
                    </h3>
                </a>
            </li>
        </ol>
    );
}
