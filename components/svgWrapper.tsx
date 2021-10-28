import { FunctionComponent } from "react";

import styles from '../styles/Home.module.css'

import { useAppSelector as useSelector } from "../hooks";
import { selectClientDimensions } from "../redux/clientSlice";
import { selectOffset } from "../redux/artboardSlice";

const SvgWrapper: FunctionComponent = ( { children } ) => {

    const dimensions = useSelector( selectClientDimensions ) || 0;
    const offset = useSelector( selectOffset ) || 0;

    return (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className={ styles.svgWrapper }
          width={ dimensions.width }
          height={ dimensions.height }
          viewBox={ `${ -offset.x } ${ -offset.y } ${ dimensions.width } ${ dimensions.height }` }
      >
          { children }
      </svg>
    );

};

export default SvgWrapper;
