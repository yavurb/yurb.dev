import type Post from "@/interfaces/post";
import type Project from "@/interfaces/projects";
import presentation from "@/data/presentation";

export type LogEntry = {
  kind: "post" | "project" | "site";
  date: Date;
  title: string;
  description?: string;
  tags: string[];
  href?: string;
  external?: boolean;
  readingTime?: number;
};

const WORDS_PER_MINUTE = 220;

export function readingTime(markdown?: string): number | undefined {
  if (!markdown) return undefined;
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function postToEntry(post: Post): LogEntry {
  return {
    kind: "post",
    date: new Date(post.published_at),
    title: post.title,
    description: post.description,
    tags: [],
    href: `/posts/${post.id}`,
    readingTime: readingTime(post.content),
  };
}

export function projectToEntry(project: Project): LogEntry {
  return {
    kind: "project",
    date: new Date(project.created_at),
    title: project.live ? `Shipped ${project.name}` : `${project.name} — in progress`,
    description: project.description,
    tags: project.tags ?? [],
    href: project.live ? project.website_url : undefined,
    external: true,
  };
}

/** Posts + projects + static site milestones, newest first. */
export function buildLog(posts: Post[] = [], projects: Project[] = []): LogEntry[] {
  const milestones: LogEntry[] = presentation.milestones.map((m) => ({
    kind: "site",
    date: new Date(m.date),
    title: m.title,
    description: m.description,
    tags: m.tags,
  }));

  return [...posts.map(postToEntry), ...projects.map(projectToEntry), ...milestones]
    .filter((entry) => !Number.isNaN(entry.date.getTime()))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
