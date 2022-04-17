declare module '#app' {
  interface NuxtApp {
    $client (): Client
  }
}
