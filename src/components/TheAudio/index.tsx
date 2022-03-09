import React, { ReactEventHandler, useRef, useState, useEffect, useCallback } from 'react'

type audioProps = {
  className?: string,
  source: string,
  controls?: boolean,
  totalTime?: string,
  currentTime?: string,
  isPause?: boolean,
}

const TheAudio: React.FC<audioProps> = (props) => {
  const {
    // 歌曲url
    source,
    // 歌曲总时长,
    totalTime,
    // 歌曲当前时长,
    currentTime,
    // 歌曲控制器
    controls = false,
    // 暂停歌曲
    isPause = false,

  } = props
  const myaudio = useRef<HTMLAudioElement>(null)
  // 音乐可以播放
  const canPlay = useCallback(() => {

  }, [source])

  useEffect(() => {
    // 切换歌曲播放音乐
    if (source && !isPause) {
      myaudio.current?.play()
    } else {
      myaudio.current?.pause()
    }
  }, [isPause, source])

  return (
    <div>
      <audio
        {...props}
        ref={myaudio}
        src={source}
        onCanPlay={canPlay}
        controls={controls}
        preload='auto'
      ></audio>
    </div>
  )
}

export default TheAudio
