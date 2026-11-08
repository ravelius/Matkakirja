# Pelikoodari: luovutus 08.11.2026 klo 08.45

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 26 %). Vanhat opit: `git show f0e5a3173:docs/raportit/viesti-pelikoodari-luovutus-20261108-0230.md` kohta 2.

## 0. TYÖN ALLA: juoksupelin lataus 24 s → lyhyemmäksi (PT 08.4x, omistaja 7.11. 23.05 "todella kauan")
PT:n ehdot: mittaa vaiheittain ensin, suurin hyöty ensin; iPad-mittaus JU:n jonossa; ulkoasu ei saa muuttua (kuvapari); junaan vain PT:n kuittauksella; tulos PT:lle ≤ 3 riviä.

- Koodi: `bccc02fed` (natiivi-backup `pelikoodari/lataus-222`, työpuu `/Users/Shared/Claude/wt/proto-pelikoodari-muisti`) = junan 221 kärki `54b7c832c` + 2 committia:
  - `208264a65` mittari: `JuoksuLatausMittari` (JuoksuRuutumerkinnat.cs), rivi "juoksupeli: latauksen ositus" latauskuvan poiston jälkeen (pääsäie: varjojen läpikäynti, rakenna, verkkojen keruu, kuvien purku/pakkaus/mipit, CPU-kopiot, peittokartan keruu + ruudut). LOD-kierrosriveillä "pääsäie rakenna X ms (keruu, kuvat), varjojen läpikäynti, ruutu". QA `valo latauskappaleet 0` = varjojen läpikäynti vasta Valmiina (oletus 1 = ennallaan).
  - `bccc02fed` QA `palatsi kopiot-rinnalla 1`: CPU-kopioiden vapautus kaukopuiden jälkeen loppuvaiheiden rinnalla (oletus 0 = ennallaan).
  - unity-tarkistus (sh) 0 virhettä molemmissa.
- JU:lle pyydetty 08.3x/08.41 (send_message, 2. viesti jonossa): 3 iPad-ajoa, skenaariot `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-lataus/sk-ipad-ositus-{a,b,c}.txt` → `lokit/pelikoodari-lataus-ositus-{a,b,c}` (a perus, b latauskappaleet 0, c kopiot-rinnalla 1). EI vielä kuittausta.
- Kun lokit tulevat: `python3 -I vaiheet.py|vali.py|aikajana.py <loki>/muisti-tarkka.log` (samassa kansiossa) + grep "latauksen ositus" ja "kierros". Vertaa tahti4-1:een (24,2 s). Muistihuippu: suurin fp N-riveiltä latauksen aikana (c:ssä tärkeä: ei saa nousta).

## 1. Ositus iPadilla (tahti4-1, ennen mittaria, lokiriveistä)
0–2 s sokkelo+taivas (taivaan koostus 1,1 s) | 2–5,6 s palatsi, verkko, avoimet, katot, osamallit, lähipuut 0,3, lähikoristeet 0,6 | LOD1 1,45 s | peittokartta 0,8 s | LOD0 6,6 s | 13,6–16,1 muurikate, osasarja, kaiteet, C1 ~2,5 s | 16,1–17,7 ulkorengas ~1,5 s | CPU-kopiot 2,9 s + lepo 1,5 s | 21,6 Valmis → 23,5 esteet/kerättävät/aarteet peräkkäin ~1,9 s → lämmitys 6 ruutua ~0,5 s → GC.
Ruutuja 13 s:ssa vain 202 (~64 ms/ruutu): kamera näyttää vain taivaan (cullingMask 0), joten aika on pääsäikeen rakennustyötä.

## 2. Ehdokkaat (suurin ensin, mittauksen mukaan)
1. Rakenna-pääsäie (RakennaSolmut): kärkien keruu List.Addilla + jokaisen kuvan LoadImage + Compress(false) + Apply(mipit), 336 kuvaa. Jos kuvat isoin: pakattujen kuvien levyvälimuisti (GetRawTextureData → LoadRawTextureData, tavulleen sama kuva; levytila ehkä satoja Mt → PT:n/omistajan sana). Jos keruu isoin: keruu taustasäikeeseen (esihaun tehtävään), iso muutos.
2. CPU-kopiot rinnalla (ajo c), säästö enintään ~4 s, jos muistihuippu ei nouse.
3. Varjojen läpikäynti latauksessa (ajo b).
4. Esteiden/kerättävien/aarteiden glb-esihaku latauksen alussa (LataaEsteMallit, LataaKerattavat(Aarteet), LataaAarteet, LataaKaaro, LataaLohikaarmeet: JuoksuHahmot.Hae + Task.Run(DioraamaGlb.Lue) peräkkäin; GlbMalli kulutetaan kerran, Rakenna tyhjentää Kuvat). Arvio −1 s. Ei vielä tehty.
Kuvapari (ulkoasu sama) vasta, kun valittu muutos on oletuksena päällä: JU:n esikatseluvuorolla `aja-kuvat.sh`-mallilla (sk-kuvat.txt), ennen = 54b7c832c.

## 3. Muut (ennallaan)
Keisari c92dafe1f ja lataus ab113e0ac junassa 221. Lontoon maanpinta a7ad5fc24 kokeena haarassa. Latauskuvat 190d6c094 NS:llä.
