/*
 * @Author: yuyunhao
 * @Date: 2021-12-27 12:58:34
 * @LastEditTime: 2022-01-04 08:43:42
 * @LastEditors: yuyunhao
 * @Description:
 * @FilePath: \website\src\pages\Music\index.tsx
 * 代码都是复制过来的，怎么会出错
 */
import { useEffect, useState, useCallback } from "react"
import { useParams } from 'umi';
import Lyric from 'lyric-parser'
// import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import cx from './index.less'
import TheAudio from '@/components/TheAudio'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import request from '@/service/index'
import { ReactComponent as Back } from '@/assets/svg/back.svg'
import { useHistory } from "react-router";
import { message } from "antd";


type songModel = {
  album_id: number,
  uuid: number,
  cover: string,
  album_name: string,
  artist: string,
  lrc_source: string,
  source: string,
  description: string,
  name: string,
}

type lyricModel = {
  stop: () => void,
  play: () => void,
  toggleState: () => void,
}

const Song: React.FC = ({ }) => {
  const history = useHistory()
  const { uuid: albumId } = useParams();
  const { } = useHistory
  const [songList, setSongList] = useState<songModel[]>([]);
  const [currentSong, setCurrentSong] = useState<songModel>({});
  const [isPause, setIsPause] = useState(true);
  const [curText, setCurText] = useState('');
  const [curLrc, setCurLrc] = useState('');

  // 获取专辑列表
  const getAlbumList = useCallback(() => {
    request.get(`/music/list/${albumId}`).then(res => {
      setSongList(res.data)
    }).catch(error => {

    })
  }, [albumId])

  // 获取歌词详情
  let lyric: lyricModel
  const getlyrics = useCallback((uuid) => {
    lyric?.stop()
    request.get(`/music/lyrics/${uuid}`).then(res => {
      const lrc = res.data
       lyric = new Lyric(lrc, ({ txt, lineNum }: { txt: string, lineNum: number }) => {
        console.log(txt);

        setCurText(txt)
      })
      lyric.play()

      setCurLrc(lrc);

    }).catch(err => {
      return message.error(err)
    })
  }, [])

  // 播放当前歌曲
  const playCurSong = useCallback(async (row) => {
    setCurrentSong(row);
    setCurLrc('')
    const { lrc_source, uuid } = row
    if (lrc_source) {
      console.log('拿歌词了');
      getlyrics(uuid)
    }else{
      message.info('暂无歌词')
    }

    setIsPause(false)
  }, [])

  useEffect(() => {
    getAlbumList()
  }, [])


  return (
    <>
      {/* <AccessAlarm></AccessAlarm> */}
      <div className={cx.wrapper}>
        <nav>
          <Back
            className={cx.back}
            onClick={() => {
              history.goBack()
            }}></Back>
        </nav>
        <div className={cx.content}>
          <TableContainer className={cx.tableContainer}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={cx.cell}>歌名</TableCell>
                  <TableCell className={cx.cell}>歌手</TableCell>
                  <TableCell className={cx.cell}>专辑</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {songList.map((row) => (
                  <TableRow
                    className={cx.tableRow}
                    key={row.uuid}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onMouseOver={() => {
                      const { source } = row

                    }}
                  >
                    <TableCell style={{ minWidth: "70px" }} className={cx.cell}>
                      <div className={cx.firstCell}>
                        <div>{row.name}</div>
                        {/* <div><a onClick={() => playCurSong(row.source)}>播放</a></div> */}
                        <div>
                          <PlayCircleOutlineIcon className={cx.playIcon} onClick={() => playCurSong(row)} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={cx.cell}>{row.artist}</TableCell>
                    <TableCell className={cx.cell}>{row.album_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={cx.info}>
            <div className={cx.songInfo}>
              <div className={cx.cover}>
                <img src={currentSong.cover} alt="" />
              </div>
              <div className={cx.description}>
                <div>
                  <span>歌曲名：</span>
                  <span>{currentSong.name}</span>
                </div>
                <div>
                  <span>歌手：</span>
                  <span>{currentSong.artist}</span>
                </div>
                <div>
                  <span>专辑：</span>
                  <span>{currentSong.album_name}</span>
                </div>
              </div>
            </div>
            <div className={cx.lyrics}>
              <div className={cx.lrc}>
                {
                  !curLrc && <p>暂无歌词</p>
                }
                <p>{curText}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <footer>
        <TheAudio
          source={currentSong?.source}
          songName={currentSong.name}
          isPause={isPause}
          setIsPause={setIsPause}
          onWaiting={() => {
            console.log('啊哦，卡了');
            lyric?.toggleState()
          }}
          onPlaying={() => {
            console.log('OK,给爷冲');
            lyric?.toggleState()
          }}
        />
      </footer>
    </>
  )
}

export default Song
