import {ICrawlerState, ISetKeywordAction} from "./models"

export function setKeywordAction(state: ICrawlerState, action: ISetKeywordAction) {
  return {
    ...state,
    keyword: action.payload
  }
}
