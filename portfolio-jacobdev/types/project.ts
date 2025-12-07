export interface ProjectContent {
  root?: any;
}

export interface ProjectTag {
  label?: string;
  [key: string]: any;
}

export interface Project {
  id?: string | number;
  title: string;
  description?: string;
  tags?: Array<string | ProjectTag>;
  showGithub?: boolean;
  github?: string;
  showDemo?: boolean;
  website?: string;
  date?: string;
  content?: ProjectContent;
  [key: string]: any;
}

