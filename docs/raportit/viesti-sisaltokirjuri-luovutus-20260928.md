# Sisältökirjurin luovutus 28.9.2026 klo ~22.2x (mallin vaihto, kontekstin nollaus)

Kirjoittaja: Sisältökirjuri (Sonnet). Lue ensin `viesti-sisaltokirjuri-luovutus-20260928-b.md`
(kohdat 6 ja 8: menetelmä ja sitovat käytännöt) ja tämä.

## 1. Maakunta-PR:t ja niiden tila (tarkistettu 22.2x)

| PR | Sisältö | Tila |
|----|---------|------|
| #3534 BGR (28 maakuntaa) | pitkä + pulu | MERGED |
| #3536 SRB (24 maakuntaa) | pitkä + pulu | MERGED 21.22 (v2375) |
| #3520 Kronborg-ankkuri | nosto:kronborg lng 12.595 | MERGED 21.45 (v2376) |
| #3549 BIH (18 maakuntaa) | pitkä + pulu | AUKI, DIRTY (main liikkunut) |
| #3560 ISL (9 aluetta) | pitkä + pulu, ISL pois ERASSA_1:stä | AUKI, DIRTY |
| #3556 maalehti Historia 6 maalle | SRB/ALB/MKD/MNE/MDA/BLR | AUKI, DIRTY |
| #3548 ihmeet-kytkentä 14 kohdetta | rappeutunutKohde-ihmeet | AUKI, DIRTY |

Haarat: `sisaltokirjuri-bih-pitka-pulu`, `sisaltokirjuri-isl-pitka-pulu`,
`sisaltokirjuri-maalehti-historia-6maata`, `sisaltokirjuri-ihmeet-14maata-kytkenta`.

Päätoimittajan sääntö: maakunta-PR:t YKSI KERRALLAAN Julkaisijan mergejärjestyksessä
(kysy järjestys Julkaisijalta, nimi `Julkaisija (Opus) [1ccfa3]` toimi), seuraava
rebase vasta kun edellinen on MAINISSA. ALB vasta kun #3549 on mainissa.
Julkaisijan valmistelu numeroi versiot junassa — uusi-versio.mjs:ää ei tarvitse
ajaa jonossa oleville PR:ille, muutoslokirivit vain tuoreimman mainin päälle.

## 2. Rebase-konfliktit — toistuvat kuviot

- sw.js / js/main.js / js/muutokset.js (versionumero): `git checkout --ours <3 tiedostoa>`
  rebasessa = pidä origin/main; ajo `node tools/uusi-versio.mjs "<rivi ≤60 merkkiä>"`
  uudelleen tarvittaessa. `--ours` voi tehdä versiocommitista tyhjän (drop) — lisää uusi.
- `js/packs/maakunnat-pulu.js`: kaksi haaraa lisää samaan tiedoston loppuun samat
  sulkurivit (`    ],` `  },` `};`) → git tulkitsee ne yhteiseksi kontekstiksi ja
  jättää edellisen maan lohkon sulkematta. Korjaus: yhdistä käsin headLohko + `    ],`
  + `  },` + tuleva lohko. Tarkista `node --check` ja pulu-testi.
- `tests/maakunnat-pulu.test.mjs` ERASSA_1: poista rebasessa maa listasta (BIH, ISL
  poistettava; SRB jo poistettu mainissa). Kommenttirivin sulku ` */` voi
  hajota konfliktissa — kirjoita käsin.
- Ennen pushia: `git fetch origin main` + `git merge-base --is-ancestor origin/main HEAD`,
  testit (`nice -n 15 node --test tests/*.test.mjs`, ~5–10 min, aja taustalla),
  `git push --force-with-lease origin <paikallinen>:<pr-haara>`.

## 3. Kronborg-oppi (#3520)

Kronborgin todelliset koordinaatit (56.0386, 12.6219) eivät läpäise ne50-maamaskia
(`tools/maamaski.mjs onMaalla`); `lahinMaapiste()` antoi ruotsinpuolisen pisteen 6 km
päästä. Ratkaisu: lng 12.595 (Helsingørin sisällä, ~1,7 km länteen). Sama testi
`tests/nostoankkurit-maat.test.mjs` vaatii kaikilta ankkureilta maapisteen (saaret ja
meri-tyypit poikkeus).

## 4. Rata A -jono (jatka tästä)

ALB → MKD → MNE → CYP → MLT → LUX → MDA → BLR (pitkä + pulu), sitten 21 muuta maata
(vain pulu). Menetelmä: luovutus -b kohta 6 (Sonnet-tutkimusagentit, 12–14 aluetta per
agentti, Livia-nykyääni, anna olemassa olevat `lyhyt`-tekstit toistojen välttämiseksi,
raportit `docs/raportit/sisaltokirjuri-<iso>-pitka-pulu-era{1,2}-20260928.md`,
soveltaminen uudella haaralla `git checkout -b <aihe> origin/main`). `pitka:` tulee
`lyhyt:`in perään ennen `kuva:`a; pulu omaksi maa-avaimekseen; poista maa ERASSA_1:stä.
Ennen ALB:ta: varmista Julkaisijalta että #3549 on mainissa; ALB-historia on jo
#3556:ssa (ei tehdä uudestaan).

## 5. Avoimet asiat

- NLD Naundorff/Leeuwenhoek: nimilimityksen (label limit) takia tarvitaan ulkoasupäätös
  Karttaseppä/Pelikoodari; ei minun ratkaistavissa.
- 8 `rappeutunutKohde`-ihmekuvaa palauttaa 404 ämpärillä (Codexin/Faben kuvaputki).
- Historia-aihe tehty vain 6 maalle (#3556); muut lehtiaiheet näille maille tekemättä.
- CYP: kuva puuttuu (ks. luovutus -b).
- ISL-raportti: `docs/raportit/sisaltokirjuri-isl-pitka-pulu-20260928.md` (sovellettu #3560:ssä).

## 6. Muistisäännöt

- Ei "isoisä"/1873-mainintoja alue- ja maatekstissä; nykyaika edellä; 13+ ei lastenpeli.
- BIH: ei sotaa eikä entiteettirajoja.
- `node tools/tarkista-nimiolimitys.mjs <ISO>` uuden karttamerkin jälkeen.
- `ihmeKuva`-tiedostonimi alkaa aina `ihme-`.
- Agentit vain Sonnet/Opus; VAIN EUROOPPA; älä mergaa äläkä poista checkout-haaraa
  `sisalto-pelikatalogi-20260927`.
- Jumi → Päätoimittaja (`ListAgents` nimen tarkistukseen), viestit ≤ 8 riviä, vain valmis
  erä / jumi / kysymys.
- Stash on jaettu worktreiden kesken: vain `git stash push -u -m "<tunniste>"` + `apply <sha>`.
