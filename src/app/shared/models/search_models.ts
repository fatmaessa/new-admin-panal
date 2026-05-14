// ===== Raw API Response Shapes =====

export interface StoryItem {
  storyId: number;
  title: string;
  storyText?: string;
  category: string;
  audioUrl?: string;
  url?: string;
  pointsRewarded: number;
}

export interface TaskItem {
  taskId: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  videoUrl?: string;
  pointsRewarded: number;
}

export interface VideoItem {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  pointsRewarded: string;
}

export interface ArticleItem {
  id: number;
  name: string; // ⚠️ المقالات بتستخدم 'name' مش 'title'
  description: string;
  imageUrl?: string;
  link?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
}

// ===== Unified Search Result =====
export type ContentType = 'story' | 'video' | 'task' | 'article';

export interface SearchResult {
  id: number;
  title: string;
  type: ContentType;
  description?: string;
  imageUrl?: string;
  category?: string;
  points?: number;
}

// ===== Mappers =====
export function mapStory(s: StoryItem): SearchResult {
  return {
    id: s.storyId,
    title: s.title,
    type: 'story',
    description: s.storyText ? s.storyText.substring(0, 90) + '...' : undefined,
    imageUrl: s.url,
    category: s.category,
    points: s.pointsRewarded,
  };
}

export function mapTask(t: TaskItem): SearchResult {
  return {
    id: t.taskId,
    title: t.title,
    type: 'task',
    description: t.description,
    category: t.category,
    points: t.pointsRewarded,
  };
}

export function mapVideo(v: VideoItem): SearchResult {
  return {
    id: v.id,
    title: v.title,
    type: 'video',
    description: v.description,
    category: v.category,
    points: Number(v.pointsRewarded),
  };
}

export function mapArticle(a: ArticleItem): SearchResult {
  return {
    id: a.id,
    title: a.name,
    type: 'article',
    description: a.description,
    imageUrl: a.imageUrl,
  };
}