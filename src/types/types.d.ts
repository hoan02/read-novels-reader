import { LucideIcon } from "lucide-react";

type ErrorType = {
  message: string;
  status: number | null;
};

type MenuType = {
  name: string;
  slug: string;
};

type MenuIconType = MenuType & {
  icon: LucideIcon;
};

type UserType = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
  role?: "reader" | "writer" | "admin";
  publicMetadata: {
    frameAvatar?: string;
    premium: {
      state?: boolean;
      startDate?: Date;
      endDate?: Date;
    };
  };
};

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
  nominationCount: number;
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
  _id: string;
  novelSlug: string;
  chapterName: string;
  chapterIndex: number;
  content: string;
  state: string;
  isApprove: boolean;
  isLock: boolean;
  isPublic: boolean;
  publishedDate: Date | null;
};

type SettingsType = {
  color: string;
  backgroundColor: string;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  textAlign: "left" | "right" | "center" | "justify";
};
