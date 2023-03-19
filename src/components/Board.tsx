import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dndState, IState } from "../atoms/dnd";
import ModalFrame from "./ModalFrame";
import { BiAddToQueue } from "react-icons/bi";
import { RxDragHandleDots2 } from "react-icons/rx";
import CardBody from "./CardBody";

export interface IBoardProps {
  cards: IState[];
  boardId: string;
  index: number;
}
interface IFrom {
  text: string;
  url: string;
}

function Board({ cards, boardId, index }: IBoardProps) {
  const setDnds = useSetRecoilState(dndState);
  const [isModal, setIsModal] = useState(false);
  const handleModal = () => setIsModal((prev) => !prev);
  const { register, handleSubmit, reset } = useForm<IFrom>();
  const onSubmit = (data: IFrom) => {
    const newItem = { ...data, id: Date.now() };

    setDnds((oldList) => {
      const copyList = [...oldList[boardId], newItem];
      return { ...oldList, [boardId]: copyList };
    });
    reset();
    setIsModal(false);
  };

  return (
    <>
      <Draggable key={boardId} draggableId={boardId + ""} index={index}>
        {(magic) => (
          <Wrapper ref={magic.innerRef} {...magic.draggableProps}>
            <FlexWrapper>
              <Title>{boardId}</Title>
              <Adding
                onClick={() => {
                  setIsModal(true);
                }}
              >
                <BiAddToQueue />
                <span {...magic.dragHandleProps}>
                  <RxDragHandleDots2 />
                </span>
              </Adding>
            </FlexWrapper>
            <CardBody cards={cards} boardId={boardId} />
          </Wrapper>
        )}
      </Draggable>

      {isModal && (
        <ModalFrame handleModal={handleModal}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("text", { required: true })}
              type="text"
              placeholder={`Add Name in ${boardId}`}
            />
            <input
              {...register("url", { required: true })}
              type="text"
              placeholder={`Add URL in ${boardId}`}
            />
            <button>Save</button>
          </Form>
        </ModalFrame>
      )}
    </>
  );
}
export default React.memo(Board);

const Title = styled.h3`
  text-align: center;
  font-weight: bold;
  flex-grow: 1;
`;
const Wrapper = styled.div`
  width: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  input {
    font-size: 1.2rem;
    padding: 10px 20px;
    margin-bottom: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  button {
    border: none;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.bgColor};
    color: white;
    border-radius: 5px;
  }
`;
const Adding = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`;
