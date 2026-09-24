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

## C-sarja (24.9.2026, master a345a19) — C1–C5 PASS, C6 vielä ei

Huom komennoista: `linssi keksinnot` heti tuoreen käynnistyksen jälkeen
epäonnistui ("linssi ei ole auki") — sisältö ei ollut vielä latautunut;
toimi hetken kuluttua uudelleen yritettynä. Peli piti käynnistää
(`ui aloita pariisi`) ennen linssin avaamista, muuten portti jäi
näkyviin linssin päälle.

- **C1** `linssi keksinnot` → `keksinnot kaynnista`: yläpalkin paikalla
  "KEKSINNÖT EUROOPASSA / 1769 · Glasgow", ei ◀▶-nappeja, "Tauko"
  tekstinä. Alareunassa karuselli, keskellä kultareunainen kortti
  (James Watt), paneelissa pehmeäreunainen (soikeahko) kuva ja
  "1769 ◈ Höyrykoneen lauhdutin". (C1-keksinnot-1769.png)
- **C2** Välinäytös 1873: `keksinnot 10` + `jatka` ja poll `keksinnot
  tila` (linssi-loki) kiinni hetkestä, jolloin `välinäytös: True` —
  suora `keksinnot 11` ei laukaissut sitä (vain luonnollinen eteneminen
  pysäkiltä 10). Teksti "Isoisä lähtee matkaan." vasemmalla kartan
  päällä, EI korttia tekstin ympärillä (alareunan karuselli näkyy yhä).
  Jatka-napin reunassa lievä punertava sävy muutaman sekunnin kohdalla
  (ei räikeä hehku, mutta värimuutos näkyy). (C2-valinaytos-1873.png)
  Loppu (`keksinnot 25` + `jatka`): paneeli "KEKSINNÖT EUROOPASSA /
  Kaari päättyy 1928" ilman nappeja paneelissa, ylärivin nappi "Loppu".
  (C2-loppu-1928.png)
- **C3** Keskikortin napautus avasi TIEDELIITTEEN (Penisilliini/Fleming)
  oikein. Sivukortin napautusta ja vetoa (drag-to-scroll) en ehtinyt
  erikseen todentaa. (C3-tiedeliite.png)
- **C4** Ihmisen matka (`linssi ihmisen-matka` → `esitys levantti`):
  Käynnistä-laatikko poissa, alareunassa aikaselain (pystyviivat, yksi
  kultainen valittuna, vuosi "106 254 vuotta sitten" ylhäällä).
  Löytökuva (esi-ihmiset) yläpuolella vastaavaa pistettä kartalla.
  Vetoa/irrotusta en ehtinyt testata erikseen. (C4-aikaselain.png)
- **C5** `ui wiki` (Venetsia): oma artikkeli kuvineen (5 kuvaa, oikein
  päin). `ui wiki Akropolis`: oikea Wikipedia-artikkeli kuvineen — vain
  yksi kuva tässä artikkelissa, joten kuvanuolia ei päässyt näkemään.
  `ui lehti ateena` → vieritin "MATKAOPAS"-nostoon ("Lue lisää
  matkailijan oppaasta →", ei tarkalleen "aiheesta" mutta sama nosto-
  malli): napautus avasi "Matkailijan Ateena" -ikkunan LEHDEN PÄÄLLE
  oikein (tähtiluokitukset, Hyvä tietää -listat). (C5-wiki-venetsia.png,
  C5-wiki-akropolis.png, C5-nosto-ikkuna.png)

**Huom (oma virheeni):** napautin vahingossa lehden radionappia samalla
rivillä kuin nosto-linkki ennen kuin osuin oikeaan kohtaan — mykistin
Macin äänen heti ja tarkistin `peli-tila.json`:sta, ettei mikään
musiikkikanava soinut kovaa (pohja/maisema molemmat < 0,02). Ei
kuulunut mitään, mutta merkitsen tämän rehellisyyden vuoksi.

## C6 (Jaa matka) — odottaa

`natiivi-ui/jaa-matka` on nyt masterissa (724ad30), mutta simulaattorini
on vielä a345a19:ssä. Pyydän uuden asennuksen ja ajan C6:n seuraavaksi
(`ui huipennus`: Jatka vaeltamista / Jaa matka / Uusi peli — jakoarkki
avataan mutta EI jaeta oikeasti, peru).

## B-osio

Ei aloitettu ajan puutteessa (aiemmat erät).
