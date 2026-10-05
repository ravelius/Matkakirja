# Linssisepän luovutus 5.10.2026 klo 07.0x (viikkokiintiö 99 %, tilinvaihto: LOPETETTU)

Luovuttaa: Linssiseppä (Opus, high). Edellinen: `viesti-linssiseppa-luovutus-20261001-c.md` (TILA-osiot 2.–5.10.).
Proto-worktree: /Users/Shared/Claude/wt/proto-linssiseppa-astro-auto (nyt haarassa linssiseppa/linna-kuva).
Omat simulaattorit: iPhone D0D2CD1E-70C7-4140-A972-E615212E8911 (kaikki ajot), iPad 903C2B91. Vuorot aina Julkaisijalta
("NYT"), ehto n == 0, lopuksi "simu vapaa"/"sammutettu".

## AUKI NYT

### 1. Linnan kuvan viimeistely (Siirtosepän linna-unity-suunnitelma vaihe 3, juna 143) — SIMUVUORO ~06.30
- Haara **linssiseppa/linna-kuva e6fa10ea** (BUILD 141 5a0b9add päällä); edellinen käännös 5cc14f8a (= 03223685,
  $S/linnakuva-app). Tiedostot: Linssit/Unity/DioraamaViimeistely.cs (tilt-shift ScriptableRenderPass ajonaikaisesti vain
  dioraaman kameralle, renderer-asset ennallaan; sumennus 1/4-resoluutiolla + yhdistys pystymaskilla; sävy Neutral/ACES
  profiilin Tonemapping), Linssit/Resources/Varjostimet/TiltShift.shader, Linssit/Resources/DioraamaSavyAces.asset (ACES-
  variantti säilyy URP:n karsinnassa). Kosketuskohdat sovittu Siirtosepän kanssa: DioraamaNayttamo kutsuu Kiinnita Volumen
  luonnin jälkeen ja Irrota Tuhoassa; DioraamaSovitin.Komento: `poikki tiltshift 0|1|tila|aseta keski kaista liukuma
  voimaYleisPt voimaHuonePt`, `poikki savy neutral|aces`. Oletus ennallaan (pois, Neutral) kuvaparin hyväksyntään.
- Ajo: `proto-3d/tyokalut/linssiseppa-ajot/ketju-linna-kuva.sh` on käynnissä ja odottaa porttia **$S/sim-nyt-linna**
  (touch Julkaisijan SIMU NYT:llä; ajo-linna-kuva.sh odottaa "poikki: saapuminen alkaa"). Tulos
  lokit/linssiseppa-linna-kuva-20261005-c. Aiemmat: -a (latausruutua, hylätty), -b (sävy-A/B OK: ACES tummempi ja
  kontrastisempi; tilt-shift toimii, mutta täyden resoluution versiossa porraskuvio valoissa → korjattu 03223685).
- 06.06 ajo -c (käännös 5cc14f8a = 03223685): sävy-A/B OK, valojen porraskuvio poissa, MUTTA sumeaan seinään heikko
  ruudukko (suora 4×-pienennys) → korjattu **e6fa10ea** (pienennys 4×4-lohkon keskiarvona, pass 3). Käännös + simu
  pyydetty Julkaisijalta 06.1x; ketju: `ketju-linna-kuva.sh` (vaihda tulos -d:ksi) tai ajo-linna-kuva.sh uudelle .appille.
- 06.4x ajo **-d** (käännös 46d3aca2 = e6fa10ea): kuvapari LÄHETETTY Päätoimittajalle 06.5x (kuvat/omistajalle, merkitty).
  Porraskuvio poissa; sumeassa seinässä suurennoksessa yhä heikko ~2 px:n ruudukko (ei pienennyksestä, juurisyy auki:
  epäily R11G11B10/half-tarkkuus tai Yhdista-passin lerp; tutki vasta jos Päätoimittaja valitsee tilt-shiftin).
- **Kärki 9f37a9e9: 2 px:n ruudukon JUURISYY löytyi ja on korjattu, simulla TODENTAMATTA.** Gaussin askel oli 1,5
  tekseliä (kiinteä 4× pienennys), ja ytimen parinäytteet olettavat 1 tekselin askeleen, joten sivukeila oli 0,53 taajuudella
  0,389/tekseli, eli jakso noin 13 näytön px = mitattu kuvio. Nyt pienennyskerroin f = clamp(ceil(voima/3), 2, 8), jolloin
  askel on enintään 1 ja sivukeila 0,012. Offline-varmistus: ytimen taajuusvaste numpylla. unity-tarkistus 0.
- **Päätoimittajan suositus (omistajan aamukortti, makuasia):** Neutral + tilt-shift VAIN huoneissa DoF:n tilalla
  (yleisnäkymän tilt sumentaa tornit). Toteutus: `poikki tiltshift 1` + `poikki tiltshift aseta 0.5 0.14 0.22 0 6`
  (voimaYleisPt 0) tai oletukseksi VoimaYleisPt = 0. Kortin kuvapari: yleis Neutral ilman tiltiä (ajo -d 1-yleis-neutral) +
  kappeli tiltillä, KUVATTAVA UUDELLEEN 9f37a9e9:llä (ajo -d:n kappeli sisältää ruudukon).
- SEURAAVAKSI: käännös linna-kuva 9f37a9e9 → ajo-linna-kuva.sh (suurennos: ei ruudukkoa) → kortin kuvapari Päätoimittajalle
  → omistajan valinta → oletukset → merge-pyyntö Natiivisepälle. (sävy yleis+kappeli,
  tilt yleis/laituri/kappeli/keittiö, video tilt-yleis-kappeli.mov) → merge-pyyntö Natiivisepälle Päätoimittajan
  kuittauksella; Siirtoseppä rebasettaa Cinemachine-vaiheen päälle.

### 2. Auringon kiilto (glint, juna 140/141) — SIMUVARAUS 5.10. 11–13 (Julkaisijan jono tf-jono-20261002.txt)
- Haarat: linssiseppa/glint-2 (BUILD 137 80b7dcf0 + glint-commitit + 3de304db vain vedessä / rakeinen + **5b6b9d46**
  tuulikaistat 30 km kaukonäkymään, katto 2,0). Valmis käännös **3674ed53** = BUILD 138 + päät + glint-2 ($S/paat-app).
- Ajo: `ketju-kiilto-aamu.sh` (portti $S/sim-nyt-ki) → ajo-kiilto-cupola-3.sh (katse heijastuspisteeseen
  kiiltokulma.py:llä; LIVE-aika, joten korkea aurinko vain ~8–10 UTC) + maavuoto.py (kohdistus vaihekorrelaatiolla).
  Tulos lokit/linssiseppa-kiilto-cupola-h-20261005.
- Ajo g 4.10.: VAIN VEDESSÄ ok (maalla = kohdistusjäännös), mutta matala aurinko kaukaa = kermaläiskä → 5b6b9d46. Offline-malli
  tyokalut/linssiseppa-ajot/kiilto_malli.py (kaava validoitu: kierroksen e 45 90 = laskettu 46 93).
- SEURAAVAKSI: aamun ajo → suurennokset (rakeet, juovat heikot, ei maalle) → stilli + video + maavuoto Päätoimittajalle →
  merge-pyyntö glint-2:sta (LinssiOhjaimessa vain `astro kyyti kiiltovanha` -testirivi).

### 3. Lupakortin rivit junaan 143 (LÄHETETTY Päätoimittajalle 02.0x, mitään ei ladattu)
- Cinemachine 3.1.7 (Unity-rekisteri, 12,2 Mt, Unity 2022.3+, riippuvuus com.unity.splines 2.9.1 14,3 Mt, Unity Companion
  License; puhdas C# → IL2CPP ok myös simulaattorissa).
- Steam Audio steamaudio_unity_4.8.1.zip (GitHub v4.8.1, 132,2 Mt, Apache-2.0, Unity 2017.3+, iOS 11+ arm64 laite;
  iOS-simulaattoriviipale ja Apple Silicon -editori epävarmat → selviää paketista; lisäysversio Natiivisepän kuittaukseen).

## VALMIIT TÄLLÄ JAKSOLLA (4.–5.10.)
- Ajattelijapäät vain omassa maassa (omistaja 4.10. 19.4x): linssiseppa/paat-maassa 26b34eb8 → juna 140.
- Radio kaikki kanavat + pallo ylhäältä + jatkuva veto ja heitto: linssiseppa/radio-kaikki e9fe4b9e → juna 142 (kuitattu;
  Natiivi-UI katselmoi). Todisteet lokit/linssiseppa-radio-kaikki-20261004.
- Marcus 92d46875 → juna 135; yksi-kello 7ab396b3 jäi pois (LS2:n kello A valittiin).
- Lentopeli vaihe 1 kuvattu omistajalle (lokit/linssiseppa-lentopeli-esittely-20261004/omistajalle); vaihe 2 odottaa omistajaa
  (Kauppa-kysymys: natiivissa ei Kauppaa).

## OPITUT (lyhyesti)
- Linnan valmiusmerkki on "poikki: saapuminen alkaa" (ei "valmis"-sana: liekkiatlakset). Tilt-shift: sumenna pienennetyllä
  resoluutiolla, muuten suuri askel tekee porraskuvion.
- Kiiltokulma: katse oletus ennen laskua (lokin "suunt" = maajälki vain oletuksella). LIVE-aika siirtää alusta ~460 km/min.
- macOS grep: `\|` vain -E:llä. Älä vahdi `pgrep -f <oma skripti>`:llä. Odota SORMI-ikkunaa Monitor-tapahtumalla.
- Simun ajoskripti odottaa porttia enintään 2 h; vuoron venyessä käynnistä ajo uudelleen samalla .appilla.

## TILA 5.10. 08.1x (uusi tili)
- Omistajan päätös 08.01: Neutral, EI tilt-shiftiä missään → sama kuin BUILD 142 (profiili Neutral + Gaussian-DoF).
  Simu 08.0x käännöksellä b1b87e02 (= 9f37a9e9, tilt pois): DoF-alueissa ei ruudukkoa (3× + FFT). Stillit Päätoimittajalle
  (lokit/linssiseppa-linna-kuva-20261005-e/omistajalle). Suositus: linna-kuva EI mergetä (ei muuta kuvaa), haara viitteeksi.
- Uudet session id:t: Päätoimittaja local_8d8ebf72, Julkaisija local_24e63224, Natiiviseppä local_fcc10552.
- Kiilto 11–13: kopiot $S/ketju-kiilto-aamu.sh ja $S/paat-app (S = 7cea3452-scratchpad); portti $S/sim-nyt-ki.
- 11.0x KIILTO VALMIS: ajo h (3674ed53) → vain vedessä, tuulikaistat, ei kermaläiskää; kuvat lokit/linssiseppa-kiilto-cupola-h-20261005/
  omistajalle. Kysytty Päätoimittajalta kuittausta merge-pyynnölle glint-2 (5b6b9d46, puhdas master 62d5d1bb:n päälle) → Natiiviseppä, juna 143.
- 11.2x glint-2 merge-pyyntö Natiivisepälle (Päätoimittajan kuittaus; juna 143 iPad-mittauksen jälkeen Tavlin kanssa tai 144).
- 12.xx LONTOO-PILOTTI (LS2:n puolesta, ei pelikoodia): tutkimus docs/raportit/lontoo-pilotti-tekninen-tutkimus-20261005.md ja
  7 pysähdystä docs/raportit/lontoo-pysahdykset-20261005.md toimitettu. Omistaja 11.45: kaikki data ionista (1, 2, 96188).
  Työkalu proto-3d/tyokalut/linssiseppa-ajot/lontoo-koe. SEURAAVAKSI: lepo kunnes ISS-ohjaamo on junassa.
- KEHITYSTAHTI (omistaja 5.10. 12.30, Raamattu kohta 2, #3992): VIE-ikkunat 12 ja 20 (vain valmis+kuitattu); iPad-mittaus ei VIE-ehto;
  rutiinierän kuittaus ensin Laitetestaajalta, Päätoimittajalle vain maku/sisältö; todisteet todistusajolla (proto tyokalut/todistusajo/,
  TODISTUS.md merge-pyyntöön) vasta kun Pelikoodari ilmoittaa natiivin testimykistyksen ja OHJE.md:n valmiiksi.
- LONTOO VAIHE 1 (Päätoimittaja, omistaja 16.3x): proto linssiseppa/lontoo b89cdc51 (ydin LontooLento/LontooReitti + 7 testiä,
  LontooSovitin, LontooTaulu, KarttaKerrokset.RuutukrediititNakyviin — Natiivisepän ja Natiivi-UI:n kuittaus merge-pyynnössä).
  JUMI: ion-tunnus puuttuu (CesiumJS-arviointitunnuksen poiminta estetty) → omistajan tunnus avaintiedostoon CESIUM_ION_TOKEN.
  Käännös ~20.30 jälkeen (Julkaisija), ketju $S/ketju-lontoo.sh (OMA=1 testitila omalla maastolla), ajo-lontoo.sh portti
  $S/sim-nyt-lontoo, iPad-simu 903C2B91; tulos lokit/linssiseppa-lontoo-vaihe1-20261005-a.
- 17.4x OMISTAJA: Lontoo Google Photorealistic 3D Tiles -laatoilla (ion 2275207, kehitys/testi; julkaisu vasta maksullisen lisenssin
  ja Cesiumin vahvistuksen jälkeen). Toteutettu 4317849a (lontoo data google|ion|oma, oletus google). Omistaja lisää assetin
  tunnukseen; ketju valitsee googlen automaattisesti, kun asset vastaa 200 (muuten ion). Rakennustasojen arkki lähetetty
  (lokit/linssiseppa-lontoo-tutkimus-20261005/lontoo-rakennustasot-kooste.png).

## TILA 5.10. 18.5x — ELÄVÄ OPAS (omistaja 17.5x/18.0x) MERGE-PYYNNÖSSÄ JUNAAN 144
- Proto: linssiseppa/lontoo 3a842d85 (CesiumKaupunki, KierrosSovitin, OpasSovitin, Ydin/Kierros/*, KierrosTaulu) + Siirtosepän
  siirtoseppa/kaupunki-kuva 39244391 (KaupunkiKuva.cs, koukut Avattu/Suljettu) + Natiivi-UI:n natiivi-ui/opas-master 1ee62e19
  (PuluChat.Sieppaa/Vastaa/AvaaOppaalle, OpasValikko). Yhteiskäännös 6d7a569e, simu 18.47 lokit/linssiseppa-opas-20261005-f OK.
- Worker: Pöllö /opas/seuraava (#4008/#4009/#4011/#4012) ja /opas/tunnus (#4013, CESIUM_ION_TOKEN GitHub-salaisuudesta). Tunnus
  laitteella: Documents/cesium-ion-tunnus.txt (kehitys) tai Pöllöstä ajossa; ei repoon eikä lokiin.
- Komennot: linssi opas; opas testi|testiotsake|pysayta 0|1, kaupunki <nimi>, toive <teksti>, data google|ion|oma, tila.
  Ajot: proto-3d/tyokalut/linssiseppa-ajot/ajo-opas-v2.sh (TUNNUS_POLLOSTA=1, TOIVE, UIKUVAT).
- AUKI: himmeä "ISO-BRITANNIA" Googlen kuvassa (kysytty Natiivisepältä kerrosta); muisti simussa 5,3 Gt (Laitetestaaja iPad junan
  jälkeen); ääni todentamatta simussa (testiotsake). Lontoon kierros (linssi lontoo) on mukana kehittäjätilassa.
