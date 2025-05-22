import { Link } from 'react-router'

interface Props {
  routes: { name: string; path?: string }[]
  title: string
}

const LayoutHeading = ({ routes, title }: Props) => {
  return (
    <div className="bg-gray-200 p-3 px-4 d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-700 font-weight-bold">{title}</h1>
      <div className="d-flex align-items-center">
        <i className="fas fa-home mx-1"></i>
        {routes.map((route, index) => (
          <span key={index}>
            <span className="text-lg font-weight-bold">/</span>
            {route.path ? (
              <Link to={route.path} className="mx-1">
                {route.name}
              </Link>
            ) : (
              <span className="mx-1">{route.name}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
export default LayoutHeading
