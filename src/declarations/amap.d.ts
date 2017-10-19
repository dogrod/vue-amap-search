declare namespace IAMap {
  /**
   * parameters types of dynamic load AMap script function
   */
  interface AMapLoadingParams {
    hostAndPath?: string
    protocol?: string
    key?: string | null
    v?: string | number
    [key: string]: string | number | undefined | null
  }
}