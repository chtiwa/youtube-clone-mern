import React from 'react'
import './share.css'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { MdSocialDistance } from 'react-icons/md'

const Share = ({ showShare, setShowShare, url }) => {
  const socials = [
    {
      outlet: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?url=${url}`,
      background: "#0a66c2",
      color: "white",
      label: "Share on LinkedIn",
      Icon: FaLinkedin
    },
    {
      outlet: "Facebook",
      href: `https://www.facebook.com/sharer.php?u=${url}`,
      background: "#3b5898",
      color: "white",
      label: "Share on Facebook",
      Icon: FaFacebook
    },
    {
      outlet: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${url}`,
      background: "#00aced",
      color: "white",
      label: "Share on Twitter",
      Icon: FaTwitter
    },
  ]
  return (
    <div className={`${showShare ? "share-show" : "share-hide"}`}>
      <div className={`share-link-list ${showShare && "share-link-list-animate"} `}>
        {socials.map((social, index) => {
          const { Icon, href, label, background, color } = social
          return (
            <a href={href} target="_blank" rel="noreferrer" aria-label={label} style={{ backgroundColor: background, color: color }} key={index}>
              <Icon className="share-link-list-icon" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Share