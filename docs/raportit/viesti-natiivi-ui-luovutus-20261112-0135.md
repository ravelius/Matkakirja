# Natiivi-UI: luovutus 12.11.2026 klo 01.35 (kontekstivahti 28 %; jatkaa -0040:tä 7d21abe52)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f. Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-*.txt;
ajot /Users/Shared/Claude/proto-3d/lokit/nui-*; tarkistus `sh Peli-testit/unity-tarkistus.sh </dev/null`. Worktreet kuten -0040 (nui-aarre, nui-pariisi, nui-pariisi-data, nui-vakio, nui-luovutus-2115).

## A. AARREKYSYMYS: VALMIS
- KK:n junasana 00.59, PT pt-ok 01.00 → MR87, LINKISSÄ 224.91 = ab7258ede (JU 01.25). Ei enää tehtävää.
- c3 "nappula puuttuu" EI VIKA (KK 00.59): esikatselun pistekerroin 0,465 vs. 2752 px:n kuva → 3D-nappula 16,7 px (laitteella ~72 px).
  Esikatselun mittakaavan korjaus erillisenä pienenä työnä → KK antoi PT:lle jaettavaksi (ei meidän).

## B. PARIISIN TEKSTIVERSIO: KESKEN (EI junasanaa). Koodi natiivi-backup natiivi-ui/pariisi-tekstit, kärki 5d2c7120b (worktree nui-pariisi)
KK:n ehdot junasanalle (KK 01.10), yksi koottu viesti kuvineen:
 (1) luenta päättyy äänitteen pituudesta ja Pulun vuoro vasta sen jälkeen → TÄYTTYY ajossa -4 (lokit/nui-pariisi-tekstit-4-5d2c7120b).
 (2) isoisa-pariisi.mp3 (SK 7d4896367) TÄYTTYY; pulu-pariisi-3.mp3 EI SOI missään ajossa (-1…-4) → AVOIN.
 (3) p2 lähderivi, p3 pieni kuva kartalla, t5 avattu lappu → p2/p3 eivät näytä Pulun pyöreää kuvaa (loki: lähderivi luotu) → AVOIN.
Tehty tässä sessiossa (KK 00.46 "korjaus Puhe.cs:ään, vain esikatselu"):
- 27d162d64 Puhe: seisova ulostulo (vain editori + MATKAKIRJA_ESIKATSELU_SK): DSP seis ≥ 2 s → pala loppuu clip.lengthistä (kertymä unscaled, ≤ 0,1 s/ruutu).
  EI LAUENNUT ajossa -2: lähde pysähtyy heti Play-ruudun jälkeen (isPlaying false, kohta 0, dsp jäässä 79.168) → silmukka loppui heti.
- aa5ba75b3 esikatselun tilarivit: "puhe: odotus alkaa/odotus/odotus päättyi (esikatselu)" + "puhe: pysäytys (esikatselu) … kutsuja".
- 5d2c7120b: kun lähde pysähtyy heti ja dsp ei ole edennyt palan alusta (soi < kesto − HantaVara) → odotetaan kesto → loki
  "ulostulo seisoo, loppu äänitteen pituudesta X s (esikatselu)" → seisovaLoppu → luonnollisen lopun reitti. TOIMII (-4: 3.4 s ja 18.3 s).
- PK:lle tiedoksi lähetetty (27d162d64). Laitteen kulku ennallaan.
- Skenaario sk-pariisi-tekstit-3/-4.txt: `ui luennat juuri` VASTA `odota 60` jälkeen (peli latasi omat luentonsa komennon jälkeen → -2 soitti vanhan
  puhe-fokus-matkakirja-pariisi.mp3:n; testidata, ei kytkentävika — kerrottu KK:lle).
SEURAAVAT ASKELEET:
 1) Pulun ääni: Saapumisesitys.Kommentti → pulu.Sano(teksti, KommentinAani(k, i, teksti), …, kuplaton: true). KommentinAani palauttaa null,
    jos SahketehtavaNakyma.Tiiviste(teksti) ≠ "b67b8821" (KommenttiAanet["pariisi"], rivi ~875). Tarkista uuden kommentin teksti viennistä
    (vienti-pariisi-tekstit/kokoelmat/fokusvirrat.json, pariisi PuluKommentit[0]) ja tiivisteen laskenta; ja kutsutaanko Kommentti ylipäätään
    (lisää loki). Ääni ei kulje Puhe-lokin kautta? (ei "puhe: alkoi … pulu-pariisi-3.mp3" -riviä yhdessäkään ajossa).
 2) Pulun kuva p2/p3: SaapumisKuvat.PulunKuvaNousee kasvaa NousukuvaLiike.KasvuS ja palaa PaluuS; skenaario ottaa p1 +1,5 s, p2 +3 s "Pulun kuva nousee"
    -rivistä. -4:n p2:ssa kuvaa ei näy → tarkista ajoitus (KasvuS) ja korjaa skenaarion odotukset (tai oleta-rivi kuvan perillä olosta).
 3) Uusi ajo (-5) JU:lla → yksi koottu viesti KK:lle (ehdot 1–3, kuvien polut) → junasana → pt-ok PT:ltä. Junaan: koodi + SK-haara/data cb990dca6 + sisällön vienti.
- AVOIN -0040:stä: kertoja pois -poikkeuksen lokijärjestys näytettävä sopivassa ajossa (kertoja pois -kytkin skenaarioon).

## C. vakioajon uusinta (Lontoo + vakiokuvat): ei vielä ajettu (JU:n jonossa -0022:n mukaan) → PUUTE-rivit katsotaan, kun valmis.

## LISÄYS 01.4x: KK 01.38 LINJA AJOLLE -5 (KORVAA kohdan B askeleet 1–2)
- (2a) TIIVISTE-EPÄILY EI PIDÄ (KK laski: pollo.kommentti 144 mrk, tiiviste b67b8821 = koodi; äänite mediassa 11,15 s). Syy lokin hiljaisuuteen:
  Aanet.Soita (Puhe-kanava) ei kirjoita mitään, ei soitosta eikä kieltäytymisistä. TEE: Aanet.Soita Puhe-kanavalle PYSYVÄ lokirivi soiton alkaessa
  (tiedosto + pituus s) ja jokaisesta kieltäytymisestä syineen (jatkohiljaisuus, klippi null, KertojaPuhuu: mikä kolmesta ehdosta, PuluaaniSoi).
  Tarkista ensin epäilty: KertojaPuhuu = Puhe.Instanssi.Soi (= puhuu) && !PuluaaniSoi — putoaako puhuu epätodeksi "odotus päättyi" -rivillä ennen
  Kommentti(v, 0):aa (900 ms + 300 ms kysely)? Jos ei, Pulu vaikenee vain esikatselussa → korjaus samaan esikatselun haaraan.
  UUSI EHTO 2a: "odotus päättyi … isoisa-pariisi.mp3" → sen jälkeen Puhe-kanavan alkurivi pulu-pariisi-3.mp3 ~11,2 s.
- (3) LÄHDERIVI TÄYTTYY jo -4 p1:ssä (KK katsoi). Kuva ruudulla 3,0 s (NousukuvaLiike 1,1 + 1,0 + 0,9; omistaja 11.11. 19.58) → p2:n ehto POISTUU.
  p3: pieni Pulun kuva kartalla → lokiin sen ruutupaikka + kuva heti paluun jälkeen.
- (4) KK:N PÄÄTÖS 01.38: PALLOKUVA NOUSEE SANOILLA "KATSO YLÖS". Lauseet (s): 0–1,7 "Voi isoisä!" | 2,0–4,2 "Me kirjekyyhkyt…" | 4,7–7,4 "Siksi…ilmapallolla."
  | 7,9–8,6 "Katso ylös:" | 9,1–10,9 "pallo nousee Pariisin ylle yhä." TAVOITE: nousu alkaa 7,9 s puheen alusta, lähes täysi 9,0 s, palaa kartalle 10,9 s.
  TOTEUTUS (KK:n ehdotus): Kommentti(v, 0) antaa Sano:lle aaniLadattu-kutsun ja ajastaa aloituslennon Pulun kuvan nousun hetkeen klipin pituus − 3,25 s
  (≥ 0); ilman klippiä (ääni pois, ei latautunut, kieltäytyminen) nousee heti kuten nyt. Vain aloituslennon nousukuva (Pariisi); muiden kuvapakka ennallaan;
  PulunKuvaTulossa-varaus ennallaan vuoron alussa.
- (5) TARKISTA: Pulun vuoron loppu (Lukuaika(teksti) + 280 ms → Hiljeni ja seuraukset) ei saa päättyä ennen äänitteen loppua; jos Lukuaika(144) < 11,2 + 0,6 s
  → loppu = max(lukuaika, klipin pituus + 600 ms) kuten Kuplat.AsetaKesto. Mikään seuraava (Liiku-nappi, aarrekysymys saapuessa 224.91) ei ala Pulun puheen päälle.
  Kerro KK:lle luku ja mitä lopusta seuraa.
- AJO -5 KK:lle: lokirivit (1, 2a, kuvan nousun hetki suhteessa puheen alkuun, vuoron loppu) + kuvat p1 (kuva + lähderivi, ~1,5–2 s nousun alusta pelin ajassa),
  p3, t5 → junasana → pt-ok PT:ltä.

## LISÄYS 02.5x: C. VAKIOAJO VALMIS (JU), katsomatta
- 210c842ad: Pariisi 42/48 kuvaa, 11 kohdetta; Lontoo 66/72, 19 kohdetta; PUUTE 0; MUTTA vakiokuvat 1–9 "puuttuu". Arkit
  /Users/Shared/Claude/proto-3d/lokit/vakioajo-{pariisi,lontoo}-210c842ad/arkki-1000.png (JU korjasi arkki.py:n lukemaan mittarit unity.log:sta).
  TEE: katso arkit, selvitä miksi vakiokuvat 1–9 puuttuvat (skenaario vai koodi) ja puuttuvat 6+6 kuvaa → tulos KK:lle yhtenä viestinä.
- LISÄYS 03.0x (KK 02.49 JU:n kautta): 45° yleiskuvat 6578 m = usvaa, ei tarkoituksellinen → TEHTY 794652b07 (natiivi-backup natiivi-ui/vakioajo, worktree nui-vakio):
  Vakioajo.Yleis45KattoM = 1500 m (≥ MinKorkeusPaikassa), "kaukaa" ennallaan. JU ajaa vakioajon uudelleen → katso 45-* -kuvat (korttelit ja nähtävyydet erottuvat?) → KK:lle.
- LISÄYS 03.1x (NS/KK 03.0x): kohdekamera ei toistunut (Cutty Sark suuntima 20° vs 18°; esittelyn lento perii edellisen suunnan) → TEHTY 631172274
  (natiivi-ui/vakioajo): ui vakio kohde asettaa suuntima 0 ja kallistus 45° ennen lähestymistä. JU:lle pyydetty uusinta 631172274:lla (sisältää 45°-katon).
  TARKISTA: kaksi peräkkäistä ajoa → sama suuntima/kallistus kohteittain; jos ei, NahtavyysEsittely.NapautaMallin kulma (NS:n ala?) → NS:lle.
- LISÄYS 03.4x: VAKIOAJO VALMIS 631172274 (JU 03.41: a = b identtiset asennot, 4 ajoa rc 0, PUUTE 0, Pariisi 42/42, Lontoo 66/66). KK:lle lähetetty
  junasanaa varten (03.4x). KK:n junasanalla → pt-ok PT:ltä (631172274, natiivi-backup natiivi-ui/vakioajo). NS:lle tiedoksi.
- LISÄYS 03.4x: KK:N JUNASANA 03.42 vakioajo 631172274 → pt-ok PYYDETTY PT:ltä (03.4x). Jäljellä vain vakiokuvien komento käännökseen (PT/JU).
- KK 03.42: PARIISIN TEKSTIVERSION AJO -5 (linja KK 01.38 yllä) ON KÄRJESSÄ ENNEN MUUTA → aloita siitä.
- LISÄYS 05.0x (PT/KK 04.5x, Mac tyhjä): KK 01.38 -linja TOTEUTETTU 4043ebd49 (natiivi-ui/pariisi-tekstit): Aanet.Soita Puhe-kanava pysyvä loki
  "MATKAKIRJA aanet: Pulun puhe <tiedosto>: soi X s | EI SOI: <syy>" (jatkohiljaisuus / klippi / kertoja puhuu (kertojakanava | Puhe soi X | linssin puhe) /
  Pulun chat-vastaus); Saapumisesitys.Kommentti: aloituslennon nousukuva aaniLadattu-kutsussa viiveellä klippi − 3,25 s (loki "Pulun nousukuva ajastettu X s
  puheen alusta"), vuoron loppu max(lukuaika+280, klippi+600) (loki "Pulun vuoro i loppuu … ms"). Skenaario sk-pariisi-tekstit-5.txt (p1 +1,7 s, p3 +3,2 s, t5; p2/k1 pois).
  AJO -5 PYYDETTY JU:lta → lokit/nui-pariisi-tekstit-5-4043ebd49. KATSO: "odotus päättyi … isoisa-pariisi.mp3" → "Pulun puhe pulu-pariisi-3.mp3: soi ~11,2 s";
  nousukuva ~7,9 s; vuoron loppu ~11 750 ms; p1 kuva + lähderivi, p3 pieni kuva, t5 → KK:lle yksi viesti → junasana → pt-ok.
  Jos "EI SOI: kertoja puhuu (Puhe soi …)" → puhuu ei putoa esikatselun seisovassa lopussa ajoissa → korjaa Puhe-haarassa.
- LISÄYS 05.1x: AJO -5 OK lokista (isoisa 18.3 s seisova loppu → "Pulun puhe pulu-pariisi-3.mp3: soi 11.3 s" → nousukuva 8.0 s → vuoro loppuu 11884 ms).
  KK:lle lähetetty junasanaa varten (kuvat p1/p3/t5 KK katsoo). KK:n junasanalla → pt-ok PT:ltä: 4043ebd49 + SK-haara/data cb990dca6 + sisällön vienti.
- LISÄYS 05.1x: KK:N JUNASANA 05.06 Pariisin tekstiversio (4043ebd49 + SK cb990dca6 + vienti) → pt-ok PYYDETTY PT:ltä. AVOIN: kun juna-ajo
  224.97+:n päällä valmis (JU), tarkista lokista "aanet: Pulun puhe pulu-pariisi-3.mp3: soi" ja "Pulun nousukuva ajastettu" → yksi rivi KK:lle.

## JONO NYT (PT 08.3x, KK 08.34; talo seisoi 06.06–): 1) kuumailmapallon kyltti peittää ankkurin (lähikuva), 2) intron nimi ja vuosi
## (introkuvien rakennusvuodet lähteineen, Pariisi ensin), 3) vakiokuvien komento käännökseen. Mac-ajot JU:lle, tulokset KK:lle, esto → rivi PT:lle.
- Lisäksi avoin: Pariisin tekstiversion pt-ok (pyydetty 05.1x) ja juna-ajon tarkistusrivi KK:lle (yllä).

## LISÄYS 08.5x (uusi NUI, nollauksen jälkeen): JONO 1–3 KÄYTY, kooste KK:lle 08.41 (PT kopio)
- 1) Kyltti/ankkuri: 9c6a6f864 jo juna-224:ssä (merge a48f8ee33 11.11. 19.09), linkissä → työlista valmis.
- 2) Introrivit: NUI 561fbd57c (natiivi-backup natiivi-ui/intro-rivit-valmiit, juna-224 c95f68c39:n päällä; worktree wt/nui-intro): 14 riviä SK:n
  erien 1–2 taulukoista (11 katsottua + Berliini #8, Ateena #5, Dublin #3); koodi = SK:n json (skripti vertaa.py scratchpadissa). ODOTTAA KK:n junasanaa
  (pyydetty ilman Mac-ajoa) → pt-ok. Erä 3 SK:lla.
- 3) Vakiokuvat: komento jo käännöksessä (224.97); 1–3 valmis, 4–9 = KS:n json merkit [] tarkoituksella; json on KS:n vanhasta valinnasta
  (KK 23.09 keskusta-työkalu b70b07ec0 ajamatta) → KS; katukuva 620/1679 m minimikorkeudesta → KK:n päätös kysytty.
- PT 08.4x: CODEXIN TARINAMERKIT (6f2839967) vastaanotettu, kuittaus postilaatikko 495eab4f2; arkki KK:lle 08.43. Koe junan päälle ad63f29a1
  (natiivi-ui/tarinamerkki-koe-2, worktree wt/nui-tarina), skenaario sk-tarinamerkki-4.txt, Mac-ajo pyydetty JU:lta → lokit/nui-tarinamerkki-4-ad63f29a1
  → katso tila-rivit (ladattu, piirretty > 0) ja kuvat l1–l6, k1–k5 → KK:lle yksi viesti → kortti omistajalle KK:n kautta.
- KK 08.49: introrivit 561fbd57c JUNASANA (pt-ok pyydetty PT:ltä 08.5x); kyltti ja vakioajo SULJETTU (ei kehittäjän alarajaa; nimeämistä ei tehty,
  "katukuva"-nimeä ei ole NUI:n koodissa). TARINAMERKIT: vain kirja + tiimalasi, A sellaisenaan / B paperipohja koodilla → 00bc4abc1
  (komento tarinamerkit pohja 0|1), sk-tarinamerkki-5.txt (katot / Jardin des Plantes / Seine, kultatähti + ND + Panthéon samassa näkymässä,
  PISTEKERROIN 0.397 = laitteen 2,0 px/pt) JU:lla → lokit/nui-tarinamerkki-5-00bc4abc1 → täysikokoiset rajaukset KK:lle; KK valitsee (ei korttia).
  -4 (ad63f29a1, kaikki viisi, 0.465) valmis vertailuksi.

## LISÄYS 09.0x: NOLLAUS (konteksti 26 %, Raamattu 7.37). JONO SEURAAJALLE
1) TARINAMERKKI-5 (JU ajaa, sha 00bc4abc1, PISTEKERROIN 0.397) → lokit/nui-tarinamerkki-5-00bc4abc1: tarkista unity.log "tarinamerkit: 3 merkkiä, kuva …codex-<m>.png
   (ladattu) … pohja True/False … piirretty 3" ennen jokaista kuvaa; katso l-/k- × kirja/tiimalasi × A/B. TÄYSIKOKOISET RAJAUKSET (ei pienennöksiä) kolmesta
   taustasta (katot 48.8420/2.3476, Jardin des Plantes 48.8438/2.3600, Seine 48.8475/2.3622) + kultatähti ja ND/Panthéon samasta kuvasta → KK yhtenä viestinä,
   kerro mittakaava (0,397 × 5,04 = 2,0 px/pt = laite; tarinamerkki ja tähti ruudun osuutena). KK valitsee (ei korttia). Jos joki-merkki ei osu Seineen → korjaa
   piste ja uusi ajo. -4 (ad63f29a1, kaikki viisi, 0.465) vertailuna samassa kansiossa.
2) LUENNAT V11: 96f5f1c38 (natiivi-backup natiivi-ui/luennat-v11, juna-224 9b777264d:n päällä; Peli-testit 931/931) → pt-ok PYYDETTY PT:ltä 09.0x.
3) Introrivit 561fbd57c: PT otti junaan (juna-224 9b777264d). Kun linkissä → ei omistajalle erikseen (KK päättää koosteesta).
Worktreet: wt/nui-intro, wt/nui-tarina, wt/nui-luennat (+ vanhat -0040:stä). Scratchpad-skriptit: haara-commit.sh (tiedosto haaraan ilman checkoutia).
- LISÄYS 09.0x: KK 08.58 hyväksyi v11:n. JUNASANA EHDOLLA: junan Mac-ajon lokissa Pariisin esilataus "puuttuvia 0" (ennen 8) JA Invalidien luenta soi
  (myönteinen rivi) → jos kappale ilman äänitettä, nimi KK:lle. Vastattu KK:lle: tuleviin eriin ei koodimuutosta — sisältöpaketin kokoelmat/asetukset.json
  avain "osoitteet.luennat-manifesti" (Asetus.Teksti, Valmisluennat/Puhe/NostoluentaVienti lukevat sen) → versio vaihtuu sisällön viennillä; koodin oletus vain varalle.
  JU:n tarinamerkki-5 jonossa 08.56.
