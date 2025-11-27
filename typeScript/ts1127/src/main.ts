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
