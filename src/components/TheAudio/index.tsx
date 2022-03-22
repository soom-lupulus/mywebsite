import React, { ReactEventHandler, useRef, useState, useEffect, useCallback, useMemo } from 'react'
import cx from './index.less'
import { ReactComponent as Mlast } from '@/assets/svg/music-last.svg'
import { ReactComponent as Mnext } from '@/assets/svg/music-next.svg'
import { ReactComponent as Mplay } from '@/assets/svg/music-play.svg'
import { ReactComponent as Mpause } from '@/assets/svg/music-pause.svg'
import classNames from 'classnames'

type AudioProps = {
  className?: string,
  songName?: string,
  source: string,
  isPause: boolean,
  setIsPause: (flag: boolean) => void
} & React.AudioHTMLAttributes<HTMLAudioElement>

const TheAudio: React.FC<AudioProps> = (props) => {
  const {
    // 歌曲url
    source,
    // 歌曲名称
    songName,
    // 歌曲控制器
    controls = false,
    // 暂停歌曲
    isPause = false,
    setIsPause,
    ...restProps
  } = props

  const initialAuState = {
    current: 0,
    duration: 100,
  }

  const calcTime = (time: number): string => {
    const minutes = (~~(time / 60) + '').padStart(2, '0')
    const seconds = (~~(time % 60) + '').padStart(2, '0')
    return `${minutes} : ${seconds}`
  }

  const [auState, setAuState] = useState(initialAuState)
  const myaudio = useRef<HTMLAudioElement>(null)
  // 音乐可以播放
  const canPlay = useCallback(() => {

  }, [])

  const totalTime = useMemo(() => calcTime(auState.duration), [auState.duration])

  const cTime = useMemo(() => {
    const current = auState.current
    const minutes = (~~(current / 60) + '').padStart(2, '0')
    const seconds = (~~(current % 60) + '').padStart(2, '0')
    return `${minutes} : ${seconds}`
  }, [auState.current])

  useEffect(() => {
    // 切换歌曲播放音乐
    if (source && !isPause) {
      myaudio.current?.play()
    } else {
      myaudio.current?.pause()
    }
  }, [isPause, source])

  return (
    <div className={cx.wrapper}>
      <div className={cx.view}>
        {/* 图标 */}
        <div className={cx.left}>
          <Mlast className={cx.icon} />
          {
            isPause ?
              <Mplay className={classNames(cx.icon, cx.iconplay)} onClick={() => {
                setIsPause(false)
              }} />
              :
              <Mpause className={classNames(cx.icon)} onClick={() => {setIsPause(true)}} />
          }

          <Mnext className={cx.icon} />
        </div>
        {/* 信息进度条 */}
        <div className={cx.right}>
          <div className={cx.songInfo}>
            <span>{songName}</span>
            <span>{cTime} / {totalTime}</span>
          </div>
          <progress value={auState.current || 0} max={auState.duration || 0}></progress>
        </div>
      </div>

      <audio
        ref={myaudio}
        src={source}
        onCanPlayThrough={canPlay}
        controls={controls}
        onLoadedMetadata={() => {
        }}
        onTimeUpdate={(e) => {
          setAuState({
            ...auState,
            current: e.currentTarget.currentTime
          })
        }}
        onDurationChange={(e) => {
          setAuState({
            ...auState,
            duration: e.currentTarget.duration
          })
        }}

        onEnded={() => {
          setIsPause(true)
        }}
        preload='auto'
        {...restProps}
      ></audio>
    </div>
  )
}

export default TheAudio
