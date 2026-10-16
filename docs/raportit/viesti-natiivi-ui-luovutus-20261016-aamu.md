# Natiivi-UI: luovutus 16.10.2026 klo 04.31 (Postivahti: kova raja 35 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; vanhemmat (-yo ja aiemmat) on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöspyyntöä tyokalut/tarkista.sh (0 virhettä).
Simut: SIMU VAPAA ilmoitettu Julkaisijalle 04.1x (123B4B25 iPhone16, F7513985 iPad11) – varaa uudelleen ennen ajoja.
L2-käännökset: Julkaisija järjestää vuorot (lukko on mkdir-kilpa): kysy/ilmoita Julkaisijalle ennen jonoon menoa.

## VALMIS (juna 196)
- natiivi-ui/nimet-196 14c98baa5 + aloitus-195 bb85d1808 yhdistetty runkoon 196 d39ca2217 (NS 04.4x); tarkistin: kohokohdat.json oikein
  (kuva NUI, kysymykset PK), haarat kokonaan mukana. Kytkimet false (IssKohokohdat.Kaytossa, Sijaintipallo.KulmaIso, vihjeet).
- Tämän session commitit nimet-196:ssa: b5a27cbd4 tarttuva yläotsikko kohdevalikossa; 94377c6ea minipallon hakunimi mk-pallonimi
  (lasi-avaruus-pinta), aarrepiste hehkuvana ytimenä (Valopiste _Ydin) + väistö nimistä (Karttapisteet.NimiEsteet, Nimikerros);
  14c98baa5 kyytipallon testi (`linssi astro pallo tartu|pyorita|irti` toimii Cupolassa) + lukittu aarrepiste kehinä.
- PT kuittasi: K1 (9 korttia), aarre, hakunimi, teline (omistajan tilaama), minipallo viety KK:lle korttina.
- Raportti: proto-3d/_tyo/natiivi-ui/raportti-196-20261016-0236.md. Kuvat proto-3d/lokit/todistus-*-196-20261016-0[2-4]*.

## KESKEN: SHANGHAI-KELAUS osa 2 (PT 04.4x)
- Selvitys: proto-3d/_tyo/linssiseppa2/iss-nyt/SHANGHAI-KELAUS-20261016.md. Osa 1 (esihaku kelauksen alussa) = Valoseppä.
- Tehty: natiivi-ui/kelaus-196 33cb1fc93 (wt /Users/Shared/Claude/wt/proto-natiivi-ui-kelaus-196, pohja juna-196 e68faa906, pushattu):
  Yokuori.KevytOdottaa + KevytMaxPitoS 4 s (Valosepän tiedosto, ~15 riviä) ja AstronautinNakyma.LaatatValmiit (Cupolan mustan kriteeri
  yhteisenä) → KevytOdottaa. Loki: "kevyt pallo ulos N ms kelauksesta (pito|laatat valmiit|katto)", "iss: kelaus perillä, laatat valmiit".
- Odottaa: Valosepän vastaus rajapintaan (kaksi viestiä jonossa) + osan 1 SHA → yhdistä, käännä L2 (Julkaisijan vuoro), aja
  `zsh proto-3d/tyokalut/natiivi-ui-ajot/ajo-minipallo-paakaupungit-196.zsh <app-kansio>` (skenaario odottaa v2-perilla; P9 perillä-kuva)
  → kuva PT:lle (ei vinoa laattarajaa P9:ssä; lokista kevyt pallo ulos -rivi). Jos Valoseppä haluaa Yokuorin puolen itse: poista se commitista.

- LISÄYS 04.3x: Valoseppä kuittasi Yokuori-muutoksen OK. Osa 1 = linssiseppa2/kelaus-esihaku-196 a726e22a2 (6405bd562 + a726e22a2, sama
  pohja e68faa906). Seuraavaksi: merge a726e22a2 kelaus-196:een → käännös L2 → yhdistetty kuva-ajo (Valoseppä perui oman iPad-ajonsa).
  Lokit "cupolan kelausesihaku <id>: N laattaa … valmis X s". Valinnainen: lisää KevytOdottaa-ehtoon CupolaEnnakko.KelausOsuus < 1
  (0…1, 1 = valmis/ei hakua), jos laattamittari näyttää valmista liian aikaisin.

## AVOIMET
- Aloitusvihjeet (kytkin pois): iPhone vaakana oikean reunan kortit hipovat toisiaan ja Pulu peittää yhtä; iPadilla vihjeet kartan rajauksen
  takia ruudun ulkopuolella (kerrottu PT:lle).
- Intron fps: simussa ei mitattavissa kuormassa; oikea luku vain laitteelta. Edellisten luovutusten avoimet ennallaan.

## Opit
- Kaksi ketjua samalla simulla törmäsi (vihjeajo käynnistyi kesken minipallo-ajoa) → simuajot yhteen ketjuun tai odota pid.
- Kun pysäytät odottavan proto-kaanna.sh:n: lukko ei ole sen (trap asetetaan vasta lukon jälkeen) → kill on turvallinen; tapa myös ketju,
  muuten seuraava vaihe lähtee heti. Ketju ei näe muutettua skriptiä: tapa ja käynnistä uudelleen.
- Yokuorin kevyt pallo on kelauksen "perillä-häivytys"; KupolinKelaus.cs on puhdasta C#:ia (LCD-rivi), ei visuaalia.
- Kuvakaappauksen musta pilleri yläpalkissa = Dynamic Island -maski, ei pelin vika. Kelauksen jälkeen kuva vasta v2-perilla-tapahtumasta.
