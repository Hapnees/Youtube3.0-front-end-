export const keyDown = (
  ref: React.RefObject<HTMLVideoElement>,
  event: React.KeyboardEvent,
  setVolume: React.Dispatch<React.SetStateAction<number>>,
  isPaused: boolean,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsClickedRightArrow: React.Dispatch<React.SetStateAction<boolean>>,
  setIsClickedLeftArrow: React.Dispatch<React.SetStateAction<boolean>>,
  setIsClickedUpOrDownArrow: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (ref.current) {
    switch (event.key) {
      case 'ArrowRight':
        ref.current.currentTime += 10
        setIsClickedRightArrow(true)
        setTimeout(() => {
          setIsClickedRightArrow(false)
        }, 200)
        break
      case 'ArrowLeft':
        ref.current.currentTime -= 10
        setIsClickedLeftArrow(true)
        setTimeout(() => {
          setIsClickedLeftArrow(false)
        }, 200)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (ref.current.volume + 0.1 <= 1) {
          ref.current.volume = ref.current.volume + 0.1
          setVolume(prev => prev + 10)
        } else {
          ref.current.volume = 1
          setVolume(100)
        }
        setIsClickedUpOrDownArrow(true)
        setTimeout(() => {
          setIsClickedUpOrDownArrow(false)
        }, 100)
        break
      case 'ArrowDown':
        event.preventDefault()
        if (ref.current.volume - 0.1 >= 0) {
          ref.current.volume = ref.current.volume - 0.1
          setVolume(prev => prev - 10)
        } else {
          ref.current.volume = 0
          setVolume(0)
        }
        setIsClickedUpOrDownArrow(true)
        setTimeout(() => {
          setIsClickedUpOrDownArrow(false)
        }, 100)
        break
      case ' ' || 'Enter':
        event.preventDefault()
        if (isPaused) {
          ref.current?.play()
          setIsPaused(false)
        } else {
          ref.current?.pause()
          setIsPaused(true)
        }
        break
      case 'f':
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          ref.current.requestFullscreen()
        }
        break
    }
  }
}
