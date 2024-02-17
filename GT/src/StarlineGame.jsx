import topBackground from "./Images/bg.png";
import chart from "./Images/chart.png";
import close from "./Images/close.png";
import open from "./Images/play.png";
import { useEffect, useState } from "react";
import useStarline from "./Hooks/useStarline";

function StarlineGame() {
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([{}]);
  const centerstyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "-4px",
  };
  const laststyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };
  const imgstyle = {
    width: "50px",
    height: "auto",
    marginTop: "-4px",
  };
  const resinfo = useStarline();
  useEffect(() => {
    if (resinfo && resinfo["result"]) {
      setStatus(true);
      setGameRates(resinfo["result"]);
    }
  }, [resinfo]);

  // console.log(resinfo['result']);
  console.log(gameRates);

  return (
    <div>
      {gameRates.map((game) => (
        <div key={game.game_id} className="mb-5">
          <div className="bg-blue-500 flex justify-between items-center pt-1 pl-2 pr-2 pb-9 ml-2 mr-4 h-35 rounded-xl border border-white text-white">
            <p className="top-0 right-0">{game.game_name}</p>
            <p>00.00.00</p>
          </div>
          <div className="bg-white mr-2 ml-4 z-2 -mt-7 p-1 flex flex-col rounded-3xl border">
            <div className="flex justify-center items-center">
            <p>******</p>             
            </div>
          <div style={centerstyle}>
              <div>
                <img src={chart} style={imgstyle} alt="" />
              </div>
              <div className={`text-${game.msg_status === 2 ? "red" : "green"}-500 text-sm flex justify-center items-center`}>
              {game.msg_status === 2 ? "Market Closed" : "Market Running"}
            </div>
              <button>
                <img src={game.msg_status === 2 ? close : open} style={imgstyle} alt="" />
              </button>
            </div>
            <div style={laststyle}>
              <p className="text-green-500">Open - 10.05AM </p>
              <p className="text-red-500">Close - 12.05PM </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default StarlineGame;