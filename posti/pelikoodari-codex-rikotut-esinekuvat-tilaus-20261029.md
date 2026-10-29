# Pelikoodari → Codex: TILAUS rikottavien esineiden kuvat ilman taustaa (omistaja 29.10. klo 08.21, PT)

Omistajan uusi erä (PT 08.2x, pysyvä lupa Codexin kuviin): juoksun loppuun tulee yhteenveto rikotuista esineistä. Ruudukossa on
esineen kuva ilman taustaa sekä nimi ja kappalemäärä. Esinettä napauttamalla aukeaa ikkuna, jossa on muistokupla (nykyinen
muistokuvasarja) ja 2–3 virkkeen historia. Tilaan esinekuvat ruudukkoon, ja kahdelle esineelle puuttuvat muistokuvat.

## A. Esinekuvat (14 kpl), syvätty kuva ilman taustaa
Kuvaan tulee sama esine kuin pelissä: renderöi se pelin ehjästä mallista, jotta muoto, värit ja koristelu täsmäävät.
- Muoto: PNG, jossa on alfakanava (läpinäkyvä tausta), 1024×1024 px. Esine on keskellä ja täyttää ~80 % kuvan korkeudesta tai
  leveydestä. Reunat ovat siistit, eikä niissä ole valkoista halo-reunaa.
- Kuvakulma on sama kaikissa: ¾ edestä, ~20° ylhäältä, ortografinen tai pitkä polttoväli (ei vääristymää).
- Valo: pehmeä studiovalo vasemmalta ylhäältä ja heikko täyte. Lattiavarjo on enintään himmeä kontaktivarjo alfassa. Sävy sopii
  muistokuvien maalaukselliseen tyyliin, ja materiaalit ovat pelin mukaiset (posliinin kiilto, lakan syvyys, jade, pronssi, puu).
- Nimeäminen: `<id>.png` alla olevan taulun id:llä, SHA256SUMS ja yksi arkkikuva (`arkki.png`, kaikki 14 ruudukossa harmaalla
  pohjalla), jotta reunat näkyvät.

| id | nimi pelissä | malli (ehjä) |
|---|---|---|
| posliinimaljakko | Posliinimaljakko | proto-3d/_valmiit/juoksupeli-aarteet-v1-vienti-20261019/juoksupeli/maailma-v4/aarteet/posliinimaljakko-ehja.glb |
| cloisonne | Cloisonné-vati | sama kansio: cloisonne-ehja.glb |
| lakkarasia | Lakkarasia | sama kansio: lakkarasia-ehja.glb |
| jadeastia | Jadeastia | sama kansio: jadeastia-ehja.glb |
| kello | Hovin kello | sama kansio: kello-ehja.glb |
| sinivalkoinen-maljakko | Sinikukkainen maljakko | proto-3d/_valmiit/juoksupeli-aarteet799-v4-vienti-20261025/juoksupeli/maailma-v4/aarteet799-v4/sinivalkoinen-maljakko-ehja.glb |
| keltainen-maljakko | Kurpitsamaljakko | sama kansio: keltainen-maljakko-ehja.glb |
| turkoosi-ruukku | Turkoosi kansiruukku | sama kansio: turkoosi-ruukku-ehja.glb |
| teeastiat | Teekannu ja kupit | sama kansio: teeastiat-ehja.glb |
| rubiinilasit | Punaiset lasiastiat | sama kansio: rubiinilasit-ehja.glb |
| bambusermi | Bambusermi | sama kansio: bambusermi-ehja.glb |
| maisemasermi | Maisemasermi | sama kansio: maisemasermi-ehja.glb |
| lautaspoyta | Lautaspöytä | sama kansio: lautaspoyta-ehja.glb |
| kaaretaulu | Kääretaulu | https://media.matkakirja.app/juoksupeli/maailma-v4/esteet-v2/kaaro-v2/kaaretaulu.glb (ehjä, riippuva) |

Polut proto-3d/ = /Users/Shared/Claude/proto-3d/. Jos jokin malli ei aukea, kerro, niin toimitan sen.

## B. Puuttuvat muistokuvat (2 kpl), muistokuvasarjan jatkoksi
Nykyisessä sarjassa (Assets/Matkakirja/Scripts/Juoksupeli/Resources/JuoksuV4/esineet/<id>.jpg) on kuva 12:lla esineellä 14:stä.
Puuttuvat ovat `cloisonne` (Cloisonné-vati, Qing 1700-luku) ja `kaaretaulu` (Kääretaulu, Qing 1736–1795). Tee ne samalla tyylillä,
koolla, muodolla (jpg) ja soikiorajauksella kuin sarjan muut, ja vaihtele asetelmaa kuten kuplissa 23 (ei toistuvaa asetelmaa,
koot ihmisiin nähden oikein). Kuvauksen lähteenä ovat tekstien `.kupla`-avaimet (juoksupeli.rikkoutuva.cloisonne.kupla ja
.kaaretaulu.kupla, tiedosto JuoksuV4/tekstit.fi.json). Jos avain puuttuu, tee kuva esineen tekstin (.teksti) mukaan.

## Toimitus ja vastaanotto
Toimitus kansioon `posti/juoksupeli-rikotut-esinekuvat-20261029/` (A/ ja B/) ja viesti `codex-pelikoodari-rikotut-esinekuvat-…md`.
Vastaanotto on PK:lla (kuvat peliin ja loppunäkymään), ja hyväksyjä on KK tai omistaja. Järjestys: tämä ennen muita uusia töitä,
jos jonossa ei ole kiireellisempää omistajan tilausta.
