# Valoseppä (ent. Linssiseppä 2) – luovutus 14.10.2026 päivä (11.2x), nollaus (PT: konteksti 68 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_fc4fcc54. Edellinen: viesti-linssiseppa2-luovutus-20261014-aamu.md.
Rooli muuttui 14.10. 10.4x (PT, omistajan päätös): **VALOSEPPÄ = valo, ilmakehä, materiaalit, avaruuskohtaukset**; museot ja opas
jäävät Linssisepälle (LS1). Viestit aina `send_message` id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md; PT = local_74630a27
(PÄÄTOIMITTAJA (Opus, medium)), ≤ 3 riviä + polut. local_593b89a1 on omistajan Keskustelukanava, sinne EI roolien viestejä.
Nollaus: luovutus + push → Postivahdille (local_e6d70b5a) "LUOVUTUS VALMIS <sha>".

## Lue ensin
1. CLAUDE.md. 2. Raamattu Ydinajatus kohta 2. 3. /Users/Shared/Claude/osoitekirja.md. 4. Tämä raportti.
SITOVA (omistaja 10.5x): jokainen simu- ja Mac-ajo alkaa `aani mykistys` (todistusajo.sh tekee sen itse), Macin kaiuttimista ei mitään.

## ENSIMMÄINEN TEHTÄVÄ: Valosepän vahdin vakiokuvaskripti (Julkaisija, omistaja 10.56 "Valoseppä ensin")
Julkaisija rakensi vahdin (julkaisija-tyokalut/valoseppa-vahti.zsh): jokainen uusi kärki proto-haaroissa `linssiseppa2/*` käännetään
vapaalla linjalla ja ajetaan vakioskenaario → lokit/valoseppa-uusin/. Tarvitaan skripti
`zsh <polku>/vakiokuvat.zsh <app-polku> <tuloskansio>`: asentaa appin omaan iPadiin A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4,
`aani mykistys` ensin, Lontoon pallokierroksesta 3–4 pysäkkiä + pallo (kartta) + ISS (Cupola tai telakointi), kuvat + arkki (jpg, nimessä
"arkki") + nopeus.txt (fps: konsolin `kehysajat`-rivit p50/p95; latausajat: `opas: saapui … laatat %, saapumisportti s, tarkkuus`),
sammuttaa simun, exit 0 = ok. Pohjat: _tyo/linssiseppa2/lontoo-praha/sk-lontoo4.txt (kierros), _tyo/linssiseppa2/telakointi/sk-telakointi10-ipad.txt
(raketti→telakointi), todistusajo.sh-kutsu ketju-lontoo4.zsh:stä. Kerro Julkaisijalle polku + kesto (~12 min). Vahdista suljettava pois:
`linssiseppa2/praha-ateena-kehitys` (odottaa PT:tä), `linssiseppa2/valkoiset-laatat-diag`. Commit = käännös → vain valmiita välivaiheita.

## LONTOO (PT kuittaa arkeista; haara `linssiseppa2/lontoo-korkeus-v2` kärki a224cf506, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-lontoo)
Pohja natiiviseppa/juna-189. Sisältö: pintamallit Lontoo v2 + Praha v2 (KorkeusVersiot), elävä Lontoo/Praha/Ateena (Resources/Elava, Julkisivuvalot,
lippukuviot UnionJack / VaakaraidatKiila / VaakaraidatKulmaristi), Lontoo Kehityskaupungit-listaan (omistaja 09.0x), aerosolin uusinta 120 s,
kehittäjän pallokierroskorjaus (Documents/pallokierros-<id>-korjaus.json), pilvet-v3 + vari-v3 (Thames/Docklands, Vltava, Saroninlahti),
muotokorostus päivä 0,9 / 0,05 ja yö 0,3, Lontoon pallokierros-v3 (Trafalgar 172°, silmä 70–85 m; PT KUITTASI), PALLON LATAUSPORTTI
(OpasSilmukka: PalloLento → vauhtikerroin liukuu 0,06:een aikavakiolla 0,7 s, saapuminen ja kerronta odottavat NakymanTarkkuus ≥ 0,9,
enintään 25 s; testi LahtoLaatatTestit.PallonLatausporttiOdottaaPehmeasti). Testit 1768/490/584 läpi, unity-tarkistus 0.
- KESKEN: **lontoo4**-ajo (käännös a224cf506 L2 11.08, simu perään automaattisesti; _tyo/linssiseppa2/lontoo-praha/ketju-lontoo4.log):
  mittaa Greenwichin portti (p08a/b/c: +0,5/+4/+10 s; lokissa `saapui Greenwich … saapumisportti X s, tarkkuus`). Tavoite: ei harmaata,
  saapuminen vasta tarkkuuden ≥ 0,9 jälkeen, liike pehmeä. Lähetä Julkaisijalle LUKKO VAPAA / SIMU VAPAA (ketju kirjaa ajat lokiin) ja PT:lle
  arkki ≤ 3 riviä. Tee arkki kuten _tyo/linssiseppa2/lontoo-praha/arkki.py (ennen | jälkeen) tai pelkkä rivi.
- AVOIN KS:llä: Elizabeth Tower puuttuu muodot-lontoo Q62408:sta (torni 51,50073 / −0,12462 on polygonin ulkopuolella, OSM oma rakennus) →
  KS lisää renkaan ja korkeus_m 98; kytke uusi muodot-lontoo.json Resources/Elava/:iin ja todista päivän korostus Big Benissä
  (erokartta lokit/todistus-lp3-20261014-1036/ero-westminster-korostus.png: torni ei muuttunut).
- Lontoon kehittäjän korjaustiedostoa ei enää tarvita (v3 ämpärissä).

## PRAHA JA ATEENA (PT: avataan vasta arkkien jälkeen)
- Haara `linssiseppa2/praha-ateena-kehitys` 1a41ff9df = Lontoon kärki fbd9d2cf9 + Praha ja Ateena Kehityskaupungit-listaan (rebase
  Lontoon uudempien kärkien päälle ennen junaa: cherry-pick 1a41ff9df). Lontoon haarassa revert de5afe838 pitää ne erillään.
- Prahan arkki: lokit/todistus-lp3-20261014-1036/arkki-lp3-korostus-praha.png (rivit 2–3) + todistus-lp-ennen/jalkeen-praha-*/arkki-*.png.
  Vltavan tumma alue korjautui KS:n vesi-v2:lla (+1,5 m padottu joki; testattu paikallisena: ketju-lp3.zsh kopioi
  _tyo/linssiseppa2/lontoo-praha/vesi-testi/ Documentsiin, kaupunki-vesi.txt file://). KS vie ämpäriin index-v22 + praha2 → lisää
  "index-v22.json" VesiIndeksi.Nimet-listan kärkeen, kun KS kertoo.
  Josefov: kehittäjän korjaus Q443107 katse_suunta 340, silma_m [55, 70] (v2-näkölinja 55 % → ~25 %) – odottaa PT:n kuittausta, sitten KS
  päivittää datan (pallokierros-v2/praha → uusi versio, Versiot["praha"]).
  Yö: korostuksen yölisävalo tekee Prahan linnan edustan maitomaiseksi → ehdotettu 0,3 → 0,2 (PT päättää; KohdeKorostus.shader lerp(0.05, 0.3, yo)).
  Vltavan padon porras (Staroměstský jez) näkyy yöllä rakona → KS.
- ATEENA: ei pallokierrosta (opas/pallokierros-v1/ateena.json 404) → workerin kierros; arkki tekemättä. Elävä Ateena + GR-liput + aerosoli/pilvet
  kytketty. KS kysyi PT:ltä Akropolis-museon rajausta.
- Näkölinjatyökalu: scratchpadissa (katoaa) → kopio tarvittaessa: `los2.py`-idea: pintamallin PNG (16-bit dm + pohja_m), kamera b-suunnassa,
  9×13 sädettä pystykuvan kentässä, este = DSM > säde ja > maa + 8 m ennen 0,8 × etäisyys. Python venv: /Users/Shared/Claude/proto-3d/_lahteet/venv-laser.

## TELAKOINTI (VALMIS, PK yhdisti)
Juurisyy: RakettiMaasto poisti kerroksen 28 pääkamerasta ja palautti luontihetken maskin → 2. laukaisusta alkaen raketti ja ISS piirtyivät
vain päällyskameralla (lähitaso 12 km) → näkymättömiä. Korjaus `linssiseppa2/telakointi-valo` 1858f8f53 (maasto pois telakoinnin alussa,
OnDestroy palauttaa vain oman bitin, RakettiRunko aurinko _RunkoAurinko.xyz:stä, diagnoosiloki 2 s). Telakointi10 todisti kolmella laukaisulla.
PK: telakointi-190 = 1858f8f53 (fast-forward). PK:n vihje: Avaruus.KeskitaKuoret ja Yokuori keskittävät vain paikan, ei kiertoa;
PK:n MaanKehys.Siirto(g, rakennus) (b28d792b8, iss-kupoli-190) korjaa sen – tarkista yökuoren kierto, kun teet avaruuskohtauksia.

## TEOSVALOTUS (VALMIS, kuitattu, luvut LS1:lle lähetetty 11.1x)

## MUUT
- Kevyen pallon 98d4de0f3 arkki puuttuu (PT pyysi luovutukseen): `linssiseppa2/kevyt-pallo-190`, PK yhdisti iss-kupoli-190:een.
- Levy: omat app-kopiot lokit/linssiseppa2-app-{lp3,teosvalo1,lontoo4}; poista käytön jälkeen (teosvalo1 = juna-189:n "ennen"-pohja).
- Ketjut: _tyo/linssiseppa2/{lontoo-praha,telakointi}/ketju-*.zsh + jatko-*.zsh (liput kaannos-nyt-* / simu-nyt-*). Tarkista `ps -ax | grep -E 'ketju-|jatko-'`.

## PÄIVITYS 11.2x (luovutuksen jälkeen, ennen nollausta)
- Lontoon haara kärki **7ab71527b**: + 6d17ba7c2 muodot-lontoo (Elizabeth Tower 12 × 12 m, korkeus 98, KS) ja index-v22 (Praha vesi-v2 ämpärissä)
  + korostuksen yölisävalo 0,3 → 0,2 (PT hyväksyi). Testit 1768 läpi, unity 0. HUOM: praha-ateena-kehitys-haara on nyt vanhan kärjen päällä →
  luo uudelleen: `git branch -f linssiseppa2/praha-ateena-kehitys linssiseppa2/lontoo-korkeus-v2 && cherry-pick 1a41ff9df` (worktreessä, push).
- lontoo4: käännös 8101c93dd (LUKKO VAPAA 11.15 ilmoitettu), simu ajossa → ilmoita Julkaisijalle SIMU VAPAA (ketju-lontoo4.log).
- PT 11.2x KUITTASI: Lontoon korostus 0,9 + yöajo; Prahan Vltava, liput, yölisävalo 0,2. EI vielä:
  - **Josefov**: uudessa 340°-ruudussa keskellä alhaalla repeytynyt laattamassa → kokeile korkeammalta 90–110 m tai eri suunnasta (näkölinja
    pintamallista: 330–345° paras; esim. 340°/90–110 tai 15°), uusi ruutu PT:lle; korjaustiedosto Documents/pallokierros-praha-korjaus.json.
  - **Kaarlensillan yövesi**: KS korjaa padon raon pystyhelmana (praha3) → kytke index-v23/praha3 kun ämpärissä, uusi yökuva.
  - **Trafalgar** (lontoo2 ja lontoo4): valkoinen suorakaide taivaalla keskellä ylhäällä (molemmat ruudut) + sumea laattamössö taustalla →
    selvitä suorakaide (UI-elementti? Googlen laatta? korostuksen maski?) ja odottaako latausportti taustaa (NakymanTarkkuus mittaa kuvan alaosaa).
  - **Greenwich**: +1,5 s harmaa taso yhä lontoo2:ssa (ennen porttia) → lontoo4 näyttää portin vaikutuksen; +4 s oikealla alhaalla violetit puut →
    tarkista sävy (ilmakehä? aerosoli? puiden varjostin?).
  - Telakointi 1858f8f53: arkki lähetetty PT:lle (proto-3d/lokit/todistus-telakointi10-*/arkki-telakointi10.png), PT kuittaa ennen yhdistämistä.

## PT 11.3x: SEURAAJAN 1.–2. TEHTÄVÄ
1. **Vakiokuvaskripti** Julkaisijan valoseppa-vahtiin (Lontoo + pallo + ISS, `aani mykistys` ensin, arkki + nopeus.txt); kirjaa rivi
   `vakio=<skriptin polku>` tiedostoon valoseppa-haarat.txt (Julkaisijan vahdin asetus; kysy polku Julkaisijalta).
2. **TAVOITELUUPPI-pilotti** (omistaja 11.09; ohje /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/tavoiteluuppi-20261014.md):
   kohde **Petřínin näkötorni** (Praha). Järjestys: tavoitepaketti (pohjakartta, leikkaus/korkeudet 63,5 m, 3–5 Commons-kuvaa, 4–6 kulmaa)
   → Codex-tilaus PT:n kautta → PT hyväksyy → Blender-kierrokset vertailuskriptillä → tuore Sonnet-arvioija → vahti peliin.
