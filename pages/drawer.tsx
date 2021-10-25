import { FunctionComponent, useState } from "react"
import { useAppSelector as useSelector } from "../hooks";
import { selectAppMode } from "../redux/modeSlice";

import styles from '../styles/Home.module.css'

const Drawer: FunctionComponent = () => {

    const [ showDrawer, setShowDrawer ] = useState( false );

    const appMode = useSelector( selectAppMode );

    return (
        <div
            className={ `${ styles.drawer } ${ showDrawer ? styles.showDrawer : styles.hideDrawer }` }
        >
            <div className={ styles.drawerContent }>
                <button disabled={ appMode === "pan" }>🖐</button>
            </div>
            <button
                data-name="drawer-button"
                className={ `${ styles.drawerButton } ${ showDrawer ? styles.drawerButtonShowing : styles.drawerButtonHiding }` }
                onClick={ () => setShowDrawer( !showDrawer ) }
            >
                ▶
            </button>
        </div>
    );

}

export default Drawer;
