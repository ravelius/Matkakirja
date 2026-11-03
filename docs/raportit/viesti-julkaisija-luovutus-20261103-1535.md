# Julkaisija: luovutus 3.11.2026 klo 15.35 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-1315.md (+ LISÄYS 13.55).
Koko päivän jonoloki: julkaisija-tyokalut/jono-20261103-ilta.txt (aikajärjestyksessä, viimeiset rivit = nykytila).

## iPadit (TÄRKEIN)
- **Molemmissa iPadeissa cb1b5d9fc** (asennettu 15.21; = 429b75faf − revert 252c190dc). Omistaja 15.14: Pariisi oli sekaisin/väärinpäin
  (252c190dc ASTC-pakkaus kirjoitti lohkot alhaalta ylös). Laitekuvilla tarkistettu oikein; KK + PT kuitattu 15.25.
  App: proto-3d/lokit/julkaisija-laite-218-cb1b5d9fc/Matkakirja3D.app = **palautusrunko kaikille rooleille** (ei enää 1420265d7).
- PT/omistaja 14.36: mittaukset/simut vain uusimmalla yhdistelmällä; iso iPad samaan kuin pieni.
- Pieneen iPadiin vain PT:n/KK:n ASENNA-luvalla (devicectl 00008142-0019686E02F3801C). Iso 00008103-001819421413401E.
- Laitekuvat: `zsh julkaisija-tyokalut/pariisi-kuvat-laite.zsh pieni|iso` (KONSOLI=1 = konsoliloki); Pariisi z0.16/0.06/0.015 + Lontoo.
  Komento "aja <lat> <lon> <leveys asteina> 3". Kuvat lokit/julkaisija-pariisi-tarkistus-20261103/. Iso ipad-lukolla (/tmp/matkakirja-ipad.lukko).

## ASTC-todistus (odottaa PT:tä)
- NS 6a7af2d9d (= eed17074d + 252c190dc + suunnan korjaus ee278af37, proto-repo, haara natiiviseppa/astc-laite-218) laitekäännös
  valmis (lokit/julkaisija-laite-218-6a7af2d9d), ajettu isolla iPadilla 15.27: Pariisi/Lontoo oikein, ei "ASTC-pakkaus ei onnistunut";
  18× "not multiples of 4, Compress will not work" (reunapalat) + yksi PiirrosKerros 63 ms → NS:lle. Parit PT:lle (pari-astc-*.jpg).
  Iso palautettu cb1b5d9fc 15.30. **ASTC takaisin yhdistelmään vasta PT:n hyväksynnällä.**

## Yhdistelmät (wt /Users/Shared/Claude/wt/julkaisija-yhdistelma-218, detached HEAD = c9ab58e88)
- **Seuraava = c9ab58e88** = eed17074d + NUI 6119d4a12 (keisarin nosto). eed17074d = de11fa0c2 − 252c190dc; de11fa0c2 = 429b75faf +
  NS 7d122e1d1 (c61d28c99 kylmä Lontoo + A/B) + NUI a141413c2 (otsikon soikio). Kaikki ristiriidatta.
- Ei vielä mukana: NS Cesium-korjaus (alaosan sumeus, NS nollautui), NS pohjoisen laatat (iso), ASTC (PT:n hyväksyntä).
- Juna 218 (PT kuittasi, kirjattu): VS kontaktivarjo k6 d68385bac (linssiseppa2/kontakti-218). Juna vasta omistajan pyynnöstä.

## Linjat ja jono luovutushetkellä
- **L2: NS 1b-simu c9ab58e88** (alkoi 15.30, yhdistelma-simu.zsh, LATAUS_B="64 40 40") → tulos PT:lle, VAPAA NS:ltä.
  Sen jälkeen L2: **NUI simu c9ab58e88** (paluu-pariisi + juoksupelin tarina; PT: KK katsoo ennen omistajaa) → SIMU NYT NUI:lle.
- **L1: LAV** sai VUORO NYT 15.21 (Blender k4 + editoripari 02+06 `PROTO_LINJA=1 zsh proto-3d/lokit/lav-kohta3-20261103/unity/aja-v12.zsh cce530a1b`)
  → VAPAA LAV:lta. Sitten L1: 1) **VS ISS pari1 (+ sal10)** `zsh proto-3d/_tyo/linssiseppa2/iss-218/pari1/ajo.zsh 1` → ESIKATSELU NYT VS:lle;
  2) **PK 218ag** `PROTO_LINJA=1 zsh proto-3d/_tyo/pelikoodari/sali-218ag/ketju-ag.zsh ys tj cx ty xf cc` (JU ajaa itse, alku+valmis PK:lle).
- NS:n vieritysmittaus (vieritys-ipad.zsh <sha>, ipad-lukolla) **vasta korjatulla ASTC:llä** (PT) → odottaa.
- Lukot: L1 = /tmp/matkakirja-kaannospalvelu.lukko (EI -1!), L2 = /tmp/matkakirja-kaannospalvelu-2.lukko, iPad /tmp/matkakirja-ipad.lukko.

## Tehty 13.55 jälkeen
- VS k6 L1 (käännös + Unity-pari + iso iPad) 13.55–14.27. PK 218ae + 218af L1 14.15–15.16 (taso1b "VIKA kuvia ei syntynyt", mp4 on).
- Yhdistelmäsimu eb2c92eb3 valmis 14.22 → PT. NS 3973f10b0-simu 14.56. KS Westminster 713986b6d -simu 14.57–15.09.
- Viety LAV saumat-v1 (osasarja-v13, tausta-v116, rakennukset-v120, c2-v36) 838 tiedostoa, virheitä 0 (14.12).
- Asennettu 429b75faf molempiin 15.11 → korvattu cb1b5d9fc 15.21.
- Keskeytetty PT:n käskystä: NS 029f984c8-vieritys (14.4x), NS de11fa0c2-simu ja 429b75faf-vieritys (15.15); orvot lukot poistettu.

## OPIT
- Ennen kuittausta laitekuva itse (pariisi-kuvat-laite.zsh) – simu ei näytä laitteen omaa polkua (ASTC vain laitteella).
- Peruttavat ajot: tapa koko prosessipuu (puu()-funktio), sitten orpo lukko pois vain jos pid kuollut.
- Pienen iPadin tarkistuksessa EI uusi-peli-komentoa (omistajan tallennus); "aja" + "kuva" riittää.
