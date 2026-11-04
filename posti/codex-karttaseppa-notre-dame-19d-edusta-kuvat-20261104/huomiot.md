# Notre-Damen edusta19d — huomiot

Yksi uusi kokonainen generointi. Toimitetaan katselmointiehdokkaana: natiivi1536×1024 RGB ilman alfaa. Kirkkoa ei piirretty eikä mallin paikkaa muutettu.

## Aukio ja muuttuneet talot
- Julkisivun länsipuolella on nyt yhtenäinen avoin kivetty tila. Pavingin länsireuna ulottuu läntisen kadun tuntumaan; syvyys on kuvasta arvioiden noin200m, enemmän kuin promptin noin140m-suunnitelma. Pintakuvio on matalakontrastista pientä kiveystä.
- Länsipuolen suuri pihallinen kortteli ja siihen liittyvä talokaista poistuivat; suurin yhtenäinen rakennusväristä kiveykseksi muuttunut alue on kuvakoordinaateissa x479–662,y524–687.
- Sen eteläreunan talopaloja poistui alueilla x511–618,y648–729. Aukion pohjois-/koillisreunan kapeita rakennuspaloja poistui alueilla x563–698,y479–550.
- Kirkon eteläisen reunakiveyksen kohdalla on lisäksi pieniä poistumia x634–734,y734–778. Varsinainen itäinen ja eteläinen rantakorttelirivi säilyy pääosin näkyvänä.
- Koordinaatit ovat lähde- ja tuloskuvan rakennusväristä kiveykseksi muuttuneiden pikseliryhmien rajauksia, eivät historiallisten talojen tunnisteita. Alkuperäinen pohja säilyy muuttumattomana.

## Säilymisen QA — ei täydellistä läpäisyä
Koko, RGB/alfattomuus ja natiivien PNG-tavujen säilyminen läpäisevät tarkistuksen. Kartan yleinen rajaus, pohjoinen, joen haarat, saaret, sillat ja itäinen viheralue vastaavat silmämääräisesti pohjaa.

Täsmällinen muun pohjan ja k55-värien säilyminen EI kuitenkaan toteudu:
- Suunnitellun aukion ja jalanjäljen8px reunavyöhykkeen ulkopuolella keskimääräinen absoluuttinen RGB-ero on5.474/255; vain0.245% pikseleistä on täysin samoja.
- Ulkopuolisista pikseleistä11.131% eroaa yli10 sävyaskelta ainakin yhdessä kanavassa. Tässä mukana myös suunnitelmaa laajemman aukion talopoistoja ja kartan viivojen/tekstuurin pieniä muutoksia.
- Alkuperäisten värialueiden sisäosissa tuloksen mediaanit ovat kivi234/210/167 (tavoite234/210/168), rakennukset174/145/118 (175/146/117), vesi165/166/143 (165/167/145), viher193/173/114 (196/176/118).
- Veden alkuperäisessä pikselialueessa RGB-ero on keskimäärin4.924; itäisen viheralueen vertailumaskissa4.035. Näitä alueita ei siis voi sanoa pikselilleen ennalleen jääneiksi.
- Jalanjäljen ympärille syntyi ohut suorakulmainen kiveyksen reunaviiva, ei kirkkoa tai pystygeometriaa. Mallin sovitus on tarkistettava pelissä.

Ei kuvan jälkikorjauksia, värien pakottamista, osakompositointia, rajausta, skaalausta tai toista ottoa. Tarkat laskentamaskit ja menetelmät ovat tuotantokansion qa/pixel-comparison.json- ja qa/major-building-removals.json-tiedostoissa.

## Kirkon siirto ja seuraava vaihe
En ehdota kirkon siirtoa tämän otoksen perusteella: aukio mahtui nykyisen jalanjäljen länsipuolelle talopoistoilla. Tämä on kuvatason arvio, ei varmistus pelin3D-sovituksesta. Keskipiste834,684 ja akseli112° pysyivät ohjeena; kirkon malliin tai pelin sijoitukseen ei koskettu.

Karttaseppä arvioi, onko tämä yksi otos käyttökelpoinen todetuista säilymispoikkeamista huolimatta. Ei hyväksyntää, pelikytkentää eikä julkaisua varmennettu.
