# Pelikoodari → Codex: TILAUS 5 uutta muistokuvaa rikotuille esineille (KK 29.10. klo 09.57, pysyvä lupa)

Kiitos toimituksesta 459f75c54: A-kuvat ja B-muistokuvat on otettu käyttöön. Omistaja tarkisti yhteenvetoikkunat (08.19: "pop-up-ikkuna.
Minkä takana on esineen muistokuva"). Viiden esineen muistokuvassa on eri esine kuin pelin mallissa. Pelimallin näyttää sinun A-renderisi
(`posti/juoksupeli-rikotut-esinekuvat-20261029/A/<id>.png`). KK:n vertailukuva:
`/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/rikotut-muistokuvat-epasopivat-20261029.png`
(vasemmalla A-render, oikealla nykyinen muistokuva).

| id | nimi pelissä | pelin esine (A-render) | nykyinen kuva (väärin) |
|---|---|---|---|
| posliinimaljakko | Posliinimaljakko | valkoinen maljakko, ohuet siniset raidat | sininen kukkamaljakko |
| lakkarasia | Lakkarasia | punainen pyöreä rasia, kukkakuvioinen kansi | musta-kultainen suorakulmainen lipas |
| jadeastia | Jadeastia | vaalea avoin kulho, rengaskahvat | tumma kannellinen suitsutusastia |
| kello | Kello | kultakehys, sininen taustalevy, rengaspääty | koristeellinen kultainen rokokookello |
| kaaretaulu | Kääretaulu | vaakarulla punaisessa telineessä | seinälle ripustettu pystyrulla |

## Mitä tehdään
- Viisi uutta muistokuvaa samaan sarjaan: 768×1024 jpg, valokuvapinta, EI soikiorajausta. Nimet `<id>.jpg`.
- Kuvan esineen pitää olla täsmälleen pelin esine: käytä esikuvana saman id:n A-renderiä ja tarvittaessa ehjää mallia
  (MODEL-SOURCES.json). Muoto, värit, koristelu ja mittasuhteet täsmäävät.
- Omistajan muistokuplalinjat: esine aidolla paikallaan palatsissa ja vaaleassa tilassa. Kuva otetaan läheltä, syväterävyys on
  pehmeä ja vastavalo kevyt. Jokaisella kuvalla on oma asento ja kuvakulma (ei toistuvaa asetelmaa), ja mittasuhteet ovat luontevat
  ympäristöön ja ihmisiin nähden.
- Kuvauksen lähteenä ovat `.kupla`-avaimet (tai `.teksti`), tiedosto JuoksuV4/tekstit.fi.json, juoksupeli.rikkoutuva.<id>.*.
- Vertailuarkki: sama A-render | uusi muistokuva jokaisesta viidestä (`arkki.png`), sekä SHA256SUMS.

## Toimitus ja vastaanotto
Toimitus kansioon `posti/juoksupeli-rikotut-muistokuvat-5-20261029/` ja viesti `codex-pelikoodari-rikotut-muistokuvat-5-…md`.
KK tarkistaa kuvat, ja peliin ne menevät vasta omistajan valinnan jälkeen (vastaanotto PK). Muut yhdeksän muistokuvaa ovat kunnossa,
älä muuta niitä.
