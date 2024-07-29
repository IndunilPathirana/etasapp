import { Button, styled } from '@mui/material'
import React from 'react'

type ButtonProps = {
    name:string
}

export default function ButtonComponent(props:ButtonProps) {
  return (
    <StyledButton>
        {props.name}
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
    background-color: #7abbf5;
`