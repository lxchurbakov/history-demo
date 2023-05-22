import React from 'react';
import styled, { css } from 'styled-components';

// import { PropsOf } from '/src/libs/utils';

import { ArrowDownShort } from '@styled-icons/bootstrap/ArrowDownShort';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';

import { BaseProps, Base, Flex, Card, Text , Clickable } from './atoms';
// import { colors } from '/src/libs/theme';

type StyledProps = { className?: string, style?: React.CSSProperties };
type CursorOption = 'pointer' | 'text';
type PropsOf<T> = T extends React.FC<infer P> ? P : never;

const InputWrap = styled(Flex)<{ cursor: CursorOption }>`
    background: white;
    padding: 12px 16px;
    cursor: ${props => props.cursor};
    border-radius: 8px;
`;

const InputCore = styled.input<{ hasPrefix: boolean, cursor: CursorOption }>`
    background: none;
    border: none;
    font-family: Raleway;
    font-size: 18px;
    font-weight: 400;
    width: 100%;
    box-sizing: border-box;
    cursor: ${props => props.cursor};

    &:focus {
        outline: none;
    }
`;

export const StringInput = ({ value, onChange, placeholder, prefix, suffix, cursor, onFocus, onBlur, ...props }: {
    value: string; onChange: (value: string) => void; placeholder?: string; 
    prefix?: React.ReactNode; suffix?: React.ReactNode; cursor?: CursorOption;
    onFocus?: () => void; onBlur?: () => void;
} & StyledProps & BaseProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value || ''), [onChange]);
    const focus = React.useCallback(() => inputRef.current?.focus(), []);

    return (
        <InputWrap onClick={focus} cursor={cursor || 'text'} align="flex-start" {...props}>
            {prefix && <Base mr="12px">{prefix}</Base>}

            <InputCore 
                ref={inputRef}
                hasPrefix={!!prefix} 
                placeholder={placeholder} 
                value={value} 
                onChange={handler}
                cursor={cursor || 'text'}
                onFocus={onFocus}
                onBlur={onBlur}
            />

            {suffix && <Base ml="12px">{suffix}</Base>}
        </InputWrap>
    );
};

const DropdownBase= styled(Base)`
    position: relative;
`;

const DropdownCard = styled(Card)`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
    background: white;
    z-index: 10;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .12);
`;

const DropdownOption = styled(Base)`
    padding: 12px;
    cursor: pointer;

    &:hover {
        background: #f1f1f1;
    }
`;

export const OptionsInput = <T extends string>({ value, onChange, options, placeholder, prefix, ...props }: {
    value: T | null, options: { value: T, label: string }[], onChange: (value: T | null) => void, placeholder?: string,
} & Pick<PropsOf<typeof StringInput>, 'prefix'> & StyledProps & BaseProps) => {
    const label = React.useMemo(() => options.find(($) => $.value === value)?.label || '', [options, value]);
    const [isOpen, setIsOpen] = React.useState(false);
    const open = React.useCallback(() => setIsOpen(true), [setIsOpen]);
    const close = React.useCallback(() => setTimeout(() => setIsOpen(false), 100), [setIsOpen]);

    return (
        <DropdownBase {...props}>
            <StringInput 
                placeholder={placeholder}
                prefix={prefix}
                value={label} 
                onChange={() => {}} 
                cursor="pointer" 
                suffix={value === null ? (
                    <ArrowDownShort style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, marginRight: '-4px' }} width={24} color="#333" />
                ) : (
                    <CloseOutline width={24} color="#333" onClick={() => onChange(null)} />
                )}
                onFocus={open}
                onBlur={close}
            />

            {isOpen && (
                <DropdownCard>
                    {options.map((option) => (
                        <DropdownOption  key={option.value} onClick={() => onChange(option.value)}>
                            <Text size={16} weight={400} color="#333">{option.label}</Text>
                        </DropdownOption>
                    ))}
                </DropdownCard>
            )}
        </DropdownBase>
    );
};


// const Checkbox = styled.div`
//     position: relative;
//     background: #232426;
//     border: 2px solid #4C4D4F;
//     width: 20px;
//     height: 20px;
//     border-radius: 4px;
    
//     ${props => props.value && css`
//         // background border-color
//         &::after {
//             display: block;
//             position: absolute;
//             top: 2px;
//             content: " ";
//             width:16px;
//             height: 8px;
//             border-top: 3px solid white;
//             border-right: 3px solid white;
//             transform: rotate(135deg);
//         }
//     `};
// `;

// export const BooleanInput = ({ value, onChange, ...props }: { value: boolean, onChange: ($: boolean) => void } & BaseProps) => {
//     return (
//         <Clickable color="none" onClick={() => onChange(!value)} {...props}>
//             <Checkbox value={value} />
//         </Clickable>
//     );
// };
