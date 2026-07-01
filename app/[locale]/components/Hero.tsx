// app/[locale]/components/Hero.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

interface Project {
  id: string
  number: number
  name: string
  subtitle: string | null
  location: string
  description: string
  imageUrl: string
  thumbnailUrl: string
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const locale = useLocale()
  const t = useTranslations('hero')

  // Отримання проектів з API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?locale=${locale}`)
        const data = await response.json()
        setProjects(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }
    
    fetchProjects()
  }, [locale])

  // Автоматичне перемикання
  useEffect(() => {
    if (projects.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [projects.length])

  if (loading) {
    return (
      <div className="relative w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="relative w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white/60">
          {locale === 'de' ? 'Keine Projekte gefunden' : 'No projects found'}
        </p>
      </div>
    )
  }

  const activeProject = projects[activeIndex]

  const getItemPosition = (index: number) => {
    let offset = index - activeIndex
    if (offset > projects.length / 2) offset -= projects.length
    if (offset < -projects.length / 2) offset += projects.length
    return offset
  }

  const getMobilePosition = (index: number) => {
    if (index === activeIndex) return 0
    let position = index < activeIndex 
      ? projects.length - activeIndex + index 
      : index - activeIndex
    return position
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      
      {/* Анімований фон з фільтром */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            transform: `scale(1.08)`,
            animation: 'backgroundZoom 20s ease-in-out infinite alternate',
          }}
        >
          <Image
            src={activeProject.imageUrl}
            alt={activeProject.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
            style={{
              animation: 'backgroundPan 25s ease-in-out infinite alternate',
              filter: 'brightness(0.7) saturate(1.1) contrast(1.1) blur(0.5px)',
            }}
          />
        </div>
      </div>
      
      {/* Затемнення з градієнтом */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          animation: 'backgroundShake 30s ease-in-out infinite alternate',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70 md:to-black/60" />
      </div>
      
      {/* Додаткова накладка для читабельності */}
      {/* <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" /> */}
      
      {/* Основний контент */}
      <div className="relative mt-18 lg:mt-0 min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 sm:py-12 md:py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          
          {/* ЛІВА КОЛОНКА */}
          <div className="max-w-full lg:max-w-2xl z-10">
            <p className="text-white/90 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 md:mb-4">
              {activeProject.location}
            </p>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight break-words drop-shadow-lg">
              {activeProject.name}
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mt-3 sm:mt-4 md:mt-5 lg:mt-6 max-w-full lg:max-w-lg leading-relaxed drop-shadow">
              {activeProject.description}
            </p>
            
            {/* Кнопка з перекладом */}
            <Link href={`/${locale}/projects/${activeProject.id}`}>
              <button className="group mt-5 sm:mt-6 md:mt-8 lg:mt-10 flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/15 backdrop-blur-md rounded-full border border-white/30 hover:bg-white hover:text-black transition-all duration-500">
                <span className="text-xs sm:text-sm tracking-wider font-medium whitespace-nowrap drop-shadow">
                  {t('discover')}
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </Link>
          </div>
          
          {/* ПРАВА КОЛОНКА */}
          <div className="flex flex-col items-end md:mt-16 ">
            
            {/* ДЕСКТОПНА ВЕРСІЯ */}
            <div className="hidden lg:block w-full max-w-sm">
              <div className="relative h-[480px] flex items-center justify-center">
                <div className="relative w-full">
                  {projects.map((project, idx) => {
                    const position = getItemPosition(idx)
                    const isActive = position === 0
                    
                    let translateY = 0
                    let opacity = 1
                    let zIndex = 1
                    
                    if (isActive) {
                      translateY = 0
                      opacity = 1
                      zIndex = 10
                    } else {
                      const distance = Math.abs(position)
                      translateY = position * 100
                      opacity = Math.max(0.45, 1 - (distance * 0.2))
                      zIndex = 10 - distance
                    }
                    
                    return (
                      <button
                        key={project.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`
                          absolute left-0 right-0 w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer
                          transition-all duration-500 ease-in-out
                          ${isActive 
                            ? 'bg-white/25 backdrop-blur-md ring-1 ring-white/50 shadow-2xl' 
                            : 'bg-white/5 hover:bg-white/10'
                          }
                        `}
                        style={{
                          transform: `translateY(${translateY}px)`,
                          opacity: opacity,
                          zIndex: zIndex,
                          top: '50%',
                          marginTop: '-55px',
                        }}
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={project.thumbnailUrl}
                            alt={project.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <span className="absolute bottom-1 right-1 text-white/40 font-mono text-[11px]">
                            {String(project.number).padStart(2, '0')}
                          </span>
                        </div>
                        
                        <div className="flex-1 text-left">
                          <p className="text-white/50 text-[9px] tracking-wider uppercase">
                            {project.location.split(' ')[0]}
                          </p>
                          <p className={`font-medium leading-tight transition-all duration-500
                            ${isActive 
                              ? 'text-white text-base' 
                              : 'text-white/70 text-sm'
                            }
                          `}>
                            {project.name}
                          </p>
                          {isActive && (
                            <p className="text-white/40 text-[10px] mt-1">Explore →</p>
                          )}
                        </div>
                        
                        {isActive && (
                          <div className="w-0.5 h-12 rounded-full bg-white/60" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* МОБІЛЬНА ВЕРСІЯ */}
            <div className="lg:hidden w-full">
              <div className="relative h-[420px] flex items-start justify-start">
                <div className="relative w-full">
                  {projects.map((project, idx) => {
                    const position = getMobilePosition(idx)
                    const isActive = idx === activeIndex
                    
                    let translateY = 0
                    let opacity = 1
                    let zIndex = 1
                    
                    if (isActive) {
                      translateY = 0
                      opacity = 1
                      zIndex = 10
                    } else {
                      const distance = position
                      translateY = position * 85
                      opacity = Math.max(0.45, 1 - (distance * 0.15))
                      zIndex = 10 - distance
                    }
                    
                    return (
                      <button
                        key={project.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`
                          absolute left-0 right-0 w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer
                          transition-all duration-500 ease-in-out
                          ${isActive 
                            ? 'bg-white/25 backdrop-blur-md ring-1 ring-white/50 shadow-2xl' 
                            : 'bg-white/5 hover:bg-white/10'
                          }
                        `}
                        style={{
                          transform: `translateY(${translateY}px)`,
                          opacity: opacity,
                          zIndex: zIndex,
                          top: '0%',
                        }}
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={project.thumbnailUrl}
                            alt={project.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <span className="absolute bottom-1 right-1 text-white/40 font-mono text-[10px]">
                            {String(project.number).padStart(2, '0')}
                          </span>
                        </div>
                        
                        <div className="flex-1 text-left">
                          <p className="text-white/50 text-[8px] tracking-wider uppercase">
                            {project.location.split(' ')[0]}
                          </p>
                          <p className={`font-medium leading-tight transition-all duration-500
                            ${isActive 
                              ? 'text-white text-sm' 
                              : 'text-white/70 text-xs'
                            }
                          `}>
                            {project.name}
                          </p>
                          {isActive && (
                            <p className="text-white/40 text-[9px] mt-1">Explore →</p>
                          )}
                        </div>
                        
                        {isActive && (
                          <div className="w-0.5 h-10 rounded-full bg-white/60" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Лічильник */}
            <div className="text-right mt-6 sm:mt-8 lg:mt-4">
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white/90 tracking-tighter drop-shadow">
                  {String(activeProject.number).padStart(2, '0')}
                </span>
                <span className="text-white/50 text-sm sm:text-base lg:text-lg font-light ml-1 drop-shadow">
                  / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
              <div className="w-8 sm:w-10 lg:w-12 h-px bg-white/30 mt-1 ml-auto" />
            </div>
            
          </div>
        </div>
        
      </div>
      
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-4 sm:left-6 md:left-8 lg:left-12 right-4 sm:right-6 md:right-8 lg:right-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      
    </section>
  )
}