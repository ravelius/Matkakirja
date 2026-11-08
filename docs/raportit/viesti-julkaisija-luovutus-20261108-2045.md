# Julkaisija: luovutus 8.11.2026 klo 20.45 (korvaa -1705:n; sen ja aiempien OPIT voimassa)

Edellinen: git show 7e3a958a9:docs/raportit/viesti-julkaisija-luovutus-20261108-1705.md
T = /Users/Shared/Claude/julkaisija-tyokalut, L = /Users/Shared/Claude/proto-3d/lokit, jonoloki T/jono-20261103-ilta.txt.

## TILA 20.45: kaikki jonot TYHJÄT, ei ajoja käynnissä (vain valoseppa-vahti.zsh). Levy 63 Gi.

## UUSI SÄÄNTÖ: Raamattu 12.26 PYSYVÄ (omistaja 19.08, PR 6504 8fa8954dc)
iPadilla vain muisti, nopeus, kosketus ja koeversion tarkistus; kaikki muu ensin Macilla iPad-koossa.
iPad-pyyntö ilman Mac-ajon viitettä → takaisin tilaajalle. Ajo seis heti kaatumiseen tai puuttuvaan kuvaan, loput korjauksen jälkeen.

## OPIT tältä vuorolta
1. Mac-esikatselu ottaa kuvan VAIN riviltä `kuva X`. `komento kuva X` (iPad-muoto) → Macilla kuvia 0 (myös kaikki NUI:n
   lentoraja-1…5 ja merenpohja-3 ajot olivat kuvia 0 / vain mp4). Tarkista ennen ajoa: grep -c "^komento kuva" skenaario;
   jos > 0 → kopio T:hen sed 's/^komento kuva /kuva /' (tehty: T/sk-navat-kohokalotit-v5-mac.txt, T/sk-nahtavyysrajaus-1-mac-kuva.txt).
   NUI ja NS tietävät; uudet Mac-skenaariot jo kuva-riveillä.
2. "? options:" ipad-ajon lokissa = devicectl installin normaali viimeinen rivi (rc 0), EI vika.
3. f1c-korjaus (kiinni ennen konsolia) TOIMII: pp3, FPV ab5, kohokalotit kaikki 1. yrityksellä 18.40–19.04.
4. KUVAVAHTI lisätty T/ipad-skenaario-f1c.zsh:ään 19.1x (PT pyysi): `komento kuva X` → kuva haetaan heti laitteelta, md5 ennen/jälkeen;
   ei uutta 60 s:ssa → "VIKA kuva puuttuu X – SEIS", exit 2. Pois: KUVAVAHTI=0. Haku testattu, koko ketju EI vielä iPad-ajossa.
5. Mac-ajopohjat: T/nui-lentoraja-5-mac.zsh (video), T/ns-fpv-d-mac.zsh (kuvat, iPad-koko), T/nui-nahtavyysrajaus-2-mac.zsh <koko>
   (iphone|iphone-vaaka|ipad, PISTEKERROIN 0.465). Kaksi linjaa L1/L2 rinnakkain toimii (vapaa+portti).
6. NS:n FPV-viat 1e807048b kaatui Macilla SIGSEGV Cesium TilesetHeightRequest (karsinnan vaihto); NS korjasi 78bd767c1.

## Ajettu ja kuitattu tällä vuorolla (kaikki kuvat katsottu)
- NUI Mac: lentoraja-2 ab1059a74, -3 9c2d72713, -4 81a9b12b3 (maastoraja 21,0 km), -5 c1cde1148 (36,1 km, pohja 0 kaikilla);
  nähtävyysrajaus-1 bdd0f7a83 (iphone, ipad), -2 65f0277be (iphone, iphone-vaaka, ipad). Videot/kuvat NUI → PT.
- NS iPad: pohjapallo pp3 f7cf0bd7c 4/4 (18.46), FPV ab5 2fa367316 15/15 (18.57), kohokalotit 300e9923f 4/4 (19.04).
- NS Mac: kohokalotit v5 95f5af086 4/4 (19.24), FPV-viat 78bd767c1 9/9 (20.33), FPV-D fe37c4ae2 8/8 (20.43).
- KS: napakalotit v5 vienti julisteet/pallo/napakalotit/2026-11-08-kohokartta-v5/ 5/5 CDN OK (19.14), skripti T/ks-napakalotit-v5-vienti-20261108.zsh.

## Siivous (ennallaan -1705:stä)
Laitekäännökset f7cf0bd7c ja 300e9923f ajettu → voi poistaa (L/julkaisija-laite-218-*), 2fa367316 vasta kun NS on vertaillut.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille (local_afae44f0-722b-4541-a3b8-30ca4f76543b).
