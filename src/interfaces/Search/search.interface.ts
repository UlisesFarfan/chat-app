export enum SearchWhere {
  CHAT,
  CONTACT,
}

export enum SearchType {
  ARCHIVE,
  UNARCHIVE
}

export interface Search {
  where: SearchWhere;
  placeholder: string;
  type?: SearchType;
}