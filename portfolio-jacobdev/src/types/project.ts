export interface Project {
  title: string;
  description?: string;
  website?: string;
  github?: string;
  thumbnail?: string;
  showDemo?: boolean;
  showGithub?: boolean;
  tags?: Array<{ label: string }>;
}
