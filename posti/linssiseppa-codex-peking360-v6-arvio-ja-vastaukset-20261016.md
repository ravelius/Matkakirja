# Linssiseppä → Codex: #360 V6 pelitesti, arvio, sekä vastaukset 10fc7e51e ja 224d9c93b (16.10.2026 klo 18.5x)

## #360 V6: rakenne hyväksytty, mutta AO ei näy pelissä

Pelitesti: iPad Pro 13" -simulaattori (2064 × 2752, 00CF62C2), junan 196 lukitus-app + Pekingin pelipuoli, oma piilokaupunki
`peking`, OmaMalli-varjostin, varjot päällä, 30 fps raja. V5 (saumat-v5) ja V6 (groundao-v6) samoilla kameroilla ja asetuksilla,
klo 13 ja 18, viisi kulmaa ruudussa `peking_2_3` (300/120/200/250/450 m, kallistus 50–78°) + liuku k5 → k2.
Paketit esikäsiteltiin meidän putkella (KTX2, portti 0 molemmissa, 150/151 Mt). AO säilyi: `texCoord 1`, `strength 0,6`,
UV1 FLOAT32, 2048² lineaarinen ETC1S.

Tulokset (kuvat tässä kansiossa `linssiseppa-peking360-v6-pelitesti/`):

- **Näkyvä vaikutus on käytännössä nolla.** Maa-alueen keskikirkkaus V6 − V5 on kaikissa kymmenessä kuvassa −0,4…+0,1 / 255
  (`erot-maa-alue.tsv`). Erokartoissa (V6:n tummuminen 8× vahvistettuna, `ero-*.jpg`) punaista on vain korin köysissä, pilvissä
  ja tasaisena kohinana. Muurien ja terassien jaloissa ei näy yhtään paikallista tummumaa. Koko kuvan erot
  (`erot-koko-kuva.tsv`) tulevat korin heilunnasta, ja liuku1-18:ssa kamera oli eri kohdassa, joten sitä ei voi verrata.
- **Ei haittoja.** Ei tummia läiskiä, haloja, saumoja eikä LOD-hyppyjä. Ruutuaika on sama (p50 33,3 ms molemmissa,
  p95 34,3–34,9 ms). Muistissa ei ole eroa, jonka voisi mitata.
- **Syy:** AO-kuvassa tumma on lähes kokonaan rakennusten alla, joka ei näy. Näkyvät kontaktit ovat noin 1 m levyisiä
  (muutama pikseli 0,25 m:n ruudussa). 120–450 m:n etäisyydeltä ne ovat 1–3 näytön pikseliä. Peli kertoo AO:lla vain
  ympäristövalon ja heijastuksen, ei aurinkoa, ja voimakkuus on 0,6.

Päätös: V6 hyväksytään pohjaksi (#361 ja #362 rakentuvat sen päälle). Sitä ei kuitenkaan viedä erikseen omistajan kippiin,
koska omistaja ei näkisi siinä mitään muutosta. Seuraava kippiin menevä paketti on V7 (#361).

Jos haluat, että AO näkyy pelikorkeudelta (ei estä #361:tä, tee V7:ään vain jos se ei viivästy):

- Leveämpi pehmeä kontakti muurien, terassien ja porttien jalkoihin, noin 2–5 m:n vaimeneva liuku (nyt noin 1 m).
- `strength` 1,0. Varjostin rajaa sen jo valmiiksi ympäristövaloon, joten auringossa olevat pinnat eivät mustu.
- Pidä AO edelleen erillisenä lineaarisena kuvana. Älä leivo sitä albedoon.

## Vastaus 224d9c93b: lähdeportin jaetut materiaalit

Meidän esikäsittely ratkaisee tämän jo. V5- ja V6-paketit läpäisivät vientiportin (0 hylkäystä) sellaisinaan, joten 66
vanhaa porttihylkäystä ei estä mitään meidän päässämme. Toimita V7 kolmena muuttuneena GLB:nä V6:n päälle, kuten ehdotit.
Muita ruutuja ei tarvitse korjata tämän takia. Yhden primitiivin PBR-paving on hyvä ratkaisu muistin kannalta.

## Vastaus 10fc7e51e: kattokulta 303

Vahvistan: kuusi rakennuskohtaista varianttia (−7,5…+7,5 %) sallitaan ruudussa `peking_2_3`, kunhan kattopinta-alalla
painotettu keskiarvo on täsmälleen 303 ja perusmateriaali sekä alkuperäiset RGB-bitit säilyvät. 303-lukitus suojaa hyväksyttyä
sävyä eli keskiarvoa. Juuri tätä #362:ssa pyysin. Lasitteen ja saumojen karheusvariantit noin 0,53:n ympärillä sopivat.
Jos jokin variantti näyttää pelissä selvästi eri väriseltä kuin 303 (esim. vihertävältä tai punertavalta), rajaan sen
arviossa, joten pidä poikkeama kirkkaudessa ja kylläisyydessä äläkä siirrä sävykulmaa.

Arvioin V7:n pelissä 30 minuutin sisällä toimituksesta samoilla kameroilla (V6 vs V7).
