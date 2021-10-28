import { FunctionComponent } from "react";

import styles from '../styles/Home.module.css'

import { useAppSelector as useSelector } from "../hooks";
import { selectClientDimensions } from "../redux/clientSlice";
import { selectOffset } from "../redux/artboardSlice";

const SvgWrapper: FunctionComponent = ( { children } ) => {

    const dimensions = useSelector( selectClientDimensions );
    const offset = useSelector( selectOffset );

    return (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className={ styles.svgWrapper }
          width={ dimensions?.width || 0 }
          height={ dimensions?.height || 0 }
          viewBox={ `${ -offset?.x || 0 } ${ -offset?.y || 0 } ${ dimensions?.width || 0 } ${ dimensions?.height || 0 }` }
      >
          { children }
      </svg>
    );

};

export default SvgWrapper;
