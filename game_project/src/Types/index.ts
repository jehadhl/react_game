import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface ButtonProps {
  text: string;
  handleClick: () => void;
  disable ?: boolean
}

export interface WelcomeProps {
  handleUserJoin: (type : any) => void;
}

export interface ImageProps {
  src: string;
  alt: string;
}

export interface PlayProps {
  userJoined: boolean;
  players: any;
  handleStartGame : (type : any) => void;
  finish : boolean
}

