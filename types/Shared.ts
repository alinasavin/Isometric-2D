export interface CustomButton {
  title: string;
  url: string; // logic must handle http:// (new tab), mailto: (email client), tel: (phone prompt)
  icon?: string; // Iconify text string
}
