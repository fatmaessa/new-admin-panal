export interface Task {
  taskId: number;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  duration: string;
  videoUrl: string;
  pointsRewarded: number;
}

export interface CreateTask {
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  duration: string;
  videoUrl: string;
  pointsRewarded: number;
}
export enum Category {
  Religious = 'مهام دينية',
  Behavioral = 'مهام سلوكية',
  Educational = 'مهام تعليمية',
  Household = 'مهام منزلية',
}
export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}
