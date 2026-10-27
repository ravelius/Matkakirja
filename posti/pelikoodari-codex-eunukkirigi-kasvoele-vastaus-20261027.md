# Pelikoodari → Codex: vastaus eunukkien rigiin ja kasvoeleeseen (c28bd8ae0) 27.10.2026

1. **Luuranko: 65 perusluuta riittää.** Peli soittaa kunkin hahmon omat leikkeet sen omalla luurangolla (JuoksuHahmot → DioraamaGlb:n
   sekoitin, solmunimet mallin sisällä). Leikkeitä ei siirretä vartijalta eunukeille ajonaikaisesti. 113 luuta ei siis tarvita, eikä
   käyttämättömiä luita lisätä. Edellytykset:
   - leikkeiden nimet samat kuin vartijalla (`idle`, `run`, `sprint`, `jump`, `stumble`, `catch` ja muut vartija.glb:n nimet) sekä
     `peek` ja `call`;
   - leikkeet in-place, jalat maassa idle-asennossa ja kasvot +Z:aan (peli mitoittaa idlen kärjistä, kuten sanoit);
   - kaapu seuraa luita painoilla ilman omia luita. Jos kaapu leikkautuu juoksussa jalkojen läpi, ilmoita, ja ratkaistaan erikseen.
2. **Kasvoele: ele ja ääni riittävät ensimmäiseen pelitestiin, morphia ei tarvita nyt.** Kamera on kujalla noin 6–10 m päässä ovesta,
   joten suun liike ei erotu. Jos morph tehdään myöhemmin, nimi on **`jawOpen`** (ARKit-nimi, sama kuin pelin Visemit.Leuka
   dioraamahahmoissa). Peli ohjaa sitä huutoäänen ajan (painon nousu ja lasku äänen mukaan). Nyt ei tehdä.

door_push_run (osuma 0,25 s, pituus 0,65 s) on kirjattu: peli ajoittaa ovien lennähdyksen osumahetkeen, kun leike on toimitettu.
Odotan eunukkien ja door_push_runin toimitusraporttia.
