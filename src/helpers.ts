interface MakeNodeProp {
    isRoot?: boolean;
    title?: string | null;
}

export interface Node {
    isRoot: boolean;
    title: string | null;
    children: Node[];
    error: string;
}

export const makeNode = ({isRoot = false, title = null}: MakeNodeProp = {}): Node => ({
    title,
    isRoot,
    children: [],
    error: ''
});

export function parseTree(input: string): Node {
    const inputArr = input.split('\n');
    let treeObj = makeNode({isRoot: true});
    let child;

    if (inputArr.length > 1) {
        try {
            inputArr.forEach((page: string) => {
                const spacesCount = page.search(/\S/);
                const title = page.trim();
                child = makeNode({title});

                if (!page || !title) {
                    throw page;
                }

                if (!spacesCount) {
                    treeObj.children.push(child);
                } else if (!(spacesCount % 2)) {
                    const childrenLength = treeObj.children.length;
                    let node = treeObj.children[childrenLength - 1];

                    for (let i = 0; i < spacesCount / 2 - 1; i++) {
                        const nodeChildrenLength = node.children.length;
                        node = node.children[nodeChildrenLength - 1];
                    }

                    node.children.push(makeNode(child));
                } else {
                    throw page;
                }
            });
        } catch (wrongPage) {
            treeObj.error =
                `Wrong format of the input tree, please check <b>${inputArr.indexOf(wrongPage) + 1}</b> line`;
        }
    } else {
        treeObj.error = 'You have to add newline to separate children.';
    }

    return treeObj;
}
