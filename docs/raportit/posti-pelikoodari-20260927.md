# Posti: Pelikoodari → Fable (27.9.2026 klo 13.xx, SendMessage-raja täynnä)

P1 puhevirta → proto `pelikoodari/puhevirta-korjaus` 7b4f762d Natiivisepälle (1.0.30; viesti lähetetty hänelle).
Todellinen vika, ei simulaattoriartefakti: iOS:n DownloadHandlerAudioClip ei jäsennä striimattua MPEG:iä
(DataProcessingError, HTTP 200), ja varapolku luovutti → hiljaisuus. Korjaus: virhe → pala vanhalla polulla
+ virta pois istunnon ajaksi, joten puhe ei voi enää vaientua; Natiivisepän 49ea64ee pitää virran oletuksena pois.
Progressiivisuus natiiviin toisella tavalla (lyhyt ensimmäinen pala) — ehdotan erilliseksi eräksi.

Lisäksi: 3399 ja 3401 valmiit Julkaisijalle (Pelistreak-kortti korjattu hyväksytyn mukaiseksi, armopäivä web aff13a5e6
+ natiivi 70bebdde). Projektisivu (projekti.html) agentilla työn alla.

## Lisäys (P1 tarkennus: virta takaisin päälle)

Proto `pelikoodari/puhevirta-korjaus` uusi kärki (palavirta): iOS ei jäsennä striimattua mp3:a, joten progressiivisuus
tehdään pilkkomalla synteesi kasvaviin paloihin (1. ≤ 140 mrk ≈ 2 s generointia, seuraavat ×3, katto 2400);
seuraava pala haetaan edellisen soidessa ja jokainen soi laitteella toimivalla vanhalla polulla. Virta = päällä
oletuksena, mp3-striimi erillinen kokeilu (oletus pois). Peli-testit 325/325, unity 0, puhdas juna/b13:ään.
LAITETODENNUS PUUTTUU: kääntäjä oli varattu (Natiivisepän käännös). Mittaan A2FD9C9F:llä (`puhe virta` → 1. ääni ms,
`aani mittaa`) heti kun Julkaisija antaa "nyt", ja annan SHA:n Natiivisepälle vasta mitattuna.

## Postivahdille (levyvahti)

- `wt/proto-pelikoodari-uusipeli` poistettu (177-avaimet on masterissa).
- `wt/pelikoodari-vanha-checkout` on SYMLINKKI (→ /Users/samireivinen/Matkakirja-pelikoodari → /Users/Shared/Claude/Matkakirja-pelikoodari = Pelikoodarin aktiivinen roolikansio). Ei vie tilaa; 1,1 Gt on aktiivinen checkout. Ei poisteta.
- `wt/pelikoodari-striimiaani-korjaus` poistettu (#3404 mergetty).

## Projektisivu valmis omistajan korttiin

Luonnos-PR #3410 (sisältää #3399:n + Pelistreak-korjauksen; julkaistaan vasta kortin jälkeen). Kuvat:
`/Users/Shared/Claude/proto-3d/lokit/projektisivu/projekti-tilanne-tyopoyta.png` ja `-puhelin.png` (+ jokainen välilehti, yötila).
Node --test 4463/0. Kysymykset:
1. Tilannekatsaus sanoo "117 peliä", pelikatalogin data 116.
2. Z10 298 335 + 78 211 laattaa näkyy sivulla "kahdessa kerroksessa" — oikein?
3. Otsikot ulkoiselle yleisölle: "Omistajan kortit" → "Pelin omat mekaniikat", "Omistajan ideat" → "Ideat".
4. docs/ (myös raakadatat, joissa sisäisiä merkintöjä) on Pagesissa julkisena kuten ennenkin; sivu itse suodattaa.

## P1 puhevirta MITATTU → Natiivisepälle (SendMessage-raja täynnä, välitä myös hänelle)

`pelikoodari/puhevirta-korjaus` 2aec7015 (merge-pyyntö lokit/merge-pyynto-pelikoodari-maisemakompressori.md, viimeinen osio).
Pariteetti-iPhone A2FD9C9F, käännös 64e551f6, tuotannon worker: virta pois 1. ääni 8 768 ms → palavirta 2 565 ms;
aani mittaa +9/+21/+33 s: MatkakirjaPuhe soi palojen yli. Virta = päällä oletuksena. Fyysinen laite vielä Laitetestaajalle.
Julkaisijalle: mittaus valmis, simulaattori sammutettu ja siivottu.

## Natiivisepälle: pelistreak-haaran uusi kärki 1d16d464

+ hintatasot 122 maahan (#3402) ja kultaiset uusittu; 336/336, unity 0. Korvaa 70bebdde:n (merge-pyyntölokin viimeinen osio).
HAVAINNEKUVA-sääntö (Fable 13.4x): läpikäynti web + natiivi agentilla käynnissä; projektisivulla ei korjattavaa.

## JULKAISIJALLE KIIREELLINEN: korjaus #3414

Main punaisella #3412:n jälkeen → **korjaus #3414**: pelikatalogi-data.js generoitu (22 korttia), testi sallii korttierät
(≥ 10, järjestys 1..n aukottomina), node --test 4458/0. Docs-PR:issä, jotka muuttavat docs/pelikatalogi.md:tä, pitää ajaa
`node tools/tee-pelikatalogi-data.mjs` samassa PR:ssä (Fablelle ja Sisältökirjurille tiedoksi).

## HAVAINNEKUVA valmis (Fable 13.4x)

- Web: **#3415** v2320 (lähderivit, ~135 kuvatekstiä, 97 maakuntalisenssiä, 33 "Kuvaputken generoitu valokuva"; uusi sanastotesti).
  Mergeä #3414:n jälkeen (sen 2 pelikatalogi-kaatumista ovat mainin punaisuus).
- Projektisivu (#3410): ei korjattavaa (osumat = historialliset kuvittajat, "kuvituksellinen" = kaavamainen).
- Natiivi, oma osuus (Peli/, Scripts/Peli/, Plugins/iOS/): ei osumia; kuvatekstit tulevat web-paketista.
- **Natiivi-UI:lle** (välitä): `Assets/Matkakirja/UI/KysymysNakyma.cs:357` LahdeRivi "Matkakirjan kuvitus" → "Matkakirjan havainnekuva"
  ja `:368` Rakenne.Teksti("Matkakirjan kuvitus", …) → sama. Nostokortti.cs:944 regex: pidä molemmat muodot.
- **Fablelle kysymys:** lähderivi "Tekoälyllä tuotettu havainnekuva. Viitteet: …" (204 datariviä, js/havainnekuva.js:84
  vihje, HAVAINNEKUVA_LAHDE_RE, natiivi Nostokortti.cs:981) jätettiin ennalleen — säilytetäänkö "Tekoälyllä tuotettu"
  avoimuuden vuoksi, vai pois?

## VAIN EUROOPPA (13.5x) kuitattu

Omissa erissä ei korjattavaa. Huom: docs/tilannekatsaus.md Yleiskuva → Seuraavaksi: "lisää linssejä ja kohteita Euroopan
ulkopuolelle" näkyy projektisivulla (#3410) — ristiriidassa uuden linjauksen kanssa; teksti on Fablen, korjaa md:hen, niin
projektisivu päivittyy (tools/tee-projekti-data.mjs).

## RAHATTOMUUSPALKKI (omistaja 15.1x) omistajan korttiin

Luonnos-PR **#3421** v2326 (8e39db7e). Kuvaparit: `/Users/Shared/Claude/proto-3d/lokit/rahattomuuspalkki/kuvapari-rahattomuus-393x852.png`
ja `-834x1194.png` (A rahat kunnossa | B rahat loppu 6/8 lohkoa, "RAHAT LOPPU · 1 VRK 12 H"). Pergamenttilappu yläreunan
painikkeiden alla keskellä; iPadilla päiväkirjan ja selitteen välissä; ei ota kosketuksia; nostot väistävät. Yläpalkin
"rahat loppu · N vrk" poistettu (katkaisi päivämäärän puhelimella), kassa pysyy punaisena. Mitat Natiivi-UI:lle lähetetty
(tekee natiivin kortin jälkeen). node --test 4459/0.

### Rahattomuuspalkki päivitetty omistajan tarkennukseen 15.2x (Natiivi-UI välitti)
#3421 → 27ced122: pelkät punaiset neliöt (ei tekstiä), yläpalkkiin lyhyt "£0 2 vrk" kaikilla ruuduilla. Kuvaparit uusittu samoihin polkuihin.

### Rahattomuuspalkki KORJATTU Fablen viestien mukaan → #3421 44deb9e2
Pelkät punaiset neliöt (8 × 9×9 px): ei tekstiä, ei tuntilukuja, ei kehystä, sama ulkoasu iPhone = iPad (keskellä
painikerivin alla). Yläpalkissa punainen "£0 2 vrk" kaikilla leveyksillä (vrk EI poistettu). node --test 4459/0.
Kuvaparit uusittu: `/Users/Shared/Claude/proto-3d/lokit/rahattomuuspalkki/kuvapari-rahattomuus-393x852.png` ja `-834x1194.png`.
