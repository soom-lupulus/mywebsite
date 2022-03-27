/*
 * @Author: yuyunhao
 * @Date: 2021-12-27 12:58:34
 * @LastEditTime: 2022-01-04 08:43:42
 * @LastEditors: yuyunhao
 * @Description:
 * @FilePath: \website\src\pages\Music\index.tsx
 * 代码都是复制过来的，怎么会出错
 */
import { useEffect, useState, useCallback, useMemo } from 'react';
import { history } from 'umi';
import request from '@/service/index';
import cx from './index.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.less';
import { useAccess } from 'umi';

type albumModel = {
  cover: string;
  description: string;
  name: string;
  uuid: number;
};

const Music: React.FC = () => {
  const access = useAccess();
  const [albumList, setAlbumList] = useState<albumModel[]>([]);
  const groupArr = useMemo(() => {
    let newArr = [],
      num = 5;
    const total = Math.ceil(albumList.length / num);
    for (let i = 0; i < total; i++) {
      const a = albumList.slice(i * num, (i + 1) * num);
      newArr.push(a);
    }
    return newArr;
  }, [albumList]);
  const albumClick = useCallback((item) => {
    history.push(`/album/${item}`);
  }, []);
  useEffect(() => {
    if (!access.canListen) {
      history.replace('/');
    } else {
      request
        .get('/album/list')
        .then((res) => {
          setAlbumList(res.data);
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <>
      <p className={cx.title}>荔枝音乐</p>
      <div id={cx['album-wrapper']}>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {groupArr.map((item) => {
            return (
              <SwiperSlide className={cx.slide}>
                <div className={cx['slide-item']}>
                  {item.map((item) => {
                    return (
                      <div className={cx['album-item']}>
                        <div
                          className="img"
                          onClick={() => albumClick(item.uuid)}
                        >
                          <img src={item.cover} alt="" />
                        </div>
                        <div className="des">{item.name}</div>
                      </div>
                    );
                  })}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* <div id={cx['album-wrapper']}>
        {
          albumList.map(item => {
            return (
              <div className={cx['album-item']}>
                <div className="img" onClick={() => albumClick(item.uuid)}><img src={item.cover} alt="" /></div>
                <div className="des">{item.name}</div>
              </div>
            )
          })
        }
      </div> */}
    </>
  );
};

export default Music;
