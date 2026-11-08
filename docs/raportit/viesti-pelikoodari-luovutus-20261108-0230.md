# Pelikoodari: luovutus 08.11.2026 klo 02.30

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (≈ 30 %). Vanhat opit: `git show 283a7eb52:docs/raportit/viesti-pelikoodari-luovutus-20261107-2125.md` kohta 3.

## 0. TILA: kaikki annettu, odottaa JU:ta
- LATAUS (omistaja 7.11. 23.05 "lataus kestää todella kauan"): JUNASSA 221 (PT 02.2x kuittasi), `ab113e0ac` (pelikoodari/lataus-221): esihaku taustasäikeessä + LOD2-kierros pois + CPU-kopiotahti 4 M. iPad: 44,2 → 24,2 s, muistihuippu ennallaan. Tiedot `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-lataus/TULOS-1.txt` ja `TULOS-2.txt`, LOD-kuvat `parit-lod/` (ei eroa).
- KEISARI LÄHTEE ITSE (omistaja 7.11. 23.10) + otsikot: OMISTAJAN PÄÄTÖS 8.11. 02.0x "Kyllä" ehdolla, että kääntymisohje näkyy pelaajan ensimmäisessä omassa risteyksessä. Ehto korjattu (JuoksuOpetus.KoneKaantaa: ei ohjetta/hidastusta/kuittausta koneen käännöksessä + 3 m). PT 02.3x katsoi parit ja antoi luvan. Annettu JU:lle 02.4x: `c92dafe1f` (pelikoodari/keisari-221c, natiivi-backup) = juna-221 808b502b4 + 3 committia; Peli-testit 871/871, unity-tarkistus (sh) 0. Viesti JU:lle oli JONOSSA (ei vielä kuittausta). KK:lle lähetetty rivi + kansio `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/keisari-lahtee/parit-ohje/kk/` (varakanavalla, jonossa).
- Latauskuvan otsikko 190 px PIDETÄÄN (PT 02.1x: kuvaus, ei muutos).
- TF EI lähde (omistaja).

## 1. Seuraavaksi
- Jos JU ilmoittaa 221:n kärjen liikkuneen ennen poimintaa: poimi `e574840fa c28e5cb58 d67941031` (keisari-221b) uuteen kärkeen, testit, sha JU:lle.
- Muuten jono tyhjä → rivi PT:lle "JONO TYHJÄ: Pelikoodari".

## 2. Opit tältä kierrokselta
- Peli-testit oikealla palatsilla: MK_JUURI tarvitsee kk-pohja-v1d-pk8, kielletty-rakennukset-v90, kielletty-tausta-v89d, palatsi-esto-v23, kielletty-lahipuut-v12 (linkit `_tyo/linssiseppa2/juuri-k06w/`) ja osamallit791-v6/sijoitus.json, jonka linkki k06w:ssä on rikki → hae `https://media.matkakirja.app/juoksupeli/maailma-v4/osamallit791-v6/sijoitus.json`. Kokoa juuri scratchpadiin linkeillä.
- Tason 1 aloitus testeissä: kulkukartta (`JuoksuV4Reitti.LuoVapaa`, ks. JuoksuKulkuKarttaTestit), ei LuoSokkelo (LahtoOvelta vain vapaalla reitillä).
- Risteyksen 0,5 m:n solmut: juuri käännetty risteys näkyy KaantoEdessaS:ssä uutena 0,5 m edessä.
- Muistihuippu latauksen aikana: N-rivien fp (`muisti-tarkka.log`); kaikki ajot ~4650–4700 Mt jo ennen korjauksia.
- Viestiraja: SendMessage pysähtyy 10 viestin jälkeen → varakanava mcp__ccd_session_mgmt__send_message.

## 3. Odottaa muilta (ennallaan)
Lontoon maanpinta a7ad5fc24 PT:llä (suositus: jää haaralle). Kulkukartta 10e9b6c4a PT:n sanaa. Latauskuvat 190d6c094 NS:n vaihe12:ssa.
