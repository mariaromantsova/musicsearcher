import React, { Component } from 'react';
import axios from 'axios';


export default class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChecked: false,
      users: []
     };
  }


  componentDidMount() {
    axios.get('/api/users')
      .then(response => {
        this.setState({
          users: response.data.map(user => ({ ...user, isChecked: false }))
        })
      })
      .catch((error) => { console.log(error) })
  }

  renderList = () => {
    return this.state.users.map(currentUser => (
      <tr
        key={currentUser._id}
        onClick={(e) => {
          let id = currentUser._id;

          this.setState(prevState => {
            let { users, allChecked } = prevState;
              users = users.map(user =>
                user._id === id ? { ...user, isChecked: !user.isChecked } : user
              );
              allChecked = users.every(user => user.isChecked);
              return { users, allChecked };
            })
          }
        }
        className={this.state.users.find(user => user._id === currentUser._id).isChecked ? 'checked' : undefined}
      >
        <td>

          <label>
            <input
              type="checkbox"
              key={currentUser._id}
              name={currentUser.username}
              value={currentUser.username}
              checked={currentUser.isChecked}
              onChange={this.handleClick}
              className="filled-in"
            />
            <span></span>
          </label>

        </td>

        <td>{currentUser.username}</td>
        <td>{currentUser.email}</td>
        <td>{currentUser._id}</td>
        <td>{new Date(currentUser.registrationDate).toLocaleString()}</td>
        <td>{new Date(currentUser.lastLoginDate).toLocaleString()}</td>
        <td style={{width: '70px'}} className={currentUser.status}>{currentUser.status}</td>

      </tr>
    ));
  };

  handleClick = (e) => {
    let itemName = e.target.name;
    let checked = e.target.checked;

    this.setState(prevState => {
      let { users, allChecked } = prevState;
      if (itemName === "checkAll") {
        allChecked = checked;
        users = users.map(user => ({ ...user, isChecked: checked }));
      } else {
        users = users.map(user =>
          user.username === itemName ? { ...user, isChecked: !user.isChecked } : user
        );
        allChecked = users.every(user => user.isChecked);
      }
      return { users, allChecked };
    });
  };

  deleteUser = () => {
    let checked = this.state.users.filter(user => user.isChecked)
    checked.forEach(user => {
      axios.delete('/api/users/' + user._id)
        .then(response => { console.log(response.data)})
        .then(() => {
          this.setState(prevState => {
             return { users: prevState.users.filter(x => x._id !== user._id) }
          })
          if (JSON.parse(localStorage.getItem('userData')).userId === user._id) {
            localStorage.removeItem('userData');
            window.location.reload();
          }
        })
    })
  }

  blockUser = () => {
    let checked = this.state.users.filter(user => user.isChecked);
    checked.forEach(user => {
      user.status = 'Blocked'
      this.setState(prevState => {
        return { users: prevState.users.map(x => ({ ...x, user })) }
      })
      axios.post('/api/users/' + user._id + '/update/', user).then(res => console.log(res.data))
    });

    if (checked.some(user => JSON.parse(localStorage.getItem('userData')).userId === user._id)) {
      localStorage.removeItem('userData');
      window.location.reload();
    }
  }

  unblockUser = () => {
    let checked = this.state.users.filter(user => user.isChecked);
    checked.forEach(user => {
      user.status = 'Active'
      this.setState(prevState => {
        return { users: prevState.users.map(x => ({ ...x, user })) }
      })
      axios.post('/api/users/' + user._id + '/update/', user).then(res => console.log(res.data))
    });
  }


  render() {
    return (
      <div>
        <h3>Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>
                <label htmlFor="checkAll">
                  <input
                    id="checkAll"
                    name="checkAll"
                    type="checkbox"
                    className="filled-in"
                    onChange={this.handleClick}
                    checked={this.state.allChecked}
                  />
                  <span></span>
                </label>
              </th>
              <th>Username</th>
              <th>Email</th>
              <th>ID</th>
              <th>Registration Date</th>
              <th>Last Login Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { this.renderList() }
          </tbody>
        </table>

        <p>
            <button
              onClick={this.deleteUser}
              className="btn pink darken-2 waves-effect waves-light"
            >
                Delete
               <i className="material-icons-outlined right">delete</i>
            </button>
            <button
              onClick={this.blockUser}
              className="btn pink darken-2 waves-effect waves-light"
              style={{
                  marginLeft: '1em',
                  marginRight: '1em'
              }}
            >
                Block
               <i className="material-icons-outlined right">lock</i>
            </button>
            <button
              onClick={this.unblockUser}
              className="btn pink darken-2 waves-effect waves-light"
            >
                Unblock
               <i className="material-icons right">lock_open</i>
            </button>
        </p>

      </div>
    )
  }
}
