
import { render } from 'enzyme';
import React from 'react';
import Button from '..';

describe('Button', () => {
    it('renders correctly', () => {
        const wrapper = render(<Button>Follow</Button>);
        expect(wrapper).toMatchSnapshot();
        // expect(sum(1, 2)).toBe(3);
    });
})
