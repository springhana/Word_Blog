'use client';

/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SkeletonNote = () => {
  return (
    <Section>
      <Note></Note>
    </Section>
  );
};

const background = css`
  background: #f2f2f2;
`;

const Section = styled.section`
  width: 50%;
  height: 300px;
  padding: 20px 30px;
  display: inline-block;
`;
const Note = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  ${background}
`;
