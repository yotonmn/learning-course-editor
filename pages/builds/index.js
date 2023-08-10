import React from 'react';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import Courses from '@components/courses';
import CourseCard from '@components/courseCard';

export default function Builds(props) {
    const data = props.lessons;

    return (
        <div className="bg-trueGray-900 ">
            <div className="container mx-auto ">
                <Navbar />
                <div className="pt-16 pb-8">
                    <h2 className=" mb-3 text-3xl font-bold leading-snug tracking-tight  lg:leading-tight lg:text-4xl text-white">
                        What&apos;s next to build
                    </h2>
                </div>
                <div className="min-h-screen">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 h-full">
                        {data &&
                            data?.map((course) => (
                                <CourseCard key={course.id} data={course} />
                            ))}
                        {/* <CourseCard />
                        <CourseCard />
                        <CourseCard /> */}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
