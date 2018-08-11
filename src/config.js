const dev = {
  apiGateway: {
    URL: "http://localhost:8000"
  }
};

const prod = {
  apiGateway: {
    URL: "https://obscure-hollows-21413.herokuapp.com"
  }
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default {
  ...config
};
