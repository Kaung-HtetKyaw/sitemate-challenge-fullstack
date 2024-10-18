import React, { ReactElement, useState } from 'react'
import logo from './logo.svg'
import viteLogo from './vite.svg'
import tailwindLogo from './tailwind.svg'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createIssue,
  deleteIssue,
  getAllIssues,
  GetAllIssuesQueryKey,
  Issue,
  updateIssue
} from './apis/issues'
import IssueItem, { IssueCreateForm } from './Issue'
import { queryClient } from './main'

function App(): ReactElement {
  const [isCreating, setIsCreating] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: [GetAllIssuesQueryKey],
    queryFn: () => getAllIssues()
  })
  console.log(data)
  const { mutate: createIssueApi } = useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GetAllIssuesQueryKey] })
    }
  })

  const { mutate: updateIssueApi } = useMutation({
    mutationFn: updateIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GetAllIssuesQueryKey] })
    }
  })

  const { mutate: deleteIssueApi } = useMutation({
    mutationFn: deleteIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GetAllIssuesQueryKey] })
    }
  })

  const onUpdateIssue = async (id: string, data: Omit<Issue, '_id'>) => {
    await updateIssueApi({ id, data })
  }

  const onDeleteIssue = async (id: string) => {
    await deleteIssueApi(id)
  }

  const onCreateIssue = async (data: Omit<Issue, '_id'>) => {
    await createIssueApi(data)
    setIsCreating(false)
  }

  return (
    <div className="p-[30px]">
      {isLoading ? (
        <h1>Loading.....</h1>
      ) : (
        <div>
          {isCreating ? (
            <IssueCreateForm
              onSubmit={onCreateIssue}
              onClose={() => setIsCreating(false)}
            />
          ) : (
            <div className="flex justify-end mb-[30px]">
              <button
                className="bg-blue-500 px-[10px] py-[10px] text-white w-[200px] rounded-md"
                onClick={() => setIsCreating(true)}
              >
                Create new issue
              </button>
            </div>
          )}

          {data?.map((el) => (
            <IssueItem
              onDelete={onDeleteIssue}
              onUpdate={onUpdateIssue}
              key={el._id}
              issue={el}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
