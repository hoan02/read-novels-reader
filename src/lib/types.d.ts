type NovelType = {
  _id: string;
  novelName: string;
  novelSlug: string;
  author: string;
  genres: string[];
  tags: string[];
  urlCover: string;
  uploader: string;
  description: string;
  nominations: number;
  reviews: {
    count: number;
    avgScore: number;
    avgScoreCharacter: number;
    avgScorePlot: number;
    avgScoreWorld: number;
    totalScoreCharacter: number;
    totalScorePlot: number;
    totalScoreWorld: number;
  };
  readCount: number;
  chapterCount: number;
  commentCount: number;
  state: string;
  isLock: boolean;
  isPublic: boolean;
  publishedDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type ChapterType = {
  _id: String;
  novelSlug: String;
  chapterName: String;
  chapterIndex: Number;
  content: String;
  state: String;
  isLock: Boolean;
  isPublic: Boolean;
  publishedDate: Date | null;
};
