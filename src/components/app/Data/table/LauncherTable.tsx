import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import styled from "styled-components";
import { styled as S, Typography } from "@mui/material";

type TableProps = {
  sheetName?: string;
  testCase?: string;
  browser?: string;
  type?: string;
  enabled?: string;
  dataSheet?: string;
  comments?: string;
};

export default function LauncherTable(props: TableProps) {
  return (
    <StyledTable>
      <tbody>
        <tr style={{  }}>
          <td style={{ border: "1px solid blue",borderRight:'none' , paddingLeft:'10px'}}>
            <StyledTd>
              <StyledTdText>Sheet Name</StyledTdText> <PlayArrowIcon />
              {props.sheetName}
            </StyledTd>
          </td>
          <td style={{ border: "1px solid blue", paddingLeft:'10px' }}>
            <StyledTd>
              <StyledTdText>Test Case</StyledTdText> <PlayArrowIcon />
              {props.testCase}
            </StyledTd>
          </td>

          <td style={{ border: "1px solid blue",borderLeft:'none', paddingLeft:'10px' }}>
            <StyledTd>
              <StyledTdText> Browser</StyledTdText> <PlayArrowIcon />
              {props.browser}
            </StyledTd>
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid blue",borderTop:'none',borderRight:'none', paddingLeft:'10px'}}>
            <StyledTd>
              <StyledTdText> Test type</StyledTdText> <PlayArrowIcon />
              {props.type}
            </StyledTd>
          </td>
          <td style={{ border: "1px solid blue",borderTop:'none', paddingLeft:'10px'}}>
            <StyledTd>
              <StyledTdText> Status</StyledTdText> <PlayArrowIcon />
              {props.enabled}
            </StyledTd>
          </td>
          <td style={{ border: "1px solid blue",borderTop:'none',borderLeft:'none', paddingLeft:'10px'}}>
            <StyledTd>
              <StyledTdText>Data Sheet</StyledTdText> <PlayArrowIcon />
              {props.dataSheet}
            </StyledTd>
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid blue",borderTop:'none', paddingLeft:'10px'}} colSpan={3}>
            <StyledTd>
              <StyledTdText> Comment</StyledTdText> <PlayArrowIcon />
              {props.comments}
            </StyledTd>
          </td>
        </tr>
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled.table`
  /* margin: 30px; */
  width:100%;
  background-color: aliceblue;
  border-spacing: 0;
`;

const StyledTd = styled.div`
  color: black;
  display: flex;
  align-items: center;
  font-weight: "bold";
  text-align: left;
  height: 40px;
`;

const StyledTdText = S(Typography)`
   width:100px;
   font-weight:700;
   font-size:14px
`;
