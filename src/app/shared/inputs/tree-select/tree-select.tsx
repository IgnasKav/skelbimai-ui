import React, {useEffect, useState} from 'react';
import { TreeSelect as AntTreeSelect } from 'antd';
import css from './tree-select.module.scss';
import {Category} from "../../../models/Category";
import {useStore} from "../../../stores/store";
import {observer} from "mobx-react-lite";
import { NIL as NIL_UUID } from "uuid";

interface TreeNode {
    title: string;
    value: string;
    children?: TreeNode[];
}

interface Props {
    name: string,
    multipleSelect: boolean;
    label: string;
    value?: Category;
    onChange: (event: any) => void;
}

export default observer(
    function TreeSelect({name, label, value, onChange, multipleSelect}: Props) {
    const { SHOW_PARENT } = AntTreeSelect;
    const { categoryStore } = useStore();
    const { categories, categoriesFlat } = categoryStore;
    const [selectedCategories, setSelectedCategories] = useState<string[] | string | undefined>(multipleSelect ? [] : undefined);
    const [treeData, setTreeData] = useState<TreeNode[]>([]);

    useEffect(() => {
        const categoryId = value?.id;
        if(categoryId && categoryId !== NIL_UUID) {
            setSelectedCategories(multipleSelect ? [categoryId] : categoryId);
        }
        setTreeData(toTreeData(categories));
    }, [value, categories]);


    const toTreeData= (categories: Category[]): TreeNode[] => {
        return categories.map(category => {
            let treeNode: TreeNode = {
                title: category.name,
                value: category.id,
                children: []
            };

            if(category.children) {
                treeNode.children = toTreeData(category.children);
            }

            return treeNode;
        });
    }

    const _onChange = (selectedIds: string[] | string) => {
        setSelectedCategories(selectedIds);

        if(typeof selectedIds === 'string') {
            const selectedCategory = findCategory(selectedIds);
            onChange({target: {name: name, value: selectedCategory}});
        }

    }

    const findCategory = (categoryId: string) => categoriesFlat.find((category) => category.id === categoryId);

    const treeProps = {
        treeData,
        treeCheckable: multipleSelect,
        showSearch: true,
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
            <AntTreeSelect {...treeProps} onChange={_onChange} value={selectedCategories}/>
        </div>
    );
});
