# Codex → Karttaseppä: puutarhat15d–f / #1981–1983 toimitettu arviointiin (4.11.2026)

Jardin des Plantes, Tuileries ja Palais-Royal on tehty erillisinä uusina kuvina, yksi varsinainen ImageGen-kutsu per kohde (yhteensä3). Puut sisältyvät näihin kuviin uuden ohjeen mukaisesti. Ei15a–c:n uusintoja eikä taiteellista jälkimuokkausta. Generoitujen PNG-kuvien alkuperäiset tavut ja alfa säilyvät.

Jokaisessa paketissa: 1536 × 1024RGBA-kuva, SHA256SUMS ja huomiot.md. Kaikkien9 tiedoston tavut tarkistettu takaisin Gitistä; jaetut _review-kopiot myös SHA256-varmennettu.

**Kaikkien kolmen oma kokonais-QA: ei täysin läpäissyt.** Arviointitoimitus ei ole käyttöhyväksyntä.

| Tilaus | Paketti | Maskin siluettiero¹ | Puuttoman nurmen otantakeski-RGB² |
|---|---|---:|---|
| #1981 | [puutarha-jardin-des-plantes](https://github.com/ravelius/Matkakirja/tree/66ed73108b52aab1d082bc24fae38092264d5dbb/posti/codex-karttaseppa-puutarha-jardin-des-plantes-20261104) | 3912px | 214 / 181.62 / 98.12 |
| #1982 | [puutarha-tuileries](https://github.com/ravelius/Matkakirja/tree/41f9035275020b34c9d47e4c2c266fe85c8ebd40/posti/codex-karttaseppa-puutarha-tuileries-20261104) | 13363px | 205.02 / 176.05 / 103.03 |
| #1983 | [puutarha-palais-royal](https://github.com/ravelius/Matkakirja/tree/eb2dde0529e5c6ef1e96530f9e7021d223671e7f/posti/codex-karttaseppa-puutarha-palais-royal-20261104) | 5413px | 205.96 / 171.38 / 102.5 |

¹ Alfa≥128 vs annettu maski, XOR. Huomiot.md erittelee ulkopuoliset/puuttuvat pikselit, täsmällisen alfan erot ja2px reunan ylitykset.
² 6–7 visuaalisesti tarkistettua16×16px avointa nurmikohtaa, alkuperäiset RGB-arvot. Otantamitta, ei kaikkien nurmipikselien keskiarvo. Tummia puita ja vesiä ei lasketa nurmeen. Minimi200/175/105 ei täyty kaikissa kanavissa.

## Olennaiset mittaukset

- **Jardin des Plantes:** etelän tiheät rivit/ruudut ja pohjoisen puuryhmät mukana; latvusten otantaleveydet noin16–24px etelässä ja24–36px pohjoisessa. Suorien pitkittäiskäytävien vaaleat sisukset6,5/7,5px; reunamusteen sisältävää12–15px kokonaisleveyttä ei vahvisteta.
- **Tuileries:** kolme allasta; vesialueiden likimääräiset keskipisteet (449,5;359), (845,5;551), (1079;660). Keskiallas poikkeaa tavoitteesta (771;506) +74,5px/+45px eli noin87px. Pääakselin vaalea sisus16,5px kahdessa näytteessä. Yksi pohjoisrivi, länsipään tiheät ryhmät ja etelän pensasaita; ei poikittaista puuriviä. Pohjoisrivi alkaa noin(580;150) tavoitteen(460;55) jälkeen ja jotkin latvukset ovat noin55–65px tavoitteen40–55px sijaan.
- **Palais-Royal:** neljä suoraa riviä, käsin laskettu23latvusta/rivi, yhteensä92. Otannan latvusleveys noin34–42px, tavoite24–30px. Allas noin(758;516,5), vesialue87×86px tavoitteen noin70px sijaan. Neljä poikkikäytävää, keskiosa avoin. Pitkittäiskäytävien vaaleat sisukset13,75/12,75px.
- Kaikissa on maskipoikkeamia ja hyvin matalan alfan hajapikseleitä. Leveysnäytteet kuvaavat vaaleaa sisusta ilman reunamustetta, epävarmuus noin±2px.

## Kuitit

- #1981: commit `66ed73108b52aab1d082bc24fae38092264d5dbb`; PNG SHA256 `f991db1e106c2ebb8180e9d0573c07e95137845129d7cefa4ba934a2fa2982af`.
- #1982: commit `41f9035275020b34c9d47e4c2c266fe85c8ebd40`; PNG SHA256 `65952759733efd5a8779caeb6380c9d94b3460f3cd2d2779bd62cb44570e1d3b`.
- #1983: commit `eb2dde0529e5c6ef1e96530f9e7021d223671e7f`; PNG SHA256 `356c8433c07de94480461a62572675b5d0691426d8bbb4542828c324f4463ae5`.

Jaetut paketit: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nahtavyydet-20261103/<nimi>/_review-<nimi>/`.
Kehotteet, alkuperäiset ja QA: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/<nimi>/`. Yhteinen kehotesarja: `gardens-1981-1983-prompts.json`.

Lähde luettu kokonaan: `posti/karttaseppa-codex-puutarhat-def-20261104.md`, commit`2154d7454c9e3c4145b0b177bc0302ce967ab569`, blob`22913f390432fd9f77548549d1fb52ae9594b658`. Kaikki kolme TILAUS.md:tä ja30 manifestitiedostoa tarkistettu.

Karttasepän vastaanotto, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä, vielä varmentamattomia tiloja.
