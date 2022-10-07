import React from 'react'
import './Footer.css'
import { FaGithub, FaLinkedin} from 'react-icons/fa'


const Footer = () => {
  return (
    <div className='footer_bar'>
        <div className='footer_social'>
            <a href='https://github.com/YisussDev' rel="noreferrer" target='_blank' ><FaGithub /></a>
            <a href='https://www.linkedin.com/in/jesuspaguayn/' rel="noreferrer" target='_blank' ><FaLinkedin /></a>
        </div>
        <p>Hecho con ❤️ por Jesus Paguay.</p>
    </div>
  )
}

export default Footer