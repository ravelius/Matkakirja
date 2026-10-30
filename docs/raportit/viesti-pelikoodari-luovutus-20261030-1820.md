# Pelikoodari: luovutus 30.10.2026 klo 18.20 (konteksti 37 %, Postivahdin kova raja)

Edellinen luovutus: -20261030-1625. Muistin tilatiedosto: pelikoodari-tila-20261018-aamu.md.
- Työkansio P = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030. Vuoron raportti: P/RAPORTTI-harmaat-sauma.md, kohdat 4–7.
- Proto-worktree: /Users/Shared/Claude/wt/proto-pelikoodari-v98c, nyt haarassa pelikoodari/testi-v2-uusi. Proto-haaroja ei pushata.

## ENSIMMÄINEN ERÄ: osasarja-v2:n kytkentä junaan 216 (PT 18.1x: v2 kuitattu, +9,2 % LOD0 hyväksytty, JU vie)
Koodi on valmis. Jäljellä ovat vertailuparit, suorituskykymittarit ja viesti PT:lle. Jos mittarit heikkenevät, ilmoita PT:lle ENNEN paria.

| proto-haara | sisältö |
|---|---|
| pelikoodari/esto-216 56ebe1851 | NS:n runko 7b7fad2c7 + palatsi-esto-v20 (tausta-v78 + rakennukset-v85). NS:lle ja PT:lle ilmoitettu 17.5x. |
| pelikoodari/osasarja-v2-216 0d0ac3520 | esto-216 + osasarja-v2 instansseina + kansiot osasarja-v2, tausta-v80, muurikate-v28 (C3 + MuurikateTiedosto) ja c2-v25 + palatsi-esto-v21. Peli 777/777. **Tämä junaan, kun pari on ok.** |
| pelikoodari/testi-v2-vanha 30eb17cd6 | 56ebe1851 + ortokamera (b66d9189a, bd3240620), vain esikatseluun |
| pelikoodari/testi-v2-uusi de815603d | 0d0ac3520 + ortokamera, vain esikatseluun |

- **Miksi instanssit:** 511ca08dc niputti kaiken yhdeksi LOD0-malliksi (≈ 5,3 M kolmiota kaikilla etäisyyksillä). Nyt Kokoaja.Ladot antaa sijoitukset, ja Osasarja.cs tekee InstSarjan kuten muurikatteen C3.
  - Lähiruuduissa (OsasarjaLahi 60 m) on instanssit, LOD0/LOD1 palakohtaisesti.
  - Muualla on ruudun kaukonippu osat-lod1.glb:stä. Pursotukset ovat yhtenä mallina.
- **Avoin suorituskykyhuoli PT:lle:** kaukoniput ovat yhteensä 50 ruutua ja 784 812 kolmiota (LOD1). Vanhan taustan kaukomuurit olivat muutamia tuhansia kolmioita.
  - Ehdotus osasarja-v3:een: LAV:lta osat-lod2.glb myös seinille, kulmille ja päädyille (laatikko ≤ 20 kolmiota).
  - Silloin Ruuduittain-funktioon tasoksi LOD2 ja puuttuville LOD1 erillisenä nippuna (kuvaindeksit ovat glb-kohtaisia: älä sekoita tasoja yhteen nippuun).
  - Mittaa ennen paria: esikatselun unity.logissa rivi "osasarja … kauko … kolmiota". Lisäksi ruutuaika / kolmiot havainnekohdissa, jos mittari on (tyokalut: perf-mittari, kysy NS:ltä, jos et löydä).
- **Esto:** palatsi-esto-v21 = tausta-v80 + rakennukset-v85 + osasarjan osat (PalatsiEstoLeivonta OSASARJA=…).
  - Ero v20:een on vain +50 / −1 ruutua: muurit ovat pääosin pohja.json-verkossa.
  - Tiedostot: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/esto-216-20261030/palatsi-esto-v21 (SHA256 7f40c57d…), v20 samassa kansiossa (47b837ba…).
- **Koejuuri** P/juuri-216 (v98c + v99-kansiot + v2-kansiot + esto v20/v21) toimii molemmille refeille.
- **Vertailuajo oli käynnissä luovutushetkellä:** skenaario P/skenaariot/v2-pari.txt. Siinä on 8 havainnekohtaa (01, 02, 03, 03b, 04, 05, 06, 07), kustakin pelikuva ja orto ylhäältä 60 m.
  - Ajot: `esikatselu.sh 30eb17cd6 …` (vanha), sitten `de815603d …` (uusi).
  - Tulokset: kaksi uusinta /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261030-18* -kansiota.
  - Jos ne puuttuvat tai ovat kesken, aja uudelleen: `zsh /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214/tyokalut/esikatselu.sh <REF> P/skenaariot/v2-pari.txt ipad --batch`.
- **Parit:** `python3 P/v2_parit.py <vanha-loki> <uusi-loki> P/v2-parit`. Tuloksena vierekkäiset kuvat, erokuvat ja ero.txt.
  - Sääntö 2.177: orto, väri- ja lähikuvatarkistus. [A]-mittoja ei ole (polut nykyisistä C3-sijoituksista).
  - LAV:n oma glb-ortovertailu: proto-3d/lokit/kooste-osasarja-v2-20261030-1813/LUE.md.
- **Viesti PT:lle (≤ 3 riviä):** sha 0d0ac3520, parien polku, kolmiot/mittarit. Kun PT kuittaa, NS:lle osasarja-v2-216 + esto-v21-kansio ämpäriin. JU:n uusi tiiviste tulee vientiviestissä.

## Tehty tällä vuorolla (PT:lle ilmoitettu)
- **06:n sauma** = taustan 2-0 lod0:n V4_lattian kiilakolmiot. LAV korjasi (v199). Raportin kohta 4.
- **Täyte 98302f381** ei näy missään → pois junasta (PT samaa mieltä). Kohta 5.
- **Osasarja-v2:n vaatimuslista** LAV:lle: P/VAATIMUKSET-osasarja-v2.md. LAV toimitti sen mukaan.
- **Aukion 03 harmaa levy** = taustan 2-2 LOD1:n 8 pystysuoraa V4_marmori-kolmiota, ei pohja.json:n muuri 338. PT välitti LAV:lle (tausta-v79/v100). Kohta 7.
- **Esto v20** junaan 216 (NS). Ero v19:ään 1643 ruutua: Taihemenin ja Taihedianin luiskat sekä Meridiaanin pohjoisreuna.

## Jono sen jälkeen
- **A6:** kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät.

## Huomiot
- Peli-testit: `cd Peli-testit; ./kaanna.sh [Testi]`. MK_OSASARJA=<kansio> ajaa LAV:n paketin tarkistuksen.
- Vanhassa kansiossa _tyo/pelikoodari/kuja05-pk6-20261029 on käyttämättömät koeleivonnat palatsi-esto-v20…v22c. Oikeat v20/v21 ovat esto-216-20261030:ssä.
