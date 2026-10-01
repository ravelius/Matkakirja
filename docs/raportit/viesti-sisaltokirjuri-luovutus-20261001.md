# Sisältökirjurin luovutus 1.10.2026 klo ~03 (Sonnet 5.5)

Checkout-haara `sisalto-pelikatalogi-20260927` (ei mergata, ei poisteta). Aloitus:
`git fetch origin main && git checkout sisalto-pelikatalogi-20260927 && git pull`.

## 1. Mainissa tässä vuorossa (30.9.–1.10.)
- #3706 maalehdet ALB, BLR, MDA, MKD, MNE, SRB (artikkelit + aihesivu).
- #3743 astro-kuvien valkoiset palkit pois (28 uutta havaintoa/56 tiedostoa rajattu, ämpäri `linssit/astronautin-kamera/20261001/`,
  tools/astro-palkki.mjs + tarkistetut.json + testi). #3744 kuva2 erä B (BEL, BIH, BGR).

## 2. Auki Julkaisijan junassa (kaikki MERGEABLE 1.10. ~03; versiot renumeroidaan junassa, main liikkuu ja versiotiedostot konfliktoivat aina)
- **#3733** luentatekstit (Luxemburg, Valletta, Košice, Ljubljana, Bryssel; luenta-kenttä, ei ääntä; ääni vaatii omistajan luvan).
- **#3738** kuva2 erä A: GRC, ALB, AUT (35 maakuntaa). Ollut CONFLICTING (versiotiedostot) → main yhdistetty merge-commitilla, nyt MERGEABLE.
- **#3754** kuva2 erä C: BLR, CZE, CHE (47 maakuntaa, 18 nykykuvaa vaihdettu).
- Konfliktin ratkaisu kaikissa: `git merge origin/main`; konfliktit vain js/main.js, js/muutokset.js, sw.js →
  `git checkout origin/main -- js/muutokset.js js/main.js sw.js && node tools/uusi-versio.mjs "<rivi ≤60>"`, commit, push (ei force).

## 3. Maakuntien toinen kuva (kuva2) — Päätoimittajan/omistajan tilaus 30.9. klo 22.5x
Kenttä `kuva2` (olio) js/packs/maakunnat-luonnehdinnat.js:ssä jokaiselle maakunnalle, joka on Euroopassa ja jolla on kuva; eri aihe,
vaakakuva, pääaihe keskellä; nykykuva tarkistettu (kuvasuhde <1,2 tai >2,2, pääaihe reunassa, huono laatu → vaihdettu, kirjattu lokiin).
Järjestys: GRC, sitten ISO-aakkosin (nyt: ALB AUT BEL BGR BIH BLR CHE CZE DEU DNK ESP EST FIN FRA GBR HRV HUN IRL ISL ITA …).
| Erä | Maat | Tila |
|---|---|---|
| A | GRC ALB AUT | #3738 junassa |
| B | BEL BIH BGR | mainissa (#3744) |
| C | BLR CZE CHE | #3754 junassa |
| D | DEU DNK ESP EST | JSON + kuvat ämpärissä, PR avaamatta (odottaa edellistä mergeä; yksi maakunta-PR kerrallaan) |
| E | FIN FRA GBR HRV | sama |
| F | HUN IRL ISL ITA | sama |
Seuraavat maat (G…): LTU LUX LVA MDA MKD MLT MNE NLD NOR POL PRT ROU SRB SVK SVN SWE UKR; RUS/TUR/CYP ilman kuvia (ei tehtävää).
**Prosessi (toistettavissa):** scriptit ja valmiit tulokset kansiossa `/Users/Shared/Claude/siirto-sisaltokirjuri/kuva2/`:
`mk-input.mjs` (maakuntalista JSON:ksi), `k2-maakunta-prompt.txt` (Sonnet-agentin kehote, __MAA__/__ISO__/__IN__), `kuvahaku2.mjs`
(Commons-haku/lataus 1800 px → /Users/Shared/Claude/siirto-sisaltokirjuri/nostot-kuvat/20260930/, lisenssitarkistus), `parse2.mjs`
(agentin hand-back → k2-<ISO>.json), `patch-kuva2.mjs <worktree> k2-<ISO>.json…` (lisää kuva2, vaihtaa kuvan, päivittää pikkukuvan),
`loki.mjs` (docs/raportit-loki). Ämpäri: `aws s3 sync … s3://$AMPARI/karttanostot/20260930/` (avaimet `source ~/.zshrc`), tarkista 200 + sha8 nimessä.
D/E/F: k2-DEU/DNK/ESP/EST/FIN/FRA/GBR/HRV/HUN/IRL/ISL/ITA.json valmiina; kuvat ämpärissä (HEAD 200, sha ok) — vain worktree + patch + testit + uusi-versio + PR jäljellä.
Opit: ei taideteoksia/tuotemerkkejä/mainoksia/infotauluja/vilkkaita katuja kuva2:ksi; agentit tekevät joskus virheitä (esim. Bryssel: sarjakuvamaalaus,
Occitanie: Airbus-logo → korvattu itse); tarkista kuvat Read-työkalulla pistokokein.

## 4. Muuta
- Astro-palkit: `docs/raportit/sisaltokirjuri-astro-palkit-20261001.md` (tunnistin vaatii sharpin väliaikaisesti; repossa sitä ei ole).
- Olavinlinnan faktaraportit ja Pulu/kuunnelmat valmiit (docs/raportit/sisaltokirjuri-olavinlinna-*).
- Luentojen ÄÄNTÄ ei generoida ilman omistajan lupaa.
- Worktreet: sisaltokirjuri-luennat-5, -maakunta-kuva2-a, -maakunta-kuva2-c (poista mergen jälkeen: `tools/uusi-worktree.sh --poista sisaltokirjuri-<aihe>`).
