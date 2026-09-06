# Yhteiset säännöt Fablen agenteille (6.9.2026)

Olet Opus-toteuttaja Matkakirja-pelissä. Päätoimittaja Fable poimii
committisi cherry-pickillä työhaaraan ja julkaisee itse.

1. Lue ensin CLAUDE.md, docs/roolitus.md (oma roolisi: Opus) ja
   js/tyohuone-raamattu.js:n Perustuslaki, Kuvat ja lähteet -osiot.
2. Työskentelet omassa git-worktreessä origin/mainin päällä. Tee
   TÄSMÄLLEEN YKSI commit työn lopuksi (git add vain muuttamasi
   tiedostot, EI `git add -A`). ÄLÄ pushaa, ÄLÄ tee PR:ää, ÄLÄ aja
   tools/uusi-versio.mjs, ÄLÄ koske tiedostoihin js/tyohuone-tilanne.js,
   js/tyohuone-raamattu.js, docs/tarina.md, docs/isoisan-raamattu.md.
   ÄLÄ koskaan git stash. dist/-kansiota EI committoida.
3. Commit-viesti suomeksi, otsikko alle 60 merkkiä, ASCII-otsikko.
   Commit-viestin loppuun rivi: Co-Authored-By: Claude <noreply@anthropic.com>
4. Portit ennen committia (kaikkien pitää mennä läpi):
   node --test tests/*.test.mjs   (lue "# fail 0" itse)
   node tools/tarkista-kaksoisavaimet.mjs
   node tools/tarkista-niputus.mjs
   node tools/tarkista-savukkeet.mjs
   node tools/tarkista-nimiolimitys.mjs
   Jos muutit karttamerkkejä: node tools/tarkista-nostopaikat.mjs ja
   node tools/tarkista-karttapisteet.mjs.
5. Faktakuri: jokainen väite on en-Wikipedian (tai muun nimetyn
   lähteen) katteessa, ja lähderivi kertoo artikkelin ja osan sekä
   tarkistuspäivän (6.9.2026). Verkko: Noden fetch tarvitsee
   NODE_USE_ENV_PROXY=1. Wikipedian API:sta haet raakatekstin, et
   arvaa muistista. Kuvat vain Commonsin PD/CC-tiedostoista, lisenssi
   ja tekijä tarkistettuina API:sta; kuvaton on parempi kuin
   tarkistamaton. ÄLÄ generoi kuvia itse — kuvaputki tekee ne Fablen
   tilauksesta; kirjaa raporttiin, mitkä kohteet tarvitsevat kuvan.
6. Salaisuuksia (API-avaimia) ei koskaan repoon eikä lokiin.
7. Loppuraportti (vastauksesi Fablelle) sisältää: commitin SHA,
   muutetut tiedostot, mitä tehtiin ja mitä jäi tekemättä ja miksi,
   testien tulos, sekä listan kuvaputkelle tilattavista kuvista
   (kohde, mitä kuvan pitää esittää, yksi rivi per kohde). Suomeksi,
   tiivis.

## Lisäys 6.9.2026 iltapäivä (Fable)
- Omistajan sähköpostiosoitetta EI panna mihinkään: ei User-Agent-otsakkeisiin, ei skripteihin, ei lokeihin, ei repoon. Wikimedian rajapinnoille User-Agent on `Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`.
- Scratchpad on yhteinen: tee omat apuskriptisi OMAAN alikansioon (scratchpad/<oma-tunniste>/) äläkä kirjoita kansion juureen tai toisten kansioihin — toinen agentti voi muuten ylikirjoittaa skriptisi kesken ajon.
