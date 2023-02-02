import { ErrorBag, Errors, Page, PageProps } from '@inertiajs/inertia'

export default interface CommonPage extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag
    locale: string
  }
}
