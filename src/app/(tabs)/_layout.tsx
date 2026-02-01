import { Colors } from "@/constants/theme";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { DynamicColorIOS } from "react-native";

export default function TabLayout() {
  return (
    <NativeTabs
      labelStyle={{
        color: DynamicColorIOS({
          dark: Colors.dark.text,
          light: Colors.light.text,
        }),
      }}
      tintColor={DynamicColorIOS({
        dark: Colors.dark.tint,
        light: Colors.light.tint,
      })}
    >
      <NativeTabs.Trigger name="index">
        <Icon sf="square.grid.2x2" drawable="" />
        <Label>Dashboard</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(courses)">
        <Icon sf="book.closed" drawable="" />
        <Label>Courses</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="calendar">
        <Icon sf="calendar" drawable="" />
        <Label>Classes</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="chat">
        <Icon sf="message" drawable="" />
        <Label>Chat</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf="person.circle" drawable="" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
