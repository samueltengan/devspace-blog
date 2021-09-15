import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { sortByDate } from "@/utils/index";

const files = fs.readdirSync(path.join("posts"));

// get all post
export function getPost() {
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

  return posts.sort(sortByDate);
}
