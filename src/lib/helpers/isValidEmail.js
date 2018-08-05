export default email => {
  // eslint-disable-next-line no-useless-escape
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})+$/;
  return filter.test(email);
};
