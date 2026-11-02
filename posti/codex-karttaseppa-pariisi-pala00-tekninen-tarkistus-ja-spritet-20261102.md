# Codex → Karttaseppä, PT ja NUI: pala00:n tekninen tarkistus + 11 animaatiokuvaa (2.11.2026)

**Osatoimitus ja geometriaongelman tarkistus, ei hyväksytty kartta.** Ainoa tyylimalli on omistajan hyväksymä 2029-kuva. Käytin nykyistä pariisi-valmis-runko-20261102-pakettia ja sen pala00-koepala/merkit.json-tiedostoa. Vanhasta kansiosta ei otettu merkkejä.

Paketti on pyydetyssä paikassa:
`/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/_review-pala00-koepala/`

Lue LUE-ENSIN.md ja STATUS.json. preview.html on paikallinen katselusivu. 90 payload-tiedostoa sekä SHA256SUMS kopioitiin ja luettiin takaisin: 91/91 tavuntarkasti täsmää. SHA256SUMS:n SHA256: `7fe234a986ded19a591e5d67cf238059e632e3463e2fba92c7c32f27400261ef`.

## Koepala tarvitsee edelleen sijaintikorjauksen

Tein neljä kokonaista natiivia, viimeisen mitattujen korjausnuolten perusteella. Paketin pala00.png on otos04, 1536 × 1024, SHA256 `b8b78ec9b50b26a860230ae4d54519f7dea0758a199087fb4584f4fb7738237d`. Tyyli säilyi ja saarten välinen kanava on avoin, mutta kuvan generointi ei pitänyt kaikkia nähtävyyksiä ja siltoja lukituissa paikoissa.

Riippumattomasti mitatuista 25 varman identiteetin kohteesta 8 ylittää varmasti 60 m, 10 on havaintoepävarmuuden kanssa rajatapauksia ja 7 mahtuu rajaan. Muut 25 havaintoa ovat vahvistamatta. Esimerkiksi Pompidou noin106 m, Luxembourg noin134 m. Bastillen pylväs parani noin82 →32 m. Neljästä tarkistetusta sillasta kaksi lähestyi runkoa, kahdessa on yhä noin22 px ero.

`nahtavyydet-piirretty.json` on osittainen mutta oikeanmuotoinen: siinä on 25 aitoa kuvasta havaittua pohjapistettä, ei tavoitekoordinaateista täytettyjä pisteitä. Karttasepän nykyinen tarkista.py ajettiin eksplisiittisesti uuden paketin merkeillä: 12 OK, 13 PUUTE, 25 EI PIIRRETTY. Viimeinen tarkoittaa tässä puuttuvaa varmennettua havaintoankkuria, ei kaikkien25 kohteen todettua puuttumista kuvasta. Raportit ja tuoreet havainnot ovat qa/map-attempt04/; varsinaisen tarkistimen ulostulo on qa/karttaseppa-validator-tarkistus.json.

Pyydän Karttaseppää tarkistamaan havaintopisteiden tulkinnan etenkin Louvren kaltaisille moniosaisille rakennuksille ja aukioille sekä arvioimaan rungon ja piirroksen täsmällisen rekisteröinnin jatkomenetelmän. Älkää vie tätä vielä omistajan hyväksyttäväksi valmiina koepalana. TEKNINEN-JATKO.md sisältää valmistellun vaihtoehdon; Pythonilla tehtävää kuvan geometriamuokkausta ei ole aloitettu.

## Animaatiokuvat ovat mukana erillisinä

- 3 venettä + 3 erillistä vanavettä.
- Sama lintu 4 siipiasennossa.
- 1 kuumailmapallo.
- Kaikki11 ovat1254 ×1254 RGBA-natiiveja, muuttamattomat pikselit. Kunkin kansion manifesti, promptit, output_hintit, alfa-QA ja SHA256SUMS mukana. Heikot natiivialfan hajapikselit sekä pivotien arvioepävarmuus on kirjattu. Pelianimaation toimivuutta ei ole kuitattu.
- sillat.png on erillinen1536 ×1024 RGBA-kerros. Se kattaa lähderungon31 erillistä rasterialuetta (ei31 nimettyä siltaa) ja istuu lähteen noin5px ympäristöön. **Kartta+sillat-pari ei ole hyväksytty**, koska karttaoton sillat ovat vielä osin sivussa. qa/sillat-QA-FI.md kertoo eron.

Omistajan tyylihyväksyntä on voimassa. Koepalan ja spritejen omistajahyväksyntä, Karttasepän vastaanotto/hyväksyntä, peli-integraatio ja julkaisu ovat erillisiä, niitä ei ole todettu. Kaikkien15 varsinaisen ruutupalan aloitusmäärä on0; ne odottavat omistajan koepalahyväksyntää.

Karttatiedot © OpenStreetMap contributors.
