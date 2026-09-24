# Natiivi-UI:n kuvasarjat A1–A9: tulos (24.9.2026)

Simulaattori iPhone 18 Pro, proto-master `fff33f5`. Ajettu pystyssä,
ilman ääniä. Kuvat: `proto-3d/lokit/kuvasarjat-natiivi-ui-20260924/`.
Ajan puutteessa vaaka ja iPad jäivät pois — voin ajaa ne erikseen jos
tarpeen.

## PASS

- **A1** `ui maalehti GRC`: otsikko "KREIKKA · MAAN OMA LEHTI", ei "GRC".
  (A1-maalehti-grc.png)
- **A2** `ui tietoja` + vieritys loppuun: nimikilpi, copyright,
  "LÄHTEET JA AINEISTOT", ryhmät (mm. Natural Earth, ETOPO1, Freesound,
  d3-geo), "45 aineistoa", "Sovellus 0.1.0". (A2-tietoja-alku/-loppu.png)
- **A3** `ui chat`: ylärivillä sekä "Näytä puhekuplat" että "Ehdota
  sisältöä" (kupla oli ohitettu). (A3-chat.png)
- **A6** `ui matkakirja tanger havainto`: iPhonessa kortti alkaa
  kompaktina lappuna ylärivillä ("ISOISÄN PÄIVÄKIRJASTA, 1873 · …"),
  ei täytenä korttina. (A6-matkakirja-lappuna.png)
- **A9** `ui liiku`: Liiku-kompassi korostuu alareunassa, liuku neljällä
  ikonilla (liftaus/juna/laiva/lento) ilmestyy yläpuolelle.
  (A9-liiku-liuku.png). **Ei ehditty**: liftauksen noppa +
  "Vaihda matkustustapa" -nuolinappi, estettyjen ikonien harmaa tila
  ja tilarivin syy.

## Poikkeamat / löydökset — tarkista

- **A4** "Ehdota sisältöä" -napautus EI sulkenut chattia eikä avannut
  lomaketta kuten lista kuvaa. Sen sijaan greetingin alle ilmestyi kaksi
  napautettavaa esimerkkikysymystä ("Milloin Lontoon metro…",
  "Miten savuiset höyryveturit…") — vaikuttaa keskustelunaloitus-
  ehdotukselta, ei sisällön ehdotuslomakkeelta. Napautuskoordinaatit
  tarkistettu tarkasti (osuivat itse chip-tekstiin), toistettu 2×, sama
  tulos. (A4-ehdota-sisaltoa.png)
- **A5** `ui lehti ateena` → `ui chat Mikä on Akropolis?`: komento
  palautti "ok" mutta MIKÄÄN ei muuttunut näytöllä — lehti pysyi auki
  eikä chat-paneelia tai vastausta näkynyt lainkaan (odotettu 5–9 s).
  En tiedä onko kyse siitä että chat piirtyy lehden alle (z-järjestys)
  vai ettei komento oikeasti tee mitään lehden ollessa auki.
  (A5-chat-lehdessa.png — näyttää vain lehden, ei chattia)

## Ei ehditty

- **A7** (oikea saapuminen luennan kanssa, kortin kutistuminen lapuksi):
  `ui aloita <kaupunki>` -komento ohittaa Aloitusnakyman koko UI-virran
  (sama havainto kuin aiemmin aloituslennossa) — silmukka hyppää
  suoraan Karttaan ilman näkyvää saapumista tai luentaa, joten tätä ei
  voi testata tällä komennolla. Vaatisi oikean napautusvirran (Aloita
  seikkailu → valitse kaupunki) tarkalla ajoituksella.
- **A8** (chat-nappirivi, sanelu lupakyselyineen): nappirivi (näppäimistö/
  kaiutin/mikki) näkyy jo A3:n kuvassa, mutta mikin lupakysely →
  "Kuuntelen…" → osittainen teksti -ketjua ei ehditty ajaa. Simulaattorin
  mikrofoni/sanelu ei välttämättä vastaa oikeaa laitetta.

## B ja C -osiot

Ei aloitettu ajan puutteessa (B: aiemmat erät, C: äänikierros — B7:n
yhteydessä osa jo katsottu epäsuorasti).
