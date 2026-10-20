# Sisältökirjuri → Fable: luovutus, Mac-siirto (2026-09-21)

Omistajan päätös: koko kehitystyö siirtyy Macin toiselle käyttäjälle
hakemistoon `/Users/Shared/Matkakirja/`. Tämä luovutus kirjoitettu
kesken kohdan 3 (BEL/SVK/SVN/CYP/MLT) — kolme viidestä maasta valmiina,
kaksi keskeytetty ohjeen mukaisesti ilman tiedostomuutoksia.

## 1. Haarat ja committit tässä vuorossa

### `iso-ajo-fra-kuvat-1` (pushattu kokonaan, ei enää kesken)
- `4eab2f17` — nostoinventaario.mjs korjattu (ihme.osoite lasketaan kuvaksi)
- `29cdd96f` — FRA:n 18 lehtinostolle itsenäinen teksti + 6 uutta visaa (25%→34,4%)
- `e9b9712c` — Montgolfier-tekstin faktavirhe korjattu (Fable havaitsi)

### `sisalto-vajaat-maat-30` (pushattu, KESKEN — pohjana `origin/v1973-prep`)
- `e0cbfaac` — Slovakia 26→30 nostoa
- `77b080d8` — Belgia 26→30 nostoa
- `a3d09fbe` — Slovenia 24→30 nostoa
- Kypros (22→~30) ja Malta (11→~25-30) EI ALOITETTU tiedostotasolla —
  taustasessiot ehtivät vain tutkimusvaiheeseen ennen keskeytystä,
  js/packs/hahmotelma-cyp.js ja hahmotelma-mlt.js ovat koskemattomia.

Kaikki kolme valmista maata: testit `node --test tests/*.test.mjs`
3793/0 fail, `node tools/tarkista-kaksoisavaimet.mjs` "ei
kaksoisavaimia", laudat-koordinaatit tarkistettu `tools/johda-
maastokohteet.mjs`:n `laudat()`-funktiolla, kuvat katsottu silmin
Read-työkalulla ennen hyväksyntää.

**Pieni siisti keskeneräisyys:** Slovenian kahdelta uusimmalta
nostolta (`hahmotelma-metlika`, `hahmotelma-pohorje`) puuttuu
`_json`-metadatatiedosto kansiosta
`/Users/samireivinen/Matkakirja-nostot-kuvat/svn/_json/` — itse
kuvatiedostot ovat levyllä oikeilla hasheilla ja pakin
`kuva.osoite`-viittaukset täsmäävät. Ei estä mitään, mutta joku voi
kirjoittaa puuttuvat kaksi JSON-tiedostoa myöhemmin samaan muotoon
kuin kansion muut (ks. esim. `koper.json`).

## 2. Iso ajo — eteneminen (Fablen 7-kohdan lista)

1. ✅ Nostoinventaario korjattu, ajettu uudelleen (0/1198 kuvatonta Euroopassa)
2. ✅ FRA:n vaihe 2 valmis (itsenäiset tekstit + visat)
3. 🟡 KESKEN: BEL/SVK/SVN valmiit 30:een, CYP ja MLT puuttuvat vielä
4. ⬜ Muu Eurooppa 30:een — ei aloitettu
5. ⬜ Visat ≥1/3 joka maahan — ei aloitettu (FRA jo 34,4%, tehty sivutuotteena)
6. ⬜ Taso 3 + 1873-nimistö muille maille — ei aloitettu
7. ⬜ Kadonneet monumentit 1-3/maa — ei aloitettu (Codex-tilaus odottaa Fablen hyväksyntää, ks. docs/raportit/havainnekuvat-codexille-20260921.md)

## 3. Erä `sisalto-nykyalueet` — EI ALOITETTU, BLOKATTU

Fable tilasi tämän kohdan 3 ja kohdan 4 väliin (kaksi viestiä: alkuperäinen
ja tarkennus "pysyvät kulttuurialueet saavat jäädä"):

1. `js/packs/nimisto-1873.js`: vain Hannover, Oldenburg, Braunschweig ja
   Anhalt siirtyvät `aika: '1873'`:ään.
2. Uusi `js/packs/nykyalueet.js`: FRA:n 13 regionia + DEU:n 16
   osavaltiota (teksti, luokka 'maakunta', lon/lat keskipiste, iso,
   koko), rajat GeoJSONina `assets/data/nykyalueet-fra-deu.json`
   (Natural Earth admin-1, PD, ≤300 kt).

**BLOKKI:** Tarkistin `js/packs/nimisto-1873.js`:n nykytilan
`origin/v1973-prep`:sta (commit `c8728d08`) — Hannoveria, Oldenburgia,
Braunschweigia eikä Anhaltia EI OLE tiedostossa lainkaan vielä. Nämä
alueet ovat vasta haarassa `origin/sisalto-nimisto-aika` (commit
`7bd5f5e5`), jonka Karttaseppä on vahvistanut toimivaksi omassa
poltossaan mutta jota EI OLE vielä mergetty `v1973-prep`:iin. Ennen
kuin tätä erää voi aloittaa, joko a) `sisalto-nimisto-aika` on
mergetty `v1973-prep`:iin (Julkaisijan/Karttasepän työtä), tai b)
seuraava tekijä tekee haaransa `sisalto-nimisto-aika`:n päälle eikä
`v1973-prep`:n päälle — jälkimmäinen on riski, jos molemmat haarat
mergetään erikseen myöhemmin (duplikaattikonflikti).

## 4. Työtavat ja ympäristö

- Worktree tähän asti: `/Users/samireivinen/Matkakirja-nostot` — TÄMÄ
  SIIRTYY omistajan käskystä hakemistoon `/Users/Shared/Matkakirja/`
  toiselle Mac-käyttäjälle. Uusi tekijä: tarkista uusi polku ja
  worktree-asetus ennen mitään komentoa.
- Agentit/taustasessiot: vain Opus tai Sonnet, ei koskaan Fable —
  tässä vuorossa käytetty 5 rinnakkaista Sonnet-taustasessiota (yksi
  per maa, kuten aiemmin `docs/raportit/kartuscha-vajaat-maat-
  20260921.md`), kolme ehti valmiiksi ennen siirtokäskyä, kaksi
  pysäytettiin `TaskStop`:lla siirtokäskyn saavuttua (ei tiedostoja
  ehditty kirjoittaa, joten ei roskaa jäljellä).
- Kuvien välivarasto: `/Users/samireivinen/Matkakirja-nostot-kuvat/
  <iso>/` (jpg + `_json/<slug>.json`) — TÄMÄKIN SIIRTYY, tarkista uusi
  polku. Kuvia ei ole viety R2-ämpäriin, `kuva.osoite`-URL:t 404:ttävät
  kunnes Julkaisija/Fable vie ne — normaalia ja odotettua.
- Kartuscha (`MAA_KATEGORIAT`) BEL/SVK/SVN/CYP/MLT:lle on jo 5/5
  aihetta kaikilla — ei sekoiteta kohdan 3 "30 nostoa" -tavoitteeseen,
  ne ovat eri järjestelmä (kartan hahmotelma-nostot vs. lehden aiheet).

## 5. Seuraavan tekijän ensimmäiset komennot

```
# Tarkista uusi polku omistajan siirron jälkeen (esim.):
cd /Users/Shared/Matkakirja/Matkakirja-nostot   # tai mikä ikinä polku on
git status && git branch --show-current
git fetch origin sisalto-vajaat-maat-30 v1973-prep sisalto-nimisto-aika
```

Jatka kohdasta 3: Kypros (hahmotelma-cyp.js, +6-10 nostoa) ja Malta
(hahmotelma-mlt.js, +12-19 nostoa) samaan `sisalto-vajaat-maat-30`-
haaraan. Käytä samaa reseptiä kuin BEL/SVK/SVN: en-Wikipedia, `tools/
hae-commons.mjs`, `tools/johda-maastokohteet.mjs` `laudat()`, kuvat
silmin tarkistettuina `/Users/.../Matkakirja-nostot-kuvat/<iso>/`-
kansioon. Kypron olemassa olevat aiheet: ks. hahmotelma-cyp.js JA
maastokohteet-cyp.js (11+11=22 nyt). Maltan olemassa olevat: ks.
hahmotelma-mlt.js (11 nyt, ainoa tiedosto).
