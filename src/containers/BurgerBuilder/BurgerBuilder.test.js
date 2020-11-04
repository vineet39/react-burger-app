import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder';
import React from 'react';
import  BuildControls  from '../../components//Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

configure({ adapter: new Adapter() })

let wrapper;
beforeEach(() => {
    wrapper = shallow(< BurgerBuilder onInitIngredient={() => {}}/> );
})
describe('<BurgerBuilder />', () => {
    it('should render <BuildControls /> and <Burger /> when receiving ingredients, there are no errors and loading is complete', () => {
        wrapper.setProps({ ings: { salad: 0, meat: 1 }, error: false, loaded: true });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
        expect(wrapper.find(Burger)).toHaveLength(1);
    })
})

describe('<BurgerBuilder />', () => {
    it('should not render <BuildControls /> and <Burger /> when there is an error', () => {
        wrapper.setProps({ error: true });
        expect(wrapper.find(BuildControls)).toHaveLength(0);
        expect(wrapper.find(Burger)).toHaveLength(0);
    })
})
