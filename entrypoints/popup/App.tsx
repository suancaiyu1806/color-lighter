import { useState } from "react";
import "./App.css";
import { sendMessageToCurContentScript } from "../message/common/send-to-content";
import { MODE } from "../constant/global";

function App() {
  const [isGrey, setIsGrey] = useState(false);

  const onClick = ()=>{
    sendMessageToCurContentScript({action: MODE.GREY})
    setIsGrey(!isGrey)
  }

  // TODO: 开关控制
  // TODO: 主题选择 黑白/变淡
  return (
    <>
      <div className="card">
        <button onClick={onClick}>
          点击开启黑白模式
        </button>
      </div>
    </>
  );
}

export default App;
