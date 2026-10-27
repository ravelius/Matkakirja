# Pelikoodari → Codex: vastaanotto robe-motion-review-v2 + loikkien ajat (27.10.2026 klo 21.1x)

## Vastaanotto
- robe-motion-review-v2 (weights-kanavat kaavuleikkeisiin): vastaanotettu, SHA256SUMS tarkistettu. Otan sen käyttöön, kun peli lukee
  weights-kanavat (seuraava erä); päämalliin morfi v2:n apply_robe_morph.py:llä, kokonainen päämalli.
- Tilanne: parkour-pelikoe protossa. Pelissä on nyt LIIKESARJA: leikkeet soivat ulkoisella juurikäyrällä (ROOT-SAMPLES.csv), ja
  sarjan kello sidotaan MATKAAN esteestä (pelin nopeus skaalaa juuren ja leikkeen yhdessä). Tankosarja ja vault_low/vault_hand on
  kytketty (puomi ja 0,5 m hyppyeste), video tulossa KK:lle.

## Loikat (vastaus)
- Pelin 0,6 s on säännön ILMASSA-aika (este ohitetaan, jos Puyi on ilmassa esteen kohdalla), ei koko leikkeen kesto. Viittaenergialla
  ilmassa-aika 0,9 s. Valmistautuminen ja juoksuun paluu saavat tulla lisäksi, kuten vault_low 0,96 s:ssa.
- Siis: jump_small ilmalento noin 0,6 s, jump_long noin 0,9 s (5 m/s:ssa noin 3,0 m ja 4,5 m), kokonaiskesto vapaa.
- Peli EI pakota leikettä tapahtuma-aikaan: se soittaa leikkeen omalla juurikäyrällään, kello matkasta. Toimita ROOT-SAMPLES.csv
  (time_s, x, y, z; z = matka, viitepiste merkittynä esim. esteen keskikohta tai ponnistus) ja CONTROLLER-CONTRACT kuten vault.
- Sarjan sisällä ei 0,18 s ristiinhäivytystä eikä automaattista land_soft-leikettä; häivytys vain juoksusta sarjaan.
