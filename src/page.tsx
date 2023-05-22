import React from 'react';

import { Text, Container } from './atoms';

export default () => {
    return (
        <Container>
            <Text size={32} weight={700} color="#333">The History Demo works!</Text>
            <Text size={18} weight={400} color="#333">Hold on until it's done to see the great results!</Text>
        </Container>
    );
};
