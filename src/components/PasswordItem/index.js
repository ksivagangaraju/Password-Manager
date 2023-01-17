import './index.css'

const PasswordItem = props => {
  const {passwordItem, isShowPassword, onDeletePasswordItem} = props
  const {id, website, username, password, randomBackgroundColor} = passwordItem
  const showPassword = isShowPassword ? (
    <p className="password">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )
  const onDeletePassword = () => {
    onDeletePasswordItem(id)
  }
  return (
    <li className="password-item-box-container">
      <p className={`website-first-letter ${randomBackgroundColor}`}>
        {website.slice(0, 1).toUpperCase()}
      </p>
      <div className="url-user-password-container">
        <p className="password">{website}</p>
        <p className="password">{username}</p>
        {showPassword}
      </div>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onDeletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default PasswordItem
