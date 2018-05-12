import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';
import fclogo from './fclogo.svg';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(-500deg, #423669, #a190ff);
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
  width: 75px;
  height: 75px;
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
  padding: 1em 7em;
  @media ${device.laptop} {
    padding: 1em 3.5em;
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
  color: #656565;
  span {
    font-weight: bold;
    color: #5F4B8B;
  }

  @media ${device.laptop} {
    font-size: 2.5em;
    margin: 1.0em 0em;
  }
  @media ${device.tablet} {
    font-size: 2.3em;
    margin: 1.0em 0em;
  }
  @media ${device.mobileM} {
    font-size: 2em;
    margin: 1.0em 0em;
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
    color: #5F4B8B;
    @media ${device.mobileM} {
      margin-top: 0.5em;
    }
  }
  a {
    font-size: 1.1em;
    @media ${device.mobileM} {
      font-size: 1.1em;
    }
    color: black;
    text-decoration: none;
    &:hover, :visited {
      color: #806aaf;
    }
    transition: all 0.2s ease-in-out;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingArticles: true,
      articles: [],
      error: null
    };
  }

  componentDidMount() {
    axios.get('https://beautynews-203522.appspot.com/getarticles?size=1000')
      .then((res) => {
        this.setState({
          loadingArticles: false,
          articles: res.data
        });
      })
      .catch((err) => {
        const error = err.message ? err.message : err.response ? err.response.status : '?';
        this.setState({
          loadingArticles: false,
          error
        });
      });
  }

  render() {
    return (
      <Container>
        <Banner>
          <Logo src={fclogo} alt="FNlogo" />
          <MobileTitle>Fashion News</MobileTitle>
          <Login to="/login">Login</Login>
        </Banner>
        <Content>
          { this.state.error ? <div>{ this.state.error }</div> :
          <Fragment>
            { this.state.loadingArticles ?
              <div>loading</div> :
              <Fragment>
                <Title><span>F</span>ashion <span>N</span>ews</Title>
                <TileContainer>
                  { this.state.articles.map(article =>
                      (
                        <ArticleTile key={uniqueId()}>
                          <a target="_blank" rel="noopener noreferrer" href={article.link}>
                            { article.title }
                          </a>
                          <p>{ article.link.split('.')[1] }</p>
                        </ArticleTile>
                      ))
                    }
                </TileContainer>
              </Fragment>
              }
          </Fragment>
          }
        </Content>
      </Container>
    );
  }
}

export default App;
