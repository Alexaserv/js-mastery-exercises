/**
 * Represents a single task in the task management system.
 */
export interface Task {
    id: number;
    title: string;
    createdAt: string;
    completedAt: string | null;
}
