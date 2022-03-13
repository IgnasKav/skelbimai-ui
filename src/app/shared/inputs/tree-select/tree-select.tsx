import React, {useEffect, useState} from 'react';
import { TreeSelect as AntTreeSelect } from 'antd';
import 'antd/dist/antd.css';
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
    multipleSelect: boolean;
    label: string;
    value: Category;
    onChange: (event: any) => void;
}

export default observer(
    function TreeSelect({label, value, onChange, multipleSelect}: Props) {
    const { SHOW_PARENT } = AntTreeSelect;
    const { categoryStore } = useStore();
    const { categories } = categoryStore;
    const [selectedCategories, setSelectedCategories] = useState<string[] | string>([]);

    useEffect(() => {
        const categoryId = value.id;
        if(categoryId !== NIL_UUID) {
            setSelectedCategories(multipleSelect ? [categoryId] : categoryId);
        }
    }, [value]);

    // console.log(JSON.parse(JSON.stringify(categories)));


    const treeData: TreeNode[] = categories.map(category => {
        return {
            title: category.name,
            value: category.id,
            children: []
        };
    });

    const _onChange = (selectedIds: string[] | string) => {
        setSelectedCategories(selectedIds);
        const selecetedCategory = findCategory(selectedIds[0]);
        //onChange({target: {name: 'category', value: selecetedCategory}});
    }

    const findCategory = (categoryId: string) => categories.find((category) => category.id === categoryId);

    const treeProps = {
        treeData,
        treeCheckable: multipleSelect,
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
