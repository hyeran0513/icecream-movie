import React from 'react'
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  height: 700px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/bg_banner.png') no-repeat center / cover;
    z-index: -1;
    opacity: 0.5;
  }
`;

const SearchBox = styled.div`

`;

const Search = () => {
  return (
    <>
      <SearchContainer>
        <SearchBox>

        </SearchBox>
      </SearchContainer>
    </>
  )
}

export default Search