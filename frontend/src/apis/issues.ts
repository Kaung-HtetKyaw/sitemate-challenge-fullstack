import apiClient from './client'

export type Issue = {
  _id: string
  title: string
  description: string
}

export const GetAllIssuesQueryKey = 'all-issues'

export const getAllIssues = () => {
  return apiClient.get('/issues').then((res) => res.data as Issue[])
}

export const updateIssue = ({
  id,
  data
}: {
  id: string
  data: { title: string; description: string }
}) => {
  return apiClient.patch(`/issues/${id}`, data).then((res) => res.data as Issue)
}

export const deleteIssue = (id: string) =>
  apiClient.delete(`/issues/${id}`).then((res) => res.data as string | null)

export const createIssue = (data: Omit<Issue, '_id'>) =>
  apiClient.post(`/issues`, data).then((res) => res.data as Issue)
