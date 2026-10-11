# Linnanrakentajan luovutus 11.10.2026 päivä (13.xx)

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
1. Olavinlinna: Laitetestaajan 8. kierros (juna 182 vain jos läpi tänään) → mallilöydökset erinä.
2. Pariisin korttelit v3 (LS2 11.10., Matkakirja 40a584921 RAPORTTI.md): Palais Bourbon POIS (PT); Banque: pohjoiskärjen valkoinen kiila
   (leikkausalue ilman maata/kattoa) + julkisivu tummempi/vihertävämpi kuin naapurit; Branly: piha/tontti valkoinen (IGN-maskattu orto) →
   leikkausrengas koko sumennetulle tontille (puutarha rantaan) + geneerinen maa. Lähde `_valmiit/pariisi-korttelit-v2/` (lahde/pinnat.py,
   korttelit_malli.py, valinta.py).
3. ND julkisivun lämpö (PT myöhemmin).
