import { useDocumentMeta } from '../lib/useDocumentMeta'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Experience } from '../sections/Experience'
import { Products } from '../sections/Products'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'
import { Contact } from '../sections/Contact'

export default function Home() {
  useDocumentMeta()
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Products />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}
