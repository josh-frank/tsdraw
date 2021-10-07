import { FunctionComponent } from "react"

import { useAppSelector as useSelector } from "../hooks";

import styles from '../styles/Home.module.css'

const Artboard: FunctionComponent = () => {

    const clientDimensions = useSelector( state => state.client.dimensions );

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className={ styles.artboard }
            width={ clientDimensions.width }
            height={ clientDimensions.height }
            viewBox={ `0 0 ${ clientDimensions.width } ${ clientDimensions.height }` }
        >
        </svg>
    );

}

export default Artboard;