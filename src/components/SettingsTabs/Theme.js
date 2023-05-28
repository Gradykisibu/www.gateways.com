import React from 'react'
import { useThemeUpdate } from '../context/ThemeContext'

const Theme = () => {
  const toggleTheme = useThemeUpdate();

  return (
    <div>
      <p onClick={toggleTheme}>changeTheme</p>
    </div>
  )
}

export default Theme