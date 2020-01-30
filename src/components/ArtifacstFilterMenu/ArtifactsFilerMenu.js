import React, { useState, useCallback } from 'react'
import Select from '../../common/Select/select'
import refresh from '../../images/refresh.png'
import './artifactsfiltermenu.scss'

const ArtifactsFilerMenu = ({ refreshArtifacts, onChangeFilter }) => {
  const [filter, setFilter] = useState({
    period: new Date().setDate(new Date().getDate() - 7),
    group: 'name'
  })

  const changeFilter = useCallback(
    _filter => {
      setFilter(prevFilter => ({ ...prevFilter, ..._filter }))
      onChangeFilter({ ...filter, ..._filter })
    },
    [filter, onChangeFilter]
  )

  return (
    <div className="artifacts_filter_container">
      <Select
        label="Period:"
        value={filter.period}
        onChange={value => {
          changeFilter(value)
        }}
      ></Select>
      <Select
        label="Group by:"
        value={filter.group}
        onChange={value => {
          changeFilter(value)
        }}
      ></Select>
      <div className="artifacts-filter-refresh">
        <button onClick={() => refreshArtifacts()}>
          <img src={refresh} alt="refresh" />
        </button>
      </div>
    </div>
  )
}

export default ArtifactsFilerMenu