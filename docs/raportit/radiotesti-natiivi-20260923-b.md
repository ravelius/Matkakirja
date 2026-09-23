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
