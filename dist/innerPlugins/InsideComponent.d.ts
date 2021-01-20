interface IProps {
    children?: Node;
    onOutsideClick?: (event: MouseEvent) => void;
    onOutsideMouseOver?: (event: MouseEvent) => void;
}
declare const InsideComponent: ({ children, onOutsideClick, onOutsideMouseOver }: IProps) => any;
export default InsideComponent;
