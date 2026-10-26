# C Resepti: 3D-maamerkki

*(Lavastaja 23.10.2026, studiojako (Raamattu 4.21). Lyhyt tuotetyypin kooste. Tekotavat: `docs/tuotanto/tekotavat/3d-ja-kuvat.md`,
`kamera-ja-video.md`, `testaus.md`; vaiheet, portit ja luvat: `docs/tuotanto/tuotannonohjaus.md`. Voimassa olevat täydet pohjat
siirtymäajan: `docs/moduulit/tuotantopohjat/3d-maamerkki.md` ja Codexin malleille `codex-3d-toimitus.md` (SITOVA, omistaja
21.10.2026 klo 00.10). Raamattu: TAVOITELUUPPI (7.20), 3D-MALLIT CODEXILLE, SUOJATUT TEOKSET, VERTAILU OIKEAAN MAAILMAAN.)*

**Tavoitteen muoto:** Codexin havainnekuvat ja kohdemaskit pallokierroksen kulmista ja 2–3 lähikulmasta omien pohjakuvien päälle
(grafiikka); uusista kuvakulmista viitevideo tai kuvakäsikirjoitus (kamera). Tavoitekuva ja pelikuva rinnakkain ennen junaa.

## Tuote

Oma malli rakennuksesta tai rakennelmasta Googlen fotorealististen laattojen keskellä (laatat leikataan alta) tai omana
kaupunkitilanaan (esim. Peking): malli, LOD0–2, leikkaus, materiaalit ja valo. Samaan sarjaan kuuluvat kartan pienoismallit
(karttaesineet, pohjan luku 2.9). Ei sisällä pallokierroksen tekstejä, museon sisätiloja (`museo.md`) eikä linssejä.

## Rajaus

- Googlen laatta on oletus; oma malli vain, kun laatta on sulanut tai väärä ja siitä on päätös (esim. Eiffel-torni jää Googlelle).
- Arkkitehtuurin suoja maan lain mukaan (arkkitehdin kuolemasta 70 v); suojattu osa jää Googlen aukkoon, poikkeus vain omistajalta
  (Louvren pyramidi) ja App Store -tarkistuslistalle. Suojatut veistokset ja valaistukset pois.
- Euroopassa; kartta nykyajassa (nykyiset rakenteet saa tehdä).
- Ennen työtä `node tools/loki-hae.mjs <kohde>`: onko kohde peruttu tai tauolla (Peking, Olavinlinna tauolla 10.10.).

## Tuotokset ja polut

| Tuotos | Tekijä | Polku |
|---|---|---|
| Sijainti ja pohja-aineisto | Karttaseppä | `kohde.json` (lat/lon, maan korkeus), ortokuva, LiDAR, OSM; `_tyo/karttaseppa/vertailu/<kohde>/` |
| Suunnitelma | Lavastaja | `_valmiit/<kohde>-v1/SUUNNITELMA.md` (mitä tehdään, mitä jää Googlelle, kolmiobudjetit) |
| Lähdeskripti ja malli | Lavastaja (tai Codex) | `lahde/<kohde>.py` → LOD0–2, leikkaus `leikkaus_latlon.json`, AO |
| Tavoitekuvat | Codex | `tavoite/codex/` K1–K7 (+ L1–L3) ja maskit |
| Luuppikierrokset | Lavastaja + Sonnet-arvioija | `_tyo/<rooli>/<kohde>/kierrokset/kN/`, `VERTAILU.md`, `luuppi-vienti/` |
| Pelikuvapari ja valo | Valoseppä | syvyysleivottu glb, mitattu albedo |
| Juna | Lavastaja, Julkaisija | `INTEGRAATIO-kN.md`, paketti `omat-mallit-vienti-<pvm>-vNkM`; hyväksytyt `_valmiit/hyvaksytyt-mallit/` |

## Reseptikohtaiset säännöt

- **Massa LiDARista, rytmi kuvista;** yksi lähdeskripti, ei käsin muokattua .blendiä; hyväksytty versio talteen (`glb-kN/`, `lahde-kN/`).
- **Budjetit:** LOD0 ≤ 250 k, LOD1 ≤ 100 k, LOD2 ≤ 20 k kolmiota, yksi mesh per LOD; Natiiviseppä arvioi GPU:n ennen junaa.
- **Vastaanotto:** Codexin rakennusmaskin IoU ≥ 95 % omia maskeja vastaan (uusi osa ≥ 90 %, vaikeat kulmat ≥ 80 %).
- **Tavoiteluuppi:** rivi `VERTAILU.md`:hen joka kierros, tuore Sonnet-arvioija, enintään 2 luuppia kerrallaan, pysähdys kahden
  parantumattoman kierroksen tai 10 kierroksen jälkeen → paras versio PT:lle.
- **Googlen laattoihin:** leikkaus yhtenä renkaana + 1 m reunus, aukot sillalla, oma kiveys päättyy ortokuvasta mitattuun reunaan;
  malli valaisemattomana kuten laatat; vertailuportti 0 ennen Valosepälle luovutusta.
- **Valaistuksen delta samassa junassa** kuin malli (esim. kohteen oma atsimuutti).
- **Karttaesineet:** karttapaletin seepiaramppi varjostimessa, ääriviiva 1,2 pt, yksi terävä maavarjo, ei jalustoja; ei omia poikkeuksia.
- **Ei väliaikaisia poikkeamia:** poikkeava osa pois, julkaisu odottaa riippuvuutta.

## Valmis kun

- [ ] Päätös tehdä oma malli on lokissa; oikeudet tarkistettu, suoja-ajan loppu `LAHTEET.md`:ssä.
- [ ] `LAHTEET.md`: mitta-aineistot, tekstuurit ja vertailukuvat lisensseineen; malli oma työ.
- [ ] Massan IoU ja korkeusero LiDAR-maskeja vastaan kirjattu; LOD0–2 budjeteissa.
- [ ] Tavoiteluuppi pysähtyi rajoissa tai pysähdyssäännöllä; kaikki kierrokset `VERTAILU.md`:ssä.
- [ ] Leikkaus ja aukot tarkistettu kuvasta; sauma siisti pelikuvassa; vertailuportti 0.
- [ ] Valosepän pelikuvapari: albedo ja valo mitattu, läpinäkyvät pinnat näkyvät, md5 täsmää.
- [ ] Hyväksytyt kuvat `_valmiit/hyvaksytyt-mallit/`; `INTEGRAATIO-kN.md`, paketti portti 0, edellinen versio talteen.
- [ ] Tavoitekuva ja pelikuva rinnakkain omistajalle KK:n kautta ennen junaa.
- [ ] Retrospektiivi ja opit pohjan lukuun 5 (siirtymäajan), sitten tähän reseptiin tai tekotapaan.
