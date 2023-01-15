import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { createPortal } from "react-dom";
import { BsXSquare } from 'react-icons/bs';
import { Overlay, ModalContent, ButtonIcons } from "./Modal.styled";


const modalRoot = document.querySelector('#modal-root')

const style = {width: '32px', height: '32px', color: 'red'}

const  Modal = ({children, onClose}) => {
    
    const handleKeyDown = e => {
        if(e.code === 'Escape'){
            onClose()
        }
    }

    const handleBackdropClose = e => {
        if(e.target === e.currentTarget){
            onClose()
        }
    }
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        
        return () => window.removeEventListener('keydown', handleKeyDown)
    })
    
    return (
            createPortal(
                <>
                <Overlay onClick={handleBackdropClose}>
                <ButtonIcons onClick={onClose} type='button'>
            <BsXSquare style={style}/>
        </ButtonIcons>
      <ModalContent>
        {children}
      </ModalContent>
    </Overlay>
                </>
            ,modalRoot)
        )
}

export default Modal;

// class Modal extends Component {
    
//     componentDidMount(){
//         window.addEventListener('keydown', this.handleKeyDown)
        
//     }

//     componentWillUnmount(){
//         window.removeEventListener('keydown', this.handleKeyDown)
//     }

//     handleBackdropClose = e => {
//         if(e.target === e.currentTarget){
//             this.props.onClose()
            
//         }
//     }
    
//     handleKeyDown = e => {
//         if(e.code === 'Escape'){
//             this.props.onClose()
//         }
//     }

//     render() {
//         const {children, onClose} = this.props
        
//         return (
//             createPortal(
//                 <>
//                 <Overlay onClick={this.handleBackdropClose}>
//                 <ButtonIcons onClick={onClose} type='button'>
//             <BsXSquare style={style}/>
//         </ButtonIcons>
//       <ModalContent>
//         {children}
//       </ModalContent>
//     </Overlay>
//                 </>
//             ,modalRoot)
//         )
//     }
// }

// export default Modal;

Modal.propTypes = {
    children: PropTypes.object.isRequired,
}