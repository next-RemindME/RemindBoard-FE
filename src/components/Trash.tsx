import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { GoTrashcan } from "react-icons/go";
import styled from "styled-components";

export default function Trash() {
  return (
    <Droppable droppableId="trash">
      {(magic) => (
        <StTrash ref={magic.innerRef} {...magic.droppableProps}>
          <GoTrashcan />
        </StTrash>
      )}
    </Droppable>
  );
}

const StTrash = styled.span`
  position: fixed;
  bottom: 3%;
  right: 3%;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
`;
