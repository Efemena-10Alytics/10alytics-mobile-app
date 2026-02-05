import JournalCard from "@/components/JournalCard";
import { Colors, GlassStyles } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: GlassStyles.spacing.md,
    paddingTop: GlassStyles.spacing.xs,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: GlassStyles.spacing.sm,
    marginTop: GlassStyles.spacing.xs,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
});

type CourseItem = {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  image: any;
  lessons: number;
  completed: number;
  level: string;
  color: string;
};

export function CoursesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const courses: CourseItem[] = [
    {
      id: 1,
      title: "React Native Fundamentals",
      instructor: "John Doe",
      progress: 75,
      image: require("@/assets/courses/fsds.webp"),
      lessons: 24,
      completed: 18,
      level: "Beginner",
      color: "#DA6728",
    },
    {
      id: 2,
      title: "Advanced TypeScript",
      instructor: "Jane Smith",
      progress: 45,
      image: require("@/assets/courses/devops.webp"),
      lessons: 32,
      completed: 14,
      level: "Intermediate",
      color: "#4A90E2",
    },
    {
      id: 3,
      title: "UI/UX Design Mastery",
      instructor: "Alex Johnson",
      progress: 90,
      image: require("@/assets/courses/product-design.webp"),
      lessons: 18,
      completed: 16,
      level: "Advanced",
      color: "#9B59B6",
    },
  ];

  const renderCourseCard = ({ item: course }: { item: CourseItem }) => (
    <JournalCard
      title={course.title}
      description={`${course.instructor} • ${course.lessons} lessons`}
      date={course.level}
      progress={course.progress}
      actionLabel={course.progress > 0 ? "Continue" : "Start"}
      image={course.image}
      onPress={() =>
        router.push({ pathname: "/course-details", params: { id: course.id } })
      }
    />
  );

  const ListHeader = () => (
    <Animated.View entering={FadeInRight.delay(100).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>My Courses</Text>
      </View>
    </Animated.View>
  );

  return (
    <FlatList
      data={courses}
      renderItem={renderCourseCard}
      keyExtractor={(item) => item.id.toString()}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={ListHeader}
      style={[styles.container, { backgroundColor: isDark ? colors.background : "#F5F0EB" }]}
      showsVerticalScrollIndicator={false}
    />
  );
}
