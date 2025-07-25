'use client'
import { BOOKS_LIST } from '@/constans'
import { usePlayer } from '@/store/store'
import { TimeFormater } from '@/utils/TimeFormater'
import { RedoDot, UndoDot, Play, Pause } from 'lucide-react'
import { useEffect, useRef, useState, useCallback } from 'react'

export const Player = () => {
  const ref = useRef(null)
  const [time, setTime] = useState('00:00')
  const [durationFormated, setDurationFormated] = useState('00:00')
  const [progress, setProgress] = useState(0)
  const { activePart, isPlaying, updateActivePart, updateIsPlaying } = usePlayer()

  // Универсальная функция перемотки
  const handleSeek = useCallback(
    (offset) => {
      if (ref.current && activePart?.id) {
        ref.current.currentTime += offset
      }
    },
    [activePart],
  )

  // Play/Pause
  const handlePlayPause = useCallback(() => {
    if (!activePart?.id || !ref.current) return
    if (ref.current.paused) {
      updateIsPlaying(true)
      ref.current.play()
    } else {
      updateIsPlaying(false)
      ref.current.pause()
    }
  }, [activePart, updateIsPlaying])

  // Следим за isPlaying
  useEffect(() => {
    if (!ref.current) return
    if (isPlaying) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }, [isPlaying])

  // Следим за сменой трека
  useEffect(() => {
    if (activePart?.id && ref.current) {
      ref.current.currentTime = 0

      ref.current.play()

      updateIsPlaying(true)
    }
  }, [activePart, updateIsPlaying])

  useEffect(() => {
    if (ref.current) {
      if (!isNaN(ref.current.duration)) {
        setDurationFormated(TimeFormater(Number(ref.current.duration).toFixed(0)))
      }
    }
  }, [ref.current?.duration])

  // Обновление прогресса
  const updateTime = (e) => {
    setTime(TimeFormater)
    if (!activePart?.id) return
    const { currentTime, duration } = e.target
    setTime(TimeFormater(currentTime))
    if (duration > 0) {
      setProgress((currentTime / duration) * 100)
    }
    if (currentTime === duration) {
      updateIsPlaying(false)
      ref.current.currentTime = 0
    }
  }

  useEffect(() => {
    return () => {
      updateActivePart({})
      updateIsPlaying(false)
    }
  }, [])

  // --- Ниже ваша разметка без изменений ---
  return (
    <div className="mt-5   h-[40px]">
      <div className="bg-[#2c2e3d] rounded-sm  p-3">
        <div>
          <div className="flex items-center justify-between border-[#878785] border-b-1 pb-2 relative">
            <div
              className="absolute bottom-[-1px] bg-primary h-[1px] transition-all"
              style={{
                width: progress + '%',
              }}
            ></div>
            <p className="z-[1] text-[14px] ">
              {activePart?.id ? activePart.title : 'Слушать фрагмент '}
            </p>
            <p className="text-[14px] text-gray">{`${time} / ${durationFormated}`}</p>
          </div>
          {activePart?.id && (
            <div className="flex items-center justify-center gap-5 mt-4">
              <UndoDot
                className="cursor-pointer z-[1] active:scale-80 transition-all ease-in-out"
                onClick={() => handleSeek(-15)}
              />
              {isPlaying ? (
                <Pause className="text-primary cursor-pointer z-[1]" onClick={handlePlayPause} />
              ) : (
                <Play className="text-primary cursor-pointer z-[1]" onClick={handlePlayPause} />
              )}

              <RedoDot
                className="cursor-pointer z-[1] active:scale-80 transition-all ease-in-out"
                onClick={() => handleSeek(15)}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 z-0">
          <audio ref={ref} src={`${activePart?.audioURL}`} onTimeUpdate={updateTime}></audio>
        </div>
      </div>
    </div>
  )
}
