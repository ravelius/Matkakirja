# Natiivi-UI: luovutus 11.11.2026 klo 21.15 (kontekstivahti 26 %; korvaa -2053:n, haara natiivi-ui/luovutus-20261111-2053 bf4dae840)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f, SK local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671.
Natiivikoodi: worktree /Users/Shared/Claude/wt/proto-nui-pallo (remote natiivi-backup; haara natiivi-ui/intro-nimet = PULUN haara) ja
/Users/Shared/Claude/wt/nui-a-kortti (haara natiivi-ui/intro-nimet-kortti = JUNAN haara). Tarkistus `sh Peli-testit/unity-tarkistus.sh </dev/null`;
Peli-testit `sh Peli-testit/kaanna.sh </dev/null` (912/912). Mac-ajot JU:n kautta; skriptit /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-*.txt,
lokit /Users/Shared/Claude/proto-3d/lokit/nui-*. ÄLÄ KOSKAAN pkill -f. Muut kohdat (Petit Palais v10 c650f3ca6, petit-palais-4 JU:lla;
isoisän ääni = SK:n data; D aarrekysymys KK:n päätöksineen): ks. -2053 (git show bf4dae840:docs/raportit/viesti-natiivi-ui-luovutus-20261111-2053.md).

## TEHTY TÄLLÄ VUOROLLA (21.0x–21.15)
1. A KK:n kaksi korjausta (KK 21.1x): JUNAN haara fbd6f4298 (= 1bde772da + korjaus), pulun haara 170f3160b.
   - Nimirivi piilossa kirjainten lennon ajan (sisään 300 ms + n·90 + 650 ms ja NimiUlos-lento): luokka mk-traileri--kirjaimet-lentavat
     kuvien tasolla (Saapumistraileri.KirjaimetLentavat; Pulu.uss opacity 0, siirtymä 0,2 s). Levossa rivi siirtyy kuvan siihen päähän, joka on
     kauempana kirjaimista (SaapumisKuvat.IntroNimiPaikka: kirjainrivi kuvan keskikaistassa ±14 % → rivi ylä- tai alaosan keskelle). Lokit:
     "ui kuvateksti: kirjaimet lentävät, nimirivit piiloon" / "… näkyviin", "traileri kuva N nimirivi yläosassa (kirjaimet alla)".
   - Kontrasti: reuna 3px musta (oli 1px 72 %), varjo 0 1px 5px 0,95; ei kaistaa.
   - AJO JU:lla: sk-intro-nimet-2 → lokit/nui-intro-nimet-2-fbd6f4298 (a0 = kirjaimet lennossa, nimiriviä EI saa näkyä; a1–a5; a6 kortti auki
     + sivukuva; B Lontoo pidemmällä odotuksella). SEURAAVA: katso a0–a5 + rajaukset (tee rajaus-a1…a5 kuten -1:ssä) + tallenne → KK + PT kopio.
     KK:n sanalla PT:lle "JUNAAN ee2673b39 (intro-nimet-kortti)" (= fbd6f4298 + erä 2).
2. Sivukuva-1 1bde772da KATSOTTU, kunnossa (kuva tekstin oikealla, alla eri kuva Neuilly). a1/a2 otettiin ennen kortin aukeamista (puhe odotti 2 s);
   a3-luenta-20s ja a5-avattu näyttävät oikein. Kerrottu KK:lle.
3. ERÄ 2 introrivit (SK ffd9b02db): 98 valmista + 5 tyhjänä (Lissabon #5/#8/#9, Rooma #9/#11) IntroNimet-taulukon loppuun.
   JUNAN haara ee2673b39, pulun haara 0920c67f8.
4. PULUN PYÖREÄ RAJAUS (PT 21.0x, SK a4be3cdd9): pulun haara 8ad8431b8 + ab6949202 (EI junan haarassa: kuuluu Pariisin tekstiversioon SK:n datan kanssa).
   - VirtaKuva.Rajaus (PyoreaRajaus.Jsonista: keskipiste [x,y] 0–1, halkaisija 0–1). SaapumisKuvat.AsetaRajaus = backgroundSize/-Position,
     ympyrä pidetään kuvan sisällä (keskipiste 0,742 + 0,26 ylittäisi oikean reunan 0,002:lla → siirtyy). Nouseva Pulun kuva: halkaisija = kuvan
     lyhyempi sivu, kultainen 3px kehys (mk-traileri__kuva--pyorea, var(--kulta)). Kartan pieni Pulun kuva: Kuvat.HaeSivulla(PieniPx/halkaisija).
   - `ui fokusvirrat juuri file:///…/kokoelmat/` (Fokusvirrat.AsetaKehittajanJuuri) + Ballon-kuvan esittelypaikka varatiedostoon
     (esittelypaikat-vara.json 48.8417, 2.2736, kuten SK:n data/esittelypaikat.json).
   - Vienti SK:n haarasta 8a3392be5 (sis. a4be3cdd9) → /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/vienti-pulu-rajaus (worktree
     /Users/Shared/Claude/wt/nui-sk-vienti, detached; voi poistaa `git worktree remove` kun ajo katsottu).
   - AJO JU:lla: sk-pulu-rajaus-1 → lokit/nui-pulu-rajaus-1-ab6949202 (p1 nousee, p2 suurimmillaan, p3 kartalla). Tarkista "fokusvirrat: luettu
     levyltä", "Pulun kuva pyöreänä", "pieni Pulun kuva pyöreällä rajauksella", EI "ei karttapaikkaa". Sitten SHA + kuva KK:lle.
5. B-ARKKI KK:lle lähetetty 21.14: yksi-etaisyys-2 224.82 (53171fed0) 12/12, Orsay 0,50 (307 m), Louvre 0,44 (1 094 m), muut 0,51–0,62.
   Kuvat lokit/juna-yksi-etaisyys-2-53171fed0/kk/*-1000.png. KK:n sanalla työlistarivi valmiiksi (tools/asemataulu/tyolista.py valmis).
6. KS:n vakiokuvat-json kuitattu (natiivi-backup karttaseppa/tyokalu-1 203231d1c; tyokalut/kaupunki/vakiokuvat/vakiokuvat-{pariisi,lontoo}.json;
   kadut[i] = {lat, lon, suunta_deg (pohjoisesta myötäpäivään), etaisyys_m 60, nimi, osm}, 3 katua per kaupunki; merkit [] → ohita ilman PUUTEtta).

## SEURAAVA: TYÖKALU 3 (vakioajo) — ALOITTAMATTA, KK hyväksynyt (-2053 "KK:N PÄÄTÖKSET")
- Tehtävänanto: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kolme-tyokalua-tehtavananto.md "TYÖKALU 3" + tarkennukset.
- JU:n sopimus ja skenaario: /Users/Shared/Claude/julkaisija-tyokalut/vakioajo/sk-vakioajo.txt (generoitu tee-sk.py; arkki.py, jono-vakioajo.zsh).
  JU:lle KERROTTU 21.15: komennot ovat "ui vakio …" (ei "komento vakio-…"); JU vaihtaa etuliitteen, kun NUI antaa SHA:n.
- Toteutettavat (UiKomennot.cs uusi case "vakio"; lokirivit tavulleen JU:n otsakkeen mukaan, "valmis" vasta kun kamera asettunut):
  `ui vakio kohteet` → "VAKIO kohteita <N>" (+ lista nimi/lat/lon); `ui vakio yleis <kaukaa|45-pohjoinen|45-ita|45-etela|45-lansi|lahin>` →
  "VAKIO yleis <kulma> valmis"; `ui vakio kohde <i>` (1-pohjainen) lento + napautus → "VAKIO kohde <i> <nimi> valmis" | "VAKIO kohde <i> puuttuu";
  `ui vakio kohdekulma <180|lahin>` → "VAKIO kohdekulma <kulma> valmis"; `ui vakio sulje` → "VAKIO kohde suljettu";
  `ui vakio kuva <i>` → "VAKIO vakiokuva <i> <nimi> valmis" | "VAKIO vakiokuva <i> puuttuu" (JSON levyltä; polku argumenttina tai juuri-komennolla).
- Kohdeluettelo = Nahtavyysalue.Kylttikohteet (Assets/Matkakirja/Kartta/Nahtavyysalue.cs:964; Kylttikohde Nimi/Lat/Lon/MaaM; EI kaupunkikenttää →
  suodata etäisyydellä kaupungin keskipisteestä, Pariisissa pitää tulla 14), ei nostoja. Yli 25 = PUUTE (arkki).
- Napautus: olemassa `ui nahtavyysesittely napauta <nimi>` ja `ui pinnaus napauta-sulje`, lento `komento aja <lat> <lon> 0.02 3` (ks. sk-yksi-etaisyys-2.txt);
  NahtavyysEsittely.cs (1 153 riviä): MitattuZoomi/MittausAsettuuS = asettumisen tieto "valmis"-riviä varten.
- Kaukokuvan rajaus kohteiden ympäröivästä laatikosta (kunnes NS:n kaupunkitaulu); arkin otsikkoon rajauksen lähde ("rajaus: kohteet").
- Lontoo: ensimmäinen vakioajo saa näyttää viat (PUUTE-rivit), korjaukset ovat Lontoon käsityötä. Valmis = Pariisin + Lontoon arkki.
- JÄRJESTYS sen jälkeen: ohjaussauvat (ensin mitat + ehdotus KK:lle) → D (aarrekysymys).

## LISÄYS 21.2x (ennen nollausta) — LUE TÄMÄ ENSIN (KK:n viestit 21.04–21.14 käsitelty tähän)
- A KESKELLE (KK 21.14, omistajan "keskitettynä"): rivin siirto ylä-/alaosaan POISTETTU, rivi aina kuvan keskellä; piilotus kirjainten lennon ajan
  ja vahvempi reuna pysyvät. JUNAN haara nyt bfaafec8c (natiivi-ui/intro-nimet-kortti = ee2673b39 erä 2 + keskelle), pulun haara 7fc22116c.
  intro-nimet-2 (fbd6f4298, valmis 21.16) näyttää VANHAN asettelun → älä lähetä KK:lle.
- AJO sk-intro-nimet-3 JU:lla → lokit/nui-intro-nimet-3-bfaafec8c: kuvat peliajassa (odota-peli 1,4 s sisääntulosta = asettunut täysi koko),
  a0 = PARIISI-kirjaimet lennossa (rivi piilossa), kaikki oletukset oleta-uusi, B odottaa "lontoo uusi esittely" (intro-nimet-1:n B oli tyhjä:
  vanhat rivit täsmäsivät heti). NÄYTTÖ KK:lle (21.04 kohta 4): viisi TÄYSIKOKOISTA rajausta ASETTUNEESTA kuvasta (kuvan rajat lokista
  "traileri kuva N nousee … lepo x,y, koko W×H") + yksi rajaus kirjainten lennosta + Lontoon kuvat nimiriveineen. KK: ajastus pysyy (ViimeinenKasvuS
  ennallaan), nimi näkyvissä ≥ ~1,5 s täydessä koossa. Kontrastin mittapuu Riemukaari (a2) ja Notre-Dame "1345" (a4); jos vielä heikko, vahvista
  .mk-traileri__kuvanimi-teksti (nyt reuna 3px musta, varjo 0 1px 5px 0,95), EI kaistaa, fontti ja koko ennallaan.
- KK 21.07/21.08/21.14: sivukuva-1 1bde772da kortin AJOITUS HYVÄKSYTTY (kortti ja puhe samalla hetkellä). Ohje käsikirjoituksiin: kuvat ja odotukset
  PELIAJASSA (odota-peli) tai sidottuna lokin tapahtumaan, ei seinäkellosekunteina (tallennus ~1/6 nopeudella).
- B (224.82) KK 21.14: VALMIS → merkitse työlistarivi valmiiksi (riviä "yhdelle etäisyydelle" ei löytynyt tyolista.json:sta nimellä; kysy PT:ltä otsikko).
- UUSI A-ERÄÄN, ENNEN TYÖKALUA 3 (omistaja 21.13, KK:n tehtävänanto 21.13, PT 21.1x): ISOISÄN KUVA TAITETTUNA TEKSTIN SEKAAN matkakirjakortissa:
  kuva oikeaan yläkulmaan tekstin sisälle; teksti kuvan vasemmalla niin monta riviä kuin kuva on korkea, jatkuu kuvan alla koko leveydellä; väli kuvaan
  ~1 rivinkorkeus sivulla ja alla; ei tyhjää palstaa kuvan alle, kortti lyhenee; kehys ja kallistus ennallaan. EHDOT: (1) kirjoittuva teksti etenee
  saumatta jaon yli (ei hyppyä eikä uudelleenrivitystä kesken sanan), (2) sama asettelu luennalla ja avatussa lapussa, (3) ilman kuvaa teksti koko leveydellä,
  (4) toimii lyhyellä (249 merkkiä) ja nykyisellä pitkällä tekstillä, (5) alaosan pikkukuvat ennallaan. Toteutusehdotus KK:lta: kaksi peräkkäistä
  kappaletta, jako mitatusta rivinvaihdosta sanarajalla. Jos jokin ehto mahdoton/kallis → YKSI viesti KK:lle ennen työtä. Koodi: Matkakirjakortti.AsetaSivukuva
  (baf16f90d/ecf7c28a6). NÄYTTÖ: täysikokoiset kortin rajaukset kolmesta hetkestä (kuvan vieressä, jaon kohdalla, valmis) + avattu lappu. Junaan KK:n sanalla.
- PETIT PALAIS YHÄ AUKI (KK 21.07 B, JU 21.06): petit-palais-4 c650f3ca6: "kohdenostot: pariisi, merkkejä 25" (ei 26), "mallilla Petit Palais ei kohdenostoa",
  ei "ui lukija: aloita pala". Kyltti näkyy, napautus ei käynnistä esittelyä. Selvitä miksi PP ei ole kohdenostoissa vienti-pp4-juuresta
  (Kohdenostot.Ruudulla/Vaihda; Kohdekartat.AsetaKehittajanJuuri nollaa kartat; onko PP:n kohdekartan rivissä id/paikka jota Kohdenostot vaatii;
  SK:n juttu 24c73c1f5) → korjaa, uusi ajo, arkin rivi kuten muilla kohteilla → KK.
- JU 21.1x: vakioajon etuliite jo vaihdettu ("ui vakio …"), JU ajaa kun SHA tulee.
- JÄRJESTYS NYT: intro-nimet-3 katso → KK; pulu-rajaus-1 katso → KK; isoisän kuva taitettuna; Petit Palais; työkalu 3; ohjaussauvat; D.
