export interface IToastsState {
  loadings: Array<IActionLoading>
  successes: Array<IActionSuccess>
  errors: Array<IActionError>
}

export interface IToastAction {
  id: string
  action: string
}

export interface IActionLoading extends IToastAction {
  params: any
}

export interface IActionSuccess extends IToastAction {
  response: any
}

export interface IActionError extends IToastAction {
  message: any
}
