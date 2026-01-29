import { PressableScale, ScrollView, Text, View } from "@/tw";
import { SymbolView } from "expo-symbols";
import React from "react";
import { PlatformColor } from "react-native";

interface CourseDetailScreenProps {
  courseId: string;
  title?: string;
  instructor?: string;
  progress?: number;
  lessons?: number;
  level?: string;
  color?: string;
}

export function CourseDetailScreen({
  courseId,
  title = "Course",
  instructor = "Instructor",
  progress = 0,
  lessons = 0,
  level = "Beginner",
  color = "#DA6728",
}: CourseDetailScreenProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: PlatformColor("systemBackground") }}
      contentContainerStyle={{
        paddingBottom: 32,
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 24,
      }}
    >
      <View
        style={{
          height: 160,
          borderRadius: 16,
          backgroundColor: `${color}20`,
          alignItems: "center",
          justifyContent: "center",
          borderCurve: "continuous",
        }}
      >
        <Text style={{ fontSize: 64 }}>📚</Text>
        <Text
          selectable
          style={{
            fontSize: 14,
            marginTop: 8,
            color: PlatformColor("secondaryLabel"),
          }}
        >
          {title}
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <Text
          selectable
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: PlatformColor("label"),
          }}
        >
          {title}
        </Text>
        <Text
          selectable
          style={{
            fontSize: 15,
            color: PlatformColor("secondaryLabel"),
          }}
        >
          {instructor} • {lessons} lessons • {level}
        </Text>
      </View>

      {progress > 0 && (
        <View
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: PlatformColor("secondarySystemBackground"),
            borderCurve: "continuous",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: PlatformColor("label"),
              }}
            >
              Your progress
            </Text>
            <Text
              selectable
              style={{
                fontSize: 14,
                fontWeight: "600",
                color,
                fontVariant: ["tabular-nums"],
              }}
            >
              {progress}%
            </Text>
          </View>
          <View
            style={{
              height: 8,
              borderRadius: 4,
              backgroundColor: `${color}20`,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: color,
                width: `${progress}%`,
              }}
            />
          </View>
        </View>
      )}

      <PressableScale
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 14,
          borderRadius: 12,
          backgroundColor: color,
          borderCurve: "continuous",
          gap: 8,
        }}
      >
        <SymbolView name="play.circle.fill" size={20} tintColor="#fff" type="hierarchical" />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            color: "#fff",
          }}
        >
          {progress > 0 ? "Continue Learning" : "Start Course"}
        </Text>
      </PressableScale>

      <Text
        selectable
        style={{
          fontSize: 15,
          color: PlatformColor("secondaryLabel"),
          lineHeight: 22,
        }}
      >
        Course ID: {courseId}. Syllabus, materials, and quizzes will be loaded from the API.
      </Text>
    </ScrollView>
  );
}
