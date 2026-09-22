import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, updatePost, deletePost } from '../api/posts';
import type { Post } from '../types';

type Mode = 'view' | 'edit';

function PostViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [mode, setMode] = useState<Mode>('view');
  const [draft, setDraft] = useState('');

  const postId = Number(id);

  useEffect(() => {
    getPost(postId)
      .then((data) => {
        if (data) {
          setPost(data);
          setDraft(data.content);
        }
      })
      .catch((err) => console.error(err));
  }, [postId]);

  if (!post) {
    return <div className="posts-page__loading">Загрузка...</div>;
  }

  const handleDelete = async () => {
    await deletePost(postId);
    navigate('/');
  };

  const handleEdit = () => {
    setDraft(post.content);
    setMode('edit');
  };

  const handleSave = async () => {
    if (!draft.trim()) return;
    await updatePost(postId, draft);
    setPost({ ...post, content: draft });
    setMode('view');
  };

  const handleCancel = () => {
    setDraft(post.content);
    setMode('view');
  };

  if (mode === 'edit') {
    return (
      <div className="post-form">
        <div className="post-form__tabs">
          <span>Редактировать публикацию</span>
          <button
            type="button"
            className="post-form__close"
            onClick={handleCancel}
          >
            ✕
          </button>
        </div>

        <textarea
          className="post-form__textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />

        <div className="post-form__footer">
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleSave}
          >
            Сохранить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-view">
      <div className="post-card">
        <div className="post-card__header">
          <div className="post-card__avatar" />
          <div>
            <div className="post-card__author">Ilhaz Gilyazov</div>
            <div className="post-card__meta">
              Основатель группы · {new Date(post.created).toLocaleString('ru-RU')}
            </div>
          </div>
        </div>
        <div className="post-card__content">{post.content}</div>
        <div className="post-card__footer">
          <button type="button" className="post-card__action">👍 Нравится</button>
          <button type="button" className="post-card__action">💬 Комментировать</button>
        </div>
      </div>

      <div className="post-view__actions">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={handleEdit}
        >
          Изменить
        </button>
        <button
          type="button"
          className="btn btn--danger"
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default PostViewPage;