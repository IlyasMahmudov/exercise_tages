import { useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';


interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
    street: string;
    suite: string;
  };
  website: string;
  company: {
    name: string;
  };
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {

  useEffect(() => {
    async function fetchData() {
      const [postsData, usersData] = await Promise.all([
        fetchPosts(),
        fetchUsers(),
      ]);

      const data = usersData.map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        address: `${user.address.city}, ${user.address.street}, ${user.address.suite}`,
        website: `https://${user.website}`,
        company: user.company.name,
        posts: postsData
          .filter((post: Post) => post.userId === user.id)
          .map((post: Post) => ({
            ...post,
            title_scop: post.title.length <= 20 ? post.title : post.title.substring(0, 20) + '...',
          })),
      }));
      console.log('data from API:', data);
    }

    fetchData();
  }, []);

  async function fetchPosts(): Promise<Post[]> {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      if (!response.ok) {
        throw new Error('Ошибка при запросе к постам');
      }
      const resultPosts: Post[] = await response.json();
      return resultPosts;
    } catch (error) {
      console.error('Ошибка при запросе к постам:', error);
      throw error;
    }
  }

  async function fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      if (!response.ok) {
        throw new Error('Ошибка при запросе к пользователям');
      }
      const resultUsers: User[] = await response.json();
      return resultUsers;
    } catch (error) {
      console.error('Ошибка при запросе к пользователям:', error);
      throw error;
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello guys from company Tages</h1>
      <h3>See results from API in console</h3>
    </>
  );
}

export default App;
