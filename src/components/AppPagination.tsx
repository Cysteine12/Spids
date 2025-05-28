import { useNavigate } from 'react-router'
import Button from './ui/Button'

interface Props {
  currentPage: number
  perPage: number
  total: number
}

const AppPagination = (page: Props) => {
  const navigate = useNavigate()
  const totalPage = Math.ceil(page.total / page.perPage)

  const pagesIndex = []
  for (let i = 1; i <= totalPage; i++) {
    pagesIndex.push(i)
  }

  const handleClick = (nextPage: number) => {
    navigate(`?page=${nextPage}`)
  }

  return (
    <nav className="my-5" aria-label="Page navigation">
      {pagesIndex && (
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Button
              onClick={() => handleClick(page.currentPage - 1)}
              className={`text-primary rounded-0 ${
                page.currentPage === 1 && 'text-dark'
              }`}
              disabled={page.currentPage === 1}
            >
              Previous
            </Button>
          </li>

          {pagesIndex.map((pageIndex, index) => (
            <li key={index} className="page-item">
              <Button
                onClick={() => handleClick(pageIndex)}
                className={`text-primary rounded-0 px-3 ${
                  page.currentPage === pageIndex && 'current'
                } `}
              >
                {pageIndex}
              </Button>
            </li>
          ))}

          <li className="page-item">
            <Button
              onClick={() => handleClick(page.currentPage + 1)}
              className={`text-primary rounded-0 ${
                page.currentPage === totalPage && 'text-dark'
              }`}
              disabled={page.currentPage === totalPage}
            >
              Next
            </Button>
          </li>
        </ul>
      )}
    </nav>
  )
}
export default AppPagination
