import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  // createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import {
  queryContactLoader,
  toEditAction,
  contactLoader,
  updateFavoriteAction,
  updateContactAction,
  deleteContactAction,
} from './routes/router'
import Root from './routes/root'
import Index from "./routes/index";
import Contact from './routes/contact'
import EditContact from './routes/edit'
import ErrorPage from './error-page'
import './index.css'

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: queryContactLoader,
    action: toEditAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: updateFavoriteAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: updateContactAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: deleteContactAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
