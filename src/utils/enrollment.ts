import { SessionManager } from "./session";

const getStorageKey = (email: string | null) => `eduly_enrollments_${email || 'guest'}`;

export const EnrollmentService = {
  getEnrolledCourseIds(): string[] {
    const email = SessionManager.getUserEmail();
    try {
      const raw = localStorage.getItem(getStorageKey(email));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  isEnrolled(courseId: string): boolean {
    const ids = this.getEnrolledCourseIds();
    return ids.includes(courseId);
  },

  enroll(courseId: string): void {
    const email = SessionManager.getUserEmail();
    const key = getStorageKey(email);
    const current = this.getEnrolledCourseIds();
    if (!current.includes(courseId)) {
      const updated = [...current, courseId];
      localStorage.setItem(key, JSON.stringify(updated));
    }
  },

  unenroll(courseId: string): void {
    const email = SessionManager.getUserEmail();
    const key = getStorageKey(email);
    const updated = this.getEnrolledCourseIds().filter(id => id !== courseId);
    localStorage.setItem(key, JSON.stringify(updated));
  }
};
