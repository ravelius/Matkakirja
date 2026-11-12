# media-ja-ampari · vastuu JU · tarkistettu 12.11.2026

TAVOITE: Pelaaja saa kuvat, äänet, laatat ja mallit pelin omalta palvelimelta, eikä uusi vienti riko asennettua versiota. Selainversio pysyy pelattavana, mutta peli tehdään sovellukseen.

SÄÄNNÖT:
1. Pelin lataama media tulee omasta ämpäristä; alkuperäinen osoite on vain varareitti. Uusi kuva- tai äänilähde tulee peliin vasta, kun peilaus kattaa sen osoitteet. [R-11.2]
2. Uusi media, myös itse tehty, viedään ämpäriin alkuperäisessä laadussa eikä repoon; pelin repossa ei ole äänitiedostoja, ja sovelluksen mukana kulkevat tehosteäänet ovat Unity-projektissa. Sovelluksen pikkutiedostot (miniatyyrit, liput) saavat olla repossa. [R-11.3] [R-5.14]
3. Ämpäriin ei kirjoiteta suoraan. Vienti on paketti, jossa on ämpäripolut, tarkistussummat ja lähdeluettelo lisenssirivein; tekijä ajaa kuivan tarkistuksen ennen pyyntöä. [R-11.26]
4. Julkaisija vie paketin omistajan pysyvällä luvalla, kun vie-paketti.sh:n tarkistukset menevät läpi myös kuivana ja paketti on se, jonka tekijä ilmoitti. [R-11.26] [P-261025-1]
5. Ämpärin polkua tai ilmoitettua pakettia ei muuteta, koska laitteet ja välimuisti pitävät vanhan: muutos saa uuden polun tai versiokansion ja uuden paketin. Ylikirjoitus on vain omistajan käsiajo. [R-11.26] [P-261101-4]
6. Vienti muuttaa julkaistua peliä heti, koska osoittimet (uusin.json) ovat yhteisiä kaikille versioille. Data, jota vanha sovellus ei osaa, sidotaan kiinteään tiivisteeseen tai uuteen versioituun osoittimeen; oleellisesti kasvavasta aineistosta paketin tekijä pyytää Natiivisepän vahvistuksen, että julkaistu versio kestää sen. [R-9.8] [P-261031-2]
7. Ämpäristä ei poisteta sarjaa, johon käytössä oleva tai julkaistu sisältö viittaa. Poistettava kuva arkistoidaan tarkistussummineen NAS:lle ensin. [R-11.10] [P-261103-2]
8. Selainversio on ylläpidossa: pelaajalle näkyvät viat korjataan, muut web-muutokset odottavat web-jonossa yhteistä erää. Webiin ei tehdä pariteettityötä eikä luonnoksia. [R-6.2]
9. Natiiviin siirretään vain voimassa oleva sääntö, ei webin koodia. Alustojen ero ei yksin ole syy muutokseen: ero PT:lle rivinä, ja KK päättää. [R-6.4] [R-6.2] [P-261111-5]
10. Selainversio on ES-moduuleja ilman käännösvaihetta; yhden tiedoston versio syntyy julkaisussa, eikä sitä viedä repoon. [R-6.19]

EI VIKA:
- Tarkan osoitteen tietävä voi ladata yksittäisen tiedoston ämpäristä.
- Juuri viety tiedosto voi hetken näkyä puuttuvana välimuistin takia.
- Selainversiosta puuttuu sovelluksen uusia näkymiä.

TEKOTAPA:
- Viennin ajo: Julkaisijan vie-paketti.sh, ensin kuivana (portit ajetaan kuivassakin); viennin jälkeen julkinen osoite tarkistetaan (200, CORS, tarkistussumma).
- Peilaus: tools/peilaa-media.mjs.
- Olemassaolo katsotaan ämpäriluettelosta (amparin-luettelo.tsv), ei suorilla pyynnöillä.
- Selainversio: pages.yml; odottavat muutokset docs/web-jono.md.
