import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SkeletonUser = () => {
  return (
    <Section>
      <User></User>
      <Info>
        <Name></Name>
        <Date></Date>
      </Info>
    </Section>
  );
};

const background = css`
  background: #f2f2f2;
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
`;

const User = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  ${background}
`;

const Info = styled.div`
  width: 100%;
`;

const Name = styled.p`
  width: 40%;
  height: 22px;
  border-radius: 5px;
  ${background}
  margin-bottom: 8px;
`;

const Date = styled.p`
  width: 50%;
  height: 22px;
  border-radius: 5px;
  ${background}
`;
