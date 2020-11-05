import React from 'react';
import { DepthContainer } from './DepthContainer';
import { Stage, Sprite, Text, Container, useTick } from '@inlet/react-pixi';

export const ZoomScene = ({ id, manifestData, closestDistance, layerDistanceDelta, curProgress, ...restProps }) => {

    const { images, size } = manifestData;
    
    const containerScale = 1440 / size[0]; //todo: deal with non square aspects
    const offset = [-size[0] / 2, -size[1] / 2];

    
    return (
        <Container key={id} sortableChildren={true} scale={containerScale}>
            {images.map((imageData, index) => {
                const baseDistance = closestDistance + (images.length-index) * layerDistanceDelta;
                const camDistance = baseDistance - (curProgress * (images.length * layerDistanceDelta + closestDistance));
                const imagePath = "/public/"+imageData.path;
                console.log( "imagePath:", imagePath);
                if (camDistance > 0) {
                    return (
                        <DepthContainer key={index} baseDistance={baseDistance} distance={camDistance} zIndex={ index}>
                            <Sprite image={imagePath} anchor={0} position={[offset[0] + imageData.bbox[0], offset[1] + imageData.bbox[1]]} />
                        </DepthContainer>
                    );
                }
                else {
                    return null;
                }
            })}
        </Container>
    )

}