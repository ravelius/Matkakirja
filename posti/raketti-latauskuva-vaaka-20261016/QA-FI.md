# Andøya – vaakakuva ja omistajan pyytämä pintakorjattu pystykuva

Omistajan suora palaute: kuvassa oli outo pintarakenne; pinta toivottiin oikean kameran valokuvan näköiseksi, myös pysty tarvittaessa. Molemmissa vanhoissa kuvissa havaittiin tasainen/kaiverrettu mikrotekstuurivaikutelma. Siksi tehtiin **kaksi kokonaan uutta kuvaa, yksi per formaatti**, ei suodatinta, retusointia tai osakorjausta. #375:n alkuperäinen yksi generointi ja sen R2-objekti säilyvät hylättynä pintaversiona erillään. Tämä kahden kuvan korjaus perustuu suoraan käyttäjän lisäohjeeseen; vanhaa yhden kutsun laskuria ei nollattu.

Vaaka1536×1024, pysty1024×1536; alkuperäiset muuttamattomat native-PNG-tavut. Pystykuvan alkuperäinen tunnistettiin task239:n manifestista: native54b64fa3… ja toimitettu b0a52f8b… sisältävät samat RGB-pikselit. Puhelinkaappauksen keskirajaus ja laukaisun piirteet vastaavat tätä; numeerinen vertailu on SOURCE-IDENTIFICATION.json:ssa. Aiempi erillinen14.10.vaakakuva ei ollut referenssi.

## Pinta ja sisältö

Uusissa veden aallot vaihtelevat kooltaan ja pinnassa on pehmeämpiä alueita sekä rikkonaisia heijastuksia. Kallion mikrokontrasti on hillitympi ja yleinen kaiverrettu vaikutelma vähenee. Taivaassa ei havaittu selvää koko kuvan kangasgrainia tai korostettuja clarity-haloja. Sininen taivas, sininen meri, valkoinen raketti, vasen ristikkotorni ja matala vasen/korkeampi oikea harjanne säilyvät tunnistettavana parina. Koko laukaisuryhmä ja alakeskimeren nimitila näkyvät. Ei tekstiä/logoja/lippuja/UI:ta tai lisättyä vinjettiä.

**Pintaa ei väitetä täydellisesti valokuvalliseksi:** savussa on yhä siistejä pyöreitä/cauliflower-osia, pystyn oikealla harjanteella paikoin korostunutta juovitusta ja pienaalloissa rytmikkyyttä. Uudessa vaakakuvassa laukaisuryhmä on aiempaa suurempi ja merikaista hieman matalampi. Nämä varaukset ovat myös riippumattomassa QA:ssa. Kuva on uusi tekoälyhavainne, ei todistus oikeasta laukaisusta tai täsmälleen samasta pilvikuviosta.

## Toimitus ja hyväksyntä

Molemmat on ladattu uusille muuttumattomille R2-avaimille `/20261016/pintakorjaus/`; kummankin kaksi SHA-versionoitua GET-lukua varmennettiin200/tavutasolla sekä image/png- ja CORS-ehdoilla. Vanhaa R2-kuvaa ei ylikirjoitettu. Queryttömän baseURL:n mahdollinen404-välimuisti on kirjattu erikseen kuitissa; käytetään varmennettuja SHA-URL:eja.

PT näyttää uuden parin omistajalle ENNEN pelikytkentää. Omistajahyväksyntä, Natiivi-UI:n kytkentä ja pelijulkaisu ovat avoimia, eikä niitä väitetä tehdyiksi. Aiemman vaaka-v2:n root-QA ei ole pintakorjauksen omistajahyväksyntä.
