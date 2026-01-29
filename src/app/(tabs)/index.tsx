import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { SymbolView } from "expo-symbols";
import React from "react";
import { PlatformColor } from "react-native";
import {
  FadeInDown,
  FadeInRight
} from "react-native-reanimated";

// const { width } = Dimensions.get("window");

export default function CoursesScreen() {

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
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: PlatformColor("systemBackground") }}
      contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16, paddingTop: 16, gap: 24 }}
    >
      {/* Stats Cards */}
      <Animated.View
        entering={FadeInDown.delay(100)}
        style={{ flexDirection: "row", gap: 12 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: PlatformColor("secondarySystemBackground"),
            borderRadius: 16,
            padding: 16,
            borderCurve: "continuous",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Text
            selectable
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: PlatformColor("label"),
              fontVariant: ["tabular-nums"],
            }}
          >
            3
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: PlatformColor("secondaryLabel"),
              marginTop: 4,
            }}
          >
            Active Courses
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: PlatformColor("secondarySystemBackground"),
            borderRadius: 16,
            padding: 16,
            borderCurve: "continuous",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Text
            selectable
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: PlatformColor("label"),
              fontVariant: ["tabular-nums"],
            }}
          >
            48
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: PlatformColor("secondaryLabel"),
              marginTop: 4,
            }}
          >
            Lessons Done
          </Text>
        </View>
      </Animated.View>

      {/* Achievements Section */}
      <Animated.View entering={FadeInRight.delay(200)}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: PlatformColor("label"),
            }}
          >
            Achievements
          </Text>
          <PressableScale>
            <Text
              style={{
                fontSize: 14,
                color: PlatformColor("systemBlue"),
              }}
            >
              View All
            </Text>
          </PressableScale>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {achievements.map((achievement, index) => (
            <Animated.View
              key={achievement.id}
              entering={FadeInRight.delay(300 + index * 100)}
            >
              <PressableScale
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                  padding: 24,
                  width: 120,
                  backgroundColor: PlatformColor("secondarySystemBackground"),
                  borderCurve: "continuous",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 36, marginBottom: 8 }}>{achievement.icon}</Text>
                <Text
                  selectable
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    textAlign: "center",
                    color: PlatformColor("label"),
                  }}
                >
                  {achievement.title}
                </Text>
                <Text
                  selectable
                  style={{
                    fontSize: 12,
                    marginTop: 4,
                    color: PlatformColor("systemBlue"),
                  }}
                >
                  {achievement.points} pts
                </Text>
              </PressableScale>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Courses Section */}
      <Animated.View entering={FadeInRight.delay(400)}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: PlatformColor("label"),
            }}
          >
            My Courses
          </Text>
          <PressableScale>
            <Text
              style={{
                fontSize: 14,
                color: PlatformColor("systemBlue"),
              }}
            >
              See All
            </Text>
          </PressableScale>
        </View>
      </Animated.View>

      {courses.map((course, index) => (
        <Animated.View
          key={course.id}
          entering={FadeInDown.delay(500 + index * 100)}
        >
          <Animated.PressableScale
            style={{
              marginBottom: 16,
              borderRadius: 16,
              overflow: "hidden",
              backgroundColor: PlatformColor("secondarySystemBackground"),
              borderCurve: "continuous",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {/* Course Thumbnail */}
              <View
                style={{
                  width: 96,
                  height: 96,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${course.color}20`,
                }}
              >
                <Text style={{ fontSize: 48 }}>{course.thumbnail}</Text>
              </View>

              {/* Course Info */}
              <View style={{ flex: 1, padding: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <Text
                    selectable
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      flex: 1,
                      color: PlatformColor("label"),
                    }}
                    numberOfLines={1}
                  >
                    {course.title}
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      backgroundColor: `${course.color}20`,
                      borderCurve: "continuous",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: course.color,
                      }}
                    >
                      {course.level}
                    </Text>
                  </View>
                </View>

                <Text
                  selectable
                  style={{
                    fontSize: 14,
                    marginBottom: 12,
                    color: PlatformColor("secondaryLabel"),
                  }}
                >
                  {course.instructor} • {course.lessons} lessons
                </Text>

                {/* Progress Bar */}
                <View style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: `${course.color}20`,
                      overflow: "hidden",
                    }}
                  >
                    <Animated.View
                      style={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: course.color,
                        width: `${course.progress}%`,
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                    <Text
                      selectable
                      style={{
                        fontSize: 12,
                        color: PlatformColor("secondaryLabel"),
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      {course.completed}/{course.lessons} completed
                    </Text>
                    <Text
                      selectable
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: course.color,
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      {course.progress}%
                    </Text>
                  </View>
                </View>

                {/* Continue Button */}
                <PressableScale
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 8,
                    paddingVertical: 8,
                    borderRadius: 12,
                    backgroundColor: `${course.color}15`,
                    borderCurve: "continuous",
                  }}
                >
                  <SymbolView
                    name="play.circle.fill"
                    size={16}
                    tintColor={course.color}
                    type="hierarchical"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: course.color,
                      marginLeft: 6,
                    }}
                  >
                    Continue Learning
                  </Text>
                </PressableScale>
              </View>
            </View>
          </Animated.PressableScale>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
