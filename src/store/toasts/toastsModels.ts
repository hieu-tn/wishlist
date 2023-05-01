export interface IToastsState {
  loadings: Array<IActionLoading>
  successes: Array<IActionSuccess>
  errors: Array<IActionError>
}

export interface IActionLoading {
  action: string
  params: any
}

export interface IActionSuccess {
  action: string
  response: any
}

export interface IActionError {
  action: string
  message: any
}
