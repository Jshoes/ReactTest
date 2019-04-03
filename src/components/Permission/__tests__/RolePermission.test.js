'use strict';

import React from 'react';
import RolePermission from '../RolePermission'
import {shallow,mount,render} from 'enzyme'
import toJson from 'enzyme-to-json'


it.skip('RolePermission component', () => {
 const tree = render(<RolePermission roleName="admin"><span>has</span></RolePermission>);
  expect(toJson(tree)).toMatchSnapshot();
  // const tree = function(){
  //   throw new TypeError('RolePermission not has context appConfig props');
  // }
  //  console.dir(expect(tree))
  // console.log(tree)
  //expect(tree).toThrow("RolePermission not has context appConfig props")
//  expect(tree).toMatchSnapshot();
});
