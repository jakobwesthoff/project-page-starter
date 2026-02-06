import { parse as parseYaml } from "yaml";

export type Section = {
  id: string;
  file?: string;
  source?: "readme";
  nav: boolean;
  nav_label?: string;
};

export type NavbarButton = {
  label: string;
  href: string;
  style?: "primary" | "secondary";
  icon?: "github" | "download";
};

export type Imprint = {
  enabled: boolean;
  name: string;
  address: string;
  email_encrypted: string;
  phone_encrypted: string;
  encryption_key: string;
};

export type Config = {
  name: string;
  tagline: string;
  github: string;
  author: {
    name: string;
    website: string;
  };
  sections: Section[];
  navbar_buttons?: NavbarButton[];
  imprint?: Imprint;
};

export async function loadConfig(path: string): Promise<Config> {
  const content = await Bun.file(path).text();
  const config = parseYaml(content) as Config;

  // Validation
  if (!config.name) {
    throw new Error("config.yaml: 'name' is required");
  }
  if (!config.github) {
    throw new Error("config.yaml: 'github' is required");
  }
  if (!config.sections?.length) {
    throw new Error("config.yaml: 'sections' is required");
  }

  return config;
}
