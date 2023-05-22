import React from 'react';

import { Disabled, Base, Text, Container, Card, Clickable, Flex, Table, Row, Item } from './atoms';
import { StringInput, OptionsInput } from './inputs';

import { cars } from './api';

const TEXT_COLOR = '#333333';

export default () => {
    const makes = [{ value: 'bmw', label: 'BMW' }, { value: 'audi', label: 'Audi' }, { value: 'mercedes', label: 'Mercedes-Benz' }];
    
    const [make, setMake] = React.useState(null);
    const [model, setModel] = React.useState(null);
    const [vin, setVin] = React.useState('');

    const canCreate = React.useMemo(() => {
        return make !== null && model !== null && vin.length > 0;
    }, [make, model, vin]);

    React.useEffect(() => {
        setModel(null);
    }, [make]);
    
    const models = React.useMemo(() => {
        if (make === 'bmw') {
            return new Array(7).fill(0).map((_, index) => `${index + 1}-series`).map((v) => ({ label: v, value: v }));
        }

        if (make === 'audi') {
            return new Array(8).fill(0).map((_, index) => [`a${index +1}`, `s${index + 1}`, `rs${index + 1}`]).reduce((acc, group) => acc.concat(group), []).map((v) => ({ label: v, value: v }));
        }

        if (make === 'mercedes') {
            return ['a', 'b', 'c', 'e', 's'].map((letter) => [`${letter} klasse`, `gl${letter} klasse`]).reduce((acc, group) => acc.concat(group), []).map((v) => ({ label: v, value: v }));
        }   

        return [];
    }, [make]);

    const createCar = React.useCallback(() => {
        cars.create(make, model, vin).then(console.log).catch(console.log)
    }, [make, model, vin]);

    return (
        <Container>
            <Base mb="64px">
                <Text mb="12px" size={42} weight={700} color={TEXT_COLOR}>
                    Car Service History Merging Demo
                </Text>

                <Text mb="12px" size={18} weight={400} color={TEXT_COLOR}>
                    Hey, Rashmi! As a follow-up to our conversation I've made this little application to show the approaches I would like to use to 
                    solve the problem that we've discussed.
                </Text>

                <Text size={18} weight={400} color={TEXT_COLOR}>
                    The soution I've proposed on a call is actually a bit overengineered and I came up with another one, a bit simpler, but less flexible. Let me show you.
                </Text>
            </Base>

            <Base>
                <Text mb="12px" size={32} weight={700} color={TEXT_COLOR}>
                    Preparations
                </Text>

                <Text mb="24px" size={18} weight={400} color={TEXT_COLOR}>
                    But first, let's create a table of cars and, for simplicity, just store with sqlite in file on the disk. Please mind that I'm using serverless container deployment and the data can get randomly wiped once in a while.
                </Text>

                <Flex gap={12} align="flex-start">
                    <Table w="100%">
                        <Row>
                            <Item><Text size={18} weight={700} color={TEXT_COLOR}>#0</Text></Item>
                            <Item><Text size={18} weight={400} color={TEXT_COLOR}>BMW</Text></Item>
                            <Item><Text size={18} weight={400} color={TEXT_COLOR}>3-series</Text></Item>
                        </Row>
                        <Row>
                            <Item><Text size={18} weight={700} color={TEXT_COLOR}>#1</Text></Item>
                            <Item><Text size={18} weight={400} color={TEXT_COLOR}>BMW</Text></Item>
                            <Item><Text size={18} weight={400} color={TEXT_COLOR}>3-series</Text></Item>
                        </Row>
                        <Row>
                            <Item><Text size={18} weight={700} color={TEXT_COLOR}>#2</Text></Item>
                            <Item><Text size={18} weight={400} color={TEXT_COLOR}>BMW</Text></Item>
                            <Item><Text size={18} weight={400} color={TEXT_COLOR}>3-series</Text></Item>
                        </Row>
                    </Table>

                    <Card p="16px 16px" color="#f1f1f1" w="100%">
                        <Text mb="24px" size={22} weight={700} color={TEXT_COLOR}>Create an entry to the cars table</Text>

                        <OptionsInput mb="12px" value={make} onChange={setMake} options={makes} placeholder="Select make" />

                        <Disabled disabled={make === null}>
                            <OptionsInput mb="12px" value={model} onChange={setModel} options={models} placeholder="Select model" />
                        </Disabled>

                        <StringInput mb="24px" value={vin} onChange={setVin} placeholder="VIN" />

                        <Disabled disabled={!canCreate}>
                            <Clickable onClick={createCar} p="8px 24px" radius="4px" color="#484848">
                                <Text size={18} weight={700} color="white">Create Car</Text>
                            </Clickable>
                        </Disabled>
                    </Card>
                </Flex>
            </Base>
        </Container>
    );
};
