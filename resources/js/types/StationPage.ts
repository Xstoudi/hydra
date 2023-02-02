import { ErrorBag, Errors, Page, PageProps } from '@inertiajs/inertia'

export default interface StationPage extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag
    locale: string
    station: StationData
  }
}
