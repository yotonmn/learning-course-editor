import React from "react";
import CourseCard from "./courseCard";
import Link from "next/link";
import { Button } from "antd";

export default function Courses() {
    return (
        <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
            <div className="w-full py-6">
                <Link href="/builds" className="flex justify-center ">
                    <Button type="default" className="hs-btn hs-btn-default">
                        Бусад хичээлийг үзэх
                    </Button>
                </Link>
            </div>
        </div>
    );
}
