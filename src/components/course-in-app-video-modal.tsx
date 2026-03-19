import { useEvent } from "expo";
import * as WebBrowser from "expo-web-browser";
import { useVideoPlayer, VideoView } from "expo-video";
import { X } from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Pressable, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useVimeoPlayer, VimeoView } from "react-native-vimeo-bridge";

import { parseVideoUrl } from "@/utils/video-platform";
import { resolveMediaUrl } from "@/utils/resolve-media-url";

function isLikelyDirectVideoUrl(url: string): boolean {
    const path = url.toLowerCase().split("?")[0] ?? "";
    return /\.(mp4|m3u8|webm|mov)$/i.test(path);
}

function YoutubeExpoPlayer({
    embedUrl,
    openUrl,
}: {
    embedUrl: string;
    openUrl: string;
}) {
    const [failed, setFailed] = useState(false);
    const player = useVideoPlayer(embedUrl, (p) => {
        p.loop = false;
    });
    const payload = useEvent(player, "statusChange", { status: player.status });
    const status = payload?.status ?? player.status;

    useEffect(() => {
        if (status === "error") setFailed(true);
    }, [status]);

    if (failed) {
        return (
            <View className="flex-1 items-center justify-center gap-4 px-6">
                <Text className="text-center text-base text-neutral-200">
                    This video could not be played in the app.
                </Text>
                <Pressable
                    accessibilityRole="button"
                    className="rounded-xl bg-white/15 px-5 py-3 active:opacity-80"
                    onPress={() => void WebBrowser.openBrowserAsync(openUrl)}
                >
                    <Text className="text-center font-medium text-white">
                        Open in browser
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <VideoView
            className="flex-1 w-full"
            contentFit="contain"
            nativeControls
            player={player}
        />
    );
}

function VimeoBridgePlayer({
    playerUrl,
    width,
    height,
}: {
    playerUrl: string;
    width: number;
    height: number;
}) {
    const player = useVimeoPlayer(playerUrl);
    return (
        <VimeoView
            height={height}
            player={player}
            style={{ alignSelf: "center" }}
            width={width}
        />
    );
}

function DirectExpoPlayer({ url }: { url: string }) {
    const player = useVideoPlayer(url, (p) => {
        p.loop = false;
        p.play();
    });
    return (
        <VideoView
            className="flex-1 w-full"
            contentFit="contain"
            nativeControls
            player={player}
        />
    );
}

export interface CourseInAppVideoModalProps {
    visible: boolean;
    rawUrl: string | null;
    onClose: () => void;
}

export function CourseInAppVideoModal({
    visible,
    rawUrl,
    onClose,
}: CourseInAppVideoModalProps) {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const playerHeight = Math.round((width * 9) / 16);

    const absoluteUrl = useMemo(() => {
        if (!rawUrl?.trim()) return null;
        const t = rawUrl.trim();
        if (/^https?:\/\//i.test(t)) return t;
        return resolveMediaUrl(t) ?? null;
    }, [rawUrl]);

    const parsed = useMemo(
        () => (absoluteUrl ? parseVideoUrl(absoluteUrl) : null),
        [absoluteUrl],
    );

    const openInBrowser = useCallback(() => {
        const url = parsed?.openUrl ?? absoluteUrl;
        if (url) void WebBrowser.openBrowserAsync(url);
    }, [absoluteUrl, parsed?.openUrl]);

    if (!visible) return null;

    return (
        <Modal
            animationType="fade"
            onRequestClose={onClose}
            presentationStyle="fullScreen"
            statusBarTranslucent
            visible
        >
            <View
                className="flex-1 bg-black"
                style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
            >
                <View
                    className="absolute right-3 z-10 flex-row items-center gap-2"
                    style={{ top: insets.top + 8 }}
                >
                    <Pressable
                        accessibilityLabel="Close video"
                        accessibilityRole="button"
                        className="rounded-full bg-white/20 p-2 active:opacity-70"
                        hitSlop={12}
                        onPress={onClose}
                    >
                        <X color="#fff" size={22} />
                    </Pressable>
                </View>

                <View className="mt-12 flex-1 justify-center px-0">
                    {!absoluteUrl ? (
                        <Text className="px-6 text-center text-neutral-300">
                            Invalid video link.
                        </Text>
                    ) : parsed?.provider === "youtube" && parsed.embedUrl ? (
                        <YoutubeExpoPlayer
                            embedUrl={parsed.embedUrl}
                            openUrl={parsed.openUrl}
                        />
                    ) : parsed?.provider === "vimeo" && parsed.embedUrl ? (
                        <VimeoBridgePlayer
                            height={playerHeight}
                            playerUrl={parsed.embedUrl}
                            width={width}
                        />
                    ) : parsed?.provider === "unknown" &&
                      isLikelyDirectVideoUrl(parsed.openUrl) ? (
                        <DirectExpoPlayer url={parsed.openUrl} />
                    ) : (
                        <View className="flex-1 items-center justify-center gap-4 px-6">
                            <Text className="text-center text-base text-neutral-200">
                                Open this link in your browser to watch.
                            </Text>
                            <Pressable
                                accessibilityRole="button"
                                className="rounded-xl bg-white/15 px-5 py-3 active:opacity-80"
                                onPress={openInBrowser}
                            >
                                <Text className="text-center font-medium text-white">
                                    Open in browser
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}
