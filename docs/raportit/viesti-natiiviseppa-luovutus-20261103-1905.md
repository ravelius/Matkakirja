# Natiivisepän luovutus 3.11.2026 klo 19.05 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1845.md. Sen viittaaman 1622-luovutuksen TILA-osio
(haarat, worktreet, simuketju, lukot, testit) on yhä voimassa: `git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).

## ODOTTAA (JU → sinulle, mene erän edelle)
- JU:n kaatumistodistus isosta paketista **ea09036dc** (PT: ei c5a120c78). Paketti = aaaed4758 loppurajaus + **80ea01172**
  lähtörajan korjaus + muistivahti 3e0447b47 + NUI:n kekomittari 453a76a42 + KS:n isoisa4 7e640edc4 + PK:n keisarikuvat 8cec09f05.
  JU: paketti-iso.zsh (saapuminen 0–60 s, kuvat 3 s välein, 4 zoomia, ruutuajat) → muistivahdin uusinta jatka → lähizoom → tulos sinulle.
- Analysoi: (1) Onko alun VIKA poissa? Jatka-huipun pitäisi pudota 4,4–4,9 Gt:stä noin 2,6 Gt:hen, eikä keko saa nousta 0,5 → 2,7 Gt
  ~9 s jatka:n jälkeen. NUI:n "MATKAKIRJA keko:" -rivit kertovat, jääkö NostoSisalto- tai ElavatHetket-osuutta (NUI tai VS).
  (2) Lähizoomin huippu (b2a1d27b7: 3,78 Gt). (3) Loppurajauskuvat 3 zoomilla. Analyysiskriptit: lokit/natiiviseppa-muistihuippu-
  b2a1d27b7-1748/TULOS.md:n taulukko (fp-huiput N-riveistä, ms → kello L-rivin kuvaloki-aikaleimasta, keko kuvalokista).
- Tulos PT:lle ≤ 3 riviä + tiedosto.

## TEHTY TÄLLÄ VUOROLLA: Pariisin koealue OSA C valmis
- **proto 586b5e1a8**, haara natiiviseppa/koealue-esineet-218 (peili pushattu), wt/proto-natiiviseppa-koealue, VS:n k3:n 406ffee54 päällä.
  Pohja on NUI:n c60372ead (NUI teki 17.25; PT 18.5x: yhdistä, älä tee uudelleen). Saapuu-ennakon koealuerivi jäi pois, koska
  PiirrosKerros.Saapuu on vain NUI:n linjassa. Yhdistelmään: `var k = Koealue ? null : Keskusta(kaupunki);`.
- **PiirrosKerros.Esineet.cs** (korvaa Koealue.cs:n): yleinen kaikille kaupungeille (omistaja 18.43). Kaupunki = Resources/Esineet/<kaupunki>.json
  (origo, rajaus, kytkin, lajit: osakirjaston versioitu kuvapolku, ankkuri uv, suhde, korkeusportaat, varaa, paikat x/y/leveys/suunta).
  Kytkin "koealue" = Koealue = ElavaPariisi.Paalla (yksi kytkin VS:n pohjan kanssa; `koealue paalle` = `elavakartta pariisi 1`).
  PiirroksenKohta on null koealueella, joten kyltit ja nostot ovat todellisissa koordinaateissa.
- **Liikkuvat** (omistaja 18.44): AsetaLiikkuva(kuva, n, itä, pohjoinen, leveys, suunta) + KaupunginMetrit(lat, lon); muuttunut väli
  puskuriin kerran kehyksessä. PiirrosEsine.shader kääntää ankkurin ympäri (w = suunta). NUI:lle luvattu: NS siirtää veneet ja linnut
  (PiirrosKerros.Animaatiot.cs, NUI 6b891fd1d, natiivi-ui/animaatiot-isoisa4-218) esinekerrokseen, kun haarat ovat samassa junassa.
  Ristiriita: molemmat muuttavat Paivita-paluuriviä (veneetLiikkuvat = tahdetPyorivat = linnutLentavat = palloLiikkuu = false).
- **Kuvat**: Documents/kartta-osat/, MATKAKIRJA_OSAT tai ämpäri OsatOsoite = https://media.matkakirja.app/kohtaamiset/piirroskartta/kartta-osat/
  + kirjaston polku (isoisa-2029/esine/…-v1.png). **JU:n pitää viedä kirjaston kuvat ämpäriin ennen laitetta** (ei vielä pyydetty).
  Puuttuva kuva = laji jää pois + varoitus (väliaikainen merkki poistettu valovahdin takia).
- **Data**: proto-3d/_tyo/natiiviseppa/esineet/ (tee-esineet.py kaupunki-pariisi.json <proto>, saannot-isoisa-2029.json, kooste.py,
  tarkista-paikat.py). Pariisissa 11 kuvaa ja 2 555 esinettä (puut 2 458 / 5 143: rivit, puistot ja rannat ≤ 35 m), 58 kt. Paikat on laskettu
  WGS84-tangenttitasossa: KS:n enu poikkesi enintään 8,6 m, joten puut skaalattiin sovitteella (jäännös 0,1 m). Ero OSM:ään on 0,01 m.
  Kooste: proto-3d/lokit/natiiviseppa-koealue-20261103/kooste-ylhaalta.jpg. **KS hyväksyi ankkurit ja koot 19.0x.**
- KS:n osakirjastossa (_kirjasto/kartta-osat): tyokalu/esinekerros-data, tyokalu/esinekerros-kooste, data/esinekerros-saannot ja
  data/pariisi/esinekerros-maarittely.
- tarkista.sh: käännös 0 virhettä, vahdit ok. **Kartta-testit hylätty VS:n k3:n takia** (ElavaTyyli.cs:588: ElavaKoealue puuttuu
  testikäännöksestä). VS:lle on kerrottu 19.04.

## AVOIMET (osa C/D)
1. KS lähettää rivin, kun Louvren v2 (k2) on kirjastossa → aja `python3 -I tee-esineet.py kaupunki-pariisi.json <wt/proto-natiiviseppa-koealue>`,
   commit ja push. Kuvaa ei vaihdeta käsin.
2. Pelikuvat (osa D) kokoaa VS JU:n vuorolla (PT 18.5x: kokoaja = VS). Kun tulos tulee: korkeusportaat (puut 4→7 km, aukiot 6→10,
   nähtävyydet 12→20) ja ruutuajat / muisti isolla iPadilla ennen ja jälkeen.
3. Moni kaupunki: kytkin on vain "koealue" tai tyhjä. Toiselle ElavaKoealueelle tarvitaan VS:ltä nimihaku (ElavaKoealue.Nimella).

## JONO
0. ea09036dc-analyysi, kun JU:n tulos tulee. 1. Osa C/D:n avoimet (yllä). 2. Vanhan jonon kohdat ennallaan (354 ms PostLateUpdate →
xctrace; GC-haara vasta PT:n luvalla). Jos jono on tyhjä → "JONO TYHJÄ: Natiiviseppä" PT:lle.

## TILA
- Uudet: wt/proto-natiiviseppa-koealue (natiiviseppa/koealue-esineet-218 = 586b5e1a8). Älä poista.
- wt/proto-natiiviseppa-lahtoraja = natiiviseppa/lahto-raja-218 (80ea01172); wt/proto-natiiviseppa-haivytys = loppurajaus-9b9-218 (aaaed4758).
- Worktreet natiiviseppa-luovutus-1905, -1845, -1708 ja -20261103-1622 saa poistaa mergen jälkeen.
