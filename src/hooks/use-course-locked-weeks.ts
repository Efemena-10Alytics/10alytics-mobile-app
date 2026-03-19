import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";

export function courseLockedWeeksQueryKey(enrollmentId: number) {
  return ["user", "course", enrollmentId, "lockedWeeks"] as const;
}

export function useCourseLockedWeeks(enrollmentId: number | null) {
  return useQuery({
    queryKey:
      enrollmentId != null
        ? courseLockedWeeksQueryKey(enrollmentId)
        : ["user", "course", "none", "lockedWeeks"],
    queryFn: async () => {
      if (enrollmentId == null) {
        throw new Error("Missing enrollment id");
      }
      const result = await apiClient.getCourseLockedWeeks(enrollmentId);
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data ?? [];
    },
    enabled: enrollmentId != null && enrollmentId > 0,
  });
}
