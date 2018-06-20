import * as React from 'react';
import { shallow } from 'enzyme';
import { Tree } from 'antd';

import TreeWrapper from './TreeWrapper';
import { parseTree } from '../../helpers';

describe('<TreeWrapper/>', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallow(
            <TreeWrapper
                rawTree={'page 1\npage2'}
                renderTree={true}
            />
        );
    });

    it('should render correctly', () => {
        const nestedTree = wrapper.find(Tree);

        expect(nestedTree.length).toBe(1);
        expect(wrapper.state()).toEqual({
            tree: parseTree('page 1\npage2')
        });
    });

    it('should not update state if renderTree prop is false', () => {
        wrapper.setProps({
            rawTree: 'page 1\npage2\npage3',
            renderTree: false
        });

        expect(wrapper.state()).toEqual({
            tree: parseTree('page 1\npage2')
        });
    });

    it('should render error if rawTree has mistakes', () => {
        wrapper.setProps({
            rawTree: 'page 1\n'
        });

        const error = wrapper.find('.error');

        expect(wrapper.state().tree.error).toBe('Wrong format of the input tree, please check <b>2</b> line');
        expect(error.length).toBe(1);
        expect(error.render().text()).toBe('Wrong format of the input tree, please check 2 line');
    });
});
