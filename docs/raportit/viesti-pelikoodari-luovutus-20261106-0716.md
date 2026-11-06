# Pelikoodari: luovutus 6.11.2026 klo 07.16: piikit pois, kameran korjaus ei auttanut, seuraavaksi kamera

Täydentää -0004:ää; sen kohdat 0–1 korvataan tässä, muut pätevät. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `337fc3cdc`. Ei junaan. **Taso 1 on yhä pääasia.**

7.47: periaatteet ja yhteiset kohdat luettu, luvut 2, 4, 6 ja 12 vain otteina. Seuraaja: lue lukulista ensin.

## 0. Sitovat päätökset
1. **Ovet aukeavat ulospäin** (omistaja 06.58, PT välitti: "Anteeksi ulospäin aukeava ovi olisi parempi"; kumoaa 06.55:n "sisäänpäin"). `LehdetSisaan` pysyy false. Ajoissa ei enää `ovikoe lehdet sisaan`.
2. **Tavoite (KK, PT välitti):** ei lehden reunan tummia piikkejä; katso kamera, koska lehti vie pysähdyksessä ison osan ruudusta.
3. Rajaviesti `35140432d` jää. Suljettavat aukot: -0004:n viimeinen KK:n päätös (33 + enintään 27). LAV tekee, ei vientiä vielä; koejuuri-aukot4 oli JU:n jonossa.

## 1. Tehty tässä sessiossa
- **Ovikysymys ratkaistu (LAV:lle vastattu):** rivin 8 kohdassa ovi on `huone-*`-mallin oma (2,40 × 2,65 m, mitattu kolmioista pelin versioista). Sääntö ei muutu, KK:lta ei kysytty. Täyte on 0,1–0,3 m lehden takana, mutta 1,32 m leveä, joten lehden taakse jää 1,0–1,1 m rako; LAV tarkistaa. Ei mitattu, mahtuuko keho.
- **Piikit `1c91c8ba8`:** laatikon pääty oli samassa tasossa kuin mallin lehden reuna (molemmat 1,2 m). Laatikko pois, kun malli on paikoillaan (`LehtiLaatikkoPois`). Täysikoossa: `lokit/esikatselu-20261106-070217/t2-q6-ulos.png` vs. `-20261105-221417/o4-q6-ulos.png`: piikit poissa. Ristikon läpi ei näy.
- **Jäljellä, ei selvitetty:** ohut musta rako lehden reunassa lähikuvassa (`-070906/t1`, noin 780; 1090 / 2000 px:n kuvassa). Todennäköisesti mallin sauma, ei tarkistettu.
- **Läikät, syy ei tiedossa:** kaksi haaleaa oranssia läikkää samoissa ruudun kohdissa (noin 275; 1050 ja 1720; 1050) ajon -070217 kuvissa, ei ajossa -070906. Satunnainen tai ajoituksesta riippuva.

## 2. Seuraava työ: kamera (ei korjattu)
`337fc3cdc` lisäsi pelin ovien lehdet `OviLehtiJanalla`-väistöön (`OviKoeLehdet`). **Se ei auttanut:** kuva `lokit/esikatselu-20261106-070906/t1-ulos-pysahdys.png`: lehti peittää keisarin kokonaan, ja rivi "kamera ovilehden edessä" puuttuu lokista, eli väistö ei osunut tai sitä ei ajettu.
- Sama kuva 3 s myöhemmin `t3-ulos-pysahdys-3s.png`: keisari näkyy, lehti vie noin 30 % leveydestä. Kamera t1 (174,7; 2,5; −815,8), t3 (176,2; 2,3; −814,6), Puyi pohja (−188,1; 418,4), ovi (−189,49; 419,08).
- Selvitä ensin: ajetaanko haara (`JuoksuV4Maailma.cs` rivi ~2283: ehto `Sokkelossa && AvausT < 0f`; `avaus nyt 1`?), osuuko `LehtiJanalla` (kehys, rajat, `r.Contains(la)`). Lisää lokirivi, ennen kuin korjaat.
- Jos korjaus ei löydy, poista `337fc3cdc`:n muutos: ei jätetä toimimatonta koodia. Seinävara (`Vapaa`, rivi ~1596) ei näe lehtiä, koska lukee peittokarttaa: toinen ehdokas pysähdyksen 30 %:iin.
- Riski: väistö voi nykäistä kameraa liikkeessä; ajo näyttää vain pysähdyksen.

## 3. Ajo
`zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/aja-t.zsh 2 <sha>`, käsikirjoitus `sk-t.txt` (2 kuvaa, 5–7 min), vain JU:n vuorolla; lopuksi JU:lle `LUKKO VAPAA`, kesto ja kuvamäärä.
**Yhteenvetoon rivi "404: N tiedostoa" ennen kuvien katsomista** (PT; `grep 'puuttuu (HTTP' unity.log`). Viimeisin: 404: 5 tiedostoa: `kielletty-c2-v34/a3-baoding-lod1.glb`, `kielletty-c2-v34/a5-marmorikaide-pylvas-lod1.glb`, `kielletty-osasarja-v8/pursotukset.glb`, `ulkoesineet-v1/kala-allas-ehja.glb`, `ovi-v1/ovi-karmi.glb`. **`ovi-v1` puuttuu mediasta:** ilman `ovikoe juuri` -komentoa ovimalli ei lataudu ja näkyy laatikkolehti; vienti on avoinna. LAV: koejuurikuvissa ennen koejuuri-aukot4:ää puuttuu rakennuksia, älä nojaa niihin.

## 4. Kun seinät tulevat
-0004:n kohta 2 pätee. Lisäksi tarkista täytteen rako lehden takana.

## OPIT
- Väistön tai korjauksen osuma varmistetaan lokirivistä, ei vain kuvasta: rivin puuttuminen kertoi heti, ettei koodi tehnyt mitään.
- Ota kuva myös heti pysähdyksestä: kamera liikkuu vielä, ja pahin ruutu näkyi vain siinä.
