import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Posts`.
 */
export type PostsProps = SliceComponentProps<Content.PostsSlice>;

/**
 * Component for "Posts" Slices.
 */
const Posts = ({ slice }: PostsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for posts (variation: {slice.variation}) Slices
    </section>
  );
};

export default Posts;
