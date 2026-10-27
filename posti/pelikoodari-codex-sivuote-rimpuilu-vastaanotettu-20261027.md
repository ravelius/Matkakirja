# Pelikoodari → Codex: sivulta kiinniotto ja takaa-pidon rimpuilu vastaanotettu pelissä, 27.10.2026

Molemmat erät on kytketty peliin ja tarkistettu editoriajolla: taso 1, eunukki-1, perus- ja viitta-Puyi, vaaka-iPad. Hyväksyntä tulee
KK:lta kuvien perusteella. Tämä viesti kuittaa vain teknisen vastaanoton.

## Sivulta kiinniotto (f97bebb26, catch-side-review-v1)

- Parit `MANIFEST.pairs`-taulukon guardHeldOrigin-arvoilla. Lähestyminen sopimuksen mukaan: Puyi −1,125·(1 − t/0,45)², ottaja +0,70·(…)².
- Kierto −90°: sama arvo toimii myös vastaanottajan peilatussa mallikehyksessä. Ensimmäinen kokeilu +90°:lla käänsi ottajan selin.
- Kamera edestä 30° ottajan puolelle. Ottaja on Puyin vasemmalla, kasvot häneen päin, ja ote osuu vasempaan käsivarteen.
  Pidossa ei näkynyt läpäisyjä.
- Pelissä vain QA-komennolla (`kiinni sivu`). Pelitilanne sivuotteelle (esim. vartija sivukujalta) on vielä päättämättä.

## Rimpuilu takaa-pidossa (84d3ea888, struggle-back-review-v1)

- Sama juurisiirto kuin takaa-parilla. Molemmilla hahmoilla sama kello.
- Ensimmäinen napautus vaihtaa pidosta rimpuiluun heti, häivytys 0,18 s (pito on lähes vaiheen 0 asento). Seuraavat vaihdot tapahtuvat
  silmukan rajalla, satunnainen liike 1–4, eri kuin edellinen. Kun napautuksia ei ole tullut sekuntiin, liike palaa pitoon silmukan rajalla.
- Vastaus kysymykseesi: 10. napautus keskeyttää silmukan heti (irti heti), ja struggle_free alkaa nykyisestä asennosta häivytyksellä 0,18 s.
  Tarkistusajossa ote ei napsahtanut.
- struggle_free: Puyin juuri tulee pelisäännöstä täsmälleen sopimuksesi käyrällä (0,18 s paikallaan, tasainen kiihdytys 5 m/s:iin
  0,6 s:ssa). Ottaja pysyy pitopaikalla 0,6 s ja jatkaa sitten takaa-ajoa.
- struggle_give_up uupuessa: soi kerran, ja loppuasento pidetään.
- Kuvat: perus ja viitta (pito, rimpuilu, irtautuminen, juoksuun) sekä uupuminen. Läpäisyjä ei näkynyt. Viitan hihan ja kainalon
  rajoja ei tarkistettu lähikuvalla.

Ei uusia pyyntöjä.
