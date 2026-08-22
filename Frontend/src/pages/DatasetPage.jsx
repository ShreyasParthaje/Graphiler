import React from 'react'
import '../styles/pages/DatasetPage.css'

import TabBar from '../components/TabBar'

function DatasetPage({ pageIndex, setPageIndex }) {
  return (
    <div>
      <TabBar pageIndex={pageIndex} setPageIndex={setPageIndex} />
    </div>
  )
}

export default DatasetPage
