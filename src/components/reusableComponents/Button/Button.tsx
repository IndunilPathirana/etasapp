import { Button, styled } from '@mui/material'
import React from 'react'

type ButtonProps = {
    name:string,
    onClick:()=>void,
    color:string
}

export default function ButtonComponent(props:ButtonProps) {
  return (
    <StyledButton onClick={props.onClick} customcolor={props.color}>
        {props.name}
    </StyledButton>
  )
}

const StyledButton = styled(Button)<{ customcolor: string }>`
    background-color:${(props) => props.customcolor};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 8px;
    color: white;
    padding-inline: 20px;
    font-weight: 500;
    &:hover {
    background-color: ${(props) => props.customcolor};
    box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 10px;
  }
`