# Latauskuvat ja kevyt liike (Natiivi-UI 8.10.2026)

Omistaja 8.10.: latauskuvat kevyesti animoiduiksi ("heilunnaksi riittää hyvin vähäeleinen liike"). Pohja LATAUSKUVA (tyylikirja
pohjat.LATAUSKUVA; UI/Latauskuva.cs, Linssit/Ydin/LatausLiike.cs): tausta + 1–2 liikkuvaa kerrosta alfalla + köydet vektoreina;
heilahdus ±0,5–0,75°, nousu ≤ 4 pt, jakso 7–8 s; valokuvissa hidas lähentyminen (Ken Burns) 1,00 → 1,04 / 8 s ja takaisin; nimi ja
latauspalkki ennallaan; ilman kerroksia still. Päivitys 33 ms UI-ajastimella (ei täyttä ruudunpäivitystä).

## Kaikki latausnäkymät (yksi rivi = tila ja ehdotus)

| # | Näkymä (koodi) | Nyt | Liike LATAUSKUVA-pohjalla | Tila |
|---|---|---|---|---|
| 1 | Kuumailmapallon latauskuva (OpasValikko siirtymaKuva, 3 rajausta R2:ssa) | still koko ruudulla | Nyt: still lähentyy (Ken Burns keskeltä). Kerroksin: kupu ±0,6° / 3 pt / 7,5 s kääntö kuvun yläosasta, kori ±0,5° eri vaiheessa, 4 riippuköyttä korista kupuun ja ankkuriköysi korista maahan vektoreina, tausta still | KYTKETTY still (a7953991e, juna 166, kuitattu); kerrokset Codexilta (tilattu) → LS1 kytkee |
| 2 | Oppaan latauskuva (kohteen 1. valokuva Kuvasuurennoksessa, ≤ 8 s) | valokuva | Ken Burns 1,00 → 1,04 / 8 s, suunta kuvan tunnisteesta; nipistys keskeyttää | KYTKETTY (39d43932a, juna 165) |
| 3 | Olavinlinnan nimiruutu (DioraamaTaulu, mk-astroavaus, 2–9 s, palkki) | musta + nimi | Tausta (linna 1499, salmi) Ken Burns; VENE kerroksena ±0,6°, nousu 2–3 pt, 7–8 s kääntö kölistä; valinnainen usva ±0,5° / 3 pt / 8 s; valinnainen 1499-viiri taustassa (ei sinikeltaista eikä Suomen lippua) | Codex-tilaus Sisältökirjurilla; kytken kun polut tulevat (omistaja hyväksyi 10.5x) |
| 4 | Cupolan avaus (AstronautinNakyma, LCD-teksti mustalla, 2–4 s) | musta + LCD | Tausta: Maa kiertoradalta (Ken Burns); kerros: Cupolan ikkunakehys alfalla ±0,5°, nousu 2 pt, 8 s (leijunta painottomassa tilassa); LCD-teksti päällä ennallaan | Päätoimittaja: tausta NASA:n PD-kuva Euroopasta ISS:ltä (ei generoitua Maata), Codexilta vain ikkunakehys; odottaa omistajaa |
| 5 | Astronautin kameran avaus (AstronautinNakyma, "ASTRONAUTIN KAMERA", 1,8–12 s) | musta + otsikko | Tausta: NASA:n PD-kuva Maasta (Commons), Ken Burns; ei kerroksia | Uusi kuva (PD, ei generointia) → omistajan hyväksyntä Päätoimittajan kautta |
| 6 | Sovelluksen aloitusverho (logo mustalla, 1–8 s) | logo | Ei liikettä (tunnus, iOS-käynnistysruudun jatke) | Ennallaan (Päätoimittaja 8.10.) |
| 7 | Kielletty kaupunki -nimiruutu (DioraamaTaulu) | musta + nimi | Kuten #3 | EI tilata: VAIN EUROOPPA (omistaja 27.9.) |
| 8 | Lontoo-pilotti (KierrosTaulu, mk-astroavaus) | musta + nimi | – | Ennallaan (kehityspilotti, opas korvasi) |
| 9 | Ajattelijat (prologin pimeä) | tarkoituksellinen pimeä | – | Ennallaan (kerronnallinen pimeä) |
| 10 | LinssiPeite / Odotuspeite / Mustaverho (väripeitteet < 1–2 s) | väri | – | Ennallaan (lyhyitä, ei kuvaa) |
| 11 | Saapumistraileri (kaupungin avauskuvat liukuvat) | liikkuu jo | – | Ei latausnäkymä, ei muutosta |

## Codex-kerrosmääritykset (Sisältökirjurille)

Kaikki PNG, sama rajaus kerroksittain, kolme rajausta: iPhone pysty 1290×2796, iPad pysty 2048×2732, vaaka 2732×2048. Fotorealistinen,
merkintä "havainnekuva". Kääntöpisteet ja kiinnityspisteet pikseleinä taustan koordinaateissa.

- #1 Pallo: (a) tausta ilman palloa, (b) kupu alfalla, (c) kori alfalla; pisteet: kuvun kääntöpiste (yläosa), korin 4 kulmaa ja
  kuvun alareunan 4 köysipistettä, ankkuriköyden maapiste.
- #3 Olavinlinna 1499: (a) tausta (linna, Kyrönsalmi, taivas, tumma alaosa ~25 %, ei venettä; valinnainen 1499-viiri), (b) vene alfalla,
  (c) valinnainen usvakaistale; piste: veneen kölin keskikohta.
- #4 Cupola (odottaa omistajaa): (a) tausta NASA:n PD-kuva Euroopasta ISS:ltä (Commons, ei generointia), (b) Codexilta vain Cupolan
  ikkunakehys alfalla (ikkunat läpinäkyviä); piste: kehyksen keskikohta (kääntö).
