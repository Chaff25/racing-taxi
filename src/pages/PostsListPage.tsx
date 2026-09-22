import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../api/posts';
import type { Post } from '../types';

function PostsListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (ts: number) => new Date(ts).toLocaleString('ru-RU');

  return (
    <div className="posts-page">
      <div className="posts-page__header">
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => navigate('/posts/new')}
        >
          Создать пост
        </button>
      </div>

      {loading && <div className="posts-page__loading">Загрузка...</div>}

      {!loading && posts.length === 0 && (
        <div className="posts-page__empty">Пока нет постов</div>
      )}

      <div className="posts-list">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-card"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <div className="post-card__header">
              <div className="post-card__avatar" />
              <div>
                <div className="post-card__author">Ilhaz Gilyazov</div>
                <div className="post-card__meta">
                  Основатель группы · {formatDate(post.created)}
                </div>
              </div>
            </div>
            <div className="post-card__content">{post.content}</div>
            <div className="post-card__footer">
              <button type="button" className="post-card__action">👍 Нравится</button>
              <button type="button" className="post-card__action">💬 Комментировать</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsListPage;