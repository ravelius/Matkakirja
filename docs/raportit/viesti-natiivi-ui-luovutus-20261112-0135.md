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
