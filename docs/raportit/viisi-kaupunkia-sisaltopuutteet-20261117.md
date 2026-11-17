# Viiden kaupungin sisältöpuutteet (SK 17.11.2026, PT:n tilaus: KK valitsee jonon)

Pohja: origin/main 7c66c99c6e (17.11.2026). Vain docs. Uusittu 14.11. taulu (`viisi-kaupunkia-tilannetaulu-20261114.md`), jonka jälkeen Amsterdamin 9, Wienin 10 ja Rooman 9 tarinapaikkaa ovat dataa.
Luvut tuottaa yksi skripti, jonka KK voi ajaa itse: `node docs/raportit/viisi-kaupunkia-sisaltopuutteet-20261117-laske.mjs` (vain luku). Tarkistus git grepillä: kohta 4.

## 1. Kolme suurinta puutetta (kaikki viisi kaupunkia yhteensä, suuruusjärjestyksessä)

1. **Nostot ja niiden tietovisat.** Pariisissa on 28 nostoa, joista 23:ssa tietovisa. Muissa: Lontoo 16 (visa 9), Amsterdam 11 (5), Wien 6 (2), Rooma 6 (2). Kaksi eri puutetta: (i) **21 nostoa ilman visaa** (Lontoo 7, Amsterdam 6, Wien 4, Rooma 4), kirjoitettavissa heti ilman uusia nostoja; (ii) nostoja on Pariisiin verrattuna 12 + 17 + 22 + 22 = **73 vähemmän** (kaupungin muut jutut ovat lehdessä, ei kartalla, ks. lehti-ja-nostot 1). Isoin yksittäinen ero.
2. **Nähtävyydet (kartalla, ei kadonneet eikä tarinapaikat).** Pariisi 21, Lontoo 31, mutta Amsterdam 8, Wien 7, Rooma 8: **13–14 vähemmän kuin Pariisissa** kullakin kolmella, yhteensä 40 nähtävyyttä (Pariisin tasoon). Tavoite "6–15 per kaupunki" (omistaja 16.8.) täyttyy kaikilla, joten tämä on pelin sisällön laajuus, ei sääntörikko.
3. **Kadonneet ihmeet.** Pariisi 9, Lontoo 6, Amsterdam 1, Wien 2, Rooma 2. Puuttuu Pariisiin verrattuna 3 + 8 + 7 + 7 = **25 kohdetta**. Jonossa on jo valmista: KK:n päätökset ja luonnokset (PR 6923, 6924, 6925 yhdistetty 17.11.): Wien +Heinrichshof, Rooma +Vanha Pietarinkirkko, Porto di Ripetta, Jupiterin temppeli, Meta Sudans. Ne ovat vielä docs-kortteja, eivät dataa; data-PR odottaa KK:n sanaa. Kun ne ovat sisällä: Wien 3, Rooma 5–6.

## 2. Kolme suurinta puutetta kaupungeittain

| Kaupunki | 1. | 2. | 3. |
|---|---|---|---|
| **Lontoo** | 7 nostoa ilman visaa (16:sta; Pariisissa 5/28) | 5 kadonnutta ilman nähtävyysjuttua (Greenwichin palatsi, Newgaten vankila, Euston Arch, Vanha Westminsterin palatsi, Whitehallin palatsi; vain hahmotelma + ihmekortti) | kadonneet 6 (Pariisi 9); Lontoon tarinapaikat 11 vs Pariisi 15 |
| **Amsterdam** | nähtävyydet 8 (Pariisi 21) ja kadonneet 1; Haringpakkerstoren ja Waag ovat purettuja mutta dataan nähtävyyksinä (Paleis voor Volksvlijt on ainoa ihme-merkitty) | 6 nostoa ilman visaa (11:stä) | 2 kuvatonta kohdetta: Haringpakkerstoren, Waag op de Dam (juttu kyllä, `kuvat` puuttuu) |
| **Wien** | nähtävyydet 7 (Pariisi 21) | 4 kuvatonta tarinapaikkaa: Klimtin maalaukset, Saliera, Mozart 1786, Wienin krahi 1873 (kuvat odottavat mediaa, ks. `wien-10-mediapyynto-20261117.md`) | 4 nostoa ilman visaa (6:sta); kadonneet 2, joista Ringtheater ja Kärntnertor-teatteri ilman nähtävyysjuttua |
| **Rooma** | nähtävyydet 8 (Pariisi 21) | 4 nostoa ilman visaa (6:sta) | kadonneet 2 (Septizodium, Jupiterin temppeli) ilman nähtävyysjuttua; 4–5 uutta luonnoksena |
| **Pariisi (malli)** | 2 kuvatonta: Pompidou-keskus (`kuvat: []`) ja Kaulanauha 1785 | – | – |

## 3. Luvut ja laskutapa

| | Kohteita kartalla | Nähtävyydet | Tarinapaikat | Kadonneet | Kuvattomat | Kadonnut ilman nähtävyysjuttua |
|---|---:|---:|---:|---:|---:|---:|
| Pariisi | 45 | 21 | 15 | 9 | 2 | 0 |
| Lontoo | 48 | 31 | 11 | 6 | 0 | 5 |
| Amsterdam | 18 | 8 | 9 | 1 | 2 | 0 |
| Wien | 19 | 7 | 10 | 2 | 4 | 2 |
| Rooma | 19 | 8 | 9 | 2 | 0 | 2 |

| | Nostoja (takynostot) | joista visallisia | Pulun kysymyksiä nostoissa | Syvennykset (takyt) | Lehtitehtävät | Kohtaaminen |
|---|---:|---:|---:|---:|---:|:-:|
| Pariisi | 28 | 23 | 30 | 3 | 2 | kyllä |
| Lontoo | 16 | 9 | 48 | 3 | 2 | kyllä |
| Amsterdam | 11 | 5 | 33 | 3 | 2 | kyllä |
| Wien | 6 | 2 | 18 | 3 | 2 | kyllä |
| Rooma | 6 | 2 | 15 | 3 | 2 | kyllä |

Laskutapa (sama kuin 14.11., laajennettu):
- Kohteet: `js/packs/maakartat.js` `KAUPUNKIKARTAT[kaupunki].kohteet`. Tarinapaikka = `tarinapaikka: true`. Kadonnut = `nosto` alkaa "hahmotelma-", tai nimi tai nosto vastaa `EUROOPAN_KADONNEET`-merkintää (`js/packs/monumentit-eurooppa.js`), tai nosto on `tuileries`, `bastilji` tai `vanha-london-bridge`. Nähtävyys = loput.
- Kuvaton: kohteen `NAHTAVYYSJUTUT`-merkinnän (avaimella nimi tai `nosto`) `kuvat` on tyhjä eikä kadonneella ihmeellä ole `kuva`/`lahi` eikä nostolla `kuva`/`valokuva`. Tämä on tietojen puutetta datassa, ei mediapalvelimen tiedostoa: 12 datan viittaamaa puuttuvaa kuvaa on erillinen työlistarivi.
- Nostot ja visat: `FOKUSVIRRAT[kaupunki].takynostot` (`visa` = tietovisa; `kysymykset` = Pulun kysymysnapit, ei visa), `takyt`, `lehtitehtavat` (`js/packs/fokusvirrat.js`), kohtaaminen `TARINAKAARI` (`js/packs/tarinakaari.js`).
- **Ei mukana:** Näyttämötehtävät (Yhdistä kolme, vaikea, Erottele, Paljasta): ne ovat vielä docs-luonnoksina, eivät tässä repossa datana. Docs: Pariisi `yhdista-kolme-pariisi-20261112.md`, `yhdista-vaikeampi-pariisi-20261113.md`, `yhdista-kolme-lisatyypit-pariisi-20261112.md`; Lontoo `yhdista-kolme-lontoo-20261113.md`, `yhdista-keksinto-keksija-lontoo-20261113.md`, `yhdista-kolme-lisatyypit-lontoo-20261116.md` (PR 6880, yhdistetty); Wien `yhdista-kolme-wien-20261114.md`; Amsterdam `lipputehtava-joukot-ja-amsterdam-erottele-20261113.md`; Rooma `paljasta-rooma-20261113.md`. Täydennys: Pariisilla on näistä eniten, Roomalla yksi tyyppi (Paljasta), Amsterdamilla yksi (Erottele); vaikea tyyppi puuttuu muilta kuin Pariisilta.
- **Varaukset:** (a) Lontoossa on 11 kohdetta, jotka ovat tarinapaikkojen kaltaisia mutta joilla ei ole `tarinapaikka: true` (Etelämeren kupla, Cheapsiden kätkö, Millennium Bridgen portaat, Metron höyryveturi, Exchange Alley, Canaletto Lontoossa, Dickensin pubi, Abbey Roadin suojatie, Leake Streetin tunneli, Neljäs jalusta, Turbiinihalli); ne on laskettu nähtävyyksiksi (31), kuten 14.11. Jos ne kuuluvat tarinapaikkoihin, Lontoon tarinapaikat ovat 22 ja nähtävyydet 20. KK päättää; sillä ei ole vaikutusta Amsterdamiin, Wieniin eikä Roomaan. (b) Amsterdamin Haringpakkerstoren ja Waag ovat purettuja, mutta ne ovat datassa ilman ihmeen merkintää, joten ne on laskettu nähtävyyksiksi; jos ne luetaan kadonneiksi, Amsterdamissa kadonneita on 3 ja nähtävyyksiä 6. (c) Kuvaton-luku ei erottele "ei kuvaa lainkaan" ja "kuva odottaa mediaa".

## 4. Tarkistus (KK:lle, git grep ja yksi komento)

```bash
node docs/raportit/viisi-kaupunkia-sisaltopuutteet-20261117-laske.mjs
git grep -n "kuvat: \[\]" -- js/packs/nahtavyysjutut.js                  # kuvattomien joukko (kaikki kaupungit; viisi kaupunkia: Pompidou-keskus, Kaulanauha 1785 jne.)
```

Yksittäisiä tarkistuksia: Wienin neljä kuvatonta `git grep -n "skandaali-klimtin-tiedekuntamaalaukset\|skandaali-salieran-varkaus\|hetki-mozart-wien-1786\|hetki-wienin-porssikrahi-1873" -- js/packs/nahtavyysjutut.js js/packs/maakartat.js`; Amsterdamin `git grep -n -A8 "Haringpakkerstoren: {\|'Waag op de Dam': {" -- js/packs/nahtavyysjutut.js`.

## 5. Ehdotus jonoksi (KK valitsee)

1. Kadonneiden lisäkohteiden data-PR (Wien, Rooma; pohja `kadonneet-lisakohteet-paatokset-20261117.md`), koska teksti ja kortit ovat valmiit: Wien +1, Rooma +4 ja samalla Wienin Ringtheater, Kärntnertor, Rooman Septizodium ja Jupiterin temppeli saavat nähtävyysjutun.
2. Visat 21 nostolle (Lontoo 7, Amsterdam 6, Wien 4, Rooma 4); Lontoosta alkaen. Wienin ja Rooman nostoja on vain 6 kummassakin, joten niille tarvitaan sen jälkeen lisää nostoja.
3. Wienin neljän tarinapaikan kuvat (media) ja Amsterdamin kahden nähtävyyden kuvat; sitten Wienin ja Rooman nähtävyyksiä lisää (7 ja 8 → 12+).
