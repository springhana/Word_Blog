export interface SidebarItemType {
  icon: IconType;
  visited_icon: IconType;
  label: string;
  link: string;
}

export interface SessionType {
  user: {
    name: string;
    email: string;
    id: string;
  };
}

export interface CardsType {
  totalPages: number;
  currentPage: number;
  result: CardType[];
}

export interface CommentsType {
  totalPages: number;
  currentPage: number;
  result: CommentType[];
}
