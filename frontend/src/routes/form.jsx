import { createFileRoute } from '@tanstack/react-router'
import ArchetypeForm from '../pages/ArchetypeForm'

export const Route = createFileRoute('/form')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ArchetypeForm />
}
