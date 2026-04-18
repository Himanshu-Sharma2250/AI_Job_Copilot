import { createFileRoute, useNavigate } from '@tanstack/react-router'
import ArchetypeForm from '../pages/ArchetypeForm'
import { states } from "../store/globalStates";
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { archetypes } = states();
  const navigate = useNavigate();

  useEffect(() => {
    if (archetypes.length !== 0) {
      console.log("archetype : ", archetypes)
      navigate({to: "/form"})
    }
  })

  return <ArchetypeForm/>
}
