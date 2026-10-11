# Linnanrakentajan luovutus 11.10.2026 iltapäivä (13.xx, nollaus: konteksti 76 % > 50 %)

Edellinen: `viesti-linnanrakentaja-luovutus-20261011-yo.md`. Haara `linnanrakentaja-tyo-20260929`. Vientihaara worktreessä
`/Users/Shared/Claude/wt/linnanrakentaja-linna-v45k` (pohja v45j-ketju, EI main). Python-kuvatyökalut `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`.

## VIESTIRAJA (tärkein)
SendMessage-raja (10 / käyttäjän viesti) täyttyi ~11.4x. LÄHETTÄMÄTTÄ, lähetä heti kun voi:
- Siirtosepälle: v47k (1499 PALA 59611299d8267a23 / blender 9948c51431111f38; nyky 7f1ea65ff266d212), v47l (1499 f0a825f992411e81 / blender
  29f51f1f92b4fb88; nyky: ks. scratchpad vie_v47l.log), v47m, v47n tunnukset (vie_v47m.log, vie_v47n.log). HUOM v47n: pöydän kansi on
  keittiön törmäyksessä → piilo:poydan-alla voi lakata toimimasta (Siirtosepän päätös). Kohta 5 (linnantuvan musta) ei ole mallivika.
  Kierreportaan PathPartial (piste 16) korjattu v47l:ssä: ramppi kaistoina (joka toinen kolmio oli 53° → NavMesh hajosi).
- PT:lle: v47j–v47n rivit (Laitetestaajan 7. kierroksen mallipuoli: keittiön kalusteet v47n; ampumakäytävän atlas kunnossa, aloituskohta oli väärä
  → Siirtoseppä 38ebd1585).
Scratchpad: `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linnanrakentaja/7cb062d9-f7e0-4077-b296-4c0534a57723/scratchpad/`.

## TAUSTALLA (setsid)
`ketju_v47m.zsh` (odottaa v47l → renki-1 merkit.json → vie_v47m.zsh) ja `ketju_v47n.zsh` (odottaa v47m → keittio-G102-tormays + kolmiot →
vie_v47n.zsh). Lokit `vie_v47{l,m,n}.log`. v47n:n MUUTOKSET.md-rivi kirjoittuu vanhalla tekstillä "Pöytien kannet pois" → korjaa
"kannet törmäyksessä (yla 0,95)".

## TEHTY TÄNÄÄN (kaikki MUUTOKSET.md:ssä v47g–v47n)
- v47g: `kavely.py` Osa.laatikko tahkot ULOSPÄIN (juurisyy kaikkiin täysmustiin laatikoihin), valoatlas --pohja 0,3, tyrmän holvi 2,0 + kamana,
  sillan rako (silta_kannen_reunalla), ulkoalueen tiedostot-kenttä + sisätilaleikkaukset (`kuori_kavely.py`). Siirtoseppä korjasi
  leikkauslaatikoiden kiertovirheen natiivissa (KavelyLeikkaus.Sisalla, DioraamaKuori.shader).
- v47h: pikkupihan kärki T102-portaiden taakse, kierreportaiden liitoskaistat, kappeli-tasanne kc:hen, ovi:paaovi 120° (kierto_y 1,0472).
- v47i (PT B): vanha keittiö (tila 'keittio') pois JS:stä (v45k 381493f86) ja paketista (ennen-v47i/), keittio-g102 linssin Keittiö;
  g102:n ulkoseinät kuoren varjostuksesta vapaasta leivonnasta (`leivo_tila.py --ylos`, scratchpad g102_yhdista.py). node --test 5414/0.
- v47j: kaariportaiden yläkäytävä portaan päädyn viereen (A_YLA).
- v47k: muuriporras-2 → 221° + tasanne, pääoven portaan suu A_SUU (ampuma-aukko 3 → 150°), palatsin porras kävelyyn askelmina
  (`portaat(kav_askelmat=True)`), palatsin mutkan sisäkulmat, pikkupiha z ≥ 5,5, ulkoalueen kuori pois kiveyksen yltä.
- v47l: kierreramppi säteittäisinä kaistoina, kaikki varret/tasanteet kävelyyn JAT 0,12 m pidempinä (nivelten kolmioraot).
- v47m: partio:renki-1 LP(5,0; −1,5), 6,1 m aloituksesta.
- v47n: keittiön kalusteet törmäykseen tilan glb:stä (`keittio_kalusteet_tormaykseen`, yla 0,95).

## TYÖKALUT (scratchpad, kopioi talteen jos tarvitaan pysyvästi)
- `navtesti.py` + `jumit.py`: NavMeshin kaltainen kulkutesti (natiivi SeikkailuVartijat.RakennaNavMesh: vain kävelypinnat, r 0,3, askel 0,35,
  40°). Toisti botin jumit. v47l: 90/93 reittiväliä (puuttuvat tikkaat/kiipeily). AJA AINA kävelyosan muutoksen jälkeen.
- `raot.py` (kävelypintojen pysty-/vaakaraot), `ylakuva.py` (yläkuva kävely + törmäysseinät), `atlas_musta.py`, `normaalit.py`, `vertaa_osat.py`.
- Kävelyosan muutos: kavely.py → kav-X (scratchpad) → vain muuttuneet osat leivontakopioon (`lahde/tyokalut-lr/laatikot_v47g.zsh` malli,
  --pohja 0,3; kappeli-kavely + tornin_ulos_pois) → v44/kavely (vanhat ennen-v47*/) → osat.json vain osan kentät → `nyky_kavely.py` →
  vie_v47*.zsh (vie-blender.sh + gh workflow vie-dioraama.yml --ref linnanrakentaja-linna-v45k). merkit.json: kopioi VAIN omat muuttuneet
  merkit (paketissa muiden jälkimuokkauksia: ote:kellotorni-*, tuuli:puuska-2, lakaisu).

## JONO
0. **Siirtoseppä 11.10. 13.xx (seuraava paketti v47o):** komero:kellotorni 0,85 × 0,56 m, ja esine-arkku-komero (61 × 41 × 48 cm) täyttää sen;
   kiipeilyn loppu osuu arkun päälle (lattia 15,21, silmä ~16,8, kaaren laki 16,75) → komero ja pako alkavat kamera seinässä. Syvennä
   komero ≥ 1,0 m ja korota (kaari), tai siirrä arkku sisemmäs. kavely.py muurikaytava: komero K(…)/'komero'-leikkaus (−50,761; 15,775; −5,445),
   merkit koysi:krampi-komero, esine arkku. Aja navtesti/jumit 91→94 jälkeen.
1. Olavinlinna: Laitetestaajan 8. kierros (juna 182 vain jos läpi tänään) → mallilöydökset erinä.
2. Pariisin korttelit v3 (LS2 11.10., Matkakirja 40a584921 RAPORTTI.md): Palais Bourbon POIS (PT); Banque: pohjoiskärjen valkoinen kiila
   (leikkausalue ilman maata/kattoa) + julkisivu tummempi/vihertävämpi kuin naapurit; Branly: piha/tontti valkoinen (IGN-maskattu orto) →
   leikkausrengas koko sumennetulle tontille (puutarha rantaan) + geneerinen maa. Lähde `_valmiit/pariisi-korttelit-v2/` (lahde/pinnat.py,
   korttelit_malli.py, valinta.py).
3. ND julkisivun lämpö (PT myöhemmin).

## PARIISI v3: ALUSTAVAT HAVAINNOT (13.xx, ei aloitettu; nollaus 76 % > 50 %)
- Banque: leikkauksessa (80 pistettä) ei teräviä kärkiä ja maa (korttelit_malli.py delaunay leikkausmonikulmiosta) kattaa sen → valkoinen kiila
  pohjoiskärjessä on todennäköisesti Googlen sumennus, joka ulottuu renkaan yli kadulle (LS2:n k6 ennen: sumennuksen kärki pidempi).
  Ehdotus: valinta.py:n puskuri (rivi 35, 2,5 m) aluekohtaiseksi, Banque ~6 m → korttelit_malli.py uudelleen. Julkisivu: vertaa Googlen
  naapureihin (vaaleampi, vähemmän vihreä; julkisivu-c / kivi_pariisi).
- Branly: piha/tontti valkoinen = IGN:n maskaama orto maatekstuurissa → maskatulle maalle geneerinen sora/nurmi; rengas koko sumennetulle
  tontille (puutarha rantaan): tontin raja OSM:stä (Overpass, robots/API-käyttö ok) tai LS2:n kuvista mitattuna.
- Palais Bourbon pois paketista (PT). LS2 tutkii kaukolaattojen tarkentumisen (kohta 4).
- Työkalut kopioitu pysyvästi: `_valmiit/olavinlinna-kavely-v1/lahde/tyokalut-lr/{navtesti,jumit,raot,ylakuva,glbtri,atlas_musta}.py`.
- Viikkokiintiö 97 % (11.10. 13.xx); 99 %:ssa rivi omistajalle (muisti viikkoraja-97-siirtoprompti).

## VIEDYT TUNNUKSET (13.xx; haara linnanrakentaja-linna-v45k)
| versio | 1499 PALA (blender) | NYKY PALA (blender) |
|---|---|---|
| v47g | fef286897291691f (fb951fb5db60489a) | 0a36f8bea046b953 (366a4285b9a0b568) |
| v47h | 6a8c828e6729790c (24ccea32c5a8755c) | 65721320699ead33 (d9f185eb1bb2092c) |
| v47i | 5bbcced4ebdd0be5 (689e0399d514c667) | 266d1f96c8b9c244 (6a16ea7d4c58b7bb) |
| v47j | bdbcee75c1fc1c91 (81839e0912df6fc5) | 8f39c9ce64e6cb09 (618a5dc9f6416a94) |
| v47k | 59611299d8267a23 (9948c51431111f38) | 7f1ea65ff266d212 |
| v47l | f0a825f992411e81 (29f51f1f92b4fb88) | 06c808b868d0edd3 (65f31a108abceba4) |
| v47m | cbbde49c26671fb6 (fed17eff62a4b16b) | CI käynnissä (blender ad516b4f5c56ac62, 617e3d998) → vie_v47m.log |
| v47n | jonossa (ketju_v47n.zsh) → vie_v47n.log | jonossa |
Siirtosepälle lähetetty v47g–j; v47k–n LÄHETTÄMÄTTÄ (viestiraja).

## JATKO 13.2x–13.5x (sama sessio nollauksen jälkeen)
- Siirtosepälle lähetetty v47k–n ja v47o tunnukset (viestiraja purettu). v47n: MUUTOKSET.md-rivi korjattu (kannet törmäyksessä, yla 0,95).
- **v47o VIETY**: 1499 24ce89cf1b3322fe (f5964b6c852eba5c), NYKY dffee326e689b421 (d7bddb1ac60dad69). Juurisyy: ulkokuori on komeron
  kohdalla RK+0,65…0,89 (KT/RK-ympyrä ei vastaa kuorta) → komeron suu kuoren pintaan, perä RK−0,85, korkeus 2,25, arkku perälle, näkyvät
  seinät; otteet 2–24 kuoren pintaan (taulukot OTE_R/OTE_N kavely.py:ssä, mitattu ulkokuori_normaali.glb:stä). Työkalut
  `lahde/tyokalut-lr/komero_v47o.zsh`; scratchpad d510e6ef…/ (komero_tarkista.py, ote_sade.py, suu_mitta.py, kytke_v47o.py).
  NavMesh 89→94 ennallaan.
- **Pariisi v3 + v3b** `_valmiit/pariisi-korttelit-v3/` (LAHTEET.md): Bourbon pois, Banque puskuri 6 m + vaaleammat lämpimät julkisivut
  (LS2 716dd1464: Banque KUNNOSSA), Branly v3b rengas 35 m kaduille/puistoon raoilla naapurirakennusten ympäri. LS2 paketoi (v6k18 → uusi).
- Laitetestaajan 8. kierrosta ei vielä ole (7. uusin) → mallikohdat kun raportti tulee.
- **v47p VIETY** (hionta, `kuori_sisalla.py` scratchpadissa: merkit/kävelypinnat kuoren sisällä ilman leikkausta): ampuma-aukkokomeroille
  leikkaukset (kaytava()), reitti:pelaaja-94 komeron suulle. 1499 aeda3a577e00ac6a (ca653507885419a5), NYKY e9efc06ec00f48c3 (cefa8252a93364e2).
  Avoin: ulkoalueen kiila x −10,8…−7,9, z 2,8…6 (silmä kuoren sisällä) → kysytty Siirtosepältä, onko botti käynyt.
- PT 14.0x: botin mallikohdat Siirtosepältä heti ajon jälkeen ja ne ensin. Uudet jonossa (linna edellä): ISS-raketti LS2:lle (Opus-agentti
  tekee `_valmiit/iss-raketti-v1/`, tarkista ennen lähetystä), soutajan kasvot Natiivisepälle (ARKit 52, ele_puhe_istuen, ele_osoitus_portti,
  Eyes/Eyebrows-painot; PT antaa järjestyksen).

## JATKO 14.4x–15.3x: Siirtosepän botti 14.02 (8/17) → v47q, v47r
- Juurisyy (PathComplete mutta kapseli jumissa): NavMesh rakennetaan vain kävelypinnoista, kavennus lattian reunasta → lattia seinän alla
  vie kapselin seinään. **kavely.py `kavely_seinista()`**: kaikkien osien törmäyslaatikoiden (Osa.laatikko, palatsin lt()) ja pystysuorien
  törmäystahkojen (Osa.quad) pohjapiirrot leikataan kävelystä kapselin korkeudella (0,35…1,75). Konfliktit (scratchpad `seinakonfliktit.py`)
  kirkkotorni/kappeli/palatsi 7 841 → 31. Lisäksi kierreportaan ovet 45° (1,16 m), tott-kammion kävely seinän sisäpintaan + ovipaikat,
  risteys 19/42/72 (muuriporras-2 avoin 0,6, paaovi-porras-b avoin 0,6 k=1, sulkuseinä, avoimen sivun jäännepylväät pois).
  Reitti 2→94 ennallaan 90/93. Työkalut scratchpad d510e6ef…: kapselireitti.py, seinakonfliktit.py, vali.py, fp_kuva.py, ylakuva.
  v47q vienti käynnissä (vie_v47q.log). Ehdotettu Siirtosepälle natiiviin: törmäyksen pystykolmiot NavMeshiin Not Walkable -lähteinä.
- **v47r (valmis vietäväksi)**: kuori_kavely.py: ulkoalueen kävely, jossa silmä on kuoren sisällä, pois (277 kolm.), kiilalle (3,6 m²)
  rajaseinä törmäykseen. Aja kuori_kavely.py (huippu + tilat/laituri.glb) v44/kavely-kopiolle → ulkoalue-*.glb + osat.json ulkoalue.
- Auki Siirtosepältä: muuriportaan juuren silmä 1,22 (ei matalaa pintaa mallissa), ampumakäytävän 77 musta ruutu (kuva pyydetty), kapselin mitat.
- Raketti v1.1 + erilliset + karttaversio LS2:lla (Opus-agentti teki, tarkistettu). Soutajan kasvot seuraavana linnan jälkeen (PT:n järjestys).
