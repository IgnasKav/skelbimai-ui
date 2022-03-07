import { TreeSelect as AntTreeSelect } from 'antd';
// import 'antd/dist/antd.css';
import css from './tree-select.module.scss';

interface TreeNode {
    title: string;
    value: string;
    children?: TreeNode[];
}

interface Props {
    label: string;
}

export default function TreeSelect({label}: Props) {
    const { SHOW_PARENT } = AntTreeSelect;

    const treeData: TreeNode[] = [
        {
            title: 'Node1',
            value: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                },
            ],
        },
        {
            title: 'antras',
            value: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    children: [
                        {
                            title: 'idomu ar iskleis',
                            value: 'joo'
                        }
                    ]
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                },
            ],
        },
    ];

    const treeProps = {
        treeData,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        treeNodeFilterProp: 'title',
        style: {
            width: '100%',
        }
    }

    return(
        <div className={css.treeSelect}>
            <div className={css.label}>
                { label }
            </div>
            <AntTreeSelect {...treeProps}/>
        </div>
    );
}
