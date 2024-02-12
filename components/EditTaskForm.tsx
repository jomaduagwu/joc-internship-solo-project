import React, { useState } from "react";

type EditTaskFormProps = {
  task: Task; 
  onSave: (updatedTask: Task) => void;
};

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSave }) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={editedTask.description} onChange={handleInputChange} />
      </label>
      <label>
        Due Date:
        <input type="date" name="dueDate" value={editedTask.dueDate || ""} onChange={handleInputChange} />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditTaskForm;
