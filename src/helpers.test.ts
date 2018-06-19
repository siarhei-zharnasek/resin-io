import { parseTree, makeNode, Node } from './helpers';

describe('Helpers: ', () => {
    let result: Node;
    
    describe('parseTree: ', () => {
        beforeEach(() => result = makeNode({isRoot: true}));
        
        it('should return error if there less than 2 children', () => {
            result.error = 'You have to add newline to separate children.';

            expect(parseTree('page1')).toEqual(result);
        });

        it('should return tree object if there are 2 children', () => {
            result.children = [
                makeNode({title: 'page1'}),
                makeNode({title: 'page2'})
            ];

            expect(parseTree('page1\npage2')).toEqual(result);
        });

        it('should return error if child is empty', () => {
            result.error = 'Wrong format of the input tree, please check <b>1</b> line';

            expect(parseTree('\npage2')).toEqual(result);
        });

        it('should return error if child is space', () => {
            result = {
                ...result,
                children: [makeNode({title: 'page1'})],
                error: 'Wrong format of the input tree, please check <b>2</b> line'
            };

            expect(parseTree('page1\n ')).toEqual(result);
        });

        it('should return tree object if there are 2 children separated with 2 spaces', () => {
            result.children = [{
                ...makeNode({title: 'page1'}),
                children: [makeNode({title: 'page2'})]
            }];

            expect(parseTree('page1\n  page2')).toEqual(result);
        });

        it('should return error if there are 2 children separated in a wrong way', () => {
            result = {
                ...result,
                children: [makeNode({title: 'page1'})],
                error: 'Wrong format of the input tree, please check <b>2</b> line'
            };

            expect(parseTree('page1\n page2')).toEqual(result);
        });
    });
});
