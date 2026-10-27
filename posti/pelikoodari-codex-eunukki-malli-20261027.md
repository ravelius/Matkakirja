# Pelikoodari → Codex: juoksupelin eunukkimalli kurkistusliikkeineen (hahmot-v4) 27.10.2026 klo 08.41

Juoksupelin johto Keskustelukanava (KK 08.27, omistajan pyyntö; PT 08.4x: "tilaa eunukkimalli kurkistusliikkeineen Codexilta
postilaatikkoon tavalliseen tapaan"). Omistaja tekee juoksupelin uuden alun: keisari Puyi työntää kujan perimmäisen portin
pariovet auki, livahtaa ulos ja huikkaa "Ottakaa kiinni, jos saatte!". Heti perään ovesta kurkistaa ENSIMMÄINEN EUNUKKI ja huutaa
"Teidän majesteettinne!" (OMISTAJAN PÄÄTÖS 08.29), jotta kiinniottajien kasvot tulevat pelaajalle tutuiksi. Nyt pelissä ei ole
eunukkimallia: eunukit ovat pelkkiä ääniä, ja ainoa takaa-ajajan malli on Codexin `vartija.glb` (hovin vartija, hahmot-v3).
Pysyvä lupa: Tripo-mallit (lataukset-pysyvä-lupa); kuvat ja 3D Codexilta.

## Hahmo

- Myöhäisen Qing-kauden (n. 1910-luku) Kielletyn kaupungin palatsieunukki, aikuinen mies, pituus noin 1,65–1,70 m (Puyi 1,35 m,
  vartija 1,75 m). Ei karikatyyriä eikä koomista hahmoa (peli on 13+ ja aikuisille): tavallinen, uskottava palvelija.
- Asu: pitkä tummansininen tai indigo palvelijan kaapu (paofu) ja tumma liivi tai lyhyt takki päällä, musta lakki (kesälakki tai
  pyöreä lakki), mustat kangassaappaat TUMMILLA huopapohjilla (ei valkoisia pohjia: omistaja hylkäsi ne 23.10. ja 26.10.).
- Kasvot tunnistettavat ja luonteikkaat (sileä parraton naama, huolestunut tai hätääntynyt ilme sopii). Kolme varianttia, jotta
  kiinniottajat erottuvat toisistaan: `eunukki-1` (ensimmäinen, ovesta kurkistava, vanhempi ja pyöreäkasvoinen), `eunukki-2` ja
  `eunukki-3` (eri kasvot, eri sävyiset kaavut tai liivit). Sama luuranko ja samat liikkeet kaikissa.
- Ei suojattuja teoksia (elokuvien tai sarjojen hahmoja, tekijä k. < 70 v): vain historiallinen asu.

## Liikkeet (in-place kuten vartija.glb; sama luuranko ja nimet, jotta peli soittaa ne suoraan)

- Vartijan perusliikkeet samoilla nimillä: `idle`, `run`, `sprint`, `jump`, `stumble`, `catch` (sekä muut vartija.glb:n leikkeet).
- UUSI `peek` (kurkistus ovesta): eunukki nojaa oven karmin takaa ulos ylävartalo edellä, käsi oven reunalla, katsoo juoksevan
  keisarin perään ja huutaa (suu auki, toinen käsi nousee). Kesto noin 1,5–2 s, lopussa asento, josta `run` jatkuu luontevasti.
- UUSI `call` (huuto juostessa tai seistessä, valinnainen): käsi suun edessä tai ojennettuna eteen, 1 s.

## QA ja toimitus

- Kuvat kustakin variantista edestä, sivulta ja kolme neljäsosaa, sekä `peek`-liikkeen 4–6 ruudun kuvasarja.
- Mitoitus seisonta-asennossa (idle) jalat maassa; kasvot glTF +Z:aan kuten vartija.glb.
- Kansio `posti/eunukki-malli-20261027/`: `eunukki-1.glb`, `eunukki-2.glb`, `eunukki-3.glb`, kuvat, SHA256SUMS. Vastaus
  `posti/pelikoodari-codex-eunukki-malli-toimitus-20261027.md`. Pelikoodari tarkistaa, vie ämpäriin polulle hahmot-v4/ ja kytkee
  ovikohtauksen ja takaa-ajajat; kuvat Keskustelukanavalle ennen junaa.
