import '../../reset.less';
import './style.less';
import React, { useEffect, useState } from "react";
import {Button, Form, Image, message, Modal, Space, Switch, Table} from 'antd';
import { ColumnsType } from "antd/es/table";
import {Simulate} from 'react-dom/test-utils';
import { useParams } from "react-router-dom";
import {addSeries, getCategories, getSeriesList, modifySeries} from '../../api/CategoryManage';
import { ISeries } from '../../api/CategoryManage/type';
import DetailContent from './seriesDetail';
import AddSeries from './addSeries';
import error = Simulate.error;

const Index: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false);
  const [seriesInfo, setSeriesInfo] = useState<ISeries>()
  const [confirmLoading, setConfirmLoading] = useState(false);
  const params = useParams()
  const [data, setData] = useState(Array<ISeries>)
  const [form] = Form.useForm()
  const [addFrom] = Form.useForm()
  const [categoryList, setCategoryList] = useState([]);

  const onFinish = () => {
    setConfirmLoading(true)
    form.validateFields().then(values => {
      console.log('Success:', values)
      modifySeries(values.serieId, values.seriesName, values.seriesDsc, values.categoryId).then(() => {
        setOpen(false)
        setConfirmLoading(false)
        form.resetFields()
        message.success('修改成功')
        if (typeof params.categoryId === 'undefined') {
        } else {
          const categoryId = Number(params.categoryId);
          fetchSeriesList(categoryId);
        }
      })
    }).catch(error => {
      form.resetFields()
      console.log('Failure:', error)
      setConfirmLoading(false)
    })
  }

  const onAddFinish = () => {
    setConfirmLoading(true)
    addFrom.validateFields().then(values => {
      // 重组data数据
      const newData = {...values}
      // 主图fid
      newData.masterFid = values.masterFid.file.response.data.list[0].fid
      console.log('values.masterFid.file.response.response.fid = ', values.masterFid.file.response.data.list[0].fid)
      const fids = []
      for (const index in values.filesFid.fileList) {
        if (values.filesFid.fileList[index].response) {
          fids.push(values.filesFid.fileList[index].response.list[0].fid)
          console.log('values.filesFid.fileList[index].response.response.fid = ', values.filesFid.fileList[index].response.list[0].fid)
        }
      }
      newData.filesFid = fids.join(',')
      console.log('newData = ', newData)
      addSeries(newData).then(() => {
        addFrom.resetFields()
        setAddOpen(false)
        setConfirmLoading(false)
        if (typeof params.categoryId === 'undefined') {
        } else {
          const categoryId = Number(params.categoryId);
          fetchSeriesList(categoryId);
        }
      })
    }).catch(error => {
      addFrom.resetFields()
      console.log('Failure:', error)
      setConfirmLoading(false)
    })
  }

  const onAdd = () => {
    setAddOpen(true)
  }

  const openModal = (seriesInfo: ISeries) => {
    setSeriesInfo(seriesInfo)
    form.resetFields()
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
      fetchSeriesList(categoryId)
      fetchCategoryList()
    }
    return setData([]);
  }, [params.categoryId]);

  const fetchSeriesList = async (categoryId: number) => {
    const res = await getSeriesList(categoryId);
    setData(res.records);
    console.log('data = ', data);
  };

  const fetchCategoryList = async () => {
    const res = await getCategories()
    setCategoryList(res.list)
  }

  return (
    <div>
      <div className='operation'>
        <span className='title'>当前分类标题以及分类id {params.categoryId}</span>
        <Button type='primary' onClick={() => onAdd()}>新增</Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Modal
          title={`系列名称：${seriesInfo?.seriesName}`}
          centered
          open={open}
          onOk={() => {
            onFinish();
          }}
          okText='完成'
          cancelText='取消'
          destroyOnClose={true}
          confirmLoading={confirmLoading}
          onCancel={() => {
            console.log('hhhh')
            form.resetFields()
            setOpen(false)
          }}
          width={1000}
      >
        <Form
            form={form}
            name='series_detail'
            wrapperCol={{ span: 10 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
        >
          <DetailContent data={seriesInfo} form={form} categoryList={categoryList} />
        </Form>
      </Modal>
      <Modal
          title={`新增${`当前分类标题`}系列`}
          centered
          open={addOpen}
          maskClosable={false}
          okText='保存'
          cancelText='取消'
          destroyOnClose={true}
          confirmLoading={confirmLoading}
          onOk={onAddFinish}
          onCancel={() => {
            addFrom.resetFields()
            setAddOpen(false)
          }}
          width={1000}
      >
        <Form
            form={addFrom}
            name={'add_series'}
            wrapperCol={{ span: 10 }}
            style={ {maxWidth: 600} }
            autoComplete='off'
        >
          <AddSeries />
        </Form>
      </Modal>
    </div>
  );
};

export default Index;
