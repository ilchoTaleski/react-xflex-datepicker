import React, { useRef, useEffect } from 'react';

interface IProps {
    children?: Node;
    onOutsideClick?: (event: MouseEvent) => void;
    onOutsideMouseOver?: (event: MouseEvent) => void;
}

const InsideComponent = ({ children, onOutsideClick = () => {}, onOutsideMouseOver = () => {} }: IProps) => {
    let node = useRef();
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (node.current && node.current.contains(e.target)) {
                // inside click
                return;
            }
            onOutsideClick(e);
        };
        const handleMouseOver = (e: MouseEvent) => {
            if (node.current && node.current.contains(e.target)) {
                // inside click
                return;
            }
            onOutsideMouseOver(e);
        };
        if (typeof document !== 'undefined') {
            document?.removeEventListener('mouseover', handleMouseOver);
            document?.addEventListener('mousedown', handleClick);
            document?.addEventListener('mouseover', handleMouseOver);
        }

        return () => {
            if (typeof document !== 'undefined') {
                document?.removeEventListener('mousedown', handleClick);
                document?.removeEventListener('mouseover', handleMouseOver);
            }
        };
    }, [onOutsideMouseOver]);

    return <div ref={node}>{children}</div>;
};

export default InsideComponent;
