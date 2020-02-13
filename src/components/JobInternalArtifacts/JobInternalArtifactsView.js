import React from 'react'
import PropTypes from 'prop-types'

import JobInternalResults from '../JobInternalResults/JobInternalResults'

import arrow from '../../images/arrow.png'
import Download from '../../common/Download/Download'

const JobInternalArtifactsView = ({ items, handleClick, artifacts }) => (
  <div className="jobs__table__item_artifacts">
    {items.map((item, i) => {
      return (
        <div key={i} className="jobs__table__item_artifacts_wrapper">
          <div className="jobs__table__item_artifacts__row">
            <div
              className="jobs__table__item_artifacts__row_item"
              onClick={e =>
                handleClick(e, item.target_path.schema, item.target_path.path)
              }
            >
              <img src={arrow} alt="Arrow icon" className="arrow" />
              {item.key}
            </div>
            <div className="jobs__table__item_artifacts__row_item jobs__table__item_artifacts__row_item_long">
              {item.target_path.schema && (
                <p>schema: {item.target_path.schema}</p>
              )}
              path: {item.target_path.path}
            </div>
            <div className="jobs__table__item_artifacts__row_item">
              size: {item.size}
            </div>
            <div className="jobs__table__item_artifacts__row_item">
              {item.date}
            </div>
            <div className="jobs__table__item_artifacts__row_item jobs__table__item_artifacts__row_item_short">
              <Download
                path={item.target_path.path}
                schema={item.target_path.schema}
              />
            </div>
          </div>
          <div className="jobs__table__item_artifacts__preview" key={i + 1}>
            {artifacts.type && artifacts.type === 'table-results' && (
              <div className="jobs__table__item_artifacts__preview_table">
                <JobInternalResults job={artifacts} />
              </div>
            )}
            {artifacts.type && artifacts.type === 'table' && (
              <div className="jobs__table__item_artifacts__preview_table">
                <div className="jobs__table__item_artifacts__preview_table__row">
                  {artifacts.data.headers.map(header => {
                    return (
                      <div
                        key={header}
                        className="jobs__table__item_artifacts__preview_table__header"
                      >
                        {header}
                      </div>
                    )
                  })}
                </div>
                {artifacts.data.content.map(item => (
                  <div
                    key={item + Math.random()}
                    className="jobs__table__item_artifacts__preview_table__row"
                  >
                    {typeof item === typeof '' ? (
                      <div className="jobs__table__item_artifacts__preview_table__row__content">
                        {item}
                      </div>
                    ) : (
                      item.map(value => (
                        <div
                          key={value + Math.random()}
                          className="jobs__table__item_artifacts__preview_table__row__content"
                        >
                          {value}
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </div>
            )}
            {artifacts.data && artifacts.type === 'text' && (
              <div>{artifacts.data.content}</div>
            )}
            {artifacts.data && artifacts.type === 'html' && (
              <div>
                <pre>
                  <code>{artifacts.data.content}</code>
                </pre>
              </div>
            )}
            {artifacts.data && artifacts.type === 'json' && (
              <div>
                <pre>
                  <code>{artifacts.data.content}</code>
                </pre>
              </div>
            )}
            {artifacts.data && artifacts.type === 'image' && (
              <div>{artifacts.data.content}</div>
            )}
            {artifacts.type && artifacts.type === 'unknown' && (
              <div>No preview</div>
            )}
          </div>
        </div>
      )
    })}
  </div>
)

JobInternalArtifactsView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleClick: PropTypes.func.isRequired,
  artifacts: PropTypes.shape({}).isRequired
}

export default JobInternalArtifactsView