import * as React from 'react';

import './App.less';
import { Form, TreeWrapper } from './components';

interface State {
    rawTree: string;
    renderTree: boolean;
}

class App extends React.Component<{}, State> {
    state = {
        rawTree: '',
        renderTree: false
    };

    renderTree = (): void => this.setState({renderTree: true});

    onChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        this.setState({
            rawTree: (e.target as HTMLInputElement).value,
            renderTree: false
        });
    }

    public render() {
        const {rawTree, renderTree} = this.state;

        return (
            <div className="resin-app">
                <h3 className="resin-app__title">
                    Enter the string to parse into the tree in the form below.<br/>
                    Tree nodes should be separated with new lines and each level in the deep separated by 2 spaces.<br/>
                    If there is any error you will see the number of wrong line.<br/>
                    Please, use only unique node titles.
                </h3>
                <Form
                    textAreaValue={rawTree}
                    onSubmit={this.renderTree}
                    onChange={this.onChange}
                />
                <TreeWrapper
                    rawTree={rawTree}
                    renderTree={renderTree}
                />
            </div>
        );
    }
}

export default App;
