import { Grid, Grow, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Board as IBoard } from "../../interfaces/board";
import { useStore } from "../../store/store";
import { FastAverageColor } from "fast-average-color";
import { NewBoardCard } from "./NewBoardCard";

import css from "./BoardIndex.module.scss";
import cardCss from "./BoardCard.module.scss";
import { Board } from "./Board";
import { Header } from "../Header";
import { useEffect, useState } from "react";
import { render } from "react-dom";

export interface BoardIndexProps {}

export const BoardIndex = observer(() => {
  const { boardStore } = useStore();

  useEffect(() => {
    if (!boardStore.activeBoard) {
      setColor("#000000");
    }
  }, [boardStore.activeBoard]);

  const [color, setColor] = useState("#000000");
  if (boardStore.activeBoard?.backgroundImageUrl) {
    const fac = new FastAverageColor();
    const img = new Image();
    img.src = boardStore.activeBoard.backgroundImageUrl;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      fac.getColorAsync(img).then((c) => {
        setColor(c.rgba);
      });
    };
  }

  const renderBoards = () => {
    const boardsCards = [];
    for (let value of boardStore.boards.values()) {
      boardsCards.push(<BoardCard board={value} key={value.id} />);
    }
    return boardsCards;
  };

  return (
    <>
      <Header color={color} />

      {boardStore.activeBoard?.id ? (
        <Board board={boardStore.activeBoard} backgroundColor={color} />
      ) : (
        <Paper className={css.container}>
          <h6 className={css.label}>Select Board </h6>
          <div className={css.cards}>{renderBoards()} </div>

          {/* <NewBoardCard /> */}
        </Paper>
      )}
    </>
  );
});
interface BoardCardProps {
  board: IBoard;
}
const BoardCard = observer(({ board }: BoardCardProps) => {
  const { boardStore } = useStore();
  const image = board.backgroundImageUrl + "/300x150";

  const [color, setColor] = useState("#000000");

  const getColor = (imageURL: string | undefined) => {
    if (!imageURL) return;
    const fac = new FastAverageColor();
    const img = new Image();
    img.src = imageURL;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      fac.getColorAsync(img).then((c) => {
        setColor(c.rgba);
      });
    };
  };

  getColor(board.backgroundImageUrl);

  const style = {
    backgroundImage: `url(${image})`,
    linearGradient: "to bottom, black, 30px, url(${image})",
  };
  return (
    <Grow in={true} timeout={500}>
      <Paper
        style={style}
        onClick={() => boardStore.setActiveBoard(board.id)}
        className={cardCss.card}
      >
        <Typography
          style={{ backgroundColor: color }}
          variant="h6"
          className="header"
          color="white"
        >
          {board.name}
        </Typography>
      </Paper>
    </Grow>
  );
});
