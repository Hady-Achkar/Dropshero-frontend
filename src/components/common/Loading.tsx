import {CircularProgress, Container} from '@mui/material'
import React from 'react'

const Wrapper: React.FC = () => {
    return (
        <Container
            maxWidth="xl"
            style={{height: '100vh'}}
            className="flex justify-center items-center"
        >
            <CircularProgress/>
        </Container>
    )
}

export default Wrapper
