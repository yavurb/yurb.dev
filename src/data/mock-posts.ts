import type Post from "@/interfaces/post";

/**
 * Dev-only sample posts so the Writing UI can be previewed without the backend.
 * Used by src/lib/posts.ts when running `astro dev` and the API returns no posts
 * (or when MOCK_POSTS=true is set). Never used in production builds.
 */

const tour = `This is a mock post. It exists so you can see how every piece of a real article renders: headings, code, quotes, lists, tables and links.

## Why graceful shutdowns matter

When a deploy replaces a running server, in-flight requests should finish instead of being cut off. In Go, \`http.Server.Shutdown\` stops accepting new connections and waits for active ones — up to the deadline you give it.

Read more in the [net/http docs](https://pkg.go.dev/net/http#Server.Shutdown).

\`\`\`go
func main() {
    srv := &http.Server{Addr: ":8080", Handler: routes()}

    go func() {
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()

    stop := make(chan os.Signal, 1)
    signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
    <-stop

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    srv.Shutdown(ctx) // finish in-flight requests, then exit
}
\`\`\`

### What to check

- The load balancer stops sending traffic before the process exits
- Background workers get the same context and stop cleanly
- The timeout is shorter than the orchestrator's kill grace period

## Measuring it

> If you can't measure the drain, you're guessing.

| Signal | Behaviour | Typical timeout |
| --- | --- | --- |
| SIGTERM | Graceful drain | 10–30 s |
| SIGKILL | Immediate stop | — |

A quick query to spot requests that were cut short:

\`\`\`sql
SELECT count(*) FROM requests
WHERE status = 'aborted' AND created_at > now() - interval '1 day';
\`\`\`

---

## Wrapping up

1. Catch the signal
2. Call \`Shutdown\` with a deadline
3. Watch the aborted-request count after each deploy

That's the whole trick — and the end of the mock post.`;

const short = (topic: string) => `A shorter mock post about ${topic}, used to fill the list.

## The idea

Just enough text to see a second post in the log.

## The end

Nothing more to see here.`;

const posts: Post[] = [
  {
    id: 9003,
    title: "[Mock] Graceful shutdowns in Go",
    description: "Finish in-flight requests on deploy instead of dropping them — signals, deadlines and what to measure.",
    author: "Roy",
    content: tour,
    slug: "mock-graceful-shutdowns-in-go",
    published_at: "2026-10-28T12:00:00Z",
    created_at: "2026-10-28T12:00:00Z",
    updated_at: "2026-10-28T12:00:00Z",
  },
  {
    id: 9002,
    title: "[Mock] Indexes I forgot to add",
    description: "A sample summary for a second post about PostgreSQL indexes.",
    author: "Roy",
    content: short("PostgreSQL indexes"),
    slug: "mock-indexes",
    published_at: "2026-09-14T12:00:00Z",
    created_at: "2026-09-14T12:00:00Z",
    updated_at: "2026-09-14T12:00:00Z",
  },
  {
    id: 9001,
    title: "[Mock] Terraform state, explained",
    description: "A sample summary for a third post about Terraform remote state.",
    author: "Roy",
    content: short("Terraform state"),
    slug: "mock-terraform-state",
    published_at: "2026-08-02T12:00:00Z",
    created_at: "2026-08-02T12:00:00Z",
    updated_at: "2026-08-02T12:00:00Z",
  },
];

export default posts;
