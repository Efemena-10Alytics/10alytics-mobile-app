import { LuminaCourseDetailScreen } from "@/screens/course/lumina-course-detail-screen";
import { useLocalSearchParams } from "expo-router";

export default function CourseDetailRoute() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const courseId = Array.isArray(id) ? id[0] : id;
    if (!courseId) {
        return null;
    }
    return <LuminaCourseDetailScreen courseId={courseId} />;
}
