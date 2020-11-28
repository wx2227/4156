import React from 'react'
import axios from 'axios'
import Cookies from "js-cookie"

class Mainpage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      credits: 0,
      user_id: -1,
      nickname: "haha",
      email: "",
      notes: []
    }
  }

  componentDidMount () {
    const id = Cookies.get("user_id")
    axios.get('http://localhost:8000/api/user/?id=' + id)
      .then(res => {
        if (res.data.length != 0) {
          this.setState({
            credits: res.data[0].credits,
            email: res.data[0].email,
            user_id: res.data[0].id
            // notes: res.data[0].user.notes not in the data? 
          })
        }
      }).catch(err => { console.log(err.stack) })
  }

  render () {
    return (
      <>
        <div>
            <p>we have the user_id as {this.state.user_id}</p>
        </div>
      </>
    )
  }
}

export default Mainpage
