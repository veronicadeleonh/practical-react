import './App.css';
import { useState } from "react"

import { IconContext } from "react-icons"
import { FaReact } from "react-icons/fa"
import { MdAlarm } from "react-icons/md"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Modal from "react-modal"

const CustomToast = ({ closeToast }) => {
  return (
    <div>
      Something went wrong!
      <button onClick={closeToast}>Close</button>
    </div>
  )
}

toast.configure()
Modal.setAppElement("#root")

function App() {

  const notify = () => {
    toast("Basic notification", {position: toast.POSITION.TOP_LEFT})
    toast.success("Success notification", {position: toast.POSITION.TOP_CENTER, autoClose: 8000})
    toast.info("Info notification", {position: toast.POSITION.TOP_RIGHT, autoClose: false})
    toast.warn(<CustomToast/>, {position: toast.POSITION.BOTTOM_LEFT})
    toast.error("Error notification", {position: toast.POSITION.BOTTOM_CENTER})
    toast("Basic notification", {position: toast.POSITION.BOTTOM_RIGHT})
  }

  const [ modalIsOpen, setModalIsOpen ] = useState(false)

  return (
    <IconContext.Provider value={{ color:"blue", size:"5rem"}} >
    <div className="App">
      <FaReact />
      <MdAlarm />

      <button onClick={notify}>Notify</button>
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button>

      <Modal 
        isOpen={modalIsOpen} 
      //  shouldCloseOnOverlayClick={false} 
        onRequestClose={() => setModalIsOpen(false)}
        style={
          {
            overlay: {
              backgroundColor: "grey"
            },
            content: {
              color: "orange"
            }
          }
        }
        >
        <h2>Modal title</h2>
        <p>Modal body</p>

        <div>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>

    </div>
    </IconContext.Provider>
  );
}

export default App;
