import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PlayCircle } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CoursesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Animation values for future use
  // const progress1 = useSharedValue(0);
  // const progress2 = useSharedValue(0);
  // const progress3 = useSharedValue(0);

  // React.useEffect(() => {
  //   progress1.value = withSpring(0.75); // 75% progress
  //   progress2.value = withSpring(0.45); // 45% progress
  //   progress3.value = withSpring(0.9); // 90% progress
  // }, [progress1, progress2, progress3]);

  const courses = [
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
    { id: 1, title: "First Course", icon: "🎯", points: 100 },
    { id: 2, title: "Week Warrior", icon: "🔥", points: 250 },
    { id: 3, title: "Perfect Week", icon: "⭐", points: 500 },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`]}
          className="pt-16 pb-8 px-6 rounded-b-3xl"
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <Text
              className="text-3xl font-bold mb-2"
              style={{ color: "#FFFFFF" }}
            >
              My Learning
            </Text>
            <Text className="text-base opacity-90" style={{ color: "#FFFFFF" }}>
              Continue your journey to mastery
            </Text>
          </Animated.View>

          {/* Stats Cards */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="flex-row mt-6 gap-3"
          >
            <View
              className="flex-1 bg-white/20 rounded-2xl p-4 backdrop-blur"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Text className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                3
              </Text>
              <Text className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>
                Active Courses
              </Text>
            </View>
            <View
              className="flex-1 bg-white/20 rounded-2xl p-4"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Text className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                48
              </Text>
              <Text className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>
                Lessons Done
              </Text>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Achievements Section */}
        <View className="px-6 mt-6">
          <Animated.View entering={FadeInRight.delay(300)}>
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className="text-xl font-bold"
                style={{ color: colors.text }}
              >
                Achievements
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-sm"
                  style={{ color: colors.primary }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="gap-3"
            >
              {achievements.map((achievement, index) => (
                <Animated.View
                  key={achievement.id}
                  entering={FadeInRight.delay(400 + index * 100)}
                >
                  <TouchableOpacity
                    className="items-center justify-center rounded-2xl p-6 mr-3"
                    style={{
                      backgroundColor: colors.background,
                      width: 120,
                      shadowColor: colors.primary,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <Text className="text-4xl mb-2">{achievement.icon}</Text>
                    <Text
                      className="text-sm font-semibold text-center"
                      style={{ color: colors.text }}
                    >
                      {achievement.title}
                    </Text>
                    <Text
                      className="text-xs mt-1"
                      style={{ color: colors.primary }}
                    >
                      {achievement.points} pts
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </ScrollView>
          </Animated.View>
        </View>

        {/* Courses Section */}
        <View className="px-6 mt-6">
          <Animated.View entering={FadeInRight.delay(500)}>
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className="text-xl font-bold"
                style={{ color: colors.text }}
              >
                My Courses
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-sm"
                  style={{ color: colors.primary }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {courses.map((course, index) => (
            <Animated.View
              key={course.id}
              entering={FadeInDown.delay(600 + index * 100)}
            >
              <AnimatedTouchable
                className="mb-4 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: colors.background,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View className="flex-row">
                  {/* Course Thumbnail */}
                  <View
                    className="w-24 h-24 items-center justify-center"
                    style={{ backgroundColor: `${course.color}20` }}
                  >
                    <Text className="text-5xl">{course.thumbnail}</Text>
                  </View>

                  {/* Course Info */}
                  <View className="flex-1 p-4">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text
                        className="text-base font-bold flex-1"
                        style={{ color: colors.text }}
                        numberOfLines={1}
                      >
                        {course.title}
                      </Text>
                      <View
                        className="px-2 py-1 rounded-full"
                        style={{ backgroundColor: `${course.color}20` }}
                      >
                        <Text
                          className="text-xs font-semibold"
                          style={{ color: course.color }}
                        >
                          {course.level}
                        </Text>
                      </View>
                    </View>

                    <Text
                      className="text-sm mb-3"
                      style={{ color: colors.icon }}
                    >
                      {course.instructor} • {course.lessons} lessons
                    </Text>

                    {/* Progress Bar */}
                    <View className="mb-2">
                      <View
                        className="h-2 rounded-full"
                        style={{ backgroundColor: `${course.color}20` }}
                      >
                        <Animated.View
                          className="h-2 rounded-full"
                          style={{
                            backgroundColor: course.color,
                            width: `${course.progress}%`,
                          }}
                        />
                      </View>
                      <View className="flex-row items-center justify-between mt-1">
                        <Text
                          className="text-xs"
                          style={{ color: colors.icon }}
                        >
                          {course.completed}/{course.lessons} completed
                        </Text>
                        <Text
                          className="text-xs font-semibold"
                          style={{ color: course.color }}
                        >
                          {course.progress}%
                        </Text>
                      </View>
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity
                      className="flex-row items-center justify-center mt-2 py-2 rounded-xl"
                      style={{ backgroundColor: `${course.color}15` }}
                    >
                      <PlayCircle
                        size={16}
                        color={course.color}
                        style={{ marginRight: 6 }}
                      />
                      <Text
                        className="text-sm font-semibold"
                        style={{ color: course.color }}
                      >
                        Continue Learning
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </AnimatedTouchable>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
