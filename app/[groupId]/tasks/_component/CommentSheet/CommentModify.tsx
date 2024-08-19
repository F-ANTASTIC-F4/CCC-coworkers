'use client';

import { Button } from '@/components/ui/button';
import { updateComment } from '@/lib/api/comment';
import { Id } from '@ccc-types';
import React, { ChangeEvent } from 'react';

function CommentModify({
  handleEditMode,
  commentId,
  content,
}: {
  handleEditMode: (value: boolean) => void;
  commentId: Id;
  content: string;
}) {
  const [formData, setFormData] = React.useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData(value);
  };

  const cancelEditMode = () => {
    handleEditMode(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      await updateComment(commentId, formData);
      handleEditMode(false);
    }
  };

  return (
    <form className="h-full w-full bg-transparent" onSubmit={handleSubmit}>
      <textarea
        onChange={handleChange}
        placeholder={content}
        className="h-full w-full resize-none bg-transparent outline-none"
      />
      <div className="ml-auto flex h-full w-fit items-center gap-3 pr-2">
        <button
          type="button"
          onClick={cancelEditMode}
          className="text-text-default outline-none"
        >
          취소
        </button>
        <Button
          type="submit"
          variant="outlined"
          size="x-small"
          className="outline-none"
        >
          수정하기
        </Button>
      </div>
    </form>
  );
}

export default CommentModify;
