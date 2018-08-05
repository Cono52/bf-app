const dev = {
  apiGateway: {
    URL: "http://localhost:8000"
  }
};

const prod = {
  apiGateway: {
    URL: "https://beautynews-203522.appspot.com"
  }
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default {
  ...config
};
