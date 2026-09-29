# Natiivi-UI:n luovutus 29.9.2026 (ag), TILINVAIHTO klo 16.1x

Jatkaa luovutusta (af). Päätoimittaja: Opus (xhigh). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, master
cbf78690 (BUILD 50). Omat simulaattorit iPhone 17 FB234D08 ja jaettu iPad Pro 11 503000D1, molemmat SAMMUTETTU. Käännökset ja
laitevuorot antaa Julkaisija NYT-viestillä, yksi simulaattori kerrallaan. Käännökset aina `nice -n 15`. Väliaikaisen
Pro Max -simulaattorin saa luoda (`xcrun simctl create "NatiiviUI-ProMax" …iPhone-18-Pro-Max …iOS-27-0`), ja se poistetaan
kuvauksen jälkeen.

## TILA: ei keskeneräistä työtä eikä avoimia merge-pyyntöjä

Kaikki tämän vuoron erät ovat masterissa:

| Haara | SHA | Sisältö |
|---|---|---|
| natiivi-ui/iss-nahka | fb1465ed | ISS-säätöpaneeli Codexin nahalla |
| natiivi-ui/maakuntalappu | 6d642c8a | lappu napin päälle + ✕, kortti kiinteä, avaus/sulku animoiden |
| natiivi-ui/minipulu | f28a3040 | iso Pulu piiloon kuvaselaimessa |
| natiivi-ui/avaukset | 222ce07e | UI/Ponnahdus.cs (webin avaus/sulku, tarkat bezier-kaaret, kello ≤ 50 ms/ruutu) + 8 pintaa |
| natiivi-ui/luenta-reitti | d33f6df6 | luennan alkukatko: klippi kohdetasolla, äänisessio vain väärästä |
| natiivi-ui/pelaajan-nakyma | 9652f810 | maailmatilan silmänappi, himmeät kaupungit (KaupunkiMerkit.Himmeat) |
| natiivi-ui/kartuscha-liike | af008b7f | kartuscha kasvaa nimilaatasta (webin kartuschanLiike) |
| natiivi-ui/ponnahdus-herata | 6c3df126 | Ponnahdus herättää ruudunpäivityksen, Pulu.Peita vain lintu |
| natiivi-ui/pillerivalikko | 12ed8b69 | yläpalkki: logo vas., ☰ pois, kaksirivinen pilleri oik.; pillerivalikko (Linssit/Aarteet, esikatselu) |
| natiivi-ui/ylapalkki-nahka | 44b742e5 | matkalaukkunahka iPhonelle (Resources/MatkakirjaUI/Ylapalkki, 2048 px) |

Worktreet: vain `wt/proto-natiivi-ui-pulu-karttavaisto-codex` (samireivisen omistama, en voi poistaa; komento Postivahdille).

## SEURAAVAT (odottavat muita)

- iPadin yläpalkin nahka: kun Codexin iPad-versio tulee (paketti ~/Documents/Codex/<pvm>/ylapalkki-matkalaukku, käyttäjä
  samireivinen). iPhonen toteutus: Ylapalkki.PueNahka + Matkakirja.uss .mk-ylapalkki--nahka.
- Pelikoodarin webin pillerivalikko PR #3624: jos mitat muuttuvat, vertaa proto-3d/lokit/pillerivalikko/mitat.md.
- Linssiseppä: kuvanäkymän animaatio omassa haarassaan (Ponnahdus). Aanet Taso(Puhe) -korjaus Linssisepällä.

## PÄÄTÖKSET TÄLLÄ VUOROLLA

- Maakuntakortin korkeus lukitaan avaushetkellä sisällön mukaan (b31ec2e ei vika, Päätoimittaja).
- Saapumisen valokuvakortti ilman kehystä (löydös 138): web seuraa natiivia (Pelikoodari).
- Pilleri: "rahat" + "Päivä N, vuorokaudenaika" kahdella rivillä puhelimella, iPadilla yhdellä rivillä "· "-erottimella; N/80 pois.
- Yläpalkin keskivyöhyke: leveimmän saaren 130 pt + 2 × 12 pt (Ylapalkki.LeveinSaari, SaarenMarginaali).

## TYÖKALUT

Skriptit proto-3d/lokit/natiivi-ui-1035/skriptit/: k.sh (komentotiedostot), parial.py (kuvapari, nimiö alas), saari.sh
(yläpalkki + pillerivalikko, UDID parametrina), pilleri.sh (valikko, kartuscha-video, pelaajan näkymä), mk4.sh (maakunta),
avaukset.sh (animaatiovideo), alku2.sh (luennan A/B). Liikkeiden mittaus videosta: liikkeet.py <video> <kehyskansio> (samassa kansiossa).
Testikomennot: ui pilleri [paa|linssit|aarteet] [n], ui maakunnat kysymys n|sulje, ui kartuscha kiinni, kehittaja
maailma|pelaaja 0|1|nakyma, puhe alku vanha|uusi, puhe jumi ms.

## OPIT

- proto-kaanna.sh kaatuu, jos haara on vanhentunut masteriin nähden: merge master haaraan ennen pyyntöä (git merge-tree -tarkistus).
- Tarkista commitin ehto: `tarkista.sh | grep virheitä` ei estä committia; käytä `| grep -q "yhteensä 0" && git commit`.
- UI Toolkit: ID-valitsimet (#unity-tracker) voittavat luokkavalitsimet; UITK ei tue cubic-bezieriä eikä clip-pathia.
- Unity käynnistää soiton vasta Play()-ruudun lopussa: jumi samassa ruudussa viivästää, jumi soiton alettua mykistää.
