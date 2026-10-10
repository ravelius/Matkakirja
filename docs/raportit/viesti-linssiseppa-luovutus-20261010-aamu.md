# Linssiseppä: luovutus 10.10. aamu (konteksti 67 %)

Rooli: Linssiseppä (Opus, high). Proto-worktreet: `wt/proto-linssiseppa-kaupunkiaanet` (nyt haaralla `linssiseppa/maa-dtm-175`) ja
`wt/proto-linssiseppa-astro-auto` (todistusajo-työkalut; `tyokalut/todistusajo/todistusajo.sh` sai COMMITOIMATTOMAT lisäykset
`--doc nimi=sisältö` ja skenaarioaskeleen `doc nimi=sisältö`). Simulaattori 00CF62C2 (T7). Simu- ja käännösvuorot aina Julkaisijalta.
App-kopiot `proto-3d/lokit/linssiseppa-app/`: ls-ikkuna-175 (63648842a), maa-dtm-175 (ce6c93110), tuuli-vasa-173d.

## Juna 173

- iPad-muistiajo 23.08 (laite 1f9415189, budjetti 5458e7777 + intro A): JETSAM A ja B (`proto-3d/lokit/muistiajo-173.txt` ajot 10–11).
  Natiiviseppä jatkoi itse. Kuittasin hänelle intron 4dda1d462 (28897f103 C, EI 41fb97f44:n EiffelKaannosta). Portti on Natiivisepällä.

## Juna 174 (PT kuittasi, SHA:t Natiivisepällä)

- `linssiseppa/katse-kaari-174` b812d51b0 (kulma-arkki todistus-kulmat-pariisi-174-20261010-0100).
- `linssiseppa/kaupunkisilmukat-174` 6e7c12b11 → `linssiseppa/laatu-korvaajat-174` **d96f876e6** (7 silmukkaa 90–120 s, Tukholman T-bana,
  lapset/kanava/laituri-02; Ydin KaupunkiSilmukat).
- `linssiseppa/osm-yovalot-174` **7bef9ef70** (Karttasepän OSM-lamput vesimaskin G/B/A-kanavissa, valolammikot, n4-normaali; GPU 0 Mt).
- `linssiseppa/pallo-lento-174` **f755c8be4** (Soundly 1c: humahdus 01–04, palaa-lahi, keinunta-aallot hystereesillä).
  AUKI: keinunnan tallenne ("keinunta vain levosta lähdössä") → rivi PT:lle (simuvuoro 05.00, ajo lentoaanet-174b).

## Odottaa kuittausta (kuvat/tallenteet simuvuorolla ~05.00, skripti proto-3d/tyokalut/linssiseppa-ajot/simuvuoro-0505.zsh, 6 ajoa)

- `linssiseppa/ls-aanet-174` **54ad76401** (laatu-korvaajien päällä): tuuli_korkea-kerros 1,2–1,8 km (ui-linssit-soundly-v1),
  kellokoneisto Maapallon vuosi -linssiin (Ydin KelloNaksahdus, ≤ 1/0,3 s, −12 dB). Soittorasia varalle. PT:n ehto: 30 s tallenne +
  aani mittaa (sk-ls-aanet-174). LS2 teki tuuli-kylma (varalle) ja hoyrykone (linssiseppa2/hoyrykone-174 5a978781e).
- `linssiseppa/julkisivuvalot-175` 02421cc9b (osm-yovalot:n päällä): Ydin Julkisivuvalot (Pariisi ND/Panthéon/Riemukaari,
  Tukholma slottet/Riddarholmen/Stadshuset; EI Eiffeliä); kytkin yomaamerkit. Kuvapari yöllä PT:lle (sk-julkisivu-pariisi/-tukholma).
- `linssiseppa/ikkunavalot-175` **a753d5b34** (julkisivujen päällä): Karttasepän OSM-rakennusten ikkunaosuus ja värilämpö
  (tyokalut/yovalot_ikkunat.py → Resources/Elava/ikkunat-<id>.bytes gzip R8; GPU +2,36 Mt/kaupunki). PT kuittaa yöparin jälkeen.
- `linssiseppa/maa-dtm-175` **08baea921** (ikkunavalojen päällä): maanpinta (DTM) elävälle kaupungille (OpasSovitin.OmaMaanpinta,
  vain lähiosa; R2 kartta/korkeus/v1/maa-pariisi.* 4 m, 200). Tukholma ei viety (+15,7 Mt, PT:n päätös). Bulevardipari ennen
  (63648842a) / jälkeen (ce6c93110): sk-bulevardi-dtm.txt.
- LISÄÄ MUISTIA -rivit lähetetty Natiivisepälle (ikkunat 2,36 Mt, DTM Pariisi 4,5 Mt, julkisivut 0).

## Jono

1. Simuvuoron tulokset PT:lle: LS-äänet (LUFS/huiput, kellokoneisto ≤ 1/0,3 s), keinunta (vain lähdössä), julkisivu- ja ikkunayöparit
   (oikein päin, kulma ja SHA kuvaan: proto-3d/tyokalut/linssiseppa-ajot/yopari.py), bulevardi ennen/jälkeen.
2. Pelikoodari kytkee kaupunkien 3D-pisteäänet (uudet tiedostot + yksi kutsu KaupunkiAanimaisemaSoittimeen), ei päällekkäisyyttä.
3. Strömmenin musta vesi: LS2 vie PT:lle (aluekohtainen nosto 1,5 m).
4. Steam Audio -mittaus iPadilla Tukholmassa, budjetin kuvapari iPadilla (junan 173 portin jälkeen), ND-lähilento (LR:n malli).

## Opetukset

- `proto-kaanna.sh` lukitsee haarat vasta saatuaan lukon: haaran voi luoda ja committaa ennen lukkoa, mutta tarkista
  `git merge-base --is-ancestor <commit> HEAD` Matkakirja-proto-kaannos-kopiosta.
- Simulla vapaa muisti on "ei tiedossa" → ison laitteen kaupunkibudjetti; raskaat ajot `--doc kaupunki-sse-kerroin.txt=4.25`.
- `oleta` täyttyy vain edellisen askeleen jälkeisistä riveistä: `aani N` -kaappauksen aikana tullut saapuminen jää huomaamatta →
  käytä ketjua `oleta Puhuu → Lentaa` + `oleta Lentaa → Puhuu`.
- `opas mikseri kaikki 0` mykistää maiseman ja tehosteet, kertoja jää (kertojan taso); `opas mikseri lukija 0` = ilman kertojaa.
- Laattojen porrasreunat kääntävät pikselin normaalin: ikkunat/vaakapinnat 4 px:n kannan normaalilla (yövalot v12c).

## Aloitusviesti

```
Olet Linssiseppä (Opus, high), Matkakirja-pelin natiivin (Unity) linssien ja pallokierroksen rooli. Checkout /Users/Shared/Claude/Matkakirja-linssiseppa,
haara linssiseppa-tyo-20260923 (git fetch origin && git checkout linssiseppa-tyo-20260923 && git pull origin linssiseppa-tyo-20260923).
Proto-työt worktreessä /Users/Shared/Claude/wt/proto-linssiseppa-kaupunkiaanet.
Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 (TYÖTAPA JA SESSIOT; ei koko Raamattua), luovutus docs/raportit/viesti-linssiseppa-luovutus-20261010-aamu.md
ja muistio linssiseppa-tila-20261009.md.
Sitovat: agentit vain Opus/Sonnet; simu-, käännös- ja laitevuorot vain Julkaisijalta (KÄÄNNÖS NYT / SIMULAATTORI NYT); viestit Päätoimittajalle vain valmis erä,
jumi tai kysymys, enintään 8 riviä; kuvat omistajalle/PT:lle oikein päin; kaikki suomeksi, tiiviisti.
ENSIMMÄINEN TEHTÄVÄ: luovutuksen "Odottaa kuittausta" -erien tulokset PT:lle (jos simuvuoron 05.00 ajot ovat jo valmiit, kansiot proto-3d/lokit/todistus-
{ls-aanet-174,lentoaanet-174b,julkisivu-*-175,bulevardi-*-175}-20261010-*), muuten pyydä Julkaisijalta simuvuoro skriptillä proto-3d/tyokalut/linssiseppa-ajot/simuvuoro-0505.zsh.
```
