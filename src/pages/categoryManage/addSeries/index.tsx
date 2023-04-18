import {Button, Form, Input, message, Select, Upload, Typography } from 'antd';
import {Option} from 'antd/es/mentions';
import { UploadOutlined } from '@ant-design/icons';
import './style.less'
import {useState} from 'react';
import { uploadFile} from '../../../api/CategoryManage';

const { Title } = Typography

const index: React.FC = () => {
    const [files, setFiles] = useState([])

    // 自定义上传请求方法
    const customRequest = async ({ file, onProgress, onSuccess }: any) => {
        const formData = new FormData();
        formData.append('file', file);
        uploadFile(formData, {
            onUploadProgress: progressEvent => {
                onProgress({ percent: Math.round((progressEvent.loaded * 100) / progressEvent.total) });
            },
        }).then((res) => {
            onSuccess(res);
            message.success('上传成功')
        })
    }

    const handleFileChange = ({ fileList }) => {
        setFiles([...fileList]);
    };

    return <div className='addBack'>
        <Form.Item
            label={<span className='content_title'>系列名</span>}
            name="seriesName"
            colon={false}
            rules={[{ message: '请输入系列名称', required: true }]}
        >
            <Input placeholder='输入系列名称' />
        </Form.Item>
        <Form.Item
            label={<span className='content_title'>系列描述</span>}
            name="seriesDsc"
            colon={false}
            rules={[{ message: '请输入系列描述', required: true }]}
        >
            <Input placeholder='输入系列描述' />
        </Form.Item>
        <Form.Item
            name="categoryId"
            label={<span className='content_title'>分类</span>}
            hasFeedback
            colon={false}
            rules={[{ message: '请选择分类', required: true }]}
        >
            <Select placeholder='请选择分类'>
                <Option value='11'>主纱</Option>
                <Option value='12'>轻纱</Option>
                <Option value='13'>秀禾</Option>
                <Option value='14'>礼服</Option>
                <Option value='15'>伴娘服</Option>
            </Select>
        </Form.Item>
        <Title level={5}>上传主图</Title>
        <Form.Item
            name="masterFid"
        >
            <Upload
                accept='image/png, image/jpeg'
                action="/api/tw-file/image"
                listType="picture"
                headers={{
                    Authorization: localStorage.getItem('Authorization'),
                }}
                className="upload-list-inline"
            >
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        </Form.Item>
        <Title level={5}>上传其余图片</Title>
        <Form.Item
            name='filesFid'
        >
            <Upload
                accept='image/png, image/jpeg'
                fileList={files}
                listType="picture"
                multiple={true}
                onChange={handleFileChange}
                customRequest={customRequest}
                className="upload-list-inline"
            >
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        </Form.Item>
    </div>;
};

export default index;
