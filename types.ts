
export enum View {
  HOME = 'home',
  ABOUT = 'about',
  CONTACT = 'contact'
}

export interface RadioState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}
