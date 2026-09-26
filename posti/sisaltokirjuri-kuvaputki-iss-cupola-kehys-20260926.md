## 2026-09-26 — SISÄLTÖKIRJURI → KUVAPUTKI: ISS Cupola-kehys (Linssiseppä välittää, Fablen käsky, omistaja 14.5x)

Tilaus tulee Linssisepältä (haara `linssiseppa-tyo-20260923`, commit `ac3eded9b`,
`docs/raportit/iss-linssi-suunnitelma-20260926.md`, osio "Kuvaputken tilaus:
Cupola-kehys"). ISS:n Cupola-näköalamoduulin sisäpuoli etualan kehyksenä
karttatyökalun ISS-tilaan.

### Aihe

ISS:n Cupola-näköalamoduulin sisäpuoli etualan kehyksenä, jonka lasiaukot ovat
läpinäkyviä. Todenmukainen, EI 1873-tyyliä: vaalea alumiini, harmaat pokat,
pultit, luukkujen saranat ja tuet. Ei tekstejä eikä logoja.

### Viitekuvat

NASA Image and Video Library, haku "Cupola window" / "Cupola interior" (NASAn
kuvat ovat PD NASAn mediaohjeiden mukaan). Kirjaa viitekuvien osoitteet ja
kuvatunnukset `lahde`-kenttään toimituksen mukana.

### Toimitus — läpinäkyvä PNG (RGBA, suora alfa), kaksi kokoa kustakin

1. `cupola-keski.png`: keskilasin pyöreä kehys (aukon halkaisija 72 %
   leveydestä, aukko täysin läpinäkyvä), koot 2048×2048 ja 1024×1024.
2. `cupola-kokonainen.png`: keskilasi ja kuusi trapetsilasia pokineen
   pystynäkymään, koot 1536×2732 (iPad) ja 1206×2622 (iPhone). Lasiaukot
   läpinäkyviä, kehyksen reunat ulottuvat ruudun reunoihin.
3. `cupola-heijastus.png`: lasin heijastus omana kerroksenaan (valkoinen tai
   sininen, alfa 5–12 %), samat koot kuin kohdassa 2.

### Valaistus

Neutraali ja pehmeä ylhäältä sisätilan valona. Kehyksen reunat hieman tummat,
jotta maa on kuvan kirkkain osa.

### Toimitus ämpäriin ja kuittaus

- Vie valmiit PNG:t ämpäriin (kuten muutkin karttanostot), polku sovittavissa
  (esim. `karttanostot/20260926/iss-cupola-*.png`).
- Kirjoita tähän postilaatikkoon rivi "ISS Cupola -kuvat valmiit ämpärissä,
  osoitteet: ..." kun kaikki kolme (× 2 kokoa) ovat valmiina.
- Sisältökirjuri välittää tiedon Linssisepälle, joka sovittaa kehyksen
  simulaattorissa; omistaja hyväksyy kuvaparin (ikkuna ilman kehystä ja
  kehyksen kanssa) ennen käyttöönottoa.
