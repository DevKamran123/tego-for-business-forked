import React from 'react'
import '../../styles/components/cards/CardWrapper.scss'

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
  return (
    <div className={`${props.className} card_wrapper`}> {children}</div>
  )
}

export default CardWrapper