import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import uniqueId from "lodash/uniqueId";
import styled from "styled-components";
import gql from "graphql-tag";

import theme from "./lib/theme";
import fclogo from "./fclogo.svg";
import { Spinner } from "./lib/components";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
};

const Container = styled.div`
  position: relative;
`;

const Banner = styled.div`
  position: sticky;
  overflow: hidden;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #645495;
  background: linear-gradient(
    -250deg,
    ${theme.colors.lightPurple},
    ${theme.colors.mainPurple}
  );
  width: 100%;
`;

const Login = styled(Link)`
  color: white;
  margin-right: 3em;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  @media ${device.mobileM} {
    margin-right: 1.5em;
  }
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  box-shadow: 0px 0px 0px 1px white;
  margin: 0 6.3em;
  @media ${device.laptop} {
    margin: 0 3.5em;
  }
  @media ${device.tablet} {
    margin: 0 2.5em;
  }
  @media ${device.mobileM} {
    margin: 0 1.5em;
    width: 55px;
    height: 55px;
  }
`;

const Content = styled.div`
  padding: 1em 21vw;
  @media ${device.laptop} {
    padding: 1em 14vw;
  }
  @media ${device.tablet} {
    padding: 1em 2.5em;
  }
  @media ${device.mobileM} {
    padding: 1em 1.5em;
    margin: 0em;
  }
`;

const MobileTitle = styled.div`
  padding: 0.11em 5.2em 0 0;
  color: white;
  display: none;
  @media ${device.mobileM} {
    display: block;
  }
`;

const Title = styled.div`
  margin: 0.7em 0em;
  font-size: 4em;
  color: ${theme.colors.text};
  span {
    font-weight: bold;
    color: ${theme.colors.mainPurple};
  }

  @media ${device.laptop} {
    font-size: 2.5em;
    margin: 1em 0em;
  }
  @media ${device.tablet} {
    font-size: 2.3em;
    margin: 1em 0em;
  }
  @media ${device.mobileM} {
    font-size: 2em;
    margin: 1em 0em;
    display: none;
  }
`;

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArticleTile = styled.div`
  margin-right: 3.5em;
  max-width: 600px;
  padding: 1em 0em;
  @media ${device.mobileL} {
    margin-right: 1.5em;
  }
  p {
    margin-top: 0.5em;
    color: ${theme.colors.text};
    @media ${device.mobileM} {
      margin-top: 0.5em;
    }
  }
  a {
    font-size: 1.1em;
    @media ${device.mobileM} {
      font-size: 1.1em;
    }
    color: ${theme.colors.text};
    text-decoration: none;
    &:hover,
    :visited {
      color: ${theme.colors.mainPurple};
    }
    transition: all 0.2s ease-in-out;
  }
`;

const Feed = () => (
  <Container>
    <Banner>
      <Logo src={fclogo} alt="FNlogo" />
      <MobileTitle>Fashion News</MobileTitle>
      <Login to={`${process.env.PUBLIC_URL}/login`}>Login</Login>
    </Banner>
    <Content>
      <Query
        query={gql`
          {
            articles {
              title
              up_votes
              link
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) {
            return (
              <Fragment>
                <p>Oops, something went wrong :(</p>
                <p>{error.message}</p>
              </Fragment>
            );
          }
          return (
            <Fragment>
              <Title>
                <span>F</span>
                ashion <span>N</span>
                ews
              </Title>
              <TileContainer>
                {data.articles.map(article => (
                  <ArticleTile key={uniqueId()}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={article.link}
                    >
                      {article.title}
                    </a>
                    <p>{article.link.split(".")[1]}</p>
                  </ArticleTile>
                ))}
              </TileContainer>
            </Fragment>
          );
        }}
      </Query>
    </Content>
  </Container>
);

export default Feed;
