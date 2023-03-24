import '../../reset.less';
import './style.less';
import React, { useEffect, useState } from "react";
import {Button, Image, Modal, Space, Switch, Table, Typography} from 'antd';
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import { getSeriesList } from "../../api/CategoryManage";
import {ISeries, ISeriesRecord} from '../../api/CategoryManage/type';
import DetailContent from './seriesDetail';

const Index: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [seriesInfo, setSeriesInfo] = useState<ISeries>();
  const params = useParams();
  const [data, setData] = useState(Array<ISeries>);

  const openModal = (seriesInfo: ISeries) => {
    setSeriesInfo(seriesInfo)
    setOpen(true)
  }

  const columns: ColumnsType<ISeries> = [
    {
      title: '系列',
      dataIndex: 'seriesName',
      key: 'seriesName',
      render: (seriesName) => <span>{seriesName}</span>,
    },
    {
      title: '描述',
      dataIndex: 'seriesDsc',
      key: 'seriesDsc',
      render: (seriesDsc) => <span>{seriesDsc}</span>,
    },
    {
      title: '更新人',
      dataIndex: 'uploadUserName',
      key: 'uploadUserName',
      render: (uploadUserName) => <span>{uploadUserName}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (updateTime) => <span>{updateTime}</span>,
    },
    // {
    //   title: '封面',
    //   dataIndex: 'allImages',
    //   key: 'allImages',
    //   render: (allImages) => (
    //     <Image width={150} height={240} src={getImageLink(allImages[0])} />
    //   ),
    // },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
          <Space size="middle">
            {/*<a>编辑</a>*/}
            <Button
                onClick={() => {
                  openModal(record)
                }}
            >编辑</Button>
          </Space>
      ),
    },
    {
      title: '是否隐藏',
      key: 'action',
      render: (_, record) => (
          <Space size="middle">
            <Switch checked={record.hasDelete} />
          </Space>
      ),
    },
  ];

  useEffect(() => {
    if (typeof params.categoryId === 'undefined') {
    } else {
      const categoryId = Number(params.categoryId);
      fetchSeriesList(categoryId);
    }
    return setData([]);
  }, [params.categoryId]);

  const fetchSeriesList = async (categoryId: number) => {
    const res = await getSeriesList(categoryId);
    setData(res.records);
    console.log('data = ', data);
  };

  return (
    <div>
      <span className='title'>当前分类标题以及分类id {params.categoryId}</span>
      <Table columns={columns} dataSource={data} />
      <Modal
          title={`系列名称：${seriesInfo?.seriesName}`}
          centered
          open={open}
          okText='完成'
          cancelText='取消'
          destroyOnClose={true}
          onCancel={() => {
            setOpen(false)
          }}
          width={1000}
      >
        <DetailContent data={seriesInfo} />
      </Modal>
    </div>
  );
};

export default Index;
