# Pelikoodari: luovutus 10.11.2026 klo 00.25

Korvaa kaikki aiemmat. Edellinen: `git show bb77f83c4:docs/raportit/viesti-pelikoodari-luovutus-20261109-2302.md` (kaikki sen kohdat hoidettu tai alla).
Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä. Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu,
haara pelikoodari/juoksu-leivottu = 1b2e885ff (remote natiivi-backup; pohja juna 224 b804a87d6). Python-työkalut ilman -I:tä (numpy käyttäjän site-packagesissa).

## TEHTY TÄSSÄ VUOROSSA
- Leivonta oikealla listalla (JU:n Mac-ajo pk-leivontalista-mac-fef369ae9): 530 glb. Jaetut kuvat cf4d34ee4: glb:ssä viite "MKAV<avain>", kuva kerran
  paketti-v1/kuvat/<avain>.astcm (JuoksuLeivottu.OnViite/LueViite) → paketti 2,4 → 1,18 Gt (kuvat 665 Mt + geometria 517 Mt), 1053 tiedostoa.
- 3 ämpärin 404-glb:tä (A3/A5 -lod1, osasarja-v15 pursotukset) = pelin valinnaisia hakuja, ei koskaan tehty; listalla kommentteina (1b2e885ff). PT:lle kerrottu.
- iPad-A/B (JU, lokit/pelikoodari-leivottu-{0a,1a,0b,1b}): lataus 21,1 → 14,6/14,9 s, rakenna 8,2 → 2,3 s, suurin nykäys 3,0 → 0,7 s, huippu 4,3 → 2,7 Gt.
  Taulukko /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-leivottu/TULOS-ipad-ab.md. PT 00.3x: 4x4 valittu.
- PT:n yöjono: (1) keisari lähtee itse a5c88cc92 + latauskuvan otsikko 5b605994e jo junassa 221→224 (PT:lle, työlistan tilanne päivitetty).
  (3) Taso läpi -kortti junassa 220 f86344e8f, laitekuva puuttuu (vaatii maalin, ei QA-komentoa); tuloskortin rikotut koodissa, kuva kulkuajosta.

## JONO
1. KUVAPARI (PT:n ehto ennen leivotun kuittausta junaan 224): JU:lla sk-ipad-pari-0.txt / -1.txt (juoksu-leivottu-kansio) → lokit/pelikoodari-pari-0 / -1,
   4 kuvaa kummassakin (a alku, b kujan pää, c tarkastelukamera kujalla, d sisäpiha). Kokoa parit (vasen 0, oikea 1, sama rajaus, täysikokoiset) PT:lle.
   Jos tarkastelukameran pisteet (-138.7 4 425 0 8 60; -135 12 270 0 15 60, pohjan kehys) osuvat huonosti, korjaa pisteet paikka-rivien mukaan ja uusi.
   Jos b ei ole kujan päässä (keisari ei pysähtynyt 20 s:ssa), katso paikka-rivi. PT:n kuittauksen jälkeen: JU poimii haaran junaan 224.
2. KULKUAJO (työlista "tason 1 kulkualue", iPad-kulku todistamatta): 1. ajo lähetysvika (lokit/pelikoodari-kulku-ipad-cf4d34ee4-lahetysvika);
   JU uusii → lokit/pelikoodari-kulku-ipad-cf4d34ee4. Tarkistus: `python3 /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kulkukartta/tarkista_kulku.py <konsoli.txt tai unity.log>`
   (TULOS OK = kaikki paikat kulkukartalla, > 5 eri ruutua). Kuva kulku-tuloskortti → tuloskortin rikotut näkyvät? Rivi PT:lle + työlistan tilanteet.
3. VAIHE 2 "valmiit verkot" (PT 00.3x: saa alkaa heti rinnalla, samoin ehdoin: ei junaan ilman kuittausta, ulkoasu ei muutu, iPad-ajot JU:lla):
   RakennaSolmut-ryhmät leivottuina (rakenna 2,3 s + verkkojen keruu 0,8 s jäljellä leivotullakin). Muut ~12 s: lähipuut/koristeet 0,9, salit+katot 1,6,
   peittokartta 0,8, kaiteet/räystäät 2,7, juoksun sisältö 2,7, taivas 1,2 s (aikajana lokit/pelikoodari-lataus-glb-0c/muisti-tarkka.log 135.5–156.6 s;
   tuoreempi ositus lokit/pelikoodari-leivottu-1a/konsoli.txt). Ehdota PT:lle ensin suunnitelma (3 riviä), sitten tee.
4. LAV tekee uuden lattian + valon (omistaja 22.56): kun LAV ilmoittaa lähteiden muutoksesta → `python3 tyokalut/juoksu-leivonta.py tyokalut/juoksu-leivonta-lista.txt`
   työpuussa (välimuisti pakkaa vain uudet kuvat), commit listaan jos muuttui. ÄLÄ muokkaa lattian geometriaa tai valoa.

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh; ei kata Editor-kansiota). Levyä 34 Gt vapaana (lahde 1,5 Gt + astcm 0,7 Gt välimuistissa).
