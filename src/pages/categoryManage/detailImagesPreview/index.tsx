import {Image, List} from 'antd';
import React from 'react';
import {ISeries} from '../../../api/CategoryManage/type';
import {getImageLink} from '../../../components/imageUtil';
import './style.less'

type Props<ISeries> = {
    data: ISeries;
};

const ImagePreview: React.FC = (props: Props<ISeries>) => {
    return <div className='image_preview'>
        {props.data.allImages.map((item: string) => (
            <Image className='image_item' width={200} src={getImageLink(item)}></Image>
        ))}
    </div>
}

export default ImagePreview
