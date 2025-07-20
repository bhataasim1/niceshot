export interface AspectRatio {
  id: string;
  name: string;
  ratio: number;
  width: number;
  height: number;
}

export const aspectRatios: AspectRatio[] = [
  {
    id: '16_9',
    name: '16:9',
    ratio: 16 / 9,
    width: 16,
    height: 9,
  },
  {
    id: '3_2',
    name: '3:2',
    ratio: 3 / 2,
    width: 3,
    height: 2,
  },
  {
    id: '4_3',
    name: '4:3',
    ratio: 4 / 3,
    width: 4,
    height: 3,
  },
  {
    id: '5_4',
    name: '5:4',
    ratio: 5 / 4,
    width: 5,
    height: 4,
  },
  {
    id: '1_1',
    name: '1:1',
    ratio: 1,
    width: 1,
    height: 1,
  },
  {
    id: '4_5',
    name: '4:5',
    ratio: 4 / 5,
    width: 4,
    height: 5,
  },
  {
    id: '3_4',
    name: '3:4',
    ratio: 3 / 4,
    width: 3,
    height: 4,
  },
  {
    id: '2_3',
    name: '2:3',
    ratio: 2 / 3,
    width: 2,
    height: 3,
  },
  {
    id: '9_16',
    name: '9:16',
    ratio: 9 / 16,
    width: 9,
    height: 16,
  },
  {
    id: '3_1',
    name: '3:1',
    ratio: 3 / 1,
    width: 3,
    height: 1,
  },
  {
    id: '10_21',
    name: '10:21',
    ratio: 10 / 21,
    width: 10,
    height: 21,
  },
  {
    id: '16_10',
    name: '16:10',
    ratio: 16 / 10,
    width: 16,
    height: 10,
  },
];

export type AspectRatioKey = (typeof aspectRatios)[number]['id'];
