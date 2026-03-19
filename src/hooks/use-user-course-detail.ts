import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";

export function userCourseDetailQueryKey(enrollmentId: number) {
  return ["user", "course", enrollmentId] as const;
}

export function useUserCourseDetail(enrollmentId: number | null) {
  return useQuery({
    queryKey:
      enrollmentId != null
        ? userCourseDetailQueryKey(enrollmentId)
        : ["user", "course", "none"],
    queryFn: async () => {
      if (enrollmentId == null) {
        throw new Error("Missing enrollment id");
      }
      const result = await apiClient.getUserCourseDetail(enrollmentId);
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    enabled: enrollmentId != null && enrollmentId > 0,
  });
}
