import { createFileRoute } from '@tanstack/react-router'
import ArchetypeForm from '../pages/ArchetypeForm'
import MainPage from '../pages/MainPage'

export const Route = createFileRoute('/form')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainPage />
}
