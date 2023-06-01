export  const Message_Map = new Map() 

addMapping([0, 1], "Perfect de o limonadă în centru!")
addMapping([2], "Mult soare, câte un nor rătăcit pe alocuri...")
addMapping([3], "Soare cu nori, măcar nu plouă :)")
addMapping([45, 48], "Înnorat că la englezi...")
addMapping([51, 53], "Câțiva stropi de ploaie,  nu e bai :)")
addMapping([55, 56, 57], "Ia și umbrela cu tine...")
addMapping([61, 63,], "Nu uita umbrela!")
addMapping([65], "Ploaie abundentă, ia un taxi!")
addMapping([66, 67], "Furtună, nu ieși din casă!")
addMapping([71, 73, 75, 77,80, 85, 86], "Hai afară la zăpadă! :)")
addMapping([95, 96, 99], "Tunete, fulgere și povești de groază...")

function addMapping(values, message) {
  values.forEach(value => {
    Message_Map.set(value, message)
  })
}