'use client'

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

import {
  MapPin,
  ArrowUpRight,
  X,
  Building2,
  Map,
  ChevronRight,
  Loader2,
  AlertCircle,
  Compass,
} from 'lucide-react'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

// --------------------------------------------------
// CONFIGURATION
// --------------------------------------------------

const GERMANY_GEO_URL = '/germany.json'

const CITY_COORDS: Record<string, [number, number]> = {
  Bonn: [7.0982, 50.7374],
  Berlin: [13.405, 52.52],
  München: [11.582, 48.1351],
  Hamburg: [9.9937, 53.5511],
  Köln: [6.9603, 50.9375],
  Frankfurt: [8.6821, 50.1109],
  Stuttgart: [9.1829, 48.7758],
  Düsseldorf: [6.7735, 51.2277],
  Dortmund: [7.4653, 51.5136],
}

const CITY_ALIASES: Record<string, string> = {
  Munich: 'München',
  Cologne: 'Köln',
  Dusseldorf: 'Düsseldorf',
  'Frankfurt am Main': 'Frankfurt',
}

interface Project {
  id: string
  number: number
  name: string
  location: string
  region: string | null
  thumbnailUrl: string
}

interface CityGroup {
  name: string
  projects: Project[]
  coordinates: [number, number]
}

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function normalizeCity(value: string): string {
  const city = value.trim().replace(/\s+/g, ' ')
  return CITY_ALIASES[city] || city
}

function resolveProjectCity(project: Project): string | null {
  const candidates = [
    project.region,
    project.location?.split(',')[0],
  ]

  for (const candidate of candidates) {
    if (!candidate) continue
    const city = normalizeCity(candidate)
    if (CITY_COORDS[city]) {
      return city
    }
  }

  return null
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export function ProjectMap() {
  const locale = useLocale()
  const t = useTranslations('map')

  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Відстежуємо ширину вікна для динамічного scale
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ------------------------------------------------
  // FETCH PROJECTS
  // ------------------------------------------------

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProjects() {
      setLoading(true)
      setError(false)

      try {
        const response = await fetch(
          `/api/projects?locale=${locale}`,
          {
            signal: controller.signal,
            headers: { Accept: 'application/json' },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid projects response')
        }

        setProjects(data)
      } catch (err) {
        if (controller.signal.aborted) return
        console.error('ProjectMap:', err)
        setError(true)
        setProjects([])
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProjects()
    return () => controller.abort()
  }, [locale])

  // ------------------------------------------------
  // GROUP PROJECTS BY CITY
  // ------------------------------------------------

  const cities = useMemo<CityGroup[]>(() => {
    const groups: Record<string, Project[]> = {}

    projects.forEach((project) => {
      const city = resolveProjectCity(project)
      if (!city) return
      if (!groups[city]) groups[city] = []
      groups[city].push(project)
    })

    return Object.entries(groups)
      .map(([name, cityProjects]) => ({
        name,
        projects: cityProjects,
        coordinates: CITY_COORDS[name],
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [projects])

  // ------------------------------------------------
  // DERIVED DATA
  // ------------------------------------------------

  const selectedLocation = useMemo(
    () => cities.find((city) => city.name === selectedCity) ?? null,
    [cities, selectedCity]
  )

  const totalProjects = projects.length

  const mappedProjects = useMemo(
    () => cities.reduce((total, city) => total + city.projects.length, 0),
    [cities]
  )

  const unmappedProjects = totalProjects - mappedProjects

  // ------------------------------------------------
  // ACTIONS
  // ------------------------------------------------

  const handleSelectCity = useCallback((city: string) => {
    setSelectedCity((current) => (current === city ? null : city))
  }, [])

  const handleClose = useCallback(() => {
    setSelectedCity(null)
  }, [])

  useEffect(() => {
    if (selectedCity && !cities.some((city) => city.name === selectedCity)) {
      setSelectedCity(null)
    }
  }, [cities, selectedCity])

  // ------------------------------------------------
  // LOADING STATE
  // ------------------------------------------------

  if (loading) {
    return (
      <section className="w-full py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface-card shadow-sm">
              <Loader2 className="h-7 w-7 animate-spin text-brand" />
            </div>
            <p className="text-sm font-medium tracking-wide text-ink-muted">
              {t('loading')}
            </p>
          </div>
        </div>
      </section>
    )
  }

  // ------------------------------------------------
  // ERROR STATE
  // ------------------------------------------------

  if (error) {
    return (
      <section className="w-full py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex min-h-[360px] max-w-md flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2">
              <AlertCircle className="h-7 w-7 text-ink-muted" />
            </div>
            <h3 className="text-xl font-semibold text-ink">
              {t('errorTitle')}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              {t('errorDesc')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-ink-on-brand transition hover:opacity-90"
            >
              {t('tryAgain')}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ------------------------------------------------
  // EMPTY STATE
  // ------------------------------------------------

  if (!projects.length || !cities.length) {
    return (
      <section className="w-full py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex min-h-[360px] max-w-md flex-col items-center justify-center text-center">
            <MapPin className="mb-5 h-12 w-12 text-ink-muted opacity-50" />
            <h3 className="text-xl font-semibold text-ink">
              {t('selectCity')}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              {t('selectCityDesc')}
            </p>
          </div>
        </div>
      </section>
    )
  }

  // ------------------------------------------------
  // DYNAMIC SCALE CALCULATION
  // ------------------------------------------------

  const dynamicScale =
    windowWidth < 640 ? 3800
    : windowWidth < 1024 ? 2600
    : 2000

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------

  return (
    <section
      id="project-map"
      className="relative w-full overflow-hidden bg-surface py-20 sm:py-24 lg:py-32"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-brand/[0.035] blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-brand/[0.025] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* HEADER */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="text-lg font-semibold uppercase tracking-[0.3em] text-ink-muted ">
              {t('subtitle')}
            </span>
          </div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl xl:text-6xl">
            {t('title')}
          </h2>
            <div className="w-16 mx-auto h-px bg-line-strong mt-4" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
            {t('description')}
          </p>
        </div>

        {/* MAIN EXPLORER */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          
          {/* MAP */}
          <div className="relative min-w-0 overflow-hidden rounded-[24px] border border-line bg-surface-card shadow-[0_15px_60px_rgba(0,0,0,0.045)] sm:rounded-[32px] lg:col-span-8">
            
            {/* Map header */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-5 sm:px-8 sm:py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2">
                  <Map className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink sm:text-base">
                    {t('mapHeaderTitle')}
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {t('mapHeaderSubtitle')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-2">
                  {t('citiesCount', { count: cities.length })}
                </span>
              </div>
            </div>

            {/* Map canvas */}
            <div className="relative overflow-hidden bg-surface-card">
              {/* Subtle grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage: `
                    linear-gradient(var(--line) 1px, transparent 1px),
                    linear-gradient(90deg, var(--line) 1px, transparent 1px)
                  `,
                  backgroundSize: '44px 44px',
                }}
              />

              <div className="relative mx-auto h-[420px] w-full sm:h-[560px] md:h-[640px] lg:h-[700px] xl:h-[780px]">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    center: [10.4515, 51.1657],
                    scale: dynamicScale,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'visible',
                  }}
                >
                  {/* Germany regions */}
                  <Geographies geography={GERMANY_GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const regionName = geo.properties?.name || 'Germany'
                        const isHovered = hoveredRegion === regionName

                        return (
                       <Geography
  key={geo.rsmKey}
  geography={geo}
  onMouseEnter={() => setHoveredRegion(regionName)}
  onMouseLeave={() => setHoveredRegion(null)}
  fill={
    isHovered
      ? 'var(--surface-card-hover)'
      : 'var(--surface-2)'
  }
  stroke="var(--line-strong)"
  strokeWidth={1.1}
  style={{
    outline: 'none',
    transition: 'all 250ms ease',
  }}
/>
                        )
                      })
                    }
                  </Geographies>

                  {/* City markers */}
                  {cities.map((city) => {
                    const isSelected = selectedCity === city.name
                    const isHovered = hoveredCity === city.name
                    const count = city.projects.length

                    return (
                      <Marker key={city.name} coordinates={city.coordinates}>
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label={t('cityAriaLabel', {
                            city: city.name,
                            count,
                          })}
                          aria-pressed={isSelected}
                          className="cursor-pointer"
                          onClick={() => handleSelectCity(city.name)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              handleSelectCity(city.name)
                            }
                          }}
                          onMouseEnter={() => setHoveredCity(city.name)}
                          onMouseLeave={() => setHoveredCity(null)}
                          style={{ outline: 'none' }}
                        >
                          <circle
                            r={isSelected ? 32 : isHovered ? 29 : 24}
                            fill="var(--brand)"
                            opacity={isSelected ? 0.15 : 0.08}
                            className="transition-all duration-300"
                          />
                          {(isSelected || isHovered) && (
                            <circle
                              r={21}
                              fill="none"
                              stroke="var(--brand)"
                              strokeWidth={1.5}
                              opacity={0.5}
                            />
                          )}
                          <circle
                            r={isSelected ? 15 : 13}
                            fill="var(--brand)"
                            stroke="var(--surface-card)"
                            strokeWidth={3}
                            className="transition-all duration-300"
                          />
                          <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="var(--ink-on-brand)"
                            fontSize="11"
                            fontWeight="700"
                            pointerEvents="none"
                          >
                            {count}
                          </text>
                        </g>
                      </Marker>
                    )
                  })}
                </ComposableMap>

                {/* Region tooltip */}
                {hoveredRegion && (
                  <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-line bg-surface-card/90 px-4 py-2 text-xs font-medium text-ink shadow-lg backdrop-blur-xl">
                    {hoveredRegion}
                  </div>
                )}
              </div>

              {/* Map legend */}
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-line px-4 py-5 sm:px-8">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                  <span className="text-xs text-ink-muted">
                    {t('legendProjectLocations')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-line bg-surface-2 px-1 text-[9px] font-semibold text-ink">
                    #
                  </span>
                  <span className="text-xs text-ink-muted">
                    {t('legendNumberProjects')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-brand bg-brand/20" />
                  <span className="text-xs text-ink-muted">
                    {t('legendSelectedCity')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT SIDEBAR — прихований до lg, на мобільному працює bottom sheet */}
          <aside className="hidden min-w-0 flex-col overflow-hidden rounded-[24px] border border-line bg-surface-card shadow-[0_15px_60px_rgba(0,0,0,0.045)] sm:rounded-[32px] lg:col-span-4 lg:flex">
            
            {/* Sidebar header */}
            <div className="border-b border-line px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                    {t('sidebarEyebrow')}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {selectedLocation ? selectedLocation.name : t('sidebarTitle')}
                  </h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2">
                  {selectedLocation ? (
                    <MapPin className="h-5 w-5 text-brand" />
                  ) : (
                    <Building2 className="h-5 w-5 text-brand" />
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-ink-muted">
                  {selectedLocation
                    ? t('projectsCountInCity', {
                        count: selectedLocation.projects.length,
                      })
                    : t('projectsCountInCity', { count: mappedProjects })}
                </p>
                {selectedLocation && (
                  <button
                    onClick={handleClose}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-brand"
                  >
                    <X className="h-3.5 w-3.5" />
                    {t('clearSelection')}
                  </button>
                )}
              </div>
            </div>

            {/* City selector */}
            <div className="border-b border-line px-5 py-4 sm:px-7">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                {t('browseByLocation')}
              </p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => {
                  const active = selectedCity === city.name
                  return (
                    <button
                      key={city.name}
                      onClick={() => handleSelectCity(city.name)}
                      aria-pressed={active}
                      className={`
                        inline-flex items-center gap-1.5 rounded-full border px-3 py-2
                        text-xs font-medium transition-all duration-200
                        ${
                          active
                            ? 'border-brand bg-brand text-ink-on-brand shadow-sm'
                            : 'border-line bg-surface-2 text-ink-2 hover:border-brand/50 hover:text-brand'
                        }
                      `}
                    >
                      {city.name}
                      <span className="opacity-70">{city.projects.length}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Projects list */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:max-h-[780px] lg:p-6">
              {!selectedLocation ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center px-4 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface-2">
                    <Compass className="h-7 w-7 text-brand" />
                  </div>
                  <h4 className="text-base font-semibold text-ink">
                    {t('selectCity')}
                  </h4>
                  <p className="mt-2 max-w-[240px] text-sm leading-6 text-ink-muted">
                    {t('selectCityDesc')}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-brand">
                    <MapPin className="h-3.5 w-3.5" />
                    {t('exploreMap')}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedLocation.projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/${locale}/projects/${project.id}`}
                      className="group flex gap-3 rounded-2xl border border-transparent bg-surface-2/70 p-3 transition-all duration-300 hover:border-brand/30 hover:bg-surface-2 hover:shadow-md sm:gap-4"
                    >
                      <div className="relative h-[76px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:h-[88px] sm:w-[104px]">
                        {project.thumbnailUrl ? (
                          <img
                            src={project.thumbnailUrl}
                            alt={project.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Building2 className="h-7 w-7 text-ink-muted" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand">
                            {t('projectNumber', {
                              number: String(project.number).padStart(2, '0'),
                            })}
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                        </div>
                        <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-brand sm:text-base">
                          {project.name}
                        </h4>
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-ink-muted">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {project.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar footer */}
            <div className="flex items-center justify-between border-t border-line px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                  {t('mappedProjects', { count: mappedProjects })}
                </span>
              </div>
              {unmappedProjects > 0 && (
                <span className="text-[10px] text-ink-muted">
                  {t('unlocatedProjects', { count: unmappedProjects })}
                </span>
              )}
            </div>
          </aside>
        </div>

      </div>

      {/* MOBILE BOTTOM SHEET — працює замість сайдбара до lg */}
      {selectedLocation && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label={t('closePanel')}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm"
          />
          <div className="fixed inset-x-0 bottom-0 z-[70] max-h-[82dvh] overflow-hidden rounded-t-[28px] border border-line bg-surface-card shadow-[0_-15px_60px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-center pt-3">
              <div className="h-1 w-10 rounded-full bg-ink-muted/30" />
            </div>
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  {t('selectedLocation')}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-ink">
                  {selectedLocation.name}
                </h3>
                <p className="mt-1 text-xs text-ink-muted">
                  {t('projectsCountInCity', {
                    count: selectedLocation.projects.length,
                  })}
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label={t('close')}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-ink-muted transition-colors hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[calc(82dvh-115px)] overflow-y-auto p-4 pb-8">
              <div className="space-y-3">
                {selectedLocation.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/${locale}/projects/${project.id}`}
                    className="group flex gap-3 rounded-2xl border border-line bg-surface-2/70 p-3 transition-colors hover:border-brand/40"
                  >
                    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                      {project.thumbnailUrl ? (
                        <img
                          src={project.thumbnailUrl}
                          alt={project.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Building2 className="h-6 w-6 text-ink-muted" />
                        </div>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <span className="text-[10px] font-semibold tracking-widest text-brand">
                        {t('projectNumber', {
                          number: String(project.number).padStart(2, '0'),
                        })}
                      </span>
                      <h4 className="mt-2 line-clamp-2 text-sm font-semibold text-ink">
                        {project.name}
                      </h4>
                      <p className="mt-1 truncate text-xs text-ink-muted">
                        {project.location}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-2 h-4 w-4 shrink-0 text-ink-muted" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}