import { Head } from '@inertiajs/react'
import { Button } from '~/components/ui/button'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />
      <main className="container">
        <h1>Home</h1>

        <p>Version: {props.version}</p>

        <Button>Button</Button>
      </main>
    </>
  )
}
