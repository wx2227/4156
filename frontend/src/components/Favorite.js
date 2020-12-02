import React, { createElement } from 'react'
import Cookies from 'js-cookie'
import { Tooltip } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import axios from '../services/axios'

class Favorite extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      action: null,
      user_id: Cookies.get('user_id'),
      note_id: null
    }
    this.handleFavorite = this.handleFavorite.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (this.props.note_id !== prevProps.note_id) {
      axios.get(`http://127.0.0.1:8000/api/favorite/?user_id=${this.state.user_id}&note_id=${this.props.note_id}`)
        .then(res => {
          if (res.data.length !== 0) {
            let action
            const favorite = res.data[0].favorite
            if (favorite === 1) {
              action = 'favorite'
            } else {
              action = null
            }
            this.setState({
              ...this.state,
              action: action,
              note_id: this.props.note_id
            })
          }
        })
    }
  }

  handleFavorite = () => {
    if (this.state.action === 'favorite') {
      axios.post('http://127.0.0.1:8000/api/favorite/', {
        favorite: 0,
        user_id: this.state.user_id,
        note_id: this.state.note_id
      })
        .then(() => {
          this.setState({
            ...this.state,
            action: null
          })
        }).catch(() => alert('cannot undo the operation.'))
      return
    }

    axios.post('http://127.0.0.1:8000/api/favorite/', {
      favorite: 1,
      user_id: this.state.user_id,
      note_id: this.state.note_id
    })
      .then(() => {
        this.setState({
          ...this.state,
          action: 'favorite'
        })
      }).catch(() => { alert('Cannot post favorite info') })
  }

  render () {
    return (
      <>
        <Tooltip title='Favorite'>
          <span onClick={this.handleFavorite}>
            {createElement(this.state.action === 'favorite' ? StarFilled : StarOutlined)}
            <span className='comment-action'>{this.state.likes}</span>
          </span>
        </Tooltip>
      </>
    )
  }
}

export default Favorite
