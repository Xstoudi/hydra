import { ErrorBag, Errors, Page, PageProps } from '@inertiajs/inertia'

export default interface StationsPage extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag
    locale: string
    stations: StationData[]
  }
}
