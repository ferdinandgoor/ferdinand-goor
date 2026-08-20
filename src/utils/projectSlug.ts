import type Video from "@/types/Video";

export const slugifyProject = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getProjectSlug = ({ artist, song }: Pick<Video, "artist" | "song">) =>
  slugifyProject(`${artist}-${song}`);

export const getProjectPath = (video: Pick<Video, "artist" | "song">) =>
  `/projets/${getProjectSlug(video)}`;

export const getProcessVideoSlug = ({ slug, artist, song }: Pick<Video, "slug" | "artist" | "song">) =>
  slug ?? slugifyProject(`${artist}-${song}`);
