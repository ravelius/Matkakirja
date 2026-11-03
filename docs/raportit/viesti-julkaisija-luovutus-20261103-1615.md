# Julkaisija: luovutus 3.11.2026 klo 16.15 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-1535.md (PR 6163, auki).
Koko päivän jonoloki: julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila).

## iPadit
- PIENI (00008142-0019686E02F3801C): cb1b5d9fc. LAITE NYT annettu NUI:lle 16.1x (ei asennusta, konsoli; omistajan tallennus) → odota "VAPAA pieni".
  Pieneen asennus vain KK:n ASENNA-luvalla (PT 16.1x).
- ISO (00008103-001819421413401E): ipad-lukko /tmp/matkakirja-ipad.lukko. Nyt NS:n vieritys reunat on/pois 6da58f32b
  (taustaketju odottaa iPad-lukkoa, IPAD_ODOTA=3600; tulokset lokit/natiiviseppa-fps-vieritys-6da58f32b-reunat-*-ipad-*).
  Sen jälkeen LAITE NYT ISO → NUI: asenna 44ecc31d1, mittaa muisti (ennen = 693cf437f) + luenta oikealla saapumisella (matka bryssel → pariisi).
  NUI jättää laitteeseen 693cf437f.
- Palautusrunko molemmille edelleen cb1b5d9fc (app lokit/julkaisija-laite-218-cb1b5d9fc).

## Yhdistelmä ja kokeet (proto-repo)
- YHDISTELMÄ 693cf437f (wt /Users/Shared/Claude/wt/julkaisija-yhdistelma-218, detached) = c9ab58e88 + ASTC 6a7af2d9d + NUI 6eeffaa57 (koottu.txt
  versioriville) + NUI kuvaloki 82e74784a + intro 693cf437f. Laiteapp valmis 15.55 (lokit/julkaisija-laite-218-693cf437f).
- NUI muistikorjaus 44ecc31d1 (natiivi-ui/muistihuippu, 693cf437f:n päällä): laitekäännös L2 KÄYNNISSÄ 16.1x (julkaisija-tyokalut/laite-44ecc31d1.log).
  Yhdistelmään vasta PT:n kuittauksella (omistajan 16.11 kaatuminen = kartan pikkukuvan suurennos).
- KOE (wt /Users/Shared/Claude/wt/julkaisija-koe-218): 76b35ce95 = 693cf437f + KS 9d1ce79e5 + e735de8ab + 804706bc3 + NS 3ab522752 + 70071fea2
  + ad08abe9a + 56c06b836 + 582fc208e. Laitekäännös L2 käynnistyy automaattisesti 44ecc31d1:n jälkeen (nohup ketju-koe-76b.zsh → laite-76b35ce95.log).
  Sitten isolla: `zsh julkaisija-tyokalut/koe-mittaus-iso.zsh 76b35ce95` (saapuminen 0–20 s, zoomit 0,16/0,06/0,015/0,01, z14 100|50,
  m4-varoitukset, pisimmät ruudut) → `python3 -I julkaisija-tyokalut/parit.py <ennen 693cf437f-kansio> <jälkeen-kansio> <ulos> nimet…` → PT + KS + NS.
  Ennen-kansio: lokit/julkaisija-koe-iso-693cf437f-1605 (ei zoom-4:ää).
- Edellinen koe 6da58f32b mitattu (lokit/julkaisija-koe-pari-6da58f32b): m4 19 → 0; z14-kyltit puuttuivat (KS korjasi e735de8ab/804706bc3);
  pisin ruutu 140 → 459 ms (PostLateUpdate, ETC-mip 170×50/150×40) → NS 70071fea2 kertoo syyn konsolissa.

## Linjat
- L1 (/tmp/matkakirja-kaannospalvelu.lukko): PK 218ag ketju käynnissä (julkaisija-tyokalut-taustalla; loki proto-3d/lokit/julkaisija-ag-20261103.log,
  runko f25009027; ys/tj/cx valmiit 16.03) → valmis-rivi PK:lle + PT:lle. Sitten ESIKATSELU NYT L1:
  1) VS sal11 769cb9ea6 (~3 min, `zsh proto-3d/_tyo/linssiseppa2/salamat-aito/sal11/ajo.zsh 1`), 2) LAV saumat 97ef79bd6 + pronssit (~30 min,
  `PROTO_LINJA=1 zsh proto-3d/lokit/lav-saumat-20261103/unity/aja-saumat.zsh 97ef79bd6`) → juna 219, pari PT:lle.
- L2 (/tmp/matkakirja-kaannospalvelu-2.lukko): laite 44ecc31d1 → laite 76b35ce95. NS:n simuketju 6da58f32b (ketju.zsh) saattaa vielä pyöriä – odota NS:n VAPAA.
  Odottaa L2: NUI-simu (keisarin nosto 6119d4a12 + valikkokuva t9) uusimmalla yhdistelmällä.
- TRIPO/CODEX-JAKSO: ehdotettu PT:lle 17.00–18.00 (LAV:n jälkeen) ilman Unityä/simua/käännöstä. Lähetä PT:lle ALKAA-rivi, kun LAV vapauttaa L1;
  jakson ajan uudet käännökset odottavat.

## Juna 218 (PT kirjaa): VS kontakti k6 d68385bac, LAV osasarja-v12 cce530a1b, VS iss-218 f21b6baa8 (ei sal10).

## Tehty 15.35–16.15
- Kaatumisloki pieneltä (lokit/julkaisija-kaatuminen-pieni-20261103): ei .ips:ää eikä Jetsamia; lokit loppuivat 15.33.46.
- Toisto + intro isolla 693cf437f (lokit/julkaisija-toisto-iso-693cf437f-1600/tulos.md): ei kaatumista; lähizoom +260 Mt tekstuureja, FRA-esilataus
  toistuu 25 s välein; intro: kuvat + C5 ok, luenta ei tule `ui jatka` -polulla (NUI vahvisti: LuentoOhitettu, testaa oikealla saapumisella).
- Uudet työkalut: laite-iso.zsh <sha> (LINJA=, ASENNA=0|1), intro-iso.zsh, toisto-iso.zsh, koe-mittaus-iso.zsh, parit.py.

## OPIT
- Taustaketjussa `pgrep -f "<sha>"` osuu omaan komentoriviin → ikuinen silmukka; odota lokitiedoston riviä (grep KÄÄNNETTY) tai pid:tä.
- Keskeytä vain oma puu (puu()-funktio), sitten orpo L2-lukko pois vain, jos lukon pid kuollut.
- ipad-lukko.sh kaari ei odota oletuksena → IPAD_ODOTA=3600.
- `ui jatka` kaupungissa vaientaa paikan puheen → luentatestit oikealla saapumisella.
