# Natiivi-UI → Codex: ISS-kuvan oton ympyräikkuna, TASAN 1 kuva (omistaja 18.10. 16.14, juna 204 B2)

**Generointilupa: TASAN 1 kuva** (omistajan lupa 18.10.2026 klo 16.14 Keskustelukanavan kautta; Päätoimittaja välitti 19.10.).
Yksi kutsu, ei uusintoja eikä lisäyrityksiä ilman uutta lupaa. Jos kutsu hylätään, älä yritä uudelleen; raportoi kuten aiemmin.

## Käyttö
ISS:n Cupolassa pelaaja ottaa kuvan Maasta. Nyt kuva avautuu koko ruudulle suorakaiteen muotoisen ikkunan kehyksessä.
Omistaja haluaa (sanatarkasti): "tilaa kodexilta ympyrän muotoinen ikkuna kuvaa varten jotta näkymä on sama kuin pelissä. ympyrä ikkuan
saa kuitenkin mennä sivureunoilta hieman yli ja alas saa jäädä tummaa seinää minkä päälle tulee tekstit. ikkuna voisi rajautua ylhäällä
kokonaan näkyviin ja jäädä vain pieni tumma marginaali yläreunaan."

Peli asettaa otetun kuvan ikkunan lasin taakse ja kirjoittaa tekstit (paikka, koordinaatit, kuvaustiedot, ISS-merkki) seinälle ikkunan alle.

## Kuva (yksi PNG, pysty)
- Koko **1536 × 2304** (2:3), PNG **alfakanavalla**: ikkunan lasin alue (ympyrän sisus) **täysin läpinäkyvä** (alfa 0), ei heijastuksia
  eikä lasin sävyä lasin alueella. Kehys ja seinä täysin peittäviä.
- **Ympyräikkuna = pelin Cupolan keskimmäinen pyöreä ikkuna** (viite `natiivi-ui-iss-ympyraikkuna-20261019/viite-cupola-peli-iphone.jpg`,
  pelin oma kuvakaappaus): tumma harjattu metallirengas, pultit, harmaat kiinnikepalat ja **oranssi hihna/kahva ylhäällä keskellä**,
  samat sävyt ja sama valaistus kuin viitteessä. Näkymän pitää tuntua samalta kuin pelissä.
- **Mitoitus:** renkaan ulkohalkaisija ≈ **108 % kuvan leveydestä** (menee kummaltakin sivulta ~4 % yli reunan), keskitetty vaakasuunnassa.
  **Ylhäällä** rengas kokonaan näkyvissä, sen yläpuolella vain kapea tumma seinämarginaali (~3–4 % kuvan korkeudesta).
- **Alas** ikkunan alle tasainen **tumma seinä** (Cupolan sisäpaneeli: hyvin tumma harmaa/sinimusta, himmeä, hienovarainen tekstuuri,
  ei kuvioita, ei tarroja eikä tekstejä) noin **alin 30 %** kuvasta. Seinän alaosa tasainen, jotta peli voi rajata kuvan iPhonelle
  (korkeampi) ja iPadille (matalampi) ja tekstit erottuvat sen päällä.
- Fotorealistinen, hillitty; ei tekstiä, ei logoja, ei astronauttia, ei pikkumaapalloa, ei käyttöliittymää.

## Toimitus
`posti/natiivi-ui-iss-ympyraikkuna-20261019/ympyraikkuna.png` (+ lyhyt QA: alfan tarkistus, renkaan halkaisija ja yläreunan marginaali
pikseleinä) ja vastaus `posti/codex-natiivi-ui-iss-ympyraikkuna-20261019.md`. Keskustelukanava tarkistaa tuloksen; Natiivi-UI liittää
kuvan peliin (juna 204).
