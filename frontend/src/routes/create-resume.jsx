import { createFileRoute } from '@tanstack/react-router'
import MainPage from '../pages/MainPage'

export const Route = createFileRoute('/create-resume')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainPage />
}
