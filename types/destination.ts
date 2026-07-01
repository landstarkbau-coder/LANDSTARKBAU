// types/destination.ts
export interface Destination {
  id: string
  name: string           // "SAINT ANTÖNIEN"
  location: string       // "Switzerland Alps"
  description: string    // опис місця
  imageUrl: string       // фонова картинка
  thumbnailUrl: string   // мініатюра для картки
  number: number         // 01, 02...
}

export interface HeroProps {
  destinations: Destination[]
}