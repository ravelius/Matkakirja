# Pelikoodari: luovutus 07.11.2026 klo 18.20

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (32 %). Vanhat työkalut: `git show bb183d409:docs/raportit/viesti-pelikoodari-luovutus-20261107-1532.md` kohta 5 ja kulkukartan kohta, `git show 3852590e7:docs/raportit/viesti-pelikoodari-luovutus-20261107-1303.md` kohta 4.

## 1. Seuraava työ (PT 18.21): kulkukartan seinäkorjaus (v15) loppuun
Juurimalli ei ole lukittu: saanto2 on ehdokas, uusinta kuvat JU:lla. Tee korjaus niin, että kartta rakennetaan uudelleen yhdellä ajolla, kun juuri lukittuu. Älä rakenna lopullista vielä. Älä aja palkki5:llä (PT 16.26).
Jos seinäkorjaus ei etene ilman juurta: jatka Lontoon rakentamista kokeena, TF vain kortilta. Rivi PT:lle, kumpaa teet: ensimmäinen rivi PT:lle sanoi, että tämä alkaa nollauksen jälkeen.
Ei vielä selvitetty: etenee Karko ilman juurta. Aineisto `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kulkukartta/`: v15 paikallaan, v4–v7 ja osasarja-v8 ja -v13 ovat linkkejä T7:lle (siirretty 7.11., käännösajoista T7 ei näy). `vertaa_levyt.py` samassa kansiossa.
Huomaa ristiriita vanhaan ohjeeseen: 1532 sanoi "lisää kerros olemassa olevaan tiedostoon, älä vie uudelleen" (49 ruutua eroaa, 颐和轩:n portaat, ks. 1303 kohta 4). PT:n yhden ajon vaatimus edellyttää, että tuo ero selvitetään tai se on osa ajoa. Keisarin jalat `a45afc9af` ja `tyokalut/kulkukartta_pinta.py` lisäävät neljännen kerroksen: uudelleenrakennuksen pitää säilyttää se.
LAV tiedoksi: juuren sääntö täyttää poistettujen reunusten kohdat, 2 833 m² koko palatsissa, tasainen lattia lähilattian korkeudella +2 mm, ei lisää seiniä, reunakivet ja kivireunukset poistuvat. Vaikutus kulkukarttaan on mittaamatta: mittaa, kun juuri tulee.

## 2. Valmiit tällä vuorolla
- Lontoo-nimi `5bd4aa484`, omistaja 16.09 "Kelpaa", junassa `f873c938f`. Tason vaihdon paikkaan, Pariisin kahteen pysähdykseen, Wellingtoniin ja Morningtoniin ei työtä.
- Lontoon kumpu: MaaH `045844251` junassa, 30 laattaa viety mediaan 16.58 kansioon 2026-11-07-lontoo, verkosta 30/30 samat kuin paketti. Sovelluksen verkkohakua ei ole ajettu.
- Levy: 10 työpuuta pois, vanhat palat ja kulkukartan versiot T7:lle, 9 haaraa pushattu natiivi-backupiin. Jäljellä työpuut `proto-pelikoodari-kortti` (haara lontoo-kumpu-maah) ja `-tarkastelu` (keisari-jalat-2): uudelle työlle luo oma työpuu `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree add`.

## 3. Odottaa
Yhteisajon kohdat (kynnykset, esineet, ruudukko, katot, kuplat, peukalorenkaat) odottavat rungon lukitusta (PT). Ks. 1532 kohta 3.

## 4. Opit
- Lokin laatikot ovat 640×480-ruudussa, kuvat 2752×2064. Ladonta ei päivity liikkeen aikana (omistaja 09.54): mittaa pysähdyksissä, ja katso aina kuva: loki voi sanoa "ladottu", kun nimeä ei näy.
- TF 219:n commit on `a8b873e5d`, ei tagin tf-219-koe `36cd3087a`. TF 218 on `a5323cf4e`.
- zsh: `"$r:refs/..."` tulkitaan muokkaimeksi. Käytä `"${r}:refs/..."`. Älä piilota push-virheitä ennen kuin komento on nähty toimivaksi.
- Media: paketin gzip-laatat tarvitsevat otsakkeet Content-Encoding: gzip ja Content-Type: application/vnd.quantized-mesh. curl ilman Accept-Encodingia näyttää puretun.
