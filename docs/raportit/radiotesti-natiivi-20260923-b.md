# Radion savuke simulaattorissa (23.9.2026 klo ~22.40)

Simulaattori iPhone 18 Pro, proto-master `43f2820`. Testikoepaketti
(v16-tyylinen `kokoelmat/radiot.json`, 5 sallittu + 110 epäselvä, ei
luokattomia) ladattiin `Documents/sisalto-koe/`:hen, sovellus uudelleen
käynnistettiin (`simctl terminate` + `launch`) datan lataamiseksi, ja
poistettiin testin jälkeen (ei jää häiritsemään muita).

Komennot `Documents/linssi-komento.txt`:llä (`radio kaupunki <id>`,
`radio tila`), tulokset `Documents/linssi-loki.txt`:ssä.

## Lisenssiluokittelu: OK

- **Luokaton (ei asemaa maalle):** Asunción/PRY (ei rivillä radiot.json:ssa)
  → `Virhe - Asunción (Ei asemaa)`, ei soittoyritystä, ei korostusta
  kartalla. Täsmää sääntöön "luokaton ei soi eikä näy".
- **Sallittu:** AUS/Melbourne ja CHE/Alpit(Bern) etenivät oikein
  `Viritys`-vaiheeseen (lisenssi sallii soittoyrityksen) — päätöslogiikka
  itsessään kunnossa.

## Löydös: soittoyritys epäonnistuu tässä istunnossa

Molemmat sallitut asemat päätyivät `Virhe … (Asema ei vastaa)`-tilaan
(AUS ~10,7 s viiveellä, CHE lähes heti, toistettu 2×). Stream-URL:t
(`stream.rabe.ch`, `ondemand.rrr.org.au`) ovat oikeasti elossa — Macilta
suora `curl -r 0-2000` haki 200 OK ja oikeaa mp3-dataa hetki myöhemmin.

Huomio: n. 20 min aiemmin SAMA CHE-asema soi onnistuneesti tässä samassa
simulaattori-istunnossa ennen `simctl terminate`+`launch`-uudelleenkäynnistystä
(ks. `proto-3d/lokit/radiotesti-20260923-b/linssitesti-radio-CHE.png`,
näytöllä "RADIO RABE 95 / ALPIT · SVEITSI"). `log stream` näytti verkkoyhteyden
todella alkavan (DNS, TLS-polku satisfied) mutta ei ehtinyt tallentaa
lopputulosta 6 s:n ikkunassa. En selvittänyt juurisyytä pidemmälle — AVPlayer/
verkko on Linssisepän/Natiivisepän aluetta.

**Epäily:** `simctl terminate` + plain `launch` -uudelleenkäynnistys jättää
AVAudioSession/verkkoyhteyden tilaan, joka estää striimin avaamisen tässä
simulaattori-instanssissa. Ei todennettu — jatkotesti kannattaisi tehdä ilman
välissä olevaa manuaalista relaunchia (esim. koepaketti ladattavissa ilman
sovelluksen uudelleenkäynnistystä, tai käynnistys `xcrun simctl launch`
sijaan Xcode/debugger-kautta) ennen kuin väitetään bugiksi.

## Siivous

`Documents/sisalto-koe/` poistettu testin jälkeen. Sovellus jäi käyntiin
simulaattorissa (proto-master `43f2820`, ei uudelleenkäännöstä tehty).

## Lisäys 23.9.2026 klo ~22.55: relaunch-teoria KUMOTTU, oikea syy TLS

Natiiviseppä käänsi ja asensi masterin `e510cfd` (sis. Linssisepän
diagnoosicommitin 9b49703). Uusinta: sama koepaketti, kolme sallittua
asemaa (AUS/Melbourne, AUT/Wien, NLD/Amsterdam) soivat **oikein**
("Soi"-tila) sekä ilman relaunchia että sen jälkeen — relaunch ei siis
ollut syy, alkuperäinen epäilyni oli väärä.

`CHE/Alpit (Radio RaBe, stream.rabe.ch)` epäonnistuu kuitenkin
JOHDONMUKAISESTI (2/2 yritystä, ilman relaunchia) uudella diagnoosilla:

```
radio: Asema ei vastaa | soitin: soitin 1, kohde 2, aika 1
(AVPlayerWaitingWhileEvaluatingBufferingRateReason), kohta 0.00 s,
puskuri tyhjä, loppuTila 0, soitinvirhe -,
kohdevirhe Suojattu yhteys epäonnistui TLS-virheen johdosta.,
virheloki - 0 -, istunto AVAudioSessionCategoryPlayback reitti Speaker
```

Eli **TLS-kättely epäonnistuu nimenomaan stream.rabe.ch:hen** AVPlayerilla
simulaattorissa (Mac oma curl pääsee sisään normaalisti, joten kyse ei
ole verkon saavutettavuudesta vaan TLS/varmenneyhteensopivuudesta
AVPlayerin/simulaattorin ja tämän yhden palvelimen välillä). Muut
asemat toimivat, joten kyse ei ole yleisestä simulaattoribugista eikä
lisenssilogiikasta — pelkkä tämä yksi palvelin. En selvittänyt
tarkemmin (TLS-versio/salausalgoritmi/varmenneketju), koska se vaatisi
palvelimen omaa TLS-diagnostiikkaa, joka on Linssisepän/omistajan aluetta.
