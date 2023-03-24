import {Form, Input, Select, Typography} from 'antd';
import {Option} from 'antd/es/mentions';
import {useState} from 'react';
import {ISeries} from '../../../api/CategoryManage/type';
import './style.less'
import ImagePreview from '../detailImagesPreview';

type Props<ISeries> = {
    data: ISeries;
};

const { Text } = Typography

const onFinish = (values: any) => {
    console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
}

const DetailContent: React.FC = (props: Props<ISeries>) => {
    const [initiaValues, setInitiaValues] = useState(props.data);

    return <Form
        className='detail_content'
        name='series_detail'
        wrapperCol={{ span: 10 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={initiaValues}
    >
        <span className='content_title content_item'>修改人：<Text className='content_des'>{props.data.uploadUserName}</Text></span>
        <span className='content_title content_item'>修改时间：<Text className='content_des'>{props.data.updateTime}</Text></span>
        <Form.Item
            label={<span className='content_title'>系列名</span>}
            name="seriesName"
            initialValue={props.data.seriesName}
            rules={[{ required: true, message: '请输入需要修改的系列名' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="categoryName"
            label={<span className='content_title'>分类</span>}
            hasFeedback
            rules={[{ required: true, message: '请选择分类' }]}
        >
            <Select placeholder='请选择分类'>
                <Option value='11'>主纱</Option>
                <Option value='12'>轻纱</Option>
                <Option value='13'>秀禾</Option>
                <Option value='14'>礼服</Option>
                <Option value='15'>伴娘服</Option>
            </Select>
        </Form.Item>
        <ImagePreview data={props.data} />
    </Form>
}

export default DetailContent
