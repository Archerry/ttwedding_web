import {Button, Image, List} from 'antd';
import React from 'react';
import {ISeries} from '../../../api/CategoryManage/type';
import {getImageLink} from '../../../components/imageUtil';
import './style.less'

interface SeriesProps {
    data: ISeries
}

const ImagePreview: React.FC<SeriesProps> = (props, context) => {
    return <div className='image_preview'>
        {props.data.allImages.map(item => {
            return <div key={item} className='image_content'>
                <Image key={item} className='image_item' width={200} src={getImageLink(item)} />
                {/*<Button>删除</Button>*/}
            </div>
        })}
    </div>
}

export default ImagePreview
