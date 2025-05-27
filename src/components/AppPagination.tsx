import { Link, useNavigation } from 'react-router'

interface Props {
  currentPage: number
  perPage: number
  total: number
}

const AppPagination = (page: Props) => {
  const navigation = useNavigation()

  const totalPage = Math.ceil(page.total / page.perPage)
  const currentRoute = `${navigation.location?.pathname}${navigation.location?.search}`

  const pagesIndex = []
  for (let i = 1; i <= totalPage; i++) {
    pagesIndex.push(i)
  }

  return (
    <nav className="my-5" aria-label="Page navigation">
      {pagesIndex && (
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page.currentPage === 1 && 'disabled'}`}>
            <Link
              to="`${currentRoute}?page=${page.currentPage - 1}`"
              className="page-link"
            >
              Previous
            </Link>
          </li>
          {pagesIndex.map((pageIndex, index) => (
            <li key={index} className="page-item">
              <Link
                to="`${currentRoute}?page=${pageIndex}`"
                className={`page-link ${
                  page.currentPage === pageIndex && 'current'
                } `}
              >
                {pageIndex}
              </Link>
            </li>
          ))}
          <li
            className={`page-item ${
              page.currentPage === totalPage && 'disabled'
            }`}
          >
            <Link
              to={`${currentRoute}?page=${page.currentPage + 1}`}
              className="page-link"
            >
              Next
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}
export default AppPagination
