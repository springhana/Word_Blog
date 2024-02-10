'use client';

/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { SkeletonUser } from './SkeletonUser';

export const SkeletonCard = () => {
  return (
    <Section>
      <SkeletonUser />
      <Card />
      <Tag />
      <div css={Flex}>
        <Memorize />
        <Like />
      </div>
    </Section>
  );
};

const background = css`
  background: #f2f2f2;
  /* position: relative;
  overflow: hidden;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: loading 2s infinite linear;
  }
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(700px);
    }
  } */
`;

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #dae1e2;
`;

const Flex = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

const Card = styled.div`
  max-width: 500px;
  width: 100%;
  height: 389px;
  border-radius: 10px;
  ${background}
  margin: auto;
`;

const Tag = styled.div`
  width: 68px;
  height: 41px;
  border-radius: 5px;
  ${background}
  margin: 20px auto;
`;

const Memorize = styled.div`
  width: 120px;
  height: 30px;
  ${background}
`;

const Like = styled.div`
  width: 80px;
  height: 30px;
  ${background}
`;
