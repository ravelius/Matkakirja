# Pelikoodarin luovutus 23.9.2026 (klo 19.12): natiivi, erä 4 + luennat + Natiivi-UI-rajapinnat

Jatkaa luovutuksia `viesti-pelikoodari-luovutus-20260923-natiivi.md` ja `-natiivi2.md`. Lue ensin
`/Users/Shared/Claude/proto-3d/RAJAPINTA.md` (Pelikoodarin sopimus: sessiot, näkymät, syöte, äänet)
ja `Assets/Matkakirja/RAJAPINTA.md` (Natiivisepän kamera- ja karttarajapinta).

## Missä

| Asia | Tila |
|---|---|
| Proto-haara `pelikoodari/kysymys-ui`, worktree `/Users/Shared/Claude/wt/proto-pelikoodari` | @ e78892f. Masterissa c909e9a asti (master c0f9f3e). **e78892f merge-pyyntö lähetetty Natiivisepälle** |
| TestFlight build 1 | master 741352b (sisältää 9174ff6) |
| Verkkopelin PR #2956 pollo-worker natiivin puhe | MERGED |
| Verkkopelin PR #2965 natiivin chat (vastaus, ehdotukset) | MERGED |
| Verkkopelin PR #2942 lehtikuori | OPEN (Julkaisija) |
| Verkkopelin PR #2955 lehden teko-silta + maalehti (`&maa=ISO3&sivu=`) | OPEN, pohjana #2942; worktree `/Users/Shared/Claude/wt/pelikoodari-lehti-silta` |
| Ämpärin sisältöpaketti | osoitin v3; koepaketti `/Users/Shared/Claude/sisalto-koe/v11` (Siirtoseppä) |

## Mitä natiivissa on (Pelikoodarin osuus)

- **Pelilogiikka (puhdas C#, kultaiset jäljet verkkopelistä):** matka, kysely, laatat, kokemus,
  pulmat (11 generaattoria; paketin tunniste `generaattori` tai `generate.$funktio`), kaksintaistelu,
  tapahtumakortit (**pois maailmankartalta**: `PeliOhjain.TapahtumakortitMaailmankartalla = false`,
  koska webin maailmankartalla ei ole kortteja; paketin kokoelma on Afrikan), kaupat, voitto.
- **Ohjain PeliOhjain:** kartta → kaupunkikortti (Natiivi-UI) → matkavalinta → kamera-ajo →
  saapumistraileri (Natiivi-UI, tila Traileri) → lehti → matkakirjaluento; "Tutki kaupunkia" →
  kysymys / pulma / kaksintaistelu samassa IKysymysNakyma-näkymässä (tervehdyssivu, tuomio 0,9 s →
  paljastus, kohtaamiskuvat, löytöjen manner- ja maakohtaiset nimet, kätkökuva).
- **Rajapinnat Natiivi-UI:lle:** PeliNakymat-tehdas (Tilarivi, MatkaValinta, Kysymys, KaupunkiKortti,
  Saapumistraileri), tapahtumat LivianTilanne, LuentoAlkoi/LuentoLoppui, KaytossaMuuttui; teot
  KauppaTeko, LueLehti, LueMaalehti, OhitaLuento, Liiku, AvaaKortti.
- **Syöte:** SyoteLukko ainoa PalloKierron SyoteEstetty/UiPeittaa/NakymaPeitetty-kirjoittaja.
- **Äänet:** Puhe (äänitteet + pollo-workerin puhesynteesi, välimuisti, Asetukset: Kertoja,
  Lukija, mykistys), Luennat (intro, lento-alku, saapumispuheet, 45 matkakirjaluentoa, reaktiot).
- **Kuva- ja lippukysymykset** kokoelmista kuvakysymykset + lippumaat (valmiit url:t).
- **Testit:** `cd Peli-testit && ./kaanna.sh` 136/136; `./unity-tarkistus.sh` 0 (kääntää kaikki
  asmdefit riippuvuusjärjestyksessä, `asmdef-jarjestys.py`); `KOEPAKETTI=<…/v11/kokoelmat>
  ./kaanna.sh Koepaketti` jäsentää koko koepaketin.
- Testikomennot ja odotetut arvot: `Peli-testit/README-silmukka.md` (silmukka-kysymys.txt k1–k8
  ajettu iPadilla ab8098e: kaikki ok).

## Avoinna ja uusi sessio ensin

1. **Varmista e78892f masterissa** (Natiiviseppä). Siinä on pulmien generaattoritunnisteen
   korjaus: ilman sitä 6/11 pulmaa putoaa, kun paketti v11 tulee ämpäriin.
2. **Kun ämpärin osoitin nousee (v11+):** aja laitteella/simulaattorissa silmukka-kysymys.txt ja tarkista
   `tila`-JSONista kuva-/lippukysymykset (`kysymys.laji` Kuva/Lippu, `kuva` https), luentojen määrä
   (`puhe.luentoja` 45) ja pulmat. Aja myös `KOEPAKETTI=… ./kaanna.sh Koepaketti` uutta pakettia vasten.
3. **Luentojen reaktiot:** v11:n luennat-kokoelmassa ei vielä ole `reaktiot`-kenttää (Siirtoseppä kertoi
   lisänneensä sen haaraan siirtoseppa-nippu4-kartta). Jäsennin ja ajoitus (LuentaReaktio.ReaktioAjat)
   ovat valmiit ja testattu; kun kenttä tulee, KoepakettiTestit näyttää `reaktioita > 0` ja vaatii
   kaikkien ankkurien osuvan tekstiin.
4. **Pulmapiirrokset:** valmiit Natiivi-UI:ssa (UI/PulmaLuonnos.cs, kaikki 11). Pelikoodarilta ei puutu
   mitään; KysymysNaytto.PulmaId + Luonnos syöttävät ne.
5. **#2942 → #2955** (Julkaisija): kun ne ovat tuotannossa, lehden kulttuurivisa/minitehtävä/pulla
   kirjautuvat natiivin rahaan ja kartuschan maalehti toimii laitteella.
6. Myöhemmin: tapahtumakorttien linjaus maailmankartalle (Fable), pilvisynkka ja tallennuksen
   versiopolku, voittotarkistuksen kutsu Matkasta (vaelluksessa aina epätosi).
