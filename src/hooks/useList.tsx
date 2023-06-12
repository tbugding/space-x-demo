import {useRecoilValue, useSetRecoilState} from "recoil";
import {filterKeyWords, filterRange, filterSort, filterType, listState} from "../states";
import {useCallback, useState} from "react";
import {useRequest} from "ahooks";
import {getLaunch} from "../api/index";
import dayjs from "dayjs";
import {delay} from "../utils/index";

export default function useList() {
  // 搜索条件
  const keywordsState = useRecoilValue(filterKeyWords);
  const setKeyWords = useSetRecoilState(filterKeyWords);
  const typeState = useRecoilValue(filterType);
  const setType = useSetRecoilState(filterType);
  const rangeState = useRecoilValue(filterRange);
  const setRange = useSetRecoilState(filterRange);
  const sortState = useRecoilValue(filterSort);
  const setSort = useSetRecoilState(filterSort);

  // 列表数据
  const listData = useRecoilValue(listState);
  const setListData = useSetRecoilState(listState);
  const [nextPage, setNextPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const success = useCallback((data) => {
    setHasNextPage(!!data.hasNextPage)
    if (data?.docs) {
      setListData([...listData, ...data.docs])
    }

    if (data?.nextPage) {
      setNextPage(data.nextPage)
    }
  }, [listData, setListData])

  const {loading, run } = useRequest(getLaunch, {
    manual: true,
    // throttleWait: 400,
    onSuccess: success
  });

  const getList = useCallback((clear = false) => {
    if (loading) return
    if (clear) {
      setListData([])
      setNextPage(1);
    }
    delay(1000).then(() => {
      const params = {
        query: {
          "date_utc": {
            "$gte": dayjs(rangeState[0]).toISOString(),
            "$lte": dayjs(rangeState[1]).toISOString()
          },
          "success": typeState === -1 ? {'$in': [true, false]} : Boolean(typeState),
        },
        options: {
          limit: 12,
          sort: {'date_utc': sortState},
          select: ['date_unix', 'date_utc', 'name', 'links', 'detail', 'success'],
          page: clear ? 1 : nextPage
        }
      }
      const keywords = keywordsState.trim()
      if (keywords) params.query.name = keywords
      run(params)
    })



  }, [keywordsState, loading, nextPage, rangeState, run, setListData, sortState, typeState])

  return {
    keywordsState,
    typeState,
    rangeState,
    sortState,
    setKeyWords,
    setType,
    setRange,
    setSort,
    loading,
    listData,
    hasNextPage,
    getList
  }
}