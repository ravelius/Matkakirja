# Codex → Karttaseppä ja Keskustelukanava: Sacré-Cœur #2098, yksi kahdeksan kuvan kierros

Toimitettu **8/8 kokonaan uutta natiivikuvaa**, yksi kutsu per näkymä, kaikki RGB 1536 × 1024. Tuotanto-PNG:t ovat muuttamattomat alkuperäiset. Lähteet: TILAUS-24 ja ajantasainen TILAUS-24d, rinnakkaislupa #2115 sekä ennen ensimmäistä kuvaa luettu suuntakorjaus #2116. Ei ylimääräisiä uusintaottoja.

**Kokonais-QA FAIL.** Toimitus on arviointierä, ei Tripo-valmis eikä omistajan hyväksymä. Valkoisen kivibasilikan tunnistettavat kupolit, etelän portti ja pohjoisen campanile toteutuivat, mutta sarjan projektiossa ja osien keskinäisessä geometriassa on alla kuvatut poikkeamat.

## Mitatut sivukuvat

Järjestys etelä / pohjoinen / itä / länsi:
- Leveydet **710 / 710 / 1419 / 1377 px**. Vastakkaiset parit: **0,00 % / 3,00 %**, molemmat läpäisevät 5 %:n leveysportin.
- Maaviivat y**988 / 988 / 981 / 981**, ero 7 px.
- Suuren keskikupolin alemman kaari-ikkunarummun **saman alalistan** y**558 / 510 / 609 / 610**: korkeudet maaviivalta **430 / 478 / 372 / 371 px**, hajonta **25,92 %**. Nämä eivät ole etupäädyn, taka-apsiksen tai sivusiiven eri räystäät. Pohjoisessa lista näkyy kellotornin sivuilla. Tarkistettu natiiveista erillisillä leikkeillä.
- Saman rummun ylemmän yhtenäisen listan rinnakkaismittaus y**446 / 403 / 468 / 468**: korkeushajonta **13,38 %**. Myös tämä itsenäinen yhteisen tason tarkistus hylkää yhtenäisyyden.
- Leveys/kupolikorkeussuhde tilauksen 50/83 ja 96/83 -mittariin poikkeaa **+23,41 / +23,03 / +29,55 / +25,58 %**. Yksikään ei läpäise. Mittausepävarmuus ±4 px.
- Pohjoiskuvan campanile on suhteessa kupoliin liian matala: korkeussuhteen ero 84/83-vertailusta **−13,15 %**; itä/länsi **−1,92 / −1,82 %**.

## Muoto, suunta ja kamera

- Eteläjulkisivu on kaupungin ja Square Louise Michelin puolella, kellotorni pohjoisessa. Suunta varmistettiin ilmakuva–katukarttavertailulla: eteläpuolen puisto/portaat sekä länsipuolen Saint-Pierre de Montmartren matala kirkko. Aerial-kuvan yläreunaa ei oletettu pohjoiseksi. Pitkän akselin 86° tarkoittaa myötäpäivään idästä.
- Lounaan perustason reunaproxy antaa sin(kulma) **0,651 → 40,6°**, koillisen campanilen sokkeliproxy **0,623 → 38,5°**; tavoite sin65° = 0,906. Epävarmuus noin ±5°, ei kalibroitu maastomittaus. Näitä ei hyväksytä 65°-kuviksi. Koillisessa takapsis tulee eteen ja eteläportti peittyy, mutta tarkkaa 180° kamerakiertoa ei geometriaerojen vuoksi varmenneta.
- **Yläkuva jäi viistoksi:** julkisivuja ja kupolirumpuja näkyy. Bbox [617,181,919,840] vs lähdejalanjälki [652,294,884,730]; väärä koko ja sijainti.
- Campanile vaihtaa sivuun sijoitetusta tornista akselille eri kuvissa. Lounaan apsiskatto näyttää avoimelta kuorelta, koillisessa se on suljettu.
- **Itäkuva avasi etelän kolmikaarisen julkisivun sivun tasoon.** Lännessä eteläpää näkyy asianmukaisemmin reunalta. Tämä topologiavirhe jää, vaikka leveyspari läpäisee.
- Pienet ristit, tekstit ja hienot kattopiikit poistettu; veistokset ja ikkunat yksinkertaistettu. Rakennuskuvissa ei maata, puita, ihmisiä tai heittovarjoja.

## Maapohja

Lähdejalanjälki **84 328 px**, nurmenvärisiksi luokittuvia **0 px**; visuaalinen tarkistus tukee koko jalanjäljen kiveystä. Neljä polkunäytettä ovat **7 / 7 / 8 / 8 px**, noin **6,99 / 6,99 / 7,98 / 7,98 m**. Väriehto ei yksin ole semanttinen laatutodistus. Maa on tasainen ilman pystyesineitä.

Pakollinen 420 × 200 m pelijalanjälki osuu alkuperäisiin puistoihin: kiveys korvaa ne jalanjäljen sisällä ohjeen etusijan mukaisesti. Muu puistomuoto on tulkittu uudelleen, tarkkaa säilymistä ei hyväksytä. Ulkopuolen suorassa pikselivertailussa **1 399 225 / 1 399 813 px** muuttui. Vastaanottaja liittää **vain maskin sisäosan**; ulkopuolen pikselisamuutta ei väitetä.

## Lähde- ja mittarajaus

Ennen tuotantoa hankittiin Commonsin CC BY-SA 2.0 yläilmakuva (Learn From. Build More.), CC BY-SA 3.0 eteläjulkisivu (Yelles) sekä CC0 koko länsiprofiili (Campus France). Oikea.jpg on muuttamaton Yelles-kuva. Tarkat tiedosto-URL:t, tekijät, lisenssit ja rajoitukset ovat LAHTEET.md:ssä.

Kupolin **83 m** on vahvistettu France.fr:stä ja ArtCultureFoi:sta, lisäksi rakennuksella toimivan valaisinasentajan lähteestä. Basilikan oma sivu ilmoittaa campanilen **84 m**. Taulukon **96 × 50 m ei saanut riippumatonta mittausvahvistusta**: se säilyi tämän kierroksen suunnittelumittarina. Muissa julkaisuissa esiintyvä 85 × 35 m on erillinen epävarma rajausvertailu QA.json:ssa; sitä ei väitetä mitatuksi korvaavaksi totuudeksi. Pelin jalanjälkeä ei muutettu.

#2120:n sallima Wikimedia-hakuvuoro oli varattu vain tälle kohteelle. Robots luettiin ensin, kaksi hakua ja viisi latausta tehtiin peräkkäin projektitunnisteella ilman henkilötietoja; ei 429:ää. Vuoro vapautettiin Invalides2:lle ennen tuotantoa. Ei Overpassia.

## Varmennettu toimitus

Paikallinen arviointikansio:
/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/sacre-coeur/

[Postipaketti](https://github.com/ravelius/Matkakirja/tree/5fe1343cb10e23f12014e5c86d2b064d253fb4cb/posti/codex-karttaseppa-sarja24-sacre-coeur-20261105)

**18 tiedostoa, 19 499 795 tavua**, commit `5fe1343cb10e23f12014e5c86d2b064d253fb4cb`. Jokainen etätiedosto luettu takaisin ja SHA256 verrattu. SHA256SUMS, arkki, lähteet, huomautukset, kaikki promptit, numeerinen QA sekä kolme mittauspäällekkäiskuvaa mukana. Vain arviointiartefakteja pienennetty/merkitty; natiivituotantokuvia ei skaalattu tai jälkikäsitelty.

Ei uutta kierrosta ilman uutta tilausta. Ei Tripoa ennen omistajan arkkikatselmusta ja Karttasepän lupaa. Ei R2:ta, runtime-kytkentää tai pelijulkaisua.
