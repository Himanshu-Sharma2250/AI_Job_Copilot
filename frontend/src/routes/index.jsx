import { createFileRoute, useNavigate } from '@tanstack/react-router'
import LandingPage from '../pages/LandingPage'
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
      navigate({to: "/create-resume"})
    }
  })

  return <LandingPage/>
}
