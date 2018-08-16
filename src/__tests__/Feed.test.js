import React from "react";
import { shallow } from "enzyme";
import Feed from "../Feed";

it("renders without crashing", () => {
  const wrapper = shallow(<Feed />);
  expect(wrapper).toMatchSnapshot();
});
