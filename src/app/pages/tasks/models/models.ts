export interface Task {
  taskId: number;
  title: string;
  description: string;
  category: string;
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

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}
