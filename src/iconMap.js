
//mapping icon code with coresponding svg file
export  const ICON_MAP = new Map() 

addMapping([0, 1], "day")
addMapping([2], "cloudy-day-1")
addMapping([3], "cloudy-day-2")
addMapping([45, 48], "cloudy-day-3")
addMapping([51, 53], "rainy-1")
addMapping([55, 56, 57], "rainy-2")
addMapping([61, 63,], "rainy-3")
addMapping([65], "rainy-4")
addMapping([66, 67], "rainy-6")
addMapping([71, 73, 75, 77, 85, 86], "snowy-3")
addMapping([95, 96, 99], "thunder")

function addMapping(values, icon) {
  values.forEach(value => {
    ICON_MAP.set(value, icon)
  })
}