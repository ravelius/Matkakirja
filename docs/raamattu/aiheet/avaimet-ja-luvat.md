# avaimet-ja-luvat · vastuu PT · tarkistettu 12.11.2026

TAVOITE: Pelaaja ei koskaan näe avainta, koodia eikä tunnusta: niitä ei ole sovelluksessa, lokissa eikä repossa. Työ ei pysähdy odottamaan avainta, joka on jo paikallaan, eikä mikään sessio laajenna omia lupiaan.

SÄÄNNÖT:
1. Avaimet ovat Macin ympäristössä (~/.zshrc ja ~/.matkakirja-avaimet-koodaus.zsh), GitHubin repo-salaisuuksissa ja gh-tunnus avainnipussa. Uusi sijainti lisätään tähän nimeltä. [R-12.2]
2. Ennen kuin avain todetaan puuttuvaksi, se etsitään nimellä kaikista sijainneista. Vasta kun sitä ei löydy, KK pyytää omistajaa lisäämään sen itse ympäristöön tai salaisuuteen. [R-12.3] [R-12.4]
3. Arvot ladataan hiljaa; avaintiedostosta katsotaan vain nimet. Paljastunut arvo kirjataan lokiin ja kerrotaan KK:lle; avaimen vaihdosta päättää omistaja. [R-12.5]
4. Pulun kehittäjäkoodi on GitHub-salaisuuksissa ja Macin avaintiedostossa, ehdotusavain vain GitHubissa; täysi Pulu-savuke saa ne vain työnkulun kautta, ja mittaus lähettää koodin otsakkeessa tulostamatta sitä. [R-12.3] [R-12.25]
5. Sovelluksessa avaimet ja koodit ovat vain laitteen avainnipussa, ei asetuksissa, binäärissä eikä lokissa. Kentät ovat salasanakenttiä vain kehittäjätilassa, ja App Store -käännöksessä ne ovat tyhjät. [R-12.6]
6. Claude-API laskutetaan omistajan Console-organisaatiosta: omistaja luo avaimen ja tallentaa sen salaisuuteen, Julkaisija vie sen workeriin. Macin vanhaa Claude-avainta ei käytetä. [R-12.7]
7. Julkaisija saa perua ilman kysymistä vain automaation samana päivänä luomat ylimääräiset varmenteet ja profiilit; vanhojen perumiseen tarvitaan omistajan lupa. Peruminen kirjataan, ja käyttökelpoinen allekirjoitusvarmenne säilyy. [R-10.15]
8. Lupa-asetusten, avainten ja CLAUDE.md:n muutokseen ei riitä KK:n välittämä päätös: tarvitaan omistajan oma viesti siinä ikkunassa. Tämä koskee myös vanhentuneen tiedon korjausta. [R-7.1] [R-7.45]
9. Lupa-asetustiedostoja ei viedä committiin. Jos sellainen on jo mainissa, rooli ei korjaa sitä, vaan kertoo KK:lle. [P-261101-1]
10. Session lupaikkunan hyväksyy vain omistaja sen omassa ikkunassa; PT ei välitä sitä. Tarpeet kootaan yhteen tai käytetään jo ladattua. [R-11.5]
11. Hylätty lupa tai esto koskee koko toimea: sitä ei muotoilla uudelleen, pilkota eikä ajeta skriptin tai toisen session kautta, ja lukko jää paikalleen. [R-7.25] [P-261105-4]
12. Lupaa ei kysytä siihen, minkä kortti tai PT:n käsky jo sallii. [R-7.34]

EI VIKA:
- Pulu-savuke ilman koodeja Macilla on osittainen.

TEKOTAPA:
- Avainten nimet: ~/.zshrc:n export-rivien nimet. Salaisuuksien nimet: secrets.-viittaukset .github/workflows/*.yml.
- Sallinnat ja hookit takaisin: tools/tyotavat/palauta-sallinnat.sh.
- Ostot ja generointiluvat: omistajan-kanssa. Komennot: agentit-ja-komennot.
