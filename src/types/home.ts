import { CustomButton } from './button';

export interface HomeContent {
  title: string;
  description: string; // Rich text / HTML
  button: CustomButton;
}

export interface FooterContent {
  text: string;
  button: CustomButton;
}
