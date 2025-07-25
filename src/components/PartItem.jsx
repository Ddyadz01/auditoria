'use client'

import { Pause, Play } from 'lucide-react'
import { Title } from './Title'
import { usePlayer } from '@/store/store'

export const PartItem = ({ part }) => {
  const { updateActivePart, activePart, isPlaying } = usePlayer()

  const icon =
    (activePart.id == part.id) & isPlaying ? (
      <Pause className="text-primary" />
    ) : (
      <Play className="text-primary" />
    )

  return (
    <div className="cursor-pointer" onClick={() => updateActivePart(part)}>
      <div className="flex items-center my-4 bg-[#2c2e3d] py-2 px-3 rounded-sm gap-2">
        {icon}
        <Title
          text={`Часть ${part.id}. ${part.title}`}
          className={activePart.id == part.id && 'text-primary'}
        />
      </div>
    </div>
  )
}
