import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, dndState } from "../atoms/dnd";
import Board from "../components/Board";
import { AiOutlineFolderAdd } from "react-icons/ai";
import ModalFrame from "../components/ModalFrame";
import { useForm } from "react-hook-form";
import Trash from "../components/Trash";
import Seo from "../ui/Seo";

export default function Home() {
  const [cards, setCards] = useRecoilState(dndState);
  const [boards, setBoards] = useRecoilState(boardState);
  const [isModal, setIsModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onDragEnd = (info: DropResult) => {
    if (!info.destination) return;

    const {
      draggableId,
      destination,
      destination: { index: DIndex },
      source,
      source: { index: OriIndex },
      type,
    } = info;

    if (type === "COLUMN") {
      setBoards((allBoards) => {
        const copyBoard = [...allBoards];
        copyBoard.splice(OriIndex, 1);
        copyBoard.splice(DIndex, 0, draggableId);
        return copyBoard;
      });
    }
    if (destination.droppableId === source.droppableId && type !== "COLUMN") {
      setCards((allBoards) => {
        const boardID = destination.droppableId;
        const copyBoard = [...allBoards[boardID]];

        const Item = allBoards[boardID].filter((el) => el.id === +draggableId);

        copyBoard.splice(OriIndex, 1);
        copyBoard.splice(DIndex, 0, Item[0]);
        return { ...allBoards, [boardID]: copyBoard };
      });
    }
    if (
      destination.droppableId !== source.droppableId &&
      destination.droppableId !== "trash"
    ) {
      setCards((allBoards) => {
        const fromBoard = source.droppableId;
        const toBoard = destination.droppableId;

        const Item = allBoards[fromBoard].filter(
          (el) => el.id === +draggableId
        );

        const copyFromBoard = [...allBoards[fromBoard]];
        const copyToBoard = [...allBoards[toBoard]];
        copyFromBoard.splice(OriIndex, 1);
        copyToBoard.splice(DIndex, 0, Item[0]);
        return {
          ...allBoards,
          [fromBoard]: copyFromBoard,
          [toBoard]: copyToBoard,
        };
      });
    }
    if (destination.droppableId === "trash") {
      setCards((allBoards) => {
        const fromBoard = source.droppableId;
        const copyFromBoard = [...allBoards[fromBoard]];
        copyFromBoard.splice(OriIndex, 1);
        return {
          ...allBoards,
          [fromBoard]: copyFromBoard,
        };
      });
    }
  };

  const handleMakeBoard = () => {
    setIsModal(true);
  };
  const handleModal = () => {
    setIsModal((prev) => !prev);
  };
  const handleAddBoard = (data: Record<string, string>) => {
    setCards((allBoard) => {
      return {
        ...allBoard,
        [data.board]: [],
      };
    });
    setBoards((allBoards) => {
      return [...allBoards, data.board];
    });
    reset();
    setIsModal(false);
  };

  return (
    <>
      <Seo />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Folder onClick={handleMakeBoard}>
            <AiOutlineFolderAdd />
          </Folder>

          {isModal && (
            <ModalFrame handleModal={handleModal}>
              <h1>Adding URL Board</h1>
              <hr />
              <Form onSubmit={handleSubmit(handleAddBoard)}>
                <input type="text" {...register("board")} />
                <button>보드 등록</button>
              </Form>
            </ModalFrame>
          )}

          <Droppable
            droppableId="boardSection"
            type="COLUMN"
            direction="horizontal"
          >
            {(magic) => (
              <Container ref={magic.innerRef} {...magic.droppableProps}>
                <Boards>
                  {boards.map((boardId, index) => (
                    <Board
                      cards={cards[boardId]}
                      boardId={boardId}
                      key={boardId}
                      index={index}
                    />
                  ))}
                  {magic.placeholder}
                </Boards>
              </Container>
            )}
          </Droppable>
        </Wrapper>
        <Trash />
      </DragDropContext>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* max-width: 680px; */
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Container = styled.div``;

const Boards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  /* display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr); */
`;
const Folder = styled.span`
  position: fixed;
  top: 3%;
  right: 3%;
  font-size: 1.3rem;
  cursor: pointer;
  color: white;
`;
const Form = styled.form`
  display: flex;
  margin-top: 20px;
  input {
    font-size: 1.2rem;
    padding: 10px 20px;
    border: 1px solid lightgray;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  button {
    border: none;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.bgColor};
    color: white;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
