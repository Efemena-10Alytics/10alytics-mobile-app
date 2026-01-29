import { CourseDetailScreen } from "@/screens/course/course-detail-screen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function CourseDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return <CourseDetailScreen courseId={id} />;
}
