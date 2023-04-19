'use client'
import Image from 'next/image'
import React from 'react'
 
interface AvatarProp {
  src: string | null | undefined
}

const Avatar : React.FC <AvatarProp> = ({
  src,
}) => {
  return (
    <Image
        alt="avatar"
        className="rounded-full cursor-pointer"
        height="30"
        width="30"
        src={src ? src : '/images/avatar.png'}
    />
  )
}
export default Avatar