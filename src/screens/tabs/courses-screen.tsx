import { GlassCard } from "@/components/ui/GlassCard";
import { Colors, GlassStyles } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const COURSE_ROW_HEIGHT = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: GlassStyles.spacing.md,
    paddingTop: GlassStyles.spacing.md,
    paddingBottom: 120,
  },
  statsRow: {
    flexDirection: "row",
    gap: GlassStyles.spacing.md,
    marginBottom: GlassStyles.spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: GlassStyles.spacing.lg,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.7,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: GlassStyles.spacing.md,
    marginTop: GlassStyles.spacing.sm,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  achievementsScroll: {
    marginBottom: GlassStyles.spacing.lg,
  },
  achievementCard: {
    width: 120,
    alignItems: "center",
    paddingVertical: GlassStyles.spacing.lg,
    marginRight: GlassStyles.spacing.md,
  },
  achievementIcon: {
    fontSize: 40,
    marginBottom: GlassStyles.spacing.sm,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  achievementPoints: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "700",
  },
  achievementGlow: {
    position: "absolute",
    top: -10,
    left: "25%",
    width: "50%",
    height: 20,
    borderRadius: 10,
    opacity: 0.3,
  },
  courseCard: {
    marginBottom: GlassStyles.spacing.md,
    overflow: "hidden",
    padding: 0,
  },
  courseCardInner: {
    flexDirection: "row",
  },
  courseThumbnail: {
    width: 100,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  courseThumbnailIcon: {
    fontSize: 48,
  },
  courseContent: {
    flex: 1,
    padding: GlassStyles.spacing.md,
  },
  courseHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: GlassStyles.spacing.sm,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
    marginRight: GlassStyles.spacing.sm,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: GlassStyles.borderRadius.full,
    borderWidth: 1,
  },
  levelText: {
    fontSize: 11,
    fontWeight: "700",
  },
  courseInstructor: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: GlassStyles.spacing.md,
  },
  progressSection: {
    marginBottom: GlassStyles.spacing.sm,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: "700",
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: GlassStyles.borderRadius.md,
    marginTop: GlassStyles.spacing.sm,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },
});

type CourseItem = {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
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
      thumbnail: "📱",
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
      thumbnail: "📘",
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
      thumbnail: "🎨",
      lessons: 18,
      completed: 16,
      level: "Advanced",
      color: "#9B59B6",
    },
  ];

  const achievements = [
    { id: 1, title: "First Course", icon: "🎯", points: 100, color: "#DA6728" },
    { id: 2, title: "Week Warrior", icon: "🔥", points: 250, color: "#E74C3C" },
    { id: 3, title: "Perfect Week", icon: "⭐", points: 500, color: "#F1C40F" },
    { id: 4, title: "Quick Learner", icon: "⚡", points: 150, color: "#4A90E2" },
  ];

  const renderCourseCard = ({ item: course }: { item: CourseItem }) => (
    <Link href={`/(tabs)/(courses)/course/${course.id}`} asChild>
      <PressableScale>
        <GlassCard animated={false} variant="light" style={styles.courseCard}>
          <View style={styles.courseCardInner}>
            <LinearGradient
              colors={[`${course.color}30`, `${course.color}10`]}
              style={styles.courseThumbnail}
            >
              <Text style={styles.courseThumbnailIcon}>{course.thumbnail}</Text>
            </LinearGradient>
            <View style={styles.courseContent}>
              <View style={styles.courseHeader}>
                <Text
                  style={[styles.courseTitle, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {course.title}
                </Text>
                <View
                  style={[
                    styles.levelBadge,
                    {
                      backgroundColor: `${course.color}15`,
                      borderColor: `${course.color}40`,
                    },
                  ]}
                >
                  <Text style={[styles.levelText, { color: course.color }]}>
                    {course.level}
                  </Text>
                </View>
              </View>
              <Text style={[styles.courseInstructor, { color: colors.textSecondary }]}>
                {course.instructor} • {course.lessons} lessons
              </Text>
              <View style={styles.progressSection}>
                <View
                  style={[
                    styles.progressBarContainer,
                    { backgroundColor: `${course.color}20` },
                  ]}
                >
                  <LinearGradient
                    colors={[course.color, `${course.color}CC`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressBar, { width: `${course.progress}%` }]}
                  />
                </View>
                <View style={styles.progressStats}>
                  <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                    {course.completed}/{course.lessons} completed
                  </Text>
                  <Text style={[styles.progressPercent, { color: course.color }]}>
                    {course.progress}%
                  </Text>
                </View>
              </View>
              <LinearGradient
                colors={[`${course.color}20`, `${course.color}10`]}
                style={styles.continueButton}
              >
                <SymbolView
                  name="play.circle.fill"
                  size={16}
                  tintColor={course.color}
                  type="hierarchical"
                />
                <Text style={[styles.continueButtonText, { color: course.color }]}>
                  Continue Learning
                </Text>
              </LinearGradient>
            </View>
          </View>
        </GlassCard>
      </PressableScale>
    </Link>
  );

  const ListHeader = () => (
    <>
      {/* Stats Row */}
      <Animated.View entering={FadeInDown.delay(100).springify()}>
        <View style={styles.statsRow}>
          <GlassCard animated={false} variant="light" style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.primary }]}>3</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Active Courses
            </Text>
          </GlassCard>
          <GlassCard animated={false} variant="light" style={styles.statCard}>
            <Text style={[styles.statValue, { color: "#4A90E2" }]}>48</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Lessons Done
            </Text>
          </GlassCard>
        </View>
      </Animated.View>

      {/* Achievements */}
      <Animated.View entering={FadeInRight.delay(200).springify()}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievements</Text>
          <PressableScale>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>View All</Text>
          </PressableScale>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.achievementsScroll}
        >
          {achievements.map((achievement, index) => (
            <Animated.View
              key={achievement.id}
              entering={FadeInRight.delay(300 + index * 100).springify()}
            >
              <GlassCard
                animated={false}
                variant="medium"
                style={styles.achievementCard}
                showGradientBorder
              >
                <View
                  style={[
                    styles.achievementGlow,
                    { backgroundColor: achievement.color },
                  ]}
                />
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[styles.achievementTitle, { color: colors.text }]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementPoints, { color: achievement.color }]}>
                  {achievement.points} pts
                </Text>
              </GlassCard>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>

      {/* My Courses Header */}
      <Animated.View entering={FadeInRight.delay(400).springify()}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>My Courses</Text>
          <PressableScale>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
          </PressableScale>
        </View>
      </Animated.View>
    </>
  );

  return (
    <FlashList
      data={courses}
      renderItem={renderCourseCard}
      keyExtractor={(item) => item.id.toString()}
      estimatedItemSize={COURSE_ROW_HEIGHT}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={ListHeader}
      style={[styles.container, { backgroundColor: isDark ? colors.background : "#F5F0EB" }]}
      showsVerticalScrollIndicator={false}
    />
  );
}
