import React, { useEffect } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

import { Animated } from "@/tw/animated";

export interface SkeletonProps {
    className?: string;
    style?: StyleProp<ViewStyle>;
}

/**
 * Pulsing placeholder block for loading layouts. Prefer NativeWind `className` for size/radius.
 */
export function Skeleton({ className, style }: SkeletonProps) {
    const opacity = useSharedValue(0.42);

    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.85, {
                    duration: 650,
                    easing: Easing.inOut(Easing.ease),
                }),
                withTiming(0.42, {
                    duration: 650,
                    easing: Easing.inOut(Easing.ease),
                }),
            ),
            -1,
            false,
        );
    }, [opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View className={className} style={[style, animatedStyle]} />
    );
}
