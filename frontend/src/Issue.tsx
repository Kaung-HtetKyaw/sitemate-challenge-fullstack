import { useState } from 'react'
import { Issue } from './apis/issues'

export type IssueProps = {
  issue: Issue

  onUpdate: (id: string, data: { title: string; description: string }) => void
  onDelete: (id: string) => void
}

const IssueForm = ({
  onChangeTitle,
  onChangeDescription,
  onClose,
  onSubmit,
  title,
  description
}: {
  onChangeTitle: (value: string) => void
  onChangeDescription: (value: string) => void
  title: string
  description: string
  onClose: () => void
  onSubmit: () => void
}) => {
  return (
    <div className="flex  justify-between items-center">
      <div className="flex gap-[20px]">
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => onChangeTitle(e.target.value)}
          value={title}
        />
        <input
          placeholder="Description"
          type="text"
          onChange={(e) => onChangeDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="flex gap-[20px]">
        <button
          className="bg-green-400 px-[10px] py-[10px] text-white w-[200px] rounded-md"
          onClick={() => {
            onSubmit()
            onClose()
          }}
        >
          Submit
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export type IssueCreateFormProps = {
  onSubmit: (data: Omit<Issue, '_id'>) => void
  onClose: () => void
}

export const IssueCreateForm = ({
  onSubmit,
  onClose
}: IssueCreateFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div>
      <IssueForm
        onSubmit={() => onSubmit({ title, description })}
        onClose={onClose}
        title={title}
        description={description}
        onChangeDescription={setDescription}
        onChangeTitle={setTitle}
      />
    </div>
  )
}

const IssueItem = ({ issue, onUpdate, onDelete }: IssueProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(issue.title || '')
  const [description, setDescription] = useState(issue.description || '')

  return isEditing ? (
    <IssueForm
      onSubmit={() => onUpdate(issue._id, { title, description })}
      onClose={() => setIsEditing(false)}
      title={title}
      description={description}
      onChangeDescription={setDescription}
      onChangeTitle={setTitle}
    />
  ) : (
    <div
      className="w-full p-[20px] flex flex-row justify-between items-center my-[20px] bg-gray-300 "
      key={issue._id}
    >
      <div className="flex flex-col gap-[10px]">
        <h3>{issue.title}</h3>
        <p>{issue.description}</p>
      </div>
      <div className="flex gap-[20px]">
        <button
          className="bg-green-400 px-[10px] py-[10px] text-white w-[100px] rounded-md"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 px-[10px] py-[10px] text-white w-[100px] rounded-md"
          onClick={() => {
            onDelete(issue._id)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default IssueItem
