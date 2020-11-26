import './App.css';
import { forwardRef, useState } from "react"

import { IconContext } from "react-icons"
import { FaReact } from "react-icons/fa"
import { MdAlarm } from "react-icons/md"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Modal from "react-modal"

import Tippy from "@tippy.js/react"
import "tippy.js/dist/tippy.css"

import CountUp, { useCountUp } from "react-countup"
import IdleTimerContainer from './components/IdleTimerContainer';

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

  const ColoredTooltip = () => {
    return <span style={{ color: "yellow" }}>Colored component</span>
  }

  const CustomChild = forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <div>first line</div>        
        <div>second line</div>
      </div>
    )
  })

  const { countUp, start, pauseResume, reset, update } = useCountUp({ dureation: 5, end: 1000, startOnMount: false})

  return (
    <IconContext.Provider value={{ color:"blue", size:"5rem"}} >
    <div className="App">
      <FaReact />
      <MdAlarm />

      <hr/>

      <button onClick={notify}>Notify</button>

      <hr/>

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

      <hr/>

        <div style={{ paddingBottom: "20px" }}>
          <Tippy placement='right'arrow={false} delay={1000} content="Basic Tooltip">
            <button>Hover</button>
          </Tippy>
      </div>

      <div style={{ paddingBottom: "20px" }}>
          <Tippy content={<span style={{ color: "orange"}}>Colored</span>}>
            <button>Hover</button>
          </Tippy>
      </div>

      <div style={{ paddingBottom: "20px" }}>
          <Tippy content={<ColoredTooltip></ ColoredTooltip>}>
            <button>Hover</button>
          </Tippy>
      </div>

      <div style={{ paddingBottom: "20px" }}>
          <Tippy content={<ColoredTooltip></ColoredTooltip>}>
           <CustomChild></CustomChild>
          </Tippy>
      </div>

      <hr/>

      <div>
        <h1>{countUp}</h1>
        <button onClick={start}>Start</button>
        <button onClick={reset}>Reset</button>
        <button onClick={pauseResume}>Pause / Resume</button>
        <button onClick={() => update(2000)}>Update to 2000</button>
      </div>

      <h1><CountUp end={200}/></h1>
      <br/>
      <h1><CountUp end={200} duration={5}/></h1>
      <br/>
      <h1><CountUp start={500} end={1000} duration={5} prefix='$' decimals={2}/></h1>
      <br/>
      <h1><CountUp end={1000} duration={10} suffix='USD' decimals={2}/></h1>

      <hr/>

      <IdleTimerContainer></IdleTimerContainer>
    </div>
    </IconContext.Provider>
  );
}

export default App;
