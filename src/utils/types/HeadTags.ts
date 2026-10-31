export type HeadTags = {
  title?: string;
  description?: string;
  noindex?: boolean;
  og?: Partial<{
    title: string;
    type: string;
    description: string;
    image: string;
    alt: string;
  }>;
};
