# Aarteet634–635: QA ja provenienssi

Kaksi kokonaan uutta valokuvaa, yksi sisäänrakennetun imagegenin kutsu kumpaankin, ei uusintoja tai osamuokkauksia. Molemmat natiivit ja sarjavertailu katsottu henkilökohtaisesti. Paketti on valmisteltu rootin postitoimitukseen; PT:n vastaanotto, omistajahyväksyntä, pelin integraatio ja julkaisu eivät ole vielä kuitattuja.

## Sisältö

- **634 paa-middleeast.png:** yksi pieni kannettava kultainen/kullattu suitsukerasia. Koko rasia ja osittain avoin kansi näkyvät, hartsimöhkäleet sisällä. Geometrinen granulaatio, aidon metallin kuluma/heijastukset ja läpikuultava hartsi. Ei kaulakorua, rannerenkaita, koruja, kolikoita tai ylimääräistä aarretta. Muinainen Etelä-Arabia/Saba-tyyli on pelin havainne-esineen inspiraatio, ei varmennettu10.vuosisadan eaa. museokopio.
- **635 paa-northamerica.png:** yksi kannettava turkoosi-/simpukkamosaiikkinaamio. Unikuvan sama leveä otsa/kulma/siluetti, nenä ja leuka, mantelisilmät simpukasta ja tummat obsidiaanipupillit. Uusimman lähteen valkoiset simpukkahampaat näkyvät suussa. Ei rintakorua, ketjua, koruja, ihmistä tai muuta esinettä. Yksittäiset kivet ja saumat, turkoosin vaihtelu ja simpukan hohde ovat valokuvamaisia; ei piirrettyjä ääriviivoja/CGI-pintaa.

Molemmissa sama vaalea lämmin kermanvärinen pergamentti ulottuu reunoihin asti, pehmeä yläviistovalo, hieno esineen alapuolinen varjo ja keskitetty väljä rajaus. Ei tekstiä, vesileimaa, kehystä, tummaa vinjettiä tai läpinäkyvyyttä. Esineet eivät ole irrallisista kuvista liimattuja; koko ruutu on uusi generointi.

## Koko ja tekninen vienti

Toimitus: **1024×1024RGB opaquePNG**. Työkalu palautti pyynnöstä huolimatta molemmat aidosti1254×1254RGB-natiiveina. Ne säilyvät byte-exact native-kansiossa. Toimituskoko tehtiin dokumentoidulla koko kuvan sips-pienennyksellä1254→1024, ilman rajausta, täyttöä, sisältöretusointia tai osamuokkausta. Toimituksen pikselit eivät siis ole natiivipikselit; molempien tiedosto-/pikselitarkisteet ja vientimenetelmä ovat GENERATION/DELIVERY.jsonissa. Ei640JPEG:tä tai peli-integraatiota.

## Lähteet ja ristiriidat

Tilausposti luettu kokonaan:0d3ff560e548c7adf1c36bf28dc53f60b8b6e096, blob97a04f2e747f873cb50cef462e8c470b8387529f. Nykyisiä paa-*.png-tiedostoja ei löytynyt kohdennetusti Gitin lähdecommitin/origin-mainin aarteleiskahakemistosta tai paikallisista output/game-src-tiedostonimistä. Hakujen laajuus on SOURCE-MANIFESTissa; puuttumista ei väitetä koko koneen tai kaikkien palvelujen osalta.

28.8.2026README nimesi tyylimalliksi meripihka-vaalea.png:n, ja pääaarrepromptit määräsivät neliön/vaalean pergamentin. Malli poimittiin Gitistä, tarkistettiin ja katsottiin. Sen esinepinta on piirretty, joten sitä käytettiin vain taustaan/palettiin/rajaukseen; käyttäjän valokuvamainen materiaali ja uusin PT-ohje ohjasivat uutta pintaa. Root vahvisti tämän tulkinnan ennen kuvakutsuja. Vanhempi9.8.ohjeen musta gouache-/API-putki ei ohjaa näitä kuvia.

**Isoisän uninaamio löytyi oikeasti:**
`/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/isoisan-uni-unikuvat-20261015/281-montezuman-naamio/v1/montezuman-naamio-v1-native.png`

SHA-256:`fed6e1d09573c9c406e6839a10e4192304daafaa0cb6f892d75fee47aee8db78`.

Sama SHA varmistettiin T7-kopiosta ja Gitin aiemmin toimitetusta posti/isoisan-uni-281-283-v1/montezuman-naamio-v1-native.png:stä. Vanha1254²RGB-kuva katsottiin ja säilyy muuttumattomana. Vanhassa suussa ei näy valkoisia hampaita;635:n uusi lähde vaatii ne, joten uuteen KOKONAISEEN valokuvaan lisättiin hampaat, sama muu perusdesign säilyttäen. Tummaa unikuva-taustaa ei kopioitu. Naamio on pelin havainnollinen design, ei varmennettu Montezuman aito historiallinen henkilöesine tai täsmällinen BritishMuseumin esinekopio. Museokuvapikseleitä ei käytetty, koska oikea aiempi pelireferenssi löytyi.

Sarja-/designvertailu:qa/series-comparison.png. VanhatPNG:t, unikuva ja lähdereferenssit eivät muutu. Kaikki promptit, argumentit, natiivit, lähdepolut/blobit/SHA:t ja tekniset viennit säilyvät NAS/T7:llä. Ei R51-tilan, yhteisten ledgereiden, Git-mainin, R2:n, Unityn, Tripon tai pelin muutoksia; root hoitaa postitoimituksen erikseen.
