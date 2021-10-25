import { FunctionComponent, useState } from "react"
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../hooks";
import { selectAppMode, setAppMode } from "../redux/modeSlice";

import styles from '../styles/Home.module.css'

const Drawer: FunctionComponent = () => {

    const [ showDrawer, setShowDrawer ] = useState( false );

    const dispatch = useDispatch();

    const appMode = useSelector( selectAppMode );

    return (
        <div
            className={ `${ styles.drawer } ${ showDrawer ? styles.showDrawer : styles.hideDrawer }` }
        >
            <div className={ styles.drawerContent }>
                <button
                    onClick={ () => dispatch( setAppMode( "pan" ) ) }
                    disabled={ appMode === "pan" }
                >
                    🖐
                </button>
                <button
                    onClick={ () => dispatch( setAppMode( "pen" ) ) }
                    disabled={ appMode === "pen" }
                >
                    ✒️
                </button>
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
