export type LibraryName = 'book' | 'comic' | 'boardGame';

export type Libraries = {
  id: number;
  title: string;
  serie?: string;
  volume?: number;
  type?: string;
};
