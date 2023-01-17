import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordItems: [],
    website: '',
    username: '',
    password: '',
    backgroundColors: ['warning', 'success', 'orange', 'info', 'danger'],
    searchInput: '',
    isShowPassword: false,
  }

  filledWebsite = event => {
    this.setState({website: event.target.value})
  }

  filledUsername = event => {
    this.setState({username: event.target.value})
  }

  filledPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFilledPassword = event => {
    event.preventDefault()
    const {
      passwordItems,
      website,
      username,
      password,
      backgroundColors,
    } = this.state
    const newPasswordItem = {
      id: uuidv4(),
      website,
      username,
      password,
      randomBackgroundColor:
        backgroundColors[
          Math.ceil(Math.random() * backgroundColors.length - 1)
        ],
    }
    this.setState({
      passwordItems: [...passwordItems, newPasswordItem],
      website: '',
      username: '',
      password: '',
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onDeletePasswordItem = id => {
    this.setState(prevState => ({
      passwordItems: prevState.passwordItems.filter(
        eachItem => id !== eachItem.id,
      ),
    }))
  }

  render() {
    const {
      passwordItems,
      website,
      username,
      password,
      searchInput,
      isShowPassword,
    } = this.state

    const filteredPasswordItems = passwordItems.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <div className="password-manager-app-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo-image"
          />
          <div className="password-manager-container">
            <form
              className="username-password-input-container"
              onSubmit={this.onSubmitFilledPassword}
            >
              <h1 className="add-new-password-heading">Add New Password</h1>
              <div className="input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-image"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.filledWebsite}
                  value={website}
                />
              </div>
              <div className="input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-image"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.filledUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-image"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.filledPassword}
                  value={password}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="password-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-image-lg"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-image-sm"
              />
            </div>
          </div>
          <div className="password-items-container">
            <div className="search-bar-container">
              <div className="count-password-container">
                <h1 className="count-password-items">Your Passwords</h1>
                <p className="count-items">{filteredPasswordItems.length}</p>
              </div>
              <div className="search-input-container">
                <div className="search-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-image"
                  />
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="password-items">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox"
                  onClick={this.onClickCheckbox}
                  name="showPasswords"
                  id="showPasswords"
                />
                <label className="show-password" htmlFor="showPasswords">
                  Show Passwords
                </label>
              </div>
              {filteredPasswordItems.length === 0 ? (
                <div className="no-passwords-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords-image"
                  />
                  <p className="no-passwords">No Passwords</p>
                </div>
              ) : (
                <ul className="password-item-container">
                  {filteredPasswordItems.map(eachItem => (
                    <PasswordItem
                      key={eachItem.id}
                      passwordItem={eachItem}
                      isShowPassword={isShowPassword}
                      onDeletePasswordItem={this.onDeletePasswordItem}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
