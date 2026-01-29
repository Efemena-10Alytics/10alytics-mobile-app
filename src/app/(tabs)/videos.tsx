import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { SymbolView } from "expo-symbols";
import React, { useState } from "react";
import { PlatformColor } from "react-native";
import {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";

// const { width } = Dimensions.get("window");

export default function VideosScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "React", "TypeScript", "Design", "Mobile"];

  const videos = [
    {
      id: 1,
      title: "React Native Navigation Deep Dive",
      instructor: "John Doe",
      duration: "24:30",
      thumbnail: "🎥",
      views: "12.5K",
      progress: 65,
      category: "React",
      watched: true,
    },
    {
      id: 2,
      title: "TypeScript Advanced Patterns",
      instructor: "Jane Smith",
      duration: "18:45",
      thumbnail: "📹",
      views: "8.2K",
      progress: 0,
      category: "TypeScript",
      watched: false,
    },
    {
      id: 3,
      title: "UI Animation Masterclass",
      instructor: "Alex Johnson",
      duration: "32:15",
      thumbnail: "🎬",
      views: "15.3K",
      progress: 100,
      category: "Design",
      watched: true,
    },
    {
      id: 4,
      title: "Expo Router Complete Guide",
      instructor: "John Doe",
      duration: "28:20",
      thumbnail: "📺",
      views: "9.7K",
      progress: 45,
      category: "Mobile",
      watched: false,
    },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: PlatformColor("systemBackground") }}
      contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16, paddingTop: 16, gap: 24 }}
    >
      {/* Categories */}
      <Animated.View entering={FadeInRight.delay(100)}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {categories.map((category, index) => (
            <Animated.View
              key={category}
              entering={FadeInRight.delay(200 + index * 50)}
            >
              <PressableScale
                onPress={() => setSelectedCategory(category)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 8,
                  backgroundColor:
                    selectedCategory === category
                      ? PlatformColor("systemBlue")
                      : PlatformColor("secondarySystemBackground"),
                  borderCurve: "continuous",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color:
                      selectedCategory === category
                        ? PlatformColor("label")
                        : PlatformColor("systemBlue"),
                  }}
                >
                  {category}
                </Text>
              </PressableScale>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Video List */}
      {videos
        .filter(
          (video) =>
            selectedCategory === "All" || video.category === selectedCategory
        )
        .map((video, index) => (
          <Animated.View
            key={video.id}
            entering={FadeInDown.delay(300 + index * 100)}
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
              {/* Video Thumbnail */}
              <View
                style={{
                  width: "100%",
                  height: 192,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  backgroundColor: PlatformColor("tertiarySystemBackground"),
                }}
              >
                <Text style={{ fontSize: 64 }}>{video.thumbnail}</Text>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0,0,0,0.6)",
                    }}
                  >
                    <SymbolView
                      name="play.circle.fill"
                      size={32}
                      tintColor={PlatformColor("label")}
                      type="hierarchical"
                    />
                  </View>
                </View>
                {video.progress > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      backgroundColor: "rgba(0,0,0,0.2)",
                    }}
                  >
                    <View
                      style={{
                        height: 4,
                        width: `${video.progress}%`,
                        backgroundColor: PlatformColor("systemBlue"),
                      }}
                    />
                  </View>
                )}
                {video.watched && (
                  <View
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      backgroundColor: PlatformColor("systemBlue"),
                      borderCurve: "continuous",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: PlatformColor("label"),
                      }}
                    >
                      Watched
                    </Text>
                  </View>
                )}
              </View>

              {/* Video Info */}
              <View style={{ padding: 16 }}>
                <Text
                  selectable
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    marginBottom: 8,
                    color: PlatformColor("label"),
                  }}
                >
                  {video.title}
                </Text>
                <Text
                  selectable
                  style={{
                    fontSize: 14,
                    marginBottom: 12,
                    color: PlatformColor("secondaryLabel"),
                  }}
                >
                  {video.instructor}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <SymbolView
                        name="clock.fill"
                        size={14}
                        tintColor={PlatformColor("secondaryLabel")}
                        type="hierarchical"
                      />
                      <Text
                        selectable
                        style={{
                          fontSize: 12,
                          marginLeft: 4,
                          color: PlatformColor("secondaryLabel"),
                        }}
                      >
                        {video.duration}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <SymbolView
                        name="eye.fill"
                        size={14}
                        tintColor={PlatformColor("secondaryLabel")}
                        type="hierarchical"
                      />
                      <Text
                        selectable
                        style={{
                          fontSize: 12,
                          marginLeft: 4,
                          color: PlatformColor("secondaryLabel"),
                          fontVariant: ["tabular-nums"],
                        }}
                      >
                        {video.views} views
                      </Text>
                    </View>
                  </View>

                  {video.progress > 0 && (
                    <Text
                      selectable
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: PlatformColor("systemBlue"),
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      {video.progress}% complete
                    </Text>
                  )}
                </View>
              </View>
            </Animated.PressableScale>
          </Animated.View>
        ))}
    </ScrollView>
  );
}
