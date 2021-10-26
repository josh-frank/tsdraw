import { FunctionComponent, useState } from "react"

import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../hooks";

import { selectArtboardDimensions, selectDarkMode, selectDisplayGrid, selectGridInterval, selectOffset, selectSnapToGrid, selectZoom, setArtboardDimensions, setGridInterval, setOffset, setZoom, toggleGridDisplay, toggleSnapToGrid } from "../redux/artboardSlice";

import styles from '../styles/Home.module.css'

interface OptionField {
    name: string;
    value: number;
}

const ArtboardOptions: FunctionComponent = () => {

    const [ showDrawer, setShowDrawer ] = useState( false );
    const [ activeInputField, setActiveInputField ] = useState<OptionField | null>( null );

    const dispatch = useDispatch();

    const artboardDimensions = useSelector( selectArtboardDimensions );
    const zoom = useSelector( selectZoom );
    const offset = useSelector( selectOffset );
    const displayGrid = useSelector( selectDisplayGrid );
    const snapToGrid = useSelector( selectSnapToGrid );
    const gridInterval = useSelector( selectGridInterval );
    const darkMode = useSelector( selectDarkMode );

    const dispatchArtboardUpdate = () => {
        if ( activeInputField ) switch ( activeInputField.name ) {
            case "artboard-width":
                dispatch( setArtboardDimensions( { width: activeInputField.value, height: artboardDimensions.height } ) );
                break;
            case "artboard-height":
                dispatch( setArtboardDimensions( { width: artboardDimensions.width, height: activeInputField.value } ) );
                break;
            case "zoom":
                dispatch( setZoom( activeInputField.value ) );
                break;
            case "offset-x":
                dispatch( setOffset( { x: activeInputField.value, y: offset.y } ) );
                break;
            case "offset-y":
                dispatch( setOffset( { x: offset.x, y: activeInputField.value } ) );
                break;
            case "grid-interval":
                dispatch( setGridInterval( activeInputField.value ) );
                break;
            default: break;
        }
        setActiveInputField( null );
    }

    return (
        <div
            data-name="drawer"
            className={ `${ styles.artboardOptions } ${ showDrawer ? styles.showArtboardOptions : styles.hideArtboardOptions }` }
        >
            <button
                data-name="artboard-options-button"
                className={ `${ styles.drawerButton } ${ showDrawer ? styles.drawerButtonShowing : styles.drawerButtonHiding }` }
                onClick={ () => setShowDrawer( !showDrawer ) }
            >
                ▲
            </button>
            <div
                data-name="drawer-content"
                className={ styles.artboardOptionsContent }
            >
                📐 <input
                    style={ { width: `${ artboardDimensions.width.toString().length + 1 }ch` } }
                    name="artboard-width"
                    value={ activeInputField && activeInputField.name === "artboard-width" ? activeInputField.value : artboardDimensions.width }
                    onFocus={ () => setActiveInputField( { name: "artboard-width", value: artboardDimensions.width } ) }
                    onChange={ inputFieldChangeEvent => setActiveInputField( { name: "artboard-width", value: parseFloat( inputFieldChangeEvent.target.value ) } ) }
                    onBlur={ dispatchArtboardUpdate }
                /> x <input
                    style={ { width: `${ artboardDimensions.height.toString().length + 1 }ch` } }
                    name="artboard-height"
                    value={ activeInputField && activeInputField.name === "artboard-height" ? activeInputField.value : artboardDimensions.height }
                    onFocus={ () => setActiveInputField( { name: "artboard-height", value: artboardDimensions.height } ) }
                    onChange={ inputFieldChangeEvent => setActiveInputField( { name: "artboard-height", value: parseFloat( inputFieldChangeEvent.target.value ) } ) }
                    onBlur={ dispatchArtboardUpdate }
                /> • 🔎 <input
                    style={ { width: `${ zoom.toString().length + 1 }ch` } }
                    name="zoom"
                    value={ activeInputField && activeInputField.name === "zoom" ? activeInputField.value : zoom }
                    onFocus={ () => setActiveInputField( { name: "zoom", value: zoom } ) }
                    onChange={ inputFieldChangeEvent => setActiveInputField( { name: "zoom", value: parseFloat( inputFieldChangeEvent.target.value ) } ) }
                    onBlur={ dispatchArtboardUpdate }
                />% • 🖐 <input
                    style={ { width: `${ offset.x.toString().length + 1 }ch` } }
                    name="offset-x"
                    value={ activeInputField && activeInputField.name === "offset-x" ? activeInputField.value : offset.x }
                    onFocus={ () => setActiveInputField( { name: "offset-x", value: offset.x } ) }
                    onChange={ inputFieldChangeEvent => setActiveInputField( { name: "offset-x", value: parseFloat( inputFieldChangeEvent.target.value ) } ) }
                    onBlur={ dispatchArtboardUpdate }
                />, <input
                    style={ { width: `${ offset.y.toString().length + 1 }ch` } }
                    name="offset-y"
                    value={ activeInputField && activeInputField.name === "offset-y" ? activeInputField.value : offset.y }
                    onFocus={ () => setActiveInputField( { name: "offset-y", value: offset.y } ) }
                    onChange={ inputFieldChangeEvent => setActiveInputField( { name: "offset-y", value: parseFloat( inputFieldChangeEvent.target.value ) } ) }
                    onBlur={ dispatchArtboardUpdate }
                /> • <input
                    type="checkbox"
                    name="display-grid"
                    defaultChecked={ displayGrid }
                    onClick={ () => dispatch( toggleGridDisplay() ) }
                /> ⌗ • <input
                    type="checkbox"
                    name="snap-to-grid"
                    defaultChecked={ snapToGrid }
                    onClick={ () => dispatch( toggleSnapToGrid() ) }
                /> 👌 • Interval:<input
                    style={ { width: `${ gridInterval.toString().length + 1 }ch` } }
                    name="grid-interval"
                    value={ activeInputField && activeInputField.name === "grid-interval" ? activeInputField.value : gridInterval }
                    onFocus={ () => setActiveInputField( { name: "grid-interval", value: gridInterval } ) }
                    onChange={ inputFieldChangeEvent => setActiveInputField( { name: "grid-interval", value: parseFloat( inputFieldChangeEvent.target.value ) } ) }
                    onBlur={ dispatchArtboardUpdate }
                />
            </div>
        </div>
    );

}

export default ArtboardOptions;
