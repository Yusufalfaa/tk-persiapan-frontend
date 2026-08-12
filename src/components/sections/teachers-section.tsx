import { getTeachers } from "@/services/teacher.service";
import TeachersCarousel from "../teachers/TeacherCarousel";


export default async function TeachersSection() {
    const response = await getTeachers();

    return (
        <section id="teachers" className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="text-center text-3xl font-bold">
                    Guru Kami
                </h2>

                <TeachersCarousel
                    teachers={response.data}
                />
            </div>
        </section>
    );
}