# Pelikoodarin luovutus 11.10.2026 iltapäivä (nollaus 64 %, PT)

Edellinen: viesti-pelikoodari-luovutus-20261011-aamu2.md. Viestit SendMessage nimellä: PT "PÄÄTOIMITTAJA (Opus, max)" (tällä
koneella session local_cf5b4eca…), "Julkaisija (Opus, high)", "Natiiviseppä (Opus, high)", "Natiivi-UI (Opus, high)",
"Linssiseppä (Opus, high)" (LS1), "Siirtoseppä (Opus, high)", "Karttaseppä (Opus, high)", "Sisältökirjuri (Sonnet 5.5, high)".

## Tehty tänään (09.4x–12.4x)
- Pääkaupungit e03 + e03b (Ramallah) #4391 MERGED (8 kaupunkia, kartat Karttasepältä; Ramallahin kuvaus neutraali, valokuvan
  stereorajaus myöhemmin datakenttänä kun kuluttaja tulee).
- Äänisivun Tehosteet-välilehti korjattu (siivouksen puuttuva </div>), julkaistu.
- Pulu: alun käsikirjoitus docs/raportit/pulu-alku-kasikirjoitus-20261011.md; äänet viety: aanet/pulu/opastus-v1/ (opastus 1–3,
  paljastus-2 Tukholma/Moskova/Istanbul, avaus-v2 1–4, opastus.json) — opastus ja kaupunkipaljastukset jäivät uudessa rakenteessa
  käyttämättä; aloituskaupungin uusi rakenne: aanet/kaupunki-intro-v1/william-{ateena,pariisi,tukholma}.mp3 (LS1) ja
  aanet/pulu/tuuraus-v2/livia-tuuraus-1…4.mp3 (NUI). Skripti proto-3d/tyokalut/pelikoodari-ajot/aloituskaupunki-aanet.py.
- Web: #4396 (Pulun alku: aloituskaupungissa ei kommenttia, Uusi matka nollaa liput; ohjekuplat ennallaan) ja #4399 (pulla
  turvaverkkona sähkekaupungissa, lukkoviesti "…kaupunkilehdestä") Julkaisijalla. Natiivi samat: pelikoodari/pulla-turvaverkko-182
  61c412e0d KUITATTU ja runkoon.
- Olavinlinnan faktat: proto pelikoodari/olavinlinna-faktat-182 10dc55c2b (Kielitaulu + tietokerros-v2), data viety
  seikkailu/olavinlinna/tietokerros-v2/. ODOTTAA Siirtosepän yhdistystä linnahaaraan.
- Musiikit viety: audio/musa-kaupunki-{moskova,ateena,tukholma}-nopea-lyria-v2.mp3 (LS1:n KaupunkiIntro; omistaja hyväksyi Ateenan
  ja Tukholman nopeat sekä Pariisin nykyisen).
- Äänisivu: Odottaa valintaasi -kokoelmasta arkistoitu 24 valitsematonta (NAS pelikoodari/aanisivu-odottaa-arkisto-20261011,
  LUETTELO.tsv); 5 valittua jäi. ISS: uudet ehdokkaat arkistoitu (NAS pelikoodari/iss-uudet-arkisto-20261011), tilalle osio
  "Avaruusasema: NASAn radio, myös venäjää (valittu 11.10.)".
- ISS-radio: proto pelikoodari/iss-radio-182 235b230ba KUITATTU, SHA Natiivisepälle runkoon; tiedostot
  aanet/iss-v1/radio/ VIETY (200).
  OPPI: älä aja aanisivu-julkaise.zsh:ta _valmiit-paketin kansiosta (wrangler kirjoittaa .wrangler/ cwd:hen).
- Kuratoitu Pulu: #4401 (ajankohtaisaiheet ohjataan pelin paikkoihin) Julkaisijalla; merge julkaisee workerin. AVOIN: julkaisun
  jälkeen curl-koe tuotannosta: scratchpadin pollo-koe.sh-malli (natiivi-otsakkeet x-matkakirja-natiivi + UA fi.matkakirja.peli,
  x-matkakirja-aikuinen 0) kysymys "Kuka voitti jalkapallon MM-kisat 2022 ja mitä Messi sanoi?" → pitää ohjata pelin paikkoihin.

## KESKEN / JONO
1. JAZZ-PIANO JA RHODES VALMIS: äänisivulla (julkaisu a437a740) osio "Jazz-piano ja Rhodes: taidemuseo ja aloituskaupungit
   (11.10.)" (8, _tyo/kaupunkimusiikki-kokeet-20261010/generoi-piano.mjs + aja-jazz.zsh, aanisivulle-jazz.py). Omistajan valinta → vienti
   (peli/musa-kaupunki-koe-<id>-lyria-v2.mp3, −11,9 LUFS) ja kytkentä (taidemuseo: Linssiseppä 2; kaupungit: LS1/kaupunkimusiikki).
2. KIPIN 20 KAPPALEEN SOITTOLISTA VALMIS ja äänisivulla: osio "Kipin soittolista: 20 kappaletta (11.10.)" (_tyo/kippi-musiikki-20261010:
   generoi-soittolista.mjs, kehotteet-soittolista.json, peli/musa-kippi-sl-{viulu,harppu}-NN-lyria-v2.mp3, ääniportti 0 hylkäystä;
   sl-viulu-07:n 1. kehote estyi ilman ääntä). Seuraavaksi omistajan kuuntelun jälkeen: vientipaketti (audio/… uusiin polkuihin,
   LAHTEET Lyria), kytkentä kippiin (kysy PT: sinä vai LS1). Älä aja aanisivu-julkaise.zsh:ta _valmiit-kansiosta.
3. SAVUKE-POLLO (PT: myöhemmin, ei estä betaa): haara pelikoodari-savuke-pollo 1. korjaus pushattu (ikä kysytty, koenappi, Liiku-asu);
   ajo 38128195201 yhä punainen 13 vanhentuneesta asettelu-/vihjekokeesta (paneelin keskitys, vihjekupla 15 s, kohteiden korostus,
   kapea alarivi, arkki leveäksi, bittikartan tarkkuus, yleiskysymyksen linkki). Erottele regressiot vanhoista oletuksista, PR Julkaisijalle.
4. Karttaseppä (ei kiirettä): pallon lähtövalinnassa Lontoon pelinappula osuu Pariisin kohdenimen yläreunaan, kun Pariisi on
   aloituskohde (js/pallolauta/nimet.js ladonta; kuva /Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa/aloituskaupungit-20261011/).
5. Web-avaus v2 ja web-opastus vain PT:n käskystä (natiivi etusijalla).
6. Äänisivun valinnat: omistajan rastit tulevat D1:een (node tools/aanisivu/valinnat.mjs, PT ajaa).

## Opit
- Pulun ääniportti: puhepaketeille aaniportti.py ILMAN --puhe (se on tehosteiden sanaportti ja hylkää puheen); musiikille --puhe.
- Puheentunnistusepäilyistä ei kysytä omistajalta; tarkista vain language_code fi (muisti puheentunnistus-ei-kysyta-omistajalta).
- Lyria: lyhyt myönteinen kehote suoraan interactions-rajapintaan (ei tools/lyria.mjs:n kieltolisäystä); "Stockholm" kehotteessa
  esti kerran (content_blocked) → "Swedish feel" kelpasi.
- Kertoja William: oae6GCCzwoEbfc5FHdEu style 0; Pulu: piI8Kku0DcvcL6TTSeQt stability 0,5; molemmat eleven_v4_turbo, fi, pcm_44100,
  −17,2 LUFS + alimiter 0,79, mp3 192k kerran.
- Proton puhdas logiikka: Peli-testit/kaanna.sh (490 testiä) ja unity-tarkistus.sh ilman editoria (ei käännöslukkoa).

## Worktreet
wt/pelikoodari-pulu-alku-web (#4396), wt/pelikoodari-pulla-turvaverkko (#4399), wt/pelikoodari-kuratoitu-aiheet (#4401),
wt/pelikoodari-savuke-pollo (kesken), wt/proto-pelikoodari-pulla-turvaverkko, wt/proto-pelikoodari-iss-radio,
wt/proto-pelikoodari-olavinlinna-faktat (odottaa Siirtoseppää), wt/pelikoodari-aanisivu-valinnat (#4388), wt/pelikoodari-louvre (#4365),
wt/proto-pelikoodari-tyrma-tapahtumat. Poista --poista-lipulla mergen jälkeen (web) / git worktree remove (proto).
