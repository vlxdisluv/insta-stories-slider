import { ImageSourcePropType } from 'react-native';

export enum StoryType {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
}

export interface IStory {
  id: string;
  source: ImageSourcePropType;
  user: string;
  avatar: ImageSourcePropType;
}
