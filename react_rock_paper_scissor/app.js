const { useState, useEffect } = React;

    function GameGround({ playerInfo }) {
        const [countRound, setCoundRound] = useState(0);
        const [endGame, setEndGame] = useState(false);
        const [runningHands, setRunningHand] = useState([]);
        const handOptions = ["rock", "paper", "scissors"];
        const [yourScore, setYourScore] = useState(0);
        const [aiScore, setAiScore] = useState(0);
        const [finalWinner, setFinalWinner] = useState("");
        const checkRoundLimit = () => {
            if (countRound == playerInfo.round) {
                setEndGame(true);
            }
        };
        const checkFinalWinner = () => {
            if(yourScore > aiScore){
                setFinalWinner(playerInfo.name + " Won");
            }else if(yourScore < aiScore){
                setFinalWinner("Computer Won")
            }else if(yourScore == aiScore){
                setFinalWinner("Draw")
            }
        }
        const playGameWith = (hand) => {
            let rand = Math.floor(Math.random() * 3);
            setRunningHand([hand, handOptions[rand]]);
            setCoundRound(countRound + 1);
        };
        const checkWinner = () => {
            if (runningHands[0] == "rock") {
                if (runningHands[1] == "paper") {
                    return 1;
                } else if (runningHands[1] == "scissors") {
                    return 0;
                }
            }
            if (runningHands[0] == "paper") {
                if (runningHands[1] == "scissors") {
                    return 1;
                } else if (runningHands[1] == "rock") {
                    return 0;
                }
            }
            if (runningHands[0] == "scissors") {
                if (runningHands[1] == "rock") {
                    return 1;
                } else if (runningHands[1] == "paper") {
                    return 0;
                }
            }
            return 2;
        };

        const giveScore = (player) => {
            if(player == 0){
                setYourScore(yourScore + 1);
            }else if(player == 1){
                setAiScore(aiScore + 1);
            }
            checkFinalWinner();
        }
        useEffect(() => {
            giveScore(checkWinner());
        }, [runningHands]);
        useEffect(() => {
            checkRoundLimit();
        }, [countRound]);
        if (endGame) {
            return <div className="finalResultBox">
                <h3>{finalWinner}</h3>
                <button className="startGameBtn" onClick={() => location.reload()}>Play Again</button>
            </div>;
        }
        return (
            <div className="playingGround">
                <div className="resultboard">
                    <p>
                        {playerInfo.name}: <strong>{yourScore}</strong>
                    </p>
                    <p>
                        Computer: <strong>{aiScore}</strong>
                    </p>
                </div>
                <div className="gameGround">
                    <div className="firstPlayerArea">
                        <i className={`fas fa-hand-${runningHands[0]}`}></i>
                    </div>
                    <div className="scndPlayerArea">
                        <i className={`fas fa-hand-${runningHands[1]}`}></i>
                    </div>
                </div>
                <div className="optionHands">
                    <p onClick={() => playGameWith("rock")}>
          <span>
            <i className="fas fa-hand-rock"></i>
          </span>
                        <span>Rock</span>
                    </p>
                    <p onClick={() => playGameWith("paper")}>
          <span>
            <i className="fas fa-hand-paper"></i>
          </span>
                        <span>Paper</span>
                    </p>
                    <p onClick={() => playGameWith("scissors")}>
          <span>
            <i className="fas fa-hand-scissors"></i>
          </span>
                        <span>Scissor</span>
                    </p>
                </div>
            </div>
        );
    }

    function Game() {
        const [playerName, setPlayerName] = useState("");
        const [playRound, setPlayRound] = useState(0);
        const [playerInfo, setPlayerInfo] = useState({});
        const [gameStartStatus, setGameStartStatus] = useState(false);
        const submitHandler = (e) => {
            e.preventDefault();
            setPlayerInfo({
                name: playerName,
                round: playRound
            });
            setGameStartStatus(true);
        };
        return (
            <div className="Game">
                <h1 className="gameTitle">Rock, Paper, Scissor</h1>
                {!gameStartStatus && (
                    <div className="gameStarter">
                        <p className="gameLabel">Write your name and play round</p>
                        <form onSubmit={submitHandler}>
                            <input
                                type="text"
                                placeholder="Player Name"
                                onChange={(e) => setPlayerName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Round to play"
                                onChange={(e) => setPlayRound(e.target.value)}
                                required
                            />
                            <button type="submit" className="startGameBtn">
                                Start Game
                            </button>
                        </form>
                    </div>
                )}
                {gameStartStatus && <GameGround playerInfo={playerInfo} />}
            </div>
        );
    }
    ReactDOM.render(<Game />, document.getElementById("root"));
