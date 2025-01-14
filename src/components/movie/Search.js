import React, { useState } from 'react';
import styled from 'styled-components';
import { BiSearch } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  width: 100%;
  height: 700px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('${process.env.PUBLIC_URL}/images/bg/bg_banner.png') no-repeat center / cover;
    z-index: -1;
    opacity: 0.5;
  }

  @media (max-width: 1024px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    height: 400px;
  }
`;

const SearchBox = styled.div`
  padding: 0 20px;
  max-width: 600px;
  width: 100%;
`;

const SearchTitle = styled.div`
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.4;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 20px;
  color: #fff;
  
  &::placeholder {
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;

  svg {
    font-size: 1.4rem;
    color: #fff;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 34px;

    svg {
      font-size: 1.2rem;
    }
  }
`;

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <SearchContainer>
      <SearchBox>
        <SearchTitle>어떤 영화를 찾고 계시나요?<br />
          원하는 영화 제목을 검색해 보세요!</SearchTitle>

        <SearchInputWrapper>
          <SearchInput
            placeholder="입력해 주세요."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton type="button" onClick={handleSearch}>
            <BiSearch />
          </SearchButton>
        </SearchInputWrapper>
      </SearchBox>
    </SearchContainer>
  );
};

export default Search;
