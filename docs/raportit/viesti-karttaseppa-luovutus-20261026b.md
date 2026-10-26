# Karttasepän luovutus 26.10.2026 klo 11.5x (Postivahti: kova raja 40 %)

Lue ensin CLAUDE.md, tuotannonohjauksen osio 0 (`git show origin/main:docs/tuotanto/tuotannonohjaus.md`) ja
`node tools/raamattu-luku.mjs 7.47` (Karttaseppä: luvut 2 ja 6). Aiempi luovutus: 3bc802e86 (`viesti-karttaseppa-luovutus-20261026.md`).
VIESTIT aina send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`), PT:lle ≤ 3 riviä. Käännökset ja simut
vain Julkaisijan jonon kautta (KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA).

## Tehtävä: ELÄVÄ KARTTA (omistajan kortti 25.10. klo 14.28 "Elävä kartta mieluummin")

Tavoite (PT/KK 26.10.): "sama vanha pergamenttikartta, tarkennettuna kylien, teiden ja ratojen tasolle". Patina pysyy ennallaan
(PT 11.3x: koko kartan hyväksytty ilme, esimerkin sävyä ei tavoitella; elävä kerros oikein, kun vastaa Z10:tä).

### Tehty tänään (proto-haara `karttaseppa/elava-kartta`, wt `/Users/Shared/Claude/wt/proto-karttaseppa-elava-kartta`,
peili `natiivi-backup peili/proto/karttaseppa/elava-kartta`; push: `git push natiivi-backup karttaseppa/elava-kartta:refs/heads/peili/proto/karttaseppa/elava-kartta`)
- 269ad4e9d kylien nimet nimikerrokseen (ElavaNimet.cs; Nimikerros elävät rivit, portaat 5–7, kursiivi + kerman halo, pelin kaupungit ohi).
- 7f46d971c KORJAUS: Application.temporaryCachePath palvelinsäikeessä → tyhjät palat; nyt Startin `valimuisti`-kenttä + poikkeus → varakuva.
- 6512d4dfd maanpeitteen sävyt vain maalle ja Z12:sta (mutapaikat merellä portaittain).
- 466ee5635 tarkat OSM-rajat palaan (admin 2 ja 3–4, ei maritime), MaaKartta-maakuntarajat häipyvät Z10,5:stä.
- 5d9fea0f0 ratapihat/sivuraiteet ohuina ilman poikkiviivoja (Z13+), ojat ohuina ja haaleina.
- 295600481 GSHHS-ranta ja -rajat (Vektorikerros) ja maan kehä (Maaraja) häipyvät elävillä tasoilla
  (yhteinen `Laattapalvelin.ElavaPeittaaKarkeat`, hystereesi); pohjan varjovaimennus PERUTTU (ei vaikutusta, läiskä oli maaston valoa).
- d3130bafc rinnevalo liukuu Z12 → Z13,5 kohti kameravaloa (`Karttavalo.LahiOsuus`, Aurinko.cs), kaukotasot ja Z11–Z12 ennallaan.
- Tyyliversio e5. Kartta-testit 534/534, `zsh tyokalut/tarkista.sh` 0 (aja zsh:lla; palauta sen jälkeen
  `git checkout -- Assets/Matkakirja/UI/Resources/MatkakirjaUI/Tyylikirja.uss Assets/Matkakirja/UI/Tyylikirja.cs tyylikirja/tyylikirja.json`).
- NUI teki tekijämaininnan: proto `natiivi-ui/tietoja-elava-kartta-211` 6f5f3a0bc.
- PT hyväksyi ensimmäisen parin ja vei KK:lle; KK palautti 3 kohtaa (11.3x): viivat veden yli, läiskä St Mary Hoon eteläpuolella,
  ratapihan kampa. Kampa korjattu ja todettu simussa 11.38. Viivat (295600481) ja läiskä (d3130bafc) odottavat simua.

### SEURAAVAKSI
1. JU:lla jonossa: 295600481 → `_tyo/karttaseppa/elava-kartta-nimet-app` (ENNEN) ja d3130bafc → `_tyo/karttaseppa/elava-kartta-valo-app`
   (JÄLKEEN). KÄÄNNETTY → kirjoita `<app>/kaannos.out` rivi "KÄÄNNETTY <sha> karttaseppa/elava-kartta (…)" (ajoskripti lukee sen).
2. SIMU NYT → kaksi ajoa peräkkäin (n. 3 + 3 min), sitten SIMU VAPAA:
   `SK=sk-elava-vertailu.txt ERA=elava-vertailu zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/elava-kartta-20261025/ajo-elava.zsh <app-kansio>`
   (V1 Thames lähin, V2–V4 Matterhorn Z11/Z12/Z13). Tulokset `proto-3d/lokit/todistus-elava-vertailu-*/kuvat/raaka/`.
3. Kaksi paria PT:lle: `python3 -I tyokalut/ennen-jalkeen.py <ennen> <jälkeen> <ulos> "<kohta>" "<sel>" "<sel>" [rajaus]`
   Thames (läiskä pois; rajaus 699,522,2052,1534) ja Alpit Z11–Z12 (kohokuvio EI saa latistua). Tarkista 1:1 itse.
4. Uusi ESIMERKKI | PELI -pari samaan polkuun `_tyo/karttaseppa/elava-kartta-20261025/pari-thames-peli.png`:
   `python3 -I tyokalut/pari.py <E3/V1 raaka> pari-thames-peli.png "pelin elävä kartta iPadilla (simulaattori), rajattu samaan 8 × 6 km alaan" 699,522,2052,1534`
   (rajaus sovitettu 7 paikannimestä, tyokalut/sovita.py; tarkista nimien paikat, jos kamera muuttuu). Tarkista 1:1 → rivi PT:lle.
5. PT:n kuittauksen jälkeen JU antaa osoitinrivin NS:lle junaan 211 (karttaseppa/elava-kartta uusin + NUI 6f5f3a0bc).
6. Myöhemmin: esilataus (saapumisalue z11–14), Euroopan PMTiles omaan ämpäriin, suorituskyky.

### Avoimet
- Jos läiskä näkyy vielä d3130bafc:llä: korkeuskerroin (KorkeusKerroin, 2) ei ole muuttunut; PT antoi maaston ja valon tämän
  osalta Karttasepälle (11.5x). Älä muuta kerrointa ajossa ilman Lisays-yhtenäisyyttä (merkit nousisivat ilmaan).
- Paikallinen `.claude/settings.local.json` roolikansiossa muutettu (ei omani, ei commitoida).
