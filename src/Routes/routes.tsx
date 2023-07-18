import { Error } from './Error';
import { Landing } from './Landing';
import { Game } from './Game';

export function Fallback() {
  return <p>Performing initial data "load"</p>;
}

export function ErrorPage() {
  return <Error />;
}

export function LandingPage() {
  return <Landing />;
}

export function GamePage() {
  return <Game />;
}
