import {AxiosRequestConfig} from 'axios';
import { http } from '../index';
import {ICategory, ICategoryRecord, ISeriesRecord} from './type';

/**
 * 分页获取系列列表
 * @param categoryId 分类id
 */
// eslint-disable-next-line import/prefer-default-export
export const getSeriesList = (categoryId: number) => {
  return http.get<ISeriesRecord>(
    `/api/tw-series/getManageSeriesList?currentPage=1&size=20&categoryId=${categoryId}`
  );
};

/**
 * 添加系列
 * @param data 系列数据
 */
export const addSeries = (data:object) => {
  return http.post(
      '/api/tw-series/addSerie',
      data
  )
}

/**
 * 修改系列
 * @param serieId 系列id
 * @param seriesName 系列名称
 * @param seriesDsc 系列描述
 * @param categoryId 分类id
 */
export const modifySeries = (serieId: number, seriesName: string, seriesDsc: string, categoryId: number) => {
  const data = {
    serieId: serieId,
    seriesName: seriesName,
    seriesDsc: seriesDsc,
    categoryId: categoryId
  }
  return http.post(
      '/api/tw-series/modifySerie',
      data
  )
}

/**
 * 获取分类
 */
export const getCategories = () => {
  return http.get<ICategoryRecord>(
      '/api/tw-category/queryAllCategory'
  )
}

export const hideSerie = (serieId: number, hide: boolean) => {
  return http.get(
      `/api/tw-series/hideSerie?serieId=${serieId}&hide=${hide}`,
  )
}

export const uploadFile = (data: object, config?: AxiosRequestConfig) => {
  return http.post(
      '/api/tw-file/image',
      data,
      config
  )
}
