# Natiivi-UI: luovutus 28.10.2026 klo 23.12

Edellinen: viesti-natiivi-ui-luovutus-20261028-1420.md.

## Valmiit tänään (junissa)
- Kohdenostot piirroskuvakkein, ×1,25, maltillinen kontrasti ja ohut musteinen ääriviiva (OMISTAJAN PÄÄTÖKSET 14.04, 14.23,
  15.41, "Kelpaa" 16.12): natiivi-ui/kohdenostot-213 cc578c208 on junan 213 rungossa 1d6491eca.
  - Vahvistus: Kohdenostot.HaeVahvistettu (160 px:n GPU-pienennys, kylläisyys 1,1, gamma 1,4, kontrasti 1,3, ääriviiva
    2 px peitolla 0,6 värillä Tyylikirja.Kehys.Panel2). Kohdekartta näyttää piirrokset ennallaan.
- Esikatselun kiinteä pistekerroin 1 (PT 20.4x): natiivi-ui/esikatselu-kerroin-213 b48ecd7f8 on junan 214 rungossa f47850642.
  - Syy: Macin näyttö irtosi klo 19.07, editorin dpi oli 264, ja Round(dpi / 163) vaihtui 1 → 2.
  - Ohjaus: ympäristömuuttuja ESIKATSELU_PISTEKERROIN=x. Kerroin kirjataan kuvan .txt-sivutiedostoon ja lokiin.
  - Ohitus vain UNITY_EDITORissa (PalloKierto.EsikatselunPistekerroin).

## KESKEN: TF 213 -bugit 3 ja 4 (PT 22.46), odottaa PT:n ja KK:n OK:ta → merge-pyyntö NS:lle junaan 214
Haara natiivi-ui/kohdenostot-bugit-214, kärki 408d80914:
- Pohja juna-214 f47850642.
- Peili: natiivi-backup peili/proto/natiivi-ui/kohdenostot-bugit-214.
- Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kohdenostot-bugit.
- unity-tarkistus: 0 virhettä.

Bugi 3: piirretyt nähtävyyskuvat häipyivät välillä tai eivät ottaneet napautusta.
- Toisto: esikatselu-20261028-224854. Joka kohdassa 2–4 piirrosta oli peitossa 0 ja ilman napautusta (Garnier, Tuileriat,
  Concorde, Orsay).
- Korjaus (NostotKartalla.PeitaMallienAlta, Paivita; Kohdenostot.Lahella, Valitse):
  - Kalusteet, 3D-mallit ja horisonttiusva eivät piilota kohdenostoa.
  - Nostokerroksen syttyminen koskee vain karttavaloja; aiemmin koko merkkijuuren peitto sammutti kohdenostot.
  - Lähikartan portilla on 0,4 tason hystereesi.
  - Valittu kaupunki pysyy, kun kameran keskipiste on sen piirtorajoissa 50 %:n vara mukaan lukien.
- Tulos: esikatselu-20261028-225651, piilossa 0 kaikissa seitsemässä kohdassa.
- Testikomento `ui kohdenostot` näyttää PIILO-merkit ja "piilossa N, ruudulla M".

Bugi 4: iPhonella kartta muuttui mustaksi kohdenoston jutun takana ja palasi, kun jutun sulki.
- Syy: ≥ 70 %:n nähtävyysarkki asettaa kuvasumennukseksi Kokoruutu, jolloin pallon kamera sammuu. Arkki ei kuitenkaan näyttänyt
  pysäytyskuvaa.
- Toistui TF 213:lla iPadilla (pysty) ja iPhonella.
- Korjaus: Nahtavyysarkki näyttää pysäytyskuvan pohjalla mk-peli__pysaytys (kerros UiKerros.Nostot − 1), kuten lautapelit ja
  traileri.
- Pari PT:llä: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kohdenostot-bugit/pari-B4-iphone-ennen-nyt.png ja
  pari-B4-ipad-ennen-nyt.png.
- Simut: todistus-bugi4-{ipad,iphone}-20261028-2253/2258 (TF 213) ja todistus-bugi4-korjaus-{ipad,iphone}-20261028-2303/2307.

Ajot ja jatkokomennot:
- Esikatselu: `zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kohdenostot-bugit/ajo.zsh <SHA>`, skenaario sk-bugi3.txt.
- Simu (vain JU:n SIMU NYT:sta): `APP=… ERA=-x [LAITTEET="iphone 123B4B25-…"] zsh …/kohdenostot-bugit/ajo-simu-bugi4.zsh`.
  - Skenaario sk-bugi4.txt.
  - Laitteet: iPad 00CF62C2 ja natiivi-ui-iPhone16 123B4B25-36B7-4A76-B677-905621CD8F5A.
  - iPhonen UDID löytyy vain T7-sarjasta: `source tyokalut/palvelu/simusarja.sh; xcrun simctl --set "$MK_SIMSET" list`.

Seuraavaksi:
1. PT:n ja KK:n OK → merge-pyyntö NS:lle 408d80914 junaan 214.
2. Worktree proto-natiivi-ui-kohdenostot-bugit pois, kun haara on rungossa.

## Avoimet havainnot PT:lle (eivät kuulu bugeihin 3 ja 4)
- iPhonella kaksi ☰:tä: pelin yläpalkin ☰ kelluu nähtävyysarkin oikeassa yläkulmassa, ja arkin oma ☰ on otsikon vieressä
  (KK 22.57, omistajan kaappaus docs/raportit/kaappaukset/omistaja-20261028/nosto-musta-kartta-iphone-2255.png).
- Kohdenoston jutussa sama johdanto ja kuva toistuvat kahdesti (Eiffel ja Notre-Dame, simut 2253/2303).
  Todennäköisesti kohteen kaksi nostolinkkiä.
