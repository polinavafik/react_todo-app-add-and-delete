import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from '../Context/TodoContext';

type Props = {
  todo: Todo,
};

export const TodoElement: React.FC<Props> = ({ todo }) => {
  const { completed, title, id } = todo;
  const {
    deleteTodoHandler,
    isLoading,
    setIsLoading,
  } = useContext(TodoContext);
  const [isCompleted, setIsCompleted] = useState(completed);

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed: isCompleted },
      )}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isCompleted}
          onChange={(event) => {
            setIsCompleted(event.target.checked);
          }}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => {
          setIsLoading(true);
          deleteTodoHandler(id);
          setIsLoading(false);
        }}
      >
        ×
      </button>

      {isLoading && (
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};