import {Form, FormInstance, Input, Select, Typography} from 'antd';
import {Option} from 'antd/es/mentions';
import React from 'react';
import {ICategory, ISeries} from '../../../api/CategoryManage/type';
import './style.less'
import ImagePreview from '../detailImagesPreview';

type DetailProps = {
    data: ISeries,
    form: FormInstance,
    categoryList: Array<ICategory>
};

const { Text } = Typography

const DetailContent: React.FC<DetailProps> = (props) => {
    const textChange = (itemName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        props.form.setFieldsValue({[itemName]: value})
    }

    return <div className='detail_content'>
        <span className='content_title content_item'>修改人：<Text className='content_des'>{props.data.uploadUserName}</Text></span>
        <span className='content_title content_item'>修改时间：<Text className='content_des'>{props.data.updateTime}</Text></span>
        <Form.Item
            noStyle
            name='serieId'
            initialValue={props.data.id}
        >
        </Form.Item>
        <Form.Item
            label={<span className='content_title'>系列名</span>}
            name="seriesName"
            initialValue={props.data.seriesName}
            rules={[{ message: '请输入需要修改的系列名' }]}
        >
            <Input value={props.data.seriesName} onChange={() => {
                textChange('seriesName')
            }} />
        </Form.Item>
        <Form.Item
            label={<span className='content_title'>系列描述</span>}
            name="seriesDsc"
            initialValue={props.data.seriesDsc}
        >
            <Input onChange={() => {
                textChange('seriesDsc')
            }} />
        </Form.Item>
        <Form.Item
            name="categoryId"
            label={<span className='content_title'>分类</span>}
            hasFeedback
            initialValue={props.data.categoryId}
        >
            <Select placeholder='请选择分类' value={props.data.categoryId!}>
                {props.categoryList.map(item => {
                    return <Option value={String(item.id)} key={String(item.id)}>{item.categoryName}</Option>
                })}
            </Select>
        </Form.Item>
        <ImagePreview data={props.data} />
    </div>
}

export default DetailContent
