# Äänittäjän luovutus 17.10.2026 klo ~01.35 (Postivahti: kova raja 35 %)

Lue ensin: viesti-aanittaja-luovutus-20261017.md (00.30), -20261016.md, -20261015.md, -20261014.md (säännöt, työkalut). Osoitteet: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044, Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914. Viestit PT:lle ≤ 3 riviä, send_message session id:llä.

## TEHTY 17.10. 00.30–01.35
- **Tuotantopohja "kertojan teksti ja ääni"**: docs/moduulit/tuotantopohjat/kertojan-teksti-ja-aani.md, PT hyväksyi, mergetty (#4747). Alikansio ei kuulu dokumenttikartan testiin. Muokkaa jatkossa docs-versiota; opit-osioon retrospektiivi jokaisen työn lopussa.
- **Laskelma luennat etukäteen**: docs/raportit/luennat-etukateen-laskelma-20261017.md (#4751 mergetty). Jäljellä 7,64 milj. mrk puhuttuna; työ `proto-3d/_tyo/luennat-laskelma-20261017/` (poimi.mjs → virta.mjs → laske.py → yhteenveto.py; era.py generoi erän; paketoi.py kokoaa paketin).
- **OMISTAJAN PÄÄTÖS klo 00.57 (KK)**: "Kyllä, kaikki Euroopan" = enintään 1 505 luentaa / 566 895 mrk, pieninä erinä museosta alkaen, hinta mitataan museoerästä. "Muu maailma: Myöhemmin" (ei nyt, palataan kun Eurooppa valmis ja krediitit uusiutuvat 14.11.). i-kortin faktat (134 kpl, 13 415 mrk) vain jos Natiivi-UI vahvistaa, että kortti lukee ne. Isoisän saapumistekstit (215 kpl, persoona merkinnat) kuuluvat muuhun maailmaan, ei nyt.
- **Erät generoitu ja viety ämpäriin** (William `oae6GCCzwoEbfc5FHdEu`, eleven_v4_turbo, nopeus 1,15, ääneen puhuttu muoto = luvut sanoiksi, avain alkuperäisestä tekstistä; portti 0 hylkäystä):
  1. museo NL+FR: 453 luentaa, 61 902 mrk, 13 048 kr (0,211) → manifesti `aanet/luennat/v2/manifest.json`
  2. EU nostot + kohtaamiset: 193 luentaa, 78 717 mrk, 15 329 kr (0,195) → v3
  3. EU nähtävyydet + kohdekartat: 352 luentaa, 131 962 mrk, 34 215 kr (0,259) → v4 (vienti ajettu taustalla; tarkista loki `julkaisija-tyokalut/vie-paketti.log`, että "viety 353" on rivillä, muuten aja `vie-paketti.sh` uudelleen: ei ylikirjoita, jatkaa)
  Yhteensä 998 luentaa, 272 581 mrk, 62 592 kr (keskim. 0,23/mrk). Tilillä 17.10. 01.3x character_count ~122 900 / 887 977.
  Manifestit ovat **kumulatiivisia** (v1:n 6 903 riviä täysillä URLeilla + uudet): käytössä vain **uusin (v4)**; vaihto pelin asetukseen `osoitteet.luennat-manifesti` = Siirtoseppä (juna 198, PT 01.0x). Mp3-tiedostot kaikki samassa `aanet/luennat/v1/k/<avain>.mp3`. Raaka-PCM T7:llä `/Volumes/T7 4TB/Matkakirja-aanimasterit/luennat-20261017/` (ei poisteta).

## KESKEN / SEURAAVAKSI
1. **Natiivin oikea luentavienti** (`ui nostoluennat kaikki europe`): Julkaisija ajaa iPad13-simussa (39644E75) NS:n käännöksellä 65f8af40c, lähettää jsonl-polun (`_tyo/luennat-v1/nostoluennat-<pvm>-<hhmm>.jsonl`). Sillä korvataan replika: oppaat, lehdet (kaupunki + maa), maan intro eivät täsmää replikan paloihin (oppaat 4/517, maalehdet 253/1146) → ne generoidaan vasta tästä viennistä, uniikit avaimet joita ei ole manifestissa v4 eikä workerin säilössä. Käytä `era.py`:n mallia (lisää VALINTA ja RAJA; lue jsonl replikan sijaan; avain `esi.avain(teksti, malli, ääni, nopeus, loppuTagi)`). Jäljellä arviolta: oppaat EU 44 009, lehdet EU 132 316, maan intro EU 32 034 mrk (~50 k kr) + tiedeliite 72 342 mrk (replika kelpaa, globaali) ≈ 18 k kr; kaikki ≤ omistajan 566 895 mrk (tähän asti 272 581; i-kortin faktat 13 415 ehdollisia).
2. Tarkista nähtävyyserän täsmäävyys, kun natiivin vienti tulee: replikan nähtävyysavaimista 1 054/1 342 täsmäsi 9.10. viennin avaimiin (loput uusia kaupunkeja); jos vienti paljastaa eroja, generoi puuttuvat.
3. Louvren ympyrät (FR 152) ovat erässä 1 (omistaja 00.57 kattaa; KK:n aiempi "ei generoida" kumoutui).
4. Kuuntelematta: kaikki tämän session otot (kuuntelu ei ole portti). Vanhat avoimet: Kipin v2 ym. 12.10. äänisivun valinnat, Soundly-lataus GUI:lla, muiden kaupunkien Pulu-kutsut PT:n käskystä, äänipohjan tasot (odottavat SS:n simuajoa), Ranskan 51 kertomuksen nimien ääntämys.
5. **Lupa**: jokainen uusi erä enintään yllä olevan 566 895 mrk:n kehyksen sisällä; ylitys tai muu maailma vaatii KK:n suoran "OMISTAJAN PÄÄTÖS klo …" -rivin. Hinta ~0,23 kr/mrk (mitattu; tarjous 0,066 ei päde): `curl /v1/user/subscription` ennen ja jälkeen.

## OPITUT (uusia)
- Valmisluennat-avain: `sha256("v1|eleven_v4_turbo|oae6…|1.15|loppuTagi|teksti NFC")[:32]` (varmistettu 6 903/6 903). Ääneen puhuttu muoto saa poiketa avaimen tekstistä (`esi.generoi(puhe, loppuTagi, otsake, raaka)`; avain alkuperäisestä).
- Muunnin `proto-3d/_tyo/luennat-laskelma-20261017/puhe_luennat.py` (n. → noin, (s. → syntynyt, vuosiluvut ja -luvut yhteen, pvm, desimaalit); tarkista yli miljoonat karkeasti.
- ElevenLabs-kulutus: `/v1/usage/character-stats?breakdown_type=model&aggregation_interval=hour` (UTC) kalibroi hinnan; `/v1/user/subscription` character_count = krediitit. Tarjoushinta 0,066 (Pelikoodari 8.10.) ei ole voimassa.
- Manifestin uusi versio = uusi polku (v2…); u-kentässä täysi URL toimii (Valmisluennat.cs hyväksyy suhteellisen tai täyden). Peli lukee yhden manifestin.
- Sisältöpaketti ajantasalta: `node tools/vienti/vie-sisalto.mjs --ulos <kansio>` (1 min); museon data proto-repon `Linssit/Resources/Museo/<maa>/` + `docs/kohtaukset/museoteokset/kohdat-ranska.json`.
- Pitkä taustaodotus: Monitor + until-loop; vie-paketti.sh isoille paketeille voi ylittää 10 min → `run_in_background`.
