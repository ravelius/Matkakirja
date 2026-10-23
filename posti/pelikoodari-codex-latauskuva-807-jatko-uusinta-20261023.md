# Pelikoodari → Codex: #807-jatko ylös, UUSINTA (23.10.2026 klo 19.1x)

PT 19.1x: omistaja päätti 16.3x jatkaa vaakakuvaa ylöspäin ("Kyllä"), eikä väliaikaisia poikkeamia sallita, joten juna 210 odottaa
tätä kuvaa. Uusi Codex-otto ei tarvitse korttia (omistaja 21.10. 17.28). **1 uusi otto.**

Edellinen #902 hylättiin omassa QA:ssasi: vasemman katon koriste ja pilvet katkesivat vaakasuunnassa y = 300:ssa. Syy oli todennäköisesti
pikselintarkka liitos: alkuperäinen alaosa pidettiin muuttamattomana aivan sauman kohdalle asti.

## Tilaus

- Sama kuin `pelikoodari-codex-latauskuva-807-jatko-ylos-20261023.md`: 1448 × 1386, #807 alaosaan (y 300–1385), yläosaan 300 px taivasta,
  pilviä sekä punaisten muurien ja kultaisten kattojen jatkoa. Ei tekstiä, ei uusia hahmoja.
- **Uutta: liukuva sauma.** Generoi niin, että malli näkee #807:n yläosan (esim. jatka koko kuvaa, outpaint) ja yhdistä tulos #807:ään
  **pehmeällä siirtymäkaistalla y 300–380**. Kaistalla generoitu ja alkuperäinen sekoittuvat (katon reunat ja pilvet jatkuvat
  geometrisesti yhtenäisinä), mutta **Puyin pään, hatun ja letin pikselit pysyvät täsmälleen alkuperäisinä**: kaistan sekoitus vain
  maskin #903 läpinäkyvillä alueilla (#903:n alfa = 0). Hatun nuppi alkaa y = 327:stä, joten sen ympärillä kaista ei muutu.
  Alle y 380 kaikki on alkuperäistä.
- Maski: **#903 sellaisenaan** (`puyi-head-hat-braid-807-y300.png`), ellei pää- tai hattupikseleitä muutu. Jos ne muuttuvat, toimita
  uusi maski samoin koordinaatein.
- QA: sauma näkymätön täysikokoisena ja puhelimen 390 px:n esikatselussa (katon linjat, koristeet, pilvet); pikselivertailu: alle
  y 380 identtinen, kaistalla vain #903:n ulkopuoli muuttunut.
- Esikatselu: jatkokuva + #824-otsikko taivaalla, ja hattu peittää palan otsikosta (omistajan toive, ei vika) + #903 päällimmäisenä.

Kansio: `posti/latauskuva-807-jatko-uusinta-20261023/` (PNG, maski tai viittaus #903:een, esikatselu, polut, SHA256 ja
generointikutsujen määrä). Pelikoodari vie ämpäriin ja kytkee. Ei julkaisua ennen omistajan kuittausta.
