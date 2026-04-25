export interface Video {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  pointsRewarded: string;
}

export interface NewVideo {
  title: string;
  description: string;
  category: string;
  url: string;
  pointsRewarded: number;
}
