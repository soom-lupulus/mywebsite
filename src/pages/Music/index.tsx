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
import { history, ConnectProps, Loading, connect } from 'umi';
import styles from './index.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.less';
import { useAccess } from 'umi';
import type { MusicType } from '@/typings/music';
import classnames from 'classnames/bind';
import { IndexModelState } from './model';

const cx = classnames.bind(styles);

const Music: React.FC<{ musicDvaState: IndexModelState }> = ({
  musicDvaState,
}) => {
  const access = useAccess();
  const { albumList } = musicDvaState;
  // const [albumList, setAlbumList] = useState<MusicType.SongProps[]>([]);
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
    }
  }, []);

  return (
    <div className={cx('outer')}>
      <div className={cx('title')}>荔枝音乐</div>
      <div id={cx('album-wrapper')}>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {groupArr.map((item, index) => {
            return (
              <SwiperSlide className={cx('slide')} key={index}>
                <div className={cx('slide-item')}>
                  {item.map((item: MusicType.SongProps) => {
                    return (
                      <div className={cx('album-item')} key={item.id}>
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
    </div>
  );
};

const mapStateToProps = ({
  musicDvaState,
  loading,
}: {
  musicDvaState: IndexModelState;
  loading: Loading;
}) => ({
  musicDvaState,
  loading: loading.models.musicDvaState,
});

export default connect(mapStateToProps)(Music);
