import topBackground from "./Images/bg.png";
import chart from "./Images/chart.png";
import close from "./Images/close.png";
import open from "./Images/play.png";
import { useEffect, useState } from "react";
import useStarline from "./Hooks/useStarline";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TimerStar from "./TimerStar";
import useGaliGameFront from "./Hooks/useGaliGameFront";

function GALIGAME() {
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([{}]);
  const unique = useSelector((state) => state.userDetail.token);

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
  const resinfo = useGaliGameFront();
  useEffect(() => {
    if (resinfo && resinfo["result"]) {
      setStatus(true);
      setGameRates(resinfo["result"]);
    }
  }, [resinfo]);

  // console.log(resinfo['result']);

  // console.log(gameRates);

  // console.log(resinfo);
  const navigate = useNavigate();

  return (
    <div>
      {gameRates.map((game) => (
        <div key={game.game_id} className="mb-5">
          <div className="bg-blue-500 flex justify-between items-center pt-1 pl-2 pr-2 pb-9 ml-2 mr-4 h-35 rounded-xl border border-white text-white">
            <p className="top-0 right-0">{game.game_name}</p>
            
          </div>
          <div className="bg-white mr-2 ml-4 z-2 -mt-7 p-1 flex flex-col rounded-3xl border">
            
            <div style={centerstyle}>
              <div className="mt-8 ml-4">
                <p className="text-custom-purple">**</p>
              </div>
              <div
                className={`text-${
                  game.msg_status === 2 ? "red" : "green"
                }-500 text-sm flex justify-center items-center`}
              >
                {game.msg_status === 2 ? "Market Closed" : "Market Running"}
              </div>
              <button
                onClick={() => {
                  // console.log(game.msg_status)
                  if (game.msg_status === 1) {
                    navigate("/galiallgame", {
                      state: {
                        gameId: game.game_id,
                        openTime: game.open_time,
                        gameName: game.game_name,
                      },
                    });
                  }
                }}
              >
                <img
                  src={game.msg_status === 2 ? close : open}
                  style={imgstyle}
                  alt=""
                />
              </button>
            </div>
            <div className="flex justify-center items-center">
              <p>Open Time : {game.open_time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default GALIGAME;
