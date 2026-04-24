export interface STORY {
  storyId: number;
  title: string;
  storyText: string;
  category: string;
  audioUrl: string;
  url: string;
  pointsRewarded: number;
}
export interface NEWSTORY {
  
  title: string;
  storyText: string;
    category: string;
      audioUrl: string,
        url: string,
          pointsRewarded: number

}
export enum StoryType {
  Bedtime = 'حكايات قبل النوم',
  Science = 'علوم واكتشاف',
  Moral = 'أخلاق وقيم',
  Adventure = 'مغامرات'
}