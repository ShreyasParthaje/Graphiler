import { useState } from 'react'
import './styles/App.css'

import DatasetPage from './pages/DatasetPage.jsx'
import SchemaPage from './pages/SchemaPage.jsx'

function App() {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div>
      {
        pageIndex === 0 ? (
          <DatasetPage pageIndex={pageIndex} setPageIndex = {setPageIndex} />
        ) : (
          <SchemaPage pageIndex={pageIndex} setPageIndex={setPageIndex} />
        )
      }
    </div>
  )
}

export default App
