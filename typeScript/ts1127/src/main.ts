// 1. User, Post 타입 정의
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// 2. 제네릭 fetchJson 함수 생성
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Error fetching: ${res.status}`);
  }

  const data: T = await res.json();
  return data;
}

// 3. 실제 API 요청 후 로그 출력
async function getAllPosts(): Promise<Post[]> {
  return fetchJson<Post[]>("https://jsonplaceholder.typicode.com/posts");
}

async function getUserById(id: number): Promise<User> {
  return fetchJson<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
}

const posts = await getAllPosts();
console.log(posts);

const user1 = await getUserById(1);
console.log(user1);

// 4. 유틸리티 타입 적용
type PostSummary = Pick<Post, "id" | "title">;

type CreatePostDto = Omit<Post, "id">;

type UpdatePostDto = Partial<Pick<Post, "title" | "body">>;

type ReadonlyPost = Readonly<Post>;

// 5. 유틸리티 타입 확인
const firstPost = posts[0];
console.log("첫 번째 post :", firstPost);

// 5-1. PostSummary
const firstPostSummary: PostSummary = {
  id: firstPost.id,
  title: firstPost.title,
};
console.log("PostSummary:", firstPostSummary);

// 5-2. ReadonlyPost
const readonlyFirstPost: ReadonlyPost = firstPost;
// readonlyFirstPost.title = "제목 수정";

// 5-3. UpdatePostDto
const updatePostDto: UpdatePostDto = {
  title: "제목 수정",
  body: "본문 수정",
};
console.log("UpdatePostDto:", updatePostDto);

// 6. ReturnType + Awaited 활용
type FetchPostsReturn = ReturnType<typeof fetchJson<Post[]>>; // Promise<Post[]>

type FetchPostsData = Awaited<FetchPostsReturn>; // Post[]

const postsPromise: FetchPostsReturn = fetchJson<Post[]>(
  "https://jsonplaceholder.typicode.com/posts"
);
const postsArray: FetchPostsData = await postsPromise;

console.log(postsPromise);
console.log(postsArray);
