# Luovutus: Sisältökirjuri 27.9.2026 klo 14.0x (kontekstin nollaus, 71 %)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260927-e.md`. Tämä on
**kontekstinnollausluovutus** — Fable pysäyttää tämän session 71 %:n
kontekstissa, uusi sessio jatkaa samalla checkoutilla.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan
4. `docs/pelikatalogi.md` — pelisuunnitelmakortit 1–20 nyt mainissa

## 2. Tila

**main = v2318+** (SHA `01c43cc8e` viimeisin fetchattu). Tarkista
`git fetch origin main` — liikkuu edelleen, useita sessioita rinnakkain.

| PR | Sisältö | Tila |
|---|---|---|
| #3397 | Pelisuunnitelmakortit 1–10 + Lentopeli + Pelistreak | MERGETTY |
| #3398 | Nähtävyyskuvien tyylitarkastus (raportti + 49 kontaktiarkkia) | MERGETTY |
| #3402 | Hintatasot.js tarkennus 49 maalle | MERGETTY |
| #3412 | Pelikatalogi: pelisuunnitelmakortit 11–20 | MERGETTY |
| #3408 | Nähtävyyskuvien tasausskriptit + 36 orvon poisto | AVOIN, Julkaisijan junassa |
| #3411 | Löydös 178 -jatko: 42 ei-paikkaa pois kartalta + koko 1587 kohteen audit | AVOIN, Julkaisijan junassa |
| #3413 | Nähtävyyskuvien tasaus TUOTANTOON (413 kuvaa, v2320) | AVOIN, Julkaisijan junassa — **odottaa merge+deploy, sen jälkeen kohta 4.1** |

Muuta tehtyä tällä vuorolla:
- Postilaatikkoviesti Codexille (claude/postilaatikko,
  `posti/sisaltokirjuri-kuvaputki-7-maalattua-taustaa-20260927.md`):
  7 maalatun taustan priorisointi (osoittautui kahden vanhan,
  keskeneräiseksi jääneen tilauksen jäänteeksi, ei uusi kuvaus).
- Faktantarkistus `docs/tilannekatsaus.md`:sta (PR #3407) — Fable
  korjasi itse (commit `e30d738e0`). Tärkein löydös: natiivin 3D/
  meri-väite oli **vanhentunutta dataa minun agenttini tarkastuksessa**
  — Fable vahvisti natiivin olevan NYT Unity-sovellus (ei WKWebView-
  kuori), TF 1.0.29 sisältää 3D-maaston, erikoismallit ja meren 10
  lajia laitteella todennettuina. **HUOM seuraavalle sessiolle:** jos
  faktantarkistat natiivin tilaa jatkossa, älä luota pelkkään tämän
  reposton `ios/`-kansioon — natiivin oikea 3D-toteutus asuu ERI
  paikassa (proto-3d/Matkakirja-proto tms.) ja kehittyy nopeasti.
- Ehdotus Fablelle: 5 ohuinta Euroopan ulkopuolista kohdetta (ei
  vielä kirjoitettu) — Fable valitsi jatkoksi Lähi-idän 13 kaupungin
  erän + Novosibirskin + 0/0-kaupunkien oman erän (ks. kohta 3).
- Siivottu 5 vanhaa/jäänne-worktreeta (linssikatalogi-tilaus-paivitys,
  varhaisen taustaagentin oma nahtavyystyyli-worktree, oma
  epäonnistunut ensimmäinen tuotanto-PR-yritys, sekä kaksi mergetyn
  PR:n jäännöstä: hintatasot-tarkennus, pelikatalogi-11-20).

## 3. Jono seuraavalle sessiolle (Fablen 27.9. klo 14.0x päätös)

**1) LÄHI-IDÄN NOSTOERÄ** (yksi erä): 13 kaupunkia — Damaskos, Ankara,
Izmir, Riad, Kuwait, Doha, Mekka, Sana, Nikosia, Halab, Isfahan,
Tabriz, Masqat. Kaikilla on jo `NAHTAVYYSJUTUT`-artikkeli (4–6 juttua/
kaupunki) MUTTA nolla `nosto`-kenttää (interaktiivista karttanostoa)
— koko Lähi-itä jakaa saman aukon. Kirjoita nostot olemassa olevista
jutuista (ei tarvitse uutta tutkimusta, jutut ovat jo NAHTAVYYSJUTUT-
taulussa) + kuvat. Sen jälkeen Novosibirsk samalla periaatteella
(Aasia, sama kuvio: 5 juttua, 0 nostoa).

**2) 0/0-KAUPUNGIT omana eränä:** Kalgoorlie, Gao, Cayenne + 4 muuta
tasapelissä (Macapá, João Pessoa, Santarém, Portovelho, Mount Isa,
Geraldton, Broome — kaikilla 0 juttua JA 0 nostoa, 1–4 kohdetta).
Nämä tarvitsevat sekä jutut (NAHTAVYYSJUTUT) että nostot alusta
alkaen, toisin kuin Lähi-itä jolla jutut on jo. Analyysi ja
menetelmä: viesti Fablelle "Ehdotus: 5 ohuinta kohdetta" (ei omaa
tiedostoa — ks. tämän session peer-viestihistoria jos tarvitset
täyden 148 kaupungin taulukon; laske uudelleen tarvittaessa
js/packs/maakartat.js + kulttuuri-kategoriat.js + nahtavyysjutut.js
+ city-continent-mapping js/packs/{africa,asia,northamerica,
southamerica,oceania,middleeast}.js:n `map.cityCountry`-tauluista).

**3) "HAVAINNEKUVA"-sana (omistajan sääntö 13.4x):** käy läpi
sisältöpakettien ja lehtien tekstit, joissa generoitua/AI-tuotettua
kuvaa kutsutaan "kuvitukseksi", "AI-kuvaksi" tai "generoiduksi kuvaksi"
→ korvaa sana "havainnekuva". En ehtinyt aloittaa tätä — tarvitsee
ensin grep-haun laajuuden selvittämisen (esim.
`grep -rn "AI-kuva\|generoitu kuva\|kuvitus" js/packs/*.js
docs/*.md` ja tarkempi rajaus mitkä osumat ovat oikeasti kuvatekstejä
pelaajalle vs. sisäistä dokumentaatiota — vain pelaajalle näkyvä
teksti pitää muuttaa, ei esim. tools/-kommentteja).

**4) Codex-arviotilaus kun #3413 on tuotannossa:** tarkista
`gh pr view 3413 --repo ravelius/Matkakirja --json state,mergedAt` JA
että se on oikeasti julkaistu (ei vain mergetty — Julkaisija hoitaa
julkaisun erikseen, tarkista pages/TestFlight tai kysy Julkaisijalta/
Fablelta). Kun tuotannossa: lähetä Codexille postilaatikkoon
arviotilaus — omistajan päätös: Codex arvioi tuotannon kuvat
tasauksen jälkeen ja korjaa räikeimmät poikkeamat. Lähtölista: 23
jäljelle jäänyttä poikkeamaa (ks. PR #3408:n raportti
docs/raportit/nahtavyyskuvien-tasaus-20260927.md kohta 2) + 7
maalattua taustaa (jo tilattu, ks. kohta 2 yllä — YHDISTÄ näihin
samaan tilaukseen äläkä tee kahta erillistä).

## 4. Odottaa omistajan/Fablen päätöstä

Ei uusia avoimia kysymyksiä tältä vuorolta erikseen — kaikki avoimet
kysymykset on jo kirjattu vastaaviin raportteihin (nahtavyydet-ei-
paikat-korjaus-20260927.md, nahtavyyskuvien-tasaus-20260927.md).

## 5. Voimassa olevat työtavat

Ei muutoksia. Ks. edellisen raportin (-e.md) kohdat 6 ja 9 — samat
opetukset yhä voimassa. **Uusi tämän vuoron opetus:** kun `cp`-komento
kirjoittaa satoja tiedostoja `assets/`-kansioon, Claude Coden auto-
luokitin voi estää sen ("Modify Shared Resources") — jäin odottamaan
JUMI:na Fablelle/omistajalle, älä yritä kiertää. Omistaja antoi luvan
suoraan chat-viestillä ("Saat luvan"), jonka jälkeen sama komento
meni läpi ilman erillistä pysyvää sääntömuutosta.

## 6. Julkaisukaava

```
git fetch origin main
node tools/uusi-versio.mjs "Muutosrivi"   # vain jos ei pelkkä docs
node --test tests/*.test.mjs              # LUE "# pass"/"# fail"
node tools/tarkista-kaksoisavaimet.mjs
node tools/build-standalone.mjs           # vain jos ei pelkkä docs
git add -A && git commit -m "..."
git push -u origin <haara>
gh pr create --title "..." --body "..."
```

Kuvien/assettien muutoksille (esim. `assets/kartat/miniatyyrit/`)
aja aina `node tools/mittaa-miniatyyrit.mjs` (vaatii `sharp`; jos ei
node_modulesia, symlinkkaa `ln -s /Users/Shared/Claude/Matkakirja-
fable/node_modules node_modules` — **ÄLÄ committoi symlinkkiä**, tein
tämän virheen kerran tällä vuorolla ja jouduin poistamaan sen
erillisellä commitilla).

## 7. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
  (checkout-haara `sisalto-pelikatalogi-20260927`).
- Avoimet worktreet: `sisaltokirjuri-nahtavyys-tasaus` (#3408),
  `sisaltokirjuri-nahtavyys-tuotanto2` (#3413), `sisaltokirjuri-
  nahtavyys-tyyppi` (#3411) — poista `tools/uusi-worktree.sh
  --poista`:lla kun vastaava PR mergetty.
- Ei uusia avaimia.

## 8. Aloitusviesti uudelle sessiolle

Ks. päivitetty `docs/raportit/viesti-sisaltokirjuri-aloitus.md`.
