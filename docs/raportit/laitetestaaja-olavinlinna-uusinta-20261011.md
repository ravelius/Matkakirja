# Laitetestaaja: Olavinlinnan ensikertalaisen UUSINTA, yhdistetty 181d (v4, f94ff6d0), 11.10.2026

**Tulos: pääsy loppuun EI vieläkään onnistunut. Tyrmästä ei päässyt pois kummallakaan kahdella kierroksella (n. 4 min kukin; kolmas kierros = Historia).** Osa 1. ajon löydöksistä on korjattu (kiinnijäänti, nimikyltit, riitatoisto, historian tekstitys), osa ennallaan (tyrmän kamera/jumi, mustat pinnat, tyrmän ääni, vihje ei näy).

Ajo: iPad Pro 13" -simu `3622D89D` (T7), app `proto-3d/lokit/olavinlinna-yhdistetty-181d` (`kaannos.txt` = f94ff6d0), Julkaisijan SIMULAATTORI NYT, ajo 03.02–03.41. Mac mykistetty (`aani mykistys` OK). Ääni kaikilta kierroksilta komennolla `kaappaa`: `uusinta1.wav` (1200 s, kierrokset 1 ja 2) ja `uusinta2.wav` (600 s, Historia), 24 kHz stereo; mp3-versiot `proto-3d/lokit/laitetestaaja-olavinlinna-uusinta-20261011/`. Kone kuormassa (load 70–85) → vain toimintatesti. Kuva-arkki: `docs/raportit/kuvat/laitetestaaja-olavinlinna-uusinta-20261011/kuva-arkki.jpg`; kaikki kuvat ja lokit samassa lokikansiossa (`kuvat/v-*.jpg`, `linssi-loki-v4-kaikki.txt`, `aika-v4.txt`).

## Aikajana
| Kello | Tapahtuma |
|---|---|
| 03:09:06 | Olavinlinna (Pelit › Keskeneräiset); Pelaa/Historia-kortit 03:09:35 |
| 03:09:36 | Pelaa → vene → laituri (~25 s) |
| 03:10:19–03:10:50 | Laituri: tatti ylös 3 × 2 s ei vielä kiinni (v1: kiinni 2–5 s) |
| 03:10:51–03:10:55 | Loki: vartija "varoittaa (2,0 s, mittari 0,96)" → Kiinni → tyrmä (muunnelma 1) |
| 03:10:55–03:14:50 | Tyrmä 1: ei pääsyä; "lukko aukesi (60 s), ovi auki" lokissa, ei ruudulla |
| 03:15:11–03:20:16 | Linna kiinni ja auki uudelleen (kuormassa ~5 min) |
| 03:20:36–03:21:00 | Kierros 2: neljä askelta, vartija lähestyy; Etsintä→Varoitus (0,7 s)→Kiinni 2 s → tyrmä muunnelma 2 (vesipoika) |
| 03:21:00–03:25:00 | Tyrmä 2: "ovi työnnetty auki" (loki), kamera jumissa nurkassa; ei pääsyä |
| 03:32:19–03:34:41 | Kierros 3: ☰ › Linnan historia, 135,8 s, päättyi itsestään |

## Vertailu 1. ajon kohtiin a–e (korjattu / ennallaan / uusi)

### a) Jumi tai epäselvä hetki
- **Kiinnijäänti 2–5 s liikkeestä ilman varoitusta → KORJATTU OSITTAIN.** Nyt vartijalla on Epäily-vaihe ennen kiinnijääntiä; kierroksella 1 ehdin kävellä 6 s ja kierroksella 2 ~6 s ennen kiinnijääntiä. Loki näyttää varoituksen ("varoittaa", repliikki *portinvartija-epaily-3*, ääni *varuste-01*), mutta varoitusaika on vain 2,0 s ja ruudulla ei näkynyt varoitusta (ei tekstiä/mittaria; 03:20:41 kuva: vartija vain kävelee). Kuvissa vartija on nyt näkyvissä ennen kiinnijääntiä (v-17, v-18).
- **Tyrmästä ei pääse pois → ENNALLAAN (VIKA).** Kummallakaan muunnelmalla (1 avaimet ilmaraosta, 2 vesipojan ovi) en löytänyt tietä ovelle: lokissa "lukko aukesi / ovi auki" (577 s) ja "ovi työnnetty auki" (1120 s), mutta ruudulla ei ole muutosta eikä ovea näkynyt. Kamera juuttuu nurkkaan (03:24:30, v-23-1…6: kuusi identtistä kuvaa 6 sweepin jälkeen; v-12, v-21).
- **Tatti**: vain "vasen" liikutti kameraa tyrmän lähtönurkasta (v-13-vasen); ylös/alas/oikea ei (v-13-*). Peruutus paljastaa huoneen edelleen vasta kun sitä kokeilee (v-20-b).
- **Vihje → ENNALLAAN (a):** ☰ › Vihje: loki "vihje 3 (pyyntö) → Liekki, kipinä lentää", mutta kuvissa +0 s ja +5 s identtiset (v-10-a/b), ei kipinää/nuolta/tekstiä. Automaattiset vihjeet ("laituri", "tyrmä 20 s") samoin ruudulla näkymättömiä.
- **UUSI:** "Tyrmä"-tunniste ilmestyy ruudun yläreunaan kiinnijäännin jälkeen (v-08-0, v-19-2) – hyvä, kertoo paikan.
- **Latauksessa/avauksessa:** 2. avaus ei näyttänyt Pelaa/Historia-kortteja (suoraan laiturille), kuten 1. ajossa.

### b) Musta tai liian pimeä näkymä
- **Laituri: PARANTUNUT.** Selvästi valoisampi, hahmokapseli (Fogg takaa) ja vartijat näkyvät (v-04-4, v-05-laituri, v-17-nyt); kuopat/mustat täytealueet kuitenkin yhä ympärillä (kuvan oikea reuna, kuopat).
- **Tyrmä ilman kynttilää: ENNALLAAN.** Lähes musta, mustat laatikot/levyt (v-09-b, v-12-*); koko ruutu ei enää musta mutta ylä-/oikea puoli täysmusta.
- **Mustat sauvasiluetit seinällä: ENNALLAAN** myös kynttilän valossa (v-21-y1/y2, v-19-4: musta vaaka-/pystypalkki ja kahva).
- **Holvin kattolevy: ENNALLAAN** – vaalea läpikuultava levy lentää holvin yllä (v-14-4, v-22-d, v-23-*).

### c) Kamera seinän sisällä / läpi
- **ENNALLAAN:** tyrmän lähtö on nurkassa seinää vasten (v-11-*, v-12-*, v-23-*); kuvissa vain kiviseinää. Katseen käännös toimii (kuvat vaihtuvat), mutta paikka ei muutu tatilla ylös/oikea/alas.
- Laiturilla katse seinää kohti: sininen "vesilevy" täyttää ruudun (v-06-b) – sama kuin 1. ajossa.
- Kamera ei lentänyt holvin läpi tällä kerralla (korjattu osittain: tatti ylös ei vienyt kattoon).

### d) Väärä tai turha teksti / nimikyltti
- **KORJATTU:** huonekylttejä (Keittiö, Laituri, Fatabuuri…) ei näkynyt missään tyrmässä, laiturilla eikä historiassa (kaikki v-*-kuvat).
- **KORJATTU:** historian tekstitys (vuosiluku + selite) on nyt vasemmassa alareunassa eikä ole tatin päällä; tatti korvattu pienellä kynttilä-kuvakkeella oikeassa alakulmassa (v-28-*).
- **UUSI/HUOM:** kynttilä-kuvake (oikea alakulma) on yhä ilman tekstiä, mutta nyt aina näkyvissä ja pelaaja saa lokin mukaan "vihjeen" siitä; uusi pelaaja ei silti tiedä, että sillä sytytetään tyrmän valo (ks. a/b).
- Repliikeille ei tekstitystä (e-kohta) – ennallaan.

### e) Puuttuva tai outo ääni (`uusinta1.wav` 03:09:40–03:29:40, `uusinta2.wav` 03:31:50–03:41:50)
- **Laiturin toisteluttomuus: KORJATTU.** Soutajan repliikki *soutaja-2* soi nyt vain kerran saapumisessa (loki 449,8 / 790,5 / 1388 s; v1: 3 × 80 s aikana); "riita alkaa" toistuu 53 s välein mutta vain ensimmäisellä kerralla repliikkien kanssa (814–826 s), muut vaiheet hiljaisia → ei toistoa korvissa.
- **Tyrmän äänipohja: ENNALLAAN (VIKA).** Tasainen −42…−43 dB 3,3 min (kierros 1: 03:11:50–03:15:00) ja 3,5 min (kierros 2: 03:21:50–03:25:20) – kuten 1. ajossa (−42 dB, 10,8 min). Lokirivi "tyrmän ääniympäristö päällä" on uusi, mutta tasoa ei näy. Tapahtumia vain 4–5 repliikkiä/tehostetta heti kiinnijäännin jälkeen (kiinni −21…−25 dB, sitten pudotus).
- **Laituri odotuksessa:** −37 dB tasainen (kierros 2: 03:17–03:21, 4 min; kierros 3 ambient −37 dB) – hiljainen mutta ei toistuva.
- **Historia (kaappaus 2): HYVÄ.** −24…−25 dB tasainen 135 s ajan (kertoja+musiikki), päättyy siististi −38 dB:iin; ei kohinaa tai katkoja.
- Varoitus: portinvartijan "epäily"-repliikki (5,2 s) soi 1. kierroksella sekä Epäily-vaiheen alussa (471 s) että varoituksessa (512 s) – sama repliikki kahdesti; ei vielä kerro, mistä suunnasta vartija tulee.

## Hyvää tällä kierroksella
1. Laituri on valoisampi ja näkymä selkeämpi; Fogg näkyy (hahmokapseli); vartija kävelee kuvassa.
2. Vartijan Epäily/Etsintä/Varoitus-vaiheet loki- ja ääniraiteella; ei enää kiinniottoa 2 s:ssa ensimmäisestä liikkeestä.
3. Nimikyltit pois paikoista, joihin ne eivät kuulu; historian otsikko pois tatin päältä.
4. Historia 135,8 s: lento, ääni ja vaiheet kunnossa, päättyy itse; ⏭ ja ☰ näkyvissä.
5. "Tyrmä"-tunniste ruudulla kiinnijäännin jälkeen.

## Vikalista PT:lle (jäljellä)
1. Tyrmän pako ei onnistu (2/2 kierrosta; ovi "auki" lokissa, ei ruudulla) · v-13…v-23 · Siirtoseppä.
2. Kamera jumissa lähtönurkassa, tatti ylös/oikea/alas ei liikuta · v-23-1…6 · Siirtoseppä.
3. Vihje (☰ ja automaattiset) ei näy ruudulla; "kipinä lentää" ei näy · v-10-a/b · Pelikoodari/Natiivi-UI.
4. Varoitus vartijasta vain 2 s ja vain äänenä; ei visuaalista · v-18-b, v-19-2 · Siirtoseppä (vartija-AI) + NUI.
5. Tyrmän ääni −42 dB tasainen 3+ min · `uusinta1.wav` 03:11:50–03:15:00, 03:21:50–03:25:20 · Siirtoseppä (ääni).
6. Mustat sauvasiluetit/täysmustat pinnat tyrmässä, vaalea kattolevy · v-21-y1/y2, v-14-4 · Linnanrakentaja (materiaalit).
7. Kynttilä-kuvake ilman selitystä (sytytys vaikuttaa kaikkeen) · v-10-c · NUI.
8. Linnan 2. avaus ilman Pelaa/Historia-kortteja (suoraan laiturille) – tarkoituksellinen? · v-17-nyt.

## Ei testattu / rajaukset
- Pääsyä tyrmästä ulos, keittiötä, kappelia ei saavutettu; vain laituri, kiinnijäänti, tyrmä (muunnelmat 1 ja 2), historia.
- Kolmatta tyrmämuunnelmaa (irtokivi) ei tullut vastaan.
- Ääntä ei kuunneltu (Mac mykistetty); analyysi tasoista ja lokiriveistä.
- Kone kuormassa → fps/lataus vain suuntaa antavia.
- Warning 3 m: ei mitattu etäisyyttä, vain loki + kuvat.

Ei korjattu mitään (PT:n ohje).
