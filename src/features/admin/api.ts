import API from '../../libs/api'

const getProfile = async () => {
  const { data } = await API.get(`/api/admin/profile`)
  return data
}

export { getProfile }
