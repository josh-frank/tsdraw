import { FunctionComponent, useState } from "react"

// import { useAppSelector as useSelector } from "../hooks";

import styles from '../styles/Home.module.css'

const Drawer: FunctionComponent = () => {

    const [ showDrawer, setShowDrawer ] = useState( false );

    // const { dimensions, mouse, mouseDown } = useSelector( state => state.client );

    return (
        <div
            className={ `${ styles.drawer } ${ showDrawer ? styles.showDrawer : styles.hideDrawer }` }
        >
            <div className={ styles.drawerContent }>
                Drawer content
            </div>
            <button
                className={ `${ styles.drawerButton } ${ showDrawer ? styles.drawerButtonShowing : styles.drawerButtonHiding }` }
                onClick={ () => setShowDrawer( !showDrawer ) }
            >
                ▶
            </button>
        </div>
    );

}

export default Drawer;