import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Layout from "@/components/Layout";
import Post from "@/components/Post";

import { getPost } from "@/lib/posts";

export default function CatetoryBlogPage({ posts, categoryName }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">
        Post in {categoryName}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((filename) => {
    //Read data in files
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename), // file path
      "utf-8"
    );

    //converting read .md files to json
    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  //get posts
  const posts = getPost();

  //filter post by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts.slice(0, 6),
      categoryName: category_name,
    },
  };
}
