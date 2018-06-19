import * as React from 'react';

import './Form.less';

interface Props {
    textAreaValue: string;
    onSubmit: () => void;
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

class Form extends React.Component<Props> {
    onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.props.onSubmit();
    }

    render() {
        const {textAreaValue, onChange} = this.props;

        return (
            <div className="form">
                <form
                    className="form__content"
                    onSubmit={this.onSubmit}
                >
                    <textarea
                        className="form__content__textarea"
                        value={textAreaValue}
                        onChange={onChange}
                        placeholder="Enter text tree here..."
                        cols={30}
                        rows={10}
                        autoFocus={true}
                    />
                    <input
                        className="form__content__button"
                        type="submit"
                        value="CONVERT"
                        disabled={!textAreaValue}
                    />
                </form>
            </div>
        );
    }
}

export default Form;
