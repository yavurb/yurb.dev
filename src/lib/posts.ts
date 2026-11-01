import fetchApi from "@/lib/fetch-api";
import mockPosts from "@/data/mock-posts";
import type Post from "@/interfaces/post";

/**
 * Mock posts are only ever used by `astro dev`: either when MOCK_POSTS=true,
 * or automatically when the API returns no posts (e.g. no backend running).
 * Set MOCK_POSTS=false to see the real empty state in dev.
 */
const mockSetting = import.meta.env.MOCK_POSTS as string | undefined;
const mocksAllowed = import.meta.env.DEV && mockSetting !== "false";
const mocksForced = import.meta.env.DEV && mockSetting === "true";

/** Newest first. */
export async function getPosts({ limit }: { limit?: number } = {}): Promise<Post[]> {
  const posts: Post[] = mocksForced
    ? []
    : await fetchApi<Post[]>({
        endpoint: "posts",
        wrappedByKey: "data",
        query: {
          sort: ["publishedAt:desc"],
          ...(limit ? { pagination: { page: 1, pageSize: limit } } : {}),
        },
        defaultReturn: [],
      });

  if (posts.length === 0 && mocksAllowed) {
    return limit ? mockPosts.slice(0, limit) : mockPosts;
  }
  return posts;
}

export async function getPost(id: string | number): Promise<Post | undefined> {
  if (mocksAllowed) {
    const mock = mockPosts.find((p) => String(p.id) === String(id));
    if (mock) return mock;
  }
  return fetchApi<Post>({ endpoint: `posts/${id}`, defaultReturn: undefined });
}
