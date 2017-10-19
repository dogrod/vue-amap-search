/**
 * default parameters of AMap configuration
 */
const DEFAULT_AMAP_PARAMS: IAMap.AMapLoadingParams = {
  protocol: 'https',
  hostAndPath: 'webapi.amap.com/maps',
  key: null,
  v: 1.3,
}

/**
 *
 */
const getAMapLoadUrl = (config: IAMap.AMapLoadingParams): string => {
  // declare keys list which needs process in config object
  const AMapParamsKeys = ['v', 'key']

  const configParams = Object.keys(config)
                            .filter(key => ~AMapParamsKeys.indexOf(key))
                            .filter(key => config[key] !== null)
                            .map(key => {
                              return {
                                key,
                                value: config[key]
                              }
                            })
                            .map(entry => `${entry.key}=${entry.value}`)
                            .join('&')
  return `${config.protocol}://${config.hostAndPath}?${configParams}`
}


/**
 * dynamic load AMap SDK script
 */
const loadAMapScript = async (params: IAMap.AMapLoadingParams) => {
  const config = {
    ...DEFAULT_AMAP_PARAMS,
    ...params
  }
  
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.defer = true
  script.src = getAMapLoadUrl(config)

  document.head.appendChild(script)
}

export default loadAMapScript