import React from 'react';
import styled, { css } from 'styled-components';

type PropsOf<T> = T extends React.FC<infer P> ? P : never;

export type BaseProps = {
    p?: string;
    pt?: string;
    pl?: string;
    pr?: string;
    pb?: string;
    m?: string;
    mt?: string;
    mr?: string;
    mb?: string;
    ml?: string;
    w?: string;
    h?: string;
    mw?: string;
    mh?: string;
};

export const Base = styled.div<BaseProps>`
    padding: ${props => props.p};
    padding-top: ${props => props.pt};
    padding-right: ${props => props.pr};
    padding-left: ${props => props.pl};
    padding-bottom: ${props => props.pb};
    margin: ${props => props.m};
    margin-top: ${props => props.mt};
    margin-right: ${props => props.mr};
    margin-left: ${props => props.ml};
    margin-bottom: ${props => props.mb};
    width: ${props => props.w};
    height: ${props => props.h};
    max-width: ${props => props.mw};
    max-height: ${props => props.mh};
    box-sizing: border-box;
`;

export const Card = styled(Base)<{ color?: string }>`
    background: ${props => props.color || '#f5f5f5'};
    border-radius: 4px;
`;

export const Flex = styled(Base)<{
    dir?: 'row' | 'column';
    align?: 'center' | 'flex-start' | 'flex-end';
    justify?: 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between';
    wrap?: boolean;
    gap?: number;
}>`
    display: flex;
    flex-direction: ${props => props.dir || 'row'};
    align-items: ${props => props.align || 'center'};
    justify-content: ${props => props.justify || 'center'};
    flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
    gap: ${props => props.gap || 0}px;
`;

export const Text = styled(Base)<{ size: number, weight: number, color: string }>`
    font-family: Raleway;
    font-size: ${props => props.size}px;
    font-weight: ${props => props.weight};
    color: ${props => props.color};
    line-height: 1.6;
    text-align: ${props => props.align};
`;

export const Image = styled.img<BaseProps>`
    padding: ${props => props.p};
    padding-top: ${props => props.pt};
    padding-right: ${props => props.pr};
    padding-left: ${props => props.pl};
    padding-bottom: ${props => props.pb};
    margin: ${props => props.m};
    margin-top: ${props => props.mt};
    margin-right: ${props => props.mr};
    margin-left: ${props => props.ml};
    margin-bottom: ${props => props.mb};
    width: ${props => props.w};
    height: ${props => props.h};
    max-width: ${props => props.mw};
    max-height: ${props => props.mh};

    object-fit: cover;
    box-sizing: border-box;
`;

export const Clickable = styled(Card)<{ color?: string, border?: string, radius?: string }>`
    background: ${props => props.color || 'none'};
    cursor: pointer;
    user-select: none;
    display: inline-block;
    border: ${props => props.border || 'none'};
    border-radius: ${props => props.radius || '0px'};
    &:active {
        transform: translateY(1px);
    }
`;

export const Container = ({ children, ...props }: { children: any } & PropsOf<typeof Flex>) => {
    return (
        <Flex {...props}>
            <Base p="100px 20px" w="100%" mw="1200px">
                {children}
            </Base>
        </Flex>
    )
};

export const  Disabled = styled(Base)<{ disabled: boolean }>`
    ${props => props.disabled && css`
        opacity: .5;
        pointer-events: none;
    `};
`;


export const Table = styled(Base)`
    border-radius: 8px;
    overflow: hidden;
`;

export const Row = styled(Flex).attrs({
    align: 'center',
    justify: 'flex-start',
    w: '100%'
})`
    &:nth-child(2n+1) {
        background: #f1f1f1;
    }
`;

export const Item = styled(Flex)`
    padding: 8px 16px;
`;

