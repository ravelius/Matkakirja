# Pelikoodari: luovutus 07.11.2026 klo 13.03

Korvaa kaikki aiemmat. Nollaus kontekstin rajasta (34 %). Vanhat työkalut: `git show 54075dd8c:docs/raportit/viesti-pelikoodari-luovutus-20261107-1209.md` kohta 4 ja sen viittaukset.

## 1. Avoinna: omistaja 12.50: kaikki korjaukset ennen junaa 220 (PT)
PT haluaa kustakin rivin: ajo ja sha, onko kuvat katsottu, mitä puuttuu. Junavuoro PT:ltä. Lontoon isot on junassa `59319f789` (f9106079e). Seuraavat EIVÄT ole junassa:

**A. Lontoo, ajo i8 (tai i9), sha `708e68f62`** (`pelikoodari/lontoo-nimi`, työpuu `/Users/Shared/Claude/wt/proto-pelikoodari-kortti`, työnnetty; päällä `2c1d8187d`). JU:lta pyydetty 13.02: jos i8 ei ollut alkanut, vaihda sha; muuten i8 = `2c1d8187d` ja i9 = `708e68f62`. Skenaario `_tyo/pelikoodari/lontoo/sk-i8.txt`, kuvat `i8-*`. Lokit `lokit/pelikoodari-lontoo-i8-708e68f62` (tai `-i8-2c1d8187d` ja `-i9-708e68f62`). Tarkista JU:n viestistä.
- **Pallo (KK 12.30):** `KaupunkiPallot.PallonMaapiste` lontoo 51.4968, -0.1125 (vain merkki; lista-arvo 51.49754, -0.12574 on lennon alku ja säde, ei saa muuttaa). KK haluaa parin samasta kohdasta: kaukaa-45 (`i7-kaukaa-45` vs uusi) ja palatsin lähikuva (`i7-west-joelta` vs uusi). Tarkista: pallo näkyy, hintakyltti ei osu Imperial War Museum -nimeen, Leaken merkki ei peity, vanhan paikan luota ei tullut uutta merkkiä (200 m:n sääntö `Kohdenostot.MallinAlla`). Paikka on arvio kuvasta, voi vaatia säätöä.
- **Tower (KK 12.30):** `grep "kyltti este: Lontoon Tower" unity.log` kertoo syyn. Oletus, ei todistettu: `MalliKyltit.Vapaa` rivi `r.Jalka.Overlaps(l)`: vino Tower Bridgen jalanjäljen suorakaide on siltaa paljon isompi. Jos näin, korjaus: Vapaa käyttää mallin todellista muotoa (`Kohde.Peittaa`, jo `MalliAlla`:ssa) suorakaiteen sijaan; koskee kaikkia kylttejä vinon mallin vieressä, tarkista myös Pariisi. Mittari `kyltti este` pois ennen junaa.
- **Lontoo-nimi (omistaja 12.50):** syy: `Nimikerros` järjestyksessä kaukopaikat 13–18 eivät suosineet näkynyttä, joten nimi hyppi paikkojen 15, 16 ja 17 välillä. `708e68f62`: kaukopaikkojen kesken näkynyt ensin; lähipaikka voittaa yhä (KK 5.11. 15.30). Ei ajettu. Tarkista `nimet etsi` -rivit: samat kuvat kuin i7, paikat ei saa vaihtua kaukaa-45:n ja -45-2:n välillä. Kaukaa-tb:ssä nimi voi olla eri paikassa, jos 15 on ruudun ulkopuolella: kerro se, älä väitä korjatuksi. i7:ssä kaukaa-45-2:ssa lokissa kaksi riviä "ladottu" (15 ja 17): kuvassa yksi.
Kuva korjatusta: pari KK:lle `local_37f7c945-e1a0-4638-90b8-93c389a36fbe`, sha + rivi PT:lle. Ennen junaa vie commitit junan kärjen päälle (`f9106079e` on jo siellä).

**B. Keisarin jalat, ajot jalat2, sha `a45afc9af`** (`pelikoodari/keisari-jalat-2`, työpuu `proto-pelikoodari-tarkastelu`, työnnetty; junan kärki `59319f789` + korjaus). JU:lla i8:n jälkeen. Skenaario `_tyo/pelikoodari/keisari-jalat/sk-jalat2.txt`, lokit `lokit/pelikoodari-jalat2-ennen-59319f789` ja `-jalkeen-a45afc9af`, 6 kuvaa.
Syy: `kulkukartta.py:154` floor, pinta -0,02 oli kartassa -0,25. Korjaus: `tyokalut/kulkukartta_pinta.py` lisää JuoksuKulku.bytesiin neljännen kerroksen (cm bitin yläpuolella), `PintaR` vain kuvaan (Puyi `JuoksuV4Maailma.cs` noin rivi 1065, vartijat 4279, 4295). Kulku, vapaa, seinä ja ovet tavulleen samat (verrattu), liike lukee Lattiaa. Peli-testit 869/869 ennen kärjelle vientiä (1dd3a812f); kärjellä ei ajettu.
Todiste ajosta `pelikoodari-jalat-*/unity.log`, `hahmotieto` rajat y ennen → jälkeen: kuja1 0,4 → 0,7; kuja2 0,4 → 0,7; piha 0,4 → 0,6; verrokki 0,7 → 0,7; korkea 1,2 → 1,4. Yksi desimaali. Ensimmäiset kuvat eivät kelpaa: keisari ei kuvassa (`sk-jalat.txt`, sijoita ei tuonut kameraa).
Katso jalat2: `jalat-kuja-alku`, `botti-1…3` (Puyi pelikamerasta, jalat täysikoossa), `jalat-matala-vanha` ja `-uusi` (tarkastelu, y annettu käsin: näyttää ulkonäön, ei ajon korkeutta). Jos Puyin malli itse on maassa eri kohdassa (nollapiste), se näkyy tästä. Pari PT:lle; KK:n pyynnöstä sinne.
Huom: oven kynnykset ja esineet (`esineet.json`) ovat yhä bittikorkeudella; ei muutettu, ei tarkistettu.

**C. Ruudukon kuva** (omistaja 11.11): junan seuraavasta juoksuajosta, jossa jotain rikotaan, ei omaa ajoa (PT). `ui juoksuloppu pois` ennen `maali`. Jos rikottiin eikä ruudukko aukea: rivi PT:lle.

## 2. Tehty
- Lontoo i7 katsottu, KK näytti omistajalle, kyltit kelpaavat KK:lle. Kooste `lokit/pelikoodari-lontoo-i7-f9106079e/kooste-6.jpg`. Exception 11 sama kuin i6.
- PT:lle vastattu: `palat-d10` sovelluksen mukana (`Rakennus.KopioiTalopalat`, 309 Mt), `palat-d9`:ää ei käytetä, ei mediaa, ei vientiä.
- Yöportin Node: JU, PR 6457, ei minun.

## 3. Vanha, ennallaan
Juna 220: kala-allas ja kukkaruukku `067210c0f`, huudot NUI:lta. `pelikoodari/kortti-rikotut` ei junaan. `.claude/settings.local.json.ennen-kevennysta` ei minun. Työlistan hookin rivit ovat PT:n.
Linssit-testit `proto-pelikoodari-kortti`:ssa 2248/2249: `JuoksuHaivytysTestit.HaivytysJokaisessaPuskurissa` kaatuu, koska `2190c6870` (testin korjaus) ei ole tässä haarassa; ei tästä muutoksesta.
Työpuut: `proto-pelikoodari-kortti` haarassa `lontoo-nimi`, `-tarkastelu` haarassa `keisari-jalat-2`, `-lod-diag` haarassa `lontoo-isot` (2c1d8187d). Älä vaihda haaraa, ennen kuin JU:n ajot ovat valmiit.

## 4. Opit
- Pelikuva todistaa vasta, kun kohde on kuvassa: katso yksi koko kuva ennen rajauksia. `valo sijoita` ei tuo vapaan maailman kameraa keisarin luo.
- `git log` yhdellä commitilla ei kerro, onko repon tiedosto sama kuin uudelleenvienti: JuoksuKulku.bytes ei ole enää vientiä nykyisellä JuoksuOvet.jsonilla (49 ruutua eroaa, 颐和轩:n portaat). Siksi kerros lisätään olemassa olevaan tiedostoon, ei viedä uudelleen.
- Kartan kaupunkipallon `Lat/Lon` on sama kuin lennon alku: merkin siirto vain `PallonMaapiste`-arvolla.
