# Natiivi-UI:n kuvasarjat A1–A9: tulos (24.9.2026)

Simulaattori iPhone 18 Pro, proto-master `fff33f5`. Ajettu pystyssä,
ilman ääniä. Kuvat: `proto-3d/lokit/kuvasarjat-natiivi-ui-20260924/`.
Ajan puutteessa vaaka ja iPad jäivät pois — voin ajaa ne erikseen jos
tarpeen.

## PASS

- **A1** `ui maalehti GRC`: otsikko "KREIKKA · MAAN OMA LEHTI", ei "GRC".
  (A1-maalehti-grc.png)
- **A2** `ui tietoja` + vieritys loppuun: nimikilpi, copyright,
  "LÄHTEET JA AINEISTOT", ryhmät (mm. Natural Earth, ETOPO1, Freesound,
  d3-geo), "45 aineistoa", "Sovellus 0.1.0". (A2-tietoja-alku/-loppu.png)
- **A3** `ui chat`: ylärivillä sekä "Näytä puhekuplat" että "Ehdota
  sisältöä" (kupla oli ohitettu). (A3-chat.png)
- **A6** `ui matkakirja tanger havainto`: iPhonessa kortti alkaa
  kompaktina lappuna ylärivillä ("ISOISÄN PÄIVÄKIRJASTA, 1873 · …"),
  ei täytenä korttina. (A6-matkakirja-lappuna.png)
- **A9** `ui liiku`: Liiku-kompassi korostuu alareunassa, liuku neljällä
  ikonilla (liftaus/juna/laiva/lento) ilmestyy yläpuolelle.
  (A9-liiku-liuku.png). **Ei ehditty**: liftauksen noppa +
  "Vaihda matkustustapa" -nuolinappi, estettyjen ikonien harmaa tila
  ja tilarivin syy.

## Poikkeamat (ensimmäinen kierros, master fff33f5) — RATKAISTU uusinnassa

- **A4**: napautus ei toiminut ensimmäisellä kierroksella. Selittyi:
  greetingin valmiskysymykset eivät liity nappiin (Natiivi-UI:n
  selitys), ja pilerin kosketusala oli liian pieni — korjattu.
- **A5**: chat piirtyi lehden ALLE (z-järjestys) — korjattu haarassa
  natiivi-ui/lehti-kulttuuri.

## Uusinta (24.9.2026, master 0f5ff7f) — kaikki PASS

- **A4** `ui chat` → napautus "Ehdota sisältöä" -pilleriin (tarkka
  osuma, ei komento): chat sulkeutui, "Kerro mitä huomasit" -lomake
  aukesi. Myös `ui chat ehdota` toimii samoin suoraan.
  (A4-ehdota-toimii.png)
- **A5** `ui lehti ateena` → `ui chat Mikä on Akropolis?`: chat ja pulu
  nyt LEHDEN PÄÄLLÄ, oikea vastaus latautui ja sen alla nappi
  "Tallenna juttuun" (listassa "Ehdota tallennettavaksi" — sama toiminto,
  nykyinen teksti eri). (A5-chat-lehden-paalla-vastaus.png)
  `ui chat ehdota` lehden ollessa auki: lomake avautuu lehden päällä,
  sivuviite "Maailman aarrekartta · Lontoo · Etusivu" (pelaajan
  sijainti, ei auki olevan lehden kaupunki — huomio, ei välttämättä bugi).
  (A5-lomake-lehden-paalla.png)
- **A7** ilman aloitusvirtaa: `ui matkakirja tanger havainto` (kortti
  alkaa lappuna, kuten A6) → `ui luento tanger` → `ui luento tanger
  loppu` (pysyy lappuna) → napautus lappuun avaa täyden kortin oikein.
  Huom: koska kortti ALKAA jo lappuna iPhonella, "kutistuminen"-siirtymää
  itsessään ei nähnyt — jos se pitää vahvistaa, tarvitaan tila jossa
  kortti on ensin auki (esim. iPadilla, missä A6:n mukaan kortti alkaa
  auki). (A7-luento-lappu-auki.png)

## Uudet kohteet — kaikki löytyivät

- `ui lehti ateena 1`: sivulla 2 (kuvien jälkeen, vieritettynä alas)
  laatikko "LEHDEN KYSYMYS" ("Tutustuitko? Miten Tuulten torni näytti
  aikaa…") ja neljä vastausriviä. (uusi-lehden-kysymys.png)
- Kaupunkilehden sää-rivi: mastossa "☀ Tänään 13° (13…24°), melkein
  selkeää · vuosiennuste ›" — näkyy A5:n kuvissa (etusivun alla).
- `ui maalehti GRC` → uutinen/artikkeliosio vieritettynä ("Luostarit
  nostettiin kalliolle korissa", Meteora) — rakenne sama kuin muut
  aihesivut; en ole 100 % varma onko tämä juuri se "uutisosio" jota
  tarkoitit erillisenä osiona vai yksi tavallisista aiheista.
  (uusi-maalehti-uutinen.png)

## Ei vieläkään ehditty

- **A8** (mikin lupakysely → "Kuuntelen…" → osittainen teksti): nappirivi
  näkyy (A3, A5 kuvissa), mutta itse sanelu vaatisi simulaattorin
  mikrofonin/puheentunnistuksen, joka ei välttämättä vastaa oikeaa
  laitetta — ei testattu tällä kierroksella ajan puutteessa.
- Vaaka ja iPad jäivät edelleen pois.

## Mediarivi (24.9.2026, master d28176d) — PASS iPhonella

- `ui lehti lontoo`, etusivun loppuun vieritettynä: **ENNEN** "Hold Your
  Hand Out, Naughty Boy · 1913" (lähde "Florrie Forde · UCSB Cylinder
  Audio Archive · Commons, PD") ja **NYT** "Resonance 104.4 FM" +
  punainen "LIVE". Ei napautettu soittonappeja (▷) ohjeen mukaisesti.
  (media-lontoo-ennen-nyt.png)
- `ui lehti pariisi`: yksi radionappi "Radio Campus Paris 93,9 · LIVE",
  ei ENNEN/NYT-paria — täsmää.
  (media-pariisi-yksi-nappi.png)
- `ui media lontoo` lokirivi: `media lontoo (GBR): radio Resonance
  104.4 FM, kielinäyte Itäkadun tori (Lontoo) — yll_foundations, PD,
  tallenne Hold Your Hand Out, Naughty Boy · asemia 115, tallenteita 2+0`

**iPad**: vahvistettu myös, kun Natiivi-UI lisäsi `ui lehti vierita
<px|loppu>` -komennon (master cebcf62). Lontoossa ENNEN/NYT näkyvät
VIEREKKÄIN kahtena sarakkeena (ei allekkain kuten iPhonella) — sama
sisältö, otsikko "Hold Your Hand Out, …" katkeaa kapeampaan sarakkeeseen
(ei bugi, vain leveys). Pariisissa yksi nappi, sama kuin iPhonella.
(ipad-media-20260924/media-lontoo-ipad.png, media-pariisi-ipad.png)

## B ja C -osiot

Ei aloitettu ajan puutteessa (B: aiemmat erät, C: äänikierros — B7:n
yhteydessä osa jo katsottu epäsuorasti).
