import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useRef, useState, useEffect } from 'react'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
}

const ProjectCard = ({ id, title, description, image }: ProjectCardProps) => {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState(false)
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 })
  const [hoverRotation, setHoverRotation] = useState<{ rotateX: number; rotateY: number } | null>(null)

  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const sensitivity = 0.3

  // Detecta se é mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    setIsMobile(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Toque no mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    e.preventDefault()

    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    setRotation({
      rotateX: Math.max(Math.min(-deltaY * sensitivity, 30), -30),
      rotateY: Math.max(Math.min(deltaX * sensitivity, 30), -30),
    })
  }

  const handleTouchEnd = () => {
    touchStartRef.current = null
    setRotation({ rotateX: 0, rotateY: 0 })
  }

  // Computa rotação final
  const appliedTransform = isMobile
    ? `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`
    : hoverRotation
    ? `rotateX(${hoverRotation.rotateX}deg) rotateY(${hoverRotation.rotateY}deg)`
    : undefined

  return (
    <StyledWrapper isMobile={isMobile}>
      <div
        className="container noselect"
        onClick={() => navigate(`/projeto/${id}`)}
        {...(isMobile
          ? {
              onTouchStart: handleTouchStart,
              onTouchMove: handleTouchMove,
              onTouchEnd: handleTouchEnd,
              onTouchCancel: handleTouchEnd,
            }
          : {})}
      >
        <div className="canvas">
          <div
            id="card"
            ref={cardRef}
            style={{
              transform: appliedTransform,
              filter: hoverRotation ? 'brightness(1.1)' : undefined,
            }}
          >
            <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <p className="text-gray-800 mt-2">{description}</p>
            </div>
          </div>

          {[...Array(25)].map((_, index) => {
            const row = Math.floor(index / 5) - 2
            const col = (index % 5) - 2
            const rotateX = -row * 10
            const rotateY = col * 10

            return (
              <div
                key={index}
                className={`tracker tr-${index + 1}`}
                onMouseEnter={() => !isMobile && setHoverRotation({ rotateX, rotateY })}
                onMouseLeave={() => !isMobile && setHoverRotation(null)}
              />
            )
          })}
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div<{ isMobile: boolean }>`
  .container {
    position: relative;
    width: 100%;
    max-width: 340px;
    height: 340px;
    transition: 200ms;
    cursor: pointer;
    touch-action: ${({ isMobile }) => (isMobile ? 'none' : 'auto')};
  }

  .container:active {
    transform: scale(0.98);
  }

  #card {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 16px;
    transition: transform 200ms ease, filter 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
    background: #f1f5f9;
    border: 2px solid transparent;
    will-change: transform;
    transform-style: preserve-3d;

    /* Neon suave default para modo claro */
    border-color: #4ea1f7;
    box-shadow:
      0 0 4px rgba(78, 161, 247, 0.5),
      0 0 8px rgba(78, 161, 247, 0.4);

    /* Neon roxo suave para modo dark */
    @media (prefers-color-scheme: dark) {
      border-color: #8a2be2;
      box-shadow:
        0 0 4px rgba(138, 43, 226, 0.5),
        0 0 8px rgba(138, 43, 226, 0.4);
      background: #f1f5f9;
    }
  }

  .canvas {
    perspective: 1000px;
    inset: 0;
    z-index: 200;
    position: absolute;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 100%;
    height: 100%;
  }

  .tracker {
    position: relative;
    z-index: 200;
    width: 100%;
    height: 100%;
  }
`


export default ProjectCard
