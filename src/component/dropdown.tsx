import React, {useState} from "react";
import styled from "styled-components";

const DropdownComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, .5);
  padding: 10px 20px;
  border-radius: 7px;
  text-align: right;
  align-items: flex-end;
  cursor: pointer;
`;

const DropdownValue = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
`;

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  box-sizing: border-box;
`;

const DropdownItem = styled.li`
  padding: 6px 0;
  text-align: right;
`;

const DropdownLabel = styled.label`
  padding: 6px 0;
`;

function Dropdown({items = [], onChange = (args) => void 0, label = ""}) {
  const [item, setItem] = useState({title: "Any"});
  const [state, setState] = useState(false);

  return (
    <DropdownComponent>
      <DropdownLabel>{label}</DropdownLabel>

      <DropdownContent onClick={() => setState(!state)}>
        <DropdownValue>{item?.title}</DropdownValue>
        {/*Basically should be implemented through overlay*/}
        <DropdownList style={{display: state ? "block" : "none"}}>
          <DropdownItem onClick={() => {
            setItem({title: "Any"});
            setState(false);
            onChange({target: {value: {title: "Any"}}});
          }}>Any
          </DropdownItem>
          {items.map(_item => {
            return (
              <DropdownItem key={_item.title}
                  onClick={() => {
                    setItem(_item);
                    setState(false);
                    onChange({target: {value: _item}});
                  }}>{_item.title}</DropdownItem>
            );
          })}
        </DropdownList>
      </DropdownContent>


    </DropdownComponent>
  );
}

export default Dropdown;
