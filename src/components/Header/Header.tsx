import * as React from 'react'
import * as PropTypes from 'prop-types'

export default class Header extends React.Component {

  static propTypes = {
    content: PropTypes.string
  }
  static defaultProps = {
    content: 'default'
  }
  constructor(props: any) {
    super(props)

    this.state = {
      num: 0,
      age: 1
    }
  }

  render() {
    return (
      <div className="page-header">
        common-header
      </div>

    )
  }
}
