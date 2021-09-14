import Layout from "../../components/Layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Post from "../../components/Post";
import { sortByDate } from "../../utils";

export default function BlogPage({ posts }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    //remove .md from file names to create a slug
    const slug = filename.replace(".md", "");

    //Read data in files
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename), // file path
      "utf-8"
    );

    //converting read .md files to json
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: { posts: posts.sort(sortByDate) },
  };
}
