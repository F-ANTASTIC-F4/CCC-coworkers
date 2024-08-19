'use client';

import CommentEditDeleteDropdown from '@/components/dropdown-template/CommentEditDeleteDropdown';
import { deleteComment } from '@/lib/api/comment';
import { dateFormatter, lineBreaker } from '@/lib/utils';
import { Comment } from '@ccc-types';
import Image from 'next/image';
import React from 'react';

import CommentModify from './CommentModify';

function CommentItem({ content, user, createdAt, id, updatedAt }: Comment) {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const isUpdated = createdAt === updatedAt;

  const handleEditMode = (value: boolean) => {
    setIsEditing(value);
  };

  const handleDelete = async () => {
    await deleteComment(id);
  };

  return (
    <div className="flex flex-col gap-[16px] border-b py-[16px]">
      {isEditing ? (
        <CommentModify
          handleEditMode={handleEditMode}
          commentId={id}
          content={content}
        />
      ) : (
        <>
          <div className="flex w-full items-start justify-between">
            <p className="text-sm font-normal text-text-primary">
              {lineBreaker(content).map((contentItem) => (
                <p className="min-h-[20px]">{contentItem}</p>
              ))}
            </p>
            <CommentEditDeleteDropdown
              handleEdit={handleEditMode}
              handleDelete={handleDelete}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative size-[32px]">
                <Image
                  src="/images/basic_profile.png"
                  alt="기본 프로필 이미지"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span className="text-sm font-medium">{user.nickname}</span>
            </div>
            <span className="mr-1 text-sm font-medium text-text-default">
              {isUpdated
                ? `${dateFormatter.toTimeDifference(createdAt)} 등록됨`
                : `${dateFormatter.toTimeDifference(updatedAt)} 수정됨`}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default CommentItem;
