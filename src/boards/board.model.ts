export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus; // 공개/비공개
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
