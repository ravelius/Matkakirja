# Olavinlinna v45a → v45b: suorituskykyauditointi iPadin budjettiin (Linnanrakentaja 8.10.2026)

Päätoimittajan erä junaan 168. Mitattu ilman laitetta paketista (`proto-3d/_valmiit/olavinlinna-blender-v44`) ja natiivin
latauskoodista (proto master bdd0e8c5f). Uusi peili **v45b `2adaa1e6c374bb36`** (haara linnanrakentaja-linna-v45b, 73890ba31).
Se menee peliin vain Siirtosepän `PelattavaPala.Hash`-vakion kautta. Yhteistä osoitinta `uusin.json` ei vaihdeta.

## Budjetit (lähteet)
- iPad ≥ 60 fps, iPhone ≥ 30 fps; muisti enintään +60 Mt junan 142 tasosta (Siirtosepän linna-unity-suunnitelma 5.10., r. 95–96).
- Uusi ominaisuus enintään +0,3 ms/kehys GPU (A/B-mittaus). Varjot: vain päävalon kova varjo, lisävalot enintään 8 ilman
  varjoja (DioraamaValot.cs). Kuoren taso ja pintatekstuurien puolitus muistin mukaan (DioraamaUlkokuori.cs, DioraamaSovitin.cs).
- Viimeisin iPad-mittaus 7.10. (iPad13,8, kappeli): GPU 9,36–9,39 ms/kehys. Kehysaikaa on siis varaa, mutta muisti on tiukka.

## Mittaukset (v45a, kaikki seikkailun huoneet 1–10 ladataan kerralla)
| Osa | Kolmiot | Piirrot (primitiivit) | Tekstuurimuisti |
|---|---|---|---|
| Kävelyosat (10 osaa, näkyvät pinnat) | 20 400 | 32 | ei kuvia (pintamateriaalit) |
| ranta-1499 (kallioranta, B) | 13 280 | 1 | – |
| Palatsin tilat (linnantupa, voudin-sali) | 7 251 + 10 239 | 13 + 13 | leivottu ASTC 2k (kuten muut tilat) |
| Esineet (36 merkkiä, 30 glb:tä) | 116 410 | 36 | **87,9 Mt RGBA32** |
| 3D-hahmot (8 henkilöä, 21 merkkiä; 1 glb per henkilö) | 89 000 | ~110 + varjot | 48,0 Mt RGBA32 |
| Fogg (takakuvat) + kädet | 15 174 + 5 788 | 10 + 1 | **16,0** + 5,3 Mt RGBA32 |
| Lisävalot (valo:-merkit) | – | – | muurikäytävä 6, Tott-kammio 2, tyrmä 1, piha 1 (≤ 8, ei varjoja) |

**Syy esineiden muistiin:** SeikkailuEsineet.LataaMalli purkaa glb:n upotetun JPEG:n `Texture2D(RGBA32, mipit)`-muotoon ja
luo tekstuurin, materiaalin ja meshin **jokaiselle merkille erikseen** (tiili 6 kertaa). 1024² = 5,3 Mt, 512² = 1,3 Mt.
Esineet ovat junan 142 jälkeen tullutta sisältöä, ja pelkästään ne (87,9 Mt) ylittävät +60 Mt:n budjetin.
Kolmioita ja piirtoja on kohtuullisesti (kuoren 1,4 M ja tilojen 183 k rinnalla).

## Korjaukset v45b:ssä (ulkoasu ennallaan)
- Esineet, jotka näkyvät vain ympäristössä tai etäältä, 1024 → 512: esiliina, hiilipannu, patapino, koysi-vene ja koysikieppi.
  Tiili-komero 512 → 256 (6 merkkiä, komeron hämärässä).
- Fogg 3 × 1024 → 512 (pelaaja näkyy vain takaa tai kaukaa, omistajan linja 7.10.).
- Kilpilaatat 12 000 → 6 000 kolmiota kumpikin; sivuvalovertailussa kohokuva on ennallaan.
- Ennallaan 1024²: arkku, avainnippu, avainrengas, keittokulho ja tarjotin, jotka nostetaan käteen tai nähdään läheltä.
- Tulos: esineet 87,9 → **61,9 Mt**, Fogg 16,0 → **4,0 Mt** (yhteensä −38 Mt); esineiden kolmiot 116 410 → 104 410.
- Työkalu: `proto-3d/tyokalut/linnanrakentaja-ajot/glb_kuvat_pienenna.py` (pienentää upotetut kuvat, geometria ja extras
  ennallaan; Blender-latauskoe OK, Foggin 15 leikettä säilyivät). Alkuperäiset: tämän session scratchpad `v45a-alkup/`.

## Ehdotukset natiiviin (Siirtoseppä; eivät muuta ulkoasua)
1. **Esinetekstuurit ASTC:nä**: data toimitetaan `.astcm`:nä kuten tilojen valoatlakset (DioraamaSovitin lataa ne jo), jolloin
   1024² = 1,3 Mt mippeineen. Esineet 61,9 → noin 16 Mt.
2. **Jako glb:tä kohden**: sama glb → sama tekstuuri, materiaali ja mesh (tiili ×6, kivi-2 ×2). Pieni säästö nyt, iso kun
   esineitä lisätään.
3. **Huonekohtainen lataus**: esineet ja hahmot vain nykyisen ja naapurihuoneiden osalta (osat.json:n naapurit).
4. Hiilipannun toinen kuva (hehku) ei ole käytössä (Kuvat[0] luetaan); hehku näkyy vain valo:-merkin pistevalona.

## Mittaamatta (vaatii laitteen, ei ennen junaa omistajan linjan mukaan)
- fps (mediaani ja 1 %:n alin) ja muistihuippu iPadilla v45b:llä verrattuna junaan 142.
