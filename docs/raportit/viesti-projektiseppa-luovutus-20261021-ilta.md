# Projektiseppä (ent. Siirtoseppä): luovutus 21.10.2026 klo 18.17

Rooli: Projektiseppä (Opus, high), kansio /Users/Shared/Claude/Matkakirja-siirtoseppa. Olavinlinna on yhä **TAUOLLA** (omistaja
19.10. klo 17.05). Edellinen luovutus: viesti-projektiseppa-luovutus-20261019-ilta.md (9b62c342a); sen Olavinlinna-osa on voimassa.
Nollauksen syy: PT 18.1x ("kontekstisi 27 %, tee luovutus ja nollaus luontevassa kohdassa"), jono tyhjä.

## KÄYNNISSÄ LUOVUTUSHETKELLÄ
- Ei mitään: ei ajoja, agentteja eikä avoimia PR:iä. Erä-worktree wt/projektiseppa-asemataulu-tyonkulku poistettu.
  Proto-worktree /Users/Shared/Claude/wt/proto-projektiseppa-linna-botti (linna-botti-10) jää tauon ajaksi kuten ennen.

## ENSIN seuraajalle
1. Rivi PT:lle: aloitettu ja levossa ("JONO TYHJÄ: Projektiseppä"), ellei PT anna erää.
2. PT:n mainitsema tuleva erä: B testaus `docs/tuotanto/tekotavat/testaus.md` Laitetestaajan kanssa (studiojako, Raamattu 4.21
   STUDIOJAKO; lähteet: `docs/moduulit/tuotantopohjat/tuotantoputken-tarkistukset.md`, Raamattu 9.x). Vasta PT:n erästä.
3. Linnaan ei kosketa ennen tauon purkua (jatko: docs/raportit/olavinlinna-valmiiksi-lista-20261019.md osio 6).

## Tehty 21.10. 17.26–18.17
- **#5137 (da69fb086) Asemataulu päivittää itsensä:** synkka.py ajaa joka viennin alussa `TAULU/asemataulu.py --kierros`: koodi
  ja ohje origin/mainista (`_ennen-repoa/` talteen), nykyinen.json vain kun osoite/id:t muuttuvat ja osoitekirja on ehjä; hiljainen
  kun mikään ei muutu. KOODI-listaan tyolistavahti.py ja asemataulu.py; testi valvoo, että kaikki kansion koodi on listalla.
  Lähde nykyinen.json `lahde.repo` = /Users/Shared/Claude/Matkakirja-fable. Ajettu 17.48; todennettu: #5151 päivittyi TAULU:un
  itsestään Asemataulun kierroksella 18.07.
- **#5151 (5c00abc78):** synkka tarkistaa taulun `talo/eteneminen`-dokumentin (NS/JU kirjoittavat suoraan) → rivi
  `TARKISTA|eteneminen|…|<kirjoittaja>` kerran per sisältö; aloitusviestistä vanha id pois.
- Postivahti vaihtoi KIERROS.md:n Boost-herätyksen lukemaan nykyinen.json:sta (sen oma kansio, ei commitoitu; tarkistettu).
- Työlistan rivi "Asemataulu yhdeksi tarkaksi työnkuluksi" → PT:lle **RIVI VALMIS** 18.08.
- **#5145 SULJETTU (ei mergetty)** omistajan studiojaon (18.02) takia: Tarkista ennen -osiot (tarkistukset, esirenderöity video,
  NS:n ja NUI:n tarkennukset) ja testivaatimus. PT kokoaa AINA/EI-rivit D:n lupataulukkoon; haara
  `projektiseppa-tarkista-ennen` (4827047a9) jää lähteeksi.
- Taiteen esimerkkikuvakokoelma (PT 18.1x) PERUTTU ennen tuotosta (omistaja 18.07: läpikäynti tekstinä ja korteilla).

## Opit
- Komento, joka "pitää muistaa ajaa mergen jälkeen", ei toimi: #5120:n ohje oli työkansiossa 16 h vanhana. Päivitys kuuluu
  kierrokseen, joka ajetaan joka tapauksessa.
- JS-regexin `\w` ei osu ä/ö-kirjaimiin (testi `kysym\w* omistajalle` ei löytänyt "kysymystä") → `\S` tai u-lippu.
- Rinnakkaisten PR:ien yhteinen testi: tiukka "lista vain lyhenee" kaataa CI:n mergejärjestyksestä riippuen → valmis kohde
  tulostaa HUOM eikä kaada.
- Kysy kanavan kautta ennen kuin kirjoitat pohjiin: studiojako sulki #5140–#5145 tunnin sisällä niiden avaamisesta.

## Avoimet (muiden)
- TAULU/hoitaja/: vanhoja kertaskriptejä (kierros_a_*.py, s.py, vrt*.py 14.–18.10.), eivät käytössä; Asemataulun kansio, ei poistettu.
