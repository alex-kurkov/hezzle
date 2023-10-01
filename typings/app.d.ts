declare global {
  export type Nullable<T> = T | null;

  export type SortOrder = 'ASC' | 'DESC';

  export interface IElement {
    id: number;
    cost: number;
    title: string;
    description: string;
    externalId: string;
  }
}

export {};
