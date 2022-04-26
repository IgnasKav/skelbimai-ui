import React, {useEffect, useState} from 'react';
import { TreeSelect as AntTreeSelect } from 'antd';
import css from './tree-select.module.scss';
import {Category} from "../../../models/Category";
import {useStore} from "../../../stores/store";
import {observer} from "mobx-react-lite";
import { NIL as NIL_UUID } from "uuid";
import {parentPort} from "worker_threads";
import {CategoryFilter} from "../../../models/SearchRequest";

interface TreeNode {
    title: string;
    value: string;
    children?: TreeNode[];
    depth: number;
}

interface Props {
    name: string,
    multipleSelect: boolean;
    label: string;
    value?: Category;
    onChange: (event: any) => void;
    className?: string;
}

export default observer(
    function TreeSelect({name, label, value, onChange, multipleSelect, className}: Props) {
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
        const level = 0;
        const treeData = toTreeData(categories, level);
        setTreeData(treeData);
    }, [value, categories]);


    const toTreeData= (categories: Category[], level: number): TreeNode[] => {
        level = level + 1;
        return categories.map(category => {
            let treeNode: TreeNode = {
                title: category.name,
                value: category.id,
                children: [],
                depth: level
            };

            if(category.children) {
                treeNode.children = toTreeData(category.children, level);
            }
            return treeNode;
        });
    }

    const getCategoryFilter = (category: Category, categoryFilter: string) => {
        categoryFilter += ` ${category.name}`;

        if(category.parentId) {
            const categoryParent = findCategory(category.parentId);
            if(categoryParent) {
                categoryFilter = getCategoryFilter(categoryParent, categoryFilter);
            }
        }

        return categoryFilter.trim();
    }

    const _onChange = (selectedIds: string[] | string) => {
        setSelectedCategories(selectedIds);

        switch (typeof selectedIds) {
            case 'string':
                const selectedCategory = findCategory(selectedIds);
                onChange({target: {name: name, value: selectedCategory}});
                break;
            case 'object':
                 const categories = selectedIds.map(id => {
                    const category = findCategory(id);

                    if(!category) return;

                    const categoryFilter = getCategoryFilter(category, '');

                    const searchCategoryFilter: CategoryFilter = {
                        categoryFilter: categoryFilter,
                        categoryId: category.id
                    }

                    return searchCategoryFilter;
                });

                onChange({target: {name: name, value: categories}});
                break;
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
        <div className={[css.treeSelect, className].join(' ')}>
            <div className={css.label}>
                { label }
            </div>
            <AntTreeSelect {...treeProps} onChange={_onChange} value={selectedCategories}/>
        </div>
    );
});
