import type { Post, PostResponse } from '../types';

const BASE_URL = 'http://localhost:7070';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts`);
  return response.json();
}

export async function getPost(id: number): Promise<Post | undefined> {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  const data: PostResponse = await response.json();
  return data.post;
}

export async function createPost(content: string): Promise<void> {
  await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 0, content }),
  });
}

export async function updatePost(id: number, content: string): Promise<void> {
  await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, content }),
  });
}

export async function deletePost(id: number): Promise<void> {
  await fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' });
}