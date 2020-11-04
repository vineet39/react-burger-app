import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';

configure({ adapter: new Adapter() })

let wrapper;
beforeEach(() => {
    wrapper = shallow( < NavigationItems /> );
})
describe('<NavigationItems />', () => {
    it('should render two navigation items if user is not logged in', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
})

describe('<NavigationItems />', () => {
    it('should render three navigation items if user is logged in', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
})


describe('<NavigationItems />', () => {
    it('should render three navigation items if user is logged in', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>));
    })
})