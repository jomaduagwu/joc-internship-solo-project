import { Level } from "./enum";

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date | null;
    priority: Level;
    complete: boolean;
  }
  
  export async function saveTask(updatedTask: Task): Promise<void> {
    try {
      const response = await fetch('/api/update-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }