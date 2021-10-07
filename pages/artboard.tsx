import { FunctionComponent } from "react"

import { useAppSelector as useSelector } from "../hooks";

import styles from '../styles/Home.module.css'

const Artboard: FunctionComponent = () => {

    const { dimensions, mouse, mouseDown } = useSelector( state => state.client );

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className={ styles.artboard }
            width={ dimensions?.width }
            height={ dimensions?.height }
            viewBox={ `0 0 ${ dimensions?.width } ${ dimensions?.height }` }
        >
            { mouseDown && <circle cx={ mouse.x } cy={ mouse.y } r="10" fill="black"></circle> }
        </svg>
    );

}

export default Artboard;