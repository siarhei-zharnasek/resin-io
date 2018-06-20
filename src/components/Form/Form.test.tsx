import * as React from 'react';
import Form from './Form';
import { shallow } from 'enzyme';

describe('<Form/>', () => {
    let textAreaValue = '';
    let onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
    let onSubmit: () => void;
    let wrapper: any;

    beforeEach(() => {
        onChange = jest.fn();
        onSubmit = jest.fn();
        wrapper = shallow(
            <Form
                textAreaValue={textAreaValue}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        );
    });

    it('should render correctly', () => {
        const nestedForm = wrapper.find('.form__content');
        const nestedTextarea = wrapper.find('.form__content__textarea');
        const nestedInput = wrapper.find('.form__content__button');

        [nestedForm, nestedTextarea, nestedInput].map(el => expect(el.length).toBe(1));
        expect(nestedInput.prop('disabled')).toBeTruthy();
    });

    it('should pass props to textarea', () => {
        textAreaValue = 'page 1';
        wrapper.setProps({textAreaValue});

        const nestedTextarea = wrapper.find('.form__content__textarea');

        expect(nestedTextarea.prop('value')).toBe('page 1');
    });

    it('should trigger onChange passed through props', () => {
        const nestedTextarea = wrapper.find('.form__content__textarea');

        expect((onChange as any).mock.calls.length).toBe(0);

        nestedTextarea.simulate('change', 'test');

        expect((onChange as any).mock.calls.length).toBe(1);
        expect((onChange as any).mock.calls[0][0]).toBe('test');
    });

    it('should trigger onSubmit passed through props', () => {
        const nestedForm = wrapper.find('.form__content');

        expect((onSubmit as any).mock.calls.length).toBe(0);

        nestedForm.simulate('submit', {
            preventDefault() { return null; }
        });

        expect((onSubmit as any).mock.calls.length).toBe(1);
    });
});
