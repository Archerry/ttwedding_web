import { http } from '../index';
import { ISeriesRecord } from './type';

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
