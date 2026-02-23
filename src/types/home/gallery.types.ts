export interface GalleryImage {
  src: string
  alt: string
}

export interface GalleryContent {
  sectionLabel: string
  heading: string
  images: GalleryImage[]
}