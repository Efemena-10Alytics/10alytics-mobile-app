import type { UserCourseDetailCourse, UserCourseDetailInnerData } from "@/lib/api-client";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function coerceLessonPointerId(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v) && v > 0) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return null;
}

function normalizeInner(inner: Record<string, unknown>): UserCourseDetailInnerData | null {
  const courseUnknown = inner.course;
  if (!isRecord(courseUnknown)) return null;

  const progress = inner.progress_percentage;
  const progressNum =
    typeof progress === "number" && Number.isFinite(progress)
      ? progress
      : Number(progress) || 0;

  const current_week_video_id =
    coerceLessonPointerId(inner.current_week_video_id) ??
    coerceLessonPointerId(inner.current_week_video);

  return {
    course: courseUnknown as unknown as UserCourseDetailCourse,
    progress_percentage: progressNum,
    ...(current_week_video_id != null ? { current_week_video_id } : {}),
  };
}

/**
 * Normalizes JSON from GET /api/v2/user/course/:enrollmentId after `request()` unwraps to the body.
 * Handles `{ data: { course, progress } }`, double-wrapped `data.data`, or a bare `{ course, progress }`.
 */
export function parseUserCourseDetailBundle(
  raw: unknown,
): UserCourseDetailInnerData | null {
  if (!isRecord(raw)) return null;

  if (isRecord(raw.course)) {
    return normalizeInner(raw);
  }

  const first = raw.data;
  if (!isRecord(first)) return null;

  let inner: Record<string, unknown> = first;
  if (isRecord(inner.data) && "course" in inner.data) {
    inner = inner.data as Record<string, unknown>;
  }

  return normalizeInner(inner);
}
