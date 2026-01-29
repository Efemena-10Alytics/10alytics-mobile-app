# React Native Performance Improvements

Based on Vercel React Native best practices analysis.

## Priority 1: List Performance (CRITICAL) 🔴

### Issue 1: Using `.map()` Instead of Virtualized Lists

**Files Affected:**

- `src/screens/tabs/courses-screen.tsx` (lines 172, 243)
- `src/screens/tabs/calendar-screen.tsx` (lines 165, 284)
- `src/screens/tabs/chat-screen.tsx` (lines 123, 230)
- `src/screens/tabs/profile-screen.tsx` (lines 113, 187)
- `src/screens/tabs/videos-screen.tsx` (lines 79, 122)

**Problem:** Rendering all list items at once causes performance issues, especially with large datasets. All items are mounted even if not visible.

**Solution:** Use `@shopify/flash-list` for better performance.

**Example Fix:**

```tsx
// Before (courses-screen.tsx)
{courses.map((course, index) => (
  <Animated.View key={course.id} entering={FadeInDown.delay(500 + index * 100)}>
    {/* Course item */}
  </Animated.View>
))}

// After
import { FlashList } from "@shopify/flash-list";

<FlashList
  data={courses}
  estimatedItemSize={200}
  renderItem={({ item: course, index }) => (
    <Animated.View entering={FadeInDown.delay(500 + index * 100)}>
      {/* Course item */}
    </Animated.View>
  )}
  keyExtractor={(course) => course.id.toString()}
/>
```

### Issue 2: No Memoization of List Items

**Problem:** List items re-render unnecessarily when parent re-renders.

**Solution:** Memoize list item components.

**Example Fix:**

```tsx
// Create a memoized CourseItem component
const CourseItem = React.memo(({ course, index }: { course: Course; index: number }) => {
  return (
    <Animated.View entering={FadeInDown.delay(500 + index * 100)}>
      {/* Course content */}
    </Animated.View>
  );
});

// Then use in FlashList
<FlashList
  data={courses}
  renderItem={({ item }) => <CourseItem course={item} />}
/>
```

### Issue 3: Inline Style Objects in Map Functions

**Problem:** Creating new style objects on every render causes unnecessary re-renders.

**Files Affected:** All screen files with `.map()` calls

**Solution:** Extract styles to StyleSheet.create or useMemo.

**Example Fix:**

```tsx
// Before
{courses.map((course) => (
  <View style={{ marginBottom: 16, borderRadius: 16 }}> // ❌ New object every render
    {/* ... */}
  </View>
))}

// After
const styles = StyleSheet.create({
  courseCard: {
    marginBottom: 16,
    borderRadius: 16,
  },
});

// Or use useMemo for dynamic styles
const courseCardStyle = useMemo(() => ({
  marginBottom: 16,
  borderRadius: 16,
  backgroundColor: course.color,
}), [course.color]);
```

### Issue 4: Callbacks Not Wrapped in useCallback

**Problem:** Callbacks recreated on every render, causing child components to re-render.

**Files Affected:** `calendar-screen.tsx` (lines 94-98, 136-140), `chat-screen.tsx` (line 80)

**Solution:** Wrap callbacks in `useCallback`.

**Example Fix:**

```tsx
// Before (calendar-screen.tsx)
<PressableScale
  onPress={() =>
    setCurrentDate(
      new Date(currentDate.setDate(currentDate.getDate() - 1))
    )
  }
>

// After
const handlePreviousDate = useCallback(() => {
  setCurrentDate((prev) => {
    const newDate = new Date(prev);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  });
}, []);

<PressableScale onPress={handlePreviousDate}>
```

## Priority 2: UI Patterns (HIGH) 🟡

### Issue 5: Using TouchableOpacity Instead of PressableScale

**Files Affected:**

- `src/components/gamification/achievement-badge.tsx` (line 119)
- `src/components/ui/collapsible.tsx` (line 16)

**Problem:** TouchableOpacity is deprecated. You already have PressableScale which is better.

**Solution:** Replace TouchableOpacity with PressableScale.

**Example Fix:**

```tsx
// Before (achievement-badge.tsx)
import { TouchableOpacity } from "react-native";

if (onPress) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {content}
    </TouchableOpacity>
  );
}

// After
import { PressableScale } from "@/tw";

if (onPress) {
  return (
    <PressableScale onPress={onPress}>
      {content}
    </PressableScale>
  );
}
```

### Issue 6: Inline Style Objects Throughout Codebase

**Problem:** Many inline style objects create new objects on every render.

**Files Affected:** All screen files

**Solution:** Extract to StyleSheet.create or useMemo for dynamic styles.

**Example Fix:**

```tsx
// Before
<View style={{ flexDirection: "row", alignItems: "center" }}>

// After
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

<View style={styles.row}>
```

## Priority 3: Animation (HIGH) 🟡

### Issue 7: Progress Ring Animation Could Use useDerivedValue

**File:** `src/components/gamification/progress-ring.tsx`

**Problem:** Using `withTiming` inside `useAnimatedProps` can be optimized.

**Current Code (lines 41-46):**

```tsx
const animatedProps = useAnimatedProps(() => {
  const strokeDashoffset = circumference * (1 - progressValue.value);
  return {
    strokeDashoffset: withTiming(strokeDashoffset, { duration: 1000 }),
  };
});
```

**Solution:** Consider using `useDerivedValue` for computed animations, though current implementation is acceptable.

## Priority 4: State Management (MEDIUM) 🟢

### Issue 8: Missing useMemo for Filtered/Computed Data

**Files Affected:**

- `calendar-screen.tsx` (lines 60-66)

**Problem:** Filtering arrays on every render.

**Solution:** Memoize filtered results.

**Example Fix:**

```tsx
// Before
const todayEvents = events.filter(
  (event) => event.date === currentDate.toISOString().split("T")[0]
);

// After
const todayEvents = useMemo(() => {
  return events.filter(
    (event) => event.date === currentDate.toISOString().split("T")[0]
  );
}, [events, currentDate]);
```

### Issue 9: Date Mutation in Calendar Screen

**File:** `calendar-screen.tsx` (lines 94-98, 136-140)

**Problem:** Mutating date object directly can cause issues.

**Current Code:**

```tsx
setCurrentDate(
  new Date(currentDate.setDate(currentDate.getDate() - 1))
)
```

**Solution:** Create new date without mutation.

**Fix:**

```tsx
setCurrentDate((prev) => {
  const newDate = new Date(prev);
  newDate.setDate(newDate.getDate() - 1);
  return newDate;
});
```

## Priority 5: Rendering (MEDIUM) 🟢

### Issue 10: Conditional Rendering with Falsy Values

**File:** `calendar-screen.tsx` (line 153)

**Problem:** Using `&&` with falsy values can render `0` or `false`.

**Current Code:**

```tsx
{todayEvents.length > 0 && (
  <Animated.View>
    {/* ... */}
  </Animated.View>
)}
```

**Solution:** This is actually fine, but could be more explicit.

**Better Pattern:**

```tsx
{todayEvents.length > 0 ? (
  <Animated.View>
    {/* ... */}
  </Animated.View>
) : null}
```

## Summary of Actions Needed

### Critical (Do First)

1. ✅ Replace `.map()` with FlashList in all screen files
2. ✅ Memoize list item components
3. ✅ Extract inline styles to StyleSheet.create

### High Priority

4. ✅ Replace TouchableOpacity with PressableScale
2. ✅ Wrap callbacks in useCallback
3. ✅ Fix date mutation in calendar screen

### Medium Priority

7. ✅ Memoize filtered/computed arrays
2. ✅ Optimize animation patterns where beneficial

## Good Practices Already Implemented ✅

1. ✅ Using `expo-image` for images
2. ✅ Using `PressableScale` in most places
3. ✅ Using Reanimated for animations
4. ✅ Animating transform/opacity properties
5. ✅ Using native tabs (NativeTabs)
6. ✅ Proper Text component usage
7. ✅ Using ScrollView with contentInsetAdjustmentBehavior

## Next Steps

1. Install FlashList: `npm install @shopify/flash-list`
2. Start with courses-screen.tsx as it has the most list items
3. Create memoized item components
4. Extract inline styles to StyleSheet
5. Replace remaining TouchableOpacity instances
