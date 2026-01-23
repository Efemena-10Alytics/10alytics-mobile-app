import React, { useState } from "react";
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
} from "react-native-reanimated";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PlayCircle, Clock, BookOpen } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function VideosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
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
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`]}
          className="pt-16 pb-6 px-6 rounded-b-3xl"
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <Text
              className="text-3xl font-bold mb-2"
              style={{ color: "#FFFFFF" }}
            >
              Video Library
            </Text>
            <Text className="text-base opacity-90" style={{ color: "#FFFFFF" }}>
              Learn at your own pace
            </Text>
          </Animated.View>
        </LinearGradient>

        {/* Categories */}
        <View className="px-6 mt-6">
          <Animated.View entering={FadeInRight.delay(200)}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="gap-3"
            >
              {categories.map((category, index) => (
                <Animated.View
                  key={category}
                  entering={FadeInRight.delay(300 + index * 50)}
                >
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(category)}
                    className="px-4 py-2 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        selectedCategory === category
                          ? colors.primary
                          : `${colors.primary}15`,
                    }}
                  >
                    <Text
                      className="text-sm font-semibold"
                      style={{
                        color:
                          selectedCategory === category
                            ? "#FFFFFF"
                            : colors.primary,
                      }}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </ScrollView>
          </Animated.View>
        </View>

        {/* Video List */}
        <View className="px-6 mt-6">
          {videos
            .filter(
              (video) =>
                selectedCategory === "All" || video.category === selectedCategory
            )
            .map((video, index) => (
              <Animated.View
                key={video.id}
                entering={FadeInDown.delay(400 + index * 100)}
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
                  {/* Video Thumbnail */}
                  <View
                    className="w-full h-48 items-center justify-center relative"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Text className="text-6xl">{video.thumbnail}</Text>
                    <View className="absolute inset-0 items-center justify-center">
                      <View
                        className="w-16 h-16 rounded-full items-center justify-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                      >
                        <PlayCircle size={32} color="#FFFFFF" />
                      </View>
                    </View>
                    {video.progress > 0 && (
                      <View className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                        <View
                          className="h-1"
                          style={{
                            width: `${video.progress}%`,
                            backgroundColor: colors.primary,
                          }}
                        />
                      </View>
                    )}
                    {video.watched && (
                      <View
                        className="absolute top-2 right-2 px-2 py-1 rounded-full"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Text className="text-xs font-semibold text-white">
                          Watched
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Video Info */}
                  <View className="p-4">
                    <Text
                      className="text-lg font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      {video.title}
                    </Text>
                    <Text
                      className="text-sm mb-3"
                      style={{ color: colors.icon }}
                    >
                      {video.instructor}
                    </Text>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-4">
                        <View className="flex-row items-center">
                          <Clock size={14} color={colors.icon} />
                          <Text
                            className="text-xs ml-1"
                            style={{ color: colors.icon }}
                          >
                            {video.duration}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <BookOpen size={14} color={colors.icon} />
                          <Text
                            className="text-xs ml-1"
                            style={{ color: colors.icon }}
                          >
                            {video.views} views
                          </Text>
                        </View>
                      </View>

                      {video.progress > 0 && (
                        <Text
                          className="text-xs font-semibold"
                          style={{ color: colors.primary }}
                        >
                          {video.progress}% complete
                        </Text>
                      )}
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
