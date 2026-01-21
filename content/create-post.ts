import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { nanoid } from "nanoid";
import moment from "moment";
import readline from "readline";

const BASE_DIR = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(BASE_DIR, "posts");

const { slugSet, categorySet } = readPosts();
const category = await ask(categorySet);
const { slug, content } = getSlugAndContent();

// 파일 생성
try {
  const fileName = `${slug}.md`;
  const filePath = path.join(POSTS_DIR, fileName);
  fs.writeFileSync(filePath, content);
} catch (err) {
  console.error(err);
}

function readPosts() {
  const slugSet = new Set();
  const categorySet = new Set<string>();
  try {
    const files = fs.readdirSync(POSTS_DIR);
    files.forEach((fileName) => {
      const filePath = path.join(POSTS_DIR, fileName);

      if (!filePath.endsWith("md") || filePath.includes("README")) {
        return;
      }

      try {
        const rawData = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(rawData);
        slugSet.add(data.slug);
        categorySet.add(data.category);
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
  return { slugSet, categorySet };
}

// 존재하는 카테고리 리스트
function getCategoryList(categorySet: Set<string>): string {
  const categoryList = [];
  for (const cname of categorySet) {
    categoryList.push(cname);
  }
  return categoryList.join("\n");
}

// 카테고리 질문 텍스트
function ask(categorySet: Set<string>): Promise<string> {
  const info = `>> 포스트 생성을 시작합니다.
>> 존재하는 카테고리 목록은 아래와 같습니다.

-------------------------------------------
${getCategoryList(categorySet)}
-------------------------------------------

>> 기존의 카테고리를 입력하실 수 있고, 새로 카테고리를 생성하려면 새 카테고리 이름을 입력해주세요.
>> `;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(info, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function getSlugAndContent() {
  // 중복방지 slug 생성
  let slug = nanoid();
  while (slugSet.has(slug)) {
    slug = nanoid();
  }

  // 디폴트 컨텐츠
  const content = `---
title: 
category: ${category}
createdDate: ${moment(new Date()).format("YYYY-MM-DDTHH:mm")}
slug: ${slug}
---
`;
  return { slug, content };
}
