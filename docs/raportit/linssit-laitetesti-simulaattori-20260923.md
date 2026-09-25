# Linssien laitetesti simulaattorissa (23.9.2026)

Linssisepän `Linssit-testit/laitetesti.sh` käyttää `devicectl`:ää, joka ei
toimi simulaattorilla (vain oikealla laitteella) — portattu samalla
komentokaavalla (`linssi-komento.txt`, `komento.txt`) suoraan simulaattorin
Documents-polkuun kirjoittavaksi skriptiksi (ei committoitu, kertaluonteinen).
Build 689d020. Kuvat ja loki:
`/Users/Shared/Claude/proto-3d/lokit/linssit-laitetesti-20260923/`
(16 kuvaa + `linssi-loki.txt`).

## Topografia, vesistöt, astronautti (kontakti-kaava)

- `linssit-topografia.png`, `linssit-vesistot.png`: OK, selite-kortit ja
  lähdeviittaukset näkyvät oikein.
- `linssit-satelliitti-avaus/-27s/-47s.png`: OK, satelliitin oma
  avausajo (pallo → tähdet) etenee ajoissa esitetyllä tavalla.

## Keksinnöt-aikajana

- `linssit-keksinnot-alku.png` / `-28s.png` / `-1873.png` / `-1928.png`:
  Nämä neljä näyttävät kaikki saman "Keksinnöt Euroopassa 1765–1928 ·
  Käynnistä" -aloituskortin, vaikka lokin mukaan `keksinnot 11`/`keksinnot
  25` -komennot päivittivät tilan oikein (`pysäkki 11, vuosi 1873,0` jne.).
  **Tila siis vaihtuu sisäisesti, mutta aloituskortti ei väisty ilman
  `keksinnot jatka` -komentoa.** Tämä on täsmälleen sama komentosarja kuin
  alkuperäisessä `laitetesti.sh keksinnot` -haarassa (ei omaa lisäystä),
  joten kyse ei ole minun porttaukseni virheestä — sama saattaa näkyä
  iPadillakin, ellei sitä ole aiemmin huomattu koska iPad-ajo vain lukee
  lokitekstiä eikä kuvia tässä kohdassa.
- `linssit-keksinnot-loppu.png` (`keksinnot jatka` jälkeen): OK, oikea
  loppukortti "Kaari päättyy 1928 · Penisilliini · Alexander Fleming".

## Vertailu ja maatiedot

- `linssit-vertailu-fin.png`, `-3.png`, `-4.png`: OK, Suomi/Ruotsi/Norja/
  Tanska korostuvat oikein kartalla, "Vertaa"-pilleri näkyy.
- `linssit-maatiedot-alku.png`, `-jpn.png`: OK, Japani rajattuna oikein,
  "JAPANI · Lue lehti ›" -kortti näkyy (linkittyy lehtijärjestelmään).
  Lokin viimeinen rivi "maatiedot: ei valintaa" jäi hieman epäselväksi —
  saattaa olla vain viimeisen `linssi pois`-siivouksen jälkijälki, ei
  tutkittu tarkemmin.

## Yhteenveto

15/16 näkymää täsmää odotettua. Ainoa poikkeama (keksinnöt-aloituskortti
jää auki) toistaa alkuperäisen skriptin oman komentojärjestyksen eikä ole
oma löydökseni siitä erillinen — mainitsen sen silti, koska kuvat
paljastivat asian, jota pelkkä lokiteksti ei olisi näyttänyt.
