import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';

function PostNewPage() {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }
    await createPost(content);
    navigate('/');
  };

  return (
    <div className="post-form">
      <div className="post-form__tabs">
        <span>📝 Публикация</span>
        <span>🖼 Фото/видео</span>
        <span>📹 Прямой эфир</span>
        <span>⋯ Ещё</span>
        <button
          type="button"
          className="post-form__close"
          onClick={() => navigate('/')}
        >
          ✕
        </button>
      </div>

      <textarea
        className="post-form__textarea"
        placeholder="Введите текст поста..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="post-form__footer">
        <button
          type="button"
          className="btn btn--primary"
          onClick={handleSubmit}
        >
          Опубликовать
        </button>
      </div>
    </div>
  );
}

export default PostNewPage;