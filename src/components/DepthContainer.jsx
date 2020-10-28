import React from 'react';
import { Container } from '@inlet/react-pixi'
export const DepthContainer = ({ baseDistance, distance, children, ...restProps }) => {
    return (
        <Container scale={ (1 / distance) / (1 / baseDistance) } {...restProps} >
            {children}
        </Container>
    )
}

