export interface IElement {
  id: number;
  cost: number;
  title: string;
  description: string;
}

export const elements: IElement[] = [
  { id: 6234, cost: 1289, title: 'Алфавит', description: 'описание игры' },
  { id: 7, cost: 13999, title: 'Угадайка', description: 'ну и тут тоже' },
  { id: 39, cost: 8899, title: 'Что-то еще', description: 'А я первое описание' },
  { id: 56, cost: 1333, title: 'Игра для взрослых', description: 'Как бы текст' },
  { id: 58, cost: 14012, title: 'Федя', description: 'lorem ipsum' },
];
