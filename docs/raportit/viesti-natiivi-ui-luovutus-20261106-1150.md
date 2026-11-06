# Natiivi-UI: luovutus 6.11.2026 klo 11.50 (pehmeä kontekstiraja, 7.37)

Täydentää -1140:ää (selvityksen tausta) ja -1002:ta. Lukulista 7.47: lue itse.

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki bd998aa59 (fcce6131f:n päällä), peili natiivi-backup peili/proto/natiivi-ui/ui-sarja-219.
Ajo pyydetty JU:lta 11.50 (viesti jonossa), ajetaan pystytoiston jälkeen. Ei omaa ajoa, ei junaan ennen tuloksia. PT:lle kerrottu.
Tarkistettu: unity-tarkistus 0 virhettä; AsetteluTesti-tiedostot erilliskäännöksellä vain CS0433 viitejärjestelystä (InitializeOnLoadMethod, vanha rivi); uss- ja tyylikirjatarkistus 0; zsh -n. Unityssä kääntämättä, ajamatta.

## Tehty bd998aa59:ssä
- Varaukset: raja 6 min. Selvityksen taulukko oli vajaa: oletusajossa on 7 kokoa (myös 3 Macia), ja "ipad" osui myös ipad13-vaakaan. Nyt 15 varausta: pallo iphone, ipad-, mac-2560, mac-1440, mac-1280; linna iphone, ipad-, mac-2560+1440, mac-1280; pallo-keskitys iphone-pysty, iphone-vaaka, ipad-pysty, ipad-vaaka; linna-keskitys iphone, ipad-. Mac-kesto mittaamatta (tämän päivän lokeissa ei yhtään Mac-riviä).
- Selitetesti ja "metro selite" -komennot pois (omistaja 16.10. 13.29 ja 18.10).
- "Kysy Pululta" +0,5: alleviivaus oli musteen alareuna; peruslinja nyt yläreunasta (Optinen). HYPOTEESI, ajo todistaa.
- "Päivä ✓" +0,8: ✓:n varakirjasimen mitat väärässä mittakaavassa; muunnos lisätty (Optinen, Glyyfi + lahde). HYPOTEESI: ✓:n varakirjasinta ei varmistettu.
- Ohita +0,7: .mk-ohita padding-bottom 5 px (0,5 pt ylös). Koskee myös Introesityksen Ohitaa.
- Kysy 46 %: OpasValikko.TiiviiKysyRivi, iPhone pysty: rivin marginaali 0, pystyreunus 5 pt, rivi yhä 44 pt. Laskennallisesti alle 45 %; rivi tulostaa nyt peiton yhdellä desimaalilla ja laatikon.

## Ajon jälkeen katso
Tulos: lokit/kaannospalvelu/*-testit-*; "viat tai aikaraja:" -rivi kertoo kaatuneet varaukset. Jos varaus ylittää 6 min, jaa se, älä nosta rajaa.
1. Aarre: "-- aarretehtävä …" -rivit (sulusta s, kerros, kortti, teksti: display, opacity, siirtymä, näkyvä osa). UUSI HYPOTEESI: ei ateena, vaan vuorottelu. Kaikissa ajoissa arvio OK, aikajana vika, salakirjoitus OK, katso vika. Vialliset avautuvat heti edellisen sulun jälkeen, toimivat ensimmäisenä tai 20 s:n odotuksen jälkeen. Epäily: USS-siirtymä katkeaa ja kerroksen opacity jää 0:aan (NaytaHeti kesken PiilotaHaivyttaenin). Jos kerros 0: korjaus Rakenne.NaytaHeti (kysy PT:ltä, koskee nostokorttia ja selainta) tai testin odotus sulun jälkeen. Pelaajalla vain alle 200 ms:n uudelleenavauksessa.
2. Metrolinja ja tappi: "-- pallo: metrolinjan juuri …" (alin osa) ja kuva iphone-vaaka-pallon-kierros.png: osuuko alin asema tappiin, ja jääkö kosketusala lyhyeksi. Vanha tieto: sisältö menee 12 pt tapin päälle, kosketusala 10 pt lyhyempi, juuri lyhyempi kuin sisältö.
3. Keskitys 3 kpl ja Kysy-peitto: VIKA-rivit pois? Jos ero jää näkymättömäksi eikä koodi auta: toleranssi rivillä perustellen, ei yleistä väljennystä (PT).
Tulokset PT:lle 3 rivillä. Kuvat vain PT:lle.

## Yhä avoinna (-0915, -1002, -1140)
iPadin karsinnan kesto ja uudelleenpyynnöt laitemittauksessa ennen seuraavaa TF:ää (kestoloki vain batch/editor). Katujärjestys: ei korjausta ilman omistajan havaintoa. Tuileries'n kuva Louvren kulmassa; kyltti RANSKA-otsikon ja Liiku-napin alla; aaripisteet 38 × kärkimäärä; Metroasema haalea sc-80:ssä; mittarin viat ei nyt; yksinäisten pyöreiden kuvien kohteita ei tarkistettu datasta.
