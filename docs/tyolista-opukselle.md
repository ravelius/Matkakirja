# Työlista toteuttajalle (Opus)

> **LEHTITAUKO (omistajan päätös 15.8.2026):** uusien lehtien
> kirjoitus on tauolla, kunnes nykyiset lehdet on saatu paremmiksi
> (mm. kaupunkilehtien avauskuvat vaakayleisnäkymiksi karusellilla ja
> etusivujen pikkukuvien laatukierros — Fable koordinoi, pilotti
> Pariisi). Älä aloita uutta lehtipakettia ennen kuin tämä huomautus
> on poistettu.
>
> **Piirrosputken kustannussääntö (omistajan päätös 16.8.2026,
> budjetti nostettu tätä vastaan):** miniatyyripiirrokset
> generoidaan kiristetyllä putkella — YKSI otto per kohde
> (tools/generoi-miniatyyrit.mjs ohittaa valmiit tiedostot
> automaattisesti), hylätyt kirjataan ja generoidaan uudelleen
> täsmäavaimilla vasta katselmoinnin jälkeen. Ei koskaan
> "generoi kunnes kelpaa" -silmukkaa eikä koko listan
> uusinta-ajoja. Jokainen generointi maksaa ~0,04 €.
>
> **Kuvien silmätarkistus monistusvaiheessa (omistajan linjaus
> 15.8.2026):** kun Kööpenhaminan lehtimalli on valmis ja sitä
> aletaan kopioida muihin kaupunkeihin, Opus käy samalla läpi
> jokaisen lehden KAIKKI etusivukuvat silmin (esikatselu ladataan ja
> katsotaan — ruuhkassa .github/workflows/nouda-tarkistuskuvat.yml)
> ja vaihtaa visuaalisesti heikot. Esimerkki hylättävästä: kuva jossa
> pääosassa on varjo tai yksityiskohta eikä itse kaupunki.

> **ETUSIVUKUVAN KAAVA (omistajan linjaus 16.8.2026):** kaupungin
> Matkailijalle-osion kuva on osion myyntikuva, ei kuvitus. Se näkyy
> noin 272 pikselin levyisenä, joten sen on toimittava pienenä.
> Omistajan sanoin: *"kuva pitää olla yksinkertainen, laadukas ja
> houkutteleva eli wow efekti jostain maan erikoisuudesta."*
>
> 1. **Yksi aihe, joka täyttää ruudun.** Ei katunäkymää, ei useaa
>    kohdetta, ei ihmisjoukkoa.
> 2. **Aiheen on oltava paikan oma erikoisuus** — se, jonka takia
>    sinne matkustetaan. Kuva, joka voisi olla mistä tahansa
>    kaupungista, ei kelpaa, vaikka se olisi kuinka siisti.
> 3. **Commonsin Featured picture tai Quality image**, jos sellainen on
>    olemassa: ne on jo arvioitu laadun takia.
> 4. **Selkeä valo ja rauhallinen tausta.** Pääaihe keskelle tai
>    alavasemmalle — oikean yläkulman yli kulkee Matkaopas-nauha.
>
> Pariisissa meni kaksi yritystä: terassinäkymä oli pienessä koossa
> sekava, ja sitä seurannut kahvikuva oli yksinkertainen mutta olisi
> voinut olla mistä tahansa (*"tämä kuva ei houkuttele
> matkustamaan"*). Kolmas osui: Eiffel-torni tyhjää taivasta vasten.

## Vakiokäynnistys

Jos saat tehtäväksi "jatka työlistaa" (tai vastaavaa), toimi näin ilman
lisäohjeita:

1. Lue tämä tiedosto kokonaan.
2. Katso TILANNE-osiosta, mikä paketti on seuraavaksi tekemättä omalla
   kaistallasi (jos kaistaa ei ole kerrottu, olet kaista A; jos kaistan A
   seuraava paketti on jo jonkun työn alla tai valmis, ota kaista B:n
   seuraava lauta).
3. Tee paketti, avaa PR, yhdistä se mainiin ja **kuittaa paketti
   TILANNE-osioon** samassa PR:ssä (✅ + PR-numero + päivämäärä; kaista B
   kuittaa lauta kerrallaan).
4. Aloita haara uusiksi tuoreen mainin päälle ja jatka seuraavaan, kunnes
   sessio on käytetty — kuittaa aina ennen lopettamista.
5. **ÄLÄ keksi uusia paketteja itse.** Jos listalla ei ole seuraavaa
   tekemätöntä pakettia, hae tuore main (`git fetch origin main`) ja lue
   tämä tiedosto uudestaan — omistaja ja suunnittelusessio lisäävät
   paketteja sitä mukaa kuin niistä on sovittu. Jos tuoreessakaan
   mainissa ei ole seuraavaa pakettia, kirjoita TILANTEEN loppuun
   havaintosi ja lopeta sessio siihen. Uudet paketit päättää omistaja.

## Paketti O5: Pystykuvat ja opaskarusellit loppuun (tilattu 16.8.2026)

Omistajan kaksi linjausta 16.8.2026:

1. **Etusivun Matkailijalle-kuva on PYSTYKUVA kaikissa kaupungeissa.**
   Kaava on tämän tiedoston alussa (yksi aihe, paikan oma erikoisuus,
   Featured/Quality image, pääaihe pois nauhan alta).
2. **Matkaoppaan ENSIMMÄINEN kuva on aina kolmen upean kuvan
   karuselli.**

### Tehty (Opus 16.8.2026)

| Kaupunki | Pystykuva etusivulla | Oppaan eka karuselli |
| --- | --- | --- |
| Pariisi | ✅ Eiffel-torni (FP, PD) | ✅ 3 kuvaa |
| Lontoo | ✅ Elizabeth Tower (FP) | ✅ 3 kuvaa |
| Berliini | ✅ Fernsehturm (FP) | ✅ 3 kuvaa |
| Wien | ✅ Stephansdomin katto | ✅ 3 kuvaa |
| Rooma | ✅ Trevin suihkulähde (QI) | ✅ 3 kuvaa |
| Kööpenhamina | ✅ Nyhavn (QI) | ✅ 3 kuvaa |
| Helsinki | ✅ Uspenskin katedraali (QI) | ⬜ (ei opastaittoa) |

### Ehdokkaat, jotka on jo todennettu API:sta

Nämä voi ottaa käyttöön suoraan — lisenssi ja Restrictions tarkistettu
16.8.2026, mutta kuvaa EI ole vielä katsottu silmin eikä kuvatekstiä
kirjoitettu:

Wien, Rooma ja Kööpenhamina ratkesivat v794:ssä — ratkaisu löytyi
Featured picture -kategorioiden sijaan **Quality image -haulla**
(`gsrsearch=<kohde> incategory:"Quality images"`, suodatus
`korkeus > leveys × 1,2`). FP-kategoriat ovat näissä maissa
luonto- ja tapahtumapainotteisia eivätkä sisällä maamerkkejä.

Helsinki ratkesi v795:ssä. Tuomiokirkosta ei löytynyt kelvollista
pystykuvaa — kaikki katsotut olivat katunäkymiä — mutta **Uspenskin
katedraali** on yhtä tunnistettava ja paremmin kuvattu.

### Kaksi ansaa Commonsin haussa

1. **Rate limit.** Rajapinta vastaa "You are making too many
   requests" eikä hellitä nopeasti. Pyyntöjen väliin 8 s ja
   uusintoihin 15/30/45 s.
2. **Robottikäytäntö.** `upload.wikimedia.org` (imageinfon antama
   `thumburl`) torjuu latauksen kokonaan: *"Your request does not
   comply with our robot policy."* Käytä sen sijaan
   `commons.wikimedia.org/w/thumb.php?f=<nimi>&w=800` ja **korvaa
   välilyönnit alaviivoilla** — muuten vastaus on 500.

Molemmissa tapauksissa vastaus on HTML-virhesivu. Jos sen tallentaa
`.jpg`-nimellä, tiedosto näyttää kuvalta mutta ei ole sellainen —
tarkista ladatut kuvat `file`-komennolla ennen kuin luulet
katsoneesi ne.

### Karusellit ✅ (v796)

Ratkesi joka kaupungissa niin, että kuvat valittiin **jakson tekstin**
mukaan eikä kaupungin yleisistä maamerkeistä: Pariisin teksti mainitsee
sanatarkasti emaloidun kadunnimikyltin, Rooman teksti nimeää kiveyksen
sanpietriniksi. Lontoossa temppu oli, että etusivulta vapautunut kuva
siirtyi jaksoon, jonka teksti kertoo samasta aiheesta — se toimii
edelleen ensimmäisenä yrityksenä joka kaupungissa.

## Paketti O6: opas kuuteen uuteen kaupunkiin (tilattu 16.8.2026) 🟡 KESKEN

Omistaja: *"rakenna samaan malliin seuraavaksi bagdad, teheran, soul,
tokio, shanghai ja tripoli"*. Malli = Pariisin Matkailijalle-osio:
pystykuva etusivulla, `taitto: 'opas'`, viisi jaksoa, ensimmäisessä
kolmen kuvan karuselli ja `matkailu`-lohko.

**Lähtötilanne on kahdenlainen, ja se muuttaa työmäärän:**

| Kaupunki | Kaupunkiosio | Matkailijalle | Mitä puuttuu |
| --- | --- | --- | --- |
| Bagdad | ✅ 188 riviä, 6 nostoa | ❌ | koko opas |
| Teheran | ✅ 196 riviä, 6 nostoa | ❌ | koko opas |
| Tokio | ✅ 191 riviä, 6 nostoa | ❌ | koko opas |
| Soul | ❌ | ❌ | koko osio + opas |
| Shanghai | ❌ | ❌ | koko osio + opas |
| Tripoli | ❌ | ❌ | koko osio + opas |

Kaikki kuusi ovat pelin laudalla (`asia.js`, `africa.js`,
`middleeast.js`), ja `KULTTUURI_KATEGORIAT` on avaimennettu kaupungin
id:llä — eli osion voi lisätä suoraan avaimilla `soul`, `shanghai`,
`tripoli` ilman muutoksia muualle.

**Faktapohja on jo repossa.** Nostot ovat todennettua kaanonia, ja
niistä saa oppaan jaksot ilman uutta lähdetyötä. Bagdadissa esimerkiksi
al-Rashid-katu (1914, pylväskäytävät, purettiin 700 taloa), kahvilat
(ensimmäinen 1590, 285 kpl vuoteen 1903, istikan/quri/takht, al-Zahawi
1917) ja Shorjan tori (nimi persian sanasta *shurchah*). Nämä riittävät
viiteen jaksoon sellaisenaan.

**Kuvapooli on paljon eurooppalaisia ohuempi, ja se on työn pullonkaula.**
Bagdadissa hakusanahaut `Al-Rashid Street`, `Baghdad coffeehouse`,
`Baghdad market` ja `Baghdad monument` palauttivat kaikki **nolla**
osumaa, koska kuvia ei ole kuvailtu englanniksi. Kategoriahaku toimi:

- `Category:Coffeehouses in Baghdad` → 5 kuvaa, mm. Shabandarin kahvila
  al-Mutanabbi-kadulla (CC BY-SA 4.0) ja al-Beiruti (CC0)
- `Category:Streets in Baghdad` → 40 käyttökelpoista
- Mustansiriyan koraanikoulusta (1233) useita, myös pystykuvia

Nämä eivät ole vielä katsottuja eivätkä käyttöön hyväksyttyjä.

**Ohje seuraavalle:** hae kategorioilla, älä hakusanoilla, kun kaupunki
on arabian-, persian-, korean- tai kiinankielinen. Hakusanahaku etsii
englanninkielisestä kuvauskentästä, jota näissä kuvissa usein ei ole.

## Paketti O4: Nähtävyyksiä lisää (Pariisi pilottina, tilattu 16.8.2026) 🟡 KESKEN

**Kuittaus (Opus 16.8.2026):** Pariisi 8 → **11 kohdetta** (v788):
Orsayn taidemuseo, Palais Garnier ja Place des Vosges. Faktat
fi-Wikipediasta rajapinnan kautta, kuvat Commonsin API-todennuksella
ja silmin katsottuina.

**Kesken jäi kaksi kohdetta:** Pompidou-keskus ja Invalidipalatsi.
Pompidoulle ei löytynyt Commonsin laatuluokista kuvaa ennen kuin
rajapinta alkoi kuristaa (repossa on kyllä yksi todennettu
sisäkuva `maa-kategoriat.js`:ssä, mutta saman kuvan toistoa kahdessa
paikassa ei kannata tehdä), ja Invalidipalatsin fi-artikkelia ei
löytynyt sillä nimellä. Molemmat ovat suoraviivaisia, kun rajapinta
vastaa normaalisti.

**Père-Lachaise ja katakombit EIVÄT MAHDU** Pariisin karttarajoihin
(itäraja 2,3788 ja eteläraja 48,8414). Ne vaativat kartan
uudelleenrajauksen — oma päätöksensä.

**Piirrokset puuttuvat:** kolme uutta kohdetta näkyvät kartalla
numeroympyröinä, kunnes `tools/generoi-miniatyyrit.mjs` ajetaan.
Generointi vaatii API-avaimen eikä sitä voi ajaa työsessiosta.

Alkuperäinen tilaus:

Omistajan linjaus 16.8.2026: **"Nähtävyyksiä voi olla 6–15 per
kaupunki riippuen kuinka paljon mielekkäitä kohteita kaupungilla on
tarjota."** Nykytila mitattuna (Opus 16.8.2026): 53 kaupungista
**46:lla on tasan kuusi kohdetta** eli haarukan alaraja. Poikkeukset:
Helsinki ja Kööpenhamina 9, Pariisi 8, Wien, Budapest ja Bukarest 7.
Kuutonen ei siis ole harkittu määrä vaan lähtötaso, joka on jäänyt
päälle.

**Pariisi ensin, omistajan tsekattavaksi.** Kun se on hyväksytty,
sama tehdään muille suurille kaupungeille (Lontoo, Rooma, Berliini,
Wien, Praha, Istanbul, Madrid, Barcelona…) — pienemmät kaupungit
saavat jäädä kuuteen, jos enempää mielekästä ei ole.

### RAJAUS (sitova)

Saat koskea VAIN näihin: `js/packs/maakartat.js` (VAIN pariisi-avaimen
`kohteet`), `js/packs/nahtavyysjutut.js` (VAIN pariisi-avain) ja
tarvittaessa miniatyyripiirrokset uusille kohteille. ET koske muihin
kaupunkeihin, et lehtiin, et oppaaseen.

### Mitä tehdään

1. **Pariisi 8 → 12–14 kohdetta.** Ehdotetut lisäykset (omistaja
   valitsee/karsii): Montmartre ja Sacré-Cœurin portaat, Musée
   d'Orsay, Sainte-Chapelle, Marais, Père-Lachaise, Seinen rannat
   (bouquinistit), Île de la Cité. Versailles on kaupungin
   ulkopuolella — oma päätöksensä.
2. **Jokainen uusi kohde tarvitsee kolme asiaa:** karttapisteen
   (lat/lon `maakartat.js`:ään), miniatyyripiirroksen (yksi otto per
   kohde, ks. piirrosputken kustannussääntö) ja oman
   nähtävyysjutun kuvineen ja lisenssitodennuksineen.
3. **Kaksi kohdetta on ilman juttua jo nyt** — korjaa ne samalla:
   Wienin **Schönbrunn** ja Budapestin **Sankarien aukio** ovat
   kartalla mutta avaavat wiki-ponnahduksen oman juttunsa sijaan.

### Valmis malli

Nykyiset Pariisin jutut `nahtavyysjutut.js`:ssä ovat malli sekä
pituudelle että rakenteelle. Kuvasäännöt ovat samat kuin aina:
lisenssit erätodennuksella API:sta, sijainti kuvauksesta ja
kategorioista, jokainen kuva katsotaan silmin.

## Paketti O3: Matkailijan opas 2.2 — kevyt kainalo, säägraafi, kuvahionta (Opus 27, tilattu 16.8.2026) ✅ VALMIS

**Kuittaus (Opus sijaispäätoimittaja 16.8.2026):** Opus 27 toimitti
kaikki viisi osaa ja perusteellisen raportin; julkaistu **v782**
(PR #1173). Kainalotaulu on yksi kehys kahdella pohjavärillä ja rivit
avaavat pelin oman pikkuselosteen; säägraafi on käsin piirretty SVG,
jonka 24 ilmastolukua todennettiin erikseen en-Wikipedian
Paris-weatherboxista (Météo-France, Parc Montsouris 1991–2020);
Luxembourg-karuselli käyttää olemassa olevaa `nahtavyydenKaruselli`-
mekanismia; kapea asettelu tehtiin `flow-root`-luokalla eikä
`:has()`-valitsimella. Kaikki kolme uutta kuvaa todennettiin
Commonsin API:sta (Restrictions tyhjä) ja katsottiin silmin; sijainti
luettiin kuvauksesta ja kategorioista. Julkaisussa korjattiin yksi
katselmoinnissa löytynyt vika: pelin yleinen `button:hover`-tausta
maalasi kainalorivin ja säägraafin tummaksi laatikoksi oppaan
paperille. Raportin havainnot 1–7 (mm. `hyvaTietaa`-datamallin
rikkova muutos monistukselle ja `kuvateksti-audit.mjs`:n
jaksot[].kuva-aukko) on viety Fablen 17.8. käsittelyyn.

Omistajan palaute opas 2.1:stä ja lehden etusivusta 16.8.2026
(iPad-kuvakaappauksista). Viisi osaa — kaikki koskevat vain Pariisia
(pilotti; monistus tulee myöhemmin erikseen).

### RAJAUS (sitova)

Saat koskea VAIN näihin: `js/ui.js` (opas-metodit ja
piirraMatkailijalle-kuvadatan käyttö), `css/styles.css` (opas- ja
matkailijalle-osiot), `js/packs/kulttuuri-kategoriat.js` (VAIN
pariisi-avaimen sisältö) ja raporttitiedosto `viesti-fable.md` repon
juureen. ET koske: `sw.js`, `js/media.js`, `js/packs/maakartat.js`,
muut kaupungit, ripoteltu-taittokoodi muiden kaupunkien osalta,
`tools/uusi-versio.mjs`. EI PR:ää, EI mergeä, EI versionostoa —
Fable julkaisee. Checkpoint-push omalle haaralle vähintään 30 min
välein. Kaappauksia EI committoida.

### Osa 1: kainalopari → yksi kevyt taulu leipätekstin oikealle

Omistaja: "liian raskas taulukko. Tee vain otsikkotasolla ja sijoita
leipätekstin oikealle puolelle. Yksi taulu jossa vain pohjaväri
muuttuu. Voi tehdä mini pop upin jota painamalla tulisi tarkemmat
tiedot."

- YKSI laatikko, joka kelluu leipätekstin oikealla puolella (float
  right, leveys n. 15–17 rem) ensimmäisen jakson tekstin vierestä
  alkaen. Otsikkotaso vain: parasta-rivit muodossa "Museot ★★★"
  (nimi + tähdet, EI selitteitä) ja hyvä tietää -rivit lyhyinä
  otsikkoina (EI kokonaisia virkkeitä).
- Laatikon sisällä kaksi vyöhykettä, jotka eroavat VAIN pohjaväriltä:
  lämmin (parasta) ylhäällä, viileä (hyvä tietää) alla. Sama
  typografia, sama reunus, yksi yhtenäinen kehys.
- Datamalli: `hyvaTietaa` muutetaan muotoon `[{otsikko, teksti}]` —
  keksi jokaiselle nykyiselle kohdalle napakka otsikko (esim.
  "Hintataso", "Taskuvarkaat", "Jonot", "Elokuun sulut"); nykyinen
  virketeksti siirtyy teksti-kenttään. `parasta` säilyy ennallaan.
- Rivin napautus avaa MINIPONNAHDUKSEN, jossa sen rivin selite/teksti
  (kevyt pieni dialogi tai kupla laatikon vieressä — EI koko ruudun
  arkki). Esc/ulkopuolen napautus sulkee. Ruudunlukijalle
  aria-expanded tms. asianmukaisesti.
- Kapealla (<640 px) laatikko täysleveänä ingressin alla kuten nyt.
- Opas 2.1:n kaksipalstainen kainalopaneeli ja sen CSS poistetaan
  (kuollutta koodia ei jätetä).

### Osa 2: säägraafi Milloin matkaan? -laatikon viereen

Omistaja: "lämpötilatauluun voisi leipätekstin oikealle puolelle
tuoda pienen kuvan vuosiennusteesta ja sitä klikkaamalla se suurenisi
isommaksi animoidusti."

- Lisää dataan `matkailu.ilmasto`: 12 kuukauden normaalit
  `[{kk: 'tammi', min, max}]` Pariisille. Lähde: Wikipedian
  Paris-artikkelin ilmastotaulukko (Météo-France 1991–2020) —
  kirjaa lähde ja hakupäivä datakommenttiin ja raporttiin.
- Piirrä ui.js:ssä PIENI SVG-vuosikäyrä (ei kirjastoja): min–max-
  vyöhyke täytettynä + käyrät, kuukausien alkukirjaimet x-akselilla,
  muutama °C-viiva. Paletti 2.1:n värit (petrooli käyrille, hento
  hiekka pohjalle). Koko n. 11–13 rem, kelluu Milloin matkaan?
  -laatikon leipätekstin oikealla puolella.
- Napautus suurentaa graafin animoidusti (CSS-transitio pienestä
  keskelle ruutua, esim. FLIP tai transform-scale overlay +
  himmennystausta); suuressa versiossa myös lukuarvot. Toinen
  napautus/Esc palauttaa animoidusti takaisin.

### Osa 3: Luxembourgin puiston karuselli

- Jakson 3 (Luxembourg) kuvalle karuselli: nykyisen kuvan rinnalle
  2–3 lisäkuvaa puistosta Commonsin FP/QI/valokategorioista.
- Kuvasäännöt (sitovat): lisenssit erätodennuksella suoraan API:sta
  (extmetadata: LicenseShortName|Artist|Restrictions), vain PD/CC,
  tekijä lähderiville, sijainti kuvaustekstistä/kategorioista EI
  tiedostonimestä (nimiansat!), JOKAINEN kuva katsotaan silmin ennen
  kytkemistä. Selitteet yhteen lauseeseen (~90 mrk).
- Tekninen toteutus: jaksokuvan `kuva` voi olla myös lista — käytä
  samaa karusellimekanismia kuin lehden avauskuvissa, jos se on
  järkevästi uudelleenkäytettävissä; muuten kevyt oma toteutus
  (nuolet + pisteet). Raportoi kumman valitsit ja miksi.

### Osa 4: leipomo- ja iltakuva pienemmiksi, teksti kiertää

Omistaja: "Leipomokuva voisi olla pienemmällä ja teksti vasemmalla.
Sama iltakuvalle."

- Lisää jaksokuville asetteluvaihtoehto (esim. `kuva.asettelu:
  'kapea'`): kuva kelluu oikealla n. 38–42 % leveydellä ja jakson
  teksti kiertää vasemmalla. Oletus säilyy täysleveänä.
- Käytä kapeaa asettelua leipomojaksossa ja iltajaksossa (tarkista
  itse, missä jaksoissa nämä kuvat ovat). Kapealla ruudulla kuva
  palaa täysleveäksi.

### Osa 5: etusivun Matkailijalle-kuva yksinkertaisemmaksi

Omistaja: "Etsi parempi kuva etusivulle siihen missä on nauha kuvan
päällä. Vähän yksinkertaisempi kuva kun on pienessä koossa."

- Nykyinen terassikuva on pienessä koossa (10–17 rem) liian
  sekava. Etsi tilalle kuva, jossa on YKSI selkeä, lämmin ja iloinen
  aihe, joka lukee heti pienenäkin (esim. kahvilapöytä lähikuvana,
  metroaseman jugendkyltti, leipomon ikkuna yhdellä aiheella —
  sinun valintasi, perustele). FP/QI/valokategoria-etusija; samat
  sitovat kuvasäännöt kuin osassa 3. Vaihda
  `matkailijalle.kuva` (tiedosto + yhden lauseen selite + lähderivi).
- HUOM: diagonaalinauha kulkee osion oikean yläkulman yli — pääaihe
  ei saa jäädä nauhan alle (nauha ylittää kuvan oikean yläkulman).

### Raportti

`viesti-fable.md` repon juureen: mitä teit, perustelut (erityisesti
osan 1 taittoratkaisu ja osan 5 kuvavalinta hylättyine
ehdokkaineen), kuvien lisenssitaulukko, portit (testit +
kaksoisavaimet), kaappausarviot leveänä ja kapeana (EI committoida),
regressiotarkistus muihin kaupunkeihin (ripoteltu ennallaan),
havainnot joita ET korjannut.

## Paketti O2: Matkailijan opas 2.1 — kainalo, paletti, otsikko (Opus 26, tilattu 16.8.2026) ✅ VALMIS

**Kuittaus (Fable 16.8.2026):** Opus 26 toimitti koko paketin ja
raportin; julkaistu v780. Paletti 2.1 (terrakotta johtaa, petrooli
tukee, kulta koristaa; kaikki parit WCAG AA mitattuina), kainalopari
kaksipalstaisena ingressin alla (kelluke hylätty mitatulla
317 px:n kololla — perustelu hyväksytty), display-otsikko antiikvalla,
avauskuva vaihdettu FP-kuvaan Tour Saint-Jacques au crépuscule
(Fabien Barrau, CC BY-SA 4.0 — lisenssi todennettu itse API:sta,
kuva katsottu silmin; kaukainen valaistu Eiffel hyväksytty de
minimis -perusteella, Restrictions-kenttä tyhjä). Raportin
havainto 1 (kulmalapun tekstivuoto) raukesi: v779 korvasi lapun
diagonaalinauhalla. Havainnot 2–3 (kuvateksti-auditin jaksot-aukko,
€€€-asteikko) jonossa ennen monistuserää.

Omistajan palaute Pariisin opas 2.0:sta 16.8.2026: sivulle kaivataan
kainalonostot (parasta + varjopuolet), koko sivun väripaletti on
"hieman kökkö" ja vaatii uudelleenajattelun, otsikko isommaksi ja
avauskuva lämpimän sävyiseksi. Omistaja delegoi kokonaisuuden
miettimisen Opukselle — tässä paketissa on siis tavallista enemmän
suunnitteluvapautta, mutta jokainen valinta PERUSTELLAAN raportissa.

**Haara:** `claude/opus26-opas21`

1. **KAINALONOSTOT heti oikeaan reunaan** (ingressin jälkeen, ennen
   ensimmäistä jaksoa; kapealla ruudulla täysleveinä allekkain):
   - **"Parasta täällä"** LÄMPIMÄLLÄ pohjavärillä: 4–6 riviä muodossa
     aihe + tähdet (1–3 ★) + puolilauseen perustelu. Aiheet valitaan
     kaupungin mukaan (museot, ruoka, ranta, kävely, ilta,
     lapsiystävällisyys, edullisuus…). Pariisi: museot ★★★,
     ruoka ★★★, kävely-ympäristö ★★★, iltatunnelma — sinun
     harkintasi täydentää.
   - **"Hyvä tietää"** VIILEÄLLÄ pohjavärillä: 3–4 rehellistä
     varjopuolta ilman pelottelua (Pariisi: korkea hintataso,
     taskuvarkaat metrossa ja nähtävyyksillä, kärkikohteiden jonot,
     elokuussa moni paikka kiinni). Kunnioitus-pilari pätee: faktoja,
     ei kaupungin mollausta.
   - Datamalli: matkailu.parasta = [{mita, tahdet, selite}] ja
     matkailu.hyvaTietaa = [teksti]. Ei tähtiä miinuksiin.
2. **VÄRIPALETTI UUSIKSI koko oppaaseen.** Nykyinen kolmen aksentin
   paletti on omistajan silmään sekava. Suunnittele harmonisempi
   kokonaisuus: lämmin perusvire, aksentteja säästeliäämmin ja
   selvällä roolijaolla (esim. yksi pääaksentti otsikoille, lämmin ja
   viileä pohja kainaloille, laatikot samasta perheestä). Edelleen
   vanhan matkajulisteen henki, ei neonia; paperikohina jää.
   Perustele raportissa mitä hylkäsit ja miksi.
3. **Otsikko isommaksi**: 'Matkailijan Pariisi' selvästi nykyistä
   suurempi (display-kokoluokka), ingressi sen alla erottuvana.
4. **Avauskuva lämpimäksi**: jakson 1 kuva (sininen Montparnasse-
   panoraama) vaihdetaan LÄMMINSÄVYISEEN näkymään (kultainen hetki /
   auringonlasku lämpimin sävyin). Haku FP/QI-kategorioista, lisenssi
   + tekijä API:sta, sijainti kuvaustekstistä, kuva silmin —
   Montparnasse-kuvan saa siirtää myöhempään jaksoon tai pois.
   HUOM: etusivukarusellin Orsay-kuvaa ei saa toistaa oppaassa.
5. Silmätarkistus omin kaappauksin (leveä + kapea; kuvat paikallisesti
   tarjoiltuina kuten Opus 25 teki); arviot raporttiin, kaappauksia EI
   committoida.
6. RAJAUS: kosketa vain js/ui.js:ää, css/styles.css:ää,
   js/packs/kulttuuri-kategoriat.js:n pariisi-osuutta ja
   viesti-fable.md:tä (repon juureen). Ripoteltu-taitto ja muut
   kaupungit eivät saa muuttua (aja sama regressiotarkistus kuin
   Opus 25). ÄLÄ aja uusi-versio.mjs:ää, EI PR:ää eikä mergeä.
   Portit: node --test tests/*.test.mjs + tarkista-kaksoisavaimet.
   Checkpoint-push ≥ 30 min välein.

## Paketti A1: Äänet R2:een + hybridivälimuisti (Opus 24, tilattu 16.8.2026)

**✅ VALMIS (Opus 24, katselmoitu ja julkaistu v774:ssä 16.8.2026):**
esilataus 242 → 62 Mt (äänet 181 Mt → 1,16 Mt / 39 tiedostoa);
savuke 9/9, ml. ämpäri-404:n varareitti. Fablen jonossa:
vie-aanet-ajo, tuotantotodennus, poistoerä (455 tiedostoa) ja
työhuoneen R2-palkin audio-osuus (pieni jatkotyö main.js:ään).

Omistajan päätös 16.8.2026 (Raamattu, Äänet-osio): äänet jaellaan
R2:sta; esilataus vain ydinsetille; OFFLINE EI OLE TAVOITE. Tausta:
sw.js esilataa nyt 420 äänitiedostoa (~200 Mt) joka asennuksessa.

**Haara:** `claude/opus24-aanet-r2`

1. Tutki ENSIN miten kuvapeili toimii: `.github/workflows/peilaa.yml`
   (R2-vienti ja sen salaisuudet) ja js:n kuva-URL-rakennus
   (valokuvaUrl + peiliosoite). Äänet tehdään SAMALLA arkkitehtuurilla
   — älä keksi uutta mekanismia.
2. Uusi `.github/workflows/vie-aanet.yml` (workflow_dispatch + push
   main kun assets/audio muuttuu): vie assets/audio R2:een samoin
   salaisuuksin/poluin kuin peilaa.yml (oma alipolku, esim. audio/).
   Aja dokumentaatio-osuus kuntoon mutta ÄLÄ poista audiotiedostoja
   repostä tässä paketissa — poisto on Fablen erillinen PR sen
   jälkeen, kun R2-jakelu on todettu tuotannossa toimivaksi.
3. js: äänipolut R2:n kautta samalla varamekanismilla kuin kuvilla
   (peili ensin, paikallinen polku varalla siirtymän ajan). Tee
   yksi apufunktio (esim. aaniUrl) ja käytä sitä joka soittokohdassa.
4. sw.js: SHELL-listalta pois KAIKKI assets/audio-polut PAITSI
   ydinsetti = huudahdus-*.mp3 ja lyhyet käyttöliittymätehosteet
   (listaa raporttiin mitkä jäivät ja miksi). Muille äänille
   runtime-välimuisti: cache-first + talletus ensimmäisellä
   kuuntelulla (sama malli kuin kuvien runtime-cache, jos sellainen
   on — katso sw.js:n fetch-käsittelijä).
5. Savuke: playwright-ajo jossa jokin luenta/taustaääni soi
   R2-polusta (verkkopyyntö näkyy R2-osoitteeseen) ja huudahdus soi
   välimuistista. Portit: `node --test tests/*.test.mjs`,
   `node tools/tarkista-kaksoisavaimet.mjs`.
6. RAJAUS: kosketa vain sw.js, äänipolkuja rakentavat js-tiedostot,
   .github/workflows/vie-aanet.yml ja viesti-fable.md. ÄLÄ koske
   ui.js:n taittokoodiin äläkä css:ään (Opus 25 työstää niitä
   rinnakkain), ÄLÄ poista tiedostoja, ÄLÄ aja uusi-versio.mjs:ää,
   EI PR:ää eikä mergeä. Checkpoint-push ≥ 30 min välein.
   R2-avaimet ovat GitHub-salaisuuksia — niitä ei tulosteta koskaan.

## Paketti O1: Matkailijan opas 2.0 — Pariisi-pilotti (Opus 25, tilattu 16.8.2026)

**✅ VALMIS (Opus 25, katselmoitu ja julkaistu v776:ssa 16.8.2026):**
jaksotaitto + 3 laatikkoa + nosto + väripaletti + kulmalappu;
ripoteltu-regressio tarkistettu kaikista kaupungeista. Ilmasto
1991–2020-normaaleista lähteineen; espresso/patonki/illallinen
ovat haarukoita ilman yhtä lähdettä (tietoinen). MONISTUKSEEN:
kuvateksti-audit ei kata matkailijalle-kuvia (jaksot[].kuva) —
korjattava audit-työkaluun ennen monistuserää.

Omistajan linjaus 16.8.2026 (Raamattu, Kaupungit-osio): opas on
pelin kevyt ja viihteellinen osa, joka houkuttelee matkustamaan —
iloisemmat värit, jaksotettu taitto, laatikot. Ripoteltu taitto
todettiin levottomaksi; tämä korvaa sen opasartikkeleissa.

**Haara:** `claude/opus25-opas2`

1. UUSI TAITTO `taitto: 'opas'` (js/ui.js): artikkeli renderöidään
   AIHEJAKSOINA — pieni väliotsikko → kappale → KOKO PALSTAN
   levyinen kuva kuvatekstillä. Ei kellukkeita. Lisäksi:
   - `nosto`: yksi lause isolla antiikvalla koristeviivoin
     jaksojen 2 ja 3 väliin.
   - Laatikko "Milloin matkaan?": parasAika-lause + kausirivit
     (kausi · kuukaudet · lämpöhaarukka · luonnehdinta).
   - Laatikko "Matkakassa": €€-luokka + 4–5 ankkurihintaa.
   - Laatikko "Suunnittele matka": 3–4 linkkiä (uuteen välilehteen,
     rel=noopener).
   Järjestys: ingressi → jakso1 → Milloin matkaan? → jakso2 →
   nosto → jakso3 → Matkakassa → loput jaksot → Suunnittele matka
   → lähderivi. Vanha teksti+kuvat-muoto (ripoteltu) EI saa hajota
   — muut kaupungit käyttävät sitä kunnes monistetaan.
2. DATAMALLI (js/packs/kulttuuri-kategoriat.js, VAIN pariisi):
   artikkeli.jaksot = [{otsikko, teksti, kuva:{tiedosto,selite,
   lahde}}], artikkeli.nosto, artikkeli.matkailu = {parasAika,
   kaudet:[{nimi,kk,lampo,kuvaus}], hintataso,
   hinnat:[{mita,hinta}], linkit:[{nimi,url}]}.
3. PARIISI-PILOTTI: jaa nykyinen 5 kappaleen teksti jaksoiksi
   väliotsikoin (Perille ja liikkeelle · Seine · Istumisen taito ·
   Leipomon kaupunki · Ilta), nykyiset 5 kuvaa jaksoihin, nostoksi
   'Kahvilassa yksi kahvi ostaa pöydän tunniksi, eikä kiirettä
   ole.' Kaudet + lämmöt en-wikin Paris climate normals
   -taulukosta (lähde kommenttiin); hinnat realistisina
   haarukkoina (espresso tiskillä, patonki, metrolippu,
   museolippu, bistroillallinen); linkit: parisjeteaime.com,
   Wikivoyagen Pariisi, RATP.
4. VÄRI-ILME (css/styles.css): opas saa oman iloisen paletin —
   lämmin vaalea pohjaväri, kolme aksenttia (turkoosi,
   postimerkinpunainen, aurinkokeltainen); laatikot vaaleilla
   aksenttipohjilla, nosto aksenttivärillä. Pysyy pelin
   paperiestetiikassa: sävyt kuin vanhassa matkajulisteessa, ei
   neonia. ETUSIVULLE pirteä KULMALAPPU Matkailijalle-osioon:
   postikortti/matkalippuhenkinen vino lappu "Matkailijan opas",
   joka avaa oppaan — kevyt kallistus, iloinen väri, sopii
   pergamenttiin.
5. Silmätarkistus: paikallinen palvelin + playwright-kaappaukset
   oppaasta (leveä + kapea näkymä) ja etusivun lapusta; arvio
   raporttiin, kaappauksia EI committoida.
6. RAJAUS: kosketa vain js/ui.js, css/styles.css,
   js/packs/kulttuuri-kategoriat.js (vain pariisin
   matkailijalle-osuus) ja viesti-fable.md. ÄLÄ koske sw.js:ään
   äläkä äänikoodiin (Opus 24 työstää niitä rinnakkain), ÄLÄ koske
   muihin kaupunkeihin, ÄLÄ aja uusi-versio.mjs:ää, EI PR:ää eikä
   mergeä. Portit: node --test tests/*.test.mjs +
   tarkista-kaksoisavaimet. Checkpoint-push ≥ 30 min välein.

## Paketti K3: Kuvakäsikirjoitukset lopuille piirroskaupungeille (Opus 23, tilattu 16.8.2026)

**✅ VALMIS (Opus 23, katselmoitu ja mergetty 16.8.2026):** kuusi
käsikirjoitusta mallien muodolla; Fable tarkasti suunnan kahden
kaupungin checkpointista ja hyväksyi kokonaisuuden sellaisenaan.
Kuvahaut tilataan erikseen Pariisi-pilotin hyväksynnän jälkeen.

Omistajan kaava on kirjattu Raamattuun (osio "Kuvat ja lähteet") ja
docs/kuvakasikirjoitukset.md:n alkuun; Fable kirjoitti mallit
(Pariisi, Lontoo, Berliini, Rooma). Tämä paketti KIRJOITTAA
käsikirjoitukset — kuvahakuja EI tehdä tässä (ne tilataan erikseen,
kun omistaja on hyväksynyt Pariisin pilotin).

**Haara:** `claude/opus23-kuvakasikirjoitukset`

1. Kirjoita docs/kuvakasikirjoitukset.md-tiedostoon käsikirjoitus
   kuudelle kaupungille TÄSMÄLLEEN Fablen mallien muodolla ja
   mitalla: **Helsinki, Kööpenhamina, Wien, Praha, Amsterdam,
   Tukholma** (tässä järjestyksessä).
2. Jokaiseen: pääkuva = kaupungin tärkein kohde + valotoive;
   nosto 1 = toiseksi tärkein kohde; nosto 2 = yllättävä ja
   oivaltava yksityiskohta, joka kertoo kaupungista jotain omaa
   (katso mallien yllätykset — Ampelmännchen, Pantheonin valokeila).
   Tärkeysjärjestys on toimituksellinen arvio: mieti mitä matkailija
   oikeasti pitää kaupungin ykkösenä ja kakkosena.
3. **Checkpoint-push kahden ensimmäisen kaupungin (Helsinki,
   Kööpenhamina) jälkeen** — Fable tarkastaa suunnan siitä; jatka
   heti pushin jälkeen odottamatta.
4. Portit: `node --test tests/*.test.mjs` (dokumenttitesti valvoo
   karttaa — tiedosto on jo Raamatun kartalla, älä muuta karttaa).
5. Kosketa VAIN tiedostoja docs/kuvakasikirjoitukset.md ja
   viesti-fable.md (repon juureen). EI PR:ää eikä mergeä.

## Paketti P1: Pariisin etusivukuvat uusiksi (Opus 22, tilattu 16.8.2026)

**✅ VALMIS (Opus 22, katselmoitu ja julkaistu v771:ssä 16.8.2026):**
4 uutta jurytettyä kuvaa (Eiffel + Pont Alexandre III sinisellä
hetkellä pääkuvaksi; Orsay auringonlaskussa; Notre-Dame; Galerie
Vivienne yllätysnostona). Fable todensi lisenssit + Restrictions-
kentät API:sta ja katsoi kuvat silmin. TÄRKEÄ OPPI: pikkurivin
rajaus on 4:3 (ei vaakasuikale) ja Eiffelin iltavalaistuksen
tekijänoikeus tarkistettava yökuvista joka kerta. Odottaa
omistajan tsekkiä ennen muiden kaupunkien hakuja.

Omistajan uusi kuvakonsepti 16.8.2026 kaupunkilehtien etusivuille —
**pilotti Pariisi; muihin kaupunkeihin EI kosketa ennen omistajan
hyväksyntää:**

> "Ensimmäinen kuva voisi olla aina tunnelmallinen laajakulma
> kaupungin tärkeimmältä paikalta. Kuvassa saisi olla visuaalista
> voimaa, esim. kuvattu illalla tai aamulla tai muuten
> mielenkiintoisempi kuva kuin perus päivänvalossa kuvattu."

**Haara:** `claude/opus22-pariisi-etusivu` (Opus 21:n aloitus
peruttiin, kun omistaja tarkensi asettelun; sen löytämä sinisen
hetken Notre-Dame siirtyy nostoksi, ks. kohta 2.)

**Omistajan tarkennus 16.8.2026:** "pariisin pääkuva pitäisi olla
varmaan eiffel torni ja pienempiin nostoihin notredame ja kolmas
sitten joku mielenkiintoinen vähän erilainen nosto."

1. **Iso avauskuva** (`pariisi`-kategorian `avauskuvat[0]`,
   js/packs/kulttuuri-kategoriat.js): korvaa nykyinen kattokuva
   ('Rooftops seen from Notre-Dame…' — omistaja: "huono, kun näkyy
   vain kattoja"). Tilalle **EIFFEL-TORNI** — tunnelmallinen
   VAAKAMUOTOINEN laajakulma erikoisessa valossa (ilta, aamu,
   sininen hetki, auringonlasku, usva); esim. Trocadérolta tai
   Seinen yli kuvattuna. EI perus keskipäivän valoa. HUOM:
   avauskuvat[1] on jo päivänvalo-Trocadéro Eiffelillä — vaihda
   sekin tai poista, ettei karuselliin tule kahta samaa näkymää.
2. **Pikkurivin kuvat** (`kansikuvat[0]` ja `[1]`): pikkurivi RAJAA
   kuvat vaakasuikaleiksi, joten pystykuva rajautuu rumasti.
   - `kansikuvat[0]`: **NOTRE-DAME**. Opus 21 löysi jo hyvän:
     'Notre-Dame de Paris and Île de la Cité at dusk 140516 1.jpg'
     (DXR, CC BY-SA 3.0; Featured picture + Quality image, Blue
     hour in Paris) — käytä se, jos se kestää vaakarajauksen;
     muuten hae vastaava vaakavahvempi.
   - `kansikuvat[1]`: **joku mielenkiintoinen, vähän erilainen
     nosto** — yllättävä aihe tai kuvakulma, ei kolmatta
     monumenttipostikorttia (esim. metron jugend-sisäänkäynti,
     passage-kauppakäytävä, bouquinistit hämärässä, kattojen
     sinkkimaailma erikoisvalossa — sinun silmäsi päättää).
   Wallace-kaivo (pysty) ja nykyinen kimeera poistuvat.
   Muut avauskuvat (Carrousel) saavat jäädä.
3. **Mistä etsitään** (uusi hakustrategia — tästä konseptista tuli
   tarve): Commonsin juryttämät parhaimmistokategoriat, esim.
   Category:Featured pictures of Paris, Category:Quality images of
   Paris ja niiden alakategoriat, sekä valo-/aikakategoriat
   (Category:Night in Paris, sunset/sunrise/blue hour -kategoriat).
   Nämä ovat käymätön kultakaivos — hakusana-API löytää vain nimen
   perusteella, kategoriat laadun. Lisenssisäännöt ennallaan: vain
   PD/CC, lisenssi + tekijä API:sta, sijainti kuvaustekstistä (EI
   tiedostonimestä — nimiansat!), JOKAINEN kuva silmin.
4. Selitteet uusiksi vaihdettujen kuvien mukaan; vanhojen
   selitteiden asiatiedot saa siirtää, jos aihe säilyy.
5. Portit: `node --test tests/*.test.mjs`,
   `node tools/tarkista-kaksoisavaimet.mjs`. ÄLÄ aja
   uusi-versio.mjs:ää äläkä koske dist/-kansioon. EI PR:ää eikä
   mergeä. Kosketa vain tiedostoja js/packs/kulttuuri-kategoriat.js
   ja viesti-fable.md (repon juureen).
6. Checkpoint-commit ≥ 30 min välein. Raporttiin: jokaisen ehdokkaan
   kohdalla mistä kategoriasta löytyi, lisenssi + tekijä, miksi
   valittiin/hylättiin, ja vaakarajauksen kesto pikkukuvissa.

## Paketti M1: Matkailijalle-monistus viiteen kaupunkiin (Opus 20, tilattu 16.8.2026)

**✅ VALMIS (Opus 20, katselmoitu ja julkaistu v768:ssa 16.8.2026):**
viisi matkailijalle-osiota + 3 etusivukuvan vaihtoa; Fable todensi
kaikki 34 lisenssiä itse API:sta ja katsoi kuvat silmin (2 pientä
selitekorjausta mergessä). Avoinna: Berliinin Siegessäule-panoraama
(rajatapaus, omistajan päätettävä) ja erä 2 (Praha, Amsterdam,
Tukholma).

Omistajan tilaus 16.8.2026: "Monista viiteen" — Kööpenhaminan
lehtimalli (v766:n muodossa, jossa opasartikkelin kuvat on
TAITETTU tekstin lomaan) monistetaan viiteen kaupunkiin:
**Berliini, Pariisi, Lontoo, Rooma, Wien**. (Opus 19:n aiempi
kolmen kaupungin versio peruttiin ennen aloitusta; tämä korvaa
sen. Praha, Amsterdam ja Tukholma tulevat seuraavassa erässä —
niitä EI aloiteta tässä.)

**Haara:** `claude/opus20-matkailijalle-era1`

1. Jokaiselle viidelle kaupungille `js/packs/kulttuuri-kategoriat.js`
   → kaupunki-kategoriaan `matkailijalle`-kenttä TÄSMÄLLEEN
   Kööpenhaminan mallilla (katso `kobenhavn` — rakenne, pituudet,
   sävy; Helsinki on toinen esimerkki mutta Kööpenhamina on
   tuorein):
   - `kappale`: 4–5 lausetta turistin näkökulmasta — millainen
     kaupunki on kokea, mikä siinä on omaa. Ei nähtävyyslistaa.
   - `kuva`: yksi laadukas valokuva (tiedosto/selite/lahde), aihe
     kappaleen kärjestä. Osio näyttää sen otsikon alla oikealla.
   - `artikkeli`: `nimi: 'Matkailijan <kaupunki>'`, ~5 kappaletta
     ('\n\n'), tiedot Wikivoyagesta/Wikipediasta MUTTA lauseet
     omat, `lahde: 'Wikipedia'`. Teemoja tyyliin: miten kaupunkia
     kuljetaan, mikä on paikallisten oma tapa, ruoka, ilta —
     konkretiaa ja tarinaa, ei esitettä.
   - `artikkeli.taitto: 'ripoteltu'` ja `artikkeli.kuvat`: **5
     kuvaa**. Renderöijä näyttää ensimmäisen kuvan avauskappaleen
     jälkeen koko palstan levyisenä ja kelluttaa loput neljä
     pikkukuvina tekstin lomaan TASAVÄLEIN — viidellä kappaleella
     kuva j osuu kappaleen j edelle. **Kirjoita siis kappaleet ja
     valitse kuvat YHDESSÄ niin, että jokainen kuva osuu aiheensa
     kappaleen kohdalle** (malli: kobenhavn — kävelykatu, kylpijä,
     Tivoli ja smørrebrød istuvat kukin omaan kappaleeseensa).
     Ei osiokuvan toistoa.
2. Silmätarkista samalla näiden viiden kaupungin KAIKKI olemassa
   olevat etusivukuvat (kansikuvat + avauskuvat; Roomalla ja
   Wienillä ei vielä ole avauskuvakarusellia — ÄLÄ lisää sitä,
   se tulee erikseen) ja VAIHDA visuaalisesti heikot (omistajan
   linjaus 15.8.2026; hylkäysesimerkki: pääosassa varjo tai
   yksityiskohta, kaupunki ei näy). Vaihdot samoilla
   lisenssisäännöillä.
3. Kuvasäännöt: vain PD/CC, lisenssi + tekijä Commonsin API:sta,
   JOKAINEN kuva katsottava silmin (ruuhkassa
   nouda-tarkistuskuvat.yml + artefakti). Tekijä nimetään
   lähderivillä. **VARO NIMIANSOJA**: Commonsin tiedostonimi ei
   todista sijaintia — "Strøget.jpg" osoittautui AARHUSIN kaduksi.
   Varmista kuvaustekstistä/kategorioista, että kuva on oikeasta
   kaupungista.
4. Portit: `node --test tests/*.test.mjs` ja
   `node tools/tarkista-kaksoisavaimet.mjs`. ÄLÄ aja
   uusi-versio.mjs:ää äläkä koske dist/-kansioon.
5. Checkpoint-commit ≥ 30 min välein. Kun valmis: push, EI PR:ää
   eikä mergeä — raportti `viesti-fable.md`:hen (kuvien lisenssit,
   vaihdetut etusivukuvat perusteluineen, mitä jäi auki).
   Kosketa vain tiedostoja js/packs/kulttuuri-kategoriat.js ja
   viesti-fable.md.

## Paketti K1: Kööpenhaminan nähtävyydet 6 → 9 (Opus 18, tilattu 15.8.2026)

**✅ VALMIS (Opus 18, katselmoitu ja julkaistu v764:ssä 16.8.2026):**
kohteet 7–9 + jutut + 9 kuvaa; Fable todensi kaikki lisenssit API:sta
ja katsoi kuvat silmin. Piirrokset tehdään karttaerän 2 yhteydessä.

Omistajan tilaus: "Laita opus agentti lisäämään nähtävyyksiä
köpikseen." Kööpenhaminan kartalla on 6 kohdetta — Helsingin taso on
9. LEHTITAUKO ei koske tätä: kyse on nähtävyystyöstä, ei uudesta
lehdestä.

**Haara:** `claude/opus18-kobenhavn-nahtavyydet`

1. Lisää `js/packs/maakartat.js` → `kobenhavn.kohteet`-listan
   LOPPUUN kolme kohdetta (järjestys = numerointi; vanhat 1–6 eivät
   saa siirtyä): **Vapahtajan kirkko** (spiraalitorni, 1752),
   **Rosenborgin linna** (1600-luku, Kuninkaan puutarha),
   **Kastellet** (tähtilinnoitus, 1660-luku). Muoto kuten muilla:
   `{ nimi, lat, lon, wiki }` — koordinaatit Wikipediasta, ja
   varmista että testi karttareunuksesta menee läpi (kohteen pitää
   mahtua piirtoRajoihin; kaikki kolme ovat ydinkeskustassa).
2. Kirjoita jokaiselle juttu `js/packs/nahtavyysjutut.js` →
   `kobenhavn`-lohkoon samalla tyylillä kuin olemassa olevat kuusi:
   `aika`-kenttä, 4–6 kappaletta ('\n\n'), tiedot en/da-Wikipediasta
   MUTTA lauseet omat, lähteeksi `lahde: 'Wikipedia'`. Konkretiaa ja
   tarinaa, ei esitetekstiä — katso mallia Tivolin ja Rundetårnin
   jutuista.
3. Kuvat 1–3 per juttu (`kuvat`-lista: tiedosto/selite/lahde):
   vain PD/CC, lisenssi tarkistettu Commonsin API:sta, tekijä
   nimettynä lähderivillä ('Tekijä, Wikimedia Commons (CC BY-SA
   4.0)'). JOKAINEN kuva on katsottava silmin ennen kytkemistä —
   jos Commons ruuhkauttaa kontin, aja
   `.github/workflows/nouda-tarkistuskuvat.yml` (workflow_dispatch,
   tiedostonimet yksi per rivi) ja lataa artefakti. Visuaalisesti
   heikko kuva hylätään (esim. pelkkä varjo tai yksityiskohta,
   kaupunki/kohde ei näy).
4. Uudet kohteet EIVÄT saa piirrosta tässä paketissa — ne näkyvät
   kartalla numeroympyröinä (koodi tukee tätä valmiiksi); piirrokset
   teetetään myöhemmin karttaerän yhteydessä.
5. Portit: `node --test tests/*.test.mjs` ja
   `node tools/tarkista-kaksoisavaimet.mjs`. ÄLÄ aja
   uusi-versio.mjs:ää äläkä koske dist/-kansioon — Fable katselmoi,
   julkaisee ja numeroi version.
6. Checkpoint-commit vähintään 30 min välein omalle haaralle. Kun
   valmis: push, ÄLÄ mergeä — kirjoita raportti tiedostoon
   `viesti-fable.md` (repon juureen, commit + push samalle
   haaralle): mitä tehtiin, kuvien lisenssit, mitä jäi auki.

## TILANNE

Kaikki alkuperäiset paketit ovat valmiit. Kuittaukset jäivät matkan
varrella tekemättä, joten ne on koottu tähän jälkikäteen PR-numeroiden
perusteella (27.–28.7.2026).

- Paketti 1 (pikakorjaukset): ✅ PR #16
- Paketti 2 (kartta koko ruutuun): ✅ PR #18
- Paketti 3 (kaksivaiheinen matkavalinta): ✅ PR #20
  - aloitusteksti (omistajan päättämä): ✅ PR #47
- Paketti 4 (kaksi ääntä): ✅ PR #21
- Paketti 5 (sisältö, kaista B): Maailma ✅ Afrikka ✅ Eurooppa ✅ (#28, #29)
  Suomi ✅ (#30) Istanbul ✅ (#31) Aasia ✅ Oseania ✅ (#34)
  P-Amerikka ✅ (#35) E-Amerikka ✅ (#37) Lähi-itä ✅ (#41)
- Paketti 6 (pisteet ja passi): ✅ PR #24
- Paketti 7 (nimi → Matkakirja): ✅ PR #25

Pakettien jälkeen tehty omistajan toivelistan mukaan:

- Tanger maailmankartalle ja Afrikan ympäri purjehdittava reitti: ✅ #38
- Kevyempi käyttöliittymä (paneeli, äänet, ikonit, päiväkirja merelle): ✅ #39
- Aloitustarina ja saapumiskortti: ✅ #40
- Taustalaatikot pois kartan päältä: ✅ #44
- Maailmankartta kahtena pallonpuoliskona + suora hyppy mantereelle: ✅ #45
- Paketti 8 aloitettu: avausteksti, tyylipaletti, 11 kaupungin tekstit ja
  neljä kysymyskorvausta (suunnittelusessio itse): ✅
- Paketti 8 (Afrikka ensin): ✅ #55 — 21 kaupungin havainnot uusiksi,
  21 lastenvisakysymystä korvattu, saapumismerkinnät hiottu ja koko
  laudan yhtenäistämiskierros ajettu.
- Paketti 9 (aikamittari ja isoisän ennätys): ✅ — vuoro on 6 tuntia,
  yläpalkissa päiväkirjan päivämäärä, isoisän aikataulu Afrikalle ja
  80 päivän ennätys passin kunniamerkintänä.
- Yläpalkkiin pelkkä kukkaro, siirtorenkaat hillityiksi ja vaakalukko: ✅
- Paketti 12 (luonnoskirjan pulmat ja maamerkit): ✅ (28.7.2026) — viisi
  pulmaa Afrikalle, piirrokset SVG-koodina ja neljä maamerkkiä kartalle.
- Paketti 13 (pulmien variointi): ✅ (28.7.2026) — sama pulma on joka
  pelikerralla erilainen. Kolme generatiivista (hieroglyfit, punnukset,
  kuunvaiheet) ja kaksi käsin kirjoitettua varianttisarjaa.
- Paketti 14 (lentoanimaatio): ✅ (28.7.2026) — kone liitää reittiä
  pitkin ja repliikki kirjoittuu kartalle. 70 lentorepliikkiä Maailmalle
  ja Afrikalle, joista puolet hehkuttaa isoisän päiväkirjaa.
- Paketti 15 (lentorepliikkien tunnelataus): ✅ (28.7.2026) — kaikki 70
  riviä kirjoitettu uusiksi innostuksella. Neljä testiä vartioi paketin
  14 faktakorjauksia, jottei uudelleenkirjoitus palauta niitä.
- Paketti 16 (äänet): ✅ (28.7.2026) — generoitu kaiku ja kompressori,
  materiaalipohjaiset äänet (resonoiva noppa, soittorasiakello,
  FM-kolikko, sumutorvi), potkurihurina lennolle ja vireheitto
  väsymisen estoon.
- Paketti 17 (ambienssi): ✅ (28.7.2026) — kuusi äänimaisemaa (aavikko,
  meri, sademetsä, savanni, ylänkö, basaari) ja ambience-kenttä kaikille
  32 Afrikan kaupungille. Vaihto ristihäivytyksellä, merellä aina meri.
- Paketti 18 (Katso kuva -linkit): ✅ (28.7.2026) — 24 uutta wiki-kenttää
  Afrikan havaintoihin, yhteensä 30 linkkiä 29 kaupungilla. Jokainen
  otsikko tarkistettu rajapinnasta ja jokaisella on kuva.
- Paketti 11 ("Lue lisää"): ✅ (28.7.2026) — Wikipedian tiivistelmä
  tietoruudun ja saapumiskortin napista, kaikille 32 Afrikan kaupungille
  tarkistettu artikkeliotsikko.
- Paketti 10 (kysymysten vaihtelu): ✅ (28.7.2026) — isoisän väittämät,
  karttakysymykset ja tapahtumakortit vuorottelevat monivalinnan kanssa.
  Sisältö Afrikalle: 16 väittämää ja 12 tapahtumakorttia.

- Paketti 18 (Katso kuva -linkit): ✅
- Paketti 19 (matkamuistot aarrepalkinnoiksi): ✅
- Eurooppa valmiiksi, 29 kaupunkia ja 20 maata: ✅ (1.8.2026, v138)
- Peilikerros ja media-repo: ✅ (1.8.2026, v137) — media-repon PR #1
  odottaa yhdistämistä
- Kuvien tekijämerkinnät lisenssin vaatimalla tavalla: ✅ (1.8.2026)
- Astu mantereelle -napin korjaus, ylävalikko hampurilaiseksi,
  ambienssin aloituskohta ja etusivun taso: ✅ (1.8.2026, v139)
- Paketti 20 (kaupunkien omat ambienssiäänet): ✅ PR #237 (1.8.2026,
  v140) — Eurooppa valmis. Kaikilla 41 kaupungilla oma kenttä-äänitys,
  yhteensä 69 äänitettä radio aporeesta; peilaus media-repon PR #2.
  Työkalun molemmat viat korjattu (ks. alempaa: kumpikin oli
  diagnosoitu väärin). **Afrikka jätettiin myöhemmäksi omistajan
  päätöksellä 1.8.2026** — ei siis unohdus.
- Paketti 73 (irti Afrikan tähdestä: logo, pelin nimi, loput tähdet):
  ✅ PR #339 (4.8.2026, v231) — tehtiin omistajan chat-ohjeista jo ennen
  kuin paketti ehti tähän listaan. Nimistö on sitova: ks. alempaa
  "PÄÄTETTY 4.8.2026: aarteiden nimistö" ja docs/tarina.md ("Aarni ja
  unohdetut aarteet"). **Jäljellä kaksi asiaa:** (1) reponimen vaihto
  GitHubissa (Matkakirja → Unohdettu-aarre) on omistajan käsityö —
  Pages-osoite vaihtuu ja iPadin kotivalikkoasennus pitää uusia, sovi
  ajoitus; (2) avausteksti on lukittu — maininnan Aarnin luettelosta
  saa lisätä vain omistajan erillisellä luvalla, ehdota älä muuta.

## PÄÄTETTY: aarteet ja varusteet yhdistetyllä kartalla

**Omistaja vastasi kyselyyn 3.8.2026. Neljä päätöstä:**

1. **Aarremalli: yksi per maanosa.** Eurooppa, Afrikka, Lähi-itä ja Aasia
   pitävät nykyiset aarteensa, ja uudet mantereet saavat omansa. Peli
   jatkuu kunnes kaikki on löydetty; alkuun ei tarvitse palata.
2. **Ensimmäiseen erään vain monimutkaiset linssit.** Omistajan sanoin:
   *"Tee ainoastaan ne monimutkaisemmat, esim. väestön liikehdintä,
   historiakartat, oikea topografia jne. Nämä voi tehdä aarteiksi jo nyt
   vaikka toiminnallisuus vielä puuttuu. Toteutetaan ne myöhemmin."*
   Ja perään: *"Maailman radio oli myös yksi aarre."* Yksinkertaiset
   varusteet (kiikari, kompassi, kiniini) jäävät siis odottamaan.
3. **Löytäminen: laatan alta JA kokemuspisteillä.** Molemmat reitit,
   ei ostamista kaupungista.
4. **Kuluminen: sekamalli.** Osa kuluu käytössä, osa on pysyviä.

### Mitä päätökset tarkoittavat käytännössä

**Linssi ei ole varuste.** Varuste auttaa voittamaan — karsii vääriä
vastauksia, maksaa laivalipun. Linssi ei auta voittamaan lainkaan: se
näyttää maailmasta jotain mitä ei muuten näe. Juuri siksi linssit
kelpaavat aarteiksi ilman että peli menee epätasapainoon, ja siksi
päätös 4 osuu luontevasti: **linssit ovat pysyviä, varusteet kuluvat.**
Kertakäyttöinen linssi olisi julma — kerran nähtyä maailmaa ei oteta
pois.

Päätös 3 seuraa samasta: laatan alta löytyvä linssi on onnenkauppa,
kokemuspisteillä ansaittu on palkinto uteliaisuudesta. Kumpikin reitti
tarvitaan, koska pelkkä laatta jättäisi ahkeran pelaajan tyhjin käsin.

### Täysi lista edistyneistä linsseistä ja kojeista

Omistajan pyyntö: *"Listaa mitkä voisi olla näitä edistyneitä laseja
yms."* Lista on työhuoneen Lasit-välilehdellä (`js/tyohuone-data.js`,
`LASIT`) kokonaisuudessaan perusteluineen. Tiivistettynä, helpoimmasta
työläimpään:

| # | linssi | tila | mihin nojaa |
|---|---|---|---|
| 1 | **Maailman radio** | **valmis** | 87 maan suorat lähetykset ovat jo pelissä — aarteeksi tekeminen on pelkkä lukko |
| 2 | **Oikea topografia** | ideoitava | ETOPO1 on jo haettu repoon; sama ajo antaa niin monta vyöhykettä kuin halutaan |
| 3 | **Lämpökartat** (onnellisuus, BKT, väkiluku) | ideoitava | maiden rajat ja osa luvuista ovat jo pelissä |
| 4 | **Väestön liikehdintä** | ideoitava | uusi kaarikerros; YK:n muuttoliikeaineisto |
| 5 | **Animoitu historiakartta** (Silkkitie) | ideoitava | sama kaarikerros, työläin osa on aineiston vuosiluvut |
| 6 | **Ihmisen leviäminen Afrikasta** | ideoitava | sama koneisto, logaritminen aikajana |
| 7 | **Museokuva kaupungista** | ideoitava | Met, Smithsonian, Rijksmuseum — kaikki CC0 |
| 8 | **Tuulet ja merivirrat** | ideoitava | selittää pelin omat merireitit; monsuuni kääntyy puolivuosittain |
| 9 | **Yön kartta: maailma valoissa** | ideoitava | NASA Black Marble, yksi public domain -kuva |
| 10 | **Kielten kartta** | ideoitava | Glottolog/WALS; antaa selityksen Kuuntele kieltä -napille |
| 11 | **Ilmastovyöhykkeet** | ideoitava | Köppen, CC BY, valmiina monikulmioina |
| 12 | **Vanhojen karttojen linssi** | ideoitava | tarinallisesti osuvin; lisenssi tarkistettava |
| 13 | **Tähtitaivas ja sekstantti** | ideoitava | ainoa KOJE eikä linssi — siinä on tekemistä |
| 14 | **Aikavyöhykkeet ja päivämääräraja** | ideoitava | pienin työ, iso tarina: Vernen voitettu vuorokausi |

**Suositukseni järjestykseksi:** 1 → 2 → 9 → 3. Radio on valmis, ja
topografia sekä yön kartta ovat kumpikin lähes pelkkää piirtoa jo
olemassa olevasta aineistosta. Vasta niiden jälkeen kannattaa rakentaa
kaarikerros, jota kohdat 4, 5, 6 ja osin 13 kaikki tarvitsevat — se on
yksi työ, joka avaa neljä linssiä.

Aarteita on maanosia myöten tarpeen noin kymmenen, joten lista riittää
kattamaan koko kartan yhdellä kierroksella.

### Alkuperäinen pohdinta (säilytetty)

## PÄÄTTÄMÄTTÄ: aarteet ja varusteet yhdistetyllä kartalla

Omistajan linjaus 2.8.2026: *"Tässä pelissä ei tarvitse enää palata niin
sanotusti alkupisteelle, joten aarteita voi olla yksi jokaisessa
maanosassa tai niin sanottuja pääaarteita. Lisätään peliin myös
muunlaisia, niin kuin ne erikoissilmälasit ja niin edelleen. Yritän
tehdä pelistä mahdollisimman erityyppisen verrattuna Afrikan tähteen."*

Ja perään: *"Mietitään vähän myöhemmin vielä noita aarteita. Nuo
ehdotuksesi olivat hyviä ja voisit kirjata niitä ylös."*

**Tässä ne ovat. Mitään ei ole toteutettu — tämä odottaa päätöstä.**

### Lähtökohta: mikä nyt on Afrikan tähteä

Nykyiset laatat ovat käytännössä alkuperäisen pelin omat: tähti lopettaa
pelin, hevosenkenkä ohittaa kaksintaistelun, ryöstäjä vie rahat,
jalokivet ovat pelkkää rahaa ja tyhjä laatta ei tee mitään.

Erottuvin idea on tehdä esineistä **matkailijan varusteita, jotka
helpottavat matkaa ja oppimista** — eivät jalokiviä, jotka ovat vain
rahaa. Ne tarttuvat pelin OMIIN järjestelmiin: tietovisaan, päiviin ja
kelloon, passin leimoihin, matkustustapoihin ja kokemuspisteisiin.

Toinen iso ero: **tyhjä laatta pois**. Osa tyhjistä muuttuu varusteiksi,
jolloin laatan kääntäminen on aina jotain — se on Afrikan tähden
turhauttavin piirre.

### Varuste-ehdotukset

| varuste | vaikutus | mihin tarttuu |
|---|---|---|
| **Erikoissilmälasit** (omistajan oma esimerkki) | karsii tietovisassa kaksi väärää vaihtoehtoa ilmaiseksi | `actionFiftyFifty` on jo olemassa maksullisena (80 £) — varuste tekee siitä ilmaisen kerran |
| **Kiikari** | näet naapurikaupunkien laatat käymättä siellä | kiikaritehoste on jo piirretty peliin (etusivun linssi) |
| **Kompassi** | saat valita nopan tuloksen kerran | `die.js`, nopanheitto |
| **Suosituskirje** | yksi ilmainen laiva- tai lentomatka | `SEA_FARE`, `FLIGHT_PRICE`, `pendingFare` |
| **Kiniini** | estää sairastumisen, joka veisi päiviä | vaatisi uuden sairastumismekaniikan — 1873 matkustamisen todellisuutta |
| **Isoisän muistikirja** | yksi uusi yritys väärin menneeseen kysymykseen | tietovisan `chosen`/`right` |
| **Valokuvauskamera** | kuva kaupungissa: passiin leima kuvan kanssa + kokemuspisteitä | `passport.js`, `awardXp` — ei auta voittamaan vaan palkitsee uteliaisuudesta |

Kamera on näistä **kauimpana Afrikan tähdestä**: se ei liity voittamiseen
lainkaan. Silmälasit ja suosituskirje ovat **halvimmat toteuttaa**, koska
mekaniikka on jo olemassa ja varuste vain tekee siitä ilmaisen.

### PÄÄTETTY 5.8.2026: Tutki-aiheet maittain, kaupungille kansisivu

Omistajan malli: Tutki-nostot tehdään ensisijaisesti MAASTA
(js/packs/maa-kategoriat.js, ISO-3-avain) ja kaupungilla on muutaman
noston kansisivu (KULTTUURI_KATEGORIAT[cityId], aihe id 'kaupunki').
Pilotti Venetsia + Italia on mainissa (v265), ja Egypti + Kairo (v297)
todisti monistuksen: pelkkää dataa, ei koodimuutoksia. Seuraavat
maapaketit tässä järjestyksessä: Ranska, USA, Japani, Brasilia,
Australia — yksi maa per PR, kaupunkikansi samassa erässä.

**Vaiheistettu monistusohje on docs/tutki-aiheet.md:n lopussa**
("Lehtimaan monistusohje") — se on kirjoitettu niin, että sen voi
ajaa läpi ilman aiempaa kontekstia. Seuraa sitä kohta kohdalta,
erityisesti kuvien silmätarkistusta ja uutislähteen testausta.

### Lehtimaiden promptit (omistajan tilaus 5.8.2026)

Järjestys: pelin alkupisteestä (Lontoo) pääsee lentäen Madridiin,
Berliiniin ja Tukholmaan — ne ovat pelaajan ensimmäiset matkakohteet
ja siksi jonossa ensin, sitten Ranska ja muut. Yksi maa per PR.
Jokainen paketti tehdään monistusohjeen mukaan; alla vain maakohtaiset
räätälöinnit. Muista aina: kuvien silmätarkistus 480 px -thumbeina,
uutissyötteen JA yhden artikkelisivun curl-testi (UA
"matkakirja-uutisvalitys/1.0"), workerin SALLITUT + OHJE.md-merkintä,
Playwright-kuvakaappaukset 834 ja 1024 px, ja main fetchattuna juuri
ennen versionumeroa. **Workeria EI enää julkaista käsin eikä siitä
muistuteta omistajaa** (7.8.2026 alkaen): Cloudflaren Git-integraatio
julkaisee tools/uutisproxy/worker.js:n itsestään jokaisesta
main-pushista (wrangler.jsonc; ks. tools/uutisproxy/OHJE.md).

1. ✅ **TEHTY v307.** **Espanja / Madrid.** Galleria: Goyan Madrid (Pradon PD-teokset,
   esim. San Isidron niitty ja kartongit kutomoille — arjen Madridia).
   Kansikuviksi esim. Plaza Mayor tai kuninkaanlinna, Gran Vía,
   Retiron puisto. Elämä-nosto: tapakset ja markkinahallit tai paseo;
   henkilö+musiikki: Paco de Lucía tai zarzuela-perinne (Apple
   Music). Uutisehdokkaat curl-testiin: El País (feeds.elpais.com),
   RTVE, 20minutos.
2. ✅ **TEHTY v316.** **Saksa / Berliini.** Galleria: Eduard Gaertnerin Berliini-vedutat
   1800-luvulta (PD) — suora Canaletto-vastine. Kansikuvat:
   Brandenburgin portti, Museosaari tai tv-torni, East Side Gallery.
   Henkilö+musiikki: Marlene Dietrich (Apple Music). Uutisehdokkaat:
   tagesschau (tagesschau.de/xml/rss2), Spiegel, ZDF heute.
3. ✅ **TEHTY v315.** **Ruotsi / Tukholma.** Galleria: Elias Martinin Tukholma-näkymät
   1700-luvulta (PD); vaihtoehtona Vädersolstavlan-tarina nostona.
   Kansikuvat: Gamla stan ja Stortorget, Stadshuset, saaristolautat.
   Henkilö+musiikki: ABBA (Apple Music). Uutisehdokkaat: SVT
   (svt.se/rss), Sveriges Radio Ekot (api.sr.se), Aftonbladet.
   **Toteutuksessa:** uutislähteeksi tuli
   SVT (`www.svt.se/rss.xml`); Sveriges Radion Ekot hylättiin, koska
   api.sr.se antaa ATOM-syötteen ja peli lukee RSS:n `<item>`-alkioita.
4. **Ranska / Pariisi.** Galleria: Pissarron ja Caillebotten
   katunäkymät (PD). Uutisehdokkaat: Le Monde, France Info,
   Le Figaro.

### ⚠ FABLELLE: lehtirakenne muuttuu (omistajan päätös 8.8.2026)

**Lue tämä ennen kuin kirjoitat uusia saapumisia, kohtaamisia tai
visoja lehtikaupunkeihin.** Omistaja tilasi rakennemuutoksen, joka
koskee sinunkin tekstiesi sijaintia ja määrää. Opus toteuttaa
koodipuolen; tämä on tiedoksi ja työnjaon selventämiseksi.

**1. Kaupunki- ja maalehti erotetaan toisistaan.** Tähän asti
Tutki-ikkuna oli yksi pino: kaupungin kansi, kaupungin aiheet, maan
etusivu, maan aiheet ja "Maa numeroina". Jatkossa ne ovat kaksi eri
lehteä. Kaupunkilehteen jää **3–4 sivua**, maalehti on oma näkymänsä.

**2. Sisältö on jo jaettu Lontoossa (v349).** Lontoolla oli kymmenen
aihetta ja 57 nostoa, koska se tehtiin ennen sääntöä "maa kantaa
aiheet, kaupunki kantaa kannen". Nyt Lontoolle jäivät `kaupunki`,
`luonto` ja `nykytaide`; kahdeksan muuta aihetta siirtyi
`MAA_KATEGORIAT.GBR`:lle. Sama tehdään muille lehtikaupungeille.

**RAJOITE, JOKA KANNATTAA TIETÄÄ:** `rakennaSivut` antaa saman
aihetunnuksen kohdalla kaupungin voittaa, jolloin maan samanniminen
aihe **katoaa kokonaan näkyvistä**. Kaupungille jätetään siis vain
tunnuksia, joita maalla ei ole.

**3. Kaupunkilehden navigointi siirtyy alas.** "Tapaa henkilö X"
näkyy vasta VIIMEISELLÄ sivulla; sitä ennen alapalkissa ovat
Seuraava, Edellinen ja Poistu. Kohtaaminen on siis lehden
päätepiste — kirjoita saapumis- ja kohtaamistekstit sen mukaan.

**4. Maan sivulle pääsee suoraan kartalta.** Maan nimen perässä on
"i", ja uusi varuste **Maiden tiedot** avaa minkä tahansa maan tiedot
ilman että sinne pitää matkustaa nopalla. Kaupungin tiedot aukeavat
edelleen vain siinä paikassa, jossa pelaaja on.

**5. Uusi aihesivu joka kaupunkiin: `menovinkit`.** Ei oikeita
matkavinkkejä vaan parhaat paikat NETTIMATKAAJALLE — museoiden
verkkokokoelmat, virtuaalikierrokset, digitoidut arkistot. Painotus
kulttuurissa. Sivu saa näkyä myös maan lehdessä.

**Työnjako ennallaan** (omistajan päätös 7.8.2026): Opus tekee
lehdet, kartat, kuvat ja koodin; sinä kirjoitat saapumismerkinnät,
luennat, kohtaamiset ja visakysymykset. Muutos ei siirrä mitään
sinulta pois — se vain siirtää osan lehtisisällöstä kaupungilta
maalle ja lyhentää kaupunkilehden neljään sivuun.

### Lehtien tasokorotus (omistajan tilaus 7.8.2026)

Saksa/Berliini on korotettu uudelle tasolle v323–v328:ssä, ja se on
nyt MALLI. Muut valmiit lehdet (Lontoo, Kairo, Venetsia, Madrid,
Tukholma) korotetaan samaan tasoon — **yksi kaupunki per PR**, ja
Berliinistä katsotaan aina malli ennen kuin keksitään omaa. Uudet
lehtimaat (Ranska →) tehdään suoraan tälle tasolle.

Tason osat kaupunkia kohti:

1. **Maaosion aloitussivu** (`js/packs/maakartat.js` → MAAKARTAT):
   Commonsin "Relief Map of X" / sijaintikarttaperheen korkokartta,
   rajat tiedostosivulta, 4–6 kaupunkia koordinaatteineen
   (pääkaupunki `paa: true`), `nosto` (kuva + teksti aiheesta, jota
   intro sivuaa mutta mikään sivu ei näytä — Saksalla Loreley) ja
   maan intro kappaleiksi (`\n\n` europe-artikkelit.js:ssä).
   Etusivun kulmalinkki ja maaosaston siirto tulevat itsestään, kun
   MAAKARTAT-rivi on olemassa.
2. **Kaupunkisivun kohdekartta** (KAUPUNKIKARTAT + oma julistekartta):
   aja `node tools/piirra-kaupunkikartta.mjs <kaupunki>` (lisää ensin
   rajaus työkalun KAUPUNGIT-tauluun: VAIN ydinkeskusta, n. 5–8 km —
   laajempi muuttuu puuroksi; malli Mapiful-juliste). KATSO kuva
   silmin. 4–6 kuuluisaa kohdetta, joiden fi.wikipedia-artikkeli on
   TARKISTETTU (`action=query&redirects=1`). Kartta on iso ja
   kohteet merkitään numeroympyröin; selitteet syntyvät tekstinä
   kartan alle kohteiden järjestyksestä (omistajan taittopäätös
   7.8.2026) — järjestä kohteet niin, että numerot etenevät kartalla
   luontevasti. Kaksi esittelykappaletta kartan ylle. PNG sw.js:n
   SHELL-listaan.
3. **Aika-leimat**: historia-nostoihin `aika`-kenttä (tehty kaikille
   viidelle maalle v327). Muille sivuille vain, jos ajankohta on
   jutun ydin.
4. ~~**Tv tallenteiksi**~~ — **tv-napeista luovuttiin v434
   (omistajan päätös 9.8.2026), eikä tv-tehtäviä enää ole.** Älä lisää
   tv:tä missään muodossa: ei kanavahakuja, ei tallenteita, ei
   mediarivin nappia. Radio ja uutissyötteet jäävät ennalleen. Kohta
   on jätetty tähän numeroituna, jottei alempien kohtien numerointi
   muutu.
5. **Uudet aihesivut** (omistajan hyväksyntä 7.8.2026): valitse maalle
   1–2 UUTTA aihetta listasta *Urheilu, Juhlat, Sadut ja tarinat,
   Rakennukset, Meri* — vain ne, jotka maalle aidosti istuvat. Ehdotus:
   Saksa: Sadut ja tarinat (Grimm, Hamelnin pillipiipari, satutie);
   Italia: Urheilu (jalkapallo, Giro) tai Rakennukset (Rooman
   insinöörit); Espanja: Juhlat (La Tomatina, Semana Santa, kolmen
   kuninkaan päivä); Ruotsi: Juhlat (juhannus, Lucia, kräftskiva);
   Britannia/Lontoo: Urheilu (jalkapallon synty, Wimbledon); Egypti:
   Rakennukset (pyramidit-insinöörinäkökulma). Sama nostomuoto ja
   mitat kuin muillakin aiheilla (docs/tutki-aiheet.md), enintään 9
   aihetta per lehti.
6. **Musiikki soi**: musiikkiNayte (vapaa äänite, mp3/transkoodi) tai
   esikuuntelu-hakutermi — ohje docs/tutki-aiheet.md:ssä. Tehty
   kaikille viidelle maalle v325; uusille maille alusta asti.
7. **Sarjakuva lehden viimeiseksi aiheeksi** (7.8.2026, malli DEU:
   Max ja Morits): maan klassikko, jonka tekijä on ollut kuolleena
   yli 70 vuotta — ruudut galleria-kenttään ja tarina selitteisiin
   ruutu ruudulta. Ehdokkaita: Britannia Ally Sloper (1867), Ranska
   Bécassine (Pinchon k. 1953 — PD), Ruotsi 91:an tai Adamson
   (TARKISTA tekijän kuolinvuosi ennen käyttöä). Jos varmaa
   PD-klassikkoa ei ole, jätä sarjakuva pois.
8. **Päivän kuva** tulee maa-etusivulle ITSESTÄÄN (v331: Commonsin
   päivän kuva + suomennettu kuvateksti) — ei maakohtaista työtä.
9. **Saapumismerkinnät dekkareiksi** (7.8.2026): kaupungin merkintä
   uusitaan docs/isoisan-raamattu.md:n mukaan (Horatio Fogg, herra
   Grimshaw, motiivit, mitat) ja sille kirjoitetaan luenta-kenttä
   tunnetageineen. Luennat generoidaan `tools/generoi-luennat.mjs`
   -työkalulla — avaimen antaa omistaja ajon ajaksi. Mallit: lontoo,
   madrid, berliini, tukholma, venetsia (europe-saapumiset.js).
10. **Kohtaamisluennat** (7.8.2026, pilotti Lontoossa): kohtaamisen
    tervehdys ja löytöhetken sananvaihto luetaan ääneen eri äänillä —
    kertoja, hahmo ja pelaaja (nuori herra Fogg = "Jaakko"). Kaupungin
    tervehdys lyhennetään ~140 merkkiin (omistaja: "puolet lyhyempi"),
    löytöön kirjoitetaan hahmon ja pelaajan lyhyt dialogi
    ("kiireesti seuraavaan paikkaan").
    Kentät tervehdysLuenta/loytoLuenta (js/packs/kohtaamiset.js),
    hahmon ääni valitaan tilin suomiäänistä ja kirjataan
    `tools/generoi-kohtaamiset.mjs`:n HAHMOT-tauluun, generointi sillä
    työkalulla ja kaupunki lisätään ui.js:n KOHTAAMISLUENNAT-joukkoon.
    Tyhjä/väärin-repliikkejä EI lueta. Malli: lontoo (jokietsijä Ned).
11. **Valokuvaus-sivu** (7.8.2026, malli DEU/Ottomar Anschütz):
    maan oma aihesivu, jonka nosto esittelee maan valokuvaajan —
    mutta VAIN jos maalta löytyy vapaasti käytettävä (PD/CC)
    valokuvaaja, jonka kuvat on tarkistettu Commonsista. Omistaja:
    "kaikkiin kaupunkeihin ei tarvitse kaikkia sivuja liittää" —
    sivu jää pois, jos hyvää valokuvaajaa ei ole. Sivun loppuun
    ui.js liittää Päivän kuva maailmalta -palstan itsestään (id
    'valokuvaus'). HUOM: tiedosto-kentät yhdelle riville, muuten
    peilaustyökalu ei poimi niitä (tools/peilaa-media.mjs).
    **Omistajan rajaus 7.8.2026: "Jätetään valokuvaus varsin
    vähälle"** — Saksan sivu riittää toistaiseksi, uusia vain
    erityisen hyvästä syystä. (Tausta: tekijänoikeus estää
    kuuluisien 1900-luvun jälkipuolen kuvaajien työt; netissä
    julkaisu tai lähteen maininta EI ole lupa — vain PD/CC käy,
    koska peli peilaa ja jakelee kuvat.)
12. **Elokuva-sivu** (omistajan toive 7.8.2026: "Elokuva pitää
    lisätä vaihtoehtoihin myös. Ainakin jenkit ja nollywood"):
    maan oma aihesivu samalla kaavalla kuin Valokuvaus — vain
    maille, joiden elokuvasta on kerrottavaa JA joilta löytyy
    vapaita kuvia. Kirjatut kohteet, kun kaupungit saavat lehtensä:
    - **Yhdysvallat / Hollywood:** mykkäkauden aineisto on
      turvallisinta — ennen vuotta 1930 julkaistut yhdysvaltalaiset
      elokuvajulisteet, mainoskuvat ja stillit ovat PD (Chaplin,
      Keaton, Harold Lloydin kellonviisari). Uudempien elokuvien
      julisteet ja stillit ovat tekijänoikeuden alla — ei niitä.
    - **Nigeria / Nollywood:** määrältään maailman toiseksi suurin
      elokuvateollisuus — hieno, yllättävä juttu lukijalle. Kuvitus
      on hankalin osa: julisteet eivät ole vapaita, joten kuvat
      haetaan Commonsista CC-lisensseillä (esim. kuvauspaikat,
      näyttelijät festivaaleilla) ja tarkistetaan kuten aina.
    - Muillekin maille saa tehdä, jos tarina ja vapaat kuvat
      löytyvät (esim. Saksan 1920-luvun mykkäelokuva: Metropolis,
      Caligari — ennen 1930 julkaistu aineisto on Yhdysvalloissa
      PD ja julisteet pääosin myös EU:ssa; tarkista tapauskohtaisesti).

**TYÖNJAKO (omistajan päätös 7.8.2026): Opus tekee vain
sanomalehdet** — lehtisivut, kuvat, uutislähteet ja taiton.
Matkakirjatekstit (saapumismerkinnät + luennat), kohtaamiset ja
visakysymykset kirjoittaa suunnittelusessio (Fable) raamatun ja sen
Eurooppa-suunnitelman mukaan. Kohdat 9 ja 10 ovat Opukselle vain
taustatietoa, eivät tehtäviä.

Muista joka PR:ssä: kuvien silmätarkistus 480 px, Playwright-kaappaukset
390/834/1024 ja niiden KATSOMINEN, main fetch juuri ennen versiota.

### PÄÄTETTY 5.8.2026: Tutki on paikallislehti (suunnittelusessio tekee)

Omistajan visio ("Tee vain kaikki"): kansisivullisen kaupungin
Tutki-ikkuna on paikallislehti. Kuusi osaa, suunnittelusessio toteuttaa
itse — Opuksen ei tarvitse ottaa näistä paketteja, mutta uudet maapaketit
saavat noudattaa lehtimallia (resepti: docs/tutki-aiheet.md).

1. ✅ v270: Etusivutaitto — masto (ylärivi, kaupungin nimi isolla,
   päiväysrivi), kansiosio etusivulle, maa omana osastonaan samalle
   sivulle, alanapit lehtimäisiksi.
2. ✅ v270: Teosgalleria nostoon (`galleria`-kenttä; pilotti Canaletto,
   6 teosta) — nuolet, laskuri, selite ja lähde vaihtuvat.
3. ✅ v270: Lehden minitehtävä (`tehtava`-kenttä aiheella; pilotti
   Italian Ruoka) — vastaus löytyy saman sivun tekstistä, +10 puntaa,
   kerran per lehti.
4. ✅ v272: Sääennuste etusivulle (Open-Meteo, avaimeton; ilman
   verkkoa rivillä lukee kuukausinormaali), napautus avaa koko vuoden
   keskilämmön ja sademäärän graafina (js/saa.js +
   js/packs/saatiedot.js — uusi lehtikaupunki tarvitsee vain
   koordinaatit ja normaalit sinne).
5. ✅ v274: "Etsi kätkö" tarinallisena kohtaamisena (pilotti Venetsia,
   js/packs/kohtaamiset.js): nappi "Tapaa gondolieeri", hahmon
   tervehdys kirjoittuu visakortille ennen kysymystä (kerran per
   istunto), hahmo kehystää kysymyksen ja päättää kohtaamisen omalla
   repliikillään (löytö / tyhjä kätkö / väärä vastaus).
   Kohtaamiskaupungissa muotoarvonta ohitetaan (hahmo kysyy itse;
   isoisän pulma pysyy etusijalla). Esityskerros — pelimoottori ja
   tallennukset ennallaan.
6. ✅ v276: Ajankohtaiset uutisotsikot paikallisella kielellä
   maaosastoon (pilotti Italia/ANSA; js/uutiset.js +
   js/packs/uutislahteet.js). Popup pelin kirjasimilla, otsikoita ei
   lyhennetä eikä mukailla; "Käännä suomeksi" -nappi (MyMemory).
   Omistajan worker on käytössä 5.8.2026 alkaen (v279, osoite
   uutislahteet.js:ssä). Uuden maan lähde lisätään sekä
   uutislahteet.js:ään että workerin sallittujen listaan ja worker
   julkaistaan uudelleen (tools/uutisproxy/OHJE.md).

### PÄÄTETTY 6.8.2026: Valtion analyysi (erillinen sessio tekee)

Lehden maaosasto saa jatkokseen "Maa numeroina" -sivun (aikasarjat
muste+kulta-käyrinä, Suomi vertailuviivana, sanalliset tulkinnat)
ja uuden Vertailulinssi-varusteen. Sitova suunnitelma:
**docs/valtion-analyysi.md**. Tämä EI kuulu Opuksen lehtijonoon —
erillinen sessio toteuttaa viidessä vaiheessa, ja valmiina sivu
syntyy jokaiselle maalle datasta ilman käsityötä. Uusia lehtimaita
tehdessä tätä ei tarvitse huomioida mitenkään.

### PÄÄTETTY 4.8.2026: aarteiden nimistö (sitova kaikessa sisällössä)

Peli irrotetaan Afrikan tähdestä kokonaan — aarre ei ole tähti missään
pelaajalle näkyvässä tekstissä, nimessä eikä symbolissa (laatan ja
nappulan merkki on nyt ◈). Nimistö, joka on käytössä v229:stä alkaen:

- **unohdettu aarre** (engl. *forgotten treasure*) — arkitermi säännöissä,
  ilmoituksissa ja laattatyypin nimenä. Ei "pääaarre" eikä "tähti"
  pelaajateksteissä; koodikommenteissa pääaarre saa elää.
- **Aarnin luettelo** (engl. *Aarni's Catalogue*) — tarinan erisnimi:
  tutkimusmatkailija Aarni luetteloi 1800-luvun alussa maailman unohdetut
  aarteet, kukaan ei uskonut, isoisä uskoi ja hänen matkansa jäi kesken.
  Tämä on pelin keskeinen ajojahti. Koko tarina: docs/tarina.md
  ("Aarni ja unohdetut aarteet") — lue se ennen aarteisiin liittyvää
  sisältöä. Laudan omat aarrenimet (kivilintu, jadesinetti…) säilyvät
  luettelon riveinä; maailmankartan aarretta ei nimetä (revitty sivu).

### Aarrevaihtoehdot

1. **Yksi per maanosa** *(oma suositukseni)*. Eurooppa, Afrikka, Lähi-itä
   ja Aasia pitävät kukin nykyisen aarteensa — Meripihkahuone, tähti ja
   niin edelleen. Sisältöä ei tarvitse heittää pois, ja peli jatkuu
   kunnes kaikki on löydetty. Sopii siihen ettei alkuun tarvitse palata.
2. **Yksi pääaarre, muut sivuaarteita.** Selkeämpi päämäärä, mutta kolme
   nykyistä aarretta menettää asemansa.
3. **Ei aarrejahtia lainkaan.** Passin leimat, kokemuspisteet ja
   päiväkirja ovat päämäärä. Kauimpana Afrikan tähdestä, mutta poistaa
   nykyisen loppuhuipennuksen.

### Mitä pitää päättää ennen toteutusta

- Kumpi aarremalli
- Mitkä varusteet ensimmäiseen erään
- **Miten varusteet löytyvät:** laatan alta (suositus — poistaa tyhjän
  laatan turhuuden), ostamalla kaupungissa, vai kokemuspisteillä
- Kuluvatko varusteet käytössä vai ovatko pysyviä


## Avoimet asiat

**Matkakirjan kuvien ja tekstien vastaavuus** (omistaja 5.8.2026):
*"jossain välissä pitää tarkistaa, että matkakirjan kuvat vastaavat
tarpeeksi hyvin matkakirjan tekstejä eri kaupungeissa. Esimerkiksi
Quiton tekstissä puhutaan viivasta, jonka päälle voi astua, mutta
minusta sitä ei näy ainakaan niissä kuvissa."* Käytävä läpi ne
kaupungit, joiden teksti viittaa konkreettiseen yksityiskohtaan: joko
kuva vaihdetaan sellaiseen joka näyttää sen, tai teksti muutetaan
vastaamaan kuvaa. Ei vielä aloitettu.

**Media-repon PR:t #1 ja #2 on yhdistetty** (1.8.2026), joten peili on
käytössä ja sisältää myös Euroopan kaupunkiäänitykset.

**Yhdistämisjärjestys, jos peiliin tulee lisää aineistoa:** media-repo
ensin, pelirepo vasta sen jälkeen. Peli hakee aineiston ensisijaisesti
peilistä, ja kolmen epäonnistuneen haun jälkeen peili ohitetaan koko
istunnoksi — myös kuvien osalta. Väärä järjestys ei riko peliä, mutta
tekee siitä hitaan siihen asti kun välilehti suljetaan.

**Peilin koko kannattaa katsoa ennen Afrikkaa.** Mitattu manifestista
1.8.2026 illalla (`du --exclude=.git` antaa saman luvun):

    ennen pakettia 20   kuvat 111 + liput 0,3 + äänet 181  =  292 Mt
    nyt             kuvat 110 + liput 0,3 + äänet 352  =  463 Mt
    ilman 3 min katkoa                                  ≈  638 Mt

Kolmen minuutin katko siis säästi noin 175 megatavua, mutta peili
**kasvoi silti 292 → 463 megatavuun** — 69 uutta äänitettä on iso erä.
(Aiemmin tähän oli kirjattu "peili pieneni 580 → 399 Mt". Se oli väärin:
580 oli mitattu .git-hakemisto mukaan lukien ja 399 oli suoranainen
mittausvirhe. Älä käytä niitä lukuja.)

Afrikan 39 kaupunkia toisivat samalla mitoituksella noin **320 Mt**
lisää, jolloin peili olisi ~780 Mt. GitHub Pagesin suositusraja on 1 Gt,
joten tila riittää mutta ei enää väljästi. Keinot, jos halutaan
pienemmäksi: yksi äänite kaupunkia kohti kahden sijaan (puolittaa),
lyhyempi katko kuin kolme minuuttia, tai äänitteiden uudelleenkoodaus
matalammalle bittinopeudelle (nykyiset ovat 128–320 kb/s, ja moni on
kaksikanavaista kohinaa jolle mono riittäisi).

Työhuoneen etusivun tilastot lukevat nämä luvut suoraan peilin
manifestista, joten ne eivät voi vanhentua tämän dokumentin mukana.

**Venäjänkielisten vähemmistöjen liput** (Ukraina, Viro, Latvia,
Liettua) jätettiin pois omistajan päätöksellä 1.8.2026. Muilla
vähemmistökielillä lippu on. Älä palauta niitä.

Aiemmat: ei avoimia asioita. Paketin 12 pulmien verkkotarkistus tehtiin
28.7.2026 (suunnittelusessio): xhosan naksutuskuvaukset (c dentaalinen,
x lateraalinen "hevosen hoputus", q "korkin poksahdus") ja Timbuktun
käsikirjoitusviite (Kashf al-Ghummah fi Nafa al-Ummah, al-Ghalawi 1733,
Mamma Haidara -kirjasto, Library of Congressin näyttely — opettaa
laskemaan vuodenaikojen alut tähtien liikkeistä) täsmäävät lähteisiin.
Ashantien 3 %:n tarkkuusväitettä ei ole julkaistussa tekstissä.

## Seuraavaksi: PAKETTI 20 AFRIKALLE

**Paketit 1–20 ovat valmiit Euroopan osalta.** Paketin 20 kohta 9
("tee sama Afrikalle") on jäljellä: työkalu ja pelin puoli ovat valmiit,
joten Afrikka on pelkkä ajo, karsinta ja peilaus — mutta lue ensin
peilin kokoa koskeva avoin asia yltä. Lue myös osio "Tilanne 1.8.2026",
jossa on kaikki mitä tarvitset kummankin repon jatkamiseen.

Äänistä: omistaja käy äänet läpi viritysivulla `/aanet.html` ja antaa
äänikohtaisen palautteen — älä tee uutta äänten yleisremonttia ennen
sitä palautetta. Paketti 20 on eri asia: se ei muuta olemassa olevia
ääniä vaan hakee kaupungeille omat.

## Tilanne 1.8.2026 — lue tämä ensin

Kaksi sessiota teki töitä rinnakkain: toinen pelirepossa, toinen
media-repossa. Tähän on koottu kummankin tilanne, jotta yksi sessio voi
jatkaa molempia.

### Pelirepo (ravelius/Matkakirja)

Main on ajan tasalla, versio **2026-08-01.139**. Kaikki alla oleva on
jo mainissa — älä tee uudestaan.

- **Eurooppa on valmis.** Kaikilla 41 kaupungilla on saapumismerkintä,
  kolme kulttuurinostoa kuvineen, monivalintakysymys, vanha ja uusi
  valokuva sekä oma artikkeli. Maatietoja 29.
- **Peilikerros** (`js/media.js`): kuvat ja äänet haetaan kolmessa
  portaassa — paikallinen kopio → peili → alkuperäinen lähde. Peilin
  polku lasketaan samalla säännöllä kuin `tools/peilaa-media.mjs`,
  ja `tests/media.test.mjs` vartioi ettei sääntö eriydy.
  `PEILI_JUURI` = `https://ravelius.github.io/Matkakirja-media/`.
- **Tekijämerkinnät**: kaikilla CC BY / CC BY-SA -kuvilla on tekijän
  nimi (`tools/lisaa-tekijat.mjs`). Lippujen tekijät ovat
  `js/packs/lippu-tekijat.js`:ssä ja näkyvät periaatelapussa.
- **Työhuone** (`tyohuone.html`) näyttää nyt myös Euroopan tekstit.
- Ambienssin aloituskohta arpoutuu; etusivun taso on puolitettu.

Tarkistustyökalut, aja nämä kun sisältö muuttuu:

    node tools/tarkista-wikit.mjs      # wiki-linkit, 0 kuollutta
    node tools/lisaa-tekijat.mjs       # kuvien tekijämerkinnät
    node tools/build-standalone.mjs    # yhden tiedoston versio
    npm test                           # 322 testiä

### Media-repo (ravelius/Matkakirja-media)

- **PR #1 on auki** haarasta
  `claude/kloonaa-matkakirja-peilaa-media-xzw23f`. Se sisältää peilatun
  aineiston. **Se pitää yhdistää mainiin** — GitHub Pages tarjoilee
  mainia, joten peili alkaa toimia vasta yhdistämisen jälkeen. Pages on
  jo päällä ja palauttaa `access-control-allow-origin: *`.
- Peilaus ajetaan pelirepossa: `node tools/peilaa-media.mjs`
  (oletushakemisto on repon vieressä oleva `Matkakirja-media`; muualle
  `--ulos <polku>`). Nimi on isolla alkukirjaimella syystä: 2.8. asti
  oletus oli pienellä, ja Linux teki siitä toisen tyhjän hakemiston,
  jolloin peilaus alkoi joka kerta nollasta.
- Työkalu ohittaa jo ladatut tiedostot, joten uusintajo on nopea.
  **Aja se aina, kun peliin tulee uusia kuvia tai ääniä.**
- Peiliin menevät mp3:t leikataan kolmeen minuuttiin latauksen
  yhteydessä. Ennen 1.8. peilatut ovat yhä täysmittaisia; ne saa
  lyhennettyä ilman uutta latausta komennolla
  `node tools/leikkaa-peilin-aanet.mjs --ulos <media-repo>`
  (`--kuiva` näyttää mitä tapahtuisi).

Peilaustyökalusta korjattiin 1.8. kolme vikaa. Älä palauta vanhaa
käytöstä:

- Heittomerkilliset tiedostonimet (`Château d'If`) katkesivat
  ensimmäiseen hipsuun. Nyt luetaan kumpikin lainausmerkkityyppi.
- Aikaraja oli 5 min, mikä katkaisi yli 25 megatavun äänitteet kesken.
  Katkennut tiedosto jäi levylle pysyvästi, koska olemassa oleva
  tiedosto ohitettiin kokoa tarkistamatta. Aikaraja on nyt 20 min ja
  koko tarkistetaan palvelimen ilmoittamaa vasten.
- Pelkkä HTTP 200 ei erota kuvaa virhesivusta. Nyt katsotaan tiedoston
  alkutunniste. **Kokoraja ei kelpaa mittapuuksi** — yksivärinen lippu
  pakkautuu 320 pikselin levyisenä muutamaan sataan tavuun.

Neljäs vika löytyi 1.8. illalla: odotettu koko luettiin uudelleen-
ohjausketjun **viimeisestä** content-length-otsakkeesta, jolloin
välipalvelimen hetkellinen virhevastaus antoi odotetuksi kooksi 170
tavua ja täysin ehjä lataus tuomittiin katkenneeksi. Nyt kelpuutetaan
vain onnistuneen (200) vastauksen ilmoittama koko.

Huom: Commons vastaa olemattomaan tiedostoon **404**, ei 200. Jos
näet vastakkaisen väitteen vanhassa raportissa, se on virheellinen.

### Lähdeaineisto

`tools/peilaa-media.mjs --vain tekstit` hakee 168 wikitekstiä
kansioon `lahteet/`. Ne ovat raaka-ainetta pelin omien tekstien
kirjoittamiseen, eivät julkaistavaa sisältöä — siksi ne ovat
media-repon .gitignoressa. Ne saa milloin tahansa uudestaan.


## Paketti 55: perustiedot 66 kaupungille — VALMIS v178 2.8.2026

Aasian ja Lähi-idän kaupungeilta puuttui wiki-artikkeli, ambienssi ja
maatunnus — **kaikilta, myös alkuperäisiltä laudoilta**. Ilman wikiä
kaupungista ei saa kuvia eikä tiivistelmää, ja ilman ambienssia kaupunki
on mykkä.

**Nyt kaikilla 143 kaupungilla on kumpikin.** Maatunnuksia on 87 (loput
odottavat Aasian maarajoja, joita ei ole vielä olemassa).

Korjaus meni sekä `asia.js`:ään että `middleeast.js`:ään, joten se
hyödyttää myös alkuperäisiä lautoja — ei vain yhdistettyä.

### Kolme virhettä, jotka kaikki opettivat saman asian

**1. Hiljainen nieleminen teki verkkovirheestä sisältövirheen.**
Ensimmäinen ajo ilmoitti, ettei 46 kaupungille löydy artikkelia — mukana
Tokio, Delhi ja Bangkok. Wikipedia oli vastannut 429 "too many
requests", ja työkalu tulosti sen puuttuvana artikkelina. Se on sama
virhe kuin äänipuolella aiemmin.

**2. Hidastus oli väärä korjaus.** Lisäsin taukoja ja
uudelleenyrityksiä, ja seitsemän kaupunkia kaatui silti. Oikea korjaus
oli **niputtaa kyselyt**: MediaWiki ottaa viisikymmentä nimeä yhdellä
pyynnöllä ja Wikidata viisikymmentä tunnusta. Koko työ mahtuu
kouralliseen pyyntöjä, eikä rajaa tarvitse kiertää lainkaan. Ajo lyheni
viidestä minuutista muutamaan sekuntiin.

**3. Kirjoitussuodatin ohitti puolet kaupungeista hiljaa.** Se hyväksyi
vain rivit, jotka alkavat aaltosulkeella — mutta aloituskaupungit on
kirjoitettu useammalle riville. Juuri ne jäivät täydentämättä: Tokio,
Peking, Istanbul, Kairo. Ajo ilmoitti onnistuneensa.

Yhteinen opetus: **työkalu, joka ei erota "ei löytynyt" ja "ei
kysytty" -tapauksia, valehtelee onnistumisesta.**

### Käsin päätetyt kohdat

- **Ambienssi** on makuasia eikä sitä voi hakea mistään: Bagdad on
  basaari, Jakutsk on pohjoinen, Borneo on sademetsä. Arolle ei ole
  omaa ääntä, joten Astana ja Ulan Bator saavat savannin — molemmat
  ovat avointa ruohotasankoa ja ääni on sama tuuli heinikossa.
- **Kolme otsikkoa poikkeaa pelin nimestä:** Soul on suomeksi
  täsmennyssivu (kaupunki ja musiikkityyli), Kamtšatka on artikkelina
  niemimaa, ja Petra on etunimi. Ne haetaan tarkemmalla otsikolla.
- **Singaporella ja Hongkongilla ei ole sijaintimaata** Wikidatassa —
  ne ovat itse valtio tai erityishallintoalue. Tunnus annetaan käsin.


## PÄÄTETTY, EI VIELÄ TEHTY: minipelit rakenteilla oleviin kaupunkeihin

Omistajan linjaus 3.8.2026: "Näistä ja muista tässä listassa voisi tehdä
minipelejä rakenteilla oleviin kaupunkeihin. Käytä apuna museoiden kuvia
yms uusia lähteitä mitä mietittiin."

Eli: peli-ideat eivät jää listaksi, vaan ne toteutetaan **niihin
kaupunkeihin, jotka ovat nyt työn alla** — Aasia ja Lähi-itä. Lähteinä
museokokoelmat ja muut aiemmin sovitut avoimet lähteet.

**Kevyimmät ensin, koska aineisto on jo pelissä:**

| minipeli | aineisto | tila |
|---|---|---|
| Kielitunnistus | 31 nauhoitettua kielinäytettä | valmiina |
| Lipputunnistus | 83 lippua peilissä | valmiina |
| Valokuvan paikannus | kaupunkien valokuvat | valmiina |
| Lähikuvatunnistus | museoesineet, kaupunkikuvat | uusi haku |
| Aikajana | kaupunkien historiatiedot | kirjoitettava |
| Äänitunnistus | xeno-canto, ambienssit | uusi haku |

**Museokuva kaupungista** on omistajan mukaan tärkein suunta, ja se
siirtyi Lasit-välilehdelle vasta siksi, että se oli neljän ylimmän
joukossa — sisällöllisesti se kuuluu myös tänne.

**Sääntö kaikille:** aineisto haetaan etukäteen pelipaketteihin, ei
lennossa. Muuten tehtävä jää tulematta juuri silloin, kun peliä eniten
pelataan — yhteydettömänä.


## Paketti 68: Aasian kuvakortit — VALMIS v192 3.8.2026

40 Aasian ja Lähi-idän kaupunkia sai kuvakortin: vanha valokuva,
päiväkirjan mainitsemat näkymät ja nykypäivä. **184 kuvaa.** Loput 23
tulevat kun parvi ehtii.

Uusi työkalu `tools/kirjoita-kuvakortit.mjs` luo kortit tyhjästä
laudalle, jolla niitä ei ole (`lisaa-kuvapinoon.mjs` vain täydentää jo
olemassa olevia).

### Neljä tarkistusta, koska ne ovat neljä eri kysymystä

187 ehdotuksesta hylättiin kolme, ja kaikki kolme samasta syystä:
**Commonsin päiväys oli museon skannauspäivä**, ei kuvan ikä.

- `riad/vanha` — Commons sanoo 2024
- `teheran/vanha` — Antoin Sevruguinin valokuva, Rietbergin museon
  kokoelmatunnus 2023
- `persepolis/vanha` — sama museo, tunnus 2022

Sevruguin kuoli 1933, joten kuva on varmasti aito. Työkalu hylkäsi sen
silti, ja se on oikein: **turvallinen oletus on hylätä se, mitä ei voi
todentaa.** Kolme kuvaa katsotaan käsin erikseen.

Aiemmin (v185) sama tarkistus otti vain suurimman vuosiluvun ja
hylkäsi aitoja kuvia; nyt se ottaa vuosiluvun sekä päiväyksestä että
kuvauksesta ja luottaa vanhempaan. Silti se ei auta, jos kumpikaan
kenttä ei mainitse alkuperäistä vuotta.


## Paketti 72: laajennussuunnat työhuoneeseen — VALMIS v197 3.8.2026

Omistajan idea: *"Voisin hakea apurahaa tämän projektin laajentamiseen.
Siinä olisi sen laajennuksen idea — luoda helppokäyttöinen työkalu,
jota myös lapset osaisivat käyttää koulussa, esimerkiksi
opettajanjohdolla, missä he voisivat tehdä omansa paikkakunnan kartan
ja lisätä sinne sisältöä ja tehdä kysymyksiä ja vastauksia ja samalla
opetella myös."*

### Oma osionsa, ei uusi rivi Peli-ideoihin

Suunnitelma-välilehdellä on viisi listaa, joissa kaikissa on yhden
julkaisun kokoisia asioita: aarteita, varusteita, minipelejä.
Vuoden hanke samassa listassa näyttäisi yhtä isolta työltä kuin
uusi varuste, ja se hämärtäisi molemmat.

Uusi taulu `LAAJENNUKSET` ja oma osio **Laajennussuunnat** viimeisenä.
Sinne tulee vain se, mikä vaatii rahoitusta tai enemmän aikaa kuin
yksi julkaisu.

### Kirjoitettu hakemuspohjaksi, ei muistilapuksi

Tavallinen ideamerkintä olisi ollut kaksi lausetta. Tämä on
jäsennetty kenttiin, jotka apurahahakemus joka tapauksessa kysyy:

| kenttä | mitä siihen kuuluu |
|---|---|
| `idea` | mitä rakennetaan |
| `miksi` | miksi se opettaa — pedagoginen perustelu |
| `tekoaly` | tekoälyn rooli, rajattuna |
| `valmiina` | mikä on jo olemassa |
| `puuttuu` | mitä pitäisi rakentaa |
| `vaikeat` | tiedossa olevat vaikeat kohdat |
| `huomiot` | rajausneuvot hakemukseen |

Kaksi kenttää ovat mukana harkiten.

**`valmiina`**, koska hankkeen uskottavuus on suurin, kun se ei ala
tyhjästä: pelimoottori, karttapiirto, viisi kysymysmuotoa, avoimien
aineistojen haku lisensseineen ja koko sisältöputki ovat jo olemassa
ja toiminnassa.

**`vaikeat`**, koska hakemuksessa realistisuus vakuuttaa enemmän kuin
innostus. Kolme kohtaa on kirjattu: alaikäisten kuvien tietosuoja,
julkisen sisällön moderointi, ja se että helppokäyttöisyys on
hankkeen ydin eikä kuori — työkalu, joka vaatii ohjeen, jää
oppitunnilla käyttämättä.

### Pedagoginen ydin yhdessä lauseessa

Merkinnän tärkein kohta on se, että **oppiminen tapahtuu tekemisessä,
ei pelaamisessa**. Kysymyksen laatiminen vaatii aiheen ymmärtämistä
selvästi enemmän kuin siihen vastaaminen: pitää tietää mikä on
olennaista, mikä on uskottava väärä vaihtoehto ja mistä tiedon voi
tarkistaa.

Tekoälyn rooli on rajattu tarkoituksella: se **ehdottaa**, oppilas
päättää. Silloin lapset näkevät myös sen, että tekoäly ehdottaa
väärin — ja se on osa opetusta, ei hankkeen vika.

### Rivinpituus tyylissä

`.laajennus p { max-width: 62ch }`. Muut suunnitelmakortit ovat kolme
riviä, tämä on hakemuksen mittainen. Kannettavalla koko leveys olisi
yli 150 merkkiä riviä kohti, eikä silmä löydä seuraavan rivin alkua.


## Paketti 71: studio sivun sisään, tilat näkyviin — VALMIS v196 3.8.2026

Kaksi omistajan toivetta samassa julkaisussa, ja yksi bugi, jonka
omistaja huomasi kesken työn.

### Äänistudiolla ei ole enää omaa sivua

Toive: *"Äänistudiosta voi ottaa erillisen sivun pois. Olisi hyvä, että
se pyörisi samoilla sivuilla."*

`aanet.html` poistettiin. Sen sisältö jaettiin kolmeen osaan:

| mihin | mitä |
|---|---|
| `tyohuone.html`, Studio-osio | markup |
| `css/tyohuone-aanistudio.css` | tyylit, kaikki `#tab-studio`-alla |
| `js/tyohuone-aanistudio.js` | logiikka, `kaynnistaAanistudio()` |

Studio ladataan **laiskasti**: moduuli haetaan vasta kun Studio-
välilehti avataan ensimmäisen kerran. Se lukee kaikki äänipaketit ja
rakentaa satoja rivejä DOMia, eikä sitä kannata tehdä joka kerta kun
työhuone avataan.

### Nimestä pitää näkyä, kumpaan sovellukseen tiedosto kuuluu

Tiedostot olivat aluksi `js/aanistudio.js` ja `css/aanistudio.css`, ja
`tests/sw.test.mjs` kaatui heti: se vaatii, että jokainen `js/`-moduuli
on pelin `sw.js`:n SHELL-listalla, muuten peli hajoaisi lentokoneessa.
Studio kuuluu työhuoneeseen, ei peliin.

Poikkeuksen lisääminen testiin olisi ollut yhden rivin korjaus. Tein
sen sijaan uudelleennimeämisen `tyohuone-`-etuliitteellä, jolloin
olemassa oleva sääntö kattaa sen ilman erikoistapausta. **Kun testi
valittaa nimestä, nimi on useammin väärässä kuin testi.**

### Julkaisutyönkulusta puuttui puolet työhuoneesta

`cp`-rivi `.github/workflows/pages.yml`:ssä olisi kaatunut poistettuun
`aanet.html`:ään. Sitä korjatessa selvisi isompi asia: rivi ei
kopioinut **koskaan** `tyohuone.webmanifest`-, `tyohuone-sw.js`- eikä
`tyohuone-kasikirja.html`-tiedostoja.

Työhuone siis latautui Pagesissa, mutta ei asentunut kotivalikkoon
eikä toiminut verkotta — ja sen huomaa vasta puhelimella. Molemmat
korjattu.

### Tila-osio: mitä peilissä ja repoissa on

Toive: *"Näkyykö siellä Cloudflaren ja repon käyttämät tilat? Voisi
näkyä etusivulla."*

Tilanne-välilehdelle tuli Tila-osio. Luvut tulevat kahdesta lähteestä:

- **Peili** — `manifesti.json` R2-ämpärin juuresta. Se on ainoa paikka,
  josta kopioiden määrän ja koon näkee ilman ämpärin listaamista, ja se
  päivittyy jokaisella peilausajolla. Kentät tarkistettiin elävää
  manifestia vasten: `kuvat` 692, `liput` 111, `aanet` 176, `tekstit`
  276. Lähdeteksteillä ei ole `koko`-kenttää, joten niistä näytetään
  vain kappalemäärä.
- **Repot** — GitHubin rajapinnan `size`, kibitavuina.

Molemmat haetaan **aikarajan kanssa ja toisistaan riippumatta**. Ilman
`AbortSignal.timeout`ia fetch ei kaadu vaan jää roikkumaan, ja koko
taulukko jäisi tyhjäksi. Nyt kumpi tahansa puoli näkyy heti kun se
saapuu, ja puuttuva puoli näkyy viivana eikä estä toista.

GitHub päästää tunnistautumatta 60 kutsua tunnissa, ja rajan tullessa
vastaan tulee HTTP 403. Se erotetaan omaksi viestikseen: pelkkä "ei
saatu haettua" näyttäisi rikkinäiseltä, vaikka kyse on odottamisesta.

### Bugi: työhuoneessa soi ambienssi, jolle ei ollut lähdettä

Omistaja kesken työn: *"Työhuone soittaa taustalla ambienssi ääntä.
Siellä ei ole siis työhuoneen oma soitin päällä, vaan tulee jotain
muuta kautta."*

Kartat-välilehden kehyksessä pyörii **oikea peli** katselutilassa — ja
peli soittaa taustaääntä. Kun välilehdeltä poistui, osio piilotettiin
`hidden`-attribuutilla, mutta **piilotettu kehys jatkaa suorittamista
ja ääni kuuluu yhä**. Työhuoneessa se kuului ambienssina, jolla ei
ollut näkyvää lähdettä eikä säädintä.

Korjattu kahdesta kohdasta, ja tarkoituksella molemmista:

1. **Kehys puretaan** (`src = 'about:blank'`), kun Kartat-välilehdeltä
   poistutaan. Pelkkä mykistys jättäisi pelin pyörimään taustalle.
2. **Katselutila on mykkä** (`sfx.enabled = false`). Kartan esikatselu
   on kuva laudasta, ei pelisessio.

Lippu asetetaan suoraan eikä `setEnabled`illä: `setEnabled` kirjoittaa
valinnan localStorageen, ja se on **sama varasto kuin oikealla
pelillä samassa osoitteessa**. Kartan vilkaisu työhuoneessa olisi
silloin mykistänyt omistajan oman pelin.


## Paketti 70: äänistudio samaan tyyliin — VALMIS v195 3.8.2026

Omistajan havainto työhuoneen uudistuksen jälkeen: "Tämä näkyy vielä
vanhalla tyylillä. Uudista tämä kokonaan."

Äänistudio (`aanet.html`) on **upotettu työhuoneen Studio-välilehteen
iframellä**, joten kaksi eri tyyliä näkyi vierekkäin samalla ruudulla:
uusi vaalea kehys ja sen sisällä vanha tumma Courier New. Se näytti
siltä kuin sovellus olisi kesken.

### Yhteinen tyylitiedosto, ei kopio

Tyylit siirrettiin `css/tyohuone.css`:ään, jota **molemmat sivut
lukevat**. Vaihtoehto olisi ollut kopioida värit ja kirjasin
äänistudioon, mutta kaksi kopiota samasta tyylistä ajautuisi erilleen
ensimmäisellä muutoksella — ja juuri se ero oli nyt korjattavana.

Äänistudioon jäi vain se, mikä on nimenomaan äänistudiota:
soitinpalkki, arvontakorit ja rivit. Tokenit (värit, kirjasin,
pyöristykset, varjot) tulevat jaetusta tiedostosta.

### Sivutuote: tumma tila tuli ilmaiseksi

Jaettu tiedosto tuo `prefers-color-scheme`-tuen myös äänistudioon.
Sitä ei tarvinnut kirjoittaa kahdesti, ja se on koko jaetun tiedoston
idea pienoiskoossa.


## Paketti 69: työhuone uusiksi — VALMIS v194 3.8.2026

Omistajan toive: "Uudista työhuone. Sen ei tarvitse olla visuaalisesti
matkakirjan kanssa samannäköinen. — Olisi tärkeää, että kaikki näkyvät
ovat selkeitä ja vain juuri halutut tiedot ovat näkyvissä kerrallaan."

### Yksitoista välilehteä kuudeksi

| ennen | nyt |
|---|---|
| Etusivu | **Tilanne** |
| Maanosat (edistyminen) | Tilanne |
| Tekstit, Kuvat | **Kaupungit** |
| Maanosat (kartta) | **Kartat** |
| Äänet | **Studio** |
| Juoni, Lasit, Peli-ideat | **Suunnitelma** |
| Brändikirja, Lähteet, Moottorit | **Käsikirja** |

Ryhmittely on nyt **tekemisen mukaan**, ei tietolajin: "missä ollaan",
"mitä pelissä on", "mitä aiotaan", "mihin nojataan".

### Kaupunkinäkymä: yksi kaupunki kerrallaan, kaikki siitä

Suurin muutos. Ennen sisältöä katsottiin lajeittain — tekstit yhdellä
välilehdellä, kuvat toisella — mutta **sisältöä arvioidaan kaupunki
kerrallaan**: onko Bagdadilla kaikki, ja jos ei, mitä puuttuu.

Uusi Kaupungit-välilehti näyttää yhden kaupungin kerrallaan:
merkinnän, artikkelin, kuvakortin, kulttuurinostot, kysymykset, maan
tunnusluvut ja kielen — ja niiden yllä rivin merkkejä, jotka kertovat
yhdellä silmäyksellä mitä on ja mitä ei. Listassa vajaan kaupungin
perässä on punainen piste, ja "vain vajaat" rajaa listan niihin.

### Puutelista laskee itsensä

Tilanne-välilehti laskee **joka latauksella paketeista**, montako
kaupunkia on ilman kutakin osaa, ja järjestää puutteet suurin ensin.
Sen ensimmäinen ajo löysi heti sen, että Lontoolta puuttuvat
tietovisakysymykset — kotikaupungilta.

Sekä puutelista että kaupunkilistan merkinnät lukevat **saman
`OSAT`-taulukon**. Kaksi eri laskentaa ajautuisi väistämättä erilleen,
ja silloin kumpi tahansa niistä valehtelisi.

### Kaupunki lasketaan kerran, ei kerran per lauta

Ensimmäinen versio ilmoitti 445 kaupunkia. Niitä on 283: sama kaupunki
on sekä maanosalaudalla että yhdistetyllä vanhalla maailmalla.
Puutteet lasketaan nyt kerran kaupunkia kohti, ja jos kaupunki on
monella laudalla, käytetään sitä lautaa, jolla sillä on eniten
sisältöä — muuten tyhjä rinnakkaislauta merkitsisi valmiin kaupungin
vajaaksi.

### Oma sovellus, ei pelin sivu

- **Oma palvelutyöntekijä** `tyohuone-sw.js` ja oma välimuisti. Sama
  työntekijä kahdelle sovellukselle tarkoittaisi, että toisen päivitys
  tyhjentää toisen.
- **Verkko ensin, välimuisti varalle** — päinvastoin kuin pelissä.
  Peli on tuote, jonka pitää käynnistyä lentokoneessa; työhuone on
  työkalu, jossa vanha tieto on pahempi kuin hidas lataus.
- **Manifesti ja kuvakkeet**: asennettavissa kotivalikkoon iPhonella ja
  iPadilla omana sovelluksenaan.
- **Päivitys itsestään**: uusi versio havaitaan ja siitä kerrotaan
  palkilla. Tarkistus tunnin välein, koska työhuone on usein auki koko
  päivän.
- **Versio aina näkyvissä** ja napautettavissa: se avaa päivityslokin.
  Vanhassa työhuoneessa versio piilotettiin kapealla ruudulla — juuri
  siellä missä sitä eniten tarvitsi.

### Ulkoasu on tarkoituksella eri kuin pelin

Peli on pergamenttia ja mustetta, ja se on oikein: pelaaja katsoo
1873:n matkakirjaa. Työhuone on työkalu, ja työkalussa luettavuus
voittaa tunnelman.

Kolme eroa: **laitteen oma päätteetön kirjasin** (ennen Courier New,
joka on kapea ja väsyttävä pitkässä luvussa), **vaalea tausta** (ohut
päätteetön teksti kukkuu tummalla), ja **yksi korostusväri viiden
sijaan** — kun kaikki on korostettu, mikään ei ole. Ainoa tietoinen
lainaus pelistä on korostusvärin kullansävy. Tumma tila seuraa
laitteen asetusta.

### Sisältö irti rakenteesta

`tyohuone.html` oli 1543 riviä, joissa sisältö ja rakenne olivat
sekaisin. Listat (aarteet, varusteet, lasit, peli-ideat, lähteet,
moottorit) ovat nyt `js/tyohuone-data.js`, ja brändikirja on
`tyohuone-kasikirja.html`. Vanhat kirjanmerkit ohjautuvat uusille
välilehdille eivätkä hajoa.


## PYYDETTY, MYÖHEMMÄKSI: meret Jules Vernen hengessä

Omistajan tieto 3.8.2026:

> "Suurimpiin meriin on tarkoitus tehdä Jules Verne hengessä. Myös omia
> kohteita mennään pinnan alle, mutta palataan näihin vasta sitten
> myöhemmin, mutta tämä jo tiedoksi."

Eli merillä on tulossa **omia kohteita pinnan alla** — sukellus
Sukelluslaivalla Nautilus -hengessä. Merestä tulee siis oma
tapahtumapaikkansa eikä pelkkä väli kahden sataman välillä.

**Ei toteuteta vielä.** Kirjattu tänne, jotta merireittien ja kartan
merikerroksen ratkaisuissa ei tehdä mitään, mikä estäisi tämän
myöhemmin. Käytännössä se tarkoittaa kahta asiaa:

1. **Merireitti saa jo nyt olla enemmän kuin viiva.** Reiteillä on
   `via`-pisteitä, ja ne kelpaavat sellaisenaan sukelluskohteiden
   ankkureiksi — niitä ei kannata poistaa optimoinnin nimissä.
2. **Merialueiden nimet kannattaa säilyttää.** Jos merikerrokseen
   piirretään nimiä (ks. maastokerros), samat nimet ovat myöhemmin
   sukelluskohteiden koteja.

Verne on jo pelin kehyskertomuksessa: matka 80 päivässä on Vernen, ja
Nautilus on saman kirjailijan. Se sopii yhteen ilman selittelyä.


## PYYDETTY: maasto kartalle — vuoret, joet ja järvet

Omistajan toive 3.8.2026:

> "Voisiko merkittävimmät ylängöt ja vuoret sekä joet piirtää karttaan?
> Joet voisivat näkyä kevyen sinisinä ja vuoret tummemman ruskeina.
> Vuorien näkyvyys voisi kuitenkin olla hillitty, eli ei mikään oikea
> korkeuskartta, joka on aika hässäkän näköinen, ennemmin vain suuret
> linjat ja siinä voisi käyttää jotain rajoitinta."

### Omistajan antamat rajat (tarkennettavissa)

- **Alle noin kilometrin korkeuserot eivät näy lainkaan.** Vain selvästi
  korkeammat saavat väriä. Tavoite ei ole korkeuskartta vaan suuret
  linjat: Alpit, Himalaja, Andit.
- **Yli noin neljän kilometrin huiput** saavat valkoista sävyä eli
  lumipeitteen.
- **Joet kevyen sinisinä.** Venäjän pitkät joet mainittiin erikseen.
- **Suurimmat järvet hyvin kevyesti.**
- **Yleisvaikutelma ei saa muuttua sekavaksi.** Tämä on tärkein ehto:
  jos kartta menee tukkoon, rajaa on nostettava eikä yksityiskohtia
  lisättävä.

Numerot ovat omistajan mukaan minun tarkennettavissani. Luonnos:
- 0–1000 m ei väriä
- 1000–2500 m hyvin kevyt ruskea
- 2500–4000 m tummempi ruskea
- yli 4000 m valkoinen huippu

### Nimet ja i-ikoni

> "Zoomattaessa tarpeeksi lähelle suurimmat järvet ja vuoristot voisi
> nimetä ja kirjoittaa kaunokirjoituksella."

> "Niissä voisi olla pieni i-ikoni tai vastaava perässä, jota painamalla
> pääsisi lukemaan ja katsomaan kuvia paikasta, ellei siinä ole jo omaa
> laattaansa tehtynä."

Eli maastonimet ovat **kevyt tietopolku ilman pelilaattaa**: nimi
näkyy vasta lähellä, ja sen perässä oleva i avaa saman Lue lisää
-ikkunan kuin kaupungeilla. Jos paikalla on jo oma laatta (esim.
Kilimandžaro, Alpit, Baikal), i-ikonia ei tule — laatta on parempi.

### Varattu myöhemmäksi

Varsinainen korkeuserokartta tulee omaksi **linsseikseen**, joka
löytyy kätköstä. Se on Lasit-listalla eikä kuulu tähän: tämä on kartan
pysyvä pohjapiirros, ei erikoisnäkymä.

### Mitä tämä vaatii

- Korkeusaineisto, joka on vapaa ja tarpeeksi karkea (ETOPO tai
  Natural Earthin `ne_50m_geography_regions_elevation_points` ja
  vuoristoalueiden polygonit).
- Joet ja järvet: Natural Earth `rivers_lake_centerlines` ja
  `lakes`, public domain.
- Piirto samaan staattiseen kerrokseen kuin muu kartta-taide, jotta
  bittikarttaruudukko hoitaa sen ilmaiseksi. **Ei suodattimia** — sama
  iOS-sääntö kuin kaikella muullakin kartalla.


## PÄÄTETTY: maailmankartta kiertyy, mutta paikka näkyy vain kerran

Omistajan toive: "Kartta toimii nyt niin hienosti että sen voisi
laajentaa koko maailmaan. Vierittämällä voisi liikkua loputtomasti
pallon ympäri kumpaan tahansa suuntaan."

Omistajan rajaus: **"Älä mahdollista että mikään paikka näkyy kahtena,
rajoita zoomausmäärällä."**

### Mitä se tarkoittaa

Uloin zoomaustaso rajataan niin, että näkyvä alue on **enintään yhden
maailmanleveyden** verran. Silloin kartta kiertyy vaakasuunnassa
loputtomasti, mutta yksikään kaupunki ei koskaan ole ruudulla kahdessa
kohdassa yhtä aikaa.

```
viewBox.width <= MAAILMAN_LEVEYS
```

### Miksi tämä on hyvä päätös, ei vain rajoitus

Se ratkaisee kerralla kolme ongelmaa, jotka olisivat muuten olleet
kolme erillistä sotkua:

1. **Osumantunnistus.** Kun kaupunki on ruudulla enintään kerran,
   napautus osuu yksiselitteisesti. Ilman rajausta olisi pitänyt
   päättää, kumpi kopio voittaa — ja se päätös olisi ollut väärä
   jommassakummassa reunassa.
2. **Nimien sijoitus.** Nimet on laskettu laudan koordinaatteihin
   (`tools/nimien-paikat.mjs`). Kahtena näkyvä nimi olisi vaatinut
   sijoituksen laskemisen uudestaan joka kopiolle.
3. **Nappulan löytäminen.** Pelaaja puhelimella ei saa eksyä. Kun
   maailmaa on ruudulla enintään yksi, "missä minä olen" on aina
   yksikäsitteinen kysymys.

Vaakakiertyminen on siis rullaus, ei toisto: kartan reunan yli
mennessä sama maailma jatkuu, mutta sitä ei näy kahdesti.

### Pystysuunta ei kierry

Pituusaste on jaksollinen, leveysaste ei: pallolla tulee napa vastaan.
Pystysuunnassa kartta siis loppuu, ja se on oikein — ei ole olemassa
suuntaa, johon jatkamalla pohjoisnavalta päätyisi etelänavalle.


## YÖTILA — omistajan komento

**"Yötila"** tarkoittaa: käynnistä niin monta apuria kuin keksit, ja
tee mahdollisimman paljon itsenäisesti. Omistaja sanoi sen näin:
"Minulla on vielä reilu pari tuntia aikaa käyttää iso kasa kredittejä.
Laita niin paljon agentteja käyntiin kuin vain keksit."

Sanaa ei tarvitse selittää joka kerta. Kun omistaja sanoo **yötila**,
tee tämä:

1. **Kartoita aukot koneella, älä muistista.** Aja kysely, joka
   luettelee mitä puuttuu: kaupungit ilman kysymyksiä, maat ilman
   tunnuslukuja, kuvat ilman tarkistusta. Lista ratkaisee, mitä
   apureita kannattaa käynnistää.
2. **Yksi työnkulku per aukko**, ei yhtä isoa. Jokainen saa oman
   ohjeensa ja oman tarkistusvaiheensa.
3. **Aina kaksi vaihetta: tee ja tarkista.** Toinen apuri yrittää
   kumota ensimmäisen työn. Kuvahaussa 194 ehdotuksesta yksi
   tiedostonimi oli keksitty — tarkistus maksoi yhden kyselyn per kuva
   ja poisti koko kysymyksen.
4. **Eri näkökulmat, ei sama ohje monelle.** Kahdeksan apuria samalla
   ohjeella löytää kahdeksan kertaa samat asiat. Kuvassa koko, lisenssi
   ja aitous ovat kolme eri kysymystä, eikä yksi vastaa toiseen.
5. **Kirjoittaminen jää minulle.** Apurit etsivät ja tarkistavat;
   saapumistekstit ja artikkelit kirjoitan itse, koska ääni vaihtuu
   ryhmien rajoilla jos kirjoittajia on monta. Se on juuri se, mistä
   omistaja valitti Wikipedian teksteissä.
6. **Julkaise erä kerrallaan.** Ei yhtä isoa pakettia aamulla vaan
   valmis alue kerrallaan, testit vihreänä ja versionosto joka kerta.
7. **Kerro aamulla mitä hylättiin.** Hiljainen karsinta näyttää
   täydeltä listalta.

Muista myös yötilassa: **ElevenLabsia ei käytetä** (omistajan päätös),
eikä avaimia kopioida keskusteluun.


## Paketti 67: lipputunnistus ja päivitysloki — VALMIS v191 3.8.2026

Kaksi omistajan toivetta samassa paketissa.

### Lipputunnistus

Uusi kysymysmuoto `flag`: tullimies näyttää lipun ja kysyy, minkä maan
se on. Väärät vaihtoehdot ovat muita laudan maita, ja oikea vastaus
painottuu siihen maahan, jossa pelaaja on — lippu ja paikka kuuluvat
yhteen, ja pelaaja on juuri lukenut maan nimen saapumiskortista.

Aineistoa ei tarvinnut hakea: peli tuntee jo 84 maan liput. **Kysymys
toimii yhteydettömänä**, toisin kuin valokuvakysymys, joka hakee kuvan
verkosta.

Valokuvan paikannus oli jo olemassa muotona `photo` — omistajan
listaamista minipeleistä siis kaksi kolmesta on nyt tehty.

**Sivulöytö:** `tools/fetch-flags.mjs` poimi lippujen nimet paketeista
tekstihaulla `/lippu: '([^']+)'/` eli heittomerkeillä. Kun Aasian
rajat kirjoitettiin `JSON.stringify`llä, kentät saivat lainausmerkit,
ja **kaikki 28 uutta lippua jäivät hakematta — hiljaa**, koska
puuttuvasta ei tullut virhettä vaan lyhyempi lista. Työkalu lukee nyt
paketit moduuleina, jolloin muotoilulla ei ole väliä. Testi vahtii,
että jokaisella laudan maalla on paikallinen lippu.

### Päivitysloki

Omistajan toive: "Tee erittäin tiivis päivitysloki joka tulee
näkyviin klikkaamalla versionumeroa kartalla."

Numero kulmassa on jo se paikka, josta pelin tila luetaan, joten loki
kuuluu sen taakse eikä omaan valikkokohtaansa. Uusi `js/muutokset.js`,
uusin ensin.

**Tiiviys on muotovaatimus, ei tyyliohje**, ja se on testissä: yksi
rivi per versio, enintään 60 merkkiä, ei loppupistettä, uusin ensin.
Lokia luetaan puhelimen ruudulla kartan päältä, ja jos riviä joutuu
vierittämään, se on liian pitkä. Toinen testi vaatii, että lokin
ensimmäinen rivi vastaa nykyistä versiota — versionosto ilman
lokiriviä jättäisi pelaajan ihmettelemään, mikä muuttui.


## Paketti 66: Europeana kytketty — VALMIS v190 3.8.2026

Omistaja lisäsi `EUROPEANA_API`-avaimen repon salaisuuksiin. Se ei
ollut käytössä: `tools/hae-kaupunkikuvat.mjs` **dokumentoi** Europeanan
kolmantena lähteenä, mutta hakua ei ollut koskaan kirjoitettu — koodissa
ei ollut sanaa "europeana" missään. Kommentti lupasi enemmän kuin
tiedosto teki.

Nyt haku on olemassa (`reusability=open&media=true&qf=TYPE:IMAGE`), ja
avain luetaan muuttujasta `EUROPEANA_API` (vanha nimi
`EUROPEANA_AVAIN` kelpaa yhä).

### Avain pysyy siellä missä se on

Salaisuus on luettavissa vain GitHubin ajossa, eikä sitä saa kopioida
mihinkään — ei keskusteluun, ei tiedostoon, ei tulosteeseen. Siksi
uusi työnkulku `.github/workflows/kuvahaku.yml`: haku ajetaan
GitHubissa, jossa avain on, ja tulos noudetaan artefaktina. Ajo
käynnistetään käsin, koska kuvahaku on kertaluonteista aineistotyötä
eikä kuulu jokaiseen puskuun.

### Hiljainen ohitus sanotaan nyt ääneen

Vanha kommentti kertoi, että ilman avainta vaihe "ohitetaan hiljaa".
Se on juuri se virhe, joka on toistunut tässä projektissa useimmin:
**työkalu, joka ei erota "ei löytynyt" ja "ei kysytty" toisistaan,
valehtelee onnistumisesta.** Ajo tulostaa nyt ensimmäisellä rivillä
joko "avain löytyi, haku käytössä" tai "EI AVAINTA — vaihe ohitetaan".


## Paketti 65: maiden rajat Aasiaan — VALMIS v189 3.8.2026

Tutki-ikkunan minikartta oli tyhjä 31 maalta: Aasialla ja Lähi-idällä
ei ole omaa lähdelautaa, josta rajat olisi voinut kääntää. Ne haettiin
Natural Earthin 50m-aineistosta (public domain) uudella työkalulla
`tools/aasian-rajat.mjs`.

**84 maalla on nyt rajat** (ennen 56). Ilman jäivät Singapore, Saint
Helena ja Hongkong — ne olisivat tässä mittakaavassa yhden pikselin
täpliä, ja se on tietoinen valinta eikä puute.

Millerin sovitus luetaan **laudalta itseltään** eikä lasketa uudestaan:
jokaiselle kaupungille tiedetään sekä lon/lat että valmis x/y, joten
skaalan saa pienimmän neliösumman sovituksella. Mediaanivirhe 0,0
yksikköä. Näin työkalu ei voi ajautua eri mittakaavaan kuin lauta,
vaikka se lukee aivan toista lähdettä kuin tuontityökalu.

### Ahne säännöllinen lauseke söi koko tiedoston

Kirjoitusvaiheen `/const COUNTRY_SHAPES = (\{.*\});/s` nappasi
viimeiseen `};`-pariin asti — siis koko loppupaketin. `JSON.parse`
kaatui siihen, eikä mitään kirjoitettu. **Vika näkyi vain siinä, että
tiedoston koko ei muuttunut.** Rivinvaihto on oikea raja
(`[^\n]*`), koska COUNTRY_SHAPES kirjoitetaan aina yhdelle riville.

Hyvä puoli: työkalu kaatui äänekkäästi eikä kirjoittanut rikkinäistä
tiedostoa. Huono puoli: pelkkä "0 virhettä" -tuloste olisi näyttänyt
onnistumiselta, ellen olisi tarkistanut tiedoston kokoa.

### Testi, joka ei toiminut kahdella ensimmäisellä yrityksellä

Rub al-Khali oli merkitty Arabiemiirikuntiin, vaikka piste on
keskellä Saudi-Arabiaa. Halusin testin, joka löytää tällaiset.

1. **Pelkkä etäisyys** hylkäsi Riian: rannikkokaupungit on siirretty
   lähimpään maakohtaan, ja Riika jää 40 yksikköä yksinkertaistetun
   Latvian ulkopuolelle täysin oikein merkittynä.
2. **Pelkkä "piste on toisessa maassa"** hylkäsi Tallinnan,
   Dubrovnikin, Alpit ja Kilimanjaron: ne ovat rajan tuntumassa, ja
   harvennettu raja kulkee paikoin väärältä puolelta.
3. **Molemmat yhdessä** toimii: piste on toisen maan sisällä JA yli 60
   yksikön päässä oman maansa rajasta. Rub al-Khali oli 84 yksikön
   päässä.

Opetus: kun mittari tuottaa vääriä hälytyksiä, kynnyksen nostaminen on
väärä korjaus. Oikea on kysyä toista kysymystä sen rinnalle.


## Paketti 64: Aasian 63 artikkelia — VALMIS v188 3.8.2026

Omistajan päätös: "Kirjoitathan wiki artikkelit itse vielä uudestaan.
Ovat yleensä liian pitkiä ja tyyli vaihtelee. — Siis ne wiki artikkelit
mitä et ole vielä aiemmin kirjoittanut."

63 uutta artikkelia (`js/packs/asia-artikkelit.js`). **Nyt jokaisella
143 kaupungilla on oma artikkeli**, eikä yksikään "Lue lisää" nojaa
enää Wikipedian omaan tekstiin.

### Mitta on osa muotoa, ei makuasia

Wikipedian artikkelien pituus vaihtelee kymmenkertaisesti kaupungista
toiseen, ja juuri se oli omistajan valitus. Talon mitta on nyt
kirjattu testiin:

- **kolme kappaletta**, aina. Ensimmäinen kertoo missä ollaan, toinen
  mitä täällä on tapahtunut, kolmas millaista täällä on nyt.
- **teksti 600–1100 merkkiä.** Uusien mediaani on 812, vanhojen 818 —
  sama mitta, vaikka ne kirjoitettiin eri viikkoina.
- **intro 100–280 merkkiä**, kaksi lausetta, joista toisessa on jotain
  mitä lukija ei arvaisi.
- **ei huutomerkkejä.** Innostus kuuluu saapumistekstiin; artikkeli on
  se rauhallinen ääni, joka kertoo taustan.

Kirjoitin nämä itse enkä apureilla. Ääni on niin tarkka, ettei sitä
kannata jakaa monelle kirjoittajalle — sama päätös kuin
saapumisteksteissä (paketti 60).

### Näkymätön merkki tekstissä

Yhteen artikkeliin (Yangon) oli päätynyt pehmeä tavuviiva (U+00AD).
Se ei näy koodissa eikä ruudulla, mutta se katkaisee sanan
hakutoiminnoilta ja lukuohjelmilta. Tarkistus kaikkien tekstien yli
löysi sen — näkymättömiä merkkejä ei voi etsiä silmällä, ja siksi
niitä on etsittävä koneella.


## Paketti 63: radio kaikkiin maihin — VALMIS v187 3.8.2026

Automaattihaku (paketti 61) sai 71 maata ja 45 virallista kanavaa.
Loput jäivät, koska hakemistosta ei voi päätellä mikä asema on maan
yleisradio. Ne haettiin apureilla maa kerrallaan ja tarkistettiin
skriptillä (`tools/tarkista-radiot.mjs`).

**Nyt kaikilla 87 maalla on suora lähetys, ja 56 niistä on maan
yleisradion kanava.** Testi vahtii, ettei yksikään maa jää ilman.

### Kaksi kertaa sama virhe: tarkistus ei erottanut väärää eri
### tavalla kirjoitetusta

**1. Yhdistämissääntö.** Ensimmäinen versio päivitti tietueen vain jos
uusi oli virallinen ja vanha ei. Automaattihaun arvaukset olivat
kuitenkin huonompia kuin tutkitut valinnat myös silloin, kun kumpikaan
ei ollut virallinen — Latvian valinta oli "Nordic Chillout Radio".
Sääntö on nyt: tutkittu voittaa arvatun, paitsi jos vanha on maan
virallinen kanava.

**2. Kielisuodatin hylkäsi 17 hyvää asemaa.** Suodatin vertaa aseman
kielitietoa maan pääkieliin, ja lista on hakemiston kirjoitusasussa
(englanniksi). Apurit kirjoittivat kielen suomeksi: kentässä luki
"arabia" eikä "arabic", ja jokainen niistä hylättiin väärällä
kielellä. Tutkitut valinnat merkitään nyt `tutkittu: true`, ja
suodatin ohittaa ne — ne ovat jo käyneet läpi oman tarkistuksensa.

**3. Aseman nimi ei ole lause.** Ehdotukset tulivat muodossa
"Radio 9090 / 90.90 FM Radio Egypt (Kairo) – puhe ja
ajankohtaisohjelmat". Nimi näkyy napin otsikkona, joten selite
katkaistaan — ja katkaisu jätti aluksi puolikkaan sulun perään
("SAMS Radio 1 (South Atlantic Media Services"). Jos nimi mahtuu
ilman sulkulauseketta, koko lauseke pudotetaan.

Kaikki kolme ovat sama asia: **kun tarkistus vertaa muotoa eikä
sisältöä, se hylkää hyvän yhtä helposti kuin päästää huonon läpi.**


## Paketti 62: päiväkirjan näkymät kuviksi — VALMIS v186 3.8.2026

Omistajan toive: "Matkakirjassa mainitut näkymät ja asiat olisi kiva
saada kuvin matkakirjan kuviin." Paketti 58 teki kortista pinon; tämä
täytti pinon.

**193 uutta kuvaa 80 kaupunkiin.** Jokaisella Euroopan ja Afrikan
kaupungilla on nyt vähintään kolme kuvaa, suurimmassa (Dublin)
seitsemän. Kuvat eivät ole kaupungin yleiskuvia vaan juuri niitä
näkymiä, jotka päiväkirjamerkintä mainitsee — Dublinissa Liffeyn
sillat, eriväriset ovet, pubin perinnemusiikki ja Nelsonin pylvään
paikalla seisova teräsneula.

Tuotettu apureilla: kukin luki kaupungin saapumistekstin, poimi siitä
konkreettiset maininnat ja etsi kullekin kuvan. **Ehdotukseen ei
luotettu sellaisenaan** — `tools/lisaa-kuvapinoon.mjs` tarkistaa
jokaisen tiedoston Commonsista ennen kirjoittamista: onko olemassa,
vähintään 1200 px, vapaa lisenssi ilman ND-ehtoa, ei jo kortissa.
194 ehdotuksesta yksi tiedostonimi oli keksitty. Se on pieni osuus,
mutta ilman tarkistusta se olisi ollut rikkinäinen kuva pelissä.

### Sivulöytö: 69 paikan "Lue lisää" kaatui

Omat artikkelit on kirjoitettu kahdella kenttänimellä: vanhemmat
(`Tanger`, `Tripoli`, maat) käyttävät nimeä `artikkeli`, uudemmat
nimeä `teksti`. Renderöinti luki vain ensimmäistä, ja 69 paikan
kohdalla se sai `undefined`in — dialogi kaatui Venetsiassa, Roomassa,
Ateenassa, Krakovassa ja Sarajevossa.

Korjaus on yksi rivi (`oma.artikkeli ?? oma.teksti`), ja testi vahtii
nyt, että jokaisella artikkelilla on luettava teksti kummalla tahansa
nimellä. **Kenttiä ei yhtenäistetty:** se olisi 69 tiedostomuutosta
yhden rivin ongelmaan.

Opetus on tuttu tästä projektista: **kaksi nimeä samalle asialle on
oikea korkeintaan toisessa paikassa.** Sama kuin luennan häivytyksessä,
jossa yksi vakio palveli kahta tarkoitusta.


## Paketti 61: Kuuntele kieltä suorana radiona — VALMIS v185 3.8.2026

Omistajan havainto: näytteissä puhutaan liian vähän. Ratkaisu on
suora puheradio, ja järjestys on omistajan antama: maan virallinen
ykkösradio ensin, sen puuttuessa mikä tahansa saman maan asema, ja
vasta viimeisenä vanha kolmen minuutin tallenne.

Uudet tiedostot: `tools/hae-radiot.mjs` (haku), `tools/kirjoita-radiot.mjs`
(pakkatiedoston kirjoitus), `js/packs/radiot.js` (71 maata, joista 45
maan yleisradion kanava).

### Neljä ehtoa, joista ei jousteta

1. **https.** Peli tarjoillaan salattuna, ja selain estää salaamattoman
   äänivirran kokonaan. Osa asemista vastaa kumpaankin, joten
   http-osoite yritetään päivittää — mutta vain jos se oikeasti vastaa.
2. **Ei HLS:ää.** `<audio>` soittaa `.m3u8`-virtaa vain Safarissa.
3. **Osoite tarkistetaan hakemalla.** Hakemiston "toimii"-merkintä on
   voinut vanhentua kuukausia sitten.
4. **Nappi ei saa jäädä hiljaiseksi.** Lähetysosoitteet lakkaavat
   toimimasta ilman varoitusta, joten soitin osaa nyt pudota kokonaan
   toiseen ääneen (`nosto.vara`) — ei vain saman äänen toiseen
   osoitteeseen kuten peilin varareitti.

### Kolme ansaa, joihin jäin kiinni

**1. Noden fetch ei lue HTTPS_PROXYa.** Suora yhteys torjutaan tässä
ympäristössä vastauksella "Blocked by egress policy", joka näyttää
täsmälleen samalta kuin aseman oma esto — työkalu hylkäsi hyviä
asemia vääränä tietona. Sama pyyntö curlilla onnistui, ja ero oli
juuri välipalvelin. Työkalut käynnistävät nyt itsensä uudestaan
`NODE_USE_ENV_PROXY=1`:n kanssa. **Tämä koskee kaikkia uusia
työkaluja**, ei vain radiohakua.

**2. Osuma nimen keskeltä ei kelpaa.** Ensimmäinen versio hyväksyi
"ZamRock Radio Nigeria Relay" -aseman Nigerian yleisradiona, koska
nimessä luki "Radio Nigeria". Yleisradion kanava alkaa lähes aina
omalla nimellään, joten osuman on oltava nimen alussa.

**3. Maakoodi on yhteisön kirjaama, ja siinä on virheitä.** Sama
arabiankielinen koraanikanava osui seitsemän eri maan kohdalle, ja
Pjongjangin asema oli kirjattu Etelä-Korean asemaksi. Kielitieto
paljastaa nämä: portugalia puhuvan maan asemalla ei lue "arabic".
14 valintaa hylättiin näin, ja hylätyt luetellaan aina ajon lopuksi —
hiljainen karsinta näyttäisi täydeltä listalta.

**Kesken:** 26 maalle löytyi asema mutta ei virallista kanavaa, ja 14
maata jäi kokonaan ilman (niille jää vanha äänite tai ei nappia).
Nämä vaativat maakohtaista tutkimista.


## Paketti 60: Aasian saapumistekstit ja kuvien aitous — VALMIS v185 3.8.2026

63 puuttuvaa saapumistekstiä kirjoitettu (`js/packs/asia-saapumiset.js`):
Turkki ja Levantti, Arabian niemimaa, Mesopotamia ja Persia, Siperia ja
Kaukoitä, Keski-Aasia, Itä-Aasia, Kaakkois-Aasia, Etelä-Aasia. Sama
muoto ja sama kahden äänen rakenne kuin Euroopassa ja Afrikassa.
Nyt **kaikilla 143 kaupungilla on matkakirjan merkintä** — testi
vahtii sitä.

### Kuvateksti voi valehdella, vaikka kuva olisi aito

Omistaja huomasi Darfurin kortista: "Tämä ei ole aito vanha kuva."
Miehellä oli rannekello ja nykyaikaiset silmälasit. Tiedoston nimi oli
`Sultan Ali Dinar.jpg` ja kuvateksti kertoi sulttaanista, joka kuoli
1916 — mutta Commonsin tiedoissa luki vuosi 2016 ja kuvaus "The
Official Portrait of the 30TH Sultan of Darfur". Kyseessä oli nykyinen
arvonimen haltija.

**Tiedostonimi ei kerro kuvan ikää. Metatieto kertoo, ja se on ilmaista
kysyä.** Siitä syntyi `tools/tarkista-kuvaiat.mjs`, joka hakee jokaiselle
vanhaksi merkitylle kuvalle `DateTimeOriginal`-kentän. 80 kuvasta se
nosti kahdeksan, joista kolme oli oikeita virheitä:

- **darfur** — nykyaikainen muotokuva vanhana valokuvana. Vaihdettu
  Jebel Marran kuvaan 1961, samaan vuoreen josta päiväkirja kertoo.
  (Ali Dinarista on olemassa vain yksi valokuva, brittiarmeijan ottama
  hänen kuolemansa jälkeen. Sitä ei panna pelin korttiin.)
- **murzuk** — kuvana oli sodanjälkeinen postimerkki. Vaihdettu
  vuoden 1891 kuvalaattaan, ja kuvatekstissä sanotaan että se on piirros.
- **kumasi** — kuva oli aito vuodelta 1900, mutta kuvateksti kertoi
  kaupungin katoista. Kuvassa on kokous. Teksti korjattiin kuvan
  mukaiseksi.

Loput viisi olivat vääriä hälytyksiä tai tiedossa olevia myönnytyksiä
(ahaggar 1991, ja se sanotaan kuvatekstissä ääneen).

**Opetus:** kaksi tarkistusta ei riitä. Kuva voi olla oikean kokoinen,
oikealla lisenssillä ja silti väärä — ja kuvateksti voi olla väärä,
vaikka kuva olisi oikea. Kolmas tarkistus on nyt olemassa.


## Paketti 59: kuvakortti keskelle ruutua — VALMIS v184 3.8.2026

Omistajan havainto edellisen version jälkeen: "Ei keskellä." Kortti
valui oikealle yli ruudun reunan.

**Vaakakeskitys laskettiin JavaScriptissä oletuksella, että kortti on
korkeintaan 400 pikseliä leveä.** Kun kortti kasvoi isolla ruudulla 720
pikseliin (paketti 57), laskelma jäi vanhaksi.

Sama virhe oli aiemmin pystysuunnassa, ja se korjattiin silloin
siirtämällä keskitys CSS:ään — leveys ja korkeus eivät ole tiedossa
ennen kuin tyylit on laskettu. **Nyt myös vaakakeskitys on CSS:ssä.**

Opetus: kun mitta muuttuu tyylitiedostossa, jokainen JavaScriptissä
oleva oletus samasta mitasta on rikki. Oikea korjaus ei ole päivittää
lukua vaan poistaa oletus.


## Paketti 58: kuvapino kestää useamman kuin kaksi — VALMIS v183 3.8.2026

Omistajan toive: "Matkakirjassa mainitut näkymät ja asiat olisi kiva
saada kuvin matkakirjan kuviin, joita voi siis olla enemmän kuin kaksi."

Päiväkirja mainitsee Suakinissa korallitalot, sataman ja dhow-veneet.
Kortissa oli tilaa kahdelle kuvalle: vanhalle ja uudelle. Nyt pinossa
voi olla mikä tahansa määrä.

**Järjestys kertoo saman tarinan kuin teksti:** vanha valokuva ensin,
sitten päiväkirjan mainitsemat näkymät, viimeisenä nykypäivä. Pino
päättyy siihen, mitä paikasta on jäljellä.

**Napautus kiertää eteenpäin, ei vaihda päikseen.** Kahdella kuvalla
vaihto riitti; useammalla se olisi jättänyt loput näkymättömiin.

**Laskuri kertoo, montako kuvia on.** Kahden kuvan pinossa alta
pilkottava reuna riitti vihjeeksi, useamman kuvan pinossa ei.

Uusi kenttä `lisat` valokuvatietueessa: lista samanmuotoisia kuvia
vanhan ja uuden väliin. Vanhat tietueet toimivat ennallaan.


## Paketti 57: kuvakortti isommaksi isolla ruudulla — VALMIS v182 3.8.2026

Omistajan toive iPadilta: "Nämä kuvat voisi näkyä isompana."

Kortin leveyskatto 460 px oli mitoitettu puhelimelle. Tabletilla se jäi
ruudun keskelle pieneksi lapuksi, vaikka tilaa oli runsaasti.

**Kasvatus tehdään vain leveille ruuduille.** Puhelimella korttiin ei
mahdu enempää: kuvan lisäksi siinä on kuvateksti, ja pelkkä korkeuden
kasvattaminen tekisi vaakakuvasta pystykortin. Ensimmäinen yritys teki
juuri niin — puhelimella kuva olisi ollut korkeampi kuin kortti leveä.

| ruutu | kortti ennen | kortti nyt | kuva ennen | kuva nyt |
|---|---|---|---|---|
| puhelin | 336 | 336 | 330 | 330 |
| iPad | 460 | **720** | 330 | **554** |
| työpöytä | 460 | **684** | 330 | **519** |

Raja on 700 px, sama kuin muuallakin pelissä — "kapea ruutu" tarkoittaa
kaikkialla samaa.


## Paketti 56: Lasit omalle välilehdelleen — VALMIS v181 3.8.2026

Omistajan havainto: "Neljä ylintä tässä ovat aarteiden (erikoislasit)
toiminnallisuuksia, ei peli-ideoita. Näille voisi tehdä oman
välilehden."

Havainto on oikea, ja ero on olennainen. Animoitu historiakartta,
ihmisen leviäminen, lämpökartat ja museokuva **eivät ole minipelejä**:
niissä ei ole kysymystä, vastausta eikä palkintoa. Ne ovat kerroksia
kartan päällä — kartta pysyy paikallaan, ja lasien läpi katsottaessa sen
päälle piirtyy jotain, mitä paljaalla silmällä ei näe.

Siksi ne jakavat saman koneiston keskenään mutta eivät minkään
minipelin kanssa, ja väärässä listassa ne olisivat vieneet suunnittelun
väärille urille.

Uusi **Lasit**-välilehti työhuoneessa. Peli-ideoita jäi 23.


## PÄÄTETTY: kaikki tekstit kirjoitetaan itse

Omistajan linjaus: "Kirjoitathan wiki-artikkelit itse vielä uudestaan.
Ovat yleensä liian pitkiä ja tyyli vaihtelee." Ja tarkennus: **ne
artikkelit, joita ei ole aiemmin kirjoitettu.**

Wikipedian tiivistelmä kelpaa **raaka-aineeksi mutta ei sisällöksi**:

- se on liian pitkä pelin korttiin
- tyyli vaihtelee artikkelista toiseen — yksi alkaa väkiluvulla, toinen
  perustamisvuodella, kolmas hallinnollisella asemalla
- se on kirjoitettu tietosanakirjaksi, ei matkakertomukseksi

Sama koskee kuvatekstejä: Commonsin kuvaus on englanniksi ja kömpelö.

**Missä tämä on jo tehty:** Euroopan ja Afrikan kaupungeilla on omat
kirjoitetut tekstit (`OMAT_ARTIKKELIT`, `EUROPE_ARTIKKELIT`). Ne
pysyvät ennallaan — omistaja pyysi kirjoittamaan vain ne, joita ei ole
vielä kirjoitettu.

**Mitä puuttuu:** Aasian ja Lähi-idän 63 kaupunkia. Niillä kortin
teksti tulee suoraan Wikipediasta, ja juuri se näkyy pituutena ja
tyylin vaihteluna.

**Sääntö:** faktoja ei keksitä. Teksti kirjoitetaan tiivistelmän
pohjalta, ja jos jokin asia ei ole varmaa, sitä ei sanota — periaate 2.


## PÄÄTETTY, EI VIELÄ TEHTY: Kuuntele kieltä suorana radiona

Omistajan havainto: "Kuuntele kieltä toimii mutta sisältö on heikko,
koska suurimmassa osassa pätkiä puhetta kuuluu aika vähän. Löytyisikö
parempaa aineistoa? Esim. paikalliset radiot olisivat hyviä."

**Ongelma on oikea ja se on aineistossa, ei koodissa.** Nykyiset
näytteet ovat kenttä-äänityksiä: niissä on katua, tuulta ja
taustahälyä, ja puhetta vain hetkittäin. Kieltä ei niistä kuule.

### Omistajan päätökset

1. **Suora lähetys on parempi kuin tallenne.** Radiossa puhutaan koko
   ajan — se on juuri se mitä napista haetaan.
2. **Valtion virallinen yleisradio ensin** (Suomessa Yle Ykkönen), mutta
   jos sitä ei löydy tai se ei ole vapaasti kuunneltavissa, **mikä
   tahansa muu saman maan asema kelpaa**.
3. **Tärkein ehto: maan kieltä puhuttuna.** Musiikkikanava ei kelpaa,
   vaikka olisi virallinen.
4. **Kolmen minuutin tallenne on viimeinen vaihtoehto**, ei ensimmäinen.

### Mitä tämä vaatii

- Lähdeluettelo asemista maittain. Radio Browser on avoin ja ilmainen
  hakemisto, jossa on kielitieto ja striimiosoite — se sopii tähän
  suoraan eikä vaadi avainta.
- Suora striimi ei toimi offline. Nappi tarvitsee siis kaksi tasoa:
  suora ensin, tallenne varalle. Sama kahden portaan rakenne kuin
  ambienssilla jo on.
- Kaikki asemat eivät salli upottamista. Se on tarkistettava asemakohtaisesti,
  ja epäselvät jätetään pois — sama linja kuin kuvien lisensseissä.

## KESKEN: vanhan maailman kaupungit valmiiksi (aloitettu 2.8.2026)

Omistajan toimeksianto: "Tee kaikki loput kaupungit vanhassa maailmassa
kaikin puolin valmiiksi. Tee kaikki mahdollisimman itsenäisesti. Älä jää
odottamaan minulta vastausta vaan tee itse päätökset. Korjataan
myöhemmin mikäli tarpeen."

**Yksi poikkeus, omistajan tarkennus: puheääniä EI generoida.** Se on
ainoa osa, joka jätetään tekemättä.

### Mikä puuttuu ja keneltä

Mittaus 143 kaupungista:

| sisältö | on | puuttuu |
|---|---|---|
| saapumisteksti | 80 | **63** |
| kulttuurinostot | 80 | 63 |
| vanha valokuva | 80 | 63 |
| maatunnus | 79 | 64 |
| wiki-artikkeli | 80 | 63 |
| ambienssi | 80 | 63 |
| kielinäyte | 31 | 112 |

Puuttuvat ovat **koko Aasia ja koko Lähi-itä**. Ne puuttuvat myös
alkuperäisiltä laudoilta — `asia.js`:ssä ja `middleeast.js`:ssä ei ole
yhdelläkään kaupungilla wiki-kenttää eikä ambienssia — joten korjaus
hyödyttää kumpaakin.

Kysymykset ja tiedot sen sijaan ovat kunnossa: vain neljällä
aloituskaupungilla on alle kaksi kysymystä, ja se on oikein — niissä ei
ole laattaa.

### Työjärjestys

1. **Wiki, ambienssi ja maa** (`tools/taydenna-kaupungit.mjs`) — ilman
   näitä kuvia ei voi hakea eikä kaupungin ääni soi.
2. **Saapumistekstit kahdella äänellä** — isoisän merkintä 1873 ja
   nuoren herran havainto, Wikipedian tiivistelmän pohjalta.
3. **Kuvat ja kuvatekstit** kaikkiin 143 kaupunkiin.
4. **Kulttuurinostot** ja loput.

### Kuvien lähteet — omistajan päätökset

- **Wikimedia Commons -kategoriat**, ei artikkelin kuvia. Artikkelissa
  on 3–10 kuvaa, kategoriassa satoja (Dubrovnik: yli 500).
- **Library of Congress** matkakirjan kuviin nykyisten lisäksi
  (omistajan päätös). Photochrom-kokoelma on vuosilta 1890–1910 eli
  juuri isoisän aikaa, public domain, ei vaadi avainta.
- **Europeana** kolmantena; vaatii avaimen, joka menee GitHubin
  salaisuuksiin nimellä `EUROPEANA_AVAIN`.
- Kartat, vaakunat ja liput karsitaan pois.
- Kuvatekstit kirjoitetaan kuvauksen pohjalta suomeksi, ei kopioida.

**Tarkkuus 1200 pikseliä.** Arvioin ensin 800 ja perustelin sen
peilin koolla — se oli väärin: peili ei ole enää media-repo vaan R2-
ämpäri, jossa gigatavun raja ei päde. Omistaja huomautti siitä.

### Ansa, johon jäin heti kiinni

Ensimmäinen hakuajo ilmoitti, ettei 46 kaupungille löydy artikkelia —
mukana Tokio, Delhi ja Bangkok. Ne kaikki ovat olemassa. Wikipedia
vastasi 429 "too many requests", ja työkalu nieli virheen ja tulosti
sen puuttuvana artikkelina. **Sama virhe kuin äänipuolella aiemmin:
hiljainen nieleminen tekee verkkovirheestä sisältövirheen.** Nyt haku
odottaa, yrittää uudelleen ja kertoo koodin.


## Paketti 54: napsahdus lopusta pois — VALMIS v177 2.8.2026

Omistajan havainto v176:n jälkeen: "Joissain kuuluu napsahdus vielä
lopussa mutta ei kaikissa."

**"Ei kaikissa" oli ratkaiseva vihje.** Se sulkee pois sen, ettei
häivytystä ajettaisi lainkaan — silloin napsahtaisi joka kerta.

Voimakkuutta säädetään ruudunpäivityksen tahdissa eli noin 16
millisekunnin välein. Kun häivytys päättyi vasta tiedoston lopussa,
viimeinen säätö osui pahimmillaan **kolmasosaan täydestä
voimakkuudesta** — ja siitä syntyi napsahdus. Äänitteet, jotka loppuvat
jo valmiiksi hiljaisuuteen, eivät napsahtaneet, koska niissä ei ole
mitään mikä napsahtaisi. Siitä ero.

**Korjaus: häivytys saavuttaa nollan ennen tiedoston loppua.** Se
kestää nyt 120 millisekuntia ja on vaiennut jo 25 millisekuntia ennen
loppua; pysäytys osuu hiljaisuuteen. 25 millisekuntiin ei mahdu tavua,
joten viimeinen sana kuuluu yhä kokonaan.

Testi vaatii, että hiljaisuus kattaa vähintään yhden ruudunpäivityksen
(20 ms) mutta jää alle 60 millisekunnin.


## Paketti 53: lukijan viimeinen sana kuuluu — VALMIS v176 2.8.2026

Omistajan havainto: "Lukijan ääni feidautuu pois ja nielee viimeisen
sanan. Feidi saisi olla ihan viimeinen millisekunti jotta napsahdus
lopusta vain jää pois."

**Sama luku palveli kahta eri tarkoitusta.** Puolitoista sekuntia on
oikea silloin, kun luenta katkaistaan **kesken tiedoston** lauserajalla:
siellä häivytys korvaa töksähtävän katkon keskellä puhetta, ja se
lisättiin aikanaan juuri omistajan havainnon perusteella.

Nauhoituksen **omassa lopussa** sama pituus on väärin. Häivytys alkoi
puolitoista sekuntia ennen loppua — eli keskellä viimeistä sanaa.

Pahensi asiaa vielä toinen kohta: soitin pysäytettiin, kun loppuun oli
50 millisekuntia. Yhdessä nämä söivät lopun kahdesti.

**Nyt lukuja on kaksi.** Lauserajan häivytys pysyy puolessatoista
sekunnissa; lopun häivytys on 50 millisekuntia, eikä ääntä pysäytetä
ennen tiedoston loppua. Se riittää poistamaan napsahduksen eikä kuulu
häivytyksenä.

Testi vartioi molempia: lauserajan häivytys ei saa lyhentyä alle puolen
sekunnin eikä lopun kasvaa yli 0,15 sekunnin.


## Paketti 52: puuttuvat saaret ja Tutki-napin luettavuus — VALMIS v175 2.8.2026

Omistajan havainnot: "Korsika puuttuu" ja "Tutki nappi näkyy huonosti".

### Neljä saarta oli pudonnut

Rannikot karsitaan Ramer–Douglas–Peuckerilla, ja liian pienet renkaat
pudotetaan. Poikkeuksena säilyvät ne, joiden sisällä on kaupunki —
Sisilia, Kreeta, Kypros ja Sansibar jäivät siksi kartalle.

**Kaupungittomuus on väärä mittapuu saaren olemassaololle.** Pudonneet:

| saari | huomio |
|---|---|
| Islanti | **kaupunki kellui merellä ilman saarta** |
| Sardinia | |
| Korsika | omistajan havainto |
| Saint Helena | kaupunki kellui samoin |

Islannin ja Saint Helenan kohdalla vika oli näkyvämpi kuin omistaja
ehti mainita: laatta oli aavalla merellä.

**Miksi ei laskettu rannikoita uudelleen?** Se vaatisi Natural Earthin
aineiston. Sama tieto on jo pelissä: vanhojen lautojen omat rannikot.
Uusi `tools/puuttuvat-saaret.mjs` kääntää ne takaisin leveys- ja
pituusasteiksi ja projisoi Milleriin, kuten maiden rajatkin. Lisätään
vain se, mitä laudalta puuttuu: jos jokin olemassa oleva ääriviiva jo
peittää saaren paikan, sitä ei kosketa.

**Kaksi merireittiä piti laskea uudelleen** — Barcelona–Rooma kulki
Sardinian yli ja Islanti–Tromssa Islannin yli, koska maata ei ennen
ollut siinä. Molemmat ratkesivat.

### Tutki-nappi näkyi kartan läpi

Ensisijaisen napin tyylissä luki `background: none`, joten kartta näkyi
napin läpi ja teksti hukkui kaupunkinimiin ja rantaviivaan. Ajatus oli
oikea — ensisijainen valinta erottuu kullalla eikä kultalaatalla — mutta
se vei myös pergamenttilevyn, jonka muut napit saivat juuri
luettavuuden vuoksi.

Nyt levy on ensisijaisellakin, hitusen lämpimämpänä ja peittävämpänä.
Nappi erottuu kahdesti: kullanvärisestä kehyksestä ja tekstistä sekä
kirkkaammasta pohjasta.


## Paketti 51: matkakertoja takaisin yhdistetylle laudalle — VALMIS v174 2.8.2026

Omistajan havainto: "Matkakirjan lukija ääni puuttuu kaikkialta. Myös
äänen symboli puuttuu matkakirjasta."

**Sama juurisyy kuin Tutki-ikkunassa, eri paikassa.** Luennat on
avainnettu `lauta:kaupunki`, ja tiedoston nimessä on sama laudan tunnus
(`puhe-europe-saapuminen-dubrovnik.mp3`). Yhdistetyllä laudalla tunnus
on `vanhamaailma`, jolle ei ole yhtään luentaa — eikä tulekaan, koska
kyse on samoista kaupungeista ja samoista nauhoituksista.

Kaiutinnappi näytetään vain kun luenta löytyy, joten myös symboli
katosi. Se oli oikea käytös väärästä tiedosta.

**Korjaus:** `luentaLauta()` käy lähdelaudat läpi ja palauttaa sen,
jolta luenta löytyy. Palautettua tunnusta käytetään sekä listahaussa
että tiedoston nimessä. Kaikki kolme luentalajia — saapuminen, havainto
ja aarrevihje — kulkevat saman haun kautta.

**Opetus, jonka kirjaan ylös:** yhdistetty lauta perii sisältönsä
neljältä laudalta, mutta **jokainen laudan tunnuksella tehty haku on
oma erillinen kohtansa**. Niitä oli viisi sisältötaulua (v173), kaksi
karttakenttää (v173) ja kolme luentalistaa (tämä). Seuraava, joka
lisää tällaisen haun, lisää samalla uuden vian — siksi haku on nyt
yhdessä funktiossa eikä kolmessa kohdassa.


## Paketti 50: Tutki-ikkuna täydeksi yhdistetyllä laudalla — VALMIS v173 2.8.2026

Omistajan havainto: "iPadilla tutki ikkuna on vajaa" — ja tarkennus:
"Tutki ei näy oikein iPhonellakaan."

**Se ei ollut ruudun koko.** Tarkennus ratkaisi asian: kun sama vika on
molemmilla laitteilla, syy ei ole näytössä vaan sisällössä.

Tutki-ikkunan oikea palsta (maan nimi, lippu, minikartta, tunnusluvut,
tervehdykset) ja Kaupungin elämää -osio haetaan **laudan tunnuksella**.
Yhdistetylle laudalle ei ollut mitään: viisi sisältötaulua tunsivat vain
`africa` ja `europe`, ja `map.cityCountry` ja `map.countryShapes`
puuttuivat paketista kokonaan. Kaupungin kuva ja tiivistelmä tulivat
Wikipediasta ja näkyivät, joten ikkuna avautui — vajaana.

### Sisältötaulut perivät neljän laudan sisällön

`SAAPUMISTEKSTIT`, `KULTTUURIT`, `VALOKUVAT`, `KIELET` ja `MAATIEDOT`
saivat `vanhamaailma`-rivin, joka yhdistää lähdelautojen taulut.
Yhdistäminen on turvallista, koska avaimet ovat kaupunkitunnuksia ja
porttikaupungit ovat yhdistetyllä laudalla yksi kappale kukin.

### Maiden rajat projisoitiin uudelleen

Uusi `tools/maat-vanhaanmaailmaan.mjs` kääntää Euroopan ja Afrikan
laudan maiden rajat takaisin leveys- ja pituusasteiksi (samat
`KAANTEISET`-kaavat kuin kaupungeilla) ja projisoi ne Milleriin.
Tulos: 79 kaupunkia, 56 maata, 74 rengasta.

**Millerin sovitus luetaan laudalta itseltään** eikä lasketa uudestaan.
Jokaiselle kaupungille tiedetään sekä lon/lat että valmis x/y, joten
skaalan ja siirron saa pienimmän neliösumman sovituksella — työkalu ei
siis tarvitse Natural Earthin aineistoa eikä voi ajautua eri
mittakaavaan kuin lauta.

**Sovitus piti tehdä kolmesti.** Kaupunkien paikat eivät ole puhdasta
projektiota: rannikkokaupungit on siirretty lähimpään maakohtaan, ettei
laatta kellu vedessä, ja kaksi satamaa siirrettiin erikseen rannalle.
Suora sovitus kaikkiin kaupunkeihin kaatui juuri siihen. Nyt huonoin
viidennes pudotetaan joka kierroksella; mediaanipoikkeama on 0,0
yksikköä ja pahin 68 — ja pahin on nimenomaan siirretty kaupunki, ei
virhe.

**Leveys lasketaan projisoiduista renkaista** eikä skaalata vanhasta
luvusta: lähdelaudoilla on eri mittakaavat (Eurooppa 19,2 ja Afrikka
13,3 yksikköä astetta kohti), joten yksi kerroin olisi oikea vain
toiselle.

### Jäljellä

Aasialla ja Lähi-idällä ei ole maarajoja omilla laudoillaankaan, joten
niiden kaupungeissa palsta on yhä suppea. Se on sisältötyötä eikä
projektiota.


## Paketti 49: lento ei tökkää, ja puheen virhe näkyviin — VALMIS v172 2.8.2026

Omistajan havainto: "Lento tökki, mutta kartta toimii. Matkakirjan ääni
ei kuulu iPadilla."

**Hitaus oli siirtynyt lennon kohdalle.** Lauta piirretään kalvon taakse
jo lennon aikana, ja bittikartan rasterointi vie satoja millisekunteja
pääsäikeessä. Kartta itse oli nopea, koska sen työ oli tehty — se
tehtiin väärään aikaan.

Rasterointi odottaa nyt kalvon väistymistä.

**Sama jumi selittää todennäköisesti myös puheen.** Lennon puhe alkaa
1400 millisekunnin ajastimella, eikä ajastin pääse ajoon jumin läpi.
iOS hylkää `play()`-kutsun, joka ei enää liity käyttäjän eleeseen — ja
mitä myöhemmäksi kutsu venyy, sitä varmemmin se hylätään.

**Tämä on arvaus, ja se on sanottava ääneen:** en voi toistaa iPadin
käyttäytymistä täällä. Siksi `play()`-kutsun virhe kirjoitetaan nyt
konsoliin virhenimineen sen sijaan että se nieltäisiin vaieten. Jos
ääni ei vieläkään kuulu, konsoli kertoo kumpi on kyseessä —
`NotAllowedError` (ele) vai latausvirhe (tiedosto).


## Paketti 48: bittikartta ruuduiksi, lataus vain sormen irrotessa — VALMIS v171 2.8.2026

Omistajan linjaus: "Pitää olla sen verran bufferia että kesken eleen ei
tarvitse ladata. Mutta heti kun sormi irtoaa ladataan lisää ja silloinkin
vain uusi osa jotta itse lataus mahd. nopea." Ja tarkennus: "Lataus siis
aina vain juuri kun sormi irtoaa, ei muulloin."

### Miksi edellinen versio tökki

Kuva piirrettiin **kokonaan uudestaan** aina kun näkyvä alue lähestyi
piirretyn reunaa — ja lataus alkoi kesken eleen. Rasterointi vie satoja
millisekunteja pääsäikeessä, joten se tuntui nykäyksenä sormen alla
riippumatta siitä, kuinka pieni pala oli oikeasti uutta.

### Kolme sääntöä

1. **Kesken eleen ei ladata.** `asetaPan` ei enää tilaa mitään.
2. **Puskuria on ruudullisen verran joka suuntaan.** Yksi pyyhkäisy
   siirtää karttaa korkeintaan ruudullisen, koska sormi ei mahdu
   kulkemaan ruutua pidemmälle — puskuri kattaa siis koko eleen.
3. **Vain uusi osa.** Kuva on nyt **ruudukko**: jo piirretyt ruudut
   jäävät sellaisinaan, ja uutta työtä on vain se kaistale, joka tuli
   näkyviin.

Lataus tapahtuu `pointerup`- ja `pointercancel`-hetkellä sekä silloin
kun näkymä asettuu (zoom ja koon muutos siirtävät aluetta ilman yhtään
sormen liikettä).

### Taide sarjallistetaan kerran

Nopeuden kannalta olennaisin yksityiskohta. Jokainen ruutu tehdään
samasta taiteesta, ja jos taide sarjallistettaisiin joka ruudulle
uudestaan, 6500 elementin läpikäynti maksaisi enemmän kuin itse piirto.
Nyt teksti syntyy kerran ja ruutu vaihtaa siitä vain näkymäikkunan ja
koon.

### Tarkkuus budjetista

iPadin näyttö on kaksinkertainen, joten logiikkapikseleillä piirretty
kuva venyy näytöllä ja näyttää pehmeältä — ohuet rantaviivat katoavat.
Tarkkuus maksaa kuitenkin muistia neliöllisesti, ja puskuroitua aluetta
on yhdeksän ruudullista. Tarkkuus valitaan siksi muistibudjetista (48
Mt): niin tarkka kuin mahtuu, enintään näytön oma tarkkuus.

### Vinjetti pois kaikkialta

Omistajan päätös: "Voit ottaa vinjetoinnin vaaleampaan pois kaikkialta
nyt kun kartta on liikuteltava" — ja kaikilla laitteilla.

Reunahäivytys rajasi lautaa kuin vanhan filmin ruudun silloin, kun
kartta oli kiinteä kokonäkymä. Nyt karttaa panoroidaan ja zoomataan joka
laudalla, joten reuna ei rajaa mitään: se vain haalistaa sitä osaa
karttaa, jota katsotaan. Poistettu sekä CSS:stä (`.map-pane::after`)
että kartan omasta piirrosta (`vignette`-suorakulmio ja sen liukuväri).


## Paketti 47: kuva ei välky eikä jää jälkeen — VALMIS v170 2.8.2026

Omistajan kaksi kysymystä: "Lasketaanhan uusi bittikartta heti kun sormi
irtoaa eikä vasta kun uusi sormiele alkaa?" ja "Kuva välkkyy kun se
tekee uuden latauksen siirron aikana."

### Milloin kuva tarkistetaan

Uusi kuva pyydetään **jo kesken pyyhkäisyn**: jokainen sormen liike
tarkistaa, onko näkyvä alue tullut puolen ruudun päähän piirretyn
reunasta. Se on aikaisemmin kuin sormen irrotessa.

Yksi aukko silti oli. **Jos piirto oli kesken juuri kun sormi nousi,
seuraava tarkistus tuli vasta seuraavasta eleestä** — ja siinä välissä
kuva oli jo väärässä kohdassa. Eleen päättyminen on oma hetkensä, ja se
saa nyt oman tarkistuksensa.

Kolme hetkeä, joina kuva tarkistetaan, eikä yksikään riitä yksin:

1. liikkeen aikana (`asetaPan`)
2. eleen päättyessä (`pointerup`, `pointercancel`)
3. näkymän asettuessa (`fitViewBox`) — zoom ja koon muutos siirtävät
   aluetta ilman yhtään sormen liikettä

Testi vartioi kaikkia kolmea ja lisäksi sitä, että puskuri on selvästi
suurempi kuin kynnys, jolla uusi kuva tilataan: erotus on se matka,
jonka sormi saa kulkea piirron aikana ilman että tyhjää näkyy.

### Välkkyminen: kaksi syytä, molemmat korjattu

**1. Kuvaa ei ollut purettu.** SVG:n `<image>` viittaa blob-osoitteeseen,
jonka selain hakee ja purkaa vasta kun elementti on puussa — siinä
välissä ehtii yksi tyhjä kehys. PNG puretaan nyt valmiiksi (`decode()`)
ennen kuin se pannaan karttaan.

**2. Vaihto jätti aukon.** `replaceChildren` poistaa vanhan ja lisää
uuden samalla kertaa, eikä uusi ole vielä piirtynyt. Nyt uusi menee
**vanhan alle** ja vanha poistetaan vasta seuraavalla kehyksellä.
Ruudulla on koko ajan jompikumpi, ja koska ne ovat sama kuva samasta
taiteesta, vaihdos ei näy.


## Paketti 46: tiet takaisin kartalle ja oikea bittikartta — VALMIS v169 2.8.2026

Omistajan kuvakaappaus iPadilta: "Lataa edelleen liian laajan näkymän
alkuun. Tiet eivät näy vaikka zoomaan lähemmäs ja skrollaus tökkii."
Kuvassa näkyivät kaupungit, nimet, maasto ja lentoreitit — mutta ei
yhtään tietä.

### Tiet katosivat samasta syystä kuin meri v159:ssä

Reittikerros oli kartan **viimeinen suodatettu kerros**. v159:ssä
poistettiin `#rough` mantereilta, aalloilta ja maastolta, koska iOS:n
webapp-tila palautti suodatetun kerroksen tyhjänä eikä saanut sen
piirtopuskuria enää varattua. Reitit saivat pitää suodattimensa, ja
perustelu oli tuolloin oikea: kerros oli pieni ja näkyi omistajan
kuvassa oikein.

**Yhdistetyllä laudalla se ei ole pieni.** Reittikerros ulottuu
Lissabonista Tokioon, ja sama oire palasi täsmälleen samalla tavalla.

Reittien heilunta piirretään nyt pisteisiin (`kasinPiirretty`) kuten
rannikoillakin. `#rough-soft` on poistettu, ja **kartalla ei ole enää
yhtään suodatinta**. Testi vartioi sitä: kartan kerroksella ei saa olla
`filter`-määrettä lainkaan.

### SVG-kuva ei ole bittikartta

v167:n rasterointi antoi `<image>`-elementille SVG-blobin osoitteen.
Elementtien määrä laski, ja mittari näytti hyvää 26 ms — mutta kun
reitit lisättiin samaan kuvaan, panorointi hidastui **128
millisekuntiin**. Syy: SVG-kuva on yhä vektoria, ja selain piirsi sen
uudelleen aina kun muunnos muuttui. Kuva oli vain siirtänyt työn toiseen
paikkaan.

Nyt kuva piirretään canvakselle ja käytetään PNG:nä. Se on oikea
bittikartta, jonka siirtäminen on kompositorin työtä.

| vaihe | elementtejä | panorointi |
|---|---|---|
| alkuperäinen | 7192 | 236 ms |
| v167, SVG-kuva | 1611 | 26 ms |
| v167 + reitit kuvassa | 805 | 128 ms |
| **v169, canvas-PNG** | **805** | **17 ms** |

17 millisekuntia on täysi ruudunpäivitys.

### Puskuri pienemmäksi, aloitusnäkymä kapeammaksi

Puskuri oli kokonainen ruudullinen joka suuntaan, jolloin kuva on kolme
kertaa ruudun levyinen — iPadilla yli 3000 pikseliä eli päälle 40
megatavua canvasta. 0,6 ruudullista riittää: sormi ei ehdi yhdellä
pyyhkäisyllä yli, ja uusi kuva tilataan jo puolivälissä.

Saapumisnäkymän yläraja 2400 → 1500 yksikköä. Se osuu portaalle 1422,
noin kolmekymmentä pituusastetta — Lontoosta Varsovaan.


## Paketti 45: saapumiszoom mantereeseen, ei kaupunkiin — VALMIS v168 2.8.2026

Omistajan havainto iPadilta: "Vanha maailma näkyy kokonaan ja zoomautuu
sen jälkeen aivan liian lähelle Ateenaa. Pitäisi näkyä vain Eurooppa ja
sitten jäädä siihen."

### Kiinteä lista leveyksiä oli väärä ratkaisu

v167 vaihtoi zoomiportaat kertoimista näkyviksi leveyksiksi
`[667, 435, 294, 200, 132, 88]`. Se korjasi lähimmän portaan mutta
rikkoi toisen pään: tihein porras 667 yksikköä on tuhannen yksikön
laudalla sopiva ensiaskel, mutta 7200 yksikön laudalla se on jo
kaupungin ympäristö. **Kokonäkymän ja ensimmäisen portaan väliin jäi
yli kymmenkertainen hyppy**, ja saapuminen osui sen jälkeiselle
portaalle eli suoraan kaupungin päälle.

**Nyt portaat ovat suhteellisia:** laudan leveydestä puolitoista-
kertaisin askelin lähimpään portaaseen (88 yksikköä).

| lauta | portaat, näkyvä leveys |
|---|---|
| 1000 | 1000, 667, 444, 296, 198, 132, 88 |
| 7200 | 7200, 4800, 3200, 2133, 1422, 948, 632, 421, 281, 187, 125, 88 |

Pienen laudan portaat ovat käytännössä samat kuin alkuperäiset kertoimet
`[1, 1.5, 2.3, 3.4, 5]`. Isolla laudalla väliin syntyy portaita sitä
mukaa kuin lautaa on enemmän — sitä kiinteä lista ei osannut.

### Saapumistaso lasketaan, ei numeroida

Kiinteä porrasnumero ei kelpaa, koska portaiden määrä riippuu laudan
koosta: sama numero on pienellä laudalla lähikuva ja isolla yleisnäkymä.
Nyt valitaan porras, joka on lähimpänä tavoiteltua leveyttä — 43 %
laudasta (sama osuus kuin vanha `MANNER_ZOOM = 2.3`), enintään 2400
yksikköä.

Tuloksena pieni lauta saapuu 444 yksikköön kuten ennenkin, ja
yhdistetty lauta 2133 yksikköön eli suunnilleen Lissabonista Moskovaan.

### Kokonäkymää ei näytetä isolla laudalla lainkaan

Saapumisliuku alkaa kokonäkymästä, ja juuri se oli omistajan havainnon
ensimmäinen puolisko. Pienellä laudalla liuku on hyvä — kokonäkymä
kertoo minne on tultu. Vanhalla maailmalla se ei kerro sitä, joten
isolla laudalla mennään suoraan perille ilman liukua.


## Paketti 44: kartta bittikartaksi ja zoomi laudan mukaan — VALMIS v167 2.8.2026

Omistajan havainto: "Kartan scrollaus on hidas eikä zoomaa tarpeeksi
lähelle."

### Mitattiin ensin

| lauta | elementtejä | panorointi |
|---|---|---|
| Eurooppa | 741 | 30 ms/kehys |
| vanha maailma | 7192 | **236 ms/kehys** |

236 millisekuntia on noin neljä kuvaa sekunnissa. Uusi
`tools/mittaa-kartta.mjs` laskee luvut selaimessa.

### "Onhan se bittikarttana kun scrollataan?" — ei ollut

Koodin oma kommentti lupasi, että CSS-muunnoksella panoroitaessa selain
käyttää valmista rasteria. Mittaus osoitti lupauksen vääräksi: selain
piirsi 7192 vektorielementtiä uudelleen joka kehyksellä. Omistaja arvasi
tämän itse ennen kuin ehdin kertoa.

**Nyt kartan muuttumaton taide — pergamentti, mantereet, aallot, maasto,
koristeet — on yksi kuva.** Elävään puuhun jää vain se, mikä muuttuu:
reitit, kaupungit, nimet, laatat ja nappulat. 7192 → 1611 elementtiä,
**236 → 25 ms/kehys**, eli sama kuin pienellä laudalla.

### Ikkuna, ei koko kartta

Omistajan tarkennus: "ei kannata laskea koko valtavaa karttaa
bittikartaksi heti, vaan vain osa alueesta." Tämä on oikein ja välttämätöntä:
yhdistetyn laudan pergamentti on noin 26 000 yksikköä leveä, ja sen
rasterointi lähikuvan tarkkuudella olisi kymmeniä tuhansia pikseleitä.

Kuva tehdään siksi ikkunasta, joka on yhden ruudullisen verran
näkyvää aluetta suurempi joka suuntaan. Uusi ikkuna tilataan jo silloin,
kun näkyvä alue tulee puolen ruudun päähän reunasta — ei vasta reunalla.
Vanha kuva pysyy paikallaan kunnes uusi on ladattu, joten tyhjää ei näy
missään vaiheessa (omistajan vaatimus).

### Kolme omaa virhettä, kaikki kiinni tarkistuksesta

1. **Tyylit eivät periydy.** Ensin upotin sivun tyylitiedoston kuvaan.
   Säännöt on kirjoitettu sivun rakennetta vasten (`#board`, `body...`),
   eikä irrallisessa SVG:ssä ole bodya — yksikään sääntö ei osunut ja
   kartasta tuli musta paperi mustine mantereineen. Nyt jokaiselta
   elävältä elementiltä kysytään sen **laskettu** tyyli ja se
   kirjoitetaan kloonin omaksi tyyliksi.
2. **Ikuinen silmukka.** Ikkuna rajataan paperin sisään, joten kartan
   laidalla se ei voi ulottua puskurin verran ulommas — ja ehto jäi
   ikuisesti täyttymättä. Nyt paperin reuna kelpaa reunaksi.
3. **Kuva syntyi liian aikaisin.** Ensimmäinen kuva piirtyi laudan
   luonnin yhteydessä, jolloin viewBox oli vielä oletusarvoinen
   1000 × 1000, ja ikkunaksi tuli 3000 yksikköä. Yleiskuvassa ei
   panoroida, joten mikään ei pyytänyt parempaa, ja kartta jäi
   kaistaleeksi. Nyt ensimmäinen kuva odottaa seuraavaa kehystä ja
   näkymän asettuminen pyytää aina uuden.

**Kaikki kolme näkyivät vain kuvakaappauksessa**, eivät testeissä
eivätkä mittarissa — mittari näytti koko ajan hyvää 26 millisekuntia,
koska tyhjää karttaa on nopea piirtää. Vertailukuva ennen/jälkeen on
ainoa tapa nähdä tällainen.

### Zoomi laudan mukaan

Portaat olivat kertoimia kokonäkymään: `[1, 1.5, 2.3, 3.4, 5]`. Tuhannen
yksikön laudalla suurin porras näytti 200 yksikköä eli kaupungin
ympäristön, mutta 7200 yksikön laudalla sama kerroin näytti 1440
yksikköä — koko Euroopan. Sama nappi tarkoitti eri asiaa eri laudalla.

Nyt portaat ovat **näkyviä leveyksiä**: `[667, 435, 294, 200, 132, 88]`.
Luvut ovat samat kuin vanhat kertoimet tuhannen yksikön laudalla, joten
pienet laudat käyttäytyvät täsmälleen kuten ennen, ja kaksi uutta
porrasta jatkavat lähemmäs.

### Lennettäessä suoraan lähikuvaan

Omistajan toive: "Lennettäessä aloitusnäytöltä kartta voisi olla
zoomautuneena saman verran kuin aikaisemmissa versioissa." Kokonäkymä on
olemassa siksi, että pelaaja näkee minne on tullut — vanhalla maailmalla
se ei kerro sitä, koska koko manner mahtuu ruudulle niin pienenä ettei
kaupunkeja erota. Isolla laudalla (yli 2000 yksikköä leveä) laskeudutaan
siksi suoraan lähikuvaan, ja loput näkyvät vasta jos pelaaja itse
loitontaa.


## Paketti 43: vanha maailma peliin, merireitit kuntoon — VALMIS v166 2.8.2026

Omistajan linjaukset: "Julkaise kartta sitten suoraan peliin kun saat nuo
valmiiksi", "aina voi peruuttaa jos ei toimi", "pelillä ei ole vielä
pelaajia niin voidaan edetä rohkeasti."

### Vika ei ollut ruudukossa vaan mittatikussa

Kirjasin v165:ssa, että 13 reittiä kulkee maalla ja syy on liian karkea
ruudukko. **Syy oli väärä.** Uusi `tools/tutki-merireitit.mjs` kysyi
asiaa pelin omalta reittiviivalta, ja jokaisessa maalla kulkevassa
reitissä **kaikki välipisteet olivat vedessä**. Ruudukko oli siis tehnyt
työnsä.

Vika oli kelpuutuksessa. Työkalu tarkisti reitin suorina pätkinä
välipisteestä toiseen, mutta peli ei piirrä suoria: `edgePolyline`
pehmentää välipisteet Catmull-Rom-käyräksi, ja käyrä kaartaa jyrkissä
mutkissa välipisteiden **ulkopuolelle**.

**Nyt kelpuutus rakentaa saman viivan kuin peli** ja ottaa näytteitä sitä
pitkin neljän yksikön välein. Se on ainoa tapa tietää, mitä pelaaja
näkee — ja se on tiukempi mitta kuin mikään aiempi luku: pelin oma testi
tutkii viivaa 2 %:n välein, mikä pitkällä reitillä tarkoittaa kymmenien
yksiköiden hyppyjä.

### Oma ansa matkan varrella

Ensimmäinen korjattu versio ilmoitti kaikki kuusi korjatuiksi ja pudotti
välipisteet nollaan. Se oli väärin: uusi kelpuutus katsoi vain viivan
kulmapisteitä, ja välipisteettömällä suoralla niitä on kaksi, molemmat
satamassa — yhtään näytettä ei jäänyt tarkastettavaksi, joten kaikki
kelpasi. Nyt näytteet otetaan viivaa pitkin neljän yksikön välein.

### Oikea syy kolmeen viimeiseen: satama sisämaassa

Madagaskarin kolme merireittiä eivät ratkenneet millään ruudukolla, ja
työkalu toisti "polku löytyi mutta pehmennetty viiva kulkee maalla".
Syytä ei ollut reitissä lainkaan: **Madagaskar oli 72 yksikön päässä
rannasta.** Peli sallii kaupungin ja sataman väliin 55 yksikköä, joten
yksikään reitti sen päästä ei voi koskaan kelvata — ei tiheämmällä
ruudukolla eikä millään haulla.

Kaupunki on saaren nimikkopiste, ei sisämaan pääkaupunki, joten
siirtäminen rannalle on myös sisällöllisesti oikein. Uusi
`tools/satamat-rannalle.mjs` siirsi kaksi kaupunkia: Madagaskarin
(72 → 4 yksikköä rannasta) ja Mosambikin (52 → 4).

**Kynnys ja tavoite ovat eri luvut tahallaan.** Ensimmäinen versio
siirsi kahdeksan kaupunkia, mukaan lukien Kairon ja Aleppon, jotka ovat
omilla paikoillaan syystä. Siirretään vain ne, joiden merireitti on
mahdoton (yli 46 yksikköä), ja niille tavoitellaan 26:ta.

### Näytteenotto astui satamavyöhykkeen ohi

Neljän yksikön näyteväli riitti melkein. Helsingin ja Tallinnan väli on
112 yksikköä, eli kahden satamavyöhykkeen (55 + 55) väliin jää **2,2
yksikköä** tarkastettavaa — ja neljän yksikön askel hyppäsi sen yli.
Reitti näytti työkalussa kelvolliselta ja jäi pelin omaan testiin
kiinni. Askel on nyt yksi yksikkö. Kapeimmat tarkastettavat kohdat ovat
aina lyhyillä reiteillä, eivät pitkillä.

### Nopeus: rasteri riveittäin

Tarkennus tarvitsee tiheämmän ruudukon, ja se paljasti kaksi
pullonkaulaa:

1. **A*:n avoin lista** etsi pienimmän arvon lineaarisesti. Karkealla
   ruudukolla se ei haittaa, mutta satojentuhansien ruutujen haussa se
   tekee hausta neliöllisen. Tilalle keko.
2. **"Onko tämä maalla" maksoi noin millisekunnin.** Se kysyttiin joka
   ruudulta erikseen, ja jokainen kysymys kävi läpi 38 ääriviivaa.
   Nyt rasteri lasketaan riveittäin: lasketaan mistä kohdista ääriviivat
   leikkaavat rivin, ja luetaan jokaisen ruudun puoli siitä. **6700
   ruutua: 5,1 s → 0,33 s.**

Rivilasku on oma toteutus, joten se voisi eriytyä pelin säännöstä
huomaamatta. Siksi jokainen rasteri **tarkistetaan otoksella pelin omaa
`isOnLand`-funktiota vasten** ja työkalu kaatuu heti, jos ne eroavat.

Pelin puolelle jäi tästä pysyvä parannus: jokaisen ääriviivan
rajauslaatikko muistetaan (`js/mapart.js`), ja laatikon ulkopuolinen
piste hylätään neljällä vertailulla. Se nopeuttaa myös kartan piirtoa
isolla laudalla — sama huoli oli listalla iPadin kohdalla.

### Kartta on nyt peliin kytketty

Maailmankartan portit vievät ensisijaisesti yhdistetylle laudalle:
Lontoo, Kairo, Mumbai, Peking, Tokio, Singapore, Moskova, Ateena,
Kapkaupunki ja Tanger. Neljä alkuperäistä lautaa jäävät rinnalle
("Eurooppa erikseen" ja niin edelleen), koska niillä on kullakin oma
aarteensa ja yhdistetyllä on toistaiseksi yksi.

Portit ovat vastavuoroisia molempiin suuntiin — ilman paluulinkkiä
pelaaja jäisi laudalle, ja testi vartioi sitä.

**Testeistä korjattiin oma heikkous:** ne valitsivat portin kiinteällä
indeksillä 0, eli "ensimmäinen vaihtoehto". Kun yhdistetty lauta nousi
kärkeen, neljä testiä hajosi. Nyt testi sanoo minkä laudan se haluaa
(`porttiIndeksi(game, 'kairo', 'africa')`), eikä järjestys enää sido.

### Tulos

**54 merireittiä 54:stä kulkee vettä pitkin**, tiukalla mitalla
(pehmennetty viiva, näyte yhden yksikön välein). `MERIREITIT_KESKEN` on
tyhjä ja testi ajetaan ilman ohitusta: 369 testiä läpi, 0 ohitettua.

Yksi rumuus jäi: Ras Hafunista Suakiniin tarvitaan 237 välipistettä.
Reitti kiertää Afrikan sarven ja nousee koko Punaisenmeren, joka on
niin kapea, ettei yksikään pelkistys kestä tarkistusta. Se on noin 3 kt
229 kilotavun tiedostossa, joten hinta on pieni — mutta se on siellä.

### Jäljellä

1. **Aarrelogiikka: yksi aarre per maanosa.** Vasta sen jälkeen neljä
   alkuperäistä lautaa voi jättää pois.
2. Paluu Lontooseen ja 80 päivän raja.
3. Porttikaupunkien sisällöt (Istanbul, Kairo, Teheran).
4. Suorituskyky iPadilla — rajauslaatikot auttoivat, mitattava silti.


## Paketti 42: vanha maailma pelattavaksi laudaksi — VALMIS v165 2.8.2026

Omistajan toive: "Kartta loppuun." Kolme ensimmäistä vaihetta olivat
työkaluja; tässä niistä tehtiin lauta, jonka peli osaa piirtää.

**Tulos.** `js/packs/vanhamaailma.js` (229 kt): 7200 × 2620 yksikköä,
143 kaupunkia, 222 reittiä, 38 rannikkoa, 17 saarta. Nähtävissä
osoitteella `?lauta=vanhamaailma`. Maailmankartalla Lontoosta on nyt
linkki sekä Eurooppaan että vanhaan maailmaan — vanha lauta ei siis
korvaa neljää nykyistä, vaan on niiden rinnalla kunnes pelilogiikka on
valmis.

**Lauta levenee 4000 → 7200.** Ensimmäinen ajo pudotti 18 kaupunkia,
koska ne olivat pelin minimietäisyyttä lähempänä toisiaan — mukana
Praha, Budapest, Mekka ja Riika. Kaupunkien poistaminen on väärä
korjaus: leveämpi lauta pitää kaikki 143. Zoomi tekee koosta
merkityksettömän (omistajan linjaus paketissa 41).

**Merireitit lasketaan uudelleen** (`tools/merireitit.mjs`). Vanhoilla
laudoilla suora viiva kaupungista kaupunkiin riitti, koska rannikko oli
karkea. Natural Earthin tarkalla rannikolla 50 merireittiä 54:stä
kulki maan yli. Nyt A* etsii polun vesiruudukon läpi (ruutu 12
yksikköä; 22 umpeutti Englannin kanaalin, kun rannikon viereiset ruudut
merkitään maaksi).

**Pelkistys pilasi ensin lähes kaikki lasketut reitit.** A* löysi
kunnollisen polun, ja Douglas–Peucker oikaisi sen takaisin mantereen
läpi juuri siellä missä reitti kiertää niemen. Siksi jokainen
pelkistys tarkistetaan, ja karkein hyväksytään vasta kun se yhä kulkee
vettä pitkin.

**13 merireittiä 54:stä kulkee yhä maan yli.** Ne ovat kapeita salmia
ja saaristoja, joissa 12 yksikön ruudukko sulkeutuu maan levityksen
jälkeen: Lontoo–Dublin, Dublin–Edinburgh, Dubrovnik–Rooma,
Tukholma–Helsinki, Helsinki–Tallinna, Riika–Tukholma,
Madagaskar–Mosambik, Madagaskar–Sansibar, Sansibar–Mosambik,
Sansibar–Rashafun, Rashafun–Suakin, Mekka–Aden, Mumbai–Karachi.
`tests/rules.test.mjs` ohittaa merireittitestin tältä laudalta
(`MERIREITIT_KESKEN`) ja luettelee reitit nimeltä. Korjaus: paikallisesti
tiheämpi ruudukko näille väleille.

**Pergamentti oli kiinteän kokoinen.** `PAPER` oli vakio
`{ x: -1200, y: -1200, w: 3600, h: 3600 }`, joten 7200 leveällä laudalla
meri jäi mustaksi laudan puolivälistä eteenpäin. Nyt `paperi(map)`
laskee koon laudasta, ja `drawParchment`/`drawPaperOverlay` saavat
laudan parametrina. Vanhat laudat tarkistettiin erikseen: Eurooppa
piirtyy ennallaan.

**Sisältöä ei kopioitu.** Generaattori tuo kysymykset, kuvat ja tekstit
suoraan neljästä lähdepaketista. Kysymykset kootaan yhteen ja
kaksoiskappaleet karsitaan koko laudan tasolla niin, että kaupungin oma
kori voittaa yleiskorin.

**Mitä puuttuu yhä.**

1. 13 merireittiä (yllä)
2. Pelilogiikka: neljä aarretta (yksi per maanosa), paluu Lontooseen,
   80 päivän raja — nämä ovat pelisääntöjä, eivät karttaa
3. Porttikaupunkien sisällöt yhdistettävä (Istanbul, Kairo, Teheran)
4. Suorituskyky iPadilla


## Paketti 41: vanha maailma, vaiheet 2–3 — VALMIS 2.8.2026

Omistajan linjaus: "Pidä vain mittasuhteet realistisena. Pelissähän
pystyy nyt zoomaamaan, niin koko ei ole ongelma." Millerin projektio jää
siis sellaisenaan — Afrikka on iso ja Eurooppa pieni, kuten oikeasti.

### Vaihe 2: reitit

**Reittejä ei tarvinnut keksiä uusiksi.** Tämä oli listan suurin
epävarmuus, ja se ratkesi itsestään: samat kaupunkiparit ovat yhä
naapureita. Ja koska porttikaupungit sulautuvat yhdeksi, neljä verkkoa
liittyy niiden kohdalla automaattisesti.

**143 kaupunkia ja 222 reittiä = yksi yhtenäinen verkko.** Lissabonista
pääsee Tokioon ja Kapkaupunkiin ilman lautasiirtymiä.

| portti | laudat | reittejä |
|---|---|---|
| Istanbul | Eurooppa + Lähi-itä | 4 |
| Kairo | Afrikka + Lähi-itä | 7 |
| Teheran | Lähi-itä + Aasia | 3 |

27 merireittiä kaartaa välipisteillä; ne projisoitiin uudelleen, koska
vanhoilla luvuilla ne kulkisivat maan yli.

### Vaihe 3: nimien paikat

Arvioin tämän "työn suurimmaksi eräksi, joka vaatii silmää eikä
laskentaa". **Arvio oli väärä.** Tämä on kartografian vakio-ongelma
(point-feature label placement), ja se ratkesi hakemalla.

`tools/nimien-paikat.mjs` kokeilee jokaiselle nimelle 12 paikkaa
nimikkopisteensä ympäriltä ja pisteyttää törmäykset: toinen nimi 100,
kaupunkiympyrä 40, reitti 6, ja lisäksi pieni sakko sitä mukaa mitä
kauempana paikka on ihanteesta (oikea puoli on luettavin).

**Järjestys ratkaisee.** Ahtaimmalla olevat sijoitetaan ensin. Jos
väljällä seudulla olevat menisivät ensin, ne veisivät parhaat paikat
naapureiltaan — sama ilmiö kuin istumajärjestyksessä.

**Tekstien leveydet mitataan selaimessa** pelin omalla fontilla.
Merkkien laskeminen antaisi väärän tuloksen: "Kilimandžaro" ja
"Lissabon" ovat eri levyisiä samalla merkkimäärällä.

**Tulos: 143 nimeä, 0 päällekkäisyyttä.** Käsin katsottavaksi ei jäänyt
yhtään. Tarkistettu myös silmällä ahtaimmalta seudulta (Itämeri):
Helsinki, Tukholma, Pietari, Tallinna, Riika ja Oslo asettuivat kukin
omaan suuntaansa ja ovat luettavia.

### Jäljellä

1. Päällekkäisten kaupunkien sisällöt (Istanbul, Kairo, Teheran)
2. Pelilogiikka: aarrejahdit, passi, tallennus
3. Suorituskyky iPadilla — kartta on neljä kertaa isompi


## Paketti 40: kertojan väistö ja kompressointi — VALMIS v163 2.8.2026

**Omistaja:** "Hiljennä taustaääniä lisää. Vieläkin on vaikea kuulla
puhetta." — ja perään "lisää vain myös kompressointi, jos se on
mahdollista".

### Oikea syy löytyi ennen nupin kääntämistä

`vaimennaTausta()` laukesi vain ääninäytteestä ja zoomausäänestä.
**Kertoja ei väistänyt taustaa lainkaan.** Tausta soi siis täydellä
voimalla juuri silloin, kun sen pitäisi väistyä eniten. Pelkkä tason
lasku olisi tehnyt taustasta kuulumattoman kaikkialla vain puhehetkien
takia.

`puheAlkoi()` / `puheLoppui()` **laskurilla**: luentoja voi olla
päällekkäin (saapumisteksti ja päiväkirja), eikä ensimmäisen loppuminen
saa palauttaa taustaa kesken toisen. Vapautus tapahtuu kerran ja vain
kerran — `ended` ja `error` voivat molemmat laueta.

Väistön syvyys eriytettiin:

| väistäjä | kerroin | miksi |
|---|---|---|
| näyte, zoomausääni | 0,15 | lyhyitä, saavat kadota lähes kokonaan |
| kertoja | 0,25 | lukee minuutteja — tunnelma katoaisi mukana |

### Taso -33 → -36 LUFS

Omistaja: "taustaäänet saavat olla joka tapauksessa hiljaisemmalla,
olisivat liian häiritseviä muuten". Portaat tähän mennessä: -30, -33,
-36.

### Kompressointi

`DynamicsCompressorNode` taustavirtaan. Tämä korjaa eri asian kuin
tasaus: tasaus hoiti äänitteiden VÄLISET erot, kompressointi hoitaa
SISÄISEN vaihtelun (mitattuna 1,6…18,7 dB).

**Kompressori on ENNEN voimakkuussäätöä.** Jos se olisi jälkeen, kiinteä
kynnys osuisi eri kohtaan joka äänitteellä: kertoimet vaihtelevat
0,15…6 eli 32 dB. Siksi soittimen oma `volume` jää ykköseen ja taso
hoidetaan vahvistinsolmulla kompressorin jälkeen. **Sivuhyöty:**
vahvistin voi ylittää ykkösen, toisin kuin HTML-soittimen volume — eli
kertoimen katto ei enää leikkaa.

**Vaarallisin kohta, joka piti hoitaa.** Web Audioon reititetty elementti
ei enää soi suoraan kaiuttimeen. Jos konteksti on pysähtynyt (iOS ennen
kosketusta) tai lähde ei salli CORSia, tuloksena on **täysi hiljaisuus
ilman virhettä** — sitä ei voi napata try/catchilla. Kaksi suojaa:

1. Reititys vain kun `ctx.state === 'running'`.
2. `crossOrigin = 'anonymous'` **ennen** srciä, jolloin puuttuva lupa
   näkyy latausvirheenä. Sille on oma varareittinsä: sama äänite
   uudestaan ilman CORS-vaatimusta ja ilman kompressoria — tausta soi
   silti, vain puristamattomana.

Molemmat lähteet tarkistettu: ämpäri sallii pelin osoitteen,
archive.org kaikki. Varareitti ei siis normaalisti laukea.

**Todennettu selaimessa:** 23,5 dB:n hyppy kesyyntyi 13,9:ään (−9,7 dB),
ja **ääntä tulee** — ei hiljaisuutta.

**Mitä ei voi todentaa täältä:** iOS:n oma käyttäytyminen. Jos tausta
vaikenee iPadilla kokonaan, syy on tässä reitityksessä ja varareitti on
pakotettava päälle.


## Paketti 39: liian hiljaiset korvattu, taustataso alas — VALMIS v162 2.8.2026

**Omistaja:** "Joo, etsi niille seitsemälle korvaava." ja "Tausta-ääniä voi
hieman hiljentää."

### Korvaus vai poisto — laji kerrallaan

Ratkaisu ei ollut sama kaikille. Ratkaiseva kysymys oli, **montako
kelvollista vaihtoehtoa lajiin jää**, jos hiljainen vain poistetaan:

| laji | jäisi | ratkaisu |
|---|---|---|
| vuoristo, ylänkö | 1 | korvattu — Alppilaidun (Reit im Winkl, CC BY-SA) |
| satama | 2 | korvattu — Kalasatama (Sassnitz, CC BY-SA) |
| metsä | 1 | korvattu — Linnut metsässä (Thuin, CC BY) |
| savanni | 6 | poistettu |
| aavikko | 6 | poistettu (kaksi) |
| noppa | 2 | poistettu |

Yhden vaihtoehdon laji ei kelpaa: sama ääni joka käynnillä kuulostaa
siltä että peli on rikki.

**Alppilaitumen dynamiikka on vain 2,1 dB** — se on poikkeuksellisen
tasainen ja siksi erinomainen taustaksi.

### Haku mittaa heti

`tools/etsi-korvaajat.mjs` hakee aporeesta, tarkistaa lisenssin (ND pois,
koska peilattu ääni leikataan 180 sekuntiin) ja **mittaa ehdokkaan
saman tien**. Ilman sitä toistaisimme saman virheen: valitsisimme
korvalta ja huomaisimme vasta pelissä, että uusikin on liian hiljainen.

**Hakuansa, joka kannattaa muistaa.** Aporeen otsikot ovat paikannimiä,
joten `savanna` osuu Illinois'n Savannaan ja `alpine` Tennesseen Alpine
Driveen. Savannihaku piti tehdä nimenomaisilla Afrikan seuduilla — ja
silloinkin osumat olivat haastatteluja ja tarinoita, eivät luontoääntä.
Puhetta ei voi laittaa kertojan alle, joten savanni jäi poistoon.

### Taustataso alas

Tavoite **-30 → -33 LUFS** omistajan pyynnöstä. Tämä on koko
taustakerroksen ainoa säädin: yksi luku `tools/mittaa-aanet.mjs`:ssä ja
mittaus uudestaan, niin kaikki 120 äänitettä siirtyvät yhdessä eivätkä
keskinäiset suhteet muutu.

**Hajonta 49,8 → 3,8 dB.**

### Mittari yhteiseksi

Mittaus erotettiin `tools/mittaa-selaimessa.mjs`:ään, jotta tasaus ja
haku käyttävät varmasti samaa mittaria. Jos ne eriytyisivät, uudet
ehdokkaat valittaisiin eri asteikolla kuin millä vanhat on tasattu.

Mittari laskee nyt myös **sisäisen dynamiikan**: kuinka paljon kovimmat
kohdat nousevat yli hiljaisten. Otoksessa 1,6…18,7 dB. Tämä on eri asia
kuin äänitteiden välinen tasaus, ja se vastaa omistajan
kompressointikysymykseen — juuri iso sisäinen vaihtelu saa äänitteen
hyppäämään kertojan päälle, vaikka keskitaso olisi oikea.

### Kompressointi: mahdollista, mutta yksi este

Web Audiossa on `DynamicsCompressorNode`, ja se on oikea työkalu tähän.
Este on, että **nauhoitettu tausta soi `<audio>`-elementillä**, ei Web
Audion läpi — samasta syystä kerroin ei voi ylittää ykköstä. Kompressori
vaatisi reitityksen `MediaElementAudioSourceNode`in kautta.

Se on tehtävissä, mutta iOS:llä on riskinsä: kerran Web Audioon
reititetty elementti ei enää soi ilman toimivaa kontekstia, ja juuri
iPad on pelin pääalusta. Jos tehdään, tarvitaan varareitti: jos
reititys ei onnistu, palataan tavalliseen `<audio>`-soittoon.

Vaihtoehto ilman riskiä olisi kompressoida tiedostot peilausvaiheessa,
mutta se vaatisi mp3-enkooderin — Playwrightin ffmpeg on riisuttu eikä
osaa edes purkaa mp3:a.


## Paketti 38: taustaäänet tasattua mittaamalla — VALMIS v161 2.8.2026

Omistajan kaksi havaintoa samasta aiheesta.

### 1. Väistö oli vajaa

**Omistaja:** "Kuuntele kieltä kohdassa muut äänet voisi vaimentaa
taustalta."

`vaimennaTausta()` vaimensi vain **nauhoitetun** taustan
(`js/ambience-stream.js`). Pelin oma **syntetisoitu** äänimaisema
(`js/sound.js` AMBIENCES) jäi soimaan täydellä voimalla näytteen ja
kertojan päälle. Sitä ei ollut kytketty väistöön lainkaan.

Nyt `sfx.vaimennaAmbienssi(kerroin)` väistää senkin. Kerroin **jää
talteen** `this.ambienssiVaisto`-kenttään, koska maisema voi vaihtua
väistön aikana: ilman sitä `setAmbience` nostaisi uuden maiseman täyteen
voimaan keskellä puhetta. Tietovisan musiikki väistyy samoin.

### 2. Tasaus mitattiin, ei arvattu

**Omistaja:** "Osaisitko itse säätää tausta-äänien tasot keskenään
tasaisemmiksi? Toiset ovat aika hiljaisia ja toiset häiritsevät liikaa
puhetta."

Kyllä — tämä on mitattavissa. Kertoimet oli asetettu korvakuulolta yksi
kerrallaan, eikä korva muista edellistä äänitettä.

**Mitattu hajonta oli 49,8 dB** eli noin 300-kertainen ero hiljaisimman
ja kovimman äänitteen välillä. Havainto selittyy sillä täysin.

`tools/mittaa-aanet.mjs` purkaa jokaisen äänitteen **Chromiumissa**
`decodeAudioDatalla`. Se on sama polku, jolla peli äänen soittaa, joten
mitattu luku vastaa kuultua. (Playwrightin ffmpeg on riisuttu build,
jossa ei ole mp3-dekooderia eikä loudness-suodattimia lainkaan.)

**K-painotus, ei pelkkä RMS.** Korva ei kuule bassoa yhtä voimakkaana
kuin keskiääniä. Taustaäänissä on sekä matalaa jyminää (meri, tuuli,
juna) että kirkasta hälyä (tori, linnut, basaari). Pelkkä RMS antaisi
merelle ja tuulelle liian ison lukeman ja ne jäisivät pelissä liian
hiljaisiksi — **juuri se vika, jota korjataan.** Siksi BS.1770:n tapaan:
ylähyllykorotus 1500 Hz, ylipäästö 38 Hz, sitten portitettu tehollisarvo
400 ms:n lohkoissa.

| | |
|---|---|
| äänitteitä | 124 (183 kohtaa tiedostossa) |
| hajonta ennen | 49,8 dB |
| hajonta jälkeen | 17,8 dB |
| tavoite | -30 LUFS |

**Ylärajan sanelee soitinketju, ei maku.** Tausta soi tasolla
`VOIMA (0.14) * voima`, ja HTML-soittimen `volume` ei voi ylittää
ykköstä. Yli 7,1:n kerroin siis vain leikkautuisi, jolloin tasaus
valehtelisi: kaksi eri kerrointa soisi samalla tasolla. Katoksi 6.

**Seitsemän äänitettä (-47…-63 LUFS) ei yllä tavoitteeseen
ylärajallakaan.** Ne on parempi **vaihtaa kuin vahvistaa**: niiden oma
kohina nousisi kuuluviin ennen sisältöä. Lista on
`tools/aanitasot.json`:ssa, ja ne kannattaa korvata kun ehtii.

### Ansat, jotka kannattaa muistaa

- **Playwrightin ffmpeg on riisuttu:** ei mp3-dekooderia, ei
  `ebur128`/`loudnorm`/`volumedetect`. Vain 24 suodatinta. Siksi selain.
- **Ämpärin CORS sallii vain pelin oman osoitteen,** joten mittaussivu ei
  saa haettua tiedostoa. Tavut haetaan Nodessa (jota CORS ei koske) ja
  välitetään selaimeen base64:nä.
- **`page.evaluate` ei välitä argumenttia,** jos funktio annetaan
  merkkijonona — se vain evaluoi lausekkeen. Funktio pitää antaa
  funktiona.
- **Testi `sound.test.mjs` vaati osoitteen päättyvän `.mp3`:een.**
  Kaupunkiäänitykset saivat nyt säätöjä perään, joten ehto laajennettiin
  sallimaan `#alku=`/`#voima=` — ja tarkistamaan että säädöt ovat
  tunnettuja.


## Paketti 37: vanha maailma yhdeksi kartaksi — VAIHE 1 VALMIS 2.8.2026

**Omistajan päätös:** "Kokeillaan ensin vaihtoehto b kartoissa" eli
Eurooppa, Afrikka, Lähi-itä ja Aasia yhdeksi saumattomaksi kartaksi.

**Tässä vaiheessa ei muuteta peliä lainkaan** — ei versionostoa. Tämä on
työkalu ja todiste siitä, että yhdistäminen onnistuu.

**Miksi tarvitaan uusi projektio.** Jokainen lauta on litistetty pallolta
omalla tavallaan: Eurooppa, Afrikka ja Lähi-itä yksinkertaisella lieriöllä
kukin omalla mittakaavallaan, Aasia Lambertin kartiolla keskimeridiaanina
105°E. Kahta eri tavalla litistettyä karttaa ei voi asettaa vierekkäin —
rannikot eivät kohtaa saumassa vaan menevät ristiin.

**Miller valittiin.** Alue ulottuu Kapkaupungista (-34°) Tromssaan (+70°)
ja Lissabonista Beringinsalmelle. Kartio ei kata kumpaakin
pallonpuoliskoa, joten valinta oli lieriöiden väliltä:

| projektio | ongelma |
|---|---|
| plate carrée | venyttää pohjoisen leveäksi, Skandinavia levähtää |
| Mercator | aikakauden oma (1873!), mutta 78°:ssa pystymittakaava lähes 5× — Lappi paisuisi mahdottomaksi |
| **Miller** | kesytetty Mercator: muodot järkeviä ~70°:een, napa ei karkaa |

Miller on ainoa, jolla sekä Kapkaupunki että Tromssa näyttävät itseltään
samalla kartalla.

**Koordinaatteja ei tarvinnut arvata.** Nykyisten lautojen x/y on
käännettävissä takaisin: kaavat ovat pakettitiedostojen alkukommenteissa.
Aasialla on lisäksi alkuperäinen lon/lat-aineisto
`tools/mapdata/asia.json`:ssa, joten sitä ei käännetä lainkaan.

**Rannikot piirretään uudestaan Natural Earthista** (10m, public domain).
Omistaja arvasi tarpeen oikein: Afrikassa oli 93 pistettä koko
mantereelle ja Lähi-idässä 129, kun Euroopassa on 1340. Uudessa kartassa
on 3743 pistettä 33 rannikolla — Ramer–Douglas–Peucker karsii 443 000
pisteestä niin, että niemet ja lahdet säilyvät.

**Tulos.** 4000 × 2620 yksikön lauta, 143 kaupunkia. Päällekkäisiä
porttikaupunkeja löytyi kolme — **Istanbul, Kairo ja Teheran** — ja ne
ovat yhdistetyllä kartalla yksi kappale kukin. Esikatselukuvassa jokainen
kaupunki osuu oikealle paikalleen ja mantereet liittyvät saumatta.

**Mitä on vielä tekemättä** (arvio Paketti 32:n analyysistä):

1. Reitit: 222 reittiä neljältä laudalta, ja rajat ylittävät reitit
   pitää päättää (nyt niitä ei ole — laudat liittyivät porttikaupungeista)
2. Nimien paikat: 143 kaupunkia, jokaisen nimen paikka katsottava
   silmällä uudessa mittakaavassa — tämä on työn suurin yksittäinen erä
3. Päällekkäisten kaupunkien sisällöt yhdistettävä (kysymykset, kuvat)
4. Pelilogiikka: aarrejahdit, passin leimat, tallennus
5. Suorituskyky iPadilla — kartta on nyt neljä kertaa isompi


## Paketti 36: zoomipainikkeet kartalle — VALMIS v160 2.8.2026

**Omistajan toive:** "Siihen voisi tehdä universaalit zoomipainikkeet
kartalle kaikille alustoille."

**Mikä oli vialla.** Lähikuvaan pääsi vain automaattisesti, vain
Euroopassa ja vain alle 700 pikselin ruudulla. Tietokoneella karttaa ei
voinut lähentää lainkaan, eikä tasoa voinut säätää millään laitteella —
`MANNER_ZOOM` oli kiinteä vakio 2.3.

**Ratkaisu: portaikko vakion tilalle.**

    const ZOOMI_TASOT = [1, 1.5, MANNER_ZOOM, 3.4, 5];

Ensimmäinen porras on kokonäkymä: siihen loitonnettaessa lähikuvasta
poistutaan kokonaan. `MANNER_ZOOM` on portaissa mukana, jotta
automaattinen saapumiszoom osuu portaalle ja painikkeet jatkavat siitä
eivätkä hyppää ensin johonkin väliin. Portaat eivät ole tasavälein:
alapäässä ero on pieni, ettei yleiskuvan ja ensimmäisen lähikuvan
välillä hypätä liikaa, yläpäässä suurempi, koska lähellä pieni muutos ei
enää tunnu miltään.

**Tärkein yksityiskohta: keskipiste pysyy paikallaan.** Ilman sitä kartta
karkaisi käsistä joka painalluksella, koska `sovitaMannerZoom` keskittää
lähikuvan `zoomKohde`-pisteeseen. `nykyinenKeskipiste()` laskee
käänteisluvulla, mikä kartan piste on juuri nyt paneelin keskellä, ja se
luetaan **ennen** tason vaihtoa vanhalla mittakaavalla. Mitattu: keskipiste
pysyi 483,515–516:ssa kaikkien portaiden läpi molempiin suuntiin.

Kokonäkymästä lähennettäessä ei ole aiempaa keskipistettä, joten
kohdistetaan pelaajan nappulaan — siellä peli on menossa, ei laudan
geometrisessa keskipisteessä.

**Miksi painikkeet toimivat kaikkialla.** `mannerZoomTarpeen()` rajaa vain
AUTOMAATTISEN zoomauksen; `fitViewBox` katsoo pelkkää `this.mannerZoom`
-lippua. Painike asettaa lipun suoraan, joten lähikuva aukeaa millä
tahansa laudalla ja millä tahansa ruudulla. Testi vartioi, ettei
painikefunktio ala kysyä automaattizoomin ehtoja.

**Paikka.** Kartan oikea reuna pystyssä, keskikorkeudella. Alalaita on
matkustusnappien käytössä ja pidetty tarkoituksella väljänä (omistajan
aiemmat toiveet), ylälaidassa on matkakirjan kortti. Napit ovat
pergamentin väreissä kuten kartan muutkin merkinnät. Päässä oleva nappi
himmenee mutta ei katoa — katoava nappi saisi sormen etsimään sitä.

**Todennettu selaimessa** molemmilla ruutukoilla (402×874 ja 1280×800):
portaat ylös ja alas, paluu tarkalleen lähtökokoon, painikkeiden päät
oikein. Tietokoneella zoomia ei ollut ennen lainkaan.

**Katselutila korjautui samalla.** Ehto oli aluksi pelkkä
`phase === 'pickstart'`, mikä olisi piilottanut napit myös `?lauta=`
-katselutilassa. Nyt ehto on sama kuin `fitViewBox`illa
(`avausNakymassa()`), eli katselu näyttää laudan kuin pelissä.


## Paketti 35: meri katoaa kartalta — SYY LÖYTYI, KORJATTU v159 2.8.2026

**v158:n arvaus oli väärä.** Omistaja: "Meri katoaa heti kun käyn toisessa
apissa ja palaan takaisin" — eli vika toistuu joka kerta, ja v158:n herätys
ei auttanut lainkaan.

**Kuvakaappaus ratkaisi asian.** Kuvassa oli tallella ruudukko, reitit,
kaupungit, nimet, koristeet ja maan korostus. Puuttui maa, rannikko, meren
kaiut ja aallot — **täsmälleen ne kerrokset, joilla oli suodatin.**

| kerros | suodatin | kuvassa |
|---|---|---|
| `landmass` | `#rough` | poissa |
| `waves` | `#rough-soft` | poissa |
| `terrain` | `#rough-soft` | poissa |
| `routes` | `#rough-soft` | **näkyy** |
| ruudukko, kaupungit, koristeet | — | näkyy |

**Miksi reitit selvisivät.** Suodatin tarvitsee oman piirtopuskurin, jonka
koko seuraa kerroksen rajauslaatikkoa ja zoomia. Mannerkerros on kartan
suurin — Euroopan rannikko jatkuu laudan reunojen yli — ja lähikuvassa sen
puskuri on moninkertainen. Reittikerros mahtuu kaupunkien väliin. iOS
vapauttaa taustalle jääneen sovelluksen puskurit eikä saa suurinta enää
varattua, joten se kerros palaa tyhjänä.

**Omistaja arvasi itse oikein:** "peli webapin puolella, veikkaan että
liittyy jotenkin siihen". Juuri webapp-tila on se, jossa iOS vapauttaa
puskurit aggressiivisimmin.

**Korjaus: heilunta piirretään, ei lasketa.** `kohina(x, y, siemen)` antaa
pehmeän pseudokohinan paikan mukaan, ja `kasinPiirretty` siirtää pisteitä
sen verran ennen pehmennystä. Arvot vastaavat vanhaa suodatinta: solu 58
yksikköä ≈ `baseFrequency 0.017`, amplitudi ±4 = `scale 8`. Kohina
lasketaan kerran piirrossa, joten puskuria ei tarvita eikä ole mitään mitä
menettää.

Sama käsittely sai rannikot, järvet, maiden rajat ja pallonpuoliskokartan
asteverkon. Kehäympyrät piirretään `wobblyCircle`illa, jotta 1600-luvun
kartasta ei tulisi harpilla vedettyä.

**Todennettu vertailukuvalla** (Chromium, 402×874, `reducedMotion:
no-preference`): rannikko heiluu käytännössä samalla tavalla kuin ennen.
Kartalla on nyt yksi suodatettu kerros neljän sijaan, eikä yhtään orpoa
viittausta.

**Ansa, johon jäätiin kiinni.** Poistin ensin myös `#rough-soft`
-määrittelyn, vaikka reittikerros `js/ui.js`:ssä viittasi siihen yhä.
SVG:ssä **puuttuvaan suodattimeen viittaava ryhmä ei piirry lainkaan** —
se olisi vienyt kaikki reitit kartalta. Määrittely jäi paikalleen, ja uusi
testi tarkistaa, että jokaiselle viittaukselle löytyy määrittely.

**Jos meri vielä katoaa,** seuraava askel on poistaa suodatin myös
reiteiltä. Silloin reittiviivat pitää pilkkoa ja heiluttaa samalla
kohinalla — päätepisteet paikallaan, jottei viiva irtoa kaupungista.


## Paketti 34: peilaus käynnistyy itsestään — VALMIS 2.8.2026

**Omistajan toive:** "Tee sinä peilaus aina automaattisesti."

Ei versionostoa: peliin ei tullut muutosta, vain ajoon.

**Kolme käynnistintä.**

1. **Push mainiin**, kun muutos koskee `js/packs/**`, `tools/peilaa-media.mjs`,
   `tools/leikkaa-mp3.mjs` tai ajoa itseään. Juuri silloin peiliin on voinut
   tulla uutta; tyyli-, dokumentti- ja pelilogiikkamuutokset eivät käynnistä
   mitään. Ajo itse on listalla tarkoituksella — niin sen muutokset tulevat
   kokeilluiksi heti eivätkä jää piiloon seuraavaan kertaan.
2. **Viikoittain** (su 04:15 UTC). Jos jokin lähde oli poikki peilaushetkellä,
   tiedosto jäi puuttumaan hiljaa; viikkoajo poimii sen kun lähde palaa.
   Vartin yli tasatunnin, koska tasatunnit ovat GitHubilla ruuhkaisimmat.
3. **Käsin**, jolloin voi yhä valita yhden lajin.

**Vanha varoitus kumottiin mittaamalla.** Tiedoston kommentti kielsi
pushista ajamisen, koska "ajo kestää kymmeniä minuutteja". Se pätee vain
ensimmäiseen ajoon. Kun ämpärissä on jo kaikki, ajo vertaa tilanteen ja
lopettaa: mitattu koko kierros **56 s**, josta noudon osuus 37 s. Pitkä ajo
tulee vain kun uutta aineistoa on oikeasti paljon — ja silloin sitä pitääkin
odottaa. Rinnakkaisuus ei ole vaara: `concurrency`-ryhmä pitää ajot jonossa
eikä vienti käytä `--deleteä`.

**Automatisointi paljasti piilevän vian.** Lajivalinta on olemassa vain
käsin käynnistettäessä. Pushista ja ajastuksesta `inputs.lajit` on tyhjä
merkkijono, ja askeleen vertailu

    if [ "$LAJIT" != "kaikki" ] && [ "$LAJIT" != "$laji" ]; then continue; fi

olisi silloin ohittanut **kaikki** lajit. Ajo olisi mennyt läpi vihreänä
peilaamatta mitään — pahin mahdollinen lopputulos, koska se näyttää siltä
että aineisto on kunnossa. Kaksi korjausta:

- oletus annetaan ajossa: `LAJIT: ${{ inputs.lajit || 'kaikki' }}`
- askel laskee montako lajia se ajoi ja **kaatuu jos luku on nolla**, jottei
  sama virhe voi enää mennä läpi hiljaa

Testattu neljä tapausta paikallisesti: `kaikki` → kolme lajia, `liput` →
yksi, `aanet` → yksi, tyhjä → virhe.


## Paketti 33: peilausajo kuntoon ennen media-repon poistoa — VALMIS 2.8.2026

Ei versionostoa: peliin ei tullut yhtään toiminnallista muutosta.
`dist/` rakennettiin silti uudelleen, koska `js/media.js`:n
alkukommentti muuttui.

**Salaisuudet eivät seuranneet työnkulun mukana.** Omistaja ilmoitti
lisänneensä R2-avaimet, joten ajoin `peilaa.yml`:n ensimmäistä kertaa
pelirepossa (`lajit: liput`, pienin mahdollinen todiste). Kaatui 16
sekunnissa:

    aws: [ERROR]: Invalid endpoint: https://.r2.cloudflarestorage.com

Osoitteen keskeltä puuttuu tilitunnus, eli `secrets.R2_ACCOUNT_ID` oli
tyhjä. Lokissa myös `AWS_ACCESS_KEY_ID` ja `AWS_SECRET_ACCESS_KEY`
olivat tyhjiä, kun samassa lohkossa `token: ***` — **GitHub peittää
olemassa olevan salaisuuden tähdillä, joten tyhjä tarkoittaa ettei sitä
ole olemassa**. Avaimet olivat media-repossa, jonka `r2-media.yml` oli
ajettu onnistuneesti samana aamuna (08:35). Salaisuudet ovat
repokohtaisia eivätkä siirry työnkulun mukana.

**Opetus, joka kannattaa muistaa.** Siirretty työnkulku ei ole valmis
ennen kuin se on ajettu kerran uudessa kodissaan. Tiedosto näyttää
oikealta molemmissa päissä, ja `total_count: 0` ajoja on helppo lukea
"ei ole vielä tarvinnut ajaa" eikä "ei ole koskaan toiminut".

**Ajo kertoo nyt itse mikä puuttuu.** Ensimmäinen askel tarkistaa
kaikki neljä nimeä, tulostaa vain onko ne asetettu (ei arvoja) ja
neuvoo mistä ne lisätään. Aiempi virhe vaati aws-clin osoitesyntaksin
tuntemista.

**Manifestitesti ajetaan vihdoin oikeasti.** `tests/media.test.mjs`
vertaa `js/media.js`:n polkusäännön koko peilin manifestiin, mutta
ohitti itsensä hiljaa jos manifestia ei ollut koneella — eli aina,
paitsi jos media-repo sattui olemaan levyllä vieressä. Repon poiston
jälkeen se ei olisi ajettu enää koskaan, ja eriytynyt nimeäminen olisi
paljastunut vasta pelaajalle puuttuvana kuvana.

- Manifesti etsitään ensisijaisesti kansiosta `media/`, johon
  peilausajo noutaa ämpärin sisällön. Vanhat sijainnit jäivät perään.
- Ajossa on askel, joka ajaa testin heti noudon jälkeen — ennen kuin
  mitään kirjoitetaan ämpäriin.
- Todennettu oikealla manifestilla (576 tiedostoa): 13/13 läpi,
  **0 ohitettua**. Koko sarja 333/333.

**Peilikansio siirtyi repon sisään.** `--ulos` oletti ennen
`../Matkakirja-media`; nyt `media/`, sama kansio jota ajo käyttää.
Repossa ei ollut lainkaan `.gitignore`-tiedostoa, joten se luotiin:
`media/` ja `lahteet/` (kummassakin satoja megatavuja tai satoja
wikiartikkeleita). `dist/` jätettiin tarkoituksella pois — yhden
tiedoston versio kuuluu repoon.

**Yhdistämismerkit siivottiin.** v158:n käsin selvitetystä
ristiriidasta jäi kumpaankin dokumenttiin `<<<<<<< HEAD`, `=======` ja
`>>>>>>> origin/main` tekstin sekaan. Sisältöä ei kadonnut.

**Ämpärin kunto tarkistettiin samalla.** Manifesti on 2.8.2026 ja
sisältää 320 kuvaa, 83 lippua, 173 ääntä ja 276 tekstiä. Yhdeksän
näytettä (alku, keskeltä, loppu kustakin lajista) vastasi
206-koodilla ja CORS-otsakkeella. **Aineisto on siis ämpärissä
tallessa riippumatta siitä, mitä media-repolle tehdään.**


## Paketti 32: kartan herätys ja muistien tyhjennys — VALMIS 2.8.2026

**Omistajan havainto:** "Välillä myös meri häviää kartalta" ja
"veikkaan että bugi tulee välimuistista, koska se tulee yleensä jos
avaan toisen ohjelman välissä tai Matkakirja päivittyy uuteen
versioon".

**Päättely.** Karttaa ei piirretä uudelleen kesken pelin — `drawBoard`
ajetaan vain laudan vaihtuessa. Kyse ei siis voi olla piirrosta vaan
siitä, että jo piirretty kerros lakkaa näkymästä. Meren tuntu syntyy
suodatetuista kerroksista (rannikon kaiut, aallot, maasto), ja iOS voi
palauttaa juuri ne tyhjinä vapautettuaan taustalle jääneen sovelluksen
piirtopuskurit.

**Korjausyritys.** `visibilitychange` ja `pageshow` herättävät kartan:
suodatinviite irrotetaan ja liitetään takaisin, mikä mitätöi selaimen
tallettaman tuloksen. Pelkkä uudelleenpiirron pyytäminen ei riitä,
koska selaimen mielestä mikään ei ole muuttunut.

**Tätä ei ole voitu todentaa.** Vikaa ei saa toistettua täältä, joten
tiedossa on vain että herätys ajetaan oikeaan aikaan, ei kaada mitään
eikä muuta kerrosten määrää. Jos meri katoaa vielä, seuraava askel on
luopua suodattimista kartan isoimmissa kerroksissa — ne ovat kalliita
muutenkin.

**Uusi peli tyhjentää kaikki muistit** (omistajan toive): talletukset,
välimuistit ja palvelutyöntekijän, ja hakee sivun uutena.

- **Varmistus on pakollinen.** Passin leimat ja laukun tavarat ovat
  pelin ainoa pysyvä kertymä, eikä niitä saa takaisin.
- **Avaimet poistetaan etuliitteellä** (`matkakirja`, `afrikan-tahti`)
  eikä `localStorage.clear()`:llä, joka veisi muidenkin sovellusten
  tiedot samasta selaimesta.
- **Voittoikkunan Uusi peli aloittaa kuten ennen** eikä tyhjennä
  mitään: siinä kohtaa pelaaja on juuri ansainnut kertymänsä.


## Paketti 31: kiikari ilmestyi kesken pelin — KORJATTU 2.8.2026

**Omistajan havainto:** "Valitsin laivamatkan Ateenassa ja peli zoomasi
uudelleen jonka jälkeen tuli kiikaritehoste."

**Syy.** `asennaPanorointi`in kartta-napautuksen kuuntelija kutsui
`zoomaaAloituskartta()`:a millä tahansa laudalla. Se lisää bodyyn
`aloitus-zoom`-luokan, ja luokan perään syttyy kiikari — joka on
tarkoitettu vain etusivulle.

Euroopassa `fitViewBox` palaa mannerzoomin haarasta eikä ehdi nollata
`aloitusZoom`-lippua, joten luokka jäi päälle ja kiikari syttyi noin
neljä sekuntia myöhemmin. **Afrikassa vika ei näkynyt**, koska siellä
`fitViewBox` kulkee nollaavan haaran läpi ja lippu putoaa heti — siksi
tämä oli piilossa näin pitkään.

Ehto on nyt `this.game.pack.id !== 'maailma'`: napautuszoomaus kuuluu
vain maailmankartalle, jolla ei ole omaa lähikuvaa.

**Sivuvaikutus, joka korjautui samalla.** Kuuntelija on
kaappausvaiheessa ja pysäyttää tapahtuman, joten se söi mantereella
kartan kohderenkaiden napautukset.

**Testausopetus, joka kannattaa muistaa.** `?lauta=xxx` avaa
katselutilan, jossa `zoomTarpeen()` ja `mannerZoomTarpeen()` palauttavat
aina false. Kaikki aiemmat Playwright-ajoni olivat siinä tilassa
eivätkä olisi voineet paljastaa tätä. Toisto vaati `ui.katselu = false`
ja `ui.reducedMotion = false` — headless-selain ilmoittaa myös
liikkeenvähennyksen päälle, mikä sammuttaa saman polun.

Toistettu ennen korjausta: napautus → `aloitus-zoom` heti, `kiikari-paalla`
4 sekunnin kohdalla, kiikari `visible`. Korjauksen jälkeen kumpikaan ei
syty kahdeksassa sekunnissa.


## Paketti 30: vinjetti pois lähikuvasta — VALMIS 2.8.2026

**Omistajan toive:** "Zoomatussa mannernäkymässä vaalean vinjetin voi
jättää joka sivulta pois."

Kokonäkymässä häivytys rajaa laudan kuin vanhan filmin ruudun. Mantereen
lähikuvassa kartta jatkuu joka suuntaan panoroitavaksi, joten vaalea
reuna ei rajaa mitään — se vain haalistaa sitä osaa karttaa, jota
ollaan katsomassa.

`body.manner-zoom .map-pane::after` liitettiin samaan `opacity: 0`
-sääntöön kuin zoomausliuku ja kiikari, joten häivytys palaa itsestään
kokonäkymään eikä sitä tarvitse erikseen sytyttää.

Mitattu lähikuvassa: vasen reuna 203 → 180, oikea 202 → 178, keskusta
muuttumaton (177). Ylä- ja alakaista muuttuvat vain vähän, koska
niissä ovat päiväkirjakortin taustavalo ja nappien omat levyt — ne
kuuluvatkin näkyä.


## Paketti 29: kehittäjätila nurkkaan, matkakirja matalammaksi — VALMIS 2.8.2026

**Omistajan toiveet:** "Kirjoita kehittäjätila ennemmin versionumeron
perään. Pelkkä `: kehittäjä`" ja "Madalla Matkakirja-ikkunaa".

**Kehittäjätila nurkkaan.** Tilasta kertoi oma merkki kartan
yläreunassa. Se oli liian iso ele pienelle asetukselle: nurkan
versionumero on jo se paikka, josta pelin tila luetaan. Nyt siinä
lukee `v155 : kehittäjä`, ja merkki tyyleineen on poistettu.

Nurkan teksti päivittyy `paivitaVersioKulma()`:lla käynnistyksessä ja
kytkimen molemmissa haaroissa. **Jotain merkkiä tarvitaan silti** —
ilman sitä tila unohtuisi päälle, ja peli tuntuisi rikkinäiseltä kun
laattojen napautus vie minne tahansa. Testi vartioi, ettei merkintä
katoa kokonaan.

**Matkakirjan ikkuna matalammaksi.** Viisi riviä vei kartalta liian
ison palan puhelimella. Näkyviä rivejä on nyt kolme ja kortin katto
30 → 22 dvh. Kortti 126 → 86 pikseliä kiinni; auki levitettynä 221
pikseliä ja koko merkintä näkyvissä kuten ennen.

Rivikatto on em-mittana (`calc(3 * 1.35em)`), joten se seuraa
fonttikokoa eikä hajoa, jos fontti joskus muuttuu.


## Paketti 28: alalaidan haalistuma — oikea syy löytyi — VALMIS 2.8.2026

**Omistaja jouduttiin korjaamaan kahdesti:** "Korjaatkohan nyt väärää
asiaa. Tarkoitan tuota kuvassa näkyvää alalaitaa nappien takana."

Etsin haalistumaa kartan vinjetistä (`.map-pane::after`) ja korjasin
sen — mutta syy oli toisaalla:

    body.manner-zoom .turn-card::before

Lähikuvassa korttien alle piirretään pehmeä pergamenttivalo, jotta
teksti erottuu kartalta. Nappien kohdalla se haalisti kartan
alalaidan, jossa on eniten katsottavaa. Valo on nyt poistettu
nappien alta. Napeilla on oma pergamenttilevynsä ja
"Valitse matkustustapa" -rivillä sama vaalea tekstivarjo kuin kartan
omissa nimissä, joten kumpikin pysyy luettavana.

**Päiväkirjakortti pitää omansa.** Siinä on pitkä leipäteksti, joka ei
olisi luettavaa pelkän varjon turvin.

Mitattu lähikuvassa: alakaistat 187 → 175 ja 222 → 187, eli kartan
oman sävyn (176–180) tasolle.

**Miksi en nähnyt sitä itse.** Omat renderöintini eivät olleet
lähikuvassa, joten valoa ei ollut piirretty lainkaan — omistaja
pelaa aina lähikuvassa, koska mantereelle saapuminen zoomaa kartan.
Näin vian vasta pakotettuani `zoomaaMantereelle()`:n päälle.

**Opetus:** kun omistaja sanoo ettei korjaus purrut, tarkista ensin
että testiympäristö on samassa tilassa kuin hänen — älä sitä, onko
korjaus teknisesti oikea. Paketin 27 vinjettikorjaus oli oikea mutta
väärään asiaan.


## Paketti 27: vinjetti pois alalaidasta, fontti takaisin — VALMIS 2.8.2026

**Omistajan toiveet:** "Poista vinjetti alareunasta" ja "Pienennä
matkakirjan fontti takaisin".

**Vinjetti.** Kartan päällä on vaalea vinjetti (`.map-pane::after`),
joka haalistaa reunat kuin vanhassa filmiruudussa. Alalaidassa se ei
näyttänyt filmiltä vaan haalistumalta: siellä on eniten kaupunkeja ja
nimiä, ja kelluvat napit istuvat juuri sen päällä.

**Ensimmäinen yritys epäonnistui, ja se kannattaa muistaa.** Soikea
vinjetti jätettiin paikalleen ja peitettiin alhaalta `mask-image`illa.
Chromiumissa tulos oli oikea ja mittasin sen — mutta iPhonella
alalaita jäi silti vaaleaksi. Vinjetti rakennetaan nyt **kolmesta
reunaliu'usta** (ylä, vasen, oikea): alalaitaan ei piirretä mitään
eikä maskia tarvita, joten tulos on sama joka selaimessa. Kulmat
saavat kahden liu'un summan ja pysyvät tummimpina kuten ennen.

Opetus: älä korjaa piirtoa maskilla, jos saman voi tehdä itse
piirrolla. Maskituki vaihtelee selaimittain, eikä Chromium paljasta
sitä.

Mitattu kartan pinnasta: alakaista 176 → 169, kun keskusta on 171 —
alalaita on siis nyt keskustan tasolla. Yläkaista 198 → 210, eli
filmimäisyys säilyi.

**Fontti takaisin.** Paketissa 23 päiväkirjan teksti suurennettiin
(0,78 → 0,98 rem puhelimella). Omistaja palautti sen: isolla fontilla
kortti peitti kartasta liian ison kaistan. Koot ovat taas 0,78 rem
puhelimella, 0,84 kapealla ruudulla ja 0,9 muualla. Merkintäkortti
155 → 126 pikseliä kiinni, ja koko merkinnän saa yhä auki
napauttamalla — se on nyt se tapa lukea pitkä teksti, ei iso fontti.

**Älä siis suurenna sitä uudestaan** ilman että omistaja pyytää.
Paketin 23 testi vaati fontilta vähintään 0,95 remiä; se on korvattu
vinjettitestillä.


## Paketti 26: alalaidan kaistan arvoitus ja napit — VALMIS 2.8.2026

**Omistajan toive:** "Siellä napit alemmas ja pienennä niitä ainakin
vaakasuunnassa."

**Ensin arvoitus ratkesi.** Kehittäjätilan mittarivi asennetusta
sovelluksesta:

    ruutu   402 × 812     ← tämän selain saa käyttöönsä
    näyttö  402 × 874     ← tämän kokoinen puhelimen ruutu on
    turva   ylä 62px  ala 34px
    app     0 → 812
    stage   119 → 812
    kartta  126 → 805

Selaimen näkymä on **812 pistettä 874:n ruudulla**. Alimmat 62 pistettä
eivät kuulu sovellukselle lainkaan, eikä niihin yllä mikään css. Kartta
päättyy 805:een eli 7 pisteen päähän sovelluksen alarajasta — paketti 23
teki jo kaiken minkä pystyi. **Älä siis yritä venyttää karttaa
alemmas.** Ainoa tapa saada lisää tilaa olisi saada iOS antamaan koko
874, ja se on asennuksen eikä koodin asia.

**Sivutuote: `env(safe-area-inset-bottom)` on väärä mitta kelluville
korteille.** Se raportoi 34 pikseliä alueesta, joka ei ole näkymässä
lainkaan, joten varaus laski saman tilan kahdesti ja söi napeilta 27
pistettä. `.rail`, `#versio-kulma` ja `.palaute-kulma` käyttävät nyt
kiinteää rakoa. Jos jollain laitteella kotipalkki ylettyy näkymän
päälle, se on ohut läpikuultava viiva ja napit jäävät sen yläpuolelle.

**Napit kapeammiksi.** Matkustustavan napit ovat puhelimella pelkkiä
kuvakkeita, mutta venyivät silti ruudun levyisiksi. Omistaja pienensi
niitä kahdesti: nyt **58 × 40 pikseliä** ja keskellä. Korkeus on alle
Applen 44 pisteen suosituksen, mutta napit ovat erillään toisistaan
eikä vieressä ole muuta napautettavaa, joten ohi osuminen ei tee
vahinkoa.
Rajaus koskee vain yhden rivin matkustusvalintaa
(`[data-rivi='yksi']`) — tekstinapit kuten "Astu mantereelle"
tarvitsevat tilansa.

**Yksi testi käännettiin päinvastaiseksi.** Paketin 23 testi vaati
`.rail`-säännöltä turva-aluetta. Se oli oletus, jonka mittaus kumosi.


## Paketti 25: kehittäjätila — VALMIS 2.8.2026

**Omistajan toive:** "Tee hampurilaiseen kehittäjä toggle, salasana
5545, minkä avulla voi siirtyä mihin tahansa kaupunkiin pelkästään
painamalla kaupungin laattaa."

Valikosta aukeaa salasanaikkuna. Kytkettynä jokainen kaupunki on
napautettava, ja napautus vie sinne suoraan. Kartan yläreunassa on
merkki "Kehittäjätila", ettei tila unohdu päälle — muuten peli
tuntuisi rikkinäiseltä.

**Oikotie ei kuluta peliä.** `game.actionKehittajaSiirto` ei ota rahaa,
ei kuluta päivää, ei heitä noppaa eikä vaihda vuoroa, ja se jättää
voittotarkistuksen väliin — tähtikaupunkiin hyppääminen ei saa lopettaa
peliä kesken tarkastelun. `visitCity` kutsutaan silti, koska juuri se
tuottaa saapumisen havainnon päiväkirjaan; ilman sitä kortti näyttäisi
edellisen kaupungin tekstiä.

**Pelin alussa ensimmäinen napautus menee tavallista tietä**
(`actionPickStart`), koska lähtöpaikan valinta avaa portin mantereelle.
Vasta sen jälkeen hypätään.

**Salasana on koodissa selkokielisenä tarkoituksella.** Se on kevyt
lukko eikä tietoturvaa: tehtävä on estää tilan avautuminen vahingossa
lapsen kädessä, ei suojata mitään salaista.

**Kohderenkaita ei piirretä.** Ensimmäisessä versiossa jokainen
kaupunki sai violetin renkaan. 41 rengasta kerralla peitti kartan,
joten omistaja otti ne pois: napautusalue on näkymätön ja yläreunan
merkki kertoo tilan olevan päällä.

**Ikkunassa on myös ruudun mitat.** Ne ovat siellä syystä: asennetussa
sovelluksessa kartan alle jäi selittämätön kaista (ratkaistu, ks. paketti 26),
eikä iOS:n turva-alueita voi mitata muualta kuin laitteelta itseltään.
CSS kirjoittaa `env()`-arvot `:root`-muuttujiin `--turva-yla` ja
`--turva-ala`, joista JavaScript ne lukee.

Tila säilyy selaimessa omassa avaimessaan (`matkakirja-kehittaja`) eikä
kuulu pelin tallennukseen: se on laitteen asetus, ei pelitilanteen osa.


## Paketti 24: koko peili omaan ämpäriin (R2) — VALMIS 2.8.2026

**Miksi:** kuvat ja äänet olivat GitHub Pagesissa, jonka suositusraja on
1 Gt sivustoa kohti. Pelkkä Euroopan äänipuoli vei 569 Mt. Omistaja
valitsi Cloudflare R2:n, ja päätti sitten siirtää kaiken, jotta
media-repo voidaan poistaa kokonaan.

**Miten se toimii nyt.** Ämpäri on varasto, ei kopio: peli hakee sieltä
kuvat, liput ja äänet (`js/media.js` `PEILI_JUURI` ja `AANI_JUURI`
osoittavat samaan juureen). Alkuperäinen lähde — Commons, archive.org,
Freesound — jää yhä varareitiksi.

`.github/workflows/peilaa.yml` tässä repossa hoitaa peilauksen:
noutaa ämpäristä nykyisen aineiston, ajaa `tools/peilaa-media.mjs`
lajeittain ja vie tuloksen takaisin. Peilattua aineistoa ei säilytetä
missään repossa. Ajo tehdään käsin Actions-välilehdeltä, koska se
kestää kymmeniä minuutteja: jokaisen tiedoston eheys tarkistetaan
lähdettä vasten.

Avaimet ovat tämän repon Actions-salaisuuksina (`R2_ACCOUNT_ID`,
`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`). Ne eivät ole
missään tiedostossa.

**Kolme asiaa, joita ei kannata purkaa:**

- `AWS_REQUEST_CHECKSUM_CALCULATION=when_required`. R2 ei hyväksy AWS:n
  uudempia tarkistussummaotsakkeita, jotka aws-cli 2.23:sta alkaen
  lähtevät oletuksena mukaan. Ilman tätä jokainen lähetys epäonnistuu.
- `--delete` on pois. Vanha tiedosto ämpärissä ei haittaa ketään, mutta
  vahingossa tyhjentynyt ämpäri rikkoisi pelin kaikilta kerralla.
- CORS-tarkistus tehdään **GET**-pyynnöllä. R2 vertaa pyynnön metodia
  säännön `AllowedMethods`-listaan, ja koska siinä on vain GET,
  HEAD-pyyntöön ei tule otsaketta lainkaan. Ensimmäisellä kerralla
  tarkistin CORSin `curl -I`:llä ja päättelin siitä virheellisesti,
  ettei sääntöä ole — se oli koko ajan kunnossa.

**CORSia tarvitaan kahteen kohtaan.** `js/sound.js` `loadRealSamples`
hakee tehosteet `fetch`illä ja purkaa ne `decodeAudioData`lla, ja
`sw.js` noutaa kuvat omaan pitkäikäiseen koriinsa `mode: 'cors'`
-pyynnöllä. Tavallinen `<audio>`- ja `<img>`-lataus ei sitä tarvitse,
joten muualta avattuna peli toimii silti — nuo kaksi kohtaa putoavat
alkuperäiseen lähteeseen.

**Peilaustyökalun oletushakemisto** osoittaa yhä repon viereiseen
`Matkakirja-media`-kansioon. Se on tarkoituksella: paikallinen ajo on
kätevä, ja työnkulku vie kansion sisällön ämpäriin. Kansion ei tarvitse
olla git-repo.

**Tiedossa oleva rajoite: `pub-….r2.dev` on kehitysosoite.**
Cloudflaren dokumentaatio sanoo sen olevan nopeusrajoitettu ja
tarkoitettu kehityskäyttöön; välimuisti, palomuurisäännöt ja
pääsynhallinta ovat käytettävissä vasta oman verkkotunnuksen takana.
Nyt koko peliaineisto kulkee sen kautta, joten jos kuvat tai äänet
alkavat takkuilla, syy on todennäköisesti tässä. Korjaus on oma
verkkotunnus ämpärin eteen — silloin muuttuu vain `R2_JUURI`.


## Paketti 23: päiväkirja aukeaa napauttamalla — VALMIS 2.8.2026

**Omistajan toive:** "Skrollauksen sijaan Matkakirja voisi laajentua
alaspäin klikatessa ja pienenisi takaisin karttaa klikattaessa."

Päiväkirjamerkintä oli kartan nurkalla viiden rivin ikkunassa, ja loput
piti vierittää sormella pienen tekstin sisällä. Nyt merkinnän napautus
kasvattaa kortin niin, että koko teksti näkyy kerralla, ja kartan
napautus palauttaa sen pieneksi.

**Kolme yksityiskohtaa, joita ei kannata purkaa:**

- **Katto 74 % ruudun korkeudesta.** Ilman sitä pitkä merkintä peittäisi
  koko kartan, eikä pelaaja näkisi mihin napauttaa kutistaakseen sen.
  Jos merkintä ei mahdu siihenkään, teksti vierii kuten ennen — vieritys
  ei siis kadonnut, se vain ei ole enää ainoa keino.
- **Uusi merkintä alkaa aina pienestä ikkunasta** (`uusiFactKey`).
  Muuten yhden merkinnän avaaminen olisi jäänyt päälle ja seuraava
  kaupunki olisi peittänyt kartan itsestään.
- **Kutistuessa teksti palaa alkuun.** Jos auki levitettyä merkintää oli
  vieritetty, kutistuminen jättäisi muuten näkyviin keskeltä alkavan
  katkelman.

Kortti kasvaa siitä reunasta, johon se on kiinnitetty: ylänurkassa
alaspäin, alanurkassa ylöspäin. Nurkan valitsee `placeFactCard`
merenpinnan mukaan, ja se suosii jo valmiiksi ylänurkkia.

Kortin omat napit (kuuntele, valokuva, kuva) hoitavat oman
napautuksensa eivätkä avaa korttia.


## Paketti 22: musiikki soimaan napista — VALMIS 2.8.2026

**Omistajan huomio:** "Tutki sivuilla on musiikki osiossa linkki aina
jollekin sivulle. Sen tilalla saisi olla linkki ääninäytteeseen
suoraan, eli musiikki pitäisi lähteä soimaan suoraan kun sitä painaa.
Tämä siis eri kuin apple music."

Vanha `musiikkiVapaa`-kenttä osoitti kansallisen yleisradion etusivulle
(ERT, BBC, HRT). Sivulle päätyminen ei ole musiikin kuulemista. Kentät
on poistettu, ja tilalla on `musiikkiNayte`: suora mp3, joka soi
napista samalla soittimella kuin muutkin näytteet. Apple Music -linkki
säilyy sen vieressä ennallaan.

**Näytteitä 20 kortissa.** Kreeta, Lontoo, Edinburgh, Dublin,
Lissabon, Madrid, Barcelona, Amsterdam, Wien, Praha, Varsova, Kiova,
Odessa, Moskova, Pietari, Tallinna, Vilna, Istanbul, Helsinki ja Oslo.

**Ilman nappia jäävät** Ateena, Dubrovnik, Sofia, Pariisi, Berliini,
Alpit, Budapest, Bukarest, Riika, Tukholma, Kööpenhamina, Lappi ja
Tromssa. Syy on melkein aina sama: vapaasti lisensoitua äänitystä ei
ole, tai ainoa osuma on ND-lisenssillä (ei muokkausta), joka ei sovi
peiliin leikattavaksi. Tukholman ABBAlle, Tromssan Röyksoppille ja
Pietarin Šostakovitšin 7. sinfonialle ei tällaista löydy lainkaan —
Pietari sai näytteeksi saman säveltäjän 5. sinfonian, ja napin selite
kertoo sen.

**Kaksi rajausta lähteissä, älä poista niitä:**

- Vain **mp3**. Commonsin äänitiedostot ovat useimmiten ogg tai flac,
  joita Safari ei soita — ja peliä pelataan iPadilla, joten ogg-näyte
  olisi juuri siellä hiljainen.
- archive.orgista vain kohteet, joilla on `licenseurl`. Great 78
  Project (`collection:georgeblood`) osuu hakusanoihin ylivoimaisesti
  parhaiten ja sisältää juuri näitä levytyksiä, mutta sen kohteissa ei
  ole lisenssitietoa lainkaan. Peli kopioi äänet omaan peiliinsä,
  joten tuntematon lisenssi ei kelpaa.

Commonsista tulevia näytteitä ei peilata (peilaustyökalu poimii vain
freesound- ja archive.org-osoitteet). Se on tarkoituksellista: Commons
on pysyvä lähde, ja näin peili ei kasva turhaan.

**Rehellisyyden vuoksi:** valinta on tehty äänitysten kuvausten ja
tekijätietojen perusteella, ei kuuntelemalla. Ehdokaslistat saa
uudestaan komennolla `node tools/hae-musiikkinaytteet.mjs`.


## Paketti 21: Kuuntele kieltä -nappi — VALMIS 2.8.2026

**Omistajan toive:** "Puheääntä voisi tosiaan lisätä oman napin taakse
tutki sivuille."

Saapumiskortilla on jo rivi "hyvää päivää" maan kielillä. Nyt rivin
perässä on nappi, joka soittaa siitä kaupungista tehdyn äänityksen,
jossa ihmiset puhuvat: teksti kertoo mitä sanotaan, näyte miltä se
kuulostaa oikeassa kadunkulmassa.

**Miksi oma nappi eikä taustaääni.** Taustaääni soi silmukassa
minuutteja. Selvä puhe alkaa toistuessaan kiinnittää huomion — pelaaja
tunnistaa samat lauseet ja tausta muuttuu häiriöksi. Siksi taustaan
haetaan edelleen puheetonta maisemaa, ja kieli soi kerran
painalluksesta.

**Miten näytteet haettiin.** Sama työkalu kuin paketissa 20, uudella
`--puhe`-kytkimellä: se etsii koordinaattien perusteella toreja,
kahviloita ja katusoittajia ja hylkää muut. 41 kaupungista 36 sai
ehdokkaita, ja niistä valittiin käsin 31.

**Näyte on aina tori, kahvila, asema tai katu** — paikka jossa ihmisiä
on monta eikä äänite ole kenenkään yksityinen keskustelu.

**Ilman näytettä jäivät** Alpit, Dubrovnik, Sarajevo, Odessa ja Lappi
(ei yhtään ehdokasta) sekä Edinburgh, Wien, Granada, Tromssa ja
Islanti (ehdokkaat olivat kutomakone, lintuja, kirkonkelloja tai
supermarketti — ei puhetta). Näissä nappia ei näy lainkaan, mikä on
parempi kuin nappi joka lupaa kieltä eikä anna sitä. Nämä kymmenen
kannattaa hakea uudestaan, jos aporeehen tulee lisää äänityksiä.

**Yksi rajoite rehellisyyden vuoksi:** valinta on tehty äänitysten
omien kuvausten perusteella, ei kuuntelemalla. Kuvaukset ovat
aporeessa poikkeuksellisen tarkkoja ("cafe, old ladies, venetian
dialect, murmur, words"), mutta jos jokin näyte osoittautuu
kuunneltuna huonoksi, tilalle on valmiit vaihtoehdot: haun koko tulos
on tallessa ja saman kaupungin muut ehdokkaat saa työkalulla uudestaan.

**Lisenssit:** 24 näytettä on public domain, loput CC BY-, BY-SA-,
BY-NC- tai BY-NC-SA-lisensoituja. ND-lisenssit (ei muokkausta) jätettiin
kokonaan pois, koska peiliin menevät äänet leikataan kolmeen
minuuttiin. Tekijä ja lisenssi näkyvät napin selitteessä.


## Paketti 20: kaupunkien omat ambienssiäänet

**Omistajan toive:** "Olisi tärkeää löytää jokaiseen kaupunkiin
aidosti siinä kaupungissa nauhoitettu ambienssi ääni."

### Miksi

Taustaäänet tulevat nyt maisematyypin arvontakorista, ja Euroopassa
**22 kaupunkia jakaa kolme "kaupunki"-ääntä**. Praha ja Lissabon
kuulostavat siis samalta. Afrikassa yleisimmillä tyypeillä on 6–8
ehdokasta, Euroopassa kolme.

    kaupunki   22 kaupunkia ·  3 ehdokasta
    satama      9 kaupunkia ·  3 ehdokasta
    pohjoinen   3 kaupunkia ·  3 ehdokasta

### Mitä on jo tehty

`tools/hae-kaupunkiaanet.mjs` on kirjoitettu ja ajettu kerran. Se hakee
radio aporeen äänitteet **koordinaattien** perusteella (aporee-kohteilla
on latitude/longitude archive.orgin metadatassa), ei nimen perusteella
arvaten. Kaupungin koordinaatit haetaan Wikipediasta.

Ensimmäinen ajo löysi ehdokkaat **24 kaupungille 41:stä**.

### Työkalun kaksi vikaa — KORJATTU 1.8.2026

Molemmat oli tässä listassa diagnosoitu väärin. Oikeat syyt löytyivät
kokeilemalla, ja ne on kirjattu koodiin kommentteina. Älä palauta
vanhoja selityksiä.

1. **Ei ollut Lucenen kieltooperaattori vaan hakemisto, joka ei tunne
   etumerkkiä.** Suojaamaton miinusmerkki kaataa kyselyn, se on totta,
   mutta lainausmerkeissäkään negatiivinen väli ei löydä mitään:
   archive.org tallentaa koordinaatit merkkijonoina ja jäsennin pudottaa
   miinusmerkin pois. Brixtonin äänite (longitude −0,1119) löytyy
   väliltä `["0.0" TO "0.9"]`. Kysely tehdään nyt itseisarvoilla ja
   etumerkki tarkistetaan vasta tuloksista. Sama koski latitudea, joten
   **koko eteläinen pallonpuolisko olisi jäänyt löytymättä Afrikassa.**
   Lisäksi vertailu on aakkosellinen, ei numeerinen (`["9.8" TO "10.2"]`
   jää tyhjäksi), joten väli pilkotaan kokonaisosan numeromäärän mukaan.
2. **Ei ollut otsikoissa vaan rajapinnan oletusrajassa.** Wikipedian
   `prop=coordinates` palauttaa oletuksena vain **kymmenen** sivun
   koordinaatit pyyntöä kohti, vaikka `titles` ottaa viisikymmentä —
   loput näyttivät koordinaatittomilta. `colimit=max` korjaa sen.
   Seuduilla ja saarilla (Alpit, Kreeta, Lappi, Sisilia, Islanti) ei ole
   artikkelissa koordinaattia lainkaan; ne haetaan Wikidatan
   P625-ominaisuudesta sivun wikibase_item-tunnuksella.

Tulos: ehdokkaita löytyi **41/41 kaupungille** (ennen 24/41).

### Loppu tehty samalla — Eurooppa on valmis

3. ✅ Haku ajettu uudestaan; etäisyys keskustasta on tuloksessa mukana ja
   tarkistettu.
4. ✅ Karsittu käsin 328 osumasta 69:ään. Suodatinta myös terävöitetty:
   se hylkää nyt sisätilat ja asemahallit, kertaluonteiset tapahtumat
   (joulutorit, mielenosoitukset, karnevaalit) ja koneet. Ensimmäisellä
   ajolla Budapestin kuusi parasta olivat kaksi joulutoria ja neljä
   metroasemaa. Samanniminen äänite kelpaa enää kerran.
5. ✅ Jokaisen osoitteen toimivuus tarkistettu (yksi vastasi 500 ja
   jätettiin pois) ja lisenssi luettu kohteen omasta metadatasta.
6. ✅ `js/aani-ehdokkaat.js`: `KAUPUNKI_EHDOKKAAT` ja kori-rajapinta
   (`kaupunkiKori`, `valitseKaupunkiKori`). Studioon oma lohko
   "Kaupunkien omat äänitykset" maanosan alle; valinnat kulkevat myös
   Kopioi- ja Tuo-napeissa.
7. ✅ `js/ambience-stream.js`: kaupungin oma äänitys ensin, tyyppikori
   varalle. Vanha "kaupunkikohtaisia valintoja ei ole" -päätös kumottu.
8. ✅ Peilattu. Peiliin menevät äänet leikataan kolmeen minuuttiin
   (omistajan linjaus): `tools/leikkaa-mp3.mjs` katkaisee kehysrajalta
   koodaamatta uudelleen, joten ffmpegiä ei tarvita eikä laatu muutu.
   Manifestiin jää `leikattu`-merkintä, jotta uusintajo ei luule
   lyhennettyä tiedostoa katkenneeksi.
9. **TEKEMÄTTÄ: sama Afrikalle.** Omistajan päätös 1.8.2026: tehdään
   myöhemmin. Työkalu ja pelin puoli ovat valmiit, joten jäljellä on
   ajo (`--maanosa africa`), karsinta ja peilaus.

   Afrikan tilanne on lievempi kuin Euroopan oli, mutta ei kunnossa —
   sen 39 kaupunkia jakavat tyyppikorit näin:

       meri       10 kaupunkia · 6 ääntä
       savanni     9 kaupunkia · 6 ääntä
       aavikko     7 kaupunkia · 5 ääntä
       sademetsa   6 kaupunkia · 5 ääntä
       basaari     5 kaupunkia · 2 ääntä
       ylanko      2 kaupunkia · 1 ääni

   Pahimmat kohdat ovat ylänkö ja basaari. Jos aikaa on vähän, ne
   kannattaa tehdä ensin.

### Reunaehdot

- Aloituskohdan arvonta on jo tehty — älä koske siihen.
- Etusivun ääni on tarkoituksella vakio ja puolet hiljaisempi.
- Äänet ovat isoja: peilaus kestää, ja aikaraja on 20 min tiedostoa
  kohti syystä.
- Kolmen minuutin katko ja ambienssin 45 sekunnin loppuvara kuuluvat
  yhteen: aloituskohta arvotaan väliltä 0–135 s. Jos katkoa lyhennetään,
  tarkista `LOPPUVARA_S` (js/ambience-stream.js).


## Paketti 18: Katso kuva -linkit Afrikan havaintoihin — VALMIS

Omistajan toive: kun havainto kuvailee ilmiötä ("tulivuori jolla kaksi
kraatterijärveä", "kallioihin hakatut kirahvit"), pienestä linkistä
pitäisi aueta kuva siitä. Mekanismi on valmis (#99): placeFacts-faktalle
voi antaa `wiki`-kentän (Wikipedia-artikkelin otsikko), jolloin
tietokorttiin ilmestyy "Katso kuva" -linkki. Se avaa artikkelin kuvan,
tiivistelmän ja kuvagallerian. Esimerkit: africa-questions.js:n faktat
Leptis Magna, Tadrart Acacus, Assekrem, Sudd, Kenkänokka, Deriba Caldera.

Tehtävä: käy KAIKKI `AFRICA_FACTS`-faktat läpi ja lisää `wiki`-kenttä
niihin, joissa on selvästi kuvautuva kohde tai ilmiö. Säännöt:

- Vain kun faktassa on konkreettinen katsottava asia (rakennus,
  luonnonmuodostuma, eläin, esine). Yleistunnelmalle ei linkkiä —
  tavoite on ehkä 1 linkki per kaupunki, ei joka faktalle.
- Otsikko suomeksi jos artikkeli on olemassa fi-Wikipediassa (esim.
  'Kenkänokka'), muuten englanniksi ('Deriba Caldera'). Haku kokeilee
  fi → en. Väärä otsikko ei kaada mitään (dialogi sanoo ettei tietoja
  saatu), mutta älä arvaa: jos et ole varma artikkelin nimestä, jätä
  linkki pois.
- Merkkijonofakta muuttuu olioksi: `{ text: '...', wiki: 'Otsikko' }`.
  `voice`- ja `source`-kentät säilytetään jos ovat.
- Testit ajetaan (`node --test tests/rules.test.mjs`) — placeFacts-testi
  tarkistaa wiki-kenttien muodon. Versionostot ja standalone kuten aina.

## Paketti 19: matkamuistot aarrepalkinnoiksi (Afrikka)

Omistajan toive: palkinto voisi välillä olla muutakin kuin jalokivi —
matkamuisto: voodoo-esine, taideteos, upea matto, sormus, pergamentti…
Osa muutetaan heti rahaksi, osa jää muistoesineiksi laukkuun. Sormusta
tai pergamenttia "voisi ehkä käyttää myöhemmin jossain hyväksi" — sitä
EI toteuteta vielä, mutta esineille varataan `id`, jotta myöhempi käyttö
on mahdollista.

- **Uusi laattaluokka `muisto`** (js/tokens.js): Afrikka-teemaiset
  esineet, esim. tuaregin hopeasormus, vodun-veistos (Orjarannikko),
  kelim-matto, ebenpuinen naamio, pergamenttikäärö Timbuktusta,
  strutsinsulka. Jokaisella: `id`, `name`, lyhyt `kuvaus` (mistä esine
  kertoo — opetuksellinen rivi), `arvo` (puntina; 0 = pelkkä muisto).
- **Jakauma:** korvaa laattajakaumasta (counts) osa jalokivistä ja
  tyhjistä muistoilla — esim. 3–4 muistolaattaa per lauta. Tyhjien määrä
  saa laskea: "isoisän vanhentunut merkintä" on pettymys, muisto ei.
- **Paljastus:** arvollinen muisto myydään heti ("Löysit: kelim-matto —
  kauppias maksaa siitä 150 puntaa"), arvoton jää matkasaaliiseen
  ("Löysit: tuaregin hopeasormus — se jää laukkuusi"). Muistot näkyvät
  passin matkasaaliissa omina esineinään.
- **Kuvitus:** drawTokenIcon-tyylinen piirros jokaiselle esineelle
  (tokens.js:n käsin piirretty tyyli, ei emojia) + paljastuskiekon kuva.
- **Tallennus:** vanha tallennus toimii ennallaan (uusia tyyppejä vain
  lisätään; puuttuvat kentät oletuksiin).
- **Testit:** laattajakauman summa ennallaan, jokaiselle muistolle on
  piirros ja kuvaus, arvot kohtuullisia (0–300 p). Versionostot ja
  standalone kuten aina.

## Paketti 17: ambienssi — taustaäänimaisema kohteen mukaan — VALMIS

Omistajan toive: hiljainen taustaääni, jossa tuulen suhinaa ja välillä
muita luonnon tai kaupungin ääniä, ja tyyppi vaihtuu kohteen mukaan.
Toteutus Web Audiolla ilman tiedostoja (js/sound.js).

- **Tyypit (muutama, kierrätetään):** `aavikko` (matala tuulen suhina,
  hiekan rahinaa puuskissa), `meri` (aaltojen kohina paisuen ja
  laantuen, harva lokinhuuto), `sademetsa` (sirinä, satunnaiset
  vesipisarat, kaukainen linnun vihellys), `savanni` (heinäsirkat,
  kuiva tuuli), `ylanko` (ohut viima), `basaari` (VAIKEIN — ei
  yritetä puhetta: vaimeita kulkusia, kavionkopsetta ja etäistä
  rytmiä harvakseltaan). Kaikki HYVIN hiljaisia (gain ~0.03–0.05):
  ambienssin kuuluu huomata vasta kun se lakkaa.
- **Rakenne:** jatkuva pohja (suodatettu kohina hitailla LFO:illa) +
  satunnaisia tapahtumia pitkin, epäsäännöllisin välein (8–30 s) —
  Math.random käy, äänet eivät ole pelitilaa.
- **Data:** Afrikan kaupungeille `ambience`-kenttä (africa.js cities);
  muut laudat myöhemmin, ilman kenttää ambienssia ei soiteta.
  Vaihto ristihäivytyksellä (~2 s) kaupungin vaihtuessa; merellä
  liikuttaessa aina `meri`.
- **Reunaehdot:** käynnistys vasta käyttäjän eleestä (iOS), ei saa
  kuulua dialogien tai kirjoituskoneen yli, sfx.enabled sammuttaa,
  akku: yksi yhteinen kohinapuskuri ja vähän solmuja. Savutesti:
  jokainen tyyppi käynnistyy ja sammuu ilman virhettä.

## Paketti 15: lentorepliikkien tunnelataus (pieni paketti) — VALMIS

Omistajan palaute: lentorepliikeistä puuttui innostunut hehkutus —
moni rivi on toteava fakta ilman tunnetta. Käy `texts.flightLines` ja
`texts.flightDefault` läpi (maailma + africa) ja lataa jokaiseen riviin
aitoa innostusta tai jännitystä: nuori herra on ensimmäistä kertaa
elämässään matkalla, ja jokainen lento on hänelle tapaus. Fakta saa
jäädä, mutta se ei riitä yksin — rivin pitää hehkua. Keinoja: huudahdus,
kiihtynyt rytmi, aistihavainto ikkunasta, isoisän kirjan sivun ääneen
ihmettely. Tarina.md:n säännöt pätevät (1–2 virkettä, minä-muoto, ei
kohdemaiden pilkkaa). Testit ja versionostot kuten aina.

Toteuttajan havainnot seuraavaa pakettia varten:

- **Afrikalla on nyt viisi sisältölajia, muilla laudoilla ei yhtään:**
  `questions.claims` (väittämät), `events` (tapahtumat), `puzzles`
  (pulmat), `texts.schedule` (isoisän aikataulu) ja kaupunkien
  `wiki`-kentät. Kaikki ovat valinnaisia ja moottori toimii ilman niitä,
  joten laajennus muille laudoille voi edetä lauta kerrallaan.
- **Karttojen maamerkit ovat toistaiseksi vain Afrikalla.** `mapart.js`:n
  LANDMARKS-kokoelma on lautariippumaton, joten uusi maamerkki on yksi
  piirtofunktio ja yksi rivi pakan decor-osiossa. Koristetesti vartioi
  sijoitusta automaattisesti kaikilla laudoilla.
- **`texts.schedule` — PÄÄTETTY 2.8.2026.** Kysymys oli: onko isoisän 80
  päivää lautakohtainen vertailuluku vai yksi matka? Omistajan vastaus:
  **yksi matka.** Pelin tavoite on löytää aarre jokaisesta maanosasta ja
  palata Lontooseen alle kahdeksassakymmenessä päivässä. Aikataulu on siis
  yksi koko maailman kierros, kuten `docs/tarina.md`:n ainoa päiväkirja
  vuodelta 1873 — ja kuten pelaajahahmon nimi (Fogg) on aina vihjannut.
  Aikataulutekstit pitää käydä läpi tämän mukaan.
- **Kaupunkiin pääsee vasta kaupungin avaimilla.** Omistajan sääntö
  2.8.2026: avaimet on löydettävä ennen kuin kaupunkikartan voi avata.
  Näin kaupunki on palkinto eikä oikotie — sinne ansaitaan pääsy.
  Avaimet ovat kaupunkikohtaiset, joten niitä on yhtä monta kuin
  kaupunkikarttoja. Nimi on myös historiallisesti oikea: kaupungit ovat
  antaneet avaimensa arvovieraille.
- **Kaupunkien sisällöt yhteiskehitykseen — myöhemmin.** Omistajan
  linjaus 2.8.2026: joku, joka tuntee kaupungin oikein hyvin (vaikka on
  sieltä kotoisin), voisi ehdottaa tai itse rakentaa kaupungin kartan ja
  kirjoittaa ylös sen erityispiirteet. **Vasta sitten kun koko
  maailmankartta on rakennettu.** Omistaja lisää todennäköisesti itse
  ensimmäisenä yhden kaupungin Suomeen. Tämä sopii pelin tavoitteeseen:
  paikallinen tieto on juuri sitä ymmärrystä, jota peli tavoittelee.
- **`TURN_HOURS = 6` odottaa yhä pelitestiä.** Yhden vakion muutos
  (js/game.js). **Uusi vaatimus 2.8.2026:** kaupunkitason laudoilla ajan
  pitää kulua HITAAMMIN kuin mantereella, koska kaupungin sisällä
  välimatkat ovat pieniä. Silloin vakio ei voi olla yksi luku vaan
  lautakohtainen — kaupunkilaudalla esimerkiksi tunti vuorossa kuuden
  sijaan. Näin kaupunkiin pysähtyminen kannattaa aikarajasta huolimatta,
  ja juuri siellä ehtii oppia.

Omistajan linjaus 27.7.2026: **työstetään pelkkää Afrikkaa, kunnes
peruspeli on kunnossa.** Muihin lautoihin ei kosketa ennen kuin Afrikka on
valmis. Paketit 8–11 ovat valmiit; seuraavaksi tehdään paketti 12
(alempana).

Myöhemmäksi sovitut (EI vielä työn alle):

- Tyynellämerellä ei ole laivareittejä: Los Angelesista pääsee vain maitse.
  Reitti kiertäisi päivämäärärajan yli, mikä vaatisi tuen reitille, joka
  jatkuu kartan reunan yli. Odottaa omistajan päätöstä.
- Yksittäiset maat mantereiden jälkeen (Suomen mallin mukaan).
- Maailma-lauta samaan kuntoon kuin Afrikka: keskeytetyn session
  mittauksen mukaan Maailman havainnot ovat keskimäärin 92 merkkiä
  (Afrikka: 239) ja tietosanakirjamaisia. Perusteltu työ — mutta
  odottaa omistajan päätöstä siitä, milloin Afrikka-ensin-linjasta
  siirrytään eteenpäin. Keskeytetyn session luonnos on haarassa
  `claude/tyolista-p10`.
- "Vastaus lukee kartalla" -siivous muille laudoille: kysymys, jonka
  oikea vastaus on saman laudan toisen kaupungin nimi, on ilmainen.
  Afrikka on siivottu ja testi vartioi sitä (rules.test.mjs,
  VASTAUS_EI_KARTALLA). Tunnetut tapaukset muilla laudoilla: europe
  general (Istanbul), middleeast/ankara (Istanbul), suomi general
  (Helsinki), oceania general (Uluru). Korjataan kunkin laudan
  sisältöpassissa ja lauta lisätään testin settiin.
- Kysymysten vaihtelu: paketti 10 ✅ ja "Lue lisää": paketti 11 ✅
  (kuvaukset alempana; jätetty dokumentiksi).

Tämä on omistajan ja suunnittelusession sopima työlista. Tee työpaketit
järjestyksessä; jokainen paketti on oma commit/PR. Jokaisen paketin jälkeen:

```bash
npm test                        # kaiken pitää mennä läpi
node tools/build-standalone.mjs # yhden tiedoston versio kokoontuu
```

Nosta versiot molemmissa: `sw.js` (CACHE) ja `js/main.js` (APP_VERSION),
muoto `2026-07-XX.N`. Kuvakaappaustarkistus: käynnistä paikallinen palvelin
ja katso lauta oikeasti (Playwright on asennettu scratchpadiin, malli
aiemmista skripteistä; selain `/opt/pw-browsers/chromium-*/chrome-linux/chrome`).

Sävy- ja sisältösäännöt ovat tiedostoissa `docs/tarina.md` ja
Raamatun Perustuslaki-osio (js/tyohuone-raamattu.js) — lue molemmat ennen tarinatekstien kirjoittamista.

## Rinnakkaiset sessiot (työnjako)

Työn voi jakaa usealle sessiolle näin — ÄLÄ poikkea jaosta, koska
paketit 1–4 ja 6 muokkaavat samoja tiedostoja (ui.js, game.js, css):

- **Kaista A (koodi):** paketit 1 → 2 → 3 → 4 → 6 → 7 tässä
  järjestyksessä, yksi sessio kerrallaan.
- **Kaista B (sisältö):** paketti 5 rinnakkain kaistan A kanssa —
  muokkaa VAIN `js/packs/*-questions.js`-tiedostoja ja pakkojen
  duels/starHints/diaries-listoja, ei koskaan js/ui.js:ää, js/game.js:ää
  eikä css:ää. Jos sisältösessioita on kaksi, jaa laudat: B1 = Maailma,
  Afrikka, Eurooppa; B2 = Suomi, Istanbul, Aasia, Oseania, Amerikat,
  Lähi-itä. Huom: paketin 4 äänimerkinnät (voice-kenttä) saa lisätä
  sisältöön vasta kun kaista A on toteuttanut paketin 4 rungon.
- Jokainen sessio omalla haaralla, pienet PR:t, merge usein; mergen
  jälkeen haara uusiksi tuoreen mainin päälle
  (`git fetch origin main && git checkout -B <haara> origin/main`).
- `npm test` vihreänä ennen jokaista mergeä. Jos main on ehtinyt
  liikkua, rebase ja aja testit uudelleen ennen mergeä.

---

## Paketti 1: pikakorjaukset (bugit ja tyyli)

1. **Tiesitkö että -laatikko näkyy aloitusnäkymässä vaikka on piilotettu.**
   `renderFact` asettaa `this.factCard.hidden = true`, mutta sisältö voi
   silti vilkkua/jäädä näkyviin (välimuistisekoitus tai CSS-display voittaa
   hidden-attribuutin). Korjaus: lisää `css/styles.css`-tiedostoon globaali
   sääntö `[hidden] { display: none !important; }` JA tyhjennä
   `factPlace`/`factText`-sisältö pickstart-haarassa (`js/ui.js`).

2. **Pyörivät punaiset renkaat ovat liian levottomat.**
   - `.target-ring`-luokassa on `animation: target-spin 6s linear infinite`
     (css/styles.css ~rivi 677). Lähtöpisteen valinnassa joka kaupungilla
     pyörii rengas → levoton. Anna pickstart-renkaille oma luokka
     (`drawTargets` js/ui.js:ssä lisää jo `picked`-luokan; lisää myös
     `pick`-luokka) ja tyyli: ei animaatiota, ohuempi viiva (2), kullan-
     ruskea sävy (`#b08a3c` tms.), täyttö pois. Siirtovaiheen renkaat
     (punaiset) saavat jäädä ennalleen — ne ovat kehotus toimia.
   - `.city-gate` (portin katkoviivakehä, ~rivi 585): kevennä
     opacity 0.72 → 0.4 ja stroke-width 2.2 → 1.6. Maailma-laudalla lähes
     joka kaupunki on portti, joten kehä on siellä melua.

3. **Tietovisan vastausruudut päivittyvät tökkien** (väärän vastauksen
   jälkeen koko lista välähtää). Syy: `renderQuiz` (ja `renderDuel`)
   tyhjentää `quizOptions` ja rakentaa napit uudelleen joka renderillä,
   jolloin `option-in`-animaatio (css ~rivi 931) toistuu. Korjaus: rakenna
   napit vain kun kysymys vaihtuu (vertaa `this.builtQuizFor !== quiz`),
   muuten päivitä olemassa olevien nappien `disabled`/`classList` paikallaan.
   Sama korjaus molempiin (quiz + duel). Varo: 50:50 piilotus ja
   correct/wrong-luokat pitää päivittää paikallaan.

4. **"AFRIKA" → "AFRIKKA"**: `js/packs/africa.js` rivi ~255
   (`mapLabel: 'AFRIKA'`). Otsikon leveys lasketaan nimen pituudesta
   automaattisesti, joten pelkkä tekstikorjaus riittää.

5. **Mantereen reunat jatkuvat ruudun yli.** Lähi-idän laudalla maa näyttää
   katkeavan mereen vasemmassa ja oikeassa reunassa, vaikka maa oikeasti
   jatkuu. Korjaus: venytä `mainlandPoints`-ääriviivaa kartan reunan yli
   (x < 0 ja x > 1000), samaan tapaan kuin Maailma-laudan
   `arcticPoints` käyttää arvoja -40 ja 1045 (js/packs/maailma.js).
   Vaalea filmivinjetti (`.map-pane::after`) hoitaa häivytyksen reunassa.
   Tee sama tarkistus muille laudoille: ainakin Aasian länsireuna (jatkuu
   Lähi-itään) ja Euroopan itäreuna kannattaa katsoa kuvakaappauksesta.
   Testit eivät estä ääriviivapisteitä kartan ulkopuolella.

6. **Aloitusdialogi pois kokonaan.** Nimi- ja tasokysely poistetaan:
   uusi peli alkaa suoraan maailmankartalta (pickstart). `js/main.js`:
   `openSetup()` → luo pelin suoraan (`startGame()`), `index.html`:
   poista `#setup`-dialogi. Nimi on aina "Herra Fogg". Helpot kysymykset
   jätetään toistaiseksi kokonaan pois: pelaaja saa aina tason 'normal'.
   ÄLÄ poista level-kenttiä kysymyspankeista eikä moottorin tukea
   (pickQuestion, testit) — taso 1 -kysymykset kuuluvat normaalipakkaan
   ja helpotustila voidaan palauttaa myöhemmin.

7. **"Vuorossa:" pois yläpalkista.** Yksinpelissä turha. `renderTurnPill`
   (js/ui.js): näytä pillerissä sen sijaan raha ja sijainti:
   `● 300 p · Lontoo`. Pidä elementti — vain sisältö vaihtuu.

## Paketti 2: kartta koko ruutuun (paitsi aloituskartta)

Kun peli on käynnissä (phase != 'pickstart'), kartta täyttää koko näytön ja
paneelit kelluvat sen päällä:

- `body`-elementtiin `data-mode="play"` / `data-mode="start"` (js/ui.js
  render() asettaa phase-tiedon mukaan).
- `play`-tilassa `.stage` on yksi sarake, `.rail` muuttuu overlayksi:
  toimintonapit alas keskelle kelluvana pergamenttikorttina, tila/raha
  ylös oikealle pieneksi pilleriksi, päiväkirja/havainto vasempaan
  alakulmaan kelluvana korttina (läpikuultava pergamentti, esim.
  `rgba(46,33,20,0.88)` + border kuten `.event-toast`).
- Aloituskartassa (pickstart) nykyinen kahden palstan asettelu säilyy.
- Kapealla näytöllä (< 700 px) overlay-kortit pinoutuvat alas.
- `fitViewBox` toimii ennallaan — pane vain kasvaa.

## Paketti 3: valintojen minimointi (kaksivaiheinen matkavalinta)

Tavoite: näytöllä mahdollisimman vähän nappeja kerralla (js/ui.js
`renderActions`, action-vaihe):

- Vaihe A näyttää enintään kolme nappia:
  1. `🥾 Jalan` — kutsuu `actionTravel('land')` ja **heittää nopan heti
     perään** ilman erillistä painallusta (`doRoll()` ketjuun).
  2. `⛵✈ Laiva & lento…` — avaa vaiheen B, jossa vasta näkyvät kaikki:
     laiva, lennot, portit ja tietoportit. UI-tila `this.travelExpanded`,
     nollataan vuoron vaihtuessa. Mukaan `↩ Takaisin` -nappi.
  3. `❓ Vastaa kysymykseen` — vain aarrekaupungissa (stay) + vaikea
     kysymys -nappi kuten nyt.
- Jos vain maareitti on mahdollinen, noppa pyörähtää suoraan (autoTravel
  tekee tämän jo — varmista että myös nopanheitto käynnistyy ilman
  painallusta; lisää asetus/harkinta: heitto saa käynnistyä automaattisesti
  vain autoTravel-tilanteessa ja Jalan-napista).
- Moottoriin ei kosketa; tämä on puhtaasti renderActions-ryhmittelyä.
- Päivitä Säännöt-dialogin "Vuoron kulku" -teksti vastaavasti.

**Samassa paketissa: aloitusteksti (OMISTAJAN PÄÄTTÄMÄ TEKSTI).**
Pelin avaus on kokonaan minämuodossa, kuin seikkailukirjan alku — ei
selittelyä eikä ohjeita. Avauskortissa/tietoruudussa näytetään TÄSMÄLLEEN
tämä teksti (kirjoituskoneella naksuen, kolme kappaletta):

> Vintiltä löytyi isoisän matkalaukku: kartta vuodelta 1872,
> kukkarollinen puntia ja kulunut matkakirja:
> "Maailman ympäri kahdeksassakymmenessä päivässä".
>
> Viimeinen sivu oli revitty kesken lauseen: "…voinut uskoa, siellä olikin…"
>
> Hetkinen… Mitä hän oli löytänyt?
>
> Juoksin kentälle kirja kädessäni ja mietin enää yhtä asiaa:
>
> mistä aloitan?

(Päivitetty 4.8.2026: omistaja pyysi avaustekstin lyhyemmäksi — "sitä ei
jaksa kuunnella". Voimassa oleva teksti on js/ui.js:n INTRO_TEXT: pois
jäivät matkalaukun sisältöluettelo, "Hetkinen…" ja "mietin enää yhtä
asiaa"; revitty sivu, "Mitä hän oli löytänyt?" ja "mistä aloitan?"
säilyivät. Luenta generoitiin uudelleen, 34 s → 23 s.)

(Päivitetty 30.7.2026 omistajan uuteen muotoiluun: päiväkirjasta tuli
matkakirja — sama esine kuin sovelluksen nimi — ja loppu tiivistyi
juoksuksi kentälle. "Mistä aloitan?" johtaa suoraan laudan valintaan.)

(Päivitetty 29.7.2026 omistajan kanssa yhdessä: revitty sivu näyttää
katkoksen konkreettisesti, eikä pääaarretta nimetä — se on "jotain
suurempaa", joka jää pelin selvitettäväksi. Irti revitty sivu on
mahdollinen tuleva juonikoukku. "Napauta kaupunkia kartalla" -rivi
poistettu.)

(Päivitetty 27.7.2026 omistajan pyynnöstä: ei mainintaa Afrikasta, koska
aloituspaikan saa valita vapaasti. Isoisän 80 päivän ennätys mainitaan —
se pohjustaa tulevan aikaraja-vastustajan, joka toteutetaan Afrikan
sisällön jälkeen.)

- Tilarivi pickstartissa ilman valintaa: pelkkä "Minne ensin?"
- Kaikki muut avauksen ohje- ja lokirivit ("Peli alkaa! Etsikää…",
  "Vaellus: peli ei pääty…", "lippu on jo maksettu" jne.) poistetaan —
  sääntöasiat kuuluvat Säännöt-dialogiin.
- Kaupungin valinnan jälkeiset tekstit saavat jäädä ennalleen.
- Tekstiä ei muokata eikä jatketa ilman omistajan lupaa.

## Paketti 4: kaksi ääntä — kerronta korvaa "Tiesitkö että" -jutut

Tämä on ison tarinapäivityksen ydin. Lue ensin `docs/tarina.md`.

**Hahmokorjaus:** matkaaja on **nuori herra Fogg**, joka on samaan aikaan
täpinöissään maailmanympärysmatkastaan ja huvittunut **isoisänsä** vanhan
matkapäiväkirjan merkinnöistä, joita hän lukee matkalla. Vanha herra ei
siis matkusta — hänen päiväkirjansa matkustaa. Päivitä `docs/tarina.md`,
aloitusteksti ja nykyiset `texts.diary`-merkinnät tähän asetelmaan
(nykyiset diary-tekstit sopivat lähes sellaisenaan nuoren ääneen tai
isoisän sitaateiksi — jaa ne oikeille äänille).

**Tietoruutu uusiksi:** "Tiesitkö että…" -otsikko ja -konsepti poistuvat.
Tilalle sama kortti kahdella äänellä, jotka vuorottelevat:

- **"Isoisän päiväkirjasta"** — vanha ääni, 1870-luku. Saa loistaa
  asioissa jotka ovat YHÄ totta (joet, vuoret, monsuuni, keskiyön aurinko,
  basaarin tuoksut) ja olla vanhentunut nimissä, rajoissa ja tekniikassa.
- **"Nuoren herran havainto"** — nykyaika: faktat, lähteet ja kuiva
  huvittuneisuus isoisän merkinnöistä. Nykyiset placeFacts-tekstit ovat
  valmiiksi tätä ääntä.

**Tietomalli:** `placeFacts`-alkio saa vapaaehtoisen kentän
`voice: 'isoisa' | 'nuori'` (merkkijono-alkio = nuori, taaksepäin
yhteensopiva). UI (`renderFact`) näyttää otsikkorivillä äänen mukaan
"Isoisän päiväkirjasta, 1873" tai "Nuoren herran havainto" ja arpoo
tekstin kuten nykyisin. `factText`/`factSource`-apurit (js/pack.js) saavat
`factVoice(fact)`-apurin. Testit: jokaisella kaupungilla oltava jatkossa
vähintään yksi kummankin äänen teksti (nosta testiä vasta kun sisältö on
kirjoitettu — tee sisältö ensin lauta kerrallaan).

**Isoisän aarrevihjeet:** isoisän päiväkirja vihjaa laudan pääaarteesta.
Toteutus: pakkaan `texts.starHints` — olio, jossa avaimena kaupunki-id ja
arvona isoisän tyylinen vihjelause, joka viittaa SUUNTAAN tai ALUEESEEN
muttei nimeä kaupunkia (esim. Afrikka: jos tähti on Timbuktussa →
"Aavikon eteläreunalla kerrottiin kaupungista, jonka kirjastot hävettivät
Oxfordia. En ehtinyt käydä. Käy sinä."). Pelimoottori: kun lauta luodaan
(`enterWorld`), `world.starCity` tiedetään — vihje nostetaan tietoruudun
kiertoon harvakseltaan (esim. joka 4. vuoro, otsikolla "Päiväkirjan
taitettu sivu"). Vihje saa kaventaa aluetta, ei paljastaa kaupunkia.
Kirjoita vihje jokaiselle laudan mahdolliselle tähtikaupungille
(= kaikki aarrekaupungit). Testi: starHints kattaa kaikki aarrekaupungit.

**Saapumismerkinnät moninkertaisiksi:** `texts.diary` (yksi merkintä) →
`texts.diaries` = LISTA saapumismerkintöjä (vähintään 4/lauta), joista
arvotaan yksi laudalle saavuttaessa (`setDiary` js/game.js — käytä pelin
`rng`:tä, jotta tallennus toistuu oikein). Muoto: isoisän sitaatti +
nuoren reaktio samassa merkinnässä toimii hyvin. Pidä vanha `diary`-kenttä
fallbackina tai muunna kaikki kerralla ja päivitä testi (nyt testi vaatii
`texts.diary`-merkkijonon — muuta vaatimaan `diaries`-listan).

**Sävyohje kaikkeen** (tarina.md:ssä, tiivistettynä): kuiva ironia aina
kun mahdollista; nostalgia ja sen osittainen romahtaminen; piikki osuu
isoisään, imperiumiin tai nuoreen herraan itseensä — ei koskaan
kohdemaihin; osa asioista muuttuu, osa pysyy — ja isoisä saa olla oikeassa
pysyvissä asioissa; faktat oikein vitsin sisälläkin, lähteet säilytetään.

## Paketti 5: sisällön moninkertaistus (EI uusia maita vielä)

Hiotaan nykyiset 10 lautaa ennen uusia. Määrätavoitteet:

- **Kysymykset:** jokaiselle aarrekaupungille vähintään **5 omaa
  kysymystä** (nyt minimi 2), joista ≥1 helppo (level 1) ja ≥1 vaikea
  (level 3). Kysymysten pitää liittyä NIMENOMAAN siihen paikkaan — ei
  yleistietoa paikan nimellä. General-pakka pysyy varapakkana (≥15/lauta).
  Nosta testien minimit (tests/rules.test.mjs: "kysymyspankki on ehjä")
  vasta kun laudan sisältö on kirjoitettu — etene lauta kerrallaan
  järjestyksessä: Maailma, Afrikka, Eurooppa, Suomi, Istanbul, sitten muut.
- **Äänitekstit:** joka kaupungille ≥1 isoisän merkintä + nykyiset
  havainnot nuoren äänellä (tarkista sävy, kevyt muokkaus riittää).
- **Saapumismerkinnät:** ≥4 per lauta (paketti 4:n muoto).
- Laatuvahdit ovat testeissä: 4 uniikkia vaihtoehtoa, fact+hint pakolliset,
  vihje ei saa sisältää vastausta, ei kaksoiskysymyksiä, lähdemuoto.
  ÄLÄ kierrä testejä — ne ovat julkaisuportti.

## Paketti 6: kokemuspisteet, tietoprosentti ja passin leimat

- **Kokemuspisteet (KP):** pelaajalle `xp`-kenttä. Ansainta:
  +10 uusi kaupunki (ensimmäinen käynti per kaupunki per maailma; pidä
  `visited`-settiä world-tilassa), +50 uusi lauta, +25 oikea vastaus
  vaikeaan kysymykseen, +100 laudan pääaarre. Näkyy pelaajapaneelissa.
  Tallennus toJSON/fromJSON (Set → lista).
- **Tietoprosentti:** laskurit `quizAsked`/`quizCorrect` (myös
  kaksintaistelut). Paneeliin esim. "Tieto 78 %". Tallennus mukaan.
- **Passin leimat (meta, oma localStorage-avain, EI pelitallenteessa):**
  vihreä passi saa leiman jokaisesta laudasta, jolla on käynyt — yli
  pelikertojen. Pieni passinäkymä (nappi yläpalkkiin, dialogi jossa
  leimat ruudukossa; leima = laudan nimi + päivämäärä + pergamenttityyli).
  Tämä on keräilyn ydin ja sopii tarinaan (vihreä passi!).
- Testit: XP-kirjanpito ja prosentin laskenta.

## Paketti 7: pelin nimi on MATKAKIRJA

Omistaja on päättänyt: pelin uusi nimi on **Matkakirja**. Vaihda nimi
kaikkialle: `index.html` (title, .brand-otsikko, meta description ja
apple-mobile-web-app-title), `manifest.webmanifest` (name, short_name),
`sw.js` (CACHE-etuliite esim. 'matkakirja-2026-XX-XX.N'), `README.md`
(otsikko ja kuvaus), `CONTRIBUTING.md`, `tools/build-standalone.mjs`
(otsikot ja tulostiedostojen nimet, esim. dist/matkakirja.html).
`SAVE_KEY` (js/main.js) pidetään ennallaan, ettei kesken olevat pelit
katoa. Hahmo pysyy herra Foggina pelin sisällä.

Tausta: nimeen ei haluttu sanaa "tähti" eikä hahmon nimeä — oma nimi on
tavaramerkkinä vahvin. Vernen Fogg-hahmo on vapaata kulttuuriperintöä
(ennakkotapaus Inklen kaupallinen 80 Days). Ennen kansainvälistä
kaupallistamista tehdään tavaramerkkihaku peliluokissa (EUIPO, 9/41).

**Omistajan toimenpide samassa yhteydessä:** repon nimen ja kuvauksen
vaihto tehdään GitHubin asetuksissa (Settings → General → Repository
name, esim. `matkakirja`, ja About-kuvaus) — Claude ei voi tehdä sitä.
Huomio: git-osoitteet ohjautuvat vanhalla nimellä automaattisesti, mutta
GitHub Pages -osoite vaihtuu (ravelius.github.io/matkakirja/) eikä vanha
ohjaa uuteen — kirjanmerkit ja kotivalikkoon asennetut versiot pitää
avata uudesta osoitteesta. Muistuta omistajaa tästä, kun paketti 7 on
valmis.

Kun nimi on päätetty, vaihto koskee: `index.html` (title, brand, meta),
`manifest.webmanifest`, `sw.js` (CACHE-etuliite), `js/main.js`,
`tools/build-standalone.mjs` (otsikot ja tiedostonimet), `README.md`,
`CONTRIBUTING.md`. Tallennusavain (`SAVE_KEY`) voi jäädä ennalleen, ettei
kesken olevat pelit katoa.

## Paketti 8: AFRIKKA ENSIN — peruspeli kuntoon (VALMIS)

Omistajan linjaus: peruspeli hiotaan valmiiksi pelkällä Afrikalla ennen
kuin mihinkään muuhun kosketaan. **Muokkaa vain Afrikan sisältöä**
(`js/packs/africa-questions.js`, `js/packs/africa.js` texts-osiot) — ei
muita lautoja, ei js/ui.js:ää eikä js/game.js:ää tässä paketissa.

Lue ensin `docs/tarina.md` kokonaan — erityisesti uusi osio
**"Vaihtelun paletti"**. Se on tämän paketin tärkein ohje.

Suunnittelusessio on jo tehnyt (älä tee uudestaan):

- Avausteksti päivitetty (paketti 3:n sitaatti yllä on voimassa oleva).
- Lapselliset kysymykset korvattu: Tripolin manner-kysymys ja yleispakan
  gepardi/gorilla/kirahvi.
- Nuoren herran havainnot kirjoitettu uusiksi 11 kaupungille:
  tanger, kairo, sahara, timbuktu, dakar, kongo, kapkaupunki, kimberley,
  sansibar, kilimandzaro, addisabeba. **Nämä ovat mallitekstit — lue ne
  ennen kuin kirjoitat omat.**

Opuksen työt tässä paketissa:

1. **Loput 21 kaupunkia:** kirjoita AFRICA_FACTS-tietojen nuoren herran
   havainnot (merkkijonoalkiot) uusiksi vaihtelun paletin mukaan:
   tripoli, murzuk, alkufra, ahaggar, gao, sierraleone, kappalmas,
   kumasi, orjarannikko, kano, kamerun, angola, namib, mosambik,
   madagaskar, viktoria, tanganjika, bahrelghazal, darfur, suakin,
   rashafun. Isoisän merkintöihin (voice: 'isoisa') ei kosketa, paitsi
   jos fakta on väärin. Tasapainosääntö (tarina.md): kaupungin kahdesta
   tekstistä toinen saa olla iso (saapumisen huuma, mittakaava, maisema)
   ja toinen pieni ja arkinen — EI pelkkiä pikkuhuomioita. Sama
   tehokeino ei toistu vierekkäisissä kaupungeissa. Faktat pysyvät
   tosina — tarkista jokainen väite.
2. **Kysymysten aikuistarkistus:** käy Afrikan kysymyspankki läpi ja
   korvaa loputkin lastenvisailta maistuvat kysymykset arvokkaammilla
   samantasoisilla (level-kenttä säilyy, minimit testeissä: joka
   kaupungilla ≥5 kysymystä, ≥1 helppo ja ≥1 vaikea; helppo saa olla
   helppo, kunhan se ei aliarvioi aikuista).
3. **Saapumismerkinnät ja aarrevihjeet:** lue `texts.diaries` ja
   `texts.starHints` (js/packs/africa.js) vaihtelun paletin silmin —
   kevyt hionta sallittu, sävysäännöt tarina.md:ssä.
4. Aja `npm test`, nosta versiot (sw.js + main.js), standalone-buildi,
   PR ja kuittaus TILANNE-osioon.

**Rinnakkaistus (käytä alagentteja, jotta paketti valmistuu nopeammin):**

- Jaa 21 kaupunkia noin kolmeen erään ja anna kukin erä omalle
  agentille rinnakkain. Anna jokaiselle agentille tarina.md:n
  "Vaihtelun paletti" -osio kokonaan sekä valmiit 11 mallikaupunkia
  luettavaksi ennen kirjoittamista.
- Faktantarkistus rinnakkain: jokaisen tekstierän väitteet tarkistaa
  ERI agentti kuin se, joka tekstit kirjoitti. Väärä väite → teksti
  korjataan tai vaihdetaan.
- Kysymysten aikuistarkistus (kohta 2) voi kulkea omana agenttinaan
  samaan aikaan kirjoituksen kanssa.
- **Kokoa tulokset itse.** Yhtenäistämiskierrosta ei saa ulkoistaa:
  vain koko laudan kerralla näkevä huomaa tehokeinojen toiston
  vierekkäisissä kaupungeissa ja iso/pieni-tasapainon vinouman.
  Muokkaa tiedostoa vain pääsessiossa — agentit palauttavat tekstit
  vastauksenaan, eivät kirjoita tiedostoon.
- Vain yksi sessio kerrallaan muokkaa africa-questions.js:ää. Jos
  sessioita on kaksi, toinen ottaa VAIN kohdan 3 (js/packs/africa.js:n
  diaries + starHints) — eri tiedosto, ei konflikteja.

Tekstien kirjoitussäännöt (tiivistelmä — koko ohje tarina.md:ssä):
minä-muoto, 1–3 virkettä, ensimmäinen virke konkreettinen; korkeintaan
kolmasosa teksteistä alkaa isoisällä, vähintään kolmasosassa isoisää ei
mainita; piikki osuu Foggiin/imperiumiin, ei koskaan kohdemaihin.

## Paketti 9: aikamittari ja isoisän ennätys (VALMIS)

Aika on pelin vastustaja — isoisän 80 päivän ennätys — mutta se ei saa
tehdä pelistä ahdistavaa. Omistajan päätökset:

- **Vuoro = 6 tuntia.** Vakio `TURN_HOURS = 6` (js/game.js) — vain yksi
  säätökohta, koska oikea arvo varmistuu pelitestissä. Neljä vuoroa on
  yksi matkapäivä, ja vuorokaudenaika kiertää: aamu, keskipäivä, ilta,
  yö.
- **Mittari on päiväkirjan päivämäärä, ei kello eikä palkki.**
  Yläpalkin pilleriin rahan ja sijainnin rinnalle esim. "Päivä 14,
  ilta". Kirjoituskonetyyli, osa tarinaa — ei hälytysväriä.
- **Isoisän haamu näkyy vertailuriveinä.** Muutaman päivän välein
  päiväkirjaan nousee rivi isoisän aikataulusta samalta matkapäivältä
  (esim. "Päivänä 20 isoisä nousi laivaan Suezissa"). Toteutus:
  pakkaan `texts.schedule` = lista { day, text } -merkintöjä; moottori
  nostaa rivin, kun päivä ohitetaan. Sisältö kirjoitetaan Afrikalle
  ensin, muille laudoille myöhemmin — tekstit tarina.md:n säännöillä.
- **Ennätys on tavoite, EI game over.** Ajan loppuminen ei päätä peliä
  koskaan. Jos laudan pääaarre löytyy 80 päivän sisällä, passiin tulee
  kunniamerkintä ("80 päivää rikottu") ja XP-bonus; hitaammin
  matkanneelle päiväkirja toteaa kuivasti, että isoisä olisi ollut jo
  kotona — mutta isoisä ei nähnyt kaikkea tätä.
- Tallennus toJSON/fromJSON (vuorolaskuri), testit ajan kirjanpidolle
  ja vertailurivien nousulle. Vanha tallenne ilman aikaa jatkuu
  päivästä 1.

## Paketti 10: kysymysten vaihtelu (Afrikka ensin) — VALMIS

Ongelma: jokaisessa pysähdyksessä on sama neljän vaihtoehdon tietovisa,
mikä puuduttaa yksinpelissä. Ratkaisu: kolme uutta muotoa, jotka
vuorottelevat monivalinnan kanssa. Sisältö kirjoitetaan VAIN Afrikalle
tässä paketissa; muut laudat saavat omansa myöhemmin.

1. **Isoisän väittämä (totta vai tarua).** Tietoruutuun nousee isoisän
   päiväkirjamerkintä, ja pelaaja arvioi: totta vai tarua. Kaksi nappia,
   ei neljää. Data: pakkaan `questions.claims` = lista
   { q, correct: boolean, fact, source? } — isoisän äänellä kirjoitettu
   väite, joka on joko yhä totta tai vanhentunut. Tämä on tarinan ydintä:
   sama jännite (mikä muuttui, mikä pysyi) muuttuu pelimekaniikaksi.
   Vähintään 12 väittämää Afrikalle, noin puolet totta. Faktat
   tarkistetaan kuten kysymyksissä.
2. **Karttakysymys.** "Näytä kartalta: missä on X?" — pelaaja napauttaa
   kaupunkia omalla laudallaan. Oikein/väärin ratkeaa napautuksesta;
   väärästä näytetään oikea paikka. Moottoriin uusi kysymystyyppi, UI:hin
   napautustila (kaupunkirenkaat korostuvat vastausvaihtoehtoina, esim.
   4 ehdokasta). Kysymykset voi johtaa laudan omasta datasta (kaupungit,
   aarrekaupungit), joten erillistä sisältöpankkia ei välttämättä tarvita.
3. **Tapahtumakortit.** Välillä kysymyksen sijaan tapahtuu jotain:
   hiekkamyrsky viivyttää (+1 vuoro paikallaan), paikallinen festivaali
   (pieni rahabonus + tarinateksti), kyyti tutulle karavaanille (ilmainen
   siirto naapurikaupunkiin). Data: pakkaan `events` = lista
   { text, effect }, effect pidetään pienenä ja aina reiluna — tapahtuma
   ei saa koskaan viedä aarretta tai isoa summaa. Vähintään 8 tapahtumaa
   Afrikalle, tekstit tarina.md:n säännöillä.

**Vuorottelu:** moottori arpoo muodon painotetusti, esim. 60 %
monivalinta, 15 % väittämä, 10 % karttakysymys, 15 % tapahtuma — painot
vakioina, jotta niitä voi säätää pelitestissä. Sama erikoismuoto ei
toistu kahta kertaa peräkkäin. Tietoportit ja vaikean kysymyksen bonus
pysyvät aina tavallisena monivalintana (niissä panos on suurempi).
**Laudat ilman sisältöä:** jos laudalla ei ole `claims`- tai
`events`-listaa (kaikki muut kuin Afrikka aluksi), sen muodon paino
jaetaan monivalinnalle — peli toimii jokaisella laudalla ilman uutta
sisältöä, ja karttakysymykset toimivat kaikkialla koska ne johdetaan
laudan omasta kaupunkidatasta.

Testit: claims/events-rakenteiden eheys (tyhjät tekstit, faktat,
lähdemuoto), vuorottelun jakaumatesti siemenellä, karttakysymyksen
oikea/väärä-logiikka. Tallennus toJSON/fromJSON, versionostot,
standalone.

## Paketti 11: "Lue lisää" — Wikipedia-tiivistelmät (Afrikka ensin) — VALMIS

Pelaaja voi pyytää lisätietoa nykyisestä sijainnistaan: pieni
**"Lue lisää"** -nappi tietoruudun kulmaan ja saapumiskorttiin (EI
kaupungin napautukseen — napautus tarkoittaa jo siirtymistä). Nappi avaa
pergamenttityylisen dialogin, jossa on Wikipedian tiivistelmä ja kuva.

Toteutus:

- **Rajapinta:** Wikipedian REST-summary, selaimesta suoraan ilman
  avainta: `https://fi.wikipedia.org/api/rest_v1/page/summary/<otsikko>`.
  Vastauksesta käytetään `extract` (teksti) ja `thumbnail.source` (kuva).
  Jos suomenkielistä artikkelia ei ole tai `extract` on alle ~200
  merkkiä, kokeillaan samaa en.wikipedia.orgista.
- **Data:** jokaiselle Afrikan kaupungille `wiki`-kenttä pakkadataan
  (js/packs/africa.js cities): artikkelin tarkka otsikko, esim.
  `wiki: 'Kap Palmas'`. **Tarkista jokainen otsikko oikeasti**
  (rajapintakutsulla tai selaimella) — väärä otsikko antaa väärän
  paikan tai täsmennyssivun. Jos kelvollista artikkelia ei ole
  kummallakaan kielellä, jätä kenttä pois — nappi ei näy sillä
  kaupungilla. Muiden lautojen wiki-kentät lisätään myöhemmin;
  UI ja moottorituki tehdään valmiiksi kaikille.
- **Dialogi:** otsikko, kuva (max korkeus rajattu, `loading="lazy"`),
  tiivistelmä kirjoituskonefontilla, ja AINA alareunassa lähdemaininta:
  "Lähde: Wikipedia (CC BY-SA)" + linkki artikkeliin uuteen välilehteen.
  Lisenssiehto: maininta ja linkki ovat pakollisia, myös kaupallisessa
  käytössä.
- **Offline ja virheet:** peli on PWA — jos haku epäonnistuu (ei
  yhteyttä, 404), dialogissa lukee kohteliaasti "Tietoja ei saatu
  haettua. Matka jatkuu." Peli ei saa koskaan jäädä jumiin tästä.
  Ei välimuistiteta sw.js:ssä (ulkoinen alkuperä) — selaimen oma
  välimuisti riittää. Standalone-versiossa nappi toimii samoin
  (vaatii verkon).
- **Testit:** wiki-kenttä on merkkijono jos se on olemassa;
  Afrikan kaupungeista vähintään 25:llä on wiki-kenttä. Rajapintaa ei
  kutsuta testeissä — fetch-logiikka eristetään omaan funktioonsa ja
  testataan virhepolut tekaistulla vastauksella.
- Versionostot, standalone-buildi, kuvakaappaus dialogista.

## Paketti 12: Isoisän luonnoskirjan pulmat ja kartan maamerkit (Afrikka) — VALMIS

Omistajan idea: muutama erikoistehtävä, jossa **kauniisti piirretty
yksinkertainen pulma** — Verne-ajan hengessä, kuin isoisän päiväkirjaan
piirtämä kaavio. Nämä elävöittävät peliä ja tuovat päättelyä tietovisan
rinnalle. Lue ensin docs/tarina.md.

**Muoto — "Isoisän luonnoskirjasta":**

- Uusi tehtävämuoto `puzzle`: kortissa piirros (inline-SVG kartan
  mustetyylillä), isoisän käsin kirjoittama rivi ja NELJÄ
  vastausvaihtoehtoa (moottorin monivalinta kelpaa sellaisenaan —
  vastaus napautetaan, ei kirjoiteta).
- Piirrokset tehdään koodina (SVG-polut, currentColor, ohut viiva,
  viivavarjostus) tiedostoon `js/packs/africa-puzzles.js`. EI ulkoisia
  kuvia eikä verkkohakuja — standalone ja offline toimivat.
- Laukaisu: pulma avautuu KERRAN pelissä, kun pelaaja saapuu pulman
  kaupunkiin ensimmäistä kertaa (myös aloituskaupunki Kairo — siksi ei
  sidota laattaan eikä tutkimiseen). Ratkaistut pidetään pelitilassa
  (tallennus toJSON/fromJSON).
- Palkinto: oikeasta +25 XP ja isoisän tyytyväinen rivi; väärästä ei
  rangaistusta, vaan oikea ratkaisu näytetään kauniisti. Pulma ei
  koskaan estä etenemistä.
- Ulkoasu: sama pergamenttikortti kuin tietovisassa, otsikko
  "Isoisän luonnoskirjasta". Piirros ensin, kysymysrivi alla.

**Afrikan viisi pulmaa (faktat tarkistetaan, lähteet talteen):**

1. **Kairo — hieroglyfiluvut.** Egyptiläiset numerot: sauva = 1,
   kantapääluu = 10, köysikiehkura = 100, lootus = 1000. Piirroksessa
   kolme lukua hieroglyfeinä arvoineen ja neljäs ilman arvoa — pelaaja
   päättelee järjestelmän. Vaihtoehdot numeroina.
2. **Kumasi — kultapunnukset.** Ashantien messinkipunnukset ja
   kaksivartinen vaaka: vasemmalla kultahiekkapussi ja punnus,
   oikealla punnuksia — mikä punnus tasapainottaa vaa'an? Piirroksessa
   punnusten arvot näkyvissä, yksinkertainen yhteenlasku.
3. **Kapkaupunki — naksutuskielet.** Xhosan naksutusmerkit: c = kielen
   kärki hampaista (kuin paheksuva "tsk"), x = kielen sivu poskesta,
   q = kitalaesta (kuin korkin poksahdus). Piirroksessa kolme suun
   profiilikuvaa nuolineen ja merkit — mikä merkki kuuluu kuvaan X?
4. **Timbuktu — käsikirjoituksen kuunvaiheet.** Käsikirjoitussivu,
   johon on piirretty kuunvaiheiden sarja (uusikuu → kasvava sirppi →
   puolikuu → ?) — jatka sarjaa. Timbuktun käsikirjoituksissa on
   oikeasti tähtitiedettä; fact-teksti kertoo sen.
5. **Sahara — karavaanin vesileilit.** Kaksi piirrettyä leiliä, 3 ja
   5 mittaa, ja isoisän kysymys: miten mittaan tasan 4? Vaihtoehdot
   ovat lyhyitä toimintosarjoja ("Täytä 5, kaada 3:een, …").
   Klassikko, joka sopii karavaanin arkeen.

**Kartan maamerkit (js/packs/africa.js decor + js/mapart.js):**

- Pienet viivapiirrokset vanhojen karttojen tapaan — samaa tyyliä kuin
  nykyinen purjelaiva: **pyramidit** Kairon lounaispuolelle (Giza),
  **Pöytävuoren profiili** Kapkaupungin viereen, **Kilimandžaron
  lumihuippu** vuoren kohdalle ja **dhow-purjevene** Sansibarin
  edustalle.
- Maamerkit myös vihjaavat pulmista: pyramidit ↔ Kairon pulma,
  Pöytävuori ↔ Kapkaupungin pulma. Ei tekstiä karttaan — pelkkä kuva.
- Sijoitus ei saa törmätä nimiin, reitteihin eikä kaupunkeihin —
  koristetestit (decor placement) vartioivat; aja `npm test` ja katso
  kuvakaappaus.

**Testit:** pulmadatan eheys (4 uniikkia vaihtoehtoa, correct-indeksi,
fact, kaupunki on laudalla), kerran-per-peli-logiikka ja tallennus,
maamerkkien sijoitus. Versionostot, standalone, kuvakaappaus pulmakortista
ja kartasta.

## Paketti 13: pulmien variointi (Afrikka) — VALMIS

Omistajan toive: sama pulma on joka pelikerralla vähän erilainen, vaikka
se nojaa graafisesti samaan systeemiin. Piirtofunktiot saavat jo datan
parametrina (`sketchData`), joten grafiikka taipuu tähän suoraan.

**Moottori:**

- Pulma saa valinnaisen `generate(rng)`-funktion (js/packs/
  africa-puzzles.js), joka palauttaa `{ sketch, q, options, correct }`
  — `openPuzzle` kutsuu sitä pelin omalla rng:llä, jos se on määritelty;
  muuten käytetään staattisia kenttiä kuten nyt. `fact`-selite pysyy
  aina samana (se on tarkistettu fakta).
- Determinismi: generointi tapahtuu VAIN avaushetkellä pelin rng:llä,
  ja avattu pulma tallentuu quiz-tilassa kuten nyt — tallennettu peli
  jatkuu täsmälleen samasta pulmasta.

**Generatiiviset pulmat (arvotaan joka peliin):**

1. **Hieroglyfit:** arvotaan kolme esimerkkilukua ja kysytty luku.
   Rajat: jokainen numero 0–3, jotta glyfirivit pysyvät lyhyinä ja
   piirrettävinä; kysytty luku ei saa olla sama kuin mikään esimerkki.
   Väärät vaihtoehdot: numeroiden permutaatiot ja ±10/±100-virheet —
   ei satunnaislukuja, vaan uskottavia lukuvirheitä.
2. **Kultapunnukset:** arvotaan punnussarja (esim. 1, 2, 5, 10 mithqalin
   yhdistelmiä) ja pussin paino niin, että täsmälleen yksi tarjolla
   oleva punnus tasapainottaa vaa'an. Piirros näyttää arvot.
3. **Kuunvaiheet:** arvotaan aloitusvaihe ja suunta (kasvava/vähenevä);
   kahdeksan vaihetta antaa kymmeniä sarjoja. Vaihtoehdot piirretään
   kuunvaiheina, ei sanoina — piirtofunktio osaa tämän jo.

**Käsin kirjoitetut variantit (arvotaan valmiista):**

4. **Naksutusmerkit:** kolme varianttia — kysytään vuoroin c, x tai q,
   ja suuprofiilien järjestys vaihtelee.
5. **Vesileilit:** 2–3 valmiiksi kirjoitettua tavoitetta (4, 2 ja 1
   mittaa) toimintosarjavaihtoehtoineen. Jokainen tarkistettu käsin —
   toimintosarjojen generointi koneella tuottaisi kömpelöä kieltä.

**Testit:** generointi on siemenellä deterministinen; sadalla siemenellä
jokainen generoitu pulma tuottaa 4 uniikkia vaihtoehtoa, correct-indeksi
osuu oikeaan ja hieroglyfiluvut pysyvät piirtorajoissa; kymmenellä
siemenellä syntyy vähintään kaksi erilaista tehtävää per pulma
(variointi todella varioi). Versionostot, standalone, kuvakaappaus.

## Paketti 14: Indiana Jones -lentoanimaatio (paketin 13 jälkeen) — VALMIS

Omistajan toive: kun lennetään, pieni lentokone liitää punaista
reittiviivaa pitkin kohteesta toiseen kuin vanhoissa seikkailufilmeissä,
ja matkan aikana nuori herra sanoo jotain innostunutta ja jännitystä
uhkuvaa kohteesta riippuen.

**Animaatio (js/ui.js + css, EI kosketa js/game.js:ään):**

- Lentokonesymboli kulkee reittiviivaa pitkin lähtökaupungista
  kohteeseen ja punainen viiva piirtyy koneen perässä
  (SVG: getPointAtLength + stroke-dashoffset, rAF; kesto ~2 s;
  kone kääntyy kulkusuuntaan).
- Koskee kolmea lentoa: kartan sisäiset lennot (`actionFly`),
  porttilennot toiselle laudalle (`actionGateway` — animaatio ehtii
  lähtölaudalla ennen laudan vaihtoa) ja **pelin aloitus** (pickstart:
  kone lentää Lontoosta valittuun kohteeseen maailmankartalla ennen
  mantereelle siirtymistä — tämä on se filmihetki, joka avaa pelin).
- Puhtaasti kosmeettinen UI-kerros: pelitila päivittyy kuten ennenkin,
  animaatio näytetään ennen näkymän vaihtoa. `prefers-reduced-motion`
  ohittaa animaation kokonaan. Äänenä nykyinen 'flight'-ääni.
- Animaation aikana kelluva rivi nuorelta herralta kirjoituskoneella.

**Lentorepliikit (tarina.md:n säännöillä, innostunut ääni):**

- Data: pakkaan `texts.flightLines = { cityId: [rivejä] }` +
  `texts.flightDefault = [yleisiä rivejä]` — arvotaan pelin rng:llä.
  1–2 virkettä, minä-muoto, saapumisen jännitys ja odotus. Esim.
  tyyliin: "Siivet kallistuvat ja alla aukeaa Sahara — meri ilman
  rantaa." tai "Kartanlukija sanoi kaksi sanaa: pidä kiinni."
- **Osa riveistä hehkuttaa isoisän päiväkirjaa** (omistajan toive):
  nuori herra selaa kirjaa lennolla ja innostuu siitä, mitä sinne on
  kirjattu — merkittyjä paikkoja, taitettuja sivuja, piirroksia ja
  vihjeitä. Nämä rivit saavat viitata pelin oikeisiin asioihin
  (isoisän merkitsemät kaupungit, luonnoskirjan kaaviot, päiväkirjan
  taitetut sivut) muttei paljastaa mitään täsmälleen. Esim. tyyliin:
  "Selasin kirjaa koko nousun ajan: tälle sivulle isoisä on piirtänyt
  vaa'an ja perään kolme huutomerkkiä." tai "Kirjanmerkkinä on
  taitettu sivu — sillä lukee vain: 'etelään, ja kysy kalastajilta'."
  Suhde noin puolet ja puolet: kohteen odotus / kirjan hehkutus.
- Kirjoitetaan Maailma-laudalle (kaikki lentokohteet) ja Afrikalle
  (porttikaupungit) — muut laudat saavat yleisrivit toistaiseksi.
  HUOM: tämä on ainoa kohta, jossa Maailma-laudan tekstejä saa
  muokata ennen sen omaa sisältöpassia — vain flightLines-lisäys.
- Testit: flightLines-rivien eheys (pituus > 20, uniikkius,
  kohdekaupunki on laudalla), arvonta siemenellä deterministinen.
  Animaatiosta kuvakaappaus.

## Paketti 16: äänet oleellisesti paremmiksi (js/sound.js) — VALMIS

Omistajan kysymys "voiko ääniä parantaa oleellisesti?" — voi. Pysytään
Web Audiossa ilman äänitiedostoja (offline ja standalone säilyvät
kevyinä, ja synteesi istuu käsintehtyyn estetiikkaan). Kolme tasoa:

1. **Tila (suurin yksittäinen parannus).** Generoitu kaiku:
   ConvolverNode, jonka impulssivaste on eksponentiaalisesti laskeva
   kohinapulssi (~1.2 s). Kaikki äänet ajetaan sen läpi (dry/wet-suhde
   ~0.25). Masteriin DynamicsCompressorNode pehmeillä asetuksilla.
2. **Materiaalit.** Äänet rakennetaan kuulostamaan esineiltä:
   - noppa: kohinapurske 2–3 resonoivan bandpass-suodattimen läpi
     (~180/290/430 Hz) = puinen kopsahdus pergamentilla; pomput
     hiljenevät ja kiristyvät.
   - tähti/jalokivet: epäharmoniset kellopartiaalit (soittorasia) —
     esim. perustaajuus + 2.76x + 5.4x omilla vaimenemisillaan.
   - kolikko: FM-synteesi (modulaattori ~3.5x kantoaalto, nopea
     vaimennus) = metallinen kilahdus.
   - passin leima: matala siniläiskä (~80 Hz) + kohinaklikki.
   - lento: potkurihurina koko kalvokohtauksen ajaksi — saha-aalto
     alipäästön läpi, LFO moduloi voimakkuutta ~14 Hz, nousee ja
     laskee kohtauksen mukana (kesto FLY_OVERLAY_MS).
   - laiva: kaksi hieman eri vireistä kanttiaaltoa alipäästön läpi =
     sumutorvi; oikea/väärä vastaus: lyhyt puhdas terssi / vaimea
     matala "hmph" ilman piippausta.
3. **Väsymisen esto.** Jokaiseen soittoon ±3 % satunnainen vire- ja
   voimakkuusheitto (Math.random käy — äänet eivät ole pelitilaa).
   Usein toistuvat äänet (askel, klikki, kirjoituskone) pidetään
   erityisen hiljaisina ja lyhyinä.

Reunaehdot: ei uusia tiedostoja eikä riippuvuuksia; sfx-rajapinta
(play-nimet) säilyy, jotta ui.js ei muutu paitsi lennon
aloitus/lopetus (esim. sfx.startFlight()/stopFlight() tai kesto
parametrina); äänet luodaan laiskasti käyttäjän eleestä kuten nyt
(iOS vaatii); kokonaisvoimakkuus ei saa nousta nykyisestä.
Kuuntele oikeasti: aja peli Playwrightilla ja tallenna ääninäyte tai
vähintään tarkista konsolista, ettei soitto heitä virheitä millään
äänellä. Versionostot ja testit kuten aina (sound.js:lle savutesti:
jokainen SOUNDS-nimi soi ilman poikkeusta OfflineAudioContextissa).

## Muistilista jokaiseen pakettiin

- `npm test` vihreänä; uudet ominaisuudet saavat omat testinsä.
- Versionosto sw.js + main.js.
- `node tools/build-standalone.mjs` onnistuu (uudet tiedostot myös
  MODULES-listaan ja sw.js SHELL-listaan).
- Kuvakaappaus ennen/jälkeen, jos muutos näkyy ruudulla.
- Suomenkieliset commit-viestit; pienet PR:t, yksi paketti per PR.

## PYYDETTY: maailmanradio omaksi karttatilakseen

Omistajan määrittely 4.8.2026:

> "Maailmanradio pitää toimia niin, että kun sen laittaa päälle,
> kytkeytyy uusi tila karttanäkymään, missä kaupungit toimivat itsessään
> play-nappeina. Eli kaikki muu toiminto häviää, kaupungin matkakirja saa
> päivittyä, mutta ilman luenta-ääntä."

> "Painamalla kaupunkia alkaa sen maan kanava pyöriä välittömästi. Ja
> alalaidassa voisi olla yksinkertainen radiosoitin, missä olisi ainakin
> stop-nappi sekä tiedot kanavasta. Siitä voisi tehdä visuaalisesti
> mahdollisimman hienon ja vanhan tyylisen näköisen."

> "Myös kanavan tiedot saisivat tulla sen radion päälle niin, että siinä
> olisi nestekidenäyttö. Tekstillä täytyy olla erilainen, eli sellainen,
> missä kirjaimet koostuvat lähellä olevista pisteistä. Piirtotyyli olisi
> suoraviivainen ja yksinkertainen."

Ja perään:

> "Sitten oikeassa yläreunassa olisi X-nappi, mistä radiotila saisi
> suljettua. Radio saisi uudelleen käyntiin klikkaamalla matkalaukusta
> radioesinettä."

### Mitä tästä seuraa

**Radio on ESINE matkalaukussa, ei nappi yläpalkissa.** Tämä ratkaisee
sen, miten linssit yleensäkin avataan: löydetty linssi menee laukkuun,
ja laukusta sen ottaa käyttöön. Sama kuvio kelpaa kaikille yhdelletoista
linssille, joten laukku on linssivalitsin — erillistä valitsinta ei
tarvita.

**Radiotila on tila eikä kerros.** Muut linssit piirtävät kartan päälle;
radio muuttaa sen, mitä kaupungin napautus tekee. Siksi `kerros: false`
ja oma päälle/pois-rajapinta.

**Ilman luentaääntä on ehto eikä yksityiskohta.** Kaupungin matkakirja
päivittyy, mutta kertoja vaikenee: kaksi ääntä yhtä aikaa on sekasotku.

**Sammunut kaupunki on tunnistettava etukäteen.** Kanava on 87 maalla,
kaupunkeja on 248. Ilman eroa pelaaja napauttaa turhaan.

### Kytkentä js/ui.js:ään (pääistunnon työ)

1. Matkalaukkuun radioesine, joka avaa tilan.
2. X-nappi oikeaan yläreunaan, joka sulkee sen.
3. Kaupungin napautus radiotilassa: kanava päälle, ei muuta.
4. Luentaäänen vaimennus tilan ajaksi.
5. Muun toiminnan (noppa, matkustus, laatat, tietovisa) esto.

## JONOSSA: kuvat loppuun ja maastonimien tekstit uusiksi

Omistajan pyyntö 4.8.2026, tehtäväksi radiotöiden jälkeen:

> "Tarkasta vielä puuttuvat kuvat matkakirjoista loppuun, sekä kirjoita
> vuorien ja jokien ja muiden infotekstit uudestaan. Ne taitavat olla nyt
> suoraan Wikipediasta ja ovat liian pitkiä. Niitä voisi myös vähän
> elävöittää käyttämällä lainauksia ja ripottelemalla kuvia tekstin
> sekaan. Täysi Wikipedia-teksti, joka on jo tehty, voisi olla vaikka
> sitten lopussa pienen linkin takana."

### 1. Kuvat loppuun

248/248 kaupungilla on kuvakortti, mutta **20 kaupungilta puuttuu vanha
vedos**: Riad, Sana, Salalah, Dubai, Doha, Teheran, Persepolis, Astana,
Magadan, Churchill, Iqaluit, Boa Vista, Santarém, Santa Cruz, Campo
Grande, San Ambrosio, Kap Horn, Exmouth, Honiara, Norfolk.

Näille Commonsista ei löytynyt riittävän suurta (yli 1200 px) aitoa
1800–1900-luvun alun valokuvaa ensimmäisellä haulla. Toinen kierros
kannattaa hakea muualta kuin Commonsista: Library of Congress,
Internet Archive, kansalliskirjastot, Nationaal Archief.

Tarkistettava erikseen: **Karachin** vanha kuva on vuodelta 1946 eikä
näytä kaupunkia, ja **Panaman** kortti on kopioituna kahdessa paketissa.

### 2. Maastonimien tekstit

Nyt `js/packs/maasto-nimet-vedet.js` ja `-vuoret.js` sisältävät
`selitys`-kentän, joka on kirjoitettu Wikipedian pohjalta. Ne ovat
tietoa mutta eivät tarinaa: liian pitkiä ja liian tietosanakirjamaisia.

Mitä tilalle:

- **Lyhyempi ja elävämpi.** Yksi ajatus, ei tiivistelmä.
- **Lainauksia.** Matkakertomukset, tutkimusmatkailijoiden päiväkirjat,
  runot — 1800-luvun aineisto on public domainia ja sopii pelin ääneen.
  Lainaus on se, mikä erottaa tekstin Wikipediasta.
- **Kuvia tekstin sekaan**, ei vain alkuun.
- **Täysi Wikipedia-teksti pienen linkin taakse loppuun.** Se on jo
  haettuna eikä sitä heitetä pois — se vain siirtyy pois tieltä.

Tämä koskee 123 jokea, 38 järveä ja 52 vuoristoa = 213 tekstiä.

## v231 — nimenvaihto, kuvake ja kartan sauma (4.8.2026)

**PÄIVITYS v233 (4.8.2026): omistaja tarkensi nimen.** Pelin koko nimi on
**Matkakirja ja unohdettu aarre**, lyhyt nimi arjessa ja kotivalikossa
**Matkakirja** (ytimekkäämpi). Yläpalkki ja short_name käyttävät lyhyttä,
title/manifest-name/README koko nimeä. Reponimen vaihtoa EI enää tehdä —
repo saa pysyä Matkakirjana. Sanasto: docs/tarina.md.

Alkuperäinen v231-kirjaus (nimi tarkentui myöhemmin, ks. yllä):
Pelin nimi on Unohdettu aarre. Matkakirja
jää tarinan keskusesineeksi — isoisän kirjaksi — eikä ole enää pelin nimi.
Vaihdettu: manifest, index.html, tyohuone*.html, README, css-otsake, ui.js:n
palaute- ja artikkelitekstit. **Ei vaihdettu** (tietoinen päätös): sw.js:n
cache-etuliite, localStorage-avaimet, `window.matkakirja`, `dist/matkakirja.html`,
repon nimi. Niiden vaihto rikkoisi offline-päivityksen turhaan.

**Kuvake.** `assets/icon.svg`:n kultainen viisisakarainen tähti Afrikan päällä
korvattiin kultaisella ◈-vinoneliöllä — samalla merkillä kuin pelin
aarrelaatoissa. Se siirtyi samalla pallonpuoliskojen väliin keskelle: aarre ei
ole minkään maanosan päällä. Generaattori on `tools/make-icons.mjs`; SVG:tä ei
muokata käsin.

**Kartan sauma — kolme vikaa samassa paikassa.**

1. *Ruutuja ei pyydetty sauman toiselta puolelta.* Näkyvä alue ulottuu laudan
   oikean reunan yli, ja sen täyttää `<use>`-kopio, joka näyttää laudan VASENTA
   reunaa. Ruudukko rajattiin väliin [0, W] eikä koskaan pyytänyt niitä
   vasemman reunan ruutuja, joita kopio tarvitsi. Kartta loppui pystysuoraan
   saumaan. Korjaus: sarake otetaan modulo laudan leveys.
2. *Ruutu suureni pyöristyksessä.* `Math.round(W / ruutu)` antoi yleiskuvassa
   yhden sarakkeen, eli ruudusta tuli koko maailma: 12000 yksikköä yhteen 1100
   pikselin kuvaan — neljä kertaa liian karkea, ja **4,7 sekuntia** yhtä ruutua.
   Korjaus: `Math.ceil`, jolloin ruutu pysyy aina pikselibudjetin sisällä.
3. *Vanhentunut piirtosarja ajettiin loppuun.* `taideSkaala` päivittyy vain
   funktion alussa, eikä alkuun päässyt niin kauan kuin piirto oli kesken.
   Zoomaus jäi odottamaan koko vanhentunutta sarjaa. Korjaus: mittakaava
   luetaan ruudulta joka ruudun välissä ja sarja katkaistaan kesken.

Lisäksi tyhjää ruutua (pelkkää merta) ei muistettu lainkaan, joten se
rasteroitiin uudestaan joka kerta kun näkymä asettui. `RUUTU_TYHJA` erottaa
tyhjän epäonnistuneesta — epäonnistunutta ei saa muistaa, tai selain jossa
rasterointi ei toimi jäisi lopullisesti tyhjäksi.

Mitattuna (Chromium, 1400×900, maailmankartta): käynnistys **12,5 s → 6 s**,
panorointi täyttyy 13–33 ms, zoomaustaso tarkentuu 2,5–5,8 s kuluessa ja vanhat
ruudut pysyvät näkyvissä sen ajan.

**Kuitattu 4.8.2026:** omistaja raportoi ensin vierityksen tökkivän erityisesti
Macin selaimella. Ruutukorjausten jälkeen: *"Vieritys näyttäisi hyvin
toimivan."* Syy oli siis sama kuin sumeudella — ruudusta tuli koko maailman
kokoinen, ja jokainen ruutu maksoi mitattuna 4,7 sekuntia pääsäikeessä.
Macin isompi ikkuna vain teki oireesta näkyvämmän. Erillistä
`<use>`-kopion piirtoalaa ei tarvinnut epäillä.

### Opittua

**Rajaus, joka suojaa yhtä virhettä, voi aiheuttaa toisen.** Ruudukko rajattiin
laudan leveyteen, jotta tyhjä ruutu ei peittäisi kierron kopiota. Sama rajaus
esti pyytämästä niitä ruutuja, joita kopio tarvitsi. Rajan molemmat puolet on
katsottava.

**Pyöristys lähimpään voi kasvattaa.** `round` valittiin siksi, että se on
tarkin — mutta budjetin kanssa oikea suunta on aina se, joka pysyy budjetissa.
`ceil` ei ole tässä likiarvo vaan sääntö.

**Muutosloki on pelaajatekstiä, ei historiaa.** Rivi "Tähti-sanat pois: aarre on
nyt pääaarre" jäi kolmeksi versioksi ruudulle, koska tiedoston oma ohje sanoo
etteivät vanhat rivit muutu. Sitova nimistö koskee kaikkea, mikä piirtyy — myös
sitä, mikä kertoo vanhasta nimestä. Nyt vartijatesti lukee lokin.

## v234 — saapumiszoomi, sauman vara ja hitaampi lento (4.8.2026)

**Saapumisliuku myös isolla laudalla.** Ennen liuku ohitettiin
maailmankartalla kokonaan, koska se olisi alkanut kokonäkymästä — ja juuri
sitä ei haluttu nähdä. Hinta oli, ettei saapumisessa ollut liikettä lainkaan:
kartta oli yhtäkkiä perillä. Nyt liuku alkaa `MANNER_LAAJUUS`-kertaisesta
näkymästä eli mantereen kokoisesta ruudusta, ja se on puhdas laajuuden muutos
saman keskipisteen ympärillä — mikään ei lennä ruudun poikki.

Alkuasennon keskipiste luetaan **lopullisesta panoroinnista eikä lasketa
kohteesta**. Kiertävällä kartalla `panX` on normalisoitu välille `[-jakso, 0)`
ja kohde voi näkyä ruudulla kierron kopion kautta; kohteesta laskettu piste
olisi silloin maailman leveyden verran pielessä ja liuku lentäisi koko kartan
poikki.

**Rajaus kohdemantereen puolelle.** Omistajan havainto: *"nyt kartta keskittää
kaupungin ja Tangerin kohdalla näkyy Eurooppaa yhtä paljon kuin Aasiaa."*
`mantereenKeskitys` siirtää näkymän keskipistettä puolet matkasta oman
mantereen kaupunkien painopisteeseen, rajattuna neljäsosaan näkyvästä alasta.
Painopiste lasketaan kaupungeista eikä mantereen muodosta — kaupungit ovat se,
mitä pelissä tehdään, ja ne ovat valmiina laudan koordinaateissa. Kiertävällä
kartalla jokainen kaupunki tuodaan ensin lähimmäksi kohdetta, tai
Beringinsalmen yli ulottuva Aasia antaisi painopisteen keskeltä Atlanttia.
Mitattuna: Tanger asettuu kohtaan 27 % / 30 %, eli Afrikka täyttää ruudun ja
Euroopasta jää yläreunan kaistale.

**Loitonnuksen vara.** Omistaja: *"siinä näkyy sama paikka kahteen kertaan, kun
se on kokonaan zoomattu ulos."* Tasan laudan levyinen näkymä on teoriassa
oikein, mutta paneelin pikselileveys on murtoluku ja pyöristys vie
reunimmaisen kaistaleen. `SAUMAN_VARA` (3 %) jättää sen aina piiloon.
Korjaus vaati kaksi kohtaa: `rajaaSkaala` **ja** `fitViewBox`, jossa oli oma
kopio samasta rajasta — vain toisen korjaaminen ei muuttanut mitään, ja se
näkyi mittauksessa (osuus pysyi 1.000 neljällä ruutukoolla).

**Lento repliikin mittaiseksi.** Omistaja: *"lentokoneen pitää lentää
hitaammin koska tekstin luku kestää paljon kauemmin."* Kesto lasketaan nyt
sanamäärästä (`LENNON_POHJA_MS + sanat × LENNON_SANA_MS`, yläraja 15 s) eikä
kiinteästä 4,8 sekunnista. Sanoista eikä merkeistä: silmä lukee sanan
kerrallaan, ja lyhyet suomen sanat vetäisivät merkkilaskurin arviota väärään
suuntaan. Avauslento kestää nyt noin 11 s.

**Ohita lento -nuoli.** Kalvon sai jo ennen hypäytettyä perille napauttamalla
mistä tahansa, mutta sitä ei näkynyt mistään. Pieni kärki oikeaan alanurkkaan,
joka syttyy 3,5 s kuluttua opasiteettiin 0.3. Huomaamattomuus on tässä
vaatimus eikä makuasia: nuoli on samalla ruudulla kuin se repliikki, jonka
lukemiseen lennon kestoa juuri pidennettiin — jos se vetää katseen, se vie
huomion pois siitä mitä varten aikaa lisättiin.

### Opittua

**Sama raja kahdessa paikassa on sama kuin ei rajaa.** Loitonnuksen katto oli
kirjoitettu erikseen `rajaaSkaala`-metodiin ja `fitViewBox`-runkoon. Metodin
korjaaminen ei muuttanut ruudulla mitään, koska sitä ei kutsuttu siitä
kohdasta, joka oikeasti päätti. Mittaus kertoi sen heti; koodin lukeminen ei
ollut kertonut.

**Poistettu animaatio on myös menetetty tieto.** Liuku poistettiin isolta
laudalta hyvästä syystä (kokonäkymä oli väärä lähtökohta), mutta sen mukana
katosi se, minkä liike kertoo: mistä tullaan ja minne. Oikea korjaus ei ollut
poistaa liikettä vaan vaihtaa sen lähtökohta.

## v235 — maastonimet vaakaan (4.8.2026)

Omistaja: *"Uralin nimikyltistä ei saa selvää. Nimet voisi kirjoittaa aina
vaakasuuntaan ja saa olla kyllä isommalla."*

Joen nimi seurasi uomaa `textPath`illa ja vuoriston nimi jonon kulmaa. Se oli
tarkoituksellista — kommentti sanoi sen olevan "se kohta, joka tekee kartasta
kartan eikä luettelon" — mutta pohjois-eteläinen jono kääntää nimen pystyyn, ja
pystyssä oleva nimi on kyltti jota ei lueta. Ural on aineistossa −87 astetta ja
Andit −84, eli käytännössä pystysuoria.

Nyt kaikki nimet kirjoitetaan vaakaan, ja fontti on 15 px → 19 px. Nimi
kirjoitetaan yhä siihen kohtaan kohdetta, joka on lähinnä ruudun keskustaa,
joten joen nimi osuu uomalle vaikkei seuraakaan sitä.

Samalla versionumeron hover: yleinen `button:hover` maalasi napin tummalla, ja
se osui myös versionumeroon — työpöytäselaimessa numeron päälle ilmestyi musta
suorakaide keskelle karttaa. Numero on merkintä pergamentilla eikä nappi; nyt
se vain tummuu.

### Opittua

**Perusteltu ratkaisu voi silti olla väärä reunatapauksessa.** Kaartuva nimi on
oikea valinta idässä–lännessä kulkevalle joelle ja väärä pohjoisesta etelään
kulkevalle vuorijonolle. Kommentti perusteli säännön hyvin mutta ei kertonut,
missä se lakkaa pätemästä — ja juuri siellä se rikkoutui.

## v237 — hampurilainen pois, radiotila puhtaaksi (4.8.2026)

**Hampurilainen poistettiin.** Omistaja: *"Hampurilaisen voisi poistaa ja jättää
tilalle pelkän sääntöikonin ja uuden pelin ikonin. Päivitys ja kehittäjätila
löytyisivät kaikki napsauttamalla versionumeroa oikeassa alareunassa."*

Ylärivillä ovat nyt säännöt ja uusi peli suorina ikoneina. Päivitys ja
kehittäjätila siirtyivät muutosloki-ikkunaan, joka aukeaa versionumerosta —
versionumeron takaa etsitään juuri sitä, mikä versioon liittyy. Lokin oma
toimintopainike sulkee lokin ensin, koska kehittäjätila avaa oman modaalinsa
eikä kahta päällekkäistä `<dialog>`-modaalia saa olla auki.

**Radiotila puhdistettiin.** Omistaja: *"Piilota Matkakirja ja alanapit radion
ollessa käytössä. Poista myös yläreunan x. Riittää kun radiosta saa
suljettua."* Bodyn `radio-tila`-luokka piilottaa matkakirjan kortin,
toimintonapit ja karttavihjeen `visibility`illä — ei `display`illä, jotta
kartan asettelu ei hyppää radion syttyessä. Erillinen X-nappi poistettiin:
soittimessa on jo virtakytkin, joka sammuttaa koko tilan, ja kaksi sulkutapaa
samalle tilalle on yksi liikaa.

**Pelin nimi kahdelle riville puhelimessa.** "Unohdettu aarre" katkesi kolmeen
pisteeseen 390 pikselin ruudulla. Kahdella rivillä nimi mahtuu kokonaan ja
vie 121 px entisen ~155 px sijaan, joten kukkaropilleri sai lisää tilaa.

**Radio (rinnakkainen työ, neljä kohtaa).** Virityssuhinan ristifeidaus nyt
molemmissa päissä tasatehoisena 0,6 s vaihtona; viritysnauha etenee 4–6
nykäisynä pienellä ylityksellä lukittuessaan; kanavalistan takana neljä
epäsymmetristä lämmintä lamppua ja lasilla oma heijastuskaari; VU-mittari
seuraa lähetystä `crossOrigin`-reitityksellä, varareittinä sama osoite ilman
sitä (asema soi, vain lukema jää saamatta).

### Opittua

**Kaksi tapaa tehdä sama asia on yksi liikaa.** Radiotilan sulkuun oli sekä
X-nappi että soittimen virtakytkin. Molemmat toimivat, mutta kytkin on se,
joka kuuluu laitteeseen — ja X ruudun kulmassa kilpaili sen kanssa
kertomatta kumpi on oikea.

**Piilota mitalla, älä poistamalla.** `display: none` olisi romahduttanut
kartan asettelun radion syttyessä ja palauttanut sen sammuessa. `visibility`
säilyttää mitat, joten kartta pysyy paikallaan — käyttäjälle radio vain
himmentää muun pois.

## v238 — neljä porttia löysi maailmankartan (4.8.2026)

**New York, Los Angeles, Rio ja Sydney veivät vanhalle mannerlaudalle.**
Omistaja: *"Jos lennän aloitusnäytöltä New Yorkiin, niin tulee vanha kartta,
joka ei ole edes skrollattavissa. Tapahtuukohan sama myös muihin kaupunkeihin
mentäessä?"* Tapahtui — kolmelle muulle.

Aloitusruudun (`maailma`) neljästätoista portista **kymmenen** avasi
`maailmankartan` ja **neljä** avasi suoraan vanhan mannerlaudan. Ne ovat 1000
yksikköä leveitä eli KAPEAMPIA kuin näkymä, joten panoroitavaa ei ollut
lainkaan (`panVara: 0`), eikä niissä ole maastoa, jokia tai nimiä.

Korjaus: neljälle portille `maailmankartta` listan ensimmäiseksi, kuten
kymmenellä muulla. Vanha mannerlauta jäi toiseksi linkiksi. Testi
"porttien linkit ovat vastavuoroisia" hajosi heti — paluuportteja oli
kymmenen eikä neljätoista — ja se korjattiin sekä generaattoriin
(`tools/tee-maailmankartta.mjs` PALUUPORTIT) että pakettiin kohdennetusti,
koska pakettia ei saa luoda uudelleen.

**Saapumisessa ei enää välähdä koko maailma.** Omistaja: *"näkyy ensin koko
maailmankartta, sitten se vain hyppää lähemmäs ja sitten vasta zoomaa."*
Saapumiszoom ajastettiin vasta lentokalvon poiston jälkeen, joten kalvon 280
ms:n häivytyksen ajan sen läpi näkyi laudan kokonäkymä. Nyt näkymä asetetaan
ennen häivytystä, jolloin kalvon takaa paljastuu suoraan liu'un lähtöasento.

Tämä paljasti toisen asian: `mannerZoomTarpeen()` palauttaa falsen niin
kauan kuin `flight-active` on päällä, joten pelkkä kutsun siirto ESTI
zoomauksen kokonaan. Mitattuna näkyvä leveys jäi 11 640 yksikköön koko
saapumisen ajaksi. Lippu on purettava ensin.

Lähtölaajuus 2,6 → 3,6 omistajan pyynnöstä ("aloita zoomaus hieman
kauempaa"). Mitattu sarja saapumisesta: 5697 → 2819 → 1585 → 1583 yksikköä.

**Pelin nimi pienemmäksi puhelimessa.** 1,05 rem vei kahdellakin rivillä 121
px ja kukkaropilleri katkesi. 0,86 rem vie 91 px, ja pilleri mahtuu
kokonaan 390 ja 430 pikselin ruuduilla.

### Opittua

**Siirretty kutsu on eri kutsu.** Saapumiszoomin siirto muutaman rivin
verran ylöspäin näytti puhtaalta järjestyskorjaukselta, mutta se siirsi
kutsun ehdon väärälle puolelle ja sammutti koko toiminnon. Testit eivät
huomanneet mitään — vasta selaimesta mitattu näkyvän alueen leveys kertoi
sen. Animaatiota ei voi tarkistaa lukemalla.

**Osittain korjattu on helpompi jäädä huomaamatta kuin kokonaan rikki.**
Kymmenen porttia neljästätoista vei uudelle kartalle, joten satunnainen
kokeilu näytti toimivalta. Vika löytyi vasta kun omistaja sattui
valitsemaan yhden neljästä.

## v240 — Tutki taitetuksi lehdeksi (4.8.2026)

Omistaja: *"Tutkissivusta pitää tehdä kuin taitettu lehti… poistetaan nuo
keskellä olevat valintanapit kokonaan. Pelaaja voi yksinkertaisesti
pyyhkäistä sivuja eteenpäin, jolloin seuraavalle sivulle avautuisi aina yksi
aihealue kerrallaan ja sen alueen otsikko lukisi ylhäällä."*

Liuskarivi poistettiin. Sivu 1 on kaupunki + maa + ensimmäinen aihe; sivut
2…n yksi aihe kerrallaan, otsikko ylhäällä. Lontoolla sivuja on yhdeksän, ja
määrä luetaan aineistosta. Pyyhkäisy vaatii 60 px vaakamatkan JA
kaksinkertaisen ylivoiman pystyyn nähden — muuten artikkelin lukeminen
heittäisi sivua vahingossa. Työpöydällä myös nuolinäppäimet ja hillityt
nuolet laidoissa, sekä sivunumero.

**iPadin kadonneet kuvat — mitattu mekanismi, päätelty laukaisin.**
Kolme tunnettua WebKit-ansaa suljettiin pois oikealla WebKitillä mitaten:
kuvat olivat DOM:issa ja latautuivat 4/4 kaikilla kuudellatoista
ruutuleveydellä 320–1440. Ainoa polku, joka voi hävittää kuvan kokonaan, on
`asetaKuva`:n virhereitti `() => kuva.remove()` — ja siihen riittää YKSI
virhe silloin kun peilin katkaisija on lauennut, koska silloin peiliosoite
ja varaosoite ovat sama Commons-osoite eikä varareittiä ole. Mitattu:
`{ peiliJaVaraSama: true, kuvaVielaSivulla: false, lapsia: 0 }` — ei
rikkinäistä kuvaa eikä aukkoa, vaan tyhjä. Miksi juuri iPad: katkaisijan
tila elää `sessionStoragessa` koko istunnon, ja iPadilla peli on
kotivalikkoon asennettuna pitkissä istunnoissa. Sitä ei voitu vahvistaa
omistajan laitteelta, ja se sanotaan suoraan.

Korjaus: osoitteita kokeillaan vuorotellen kolmesti, kuvaa ei koskaan
poisteta, ja epäonnistunut jää `hidden`-tilaan seuraavaa avausta varten.

**Mitatut kuvaleveydet** (sama Chromiumilla ja WebKitillä): 390 → 360 px,
430 → 400, 820 → 652, 1024 → 479 (kelluu tekstin seassa), 1440 → 575
(kelluu). Ennen kaikilla 451–508 px riippumatta ruudusta.

**Suurennus** on nyt `transform: none` (oli `rotate(-1.2deg)`), täydessä
koossa ja ilman ilmestymisanimaatiota. Se avautuu vain napautuksesta, jossa
osoitin liikkui alle 10 px.

### Opittua

**Selaimen oma toiminto voi syödä eleen.** Pyyhkäisy kuoli heti kun se alkoi
kuvan päältä: selaimen kuvanraahaus lähetti `pointercancel`in. Yhden rivin
korjaus (`draggable = false`), mutta se löytyi vain kokeilemalla oikeassa
selaimessa.

**Virhereitti, joka poistaa elementin, on peruuttamaton.** `kuva.remove()`
näytti siistiltä siivoukselta, mutta se hävitti ainoan paikan, josta
seuraava yritys olisi voinut alkaa. Piilotus jättää oven auki; poisto
muuraa sen.

## v244 — VU-mittari, Panama ja merisyvyyden umpikuja (4.8.2026)

**VU-mittari.** Reititys hylättiin, jos `ctx.state !== 'running'`. Selain luo
AudioContextin tilaan `suspended`, ja se herää vasta käyttäjän eleestä — radion
sytytys ON ele, mutta konteksti ehtii syntyä ennen kuin selain merkitsee sen
käynnissä olevaksi. Reititystä ei silloin tehty kertaakaan eikä neulalla ollut
mitään luettavaa. Reitityksen saa rakentaa pysäytetyllekin kontekstille; se
alkaa kuljettaa ääntä heti kun konteksti herää.

Mitattu paikallisella virralla korjauksen jälkeen: neula 16 eri kulmaa,
−43,5°…+40,4°, laitteen tila `soi`. **Oikeita asemia ei voi testata tästä
ympäristöstä** — ne eivät soi proxyn läpi — joten CORS-käyttäytyminen jää
omistajan laitteen varaan.

**Panama** oli sekä `northamerica-` että `southamerica-valokuvat.js`:ssä, ja
maailmankartalla molemmat ladataan. Poistettu eteläisestä; Panama City on
Pohjois-Amerikassa.

**Merisyvyyden katkokset: umpikuja, ja se kannattaa kirjata.** Aineistossa on
50 pystysuoraa leikkausjanaa. Yleistin `yhdista-paivamaararaja.mjs`:n lukemaan
myös syvyyspaketin ja korjasin parinmuodostuksen tunnistamaan sauman yli
menevät parit (x −166,7 ja 11833,3 ovat sama pituuspiiri; suora vertailu löysi
50:stä yhden parin, modulo-vertailu kolme).

Kolmen parin yhdistäminen **kasvatti katkosten määrän 50:stä 60:een** —
liitetty rengas tuottaa itse uusia pystysuoria jaksoja. Muutos peruttiin.
Rannikolla toiminut tekniikka ei siis siirry sellaisenaan syvyysvyöhykkeisiin:
ne ovat sisäkkäisiä monikulmioita, joiden leikkausreunat eivät ole toistensa
peilikuvia. Oikea korjaus on todennäköisesti projisoida vyöhykkeet uudelleen
laudan omalla saumalla (175°W) eikä korjata jälkikäteen. Työkalun yleistys ja
modulo-vertailu jäivät talteen.

### Opittua

**Mittaa ennen kuin uskot korjauksen onnistuneen.** Yhdistäminen näytti
onnistuvan (renkaita 73 → 72), mutta sama mittari, joka löysi ongelman, kertoi
että tulos oli huonompi kuin lähtötilanne. Ilman jälkimittausta olisin
julkaissut regression parannuksena.

## v245 — Paperin rae ruudun pikseleihin, pidempi kanavanvaihto (4.8.2026)

**"Kartta näyttää kuolleelta lähempää zoomattuna."** Syy löytyi lopulta
rakeisuudesta, ja se oli mittayksikössä. Paperin kuituhäiriö piirretään
kuviona, jonka laatta on **laudan koordinaateissa** (160 yksikköä). Kuvio siis
suurenee yhdessä kartan kanssa: koko maailma näkyvissä yksi rae on noin 16
pikseliä eli hienoa hiekkaa, mutta kaupungin kohdalle zoomattuna sama rae venyy
satoihin pikseleihin — pehmeäksi läiskäksi, jota ei erota tasaisesta väristä.
Pinta ei siis kadonnut mihinkään; se suurennettiin näkymättömäksi.

Rasteroidussa ruudussa rae piirretään nyt vasta canvakselle, **ruudun omissa
pikseleissä** (`piirraRakeisuus`, tavoitekoko 110 px). Laudan kokoinen
kuviosuorakaide jätetään samalla ruudun ulkopuolelle (`pilkoTaide`), jottei
sama pinta ole kahdesti. Elävään SVG:hen suorakaide jää, koska rasteroimaton
kartta tarvitsee sen yhä.

Ruudun tarkkuus ei ole vakio — katto on 1100 pikseliä ja retinanäytöllä piirto
on kaksinkertainen — joten raekoko suhteutetaan siihen, montako canvas-pikseliä
vastaa yhtä ruudun pikseliä. Ilman sitä rae olisi eri kokoinen eri laitteilla ja
eri zoomaustasoilla, eli sama vika uudestaan pienempänä.

Mitattu Chromiumissa tasaiselta maaväriltä (400×400 px):

| | keskihajonta | vaihteluväli |
|---|---|---|
| ilman raetta | **0,00** | 231–231 |
| rae 110 px | **3,68** | 212–231 |

Nolla on kirjaimellisesti kuollut pinta: jokainen pikseli oli sama.

**Kanavanvaihdon loppupää 0,6 s → 1,4 s.** Omistaja kuuli kohinan mutta ei
vaihtoa lainkaan ja arveli itse syyn oikein: "voisiko olla, että se häivytys on
vain liian nopea?" Kyllä. Tässä luki ennen, että pidempi jättäisi lähetyksen
ensimmäisen lauseen kohinan alle — se ei pidä paikkaansa, koska kanava soi jo
vaimennettuna koko vähimmäisajan, eli lukitushetkellä ollaan joka tapauksessa
keskellä lausetta. Alkupää jää 0,6 sekuntiin: sen on mahduttava
siirtymävaiheen (1,25 s) sisään.

### Opittua

**Mittayksikkö on osa toteutusta, ei muotoseikka.** Rae oli koko ajan
paikallaan ja koodi teki juuri sitä, mitä siinä luki. Vika oli siinä, ETTÄ SE
OLI SIDOTTU VÄÄRÄÄN AVARUUTEEN: pinta, joka kuuluu katsojan silmään, oli
sidottu maailmaan. Kolme edellistä yritystä (varjostuksen vahvistus, palettien
lämmitys) hakivat vikaa väristä, koska oire näytti värivialta. Sama testi olisi
löytänyt sen heti: mittaa hajonta lähellä, ei kaukana.

### Kuvavelka: mitä löytyi ja mitä ei (v245)

Kolme erillistä kuvavelkaa selvitettiin kerralla. Tulos on enimmäkseen
kielteinen, ja juuri siksi se kannattaa kirjata: samaa hakua ei tarvitse
tehdä uudestaan.

**Karachi vaihdettu.** Uusi pääkuva on Wellcome Collectionin 1897 vedos Old
Townin Rampart Row'lta (3069 × 2463 px, CC BY 4.0). Vanha 1946 Malir-kuva
siirtyi lisäkuvaksi, ei hukattu. Frere Hallista, Merewether-tornista ja
satamasta EI ole yhtään yli 1200 px:n vanhaa vedosta Commonsissa.

**Kuudestatoista kaupungista onnistui kaksi.** Darfur (1958, 3735 × 2787,
CC BY-SA 4.0) ja Magadan (1931, 1280 × 905, PD — Nagajevanlahden ensimmäiset
talot). Loput 14 tarkistettiin kategoriapuu kerrallaan, eikä syy ole
laiskuus:

- **Dubai, Astana, Iqaluit, Boa Vista, Santarém, San Ambrosio, Norfolk** —
  Commonsissa ei ole vaadittua kuvaa lainkaan. Norfolkin aidot vanhat
  vedokset (Tyrrell 1898, Hurley 1910) ovat siellä 1024 px:n levyisinä.
- **Doha ja Salalah** — kuva on olemassa mutta **albumilehden skannauksena**.
  RAF:n 1934 Doha-kuvat ovat 2033 × 3000 px, mutta itse valokuva lehden
  alalaidassa on noin 1040 px ja loput on tyhjää paperia. Rajattu versio jää
  siis rajan alle. *Jos 1040 px kelpaa, kuva on saatavilla — oma päätöksesi.*
- **Exmouth** — kaupunki perustettiin 1963, joten vanhaa kuvaa ei voi olla.
- **Ahaggar, Mosambik** — löydöt eivät ole tunnistettavasti oikeasta
  paikasta.

**Kolme "ulkoista kuvaa" — lähtötilanne oli väärin ymmärretty.** Ne eivät
ole paketeissa lainkaan eivätkä lataudu mistään; ne ovat vain ehdokkaita
`tools/ulkoiset-kuvat.json`-tiedostossa. Kuvaputki osaa vain Commons-
tiedostonimen (`valokuvaUrl` → peili tai `commonsUrl`), eikä `osoite`-
kentälle ole tukea missään. Magadan ratkesi Commons-vastineella. Santa Cruz
ja Kap Horn jäävät: kummallekaan ei ole Commonsissa vastinetta (Santa Cruzin
koko 410 tiedoston kategoriapuussa vanhin valokuva on 1960-luvulta; Kap
Hornista kaikki ennen 1960 on maalauksia ja merikarttoja).

Tarkistimet ajon jälkeen: 1172 kuvakohtaa, 0 rikkinäistä, ei
kaksoisavaimia. Ikätarkistin 9/99 (oli 10).

## v246 — Meren vuoto maalle, VU-mittarin oikea syy (4.8.2026)

**Meren sinisyys vuoti maiden päälle** (omistajan kuvakaappaus: Itämeren,
Mustanmeren ja Punaisenmeren ympärillä vaalea sävy peitti kokonaisia
maakuntia). Syy on aineistojen eri tarkkuus: syvyysvyöhykkeet ovat omaa
aineistoaan eivätkä tunne tämän kartan rantaviivaa, joten matalikko
(0–200 m, `#b9c8ce`) ulottuu rannan yli maalle.

Järjestys ei korjaa tätä. Lähivesikerros on staattisen taiteen PÄÄLLÄ, ja
samassa kerroksessa ovat joet ja järvet, joiden pitää olla maan päällä.
Rajaus koskee siis vain merenpohjaa: uusi `clipPath#meri-rajaus` päästää
läpi sen, mikä on kehyksen sisällä mutta rantaviivojen ulkopuolella.

**Yksi polku ja `evenodd`, ei kahta elementtiä.** clipPathin lapset
yhdistyvät summana, joten suorakaide ja rantaviivat erillisinä antaisivat
pelkän suorakaiteen. Samassa `d`:ssä parillisuussääntö tekee halutun.
Mitattu Chromiumissa (200 × 200 px, "maa" keskellä):

| | maan päällä | merellä |
|---|---|---|
| `evenodd` | **rajattu pois** | näkyy |
| `nonzero` | näkyy (väärin) | näkyy |

Sama vika korjattiin kerran jo toiseen suuntaan: maan korostussävy valui
mereen ja rajattiin rantaviivan sisään (`maa-rajaus`). Tämä on saman rajan
toinen puoli.

**VU-mittari: oikea syy löytyi vasta nyt, ja se on selaimen turvasääntö.**
Kaksi edellistä korjausta (v239 reititys, v244 pysäytetty konteksti) olivat
oikeita korjauksia oikeisiin vikoihin, mutta ne eivät voineet auttaa, koska
este on tämä:

> `createMediaElementSource` antaa pelkkiä nollia, jos ääni tulee toiselta
> palvelimelta eikä palvelin lähetä CORS-otsakkeita. Ja jos pyydämme
> CORSia palvelimelta joka ei sitä anna, LATAUS EPÄONNISTUU KOKONAAN.

Siksi koodissa on varareitti, joka avaa aseman uudelleen ilman CORS-pyyntöä.
Se pelastaa lähetyksen, mutta jättää mittarin pysyvästi ilman lähdettä.
Nettiradioasemista valtaosa ei lähetä CORS-otsakkeita — eli neula makasi
levossa lähes joka asemalla, täsmälleen kuten omistaja kolmesti raportoi.

**Tätä ei voi korjata mittaamalla.** Vaihtoehtoja on kaksi: kuollut neula
tai liikkuva neula, jonka lukemaa ei oikeasti mitata. Valittu on
jälkimmäinen, ja se sanotaan koodissa suoraan: **lukema on jäljitelty, ei
mitattu**. Mitattu lukema käytetään aina kun se on saatavilla; jäljitelmä
korvaa vain sen, mikä ennen oli tyhjä.

Kaksi asiaa jäljitelmässä on silti totta, ja ne riittävät tekemään siitä
uskottavan: se seuraa äänenvoimakkuutta (kerroin luetaan elementin omasta
`volume`-arvosta, joten nuppi ja ristihäivytys näkyvät neulassa), ja se
vaikenee kun lähetys vaikenee (puskuroinnin aikana elementti on `paused`).

Liike on kolmen sinin summa eikä satunnaislukuja. Jaksot ovat
yhteismitattomia (noin 7 s, 0,9 s ja 0,3 s) eli lause, tavu ja äänteen
särmä. Mitattu vaihteluväli 0,34–0,96 ja keskimääräinen liike 0,73
asteikkoa sekunnissa ennen vaimennusta. Satunnaisluvut näyttäisivät
tärinältä, eivät puheelta — VU-mittari on keskiarvomittari, joka ei
nykähtele.

**Kanavanvaihdon häivytys 1,4 s → 0,9 s** omistajan pyynnöstä.

### Opittua

**Kun sama vika palaa kolmannen kerran, vika ei ole toteutuksessa vaan
oletuksessa.** Kaksi ensimmäistä korjausta olivat kumpikin oikein ja
kumpikin mitattu toimivaksi — paikallisella virralla, joka sattuu olemaan
samaa alkuperää. Oletus, jota ei koskaan tarkistettu, oli että oikeat
asemat käyttäytyvät kuin testivirta. Ne eivät käyttäydy, eikä sitä olisi
voinut mitata tästä ympäristöstä lainkaan. Silloin on parempi lukea
selaimen sääntö kuin mitata uudelleen.

## v247 — VU-mittarin oikea vika: neula oli vasteessa, ei nollassa (4.8.2026)

Edellinen versio päätteli, että CORS estää mittauksen lähes joka asemalla.
**Se päätelmä oli väärä, ja sen näki mittaamalla.** Tämän ympäristön proxy
päästi läpi 12 asemaa 110:stä, ja niistä **11 eli 92 % lähettää
`Access-Control-Allow-Origin`-otsakkeen**. Icecast lähettää sen
oletuksena. Mittaus on siis useimmiten täysin mahdollinen, eikä
jäljitelmää olisi pitänyt tarjota ennen kuin oikea syy on löydetty.

### Mitä selain oikeasti sallii (mitattu kahdella paikallisella palvelimella)

| reitti | CORSiton palvelin | CORS-palvelin |
|---|---|---|
| `createMediaElementSource` ilman crossOriginia | **RMS 0** (mykistyy) | — |
| `createMediaElementSource` + `crossOrigin` | **NotSupportedError** | **RMS 0,31** |
| `audio.captureStream()` | **SecurityError** | — |

Aidosti CORSittomalle asemalle ei siis ole reittiä lainkaan — se osa
edellisestä päätelmästä piti paikkansa. Lisäksi mitattu: **CORS-palvelin,
joka ohjaa CORSittomaan (`302`), kaataa latauksen** — ja moni osoite on
juuri tällainen uudelleenohjaus (`playerservices.streamtheworld.com`).
Kahden CORS-palvelimen välinen ohjaus toimii.

### Oikea vika: mittayksikkövirhe, sama laji kuin kartan rakeisuudessa

Reititys toimi. Lukema meni asteikon yläpäästä ulos.

Laitteen asteikko (−48 dB … −20 dB) on mitoitettu VIRITYSÄÄNELLE, joka
kulkee pelin äänisumman kautta vaimennettuna. Lähetys ei kulje siellä vaan
menee suoraan kontekstin ulostuloon täydellä tasollaan:

| äänenvoimakkuus | taso | vanhalla asteikolla |
|---|---|---|
| 1,0 | −13,0 dB | **1,25** |
| 0,5 | −15,8 dB | **1,15** |
| 0 (viritys) | −120 dB | 0 |

Yli yhden menevä lukema rajautuu ykköseen: **neula löi ääriasentoon ja jäi
sinne.** Se ei maannut nollassa vaan seisoi vasteessa, mikä näyttää yhtä
rikkinäiseltä — ja koko virityksen ajan peli pitää `audio.volume`-arvon
nollassa, joten neula todella oli nollassa juuri sen ajan, jonka pelaaja
katsoo sitä tarkimmin.

Uusi asteikko on mitattu lähetykselle: **−40 dB … −6 dB**, ja
äänenvoimakkuus jaetaan pois, koska se kulkee mittauspisteeseen asti.
Oikea VU-mittari näyttää ohjelman tason eikä nupin asentoa. Jakaja on
pohjattu (0,15), ettei häivytyksen alku räjäytä lukemaa.

Mitattu korjauksen jälkeen: voimakkuus 1,0 → **0,81**, voimakkuus 0,5 →
**0,89**, mykkä → 0. Neula elää siinä mitassa, jota varten se on.

Analysaattori tehdään nyt `liitaMittariin`-ketjussa eikä soittimessa,
koska asteikko on lähetyskohtainen. Soittimen oma asteikko jää
viritysäänelle, jolle se on mitoitettu.

Jäljitelty lukema (v246) jää vain sille tapaukselle, jossa reititystä ei
oikeasti saada — eli aidosti CORSittomille asemille, joille selain ei anna
mitään reittiä.

### Opittua

**"Ei liiku" ei kerro kummassa päässä se ei liiku.** Koko edellinen
päätelmäketju rakentui sen varaan, että neula makaa lepokulmassaan, eli
että signaalia ei ole. Mitattuna signaali oli olemassa ja niin kova, että
se meni asteikosta yli. Yksi mittaus asteikon TOISESTA päästä olisi
kaatanut väärän selityksen ennen kuin se ehti kahteen versioon.

## v249 — Mittarin vahti, matkakirjan otsikko, rantaviivan rajaus (4.8.2026)

**VU-mittari jäi kanavanvaihdossa taustakohinan tasolle.** Omistaja
päätteli syyn itse ja osui suoraan: "mittaus ei koskaan palaudu takaisin
aseman mittaustasolle, vaan jää siihen taustakohinan mittaustasolle, kun
kaupunkia vaihtaa."

Juuri niin koodi oli rakennettu. Kanavanvaihto antaa mittarin takaisin
pelin äänisummalle (`lopetaAani` → `asetaMittarinLahde(null)`), koska
silloin kuuluu viritysääni. Lähetys otetaan takaisin **yhdessä ainoassa
kohdassa**, `lukitseAsema`ssa. Jos se kohta jää käymättä — asema ei ehdi
lukittua, `playing` ei tule, vaihto osuu kesken virityksen — mikään ei enää
koskaan palauta mittaria lähetykseen. Neula jää lukemaan pelin äänisummaa,
jossa lähetystä ei ole, ja pysyy siinä myös takaisin vaihdettaessa: mikään
ei ole rikki, lähdettä ei vain aseteta uudestaan.

**Kertaluontoinen asetus oli väärä muoto.** Lähde on TILA, jota pitää
ylläpitää niin kauan kuin asema soi. Vahti tekee sen sekunnin välein: yksi
sulkeuman vaihto, ei uusia solmuja. Se korjaa koko vikaluokan kerralla,
myös ne reitit, joita en osannut kuvitella — enkä osannut: ajoin oikean
moduulin selaimessa läpi vaihdon A → B → A sekä CORSin sallivalla että
CORSittomalla B-asemalla, ja neula eli kaikissa kuudessa vaiheessa
(23–25 eri kulmaa). Vikaa ei siis saanut toistettua täällä lainkaan, ja
juuri siksi korjauksen on oltava sellainen, joka ei vaadi syyn tuntemista.

Lukija luodaan kerran virtaa kohti eikä joka tikillä: jäljitelty lukija
laskee aikaa omasta alustaan, ja uusi sulkeuma joka sekunti nollaisi sen.

**Matkakirjan yhden rivin lappu sai otsikkonsa takaisin.** v243 jätti
riville pelkän kaupungin nimen ilman taustaa, ja omistaja huomautti siitä
heti: "Ainut, mikä näkyy, on kaupungin nimi täysin irrallaan." Nimi yksin
kartan päällä ei kerro olevansa matkakirjasta — se näyttää yhdeltä kartan
paikannimeltä lisää, ja juuri erottuminen oli koko lapun tarkoitus.

Rivi on nyt kaksisarakkeinen ruudukko (otsikko + kaupungin nimi)
pergamenttitaustalla. Kaikki muu jää toiselle riville, jonka korkeusraja
leikkaa pois — sisältö pysyy asettelussa, joten kutistuminen liukuu yhä.
Laatikko on täsmälleen sisältönsä levyinen, joten se saa myös ottaa
napautukset vastaan; aiemmin läpinäkyvä kaistan levyinen laatikko joutui
päästämään ne lävitseen.

**Merenpohjan rajaus piirrettyyn rantaviivaan.** v246:n rajaus rakennettiin
`map.outlines`-pisteistä janoina, mutta piirretty rannikko ei ole niistä
vedetty monikulmio vaan sen pehmennetty ja käsin heiluteltu versio
(`kasinPiirretty` + `smoothClosedPath`). Pisteitä on noin 280 per manner,
joten kaari ja jana eroavat lahden levyisesti. Rajaus tehdään nyt samasta
datasta kuin piirto (`rantaviivanPolut`).

Mitattu vaikutus (maapikseli rajauksen kanssa ja ilman, sinikanava):
Sahara −5, Puola −3, Kongo −2, avomeri 0. Rajaus siis poistaa sinisen
maalta eikä koske mereen.

**Mitattu myös, mikä EI ole vuotoa.** Zoomaustasolla, jolla lähivesi
häivähtää esiin, Eurooppa näyttää vaalealta — mutta se on pohjakartan oma
väri, ei meri: kun lähivesikerros piilotetaan kokonaan, Euroopan pikseli
muuttuu 207,183,137 → 206,186,143 eli tuskin lainkaan. Kerros on
rasteroidussa laatassa alla, ja vaalea ilme tulee siitä, että Euroopan
alangoilla ei ole korkeusvyöhykettä.

### Opittua

**Kun vikaa ei saa toistettua, korjaa muoto älä tapausta.** Kolme versiota
etsi yksittäistä rikkinäistä kohtaa. Vika oli siinä, että oikea arvo
asetettiin kerran ja toivottiin sen pysyvän. Ylläpidetty tila ei tarvitse
selitystä sille, mikä sen rikkoi.

## v250 — Maa erottuu merestä, hampurilainen takaisin (4.8.2026)

**"Meren sinisyys vuotaa maiden päälle" — neljäs yritys, ja tällä kertaa
mitattuna oikein.**

Ensin oikaisu: v249:n päätelmä "meri ja maa ovat täsmälleen sama väri" oli
**väärä**, ja väärä juuri siitä syystä, jota vastaan olen tässä
tiedostossa varoittanut. Poimin kaksi pistettä silmämääräisesti
kuvakaappauksesta ja vertasin niitä — ja **molemmat osuivat maalle**. Ero
oli tietysti yksi yksikkö. Silmämääräinen näytteenotto ei ole mittaus.

Oikea mittaus luokittelee pisteet RANTAVIIVAN perusteella: ruudun piste
muunnetaan laudan koordinaateiksi ja testataan monikulmion sisäisyys
`map.outlines`-renkaita vasten. Siitä saa satoja pisteitä kumpaakin lajia
eikä kahta arvausta.

Mitattu (zoomaustaso, jolla omistaja oireen näki):

| | maa | meri | ero |
|---|---|---|---|
| kauempana rannasta | 190,163,117 | 212,199,168 | 22,36,51 |
| **rannan tuntumassa** | 182,157,113 | 197,182,150 | **15,25,37** |

Ero ei siis ollut olematon — mutta se oli PIENI, ja nimenomaan rannan
tuntumassa, missä sillä on merkitystä. Maan liukuväri
(`#e7d2a4` → `#d2b47e`) oli niin lähellä pergamenttia, että rannikkoa
erotti käytännössä vain mustepiirto. Silmä täyttää sellaisen rajan sillä,
kumpi puoli on suurempi — ja avomeri on suurempi.

Maan väri on nyt `#e2c898` → `#cba86e`: sama lämmin sävy, selvästi
tummempi ja kylläisempi. Korkeusvyöhykkeet piirtyvät tämän päälle kuten
ennenkin. Rannan tuntuman ero kasvoi noin puolitoistakertaiseksi.

**Mitä matkan varrella suljettiin pois, jottei sitä tarvitse toistaa:**

- Merenpohjan rajaus TOIMII. Mitattu maapikselin sinikanavasta rajauksen
  kanssa ja ilman: Sahara −5, Puola −3, Kongo −2, avomeri 0.
- Kartalla ei ole yhtään sinistä elementtiä. Kävin läpi jokaisen laudan
  elementin lasketun `fill`- ja `stroke`-arvon ja etsin sävyjä, joissa
  sininen ≥ punainen: osumia yksi, ja se on nappulan kiilto.
- Vaalea ilme EI ole lähivesikerros. Kun kerros piilotetaan kokonaan,
  Euroopan pikseli muuttuu 207,183,137 → 206,186,143.

**Hampurilainen takaisin** (omistajan toive). v237 nosti säännöt ja uuden
pelin suoraan yläriville, koska hampurilainen piilotti ne kolmen
napautuksen taakse. Ylärivi kävi kuitenkin ahtaaksi: nimilogon ja neljän
kuvakkeen välissä päiväpilleri leikkautui kesken sanan puhelimella
(omistajan kuvakaappaus: "£300 · Päivä 3, a"). Päivitys ja kehittäjätila
jäävät versionumeron taakse, minne ne v237:ssä siirrettiin — ne eivät ole
ylärivin tavaraa, ja sama tunniste kahdessa paikassa rikkoisi
`getElementById`:n.

Mitattu: valikko aukeaa, sisältää Säännöt ja Uusi peli, 106 × 52 px, ei
sivuvirheitä.

### Opittua

**Silmämääräinen näytteenotto ei ole mittaus.** Otin kaksi pistettä
kuvakaappauksesta, sain eroksi yhden yksikön ja julistin sen syyksi. Ne
olivat molemmat maalla. Kun näyte pitää luokitella, luokittelu on tehtävä
aineistosta — ei silmällä siitä samasta kuvasta, jonka epäselvyys on koko
tutkittava ilmiö.

## v251 — Yksi herkkyys, hillitty merisyvyys, palkki ja valikko (4.8.2026)

**VU-mittari: herkkyyttä ei enää vaihdeta lainkaan.** Omistajan linjaus:
"pidä koko ajan pelkän kaupungin herkkyys päällä ja kohinan mittaus jää
pois. Eli ei vaihdeta herkkyyttä."

Tässä oli kolmen version vika. Mittarin lähdettä VAIHDETTIIN: kanavanvaihto
antoi sen pelin äänisummalle (viritysääni, laitteen asteikko −48…−20 dB) ja
lukittuminen otti sen takaisin lähetykselle (−40…−6 dB). Kaksi asteikkoa ja
neljä vaihtokohtaa — ja jos yksikin vaihto jäi tekemättä, neula jäi väärälle
asteikolle lopullisesti. Kolme korjausyritystä etsi sitä yhtä vaihtoa, joka
jää väliin. Yhtään ei löytynyt, koska vika ei ollut missään yksittäisessä
vaihdossa vaan siinä, **että vaihtoja on**.

Lähde asetetaan nyt kerran radiotilan alkaessa eikä sen jälkeen koskaan. Se
on pysyvä sulkeuma, joka katsoo joka lukemalla mikä virta on soiva ja lukee
sen lähetysasteikolla. Vaihtokohtia ei ole yhtään.

**Maan sävy eri zoomeilla — omistajan kysymys, ja vastaus oli ei.**

Ensimmäinen mittaus keräsi ruudukon RUUDULTA, mikä vertasi Saharaa kaukaa ja
Puolaa läheltä — se ei kerro zoomista mitään. Oikea mittaus ottaa **samat
laudan pisteet** joka zoomilla ja projisoi ne ruudulle.

| näkymän leveys | maa | meri | ero |
|---|---|---|---|
| 20000 | 192,161,110 | 222,204,168 | 131 |
| 15556 | 189,157,107 | 220,202,167 | 128 |
| 14370 | 190,163,117 | 213,199,169 | 101 |
| 13580 | 191,167,125 | 206,195,170 | **88** |

Maa siis siniseni **+15** zoomatessa, ja maan ja meren ero kutistui
kolmanneksen. Juuri se on omistajan "meri vuotaa maiden päälle lähempää".

**Syy eriteltiin sulkemalla kerroksia yksi kerrallaan** (lähin zoom):

| tila | maa |
|---|---|
| kaikki näkyvissä | 191,167,125 |
| rajaus pois | 190,171,135 |
| joet ja järvet pois | 192,167,125 |
| merisyvyys pois | 193,162,111 |

Omistajan arvaus "ehkä joet tekee sen" **ei pidä paikkaansa**: jokien ja
järvien piilotus muutti maata yhden yksikön. Syy on merisyvyys. Rajaus
poistaa vuodosta noin 40 %, ja loput tulee siitä, ettei kahden eri
tarkkuuden rajaa saa osumaan yhteen pikselilleen — rajauksen reunalle jää
muutaman pikselin kaistale, joka lähikuvassa lukeutuu maaksi.

Vyöhykkeiden peittävyys pudotettiin noin kolmasosaan (0,22 → 0,07 jne.).
Mitattu jälkeen: maan sinisiirtymä **+15 → +5**, ja lähikuvan maa–meri-ero
88 → **114** (kaukaa 131).

**Matkakirjan palkki oli liian pitkä.** `grid-template-columns: auto
minmax(0, 1fr)` — `1fr` söi kaiken vapaan tilan, joten palkki venyi kaistan
levyiseksi vaikka `width: max-content` oli asetettu. max-content laskee
raidat, ja 1fr-raita ilmoittaa haluavansa kaiken. Nyt `auto auto`.

**Äänet ja taikalasit hampurilaisen alle** (omistajan toive). Ylärivillä on
enää nimilogo, päiväpilleri ja hampurilainen. Molemmilla siirretyllä on oma
alivalikko, joten ne EIVÄT sulje päävalikkoa napautuksesta — muuten
alivalikko katoaisi samalla napautuksella, jolla se aukesi. Mitattu:
valikossa neljä riviä, Äänet avaa alivalikkonsa päävalikon pysyessä auki,
Säännöt sulkee.

### Opittua

**Kun korjaus ei pidä, poista se kohta jossa se voi pettää.** Mittarin
lähde korjattiin kolmesti asettamalla se oikein yhdessä lisäkohdassa. Vasta
neljäs korjaus poisti asettamisen kokonaan — yksi lähde, ei yhtään
vaihtoa. Sama muoto kuin v249:n vahdissa, mutta vietynä loppuun asti:
vahti ylläpitää tilaa, tämä ei tarvitse tilaa lainkaan.

## v252 — Sininen pois vedestä, palkki ja logo mittaan (4.8.2026)

**Sininen pois kaikista vesielementeistä** (omistajan linjaus). Vesi
erottuu nyt vaaleudella ja tummuudella, ei värillä — samasta
sepiaperheestä kuin kartan muu muste (`--sea-ink` #6e6350). Muutetut:
merisyvyyden neljä vyöhykettä, lähiveden järvi ja matalikko, joen kolme
vetoa (ranta, uoma, valo), vesistönimien teksti ja meriaskelmat
(`.step-sea`).

Tarkistettu koko tyylitiedosto ja `js/mapart.js` läpi hakemalla jokainen
sävy, jossa sininen ≥ punainen: vesielementeissä ei ole enää yhtään.
Jäljelle jääneet viileät sävyt ovat linssikuvake, lentokohteen rengas,
topaasi ja nappulan kiilto — ei yksikään vettä.

**Matkakirjan palkki oli yhä koko kaistan levyinen, ja syy oli
mitattavissa.** `width: max-content` ei riittänyt: leikattu merkintä on
yhä ruudukossa rivillä 2, ja sen leveys **339 px** venytti ensimmäisen
sarakkeen samaan mittaan. Ruudukko mitoittaa sarakkeen kaiken sisältönsä
mukaan, myös sen, mikä on häivytetty näkymättömiin.

Piilossa oleville lapsille annettiin `width: 0` ja `overflow: hidden`,
jolloin niiden osuus mitoituksesta on nolla (silloin myös `min-width:
auto` ratkeaa nollaan). Ne pysyvät asettelussa, joten kutistuminen liukuu
yhä. Mitattu: palkki **406 px → 171 px** (kaista 406 px), sarakkeet
104,75 px + 42,98 px.

**Logon rivit täsmälleen yhtä leveiksi.** Alanimellä oli kiinteä
`letter-spacing: 0.34em`, ja sen leveys oli mitä sattui olemaan —
kirjainväli ei tiedä, kuinka leveä sana MATKAKIRJA on. Rivien välissä on
viiva, joten ero näkyi heti. Nyt `text-align-last: justify` venyttää
ainoan rivin täyteen leveyteen. Mitattu: ylärivi 85,3 px, alarivi 85,3
px, **ero 0**.

Tämä pätee myös toisella kirjasimella: leveys tulee asettelusta eikä
kirjainmitoista — ja se on tässä olennaista, koska tämän ympäristön
selaimessa ei ole pelin kirjasimia eikä kirjainten mittaan voi täällä
luottaa.

### Opittua

**Näkymätön sisältö on yhä sisältöä mitoitukselle.** Palkkia yritettiin
kaventaa kahdesti: ensin `width: max-content`, sitten `1fr` pois. Kumpikaan
ei purrut, koska mitoitusta ei ohjannut se, mikä näkyi, vaan se, mikä oli
piilossa saman sarakkeen alapuolella. `opacity: 0` ja leikkaava
korkeusraja piilottavat silmältä mutta eivät asettelijalta.

## v253 — Vieritys takaisin sujuvaksi, maastonimet mittaan, logo (4.8.2026)

**"Kartan vieritys tökkii taas" — ja "taas" oli oikea sana.** Vika tuli
mukana v245:ssä, samassa versiossa kuin paperin rae.

Rae maalattiin ruudulle kuviotäyttönä (`createPattern` + `setTransform`)
multiply-sekoituksessa. Se on oikea lopputulos mutta väärä tapa: selain
laskee kuvion muunnoksen ja sekoituksen pikseli kerrallaan. MITATTU
1100 × 1100 ruudulle:

| tapa | aika |
|---|---|
| kuviotäyttö + multiply | **28,9 ms** |
| valmis laatta + multiply | **2,6 ms** |
| pelkkä pohjaväri | 0,3 ms |

Ruutuja syntyy panoroinnin aikana useita, joten 28 ms per ruutu on juuri
se tökkiminen. Rae laatoitetaan nyt kerran valmiiksi ruudun kokoiseksi
kankaaksi, ja ruutuun se menee yhtenä `drawImage`-kutsuna. Ulkonäkö on
täsmälleen sama — multiply ja peittävyys ennallaan, vain toisto on
laskettu etukäteen. **Yksitoistakertainen ero.**

Kankaat välimuistissa raekoon mukaan, katto kolme (yksi kangas ~5 Mt).

*Rehellisyyden nimissä:* tämän ympäristön päästä päähän -mittaus ei
vahvista parannusta, koska headless-selaimen kehysvauhti on katossa
30 fps:ssä (mediaani 33,3 ms kaikissa tiloissa, myös kerrokset
poistettuina). Yksikkömittaus ruudun hinnasta on yksiselitteinen, ja se
on juuri se työ, joka panoroinnin aikana tehdään.

**Maastonimet kaupunkien nimien kokoisiksi.** Kaupungin nimi on 18
LAUDAN yksikköä: se kutistuu ruudulla, kun karttaa loitontaa. Maastonimi
oli kiinteä RUUDUN pikseleissä (15…23 px) eli ei kutistunut lainkaan —
ja kasvoi siksi loitontaessa yhä suuremmaksi suhteessa kaupunkeihin,
kunnes Volga oli moninkertainen Helsinkiin nähden. Nyt maastonimi on
18 × 1,18 laudan yksikköä: sama mitta plus kaunokirjoituksen pieni lisä,
koska kursiivi ja vaaleampi muste luetaan pienemmäksi kuin ne ovat.

**Nimet syttyvät vasta kun kaupunkien nimet näkyvät.** Raja ei ole enää
laudan leveys vaan se, kuinka suurena kaupungin nimi piirtyy RUUDULLE —
juuri se on "näkyykö kaupunkien nimiä". Mitattu:

| askel | näkymä | maastonimiä | maastonimi | kaupunki |
|---|---|---|---|---|
| 0–4 | 20000–14370 | 0 | – | 1,1–4,3 px |
| 5 | 13580 | 4 | 6,0 px | 6,4 px |

**Logon rivit tasavälein.** v252:n `text-align-last: justify` teki rivit
yhtä leveiksi mutta venytti SANAVÄLIN, ei kirjainvälejä — keskelle jäi
kuoppa. Alanimi on nyt flex-rivi, jossa jokainen kirjain on oma
elementtinsä ja `justify-content: space-between` jakaa välit tasan.
Mitattu: ylärivi 85,3 px, alarivi 85,3 px, ja **jokainen kirjainväli
2,06 px** — pienin ja suurin sama.

### Opittua

**Sama kuva, eri hinta.** Rae näytti samalta molemmilla tavoilla, joten
mikään katselu ei olisi paljastanut eroa — vain kello. Kun jokin alkaa
tökkiä sen jälkeen kun ulkonäköön on koskettu, epäile ensin sitä
muutosta, vaikka se näyttäisi viattomalta: multiply-sekoitus koko ruudun
yli on pikselityötä, ja pikselityö kertautuu ruuduilla.

## v254 — Joen nimi paikalleen, merisyvyys pois, vesi vaimeammaksi (4.8.2026)

**"Joen nimi vain kerran. Nyt lukee monta kertaa."** Syy oli rakenteessa,
ei nimilogiikassa: maastonimien kerros oli `root`in sisällä, ja kiertävä
kartta monistaa `root`in `<use>`-kopiona laudan leveyden verran oikealle.
Vedelle ja maalle se on oikein — molemmat puolet ovat samaa maastoa.
NIMELLE SE EI OLE: nimi on merkintä kartalla, ei osa maastoa, ja kopio
kirjoitti sen toistamiseen.

Kerros on nyt `<use>`-kopion sisar. Se liikkuu ja skaalautuu yhä kartan
mukana, koska panorointi tehdään viewBoxilla eikä ryhmän muunnoksella.
Sauman yli menevän nimen paikan hoitaa jo `saumasiirto`.

**"Joen nimi hyppii uusiin paikkoihin kun karttaa katsoo eri paikassa."**
Tässä oli liikkuva ankkuri: nimi kirjoitettiin siihen uoman pisteeseen,
joka oli lähinnä ruudun keskustaa, jotta pitkä joki saisi nimensä sinne
minne pelaaja katsoo. Ajatus oli hyvä ja lopputulos huono — jos paikka
riippuu katseesta, jokainen panorointi siirtää sitä.

Painetussa kartassa joen nimi on yhdessä kohdassa uomaa ja pysyy siinä;
jos katsoo muualle, nimi jää näkymättömiin. Ankkuri on nyt uoman
KESKIMMÄINEN piste: se ei riipu näkymästä, joten mikään ei voi valita
sitä uudelleen.

**Merisyvyys pois käytöstä.** Vyöhykkeet olivat neljän raportin lähde:
sinistä maalla, maan sävy eri zoomeilla, tökkivä vieritys. Rajaus poisti
vuodosta vain noin 40 %, peittävyys jouduttiin pudottamaan kolmasosaan
(0,07) — ja siltikin kerros maksoi 82 polkua ja 317 000 merkin
rajauspolun uudelleen joka panorointiaskeleella. Hinta täysi, hyöty lähes
olematon. Aineisto ja piirtäjä jäävät paikalleen; yhden rivin palautus
tuo ne takaisin.

**Vesi vielä vaimeammaksi.** Omistaja raportoi joesta sinisenä vielä
senkin jälkeen, kun sinistä ei enää ollut. Mitattu elävästä puusta juuri
ennen tätä versiota:

| kerros | väri |
|---|---|
| uoma | rgb(183,168,136) |
| valojuova | rgb(231,220,192) |
| ranta | rgb(135,122,97) |
| järvi | rgb(198,183,149) |

Kaikki lämpimiä. Vika oli kirkkaudessa: vaalea nauha lämpimän
pergamentin päällä LUETAAN viileäksi. Sama ilmiö kuin maan ja meren
rajalla — silmä vertaa, ei mittaa. Valojuova tummennettiin ja
vaimennettiin (0,40 → 0,28), uoma ja ranta samoin.

**Topografialinssin vedet samaan musteeseen.** Linssin oma paletti oli
yhä sinistä (`#264e91`, `#8cbee4`, neljä merivyöhykettä). Omistajan
linjaus koskee kaikkea vettä, myös linssiä.

### Opittua

**Kun raportti toistuu vaikka mittaus sanoo muuta, mitattiin väärää
asiaa.** Sinistä etsittiin sävyistä, ja sävyt olivat lämpimiä joka
kierroksella. Silmä ei kuitenkaan lue sävyä irrallaan vaan suhteessa
ympäristöön: kirkas vaalea viiva lämpimällä pohjalla näyttää viileältä.
Oikea mitta ei ollut väri vaan kontrasti.

## v255 — Joet pois pohjakartalta, uusi kuvake taikalaseille (4.8.2026)

**Omistajan päätös:** "Ota joet pois kokonaan. Täytyy tehdä niistä vaikka
oma linssi, missä näkyisi vain pelkät joet ja järvet. Nykyinen on liian
sekava."

Päätös ratkaisee kerralla koko sen sarjan, joka alkoi v246:sta: vesi
maalla, maan sävy zoomin mukaan, viileä välke, tökkivä vieritys. Jokainen
niistä johtui samasta asiasta — vesi piirrettiin maan päälle samalle
kartalle, jolla luetaan kaupunkeja ja reittejä. Kuusi versiota yritti
sovittaa kahta karttaa yhteen ruutuun. Oma linssi antaa vesistöille oman
ruudun, jossa ne saavat olla niin selkeitä kuin haluavat.

Poistettu pohjakartalta:

- joet ja isot järvet staattisesta taiteesta (`drawMaasto`)
- koko lähivesikerros (uomat, järvet, matalikot) — kerrosta ei enää luoda
- vesistöjen nimet (`drawMaastonimet`): nimi ilman uomaa on pahempi kuin
  ei nimeä lainkaan, sillä kaunokirjoitettu "Tonava" tyhjän maan päällä ei
  kerro mitään

Vuoristot jäävät: ne ovat pohjakartan omaa maastoa, ja niiden nimet ja
korkeusvyöhykkeet piirtyvät ennallaan. Kaikki vesiaineisto
(`map.maasto.joet`, `.jarvet`, vesistönimet) jää paikalleen linssiä
varten; vain piirto pohjakartalta on poissa.

**Taikalasien kuvake: silmälasit.** Suurennuslasi oli linssivalitsimessa,
mutta se on jo Tutki-napissa — sama kuvake kahdessa eri toiminnossa on
pahempi kuin osuva ja tylsä (omistaja: "suurennuslasikuvake on jo
toisessa napissa"). Lasit sopivat myös nimeen: linssit ovat pelissä
TAIKALASIT, eivät suurennuslaseja.

### Seuraavaksi

Vesistölinssi (joet ja järvet omalla ruudullaan) ja Tutki-ikkunan
luettavampi kirjasin.

## v256 — Tutki-sivu luettavaksi lehdeksi (4.8.2026)

Omistaja: "Se on tällä hetkellä vaivalloinen lukea, kun tekstiä on niin
paljon." Ja: "Kuvataide ja muut vastaavat pääotsikot saisivat olla paljon
isommalla, vähän kuin sanomalehdessä… tekstiä pitäisi vähän elävöittää
poldauksilla tai muilla nostoilla."

**Vika näkyy jo mitasta.** Yhden kategorian sivulla on 4–7 nostoa à noin
500–650 merkkiä eli kolmisen tuhatta merkkiä yhtenäistä tekstiä — ja se
oli KIRJOITUSKONEKIRJASIMELLA, yhtenä kappaleena nostoa kohti.
Kirjoituskone on pelin ääni ja oikea valinta otsikoihin, nappeihin ja
kartalle, mutta pitkän leipätekstin lukeminen sillä on työlästä:
tasalevyisessä kirjasimessa kaikki kirjaimet ovat yhtä leveitä, joten
sanoilla ei ole muotoa, josta silmä tunnistaa ne vilkaisulla.

**Muutokset:**

- **Lukukirjasin** (`--font-luku`): Iowan Old Style ja varapino. Se on
  iOS:n oma lukukirjasin ja jo pelissä kartan kaupunkinimissä, joten
  uutta latausta ei tule. Leipäteksti 1,02 rem, rivinkorkeus 1,62, rivin
  mitta enintään 68 merkkiä — typografian vanhat nyrkkisäännöt pitkälle
  tekstille.
- **Osaston otsikko** kuin sanomalehdessä: 1,45 rem, keskitetty,
  harvennettu, paksu viiva yllä ja ohut alla. Epäsymmetria on
  tarkoituksellinen — kaksi samanpaksuista viivaa näyttäisi taulukolta.
- **Kappalejako**: yksi tekstimuuri kahdeksi kappaleeksi virkkeen
  rajalta.
- **Lihavoitu aloitus** ensimmäisiin sanoihin — juuri se "poldaus", jota
  omistaja pyysi. Sanamäärä on kiinteä: kone ei osaa päättää, mikä kohta
  on tärkeä, mutta alku on aina alku.
- **Anfangi** sivun ensimmäiseen kappaleeseen, kerran sivua kohti.
- **Sitaattinosto** kerran sivulla, viivojen väliin.

**Kaksi vikaa kiinni esikatselussa ennen julkaisua** — kumpikin sellainen,
jonka olisi huomannut vasta omistaja:

1. *Virkejako ei osannut suomea.* Ensimmäinen versio katkaisi jokaisesta
   pisteestä, ja suomen JÄRJESTYSLUVUSSA on piste: "…10. kesäkuuta 1735
   astui voimaan laki…" katkesi luvun jälkeen, ja sitaattinosto alkoi
   keskeltä virkettä sanalla "kesäkuuta". Nyt piste päättää virkkeen vain,
   jos sen edellä ei ole numeroa ja jäljessä on väli ja iso kirjain tai
   numero. Ei takaumakatsetta (lookbehind), koska sitä ei ole vanhemmissa
   iOS-Safareissa.
2. *Sitaatti luki saman lauseen, joka alkoi kahden rivin päästä.* Virke
   poimittiin mistä tahansa nostosta ja osui juuri seuraavaan. Nyt virke
   otetaan ENSIMMÄISESTÄ nostosta ja nosto sijoitetaan sen jälkeen:
   lehdessä nosto kaikuu sitä, minkä lukija on jo lukenut — ei sitä, mitä
   hän on juuri lukemassa.

### Opittua

**Esikatsele ennen kuin julkaiset, kun muutos on ulkonäköä.** Kumpikaan
näistä ei olisi jäänyt testeistä kiinni eikä näkynyt koodista: molemmat
olivat oikein kirjoitettua logiikkaa, joka tuotti väärän lopputuloksen.
Yksi kuvakaappaus omasta työstä maksoi vähemmän kuin kaksi raporttia.

## v350 — Kaupunki- ja maalehti erilleen (8.8.2026)

Omistajan tilaus: *"tehdään isompi muutos: erotetaan kaupunki ja maa
lehti toisistaan ... maan sivuille pääsisi nyt suoraan kartalta."*

### Mitä muuttui

1. **Kaksi lehteä yhden pinon sijaan.** Kaupunkilehti on kansi ja
   kaupungin omat aiheet; maalehti on oma näkymänsä, joka avataan
   kartalta. `rakennaSivut` täyttää `tutkiSivut` (kaupunki) ja
   `maanSivut` (maa) erikseen, `avaaMaalehti` rakentaa maalehden.
2. **Navigointi alas.** `paivitaTutkiAlapalkki` piilottaa "Tapaa
   henkilö X" -napin kaikkialta muualta kuin kaupunkilehden
   viimeiseltä sivulta; muuten alapalkissa ovat Edellinen, Seuraava ja
   Poistu. Maalehdellä kohtaamista ei ole lainkaan.
3. **Maiden tiedot -varuste** (`js/linssit/maatiedot.js`): kartalla
   jokainen maa on napautettava, ja nimen perässä oleva "i" avaa maan
   lehden ilman että sinne pitää matkustaa. Ansaitaan kokemuspisteillä
   (`manner: null`).
4. **Menovinkit-sivu**: parhaat verkkokokoelmat nettimatkaajalle.
   Sisältö asuu maapaketissa (`MAA_KATEGORIAT.<ISO>`) yhtenä
   kappaleena ja lainataan kaupunkilehden viimeiseksi sivuksi — kaksi
   kopiota ajautuisi erilleen. Uusi kenttäpari `linkki`/`linkkiNimi`.
5. **Lontoon nähtävyysjutut**: julistekartan numeroympyrät avaavat
   oman artikkelinsa (kuvat tekstin seassa, vuosilukukorostus,
   lainausnostot).

### Mitä kaappaukset paljastivat

Kumpikaan ei olisi jäänyt testeistä kiinni:

- **Nimiö ja kulmalinkki päällekkäin 390 pikselissä.** "Matkasanomat"
  keskitettynä ulottui x-välille 15–375 ja "ISO-BRITANNIA-OSIO ›"
  välille 204–378. Kapealla ruudulla nimiö on nyt vasemmassa reunassa.
- **Sitaattinosto toisti sanasta sanaan yläpuolisen kappaleen.**
  `poimiNostoVirke` haki virkkeen nostosta 0, vaikka sitaatti ladotaan
  noston 1 eteen. Nyt se poimitaan siitä nostosta, jota se houkuttelee
  lukemaan.
- **Kulmalinkki oli kuollut.** Se etsi `maa-etusivu`-sivua
  `tutkiSivut`-listasta, josta maan sivut olivat juuri lähteneet.
  Nappi ei tehnyt mitään. Nyt se avaa maalehden kuten kartan "i".

### Opittua

**Rakennemuutos katkaisee myös sen, mikä ei näy diffissä.** Kulmalinkki
oli yhden `findIndex`-rivin päässä siitä listasta, jonka sisältö
muuttui — mikään testi ei koskenut siihen, eikä sitä olisi huomannut
lukemalla muutettuja rivejä. Se löytyi vasta, kun kaappauksessa näkyi
nappi, jota tuli painettua.

## v344 — Kuollut taustasoitin purkaa solmunsa (7.8.2026)

v342:n "Mitä EI korjattu" -kohta. Omistaja: *"Hoida vain nyt."*

### Vika

Jokainen ambienssisoitin reititetään Web Audion läpi:
`createMediaElementSource` → kompressori → vahvistin → `destination`.
Soitin vapautettiin pysäyttämällä se ja poistamalla `src`.

Se **näyttää** siivotulta, mutta `createMediaElementSource` on pysyvä
reititys. Ketju jäi kiinni `destination`iin, eikä elementti voinut
vapautua muistista niin kauan kuin lähdesolmu viittasi siihen. Jokainen
kaupunki kasvatti äänigraafia pysyvästi.

Kuvio `audio.pause(); audio.removeAttribute('src');` oli kopioitu
**viiteen** paikkaan — ja juuri siksi purku puuttui niistä kaikista.
Nyt vapautus kulkee yhtä reittiä, `vapautaSoitin`ta.

Viisi kohtaa: paikan vaihto (`paasta`), silmukan väistyvä kierros,
visamusiikin lopetus, CORS-varareitin syrjäyttämä elementti ja soitin,
jonka kaupunki ehti vaihtua kesken latauksen.

### Mitä piti varoa

**Reititys on yksisuuntainen.** Purun jälkeen elementti ei enää soi,
vaikka sille antaisi uuden `src`:n. Siksi purkua EI saa tehdä
varareittipolulla, joka jatkaa SAMALLA elementillä — `petti` yrittää
ensin peiliä ja sitten alkuperäistä lähdettä samalla soittimella. Vasta
kun uusi elementti ottaa paikan tai luovutetaan synteesiin, saa purkaa.

Tämä oli koko muutoksen todellinen riski: väärin purettuna olisi tehty
juuri se vika, jota oltiin siivoamassa.

### Mitattu

40 kaupunkia kartalla hyppien (`createMediaElementSource` laskettuna ja
`disconnect` käärittynä):

| | ennen | jälkeen |
| --- | --- | --- |
| lähdesolmuja luotu | 40 | 40 |
| purettu | 0 | 38 |
| roikkumaan jäi | **40** | 2 |

Kaksi jäljelle jäänyttä ovat tasan ne, jotka olivat yhä soimassa
(mittarin `elossa`-luku oli myös 2) — eli mikään kuollut ei jää kiinni.

Toistotesti erikseen, koska purku voi hiljentää liikaa: kaupunkien
ääniksi paikalliset mp3:t (`localStorage`-ohitus, sama jota viritysivu
käyttää) ja analysaattori kaikkeen `destination`iin menevään. Kuusi
hyppyä kolmen kaupungin väliä, myös paluut samaan kaupunkiin — huiput
0,0006–0,0078, ei yhtään mykkää.

### Mikä EI muuttunut

Tämä ei ollut v342:n taustaäänivian syy eikä korjaa mitään kuultavaa.
Soivia elementtejä oli koko ajan korkeintaan kaksi, joten selaimen
soitinraja ei tullut vastaan. Kyse on muistista ja äänigraafin koosta
pitkässä pelissä.

## v342 — Taustaääni ei enää katoa kartalla hyppiessä (7.8.2026)

Omistaja: *"Taustaäänet katoavat kun jonkun aikaa hypin kartalla, ainakin
kehittäjätilassa."*

### Vika

Taustaääni väistyy kertojan alle: `puheAlkoi` laskee kerrointa,
`puheLoppui` nostaa sen takaisin, ja välissä on laskuri, koska luentoja
voi olla päällekkäin. Vapautus on `merkitsePuhuja`n asentamien
`ended`- ja `error`-kuuntelijoiden varassa.

`haivytaLuenta` — jota **jokainen kehittäjätilan hyppy kutsuu**
(`doKehittajaSiirto`, samoin `doWalk` ja `doRoll`) — häivytti luennan,
pysäytti sen, poisti `src`:n ja pudotti sen `luennat`-joukosta. Se ei
vapauttanut puhujaa. Pysäytetty elementti ei laukaise enää `ended`- eikä
`error`-tapahtumaa, joten vapautusta ei tullut miltään suunnalta.

Laskuri jäi siis pysyvästi plussalle. Yksikin keskeytetty luenta riitti:
tausta jäi puheen alle (0,25 × jo valmiiksi hiljainen 0,14) eikä
palannut enää istunnon aikana — **ei edes `stopDiaryVoice`lla**, koska
se vapauttaa vain ne luennat, jotka ovat yhä joukossa, ja vuotaneet
olivat jo pudonneet sieltä.

Korjaus on yksi rivi: `vapautaPuhuja(audio)` häivytyksen päätteeksi.
Vasta lopussa eikä heti alussa — tausta nousee silloin kun luenta
oikeasti vaikenee, ei sen päälle.

### Mitattu selaimessa

Väistökerroin luettuna `sfx.ambienssiVaisto`:sta (1 = tausta täydellä
voimalla):

| | ennen | jälkeen |
| --- | --- | --- |
| luenta alkoi | 0,25 | 0,25 |
| yksi hyppy | **0,25** | 1 |
| 8 nopeaa hyppyä, heti | 0,25 | 0,25 |
| 8 hyppyä, rauhoituttua | **0,25** | 1 |
| `stopDiaryVoice` perään | **0,25** | 1 |

Lihavoidut rivit ovat vika: kerroin ei palannut mistään. Jälkeen-sarake
väistää yhä silloin kun pitääkin (luenta käynnissä) ja palaa kun luenta
vaikenee.

### Miksi vanha testi ei huomannut

Testi vaati, että `vapautaPuhuja` esiintyy **jossain** ui.js:ssä. Ehto
täyttyi koko vian ajan, koska `stopDiaryVoice` kutsui sitä. Uusi testi
kysyy jokaiselta luennan pudottavalta metodilta erikseen — ja lisäksi
koneellisesti: jokainen kohta, joka poistaa luennan `luennat`-joukosta,
on lopetuskohta ja sen on vapautettava puhuja. Näin uusi lopetusreitti
ei pääse syntymään ilman vapautusta.

### Mitä EI korjattu

Ambienssin soittimet eivät pura Web Audio -solmujaan: `paasta` pysäyttää
elementin ja poistaa `src`:n, mutta `MediaElementSource`, kompressori ja
vahvistin jäävät kytketyiksi `destination`iin. Mitattuna 40 hypyllä
syntyi 40 lähdesolmua, joista yhtäkään ei irrotettu.

Tämä **ei** ollut tämän vian syy — soivia elementtejä oli koko ajan
korkeintaan kaksi, joten selaimen soitinraja ei tullut vastaan. Se on
silti siisteysvelka, joka kannattaa hoitaa erikseen ja mitata omana
muutoksenaan.

## v340 — Tehosteäänet takaisin (7.8.2026)

Omistaja: *"Palauta pelin tehosteäänet."*

v293:ssa sama omistaja vaiensi ne kolmea lukuun ottamatta. Toteutus oli
silloin sallittu lista (`SALLITUT_TEHOSTEET`) eikä koodin poisto, ja
perustelu kirjattiin näin: *"kytkin on kevyempi ja rehellisempi."*
Se maksoi nyt itsensä takaisin — paluu oli kahden rivin poisto eikä
satojen rivien uudelleenkirjoitus. Kaikki 28 tehostetta soivat taas.

**Portti poistui kokonaan, sitä ei täytetty täyteen.** Puolityhjä lista
olisi jäänyt houkuttelemaan arvailuun siitä, mikä on tarkoituksellisesti
hiljaa ja mikä unohtunut listalta. Nyt `play()` soittaa sen, mitä
pyydetään, ja ainoa vaimennin on pelaajan oma asetus.

Äänitteiden lataus palasi samalla: v293 rajasi verkkohaut soiviin
nimiin, joten 24 mp3:a jäi hakematta. Suurin osa niistä on repossa
(`assets/audio/`), joten verkkoon menee neljä.

### Mitä mittaus paljasti

Tynkätesti (`tests/sound.test.mjs`) ajaa synteesikoodin oikeasti, ja
kun vaiennetut palasivat testattavien listalle, `zoom` kaatui heti:
`osc.frequency.setValueCurveAtTime is not a function`. Tynkä ei ollut
rikki — se ei vain ollut koskaan ajanut zoomiäänen synteesiä, koska
ääni oli vaiennettu koko sen ajan, kun kaari-koodi kirjoitettiin.
Metodi lisättiin tynkään.

Selainvarmistus tehtiin erikseen, koska tynkä ei kerro tuleeko
masterketjusta ulos mitään: analysaattori kiinni `sfx.master`iin ja
huippu mitattiin jokaiselta 28:lta. Yhtään mykkää tai kaatuvaa ei
ollut, huiput 0,001–0,093.

### Ambienssista

Omistaja kysyi samalla, miksi esim. Ateenassa ei kuulu ambienssia —
ja perui kysymyksen heti perään (*"Eikun nyt kuuluu ambienssiäänet"*).
Tarkistettu silti: Ateenalla on sekä oma äänitys (aporee, Lauantain
vihannestori) että tyyppikori `kaupunki`, eli kumpikin reitti on
kunnossa. Ambienssi ei kulje `play()`:n kautta, joten v293:n portti ei
koskenut siihen alun perinkään.

## v339 — Näkyvät ruudut ensin, puskurirengas joutohetkinä (7.8.2026)

Omistaja valitsi v336:n "Mitä EI tehty" -listalta ensimmäisen suunnan:
*"Tee tämä: näkyvät ruudut ensin."* Taustalla havainto: *"se vielä
vähän tökkii, lähinnä kun joutuu lataamaan zoomauksen jälkeen uutta
karttamateriaalia scrollattaessa."*

### Mikä muuttui

Puskuroitu alue on yhdeksän ruudullista — näkyvä ruutu ja ruudullinen
joka suuntaan — mutta pelaaja katsoo niistä yhtä. Ennen kaikki
yhdeksän piirrettiin samassa keskeytymättömässä silmukassa, joten
zoomauksen jälkeen pääsäie oli varattuna vielä pitkään sen jälkeen,
kun näkyvä osa oli jo terävä. Juuri siihen ikkunaan osuu se
sormenveto, joka nykii.

`taydennaTaide` jakaa puuttuvat ruudut nyt kahtia. Näkyvät piirretään
heti, samassa silmukassa kuin ennenkin. Rengas siirtyy
`taydennaRengas`-jonoon, joka ottaa yhden ruudun kerrallaan
`requestIdleCallback`illa.

`requestIdleCallback` on tässä oikea työkalu kahdesta syystä. Se ei
laukea kesken sormenvedon, joten työ odottaa eleen ohi ilman omaa
lippukirjanpitoa. Ja se ottaa yhden ruudun kerrallaan, joten pisin
yhtenäinen tukos on yhden ruudun eikä koko renkaan mittainen.

Puskuri ei pienene: sääntö *"puskuria on niin paljon, ettei kesken
eleen tarvitse ladata"* pätee yhä. Vain valmistumisen ajoitus muuttuu.

### Mitä piti varoa

**Vanhat ruudut poistetaan vasta renkaan valmistuttua.** Vanhan
mittakaavan ruudut jäävät uusien alle ja peittävät juuri sen alueen,
jonne rengas on tulossa. Jos ne poistettaisiin heti näkyvän osan
valmistuttua, reunan yli vieritettäessä paljastuisi tyhjä pergamentti
— ennen siellä oli edes sumea kartta.

**Näkyvyys lasketaan kiertämättömästä sarakkeesta.** Kiertävällä
laudalla sama sarake voi olla yhtä aikaa näkyvissä ja renkaassa;
kierretystä sarakkeesta laskien näkyvä ruutu joutuisi odottamaan
joutohetkeä ja kartalle jäisi terävöitymätön kaistale.

**Rengas peruuntuu.** Jono elää joutohetkien varassa, joten sen ja
rasteroinnin välissä ehtii tapahtua mitä tahansa. Työn identiteetti ja
mittakaava tarkistetaan sekä ennen rasterointia että sen jälkeen, uusi
täydennys peruu vanhan jonon ja `destroy` peruu sen kokonaan.

**Aikakatkaisu on pakollinen.** Sivu, joka ei koskaan ole joutilas,
jäisi ilman puskuria — ja se olisi huonompi kuin lähtötilanne.
Viimeistään sekunnin päästä ruutu piirretään joka tapauksessa.

### Mitattu

Uusi mittari `tools/mittaa-ruudutus.mjs` (390x844, Chromium). Se
zoomaa sisään, laskee ruutujen peiton samalla kaavalla kuin ui.js, ja
vetää neljä sormenvetoa **sormi alhaalla** (`kartanRaahaus`) — ilman
sitä lippua mittari näyttää työtä, jota pelissä ei tehdä, ja peittää
juuri sen, kuinka hyvin ele väistyy. Ensimmäinen mittariversio teki
tämän virheen ja antoi 18 nykäisyä kummallekin versiolle.

| | vanha | uusi |
| --- | --- | --- |
| näkyvä alue terävänä zoomauksesta | 1768–1835 ms | 851–914 ms |
| pisin purske sormen noustua | 1149–1216 ms | 232–262 ms |
| puskuri lopuksi katettu | kyllä | kyllä |
| nykäisyjä (kehys > 32 ms) vedon aikana | 0–1 | 0 |

Kaksi ensimmäistä lukua ovat se, mitä omistaja kuvasi. Kartta
terävöityy zoomauksen jälkeen tuplasti nopeammin, ja ikkuna, jonka
aikana uusi veto voi osua keskelle rasterointipursketta, kutistuu
viidesosaan.

Kehysväli vedon aikana oli jo ennestään kunnossa: eleen aikana ei
rasteroida lainkaan (v295). Luku on taulukossa siksi, että se on
tämän muutoksen tärkein riski — joutohetkinä piirtyvä rengas ei saa
tuoda uutta nykäisyä. Ei tuonut.

### Mitä EI tehty

Kaksi muuta v336:ssa kirjattua suuntaa ovat yhä auki: puskurin
kasvattaminen vierityssuuntaan ja ruudun pikselibudjetin laskeminen.
Kumpikaan ei ollut tarpeen tähän havaintoon, ja molemmat muuttaisivat
muistinkulutusta — mitattava erikseen, jos tökkimistä vielä jää.

## v336 — Saapuminen ilman zoomausanimaatiota, vahti sumealle kartalle (7.8.2026)

Omistaja: *"ota zoomausanimaatiot pois kun tullaan aloitusnäytöltä
lentokoneella mantereelle. peli vain siis siirtyy suoraan oikeaan zoom
tasoon ilman animaatiota."* Ja: *"kartta muuten näkyy pehmeänä sen
jälkeen kun peli päivittyy automaattisesti uuteen versioon."*

### Saapumisliuku pois

`zoomaaMantereelle` teki ennen kaksi asiaa: asetti lopullisen näkymän
(`fitViewBox`) ja liu'utti kartan siihen. Liuku poistui kokonaan —
isolla laudalla `asetaSaapumisAlku`-alkuasento ja muilla
`asetaZoomAlku`. Zoomausääni lähti mukana: se soi täsmälleen liu'un
mittaisena, eikä moottorin humaus ilman liikettä kerro mitään.

Molemmat apurit jäivät käyttöön, koska aloituskartan oma zoom
(`zoomaaAloituskartta`, ensimmäinen napautus etusivulla) käyttää niitä
yhä — sitä ei pyydetty poistamaan.

Perille päästyä pyydetään kuva heti oikealla mittakaavalla
(`taydennaTaide({ heti: true })`). Ilman sitä ruudut jäisivät
yleiskuvan tarkkuuteen, kunnes jokin muu sattuisi pyytämään
täydennyksen — eli juuri se sumeus, josta seuraava kohta kertoo.

### Tarkkuusvahti

Ruudut piirretään sillä mittakaavalla, joka kartalla oli
rasterointihetkellä, ja uusi sarja pyydetään vasta kun mittakaava
muuttuu yli viidenneksen. Jos ensimmäinen rasterointi osuu hetkeen,
jolloin näkymä ei ole vielä lopullinen — päivityksen jälkeinen lataus
voi tapahtua taustavälilehdessä, jossa `requestAnimationFrame` ei
laukea — ruudut jäävät väärän tarkkuisiksi eikä mikään pyydä niitä
uudestaan. Juuri niin omistaja kuvasi: kartta on pehmeä, ja se
korjautuu zoomaamalla ulos ja takaisin.

`vahdiTarkkuutta` vertaa ruutujen mittakaavaa siihen, mikä kartalla
oikeasti on, aina kun peli palaa näkyviin (`visibilitychange`). Kynnys
on 2 % eikä 20 %: tässä ei olla kesken eleen, joten pieni eroavuus
tarkoittaa juuri väärää tarkkuutta. Kuuntelija puretaan `destroy`ssa,
ettei kuollut instanssi jää tarkkailemaan uuden pelin rinnalle.

**Vahti korjaa seurauksen, ei syytä.** Juurisyytä ei ole saatu
toistettua kehityskoneella: mitattuna ruutujen mittakaava vastasi
todellista sekä yleiskuvassa että mannerzoomin jälkeen. Todennus
tehtiin istuttamalla vika: ruutujen mittakaava asetettiin kolmasosaan
oikeasta, ja `visibilitychange` palautti sen (0,66 → 1,99).

### Mitä EI tehty

Kartan vierityksen optimointi jäi tekemättä. Omistaja: *"jos keksit
jonkun tavan optimoida lisää kartta scrollausta niin hyvä, se vielä
vähän tökkii (lähinnä kun joutuu lataamaan zoomauksen jälkeen uutta
karttamateriaalia scrollattaessa)."*

Nykyinen rakenne on jo hiottu (v171, v295): eleen aikana ei
rasteroida lainkaan, puskuria on ruudullinen joka suuntaan, ruudut
piirretään lähimmästä alkaen ja vanhan mittakaavan ruudut jäävät alle
kunnes uudet peittävät ne. Jäljellä oleva tökkiminen tulee siitä, että
yhden ruudun rasterointi vie satoja millisekunteja pääsäikeessä eikä
SVG:tä voi rasteroida työntekijässä.

Mahdolliset suunnat mitattavaksi (`node tools/mittaa-kartta.mjs`):
näkyvät ruudut ensin ja puskurirengas vasta `requestIdleCallback`illa;
puskurin kasvattaminen vierityssuuntaan; tai ruudun pikselibudjetin
laskeminen niin, että ruutuja on enemmän mutta jokainen valmistuu
nopeammin. Kaikki kolme vaativat mittauksen ennen ja jälkeen — arvaus
voi hyvin hidastaa.

*(Ensimmäinen näistä tehtiin v339:ssä. Kaksi jälkimmäistä ovat yhä
tekemättä.)*

## v317 — Matkakirja aukeaa kokonaan (7.8.2026)

Omistaja: *"matkakirja voisi avautua jatkossa kokonaan, koska se
pienenee kätevästi kokonaan kun karttaa liikuttaa. eli sen välikoon
voisi ottaa pois kokonaan."*

Kartalla kelluvalla päiväkirjalla oli kolme kokoa: yhden rivin
nimilappu (`.pieni`), viiden rivin ikkuna (puhelimella kolmen) ja
napautuksella auki levitetty kortti (`.laajennettu`). Keskimmäinen
poistui — merkintä näkyy nyt kokonaan heti, eikä sitä tarvitse avata
erikseen.

### Mitä poistui

- `.fact-teksti-rivi .fact-text`in rivikatto (`max-height: calc(5 *
  1.45em)`) ja puhelimen oma kolmen rivin katto.
- `.laajennettu`-luokka kokonaan: css:stä molemmat säännöt, js:stä
  napautuskuuntelija ja `kutistaPaivakirja()`-metodi.
- Kortin oma katto nousi 38 → 74 dvh, eli entisen auki levitetyn
  kortin mittaan. Puhelimen 22 dvh:n katto poistui, joten sama 74
  dvh pätee kaikilla ruuduilla.

### Mitä jäi

Yhden rivin lappu jäi ennalleen: kartan liike ja linssi kutistavat
kortin nimeksi, ja napautus avaa sen. Kartan napautus kutistaa nyt
kortin suoraan lapuksi (ennen se palautti sen viiden rivin ikkunaan,
jota ei enää ole) — niin kartan saa näkyviin myös napauttamalla.

Mitattu selaimessa: 390 px:n puhelimella yhdeksän virkkeen merkintä
vie 260 px 844 px:n ruudusta ja mahtuu kokonaan; 1024 px:llä 344 px.
Katto 74 dvh tulee vastaan vasta poikkeuksellisen pitkällä
merkinnällä, ja silloin teksti vierii kuten ennenkin.

### Testi

`tests/rules.test.mjs` vahti ennen napautuksella avaamista. Nyt se
vahtii päinvastaista: että välikoko ei palaa (ei rivikattoa, ei
`.laajennettu`-luokkaa), että kartan napautus kutistaa kortin lapuksi
ja että kortilla on yhä katto. Todennettu istuttamalla rivikatto
takaisin — testi kaatui.

## v314 — Maan nimi Tutki-sivujen otsikoihin (7.8.2026)

Omistaja: *"tutki sivut: maata koskevilla sivuilla otsikossa saisi olla
maan nimi mukana"* ja perään *"muuta myös maa numeroina sivu esim.
Egypti numeroina muotoon."*

Tutki-lehden sisäsivut ovat maan aiheita (`js/packs/maa-kategoriat.js`),
mutta osastonotsikossa luki pelkkä **HISTORIA**. Sivu näytti siis
kaupungin omalta osastolta, vaikka juuri nämä sivut ovat samat maan
jokaisessa kaupungissa — Kairon, Luxorin ja Siinain lukija näkee saman
Egyptin historian. Nyt otsikko on **EGYPTIN HISTORIA**, ja lehden
viimeisen sivun otsikko on **EGYPTI NUMEROINA** (v311:n tilastosivu).
Kaupungin omat aiheet (Lontoon yhdeksän) eivät muutu: ne kertovat
kaupungista.

Kaksi eri sijamuotoa, koska suomi vaatii sen: aihesivulla genetiivi
("Egyptin historia"), tilastosivulla nominatiivi ("Egypti numeroina"),
koska *numeroina* on jo taivutettu.

### Genetiivi on taulu ja yksi sääntö, ei taivutuskone

Sääntö: vokaaliin päättyvä nimi saa `n`:n, konsonanttiin päättyvä `in`:n
(Egypti → Egyptin, Irak → Irakin). Se riittää pelin 84 maanimestä
kaikkiin paitsi neljääntoista, jotka luetellaan taulussa: astevaihtelu
(Kreikka → Kreikan, Marokko → Marokon), monikot (Alankomaat →
Alankomaiden, Filippiinit → Filippiinien), taipuva määrite
(Iso-Britannia → Ison-Britannian) ja omat tapauksensa (Suomi → Suomen,
Kypros → Kyproksen).

**Sääntöä ei voi laajentaa yleiseksi astevaihteluksi**, vaikka se
houkuttaa: vierasnimet eivät noudata sitä. Itävalta → Itävallan mutta
Malta → **Maltan**, ja Sri Lanka → **Sri Lankan** vaikka lanka → langan.
Yksikin liian ahne sääntö tuottaisi kirjoitusvirheen otsikkoon, jonka
pelaaja lukee joka sivunkäännöksellä. Siksi poikkeukset luetellaan.

Aiheen nimi pienenee otsikossa ("Egyptin historia"), koska vakioaiheet
ovat yleisnimiä. Ruudulla otsikko on versaalilla, mutta DOM:iin jää
oikein kirjoitettua suomea myös ruudunlukijalle.

### Missä muunnos tehdään

`js/ui.js` `rakennaSivut` — ja **kopioon**, ei alkuperäiseen: kategoria
tulee yhteisestä `MAA_KATEGORIAT`-taulusta, ja sen nimen muuttaminen
paikan päällä kasvattaisi otsikkoa joka avauksella ("Egyptin Egyptin
historia"). Maan nimi luetaan samasta lähteestä kuin maapalstan otsikko
(`map.countryShapes[iso].nimi`); jos laudalla ei ole maadataa, otsikot
jäävät entiselleen ("HISTORIA", "MAA NUMEROINA"). Aineistoon ei
kosketa: aiheissa säilyy yksi lyhyt vakioaiheen nimi, jota ei tarvitse
kirjoittaa maakohtaisesti uudestaan.

### Testit

`tests/maa-otsikot.test.mjs` käy läpi **kaikkien lautojen** maanimet ja
vertaa käsin tarkistettuun genetiivitauluun. Uusi maa peliin kaataa
testin ja pyytää tarkistamaan taivutuksen siinä kohtaa, jossa se on
helpointa tehdä. Lisäksi vahditaan, että maan aiheiden nimet ovat
yksisanaisia yleisnimiä — erisnimi ei kestäisi pientä alkukirjainta — ja
että tilastosivun otsikko on nominatiivissa.

### Opittua

**Sama nimi kahdesti samassa funktiossa ei näy testeistä.** Ensimmäinen
versio otti maan nimelle muuttujan `maanNimi`, joka oli jo julistettu
`rakennaSivut`in lopussa päiväysriviä varten. Koko moduuli kaatui
`SyntaxErroriin` — mutta `npm test` meni läpi, koska yksikään testi ei
lataa `js/ui.js`:ää selaimena. Vika näkyi ensimmäisestä
kuvakaappauksesta (v308:n opittu piti paikkansa toisenkin kerran).

**Tarkista tuore main ennen kuin kohdistat muutoksen.** Tämä työ
kirjoitettiin ensin v309:n päälle, ja "maa numeroina" tulkittiin
etusivun maapalstaksi — mutta rinnakkaisessa istunnossa oli juuri
syntynyt oikea **Maa numeroina** -sivu (v311). Väärä kohde paljastui
vasta yhdistämisvaiheessa. Haara aloitettiin uudestaan tuoreen mainin
päältä ja otsikko kohdistettiin sivuun, jota omistaja tarkoitti.

## v309 — Kuvat menivät rikki: kolme eri vikaa (6.8.2026)

Omistaja: *"Kuvat menevät vieläkin välillä rikki, vaikka lataan sivun
uudestaan ja vaikka olen käynnistänyt pelinkin uudestaan."* Sen jälkeen:
*"miksi kuvat eivät ole peilissä?"*

Vikoja oli kolme, ja ne ruokkivat toisiaan.

### 1. Kolme kuvaa ei ollut peilissä — ja syy oli tavassa kirjoittaa

Espanjan 31 kuvasta 28 peilautui, kolme ei. Peilausajo oli mennyt
**onnistuneesti** läpi (GitHub Actions ajaa sen automaattisesti joka
työnnöstä), mutta sen lokissa oli viisi virhettä. Nimet lokissa olivat
katkaistuja:

    kuvat: Lince ibérico (Lynx pardinus), Almuradiel,  → HTTP 404
    kuvat: Guitarra d'Antonio de Torres, MDMB 626,  → HTTP 404

Syy oli minun. Kirjoitin kolme pitkää tiedostonimeä kahdelle riville:

    tiedosto: 'Lince ibérico (Lynx pardinus), Almuradiel, '
      + 'Ciudad Real, España, 2021-12-19, DD 07.jpg',

**Peli toimii tästä huolimatta** — JavaScript yhdistää palat — mutta
peilaustyökalu (tools/peilaa-media.mjs `kohteet`) poimii nimet
pakettien LÄHDETEKSTISTÄ hakukuviolla, koska se ei aja moduuleja. Se
näkee vain ensimmäisen palan ja hakee sillä nimellä 404:n.

Vika on erityisen ilkeä siksi, ettei se näy mistään: kuva latautuu
Commonsista varareittiä pitkin ja näyttää toimivan, kunnes Commons
sattuu rajoittamaan pyyntöjä. Lisättiin testi
(tests/media.test.mjs), joka lukee kaikki paketit ja kaatuu, jos
`tiedosto:`-kenttä jatkuu seuraavalle riville. Todennettu
istuttamalla vika takaisin: testi löysi sen.

### 2. Katkaisija ei parantunut koskaan

Kun peili pettää kolmesti, peli lakkaa käyttämästä sitä ja hakee
kaiken alkuperäisestä lähteestä. Tila tallennettiin
`sessionStorageen` — joka **säilyy sivun uudelleenlatauksen yli**.
Kerran lauettuaan katkaisu kesti siis siihen asti kunnes VÄLILEHTI
suljettiin. Juuri siksi uudelleenlataus ja uusi peli eivät auttaneet:
kyse ei ollut pelitilasta vaan välilehden muistista.

Laukeaminen on lisäksi helppoa syystä, joka ei kerro peilin kunnosta:
`pub-*.r2.dev` on Cloudflaren rajoitettu kehitysosoite, ja lehden
kansi pyytää kymmeniä kuvia kerralla. Katkaisu on nyt määräaikainen
(viisi minuuttia) ja laskuri nollautuu sen mentyä.

### 3. Ilman varareittiä luovutettiin ensimmäisestä virheestä

Kun katkaisija oli lauennut, `valokuvaUrl` palautti jo valmiiksi
Commonsin osoitteen — jolloin varareitti oli sama osoite, `varalla`
oli epätosi ja **yksi virhe riitti luovuttamaan**. Uusintaa ei ollut
lainkaan juuri siinä tilanteessa, jossa sitä eniten tarvittiin. Nyt
sama uusinta (4 s + lisäparametri) tehdään myös ilman erillistä
varareittiä.

### Sivutuote: palvelutyöntekijä säilöö nyt peilikuvat

Ämpärissä ei aikoinaan ollut CORS-sääntöä, joten sw.js haki peilikuvat
ilman CORSia eikä voinut panna niitä koriin. Tarkistettu nyt
vastauksen otsakkeista: sääntö on olemassa
(`access-control-allow-origin: https://ravelius.github.io`). Kerran
nähty kuva ei siis enää lähde verkkoon lainkaan — mikä poistaa juuri
ne purskeet, jotka laukaisivat katkaisijan. Tavallinen nouto jäi
varareitiksi, ja testi vahtii että se pysyy siellä.

### Opittua

**Kun varareitti toimii, vika ei näy.** Kaikki kolme vikaa olivat
olleet olemassa pitkään, ja jokainen niistä oli piilossa sen takana,
että kuva tuli lopulta jostain. Ne paljastuivat vasta yhdessä.

## v308 — Artikkelien kuvat mahdollisimman suurina (6.8.2026)

Omistaja: *"Saatko helposti muutettua että kaikilla Wikipedia
artikkelisivuilla kuvat näytetään mahdollisimman suurina — eli kaikki
artikkelit jotka avautuvat lue lisää linkin kautta."*

Vastaus oli kyllä, mutta rajoitteita oli KOLME eikä yksi, ja vain
ensimmäinen näkyi CSS:stä.

### 1. Korkeusraja (CSS)

`.wiki-image { max-height: 320px }`. Ilmeinen ja helppo. Tilalle
`max-height: 78vh` ja `width: auto` — pientä kuvaa ei venytetä palstan
levyiseksi, koska venytetty pikkukuva on sumea eikä suuri.

### 2. Kuva HAETTIIN pikkukuvana

Tämä oli iso vika eikä näkynyt mistään. Artikkelin kuva tulee joko
Wikipedian tiivistelmästä (`thumbnail.source`) tai kuvalistan
srcsetistä, ja **molemmat ovat pikkukuvia**: mitattuna Madridin
tiivistelmäkuva on 330 × 283, vaikka alkuperäinen on 1184 × 1016.
Korkeusraja siis leikkasi kuvaa, joka oli jo valmiiksi pieni.

Osoitteessa on leveys muodossa `/330px-`, ja `upsizeImage` osaa
vaihtaa sen. Sitä käytettiin vain suurennoskatselimessa — nyt myös
itse artikkelisivulla.

### 3. MITTATILAUSLEVEYS EI TOIMI — tämä selitti kaiken

upload.wikimedia.org tarjoilee vain niitä pikkukuvakokoja, jotka
tiedostolle on jo kertaalleen tehty. Mitattu samasta kuvasta
(Segovia_-_01.jpg, alkuperäinen 3888 × 1944):

| leveys | vastaus | | leveys | vastaus |
| --- | --- | --- | --- | --- |
| 330 px | 200 | | 1280 px | **200** |
| 640 px | 400 | | 1600 px | 400 |
| 800 px | 400 | | 1920 px | **200** |
| 1024 px | 400 | | 2560 px | 400 |

Vanha oletus oli **1200** — luku, jota ei ole olemassa. Suurennos siis
epäonnistui ja katselin palasi 330 pikselin pikkukuvaan. **Juuri siksi
kuvat näyttivät pieniltä myös suurennettuina.**

Tilalle portaat `[1920, 1280]` ja viimeisenä alkuperäinen osoite.
Kokeiltu kymmenellä artikkelilla (Madrid, Segovia, Barcelona, Granada,
Bilbao, Sevilla, Lontoo, Kairo, Venetsia, Pariisi): **1920 löytyi joka
kerta**, eikä yhdellekään tarvittu varareittiä. Tietomäärä nousi
15–72 kilotavusta 212–916 kilotavuun.

### Neljäs, pienempi ansa: etuliite osoitteessa

Vanha kuvio etsi `/330px-` eli vaati numeron heti kauttaviivan
jälkeen. Wikipedia liittää osaan pikkukuvista etuliitteen:
kielikohtainen SVG-käännös on `langfi-330px-…` ja monisivuinen PDF
`lossy-page1-1024px-…`. Niissä vaihto ei osunut, ja osoite palautui
sellaisenaan — haku onnistui, mutta ruudulla oli yhä 330 pikseliä
eikä mikään kertonut siitä. Kuvio korjattiin, ja etuliitteen on nyt
alettava kirjaimella: muuten se söisi leveyden itsensä
(`330px-500px-nimi.jpg` vaihtoi väärän luvun, mikä jäi testistä
kiinni).

### Mitattu lopputulos

Ruudulla renderöity kuva (1920 × 1080 vaakakuva, 900 × 1400 pystykuva):

| ruutu | vaaka | pysty | yli reunan |
| --- | --- | --- | --- |
| 390 px | 338 × 195 | 345 × 527 | 0 |
| 834 px | 566 × 326 | 502 × 767 | 0 |
| 1024 px | 566 × 326 | 502 × 767 | 0 |

Pystykuva kasvoi eniten: vanha 320 pikselin katto olisi jättänyt sen
206 × 320:een. Vaakakuvan koko muuttui vähän, mutta TERÄVYYS paljon —
lähde on 1920 pikseliä entisen 330:n sijaan.

### Opittua

**Kun ulkoinen palvelu vastaa virheellä, varareitti peittää vian.**
Suurennos oli ollut rikki siitä asti kun se kirjoitettiin, koska
varareitti toimi moitteettomasti — kuva näkyi aina, vain väärän
kokoisena. Mittaus paljasti sen, koodin lukeminen ei olisi.

## v307 — Espanjan lehtipaketti: Madrid ja Espanja (6.8.2026)

Neljäs lehtimaa monistusohjeen (docs/tutki-aiheet.md) mukaan, kohta
kohdalta. Sama maaosasto palvelee Madridia, Barcelonaa ja Granadaa.

**Kansi.** Goyan Madrid galleriana (San Isidron niitty pääkuvana, viisi
kutomomallia gallerialistalla), tapakset ja San Miguelin halli, ja
chotis musiikkilinkkeineen. Litteät nostot europe-kulttuuri.js:ssä
purettiin ohjeen mukaan: chotis kanteen, cocido ja uudenvuoden
rypäleet Espanjan Ruoka-aiheeseen, litteään tauluun jäi vain visa.
Visan aihe (chotis) näkyy kannella, kuten sääntö vaatii.

**Maa.** Viisi aihetta × neljä nostoa: historia (Altamira, Segovian
akvedukti, Córdoban Mezquita, botafumeiro), ruoka, kuvataide,
musiikki (flamenco + Paco de Lucía, Aranjuez, Torresin kitara, feria)
ja luonto. Tehtävä on Luonto-aiheessa, ja sen vastaus on saman sivun
tekstissä.

### Kolme asiaa, jotka mittaus ratkaisi

**1. El País ei kelpaa uutislähteeksi, vaikka syöte toimii.** Omistajan
ehdokkaista El Paísin syöte aukesi (142 juttua), mutta ARTIKKELISIVUT
palauttivat 403 — popupiin olisi jäänyt vain parin lauseen kuvaus.
RTVE:n syötteen linkit osoittavat vanhentuneisiin osoitteisiin, jotka
sekin torjuu. 20minutos läpäisi molemmat testit: 190 juttua, `<article>`
jäsentyy, kuusi kappaletta poimiutuu ja og:image löytyy. **Syötteen
testaaminen yksin ei riitä** — se on nyt kirjattu ohjeeseenkin.

**2. Kaksi kuvaa hylättiin silmätarkistuksessa.** "Altamira bisons.jpg"
näytti luolamaalaukselta, mutta kuvaus paljasti sen valokuvaksi Barcelonan
Museo del Mamutin jäljennöksestä; "Baile - P1320246.jpg" oli
flamencohaussa ja esitti hevosta niityllä. Altamirasta EI ole
Commonsissa kuvaa itse luolasta — luola on suljettu, koska kävijöiden
hengitys kasvatti maalausten päälle hometta. Se tehtiin nostossa
sisällöksi: kuva on jäljennöksestä, ja kuvateksti kertoo miksi.

**3. Puhelimen vaakavuoto oli vanha vika, ei Espanjan.** Mitattu 390
pikselin ruudulla: "Kuuntele musiikkia" -nappi työntyi 44 pikseliä
arkin reunan yli ja lehti sai vaakavierityksen. Sama toistui Lontoon
kannella, eli vika oli `.kulttuuri-otsikkorivi`-rivissä (`nowrap` +
`flex: 0 0 auto`) eikä yhdessäkään tekstissä. Korjattu rivittämällä.
Mitattu jälkeen: 0 px molemmilla kaupungeilla.

### Mitä on vielä tekemättä

Worker on julkaistava uudelleen (Edit code → liitä → Deploy), tai
Espanjan uutisosio pysyy piilossa. Muut maat toimivat ennallaan.

## v296 — Vesistölinssi maastokartan päälle ja radion mitat (5.8.2026)

Kolme asiaa samassa julkaisussa.

### 1. Topografian pohjoisreuna sai omat värinsä

Omistaja: *"Topografialinssissä aivan ylin pohjoinen jää harmaaksi.
Sieltä puuttuu värit."*

Lauta ulottuu kuvan ylä- ja alapuolelle (ui.js YLAKAISTA, ALAKAISTA), ja
kaista täytettiin kuvan reunarivien **keskiarvolla**. Mitattuna
assets/linssit/topografia.webp -kuvan ylimmällä rivillä on vierekkäin
vihreää mannerta (75,105,59), syvää merta (61,108,170) ja kirkasta jäätä
(167,208,235) — ja niiden keskiarvo on tasan se harmaansininen
(129,163,179), jonka omistaja näki. **Yksi luku ei voi esittää kolmea
eri paikkaa.**

Nyt kaista on sama kuva venytettynä 90-kertaiseksi ja rajattuna niin,
että siitä näkyy vain ylin (tai alin) 1/90 eli noin 18 kuvariviä.
Vaakasuuntainen vaihtelu säilyy, eikä uutta aineistoa tarvittu.

Piirto vietiin ulos funktiona `piirraReliefi()`, jotta vesistölinssi voi
rakentua saman pohjan päälle.

### 2. Vesistölinssi rakennettiin topografian päälle

Omistaja: *"Jokilinssissä kaupunkien tekstit voisi laittaa haaleammalla
ja kaupunkien pallot myös, mutta jokien nimet saisi näkyä tummemmalla.
Joista voisi tehdä nyt enemmän kolmiulotteisen näköisiä. Ja koko
Jokilinssin voisi itse asiassa rakentaa topografiakartan päälle. Silloin
saataisiin meretkin hienosti näkyviin. Jolloin myös joet voisivat olla
sinisen eri sävyissä."*

Vanha pohja oli vaalea pergamenttihuntu. Se erotti uomat, mutta hukkasi
kaksi asiaa: meret olivat tyhjää paperia, eikä kartasta näkynyt MIKSI
joki kulkee juuri siinä. Reliefipohja perustelee itsensä — laakso näkyy
uoman alla.

Joki on nyt kaksi vetoa samaa polkua: leveämpi tumma penger alle ja
kapeampi kirkas uoma päälle. Silmä lukee parin uraksi.
**Ensimmäinen mitoitus (uoma 2,6 / penger 5,0) ei toiminut:** ruudulta
mitattuna pari suli yhdeksi siniseksi viivaksi, koska 1,2 pikselin reuna
on tavallisella näytöllä alle kokonaisen pikselin. Penger on nyt uoma +
3 px eli 1,5 px kummallakin puolella, ja ura piirtyy.

Sävyt poimittiin reliefikuvan omasta merestä (avomeri 57,104,165), joten
joki ja meri ovat samaa vettä.

**Elementtimäärä on mitoitettu, ei sattuma.** Rasteroitu linssi ajetaan
blob-hiekkalaatikossa, joka ei hae ulkoisia osoitteita — rasteroituna
reliefikuva palauttaisi läpinäkyvän tyhjän ilman yhtäkään virhettä
lokissa. Mitattu selaimessa: **302 elementtiä**, katto 400. Penger
piirretään siksi vain luokille 1 ja 2 (84 jokea 169:stä); luokan 3
uomassa (1,3 px) sama lisäys tekisi siitä leveämmän kuin luokan 2 koko
ura, eli tärkeysjärjestys katoaisi.

Kaupunkien haalistus ja veden nimien tummennus ovat CSS:ssä
(`body.linssi-vesistot`), koska kaupungit ja maastonimet ovat linssin
YLÄPUOLELLA kartan omassa puussa eikä linssi saa antaa elementeille
luokkia.

### 3. Radion nauha reunaan asti ja merkkivalo keskelle

Omistaja: *"Radion virtanappi ei ole aivan keskellä sille varattua
tilaa. Lisäksi myös viritysnauha, missä on kaupunkien nimet, jää vähän
vajaaksi oikeassa reunassa, ainakin iPadille."*

Molemmat olivat mittavirheitä, ja molemmat näkyivät numeroina:

| kohta | ennen | nyt |
| --- | --- | --- |
| nauhan vara vasemmalla | 0 px | 0 px |
| nauhan vara oikealla | 8,8 px | 0 px |
| lampun väli vasemmalla | 15,2 px | 11,2 px |
| lampun väli oikealla | 11,2 px | 11,2 px |
| näytön aukko | 387,6 px | 408 px |

Nauhan vika: `.radio-keskio` oli `flex: 0 1 440px` ajalta, jolloin
kotelossa oli myös kaiutinsäleikkö ja ylijäävä leveys kuului sille.
Säleikkö poistettiin v268:ssa, 440 jäi. Nyt `1 1 440px`.

Lampun vika: väli tuli kahdesta lähteestä, rivin `gap` (8,8) ja lampun
epäsymmetrinen marginaali (6,4 vasemmalle, 11,2 oikealle). Nyt väli
tulee vain marginaalista, symmetrisenä.

Sivutuotteena selvisi, että kotelon leveys 470 oli laskettu väärin
("merkkivalo väleineen 44" oli arvio, oikea luku on 48,4). 478 antaa
näytön aukolle tasan sen 408 pikseliä, joka sille on koko ajan luvattu.

### Opittua

**Keskiarvo ei ole reunan jatke.** Kun kuva loppuu ja jotain on
piirrettävä sen taakse, oikea vastaus on venyttää kuvaa — ei laskea
siitä yhtä lukua.

**Kaksi lähdettä samalle välille tuottaa epäsymmetrian.** Sekä `gap`
että marginaali toimivat, mutta yhdessä ne eivät ole keskitys.

## v293 — Tehosteäänet pois kolmea lukuun ottamatta (5.8.2026)

Omistaja: *"Kytke pois kaikki syntetisoidut tehosteäänet, kun näppäimiä
painetaan ja kaikki muutkin. Lentokoneen ääni voi jäädä, sekä tietenkin
kaupunkiäänet ja kertojaäänet, mutta nämä pienet lyhyet äänitehosteet
ota kaikki pois, paitsi nopanheiton ääni."*

**Sallittu lista eikä poistettu koodi.** Synteesi ja äänitteet ovat yhä
paikoillaan (`SOUNDS`, `REAL_SAMPLES`, `REAL_PLAYERS`), ja yhden rivin
lisäys `SALLITUT_TEHOSTEET`-joukkoon palauttaa minkä tahansa niistä.
Poistettuna ne olisivat satoja rivejä pois, ja takaisin kirjoittaminen
olisi oma työnsä.

Listalla on neljä: `dieTick` ja `dieLand` (nopanheitto), `flight`
(lentokone) ja `ferry`. Laivaa ei nimetty pyynnössä, mutta se on lennon
pari: sama tarkoitus (matkustustavan ääni), sama pituus (2,6 s vs
2,1 s) ja sama paikka pelissä. Toisen jättäminen ja toisen poistaminen
kuulostaisi vialta eikä valinnalta — kerrottu omistajalle.

Rajaus koskee myös latausta: soittamattomia mp3-tiedostoja ei enää
haeta verkosta.

Muut äänijärjestelmät jatkavat ennallaan: kaupunkien äänimaisema,
kertojan luennat, visamusiikki ja radio kulkevat omia reittejään
eivätkä `play()`:n kautta.

**Testit vaihtoivat puolta.** Ennen testi ajoi kaikki 25 nimeä ja vaati
jokaiselta äänilähteen. Nyt neljä soivaa testataan samoin, ja 24
vaiennettua saivat oman testinsä, joka vaatii nolla äänilähdettä.
Vaiennettujen lista on käsin kirjoitettu eikä johdettu koodista: jos
joku poistaa kytkimen, testin pitää huomata se eikä seurata mukana.

## v292 — Valikkoon ilmaa, lähdelinkki pois (5.8.2026)

Omistaja: *"Napit eivät ole keskitetty. Lisäksi liian pienet
marginaalit ja poista myös 'mistä tämä tieto on' -linkki. Varsinkin
varusteet-otsikon ylä- ja alapuolella pitäisi olla lisää tilaa."*

**Lähdelinkki pois.** Valikossa oli nappi, joka avasi aineiston nimen,
lisenssin ja hakupäivän. Se oli väärässä paikassa kahdesta syystä:
valikko on säädin eikä lukusali, ja täysleveä tekstinappi rikkoi
keskitetyn ladelman — se oli ainoa vasempaan reunaan tasattu asia
paneelissa, ja juuri se näytti keskittämättömältä.

Nimeäminen ei kadonnut: molempien nykyisten linssien aineistot
(Natural Earth ja ETOPO1) ovat luettelossa `js/lahteet.js`:ssä, joka
aukeaa ylärivin logosta, ja siellä ne ovat täydellisinä merkintöinä
lisensseineen. Tarkistettu ennen poistoa.

**Ilmaa.** Valikko peri pudotusvalikon tiiviit mitat ajalta, jolloin
siinä oli neljä tekstiriviä. Pehmuste 0,45 → 0,85 rem, osastojen väli
0,35 → 0,55 rem, ja otsikon marginaali 0,15/0,1 → 0,5/0,45 rem.

Otsikon yläpuolelle enemmän kuin alapuolelle: väli KUULUU sitä
seuraavalle osastolle, ja epäsymmetria sitoo otsikon omaan
ruudukkoonsa eikä edelliseen lohkoon.

### Opittua

**Mittaa ennen kuin korjaat, myös oman virheen kohdalla.** Luulin
ruutujen jättävän neljä pikseliä tyhjää sarakkeidensa oikeaan laitaan
ja ehdin kirjoittaa sen kommenttiin. Mittaus näytti, että ruudukko oli
keskitetty pikselilleen (poikkeama 0) ja ruudut täyttivät sarakkeensa:
lukemani "oikea 169" oli etäisyys paneelin reunaan, ei rako. Ainoa
keskittämätön asia oli lähdelinkki.

## v291 — Matkalaukun kahva pois (5.8.2026)

Omistaja: *"Ota matkalaukusta kahva pois. On siistimpi niin."*

Kahva rakennettiin kahdessa vaiheessa (v282 kortin sisään, v287 sen
ulkopuolelle kartan päälle), ja lopputulos oli tekninen onnistuminen
mutta yksi yksityiskohta liikaa: nahkareunus, ommel ja messinkikulmat
kertovat laukun jo, eikä neljäs merkki lisää siihen mitään.

Poistui sekä elementti että sen tyylit — ei piilotusta vaan poisto.

## v290 — Litteä valikko ja Matkakirja aina ylös (5.8.2026)

### Valikko ilman alivalikkoja

Omistaja: *"Hampurilaisesta voisi suoraan avautua kaikki varusteet sekä
äänisäädöt nappeina ja ihan alalla olisi säännöt ja uusi peli napit
keskitettynä. Näin päästäisiin kaikkiin suoraan käsiksi ilman
lisäklikkailuja. Varusteet ja äänet voisi olla omien otsikoiden alla.
Keskitä kaikki napit ja otsikot."*

Varusteet ja Äänet olivat nappeja, jotka avasivat oman paneelinsa
valikon päälle. Kaksi napautusta yhden säädön takana on paljon, kun
säätöjä on kahdeksan — ja paneelit vaativat oman poikkeussäännön
sulkulogiikkaan sekä kolme erillistä "sulje muut" -kutsua.

Nyt valikko on yksi pystysuora luettelo: kaksi otsikkoa, niiden alla
neljän sarakkeen ruudukot, ja alimpana viivan takana Säännöt ja Uusi
peli. Koodia lähti enemmän kuin tuli: kaksi avausnappia, niiden
kuvakkeenpäivitys, kaksi `hidden`-tilaa, `avaaLinssivalikko`,
`suljeLinssivalikko` ja kolme ristiinsulkukutsua.

Kaksi mittausta ohjasi asettelua:

- **Sarakemäärä.** Äänitiloja on neljä, ja varusteruudukko sai
  `auto-fill`ista kolme. Kolmen ja neljän ero näkyi heti vierekkäin,
  joten molemmat ovat nyt neljässä sarakkeessa.
- **Alarivin leveys.** "Säännöt" ja "Uusi peli" vaativat vierekkäin
  mitattuna 209 px puhelimella mutta 265 px tabletilla, koska nappien
  mitat tulevat kirjasimesta. Kiinteä vähimmäisleveys olisi ollut
  arvaus kummallakin; `width: max-content` alarivillä venyttää valikon
  juuri oikeaan mittaan molemmilla.

Sama tarkkuusansa kuin v284:ssä osui tähänkin: `.paavalikko
.linssi-liuskat` hävisi myöhemmälle `.linssi-valikko .linssi-liuskat`
-säännölle, ja sarakkeet pysyivät kolmessa. Valitsin piti kirjoittaa
kolmiosaisena.

### Matkakirja aina kartan yläreunaan

Omistaja: *"Matkakirja saisi olla aina kartan yläreunassa. Nyt
nimittäin isommalla iPad-ruudulla se menee alareunan nappien kanssa
päällekkäin, mutta ylhäällä se ei olisi tiellä."*

Kortin nurkka valittiin sen mukaan, missä on eniten merta — ja
alanurkat olivat mukana. Niitä oli jo yritetty karsia kahdella
painotuksella: alanurkat viimeisiksi kun kortit eivät mahdu riville, ja
yläreunalle 0,15:n etu tasatilanteessa. Kumpikin oli kiertotie sen
ympäri, että alanurkka on aina väärin — siellä ovat toimintonapit.

Nyt ehdokkaita on kaksi, ja molemmat ovat ylhäällä. Vasen vai oikea
ratkeaa yhä merenpinta-alan mukaan, jottei kortti peitä mannerta ja
kaupunkien nimiä. Mitattu kolmella ruudulla (1194 × 834, 834 × 1194,
402 × 874): nurkka on joka kerta `tl`.

### Opittua

**Painotus voi hävitä, kielto ei.** Alanurkka oli väärä paikka aina, ja
sitä yritettiin estää antamalla muille etua. Kun vaihtoehto ei ole
koskaan oikea, poista se listalta — älä pisteytä sitä alemmas.

## v287 — Laukun kahva laukun ulkopuolelle (5.8.2026)

Omistaja: *"Kahva pitäisi olla laukun (rajan) ulkopuolella,
läpinäkyvänä kartan päällä."*

v282 piirsi kahvan kortin sisään, koska kortilla on `overflow: hidden`
(kulmavahvikkeet vaativat sen) eikä ulos roikkuva kaari olisi näkynyt.
Lopputulos ei ollut kahva vaan kortille piirretty KUVA kahvasta.

Nyt kahva on kortin sisar ja asemoitu sen alapuolelle. `<dialog>` on
auki ollessaan `position: absolute`, joten se kelpaa sijoituskehykseksi
sellaisenaan, ja `.dialog`illa on jo `overflow: visible` — muutos on
siis rakenteen siirto eikä uusi kerros.

Kaaren silmukan läpi näkyy kartta, ja juuri se tekee siitä esineen eikä
kuviota. Mitattu: kahva alkaa tarkalleen kortin alareunasta (0 px) ja
on vaakasuunnassa keskellä (poikkeama 0 px).

`pointer-events: none`, jotta napautus kahvan kohdalla menee läpi
dialogille ja sulkee laukun kuten muukin ulkopuoli.

## v285 — Laukku aukeaa palkista, isommat varustekuvakkeet (5.8.2026)

### Sulje pois, napautus ulos tilalle

*"Ota Sulje-nappi pois, se on turha kun voi klikata vain karttaa."*
Laukku ei enää tummenna karttaa (v284), joten napautus sen ulkopuolelle
on luonteva sulkuele — sama kuin muissakin kartan päälle avautuvissa
korteissa. Esc sulkee yhä, koska `<dialog>` hoitaa sen itse.

### Laukku jatkaa yläpalkkia

*"Laukun reunat voisi olla samalla värillä kuin yläpalkki ja laukun
yläreunan voisi ottaa kokonaan pois, niin että näyttäisi että laukku
aukeaa suoraan yläpalkista."*

Kolme muutosta, jotka toimivat vain yhdessä: nahka on nyt palkin liu'un
alapään ruskea (#2b2015) entisen vaalean satulanahan sijaan, yläreunus
ja yläkulmien pyöristys ovat pois, ja kortti asetetaan palkin
alareunaan eikä pillerin alle välin päähän. Mitattu rako palkin ja
kortin välillä: **0 px**.

Väri oli näistä se, joka olisi jäänyt huomaamatta: kahden eri ruskean
raja olisi piirtänyt juuri sen viivan, jonka oli tarkoitus kadota.

### Isommat varustekuvakkeet

*"Suurenna niitä kuvakkeita isommaksi. Ovat nyt vähän liian vaikeita
painaa ja näkyvätkin liian pienellä."*

Neliö oli jo 59 pikseliä eli reilusti kosketuskohteen minimin yli, mutta
kuvake sen sisällä oli **19 px** — kolmasosa ruudusta. Silmä mittaa
painettavan kohteen KUVASTA eikä näkymättömästä laatikosta, joten nappi
tuntui pieneltä vaikka ei ollut.

Uusi koko on 34 px eli runsas puolet neliöstä. Se on annettu
pikseleinä eikä em-yksiköinä: ensimmäinen yritys käytti `2em`, ja
mitattuna kuvake jäi puhelimella 25 pikseliin mutta kasvoi työpöydällä
32:een — juuri väärin päin, koska sormella painetaan puhelinta. Neliö on
59 px molemmilla, joten kuvakkeenkin kuuluu olla.

### Opittua

**Kosketuskohteen koko on se, minkä käyttäjä näkee.** Nappi täytti
ohjeen mitat kaksinkertaisesti ja tuntui silti pieneltä. Kun palaute on
"vaikea painaa", mittaa kuvake äläkä laatikkoa.

## v284 — Laukun nahka, tausta ja aarreluettelo (5.8.2026)

Kolme korjausta edelliseen.

### Katkoviiva ei lähtenytkään

*"Miksi matkalaukussa on vielä katkoviivat reunoilla vaikka piti
vaihtaa nahkaiset reunukset?"*

v282 kirjoitti nahkakehyksen valitsimella `.passport-card`, mutta
`.dialog-card` asettaa oman kynäviivansa ja on tässä tiedostossa
**myöhempänä** (rivi ~4250 vs ~2360). Yhtä vahvat valitsimet
ratkaistaan järjestyksellä, joten myöhempi voitti. Mitattu selaimesta:
kortin reuna oli yhä `dashed 1px`, vaikka säännössä lukee `12px solid`.

Korjaus on kahden luokan valitsin `.dialog-card.passport-card`, joka on
vahvempi eikä riipu järjestyksestä.

### Laukku ei tummenna karttaa

*"Älä tummenna taustaa ollenkaan."* Muut ikkunat ovat lukemista varten,
ja niiden himmennys sulkee kartan pois häiritsemästä. Laukku on eri
asia: se aukeaa oman nappinsa alle kuin vetolaatikko, ja pelaaja katsoo
yhä karttaa sen vierestä. `#passport-dialog::backdrop` on läpinäkyvä —
tunnistevalitsin samasta syystä kuin yllä.

### Luetteloon vain löytyneet

*"Laita vain että kateissa: (määrä). Vasta sitten kun jotain löytyy niin
sen nimi tulee Aarnin luetteloon."*

v282 latoi koko luettelon rivi riviltä, jokaisen perässä "KATEISSA". Se
oli sekä spoileri että tautologiaa: yksitoista nimeä paljastui ennen
kuin pelaaja oli löytänyt yhtään. Nyt luettelo täyttyy matkan mukana,
kuten Aarnin oma luettelo täyttyi, ja yksi rivi kertoo montako on vielä
kateissa. Kortti lyheni samalla 636 → 484 pikseliin.

Samalla ratkesi kysymys, jonka omistaja esitti: *"mitä tarkoittaa että
unohdettu aarre on etsinnässä, onko sekin oma aarteensa?"* On —
maailmankartta on oma lautansa ja sillä on oma aarteensa, mutta sitä ei
ole tarkoituksella nimetty (tarinassa Aarnin luettelon sivu on juuri
siitä kohtaa revitty). Sen nimi on aineistossa yleistermi "Unohdettu
aarre", ja luettelossa se näytti siltä kuin lajin nimi olisi eksynyt
nimettyjen joukkoon. Nyt nimiä ei näytetä ennen löytymistä, joten
ongelma katosi rakenteen mukana.

### Opittua

**Sama tarkkuus + myöhempi sijainti = hiljainen ohitus.** Nahkakehys
oli kirjoitettu oikein ja se näkyi koodissa, mutta se hävisi
järjestyksessä. Kun ylikirjoitat jonkin yhteisen komponentin tyyliä,
tee valitsimesta vahvempi äläkä luota siihen, missä kohtaa tiedostoa
sääntö sattuu olemaan.

## v282 — Matkalaukku: Aarnin luettelo, omat kuvakkeet, nahka (5.8.2026)

Kuusi omistajan huomiota yhdellä kertaa.

### Vihreä passi → Aarnin luettelo

*"Itse asiassa koko vihreän passin voi poistaa. Tehdään sen tilalle
pääaarteista oma osio. En enää muista, pitikö niitä kutsua pääaarteiksi
vai jollain toisella nimellä. Selvitä se samalla."*

Selvitys: nimistö on päätetty 4.8.2026 ja sitova (tämän tiedoston luku
"aarteiden nimistö"). Pelaajalle näkyvissä teksteissä aarre on
**unohdettu aarre** — ei "pääaarre" eikä "tähti" — ja luettelon
erisnimi on **Aarnin luettelo**. Osio sai siis sen nimen.

Luettelo latoo yksitoista riviä lautojen omista aarrelaatoista
(`pack.tokens.types.star.name`), joten se ei voi mennä eri tahtiin
pelin kanssa. Löytynyt tarkoittaa TÄTÄ matkaa: aarteen löytymistä ei
tallenneta pelikertojen yli, eikä luettelo väitä muistavansa enempää.

Leimat kertoivat vain missä on käyty, minkä matkarivin Sijainti kertoo
jo. Luettelo kertoo mihin ollaan menossa. Passin leimat säilyvät
tallennuksessa — linssien omistus lepää niiden päällä; vain näyttö
lähti. Samalla katosi se turha vierityspalkki, joka oli leimaruudukon
`max-height: 46vh`.

### Tavaroilla omat kuvakkeet

*"Näihin voisi päivittää kuvakkeet vastaamaan paremmin tavaroiden
ominaisuuksia."* Kaikki kolme varustetta piirtyivät samana
suurennuslasina, koska ne saivat laattatyypin `linssi` kuvakkeen —
laatta on se, MISTÄ varuste löytyi, ei se MITÄ se on. Nyt kuvake tulee
linssimoduulista, samasta paikasta kuin valitsimessa: radio, vuoret,
vesistö.

Ansa matkalla: irrallinen SVG ei peri `.viiva-ikoni`-kuoren sääntöjä,
joten polut piirtyivät ensin mustina läiskinä. Sama vika kuin
linssikerroksessa (`kerros.js` tarkistaa juuri tämän) — irrallinen SVG
tarvitsee aina omat viivasääntönsä.

### Sisennykset ja selitteet

*"Nyt teksti ja tavarat ovat liian kiinni reunassa."* Nahkareunus on
materiaalia eikä marginaalia: silmä lukee sisällön alkavan vasta sen
sisäpuolelta, joten pehmusteen on oltava reunuksen LISÄKSI eikä sen
sijasta. 1,15 → 1,4 rem pystyyn ja 1,3 → 1,7 rem sivuille.

Tavaroiden selitteet katkesivat keskeltä sanaa ("Maailmanradi / o"),
koska ruutu oli 76 px ja nimet ovat yhdyssanoja. Mitattu pisin nimi on
"Topografialinssi", kuusitoista merkkiä; 108 px ja 0,68 rem riittää
sille yhdelle riville.

### Laukku aukeaa pillerin alle

`<dialog>` keskittää itsensä ruudulle, eikä sitä voi asemoida CSS:llä
sen napin suhteen joka sen avasi: nappi on ylärivissä ja dialogi
selaimen ylimmässä kerroksessa, eivätkä ne ole sukua toisilleen. Paikka
lasketaan avattaessa (`asemoiLaukku`) ja kirjoitetaan inline-tyyliin;
CSS-luokan tehtävä on vain purkaa keskitys.

Vasen reuna kohdistetaan pilleriin mutta pidetään ruudulla: kapealla
puhelimella kortti on lähes ruudun levyinen, ja pilleriin
kohdistettuna sen oikea laita valuisi yli. Mitattu: puhelimella kortti
alkaa x = 8 (pilleri on 106), työpöydällä x = 172 eli tarkalleen
pillerin kohdalta.

### Nahka ja kahva

*"Katkoviiva pois ja tilalle enemmän nahkaisen matkalaukun reunat ja
alas kahva."* Kortilla oli jo nahkakehys, mutta sen päällä näkyi
`.dialog-card`in yhteinen kynämäinen katkoviiva — kaksi materiaalia
päällekkäin, ja katkoviiva voitti, koska se on terävin.

Nahka syntyy kolmesta asiasta eikä väristä: paksusta reunuksesta,
ompeleesta reunuksen sisäpuolella ja messinkisistä kulmavahvikkeista.
Ommel on katkoviiva sekin, mutta lyhyin pistoin ja nahkan sisällä —
silloin se lukee ompeleeksi eikä piirretyksi rajaksi.

Kahva on kaari kortin alalaidassa: yksi elementti, jonka `border-bottom`
antaa nahkan paksuuden samasta luvusta kuin kehykselle. Sen alle on
jätettävä väli, koska se on samaa ruskeaa kuin alareunus — ilman väliä
kaari sulautui reunukseen ja näytti katkaistulta.

### Opittua

**Kysy nimistö dokumentista, älä koodista.** Omistaja ei muistanut,
mikä aarteen nimi oli, enkä minäkään — mutta se oli päätetty ja
kirjattu, ja koodikommenteissa elää tarkoituksella eri sana kuin
pelaajateksteissä. Ilman dokumenttia olisin valinnut väärän ja
rikkonut päätöksen, joka tehtiin juuri tämän estämiseksi.

## v280 — Pystysyy takaisin, vaakanaarmut pois (5.8.2026)

v277 poisti väärän kerroksen. Omistaja tarkensi: *"Se pystyraidoitus
oli kyllä ihan hyvä, mutta radioon on piirretty enemmän vaakamuotoa,
muutamia skraiduja, aivan kuin radiota olisi vähän kolhittu — otan ne
pois mutta palautan sen pystyraidoituksen."*

Kolme `repeating-linear-gradient`-kerrosta (jaot 7, 23 ja 61 px) ovat
takaisin: ne ovat puun syy, ja pystysuora syy on juuri se, mikä tekee
kotelosta puuta eikä maalattua peltiä.

Poistuivat kolme lähes vaakasuoraa jälkeä (174°, 7° ja 177°), jotka
esittivät kolhuja ja naarmuja. Ne olivat pieniä ja teräväreunaisia, ja
juuri siksi ne lukivat vahingoksi eivätkä iäksi: kolhu on
muodonmuutos, jota tasainen väriläikkä ei esitä.

Kotelon kavennus (800 → 470 px) jäi voimaan — se oli sama pyyntö, eri
kerros.

### Opittua

**Kysy kummasta kerroksesta on kyse, kun samassa pinnassa on monta.**
Kotelossa oli kolme raidoitusta ja kolme naarmua, ja "viirut" osui
molempiin. Valitsin väärän, ja korjaus maksoi kokonaisen version.
Kahden lauseen tarkennus omistajalta olisi maksanut vähemmän kuin
arvaus.

## v277 — Radio kapeammaksi ja viirut pois (5.8.2026)

Omistaja: *"Kavenna radiosta oikealta pois kaikki ylimääräinen sekä
poista soittimesta viirut, ne eivät näytä uskottavilta eivätkä tee
soittimesta vanhemman näköistä. Tsekkaa samalla että soitin on myös
ipadissa yms. oikean kokoinen."*

### Tyhjä puu oikeasta laidasta

Kotelon leveys oli 800 px siitä asti, kun siinä oli VU-mittari,
kaiutinsäleikkö ja kaksi vipukytkintä. v268 riisui ne kaikki mutta
leveys jäi. **Mitattu ennen: kotelo 800 px, sisältö 451 px — eli 341
pikseliä tyhjää puuta** sekä työpöydällä (2000 px) että tabletilla
(834 px). Puhelimessa vikaa ei ollut, koska siellä kotelo on ruudun
levyinen.

Uusi 470 px tulee sisällöstä eikä silmästä: näytön aukko on kiinteä
408 px (`radiosoitin.js NAYTON_MITAT`), merkkivalo väleineen 44 ja
kotelon oma täyte 19. Mitattu jälkeen: kotelo 470 px, tyhjää 11 px
kaikilla kolmella ruudulla.

### Pystyviirut pois

Kotelossa oli kolme `repeating-linear-gradient`-kerrosta 7, 23 ja 61
pikselin jaoilla, ajatuksena puun syy. Ajatus oli oikea mutta tulos
näytti vakosametilta: oikean puun syy ei ole tasavälinen eikä suora, ja
juuri säännöllisyys paljastaa sen piirretyksi. Kolme eri jakoa ei
riittänyt peittämään sitä — silmä löytää jaksollisuuden kolmestakin
päällekkäisestä.

Jäljelle jää lakattu pinta: pystyliuku antaa muodon, radiaaliset kajot
valon suunnan ja kolme pientä naarmua iän. Kiillotettu lakka ONKIN
sileä, joten lopputulos on lähempänä oikeaa pöytäradiota kuin kuvioitu
pinta oli.

### Opittua

**Kun laitteesta poistetaan osia, sen mitat on laskettava uudelleen.**
Kolme säädintä lähti kotelosta, ja kotelo jäi niiden kokoiseksi. Se ei
näy koodista mitenkään: leveys on yksi luku, joka oli oikein silloin
kun se kirjoitettiin.

## v274 — Tekijätietojen logo tummalle laatalle (5.8.2026)

Omistaja: *"Logo saisi olla tummalla pohjalla ennen tekstiä ja vähän
pienemmällä."*

Edellisessä versiossa logo oli pergamentin päällä. Kullattu folio on
tehty tummaa vasten: vaalealla paperilla se on kultaa kullan päällä ja
kirjainten ääriviivat katoavat. Ylärivillä logo näyttää hyvältä juuri
siksi, että ylärivi on tumma.

Nyt otsikkona on tumma laatta samalla liu'ulla kuin ylärivi
(#3a2a1c → #251b12), ja logo sen päällä. Laatta on kilpi eikä palkki:
se päättyy ennen tekstiä ja pyöristyy kulmistaan, jolloin paperi jatkuu
sen ympärillä.

Koko pieneni 22rem → 14rem. Mitattu: **352 × 86 → 224 × 55 px**, kun
ylärivillä logo on 94 × 23 — eli yhä yli kaksinkertainen, mikä oli
alkuperäinen toive ("avautuu isompana").

## v272 — Logo avaa tekijätiedot (5.8.2026)

Omistaja: *"Copyright-linkin voisi poistaa matkalaukusta ja siirtää
logoon. Eli jos logoa klikkaa, niin sama logo voisi avautua isompana.
Sen alla jatkuvat sitten samat tekstit, mitä oli matkalaukun linkin
takana."*

Linkki oli matkalaukun alalaidassa messinkilaatan näköisenä
nimikilpenä. Se oli kahden napautuksen takana ja väärässä paikassa:
laukku on pelaajan tavaroita varten, ei pelin tekijöitä. Nyt ylärivin
logo on itse se linkki, ja se on aina näkyvissä.

Lähdeikkunan otsikkona on sama logo isompana: **mitattu 352 × 86 px,
kun ylärivillä se on 94 × 23** eli lähes nelinkertainen. Se on koko
siirron idea — ikkuna avautuu siitä, mitä pelaaja napautti. Sen alla
ovat entiset tekstit muuttumattomina, 24 kappaletta.

Logo on nyt nappi, joten napin oletusasu on purettava. Sama ansa kuin
radion merkkivalossa kaksi versiota sitten: pelin yleinen
`button { min-height: 42px }` olisi kasvattanut ylärivin korkeutta.
Mitattu: ylärivi on yhä 53 px puhelimessa ja 57 px työpöydällä, ja
logo täsmälleen entisen kokoinen.

## v270 — Varusteiden kuvakkeet omiksi neliöikseen (5.8.2026)

Omistaja: *"Tee ikoneista irrallisia neliöitä pienellä pyöristyksellä
jotka täyttävät tilan tasaisesti."*

Kuvakkeet olivat liuskoja: kiinni toisissaan, valittu sulautui alla
olevaan pintaan. Muoto oli lainattu Tutki-ikkunan aiheliuskoista, ja se
kaatui siihen, että paneeli kavennettiin edellisessä versiossa puoleen.
Kahdelle riville kiertynyt liuskarivi ei ole liuskarivi vaan ruudukko,
jossa on turhia viivoja — liuskan koko idea on yksi rivi, jonka alta
valittu aukeaa sisältöön.

Nyt valitsin on ruudukko: `repeat(auto-fill, minmax(46px, 1fr))`.
`1fr` jakaa leveyden tasan, joten napit ovat keskenään samankokoisia
eikä oikeaan laitaan jää vajaata kaistaletta — se on se "tasaisesti".
Sarakemäärä tulee leveydestä, joten rivit lisääntyvät itsestään, kun
linssejä tulee lisää (suunnitelmassa yksitoista).

Mitattu: neljä 59 × 59 pikselin neliötä kahdessa sarakkeessa, kun ne
ennen olivat eri levyisiä liuskoja kiinni toisissaan. Kosketuskohde
kasvoi 40 pikselistä 59:ään.

Liuskatyyli jäi paikalleen sinne, minne se kuuluu: selitekortin
askelliuskoihin (`.linssi-selite`), joissa on tekstiä ja jotka ovat
yhdellä rivillä. Neliöt on rajattu valitsimeen — sama sääntö
molemmissa olisi tehnyt tekstiliuskoista neliöitä.

## v269 — Radion tauko, pyöreä valo ja Varusteet (5.8.2026)

Neljä omistajan huomiota riisutusta radiosta (v268) ja
linssivalikosta.

### Merkkivalo keskeyttää lähetyksen

*"Sitä painamalla lähetys pitäisi mennä tauko tilaan. Se ei vielä
toimi."*

v268 toteutti napin vaimennuksena: `asetaAani(0)`. Se ei toiminut,
koska voimakkuus kulkee soivan kanavan tilakoneen läpi —
`paivitaAanenvoimakkuus` kirjoittaa arvon **vain lukittuneelle ja
häivyttämättömälle** asemalle (ja hyvästä syystä: nupin vääntäminen
kesken virityksen ei saa nostaa kohinaa täyteen voimaan). Napautus
virityksen tai ristihäivytyksen aikana katosi siis jäljettömiin.

Nyt nappi kutsuu `audio.pause()` / `audio.play()`, jotka eivät kysy
keneltäkään. Se on myös oikea toiminto suoralle lähetykselle:
mykistetty virta jatkaa juoksemistaan, eli kuluttaa dataa ja karkaa
siitä kohdasta, johon kuuntelija sen jätti.

Kanavan vaihto nollaa tauon: uuden kaupungin valinta on pyyntö kuulla
se, ei jatko edelliselle tauolle.

Mitattu selaimessa vakoilemalla `HTMLMediaElement`:iä: ensimmäinen
napautus tuottaa `pause`, toinen `play`, ja `data-tauko` sekä napin
nimi vaihtuvat molempiin suuntiin.

### Pyöreä valo

*"Muuta punainen lamppu pyöreäksi."* Kun lamppu muuttui `<span>`:istä
`<button>`:iksi, se peri pelin yleisen `button { min-height: 42px }`
-säännön. Leveys tuli lampun omasta säännöstä ja korkeus sieltä, joten
merkkivalosta tuli soikio: **mitattu 22 × 42**, kun sen pitäisi olla
22 × 22. `min-height: 0` korjaa; kosketusalue on erillisessä
`::before`-levyssä eikä kärsi.

### Matalampi kotelo

*"Madalla vielä poistamalla alareunan tyhjä tila."* Tyhjä puu alimman
merkin alla oli iPhonen kotipalkin varaus, `env(safe-area-inset-bottom)`
= 34 px. Varaus oli oikea silloin, kun kotelossa oli kytkimiä; nyt
alimpana ovat asteikon koristeviivat, ja ainoat kosketuskohteet
(kaupunkien nimet) ovat asteikon yläosassa. Mitattu: kotelo pysyy nyt
105 pikselissä myös 34 pikselin turva-alalla, kun se ennen kasvoi
139:ään.

### Taikalasit → Varusteet

Nimi vaihtui, ja kuvake vaihtui mukana: lasit ovat yksi väline, ja
valikossa on jo radio ja kartta-aiheiset linssit. Uusi kuvake on
matkareppu läppineen ja solkineen — sama esine kuin pelin matkalaukku
mutta selässä, eli se ei sekoitu ylärivin kukkaroon.

Valikko kavennettiin puoleen: **290 → 144 px.** Samalla paljastui vika:
liuskat eivät mahtuneet riville vaan pinoutuivat neljäksi täysleveäksi
napiksi, koska päävalikon `.paavalikko button { width: 100% }` osui myös
niihin. Mitattu ennen: jokainen liuska 270 px eli koko leveys yhtä
kuvaketta kohti. Nyt ne ovat 40 × 40 ja kiertyvät kahden riveiksi.

### Opittua

**Kun elementti vaihtaa tagia, se vaihtaa myös perimänsä säännöt.**
`<span>` → `<button>` toi mukanaan pelin nappisäännöt, joista yksi
(`min-height`) muutti muodon. Sama koski liuskoja: ne perivät
päävalikon `width: 100%`, koska ne sattuvat asumaan sen sisällä. Kumpikin
näkyi vasta ruudulla — koodista näki vain oikeat mitat.

## v263 — Historia sai oman sivunsa (5.8.2026)

Omistaja: *"Lontoon tutki sivun ens. sivu voisi palauttaa
alkuperäiseen muotoon ja siirtää historia omalle sivulleen kuten
muutkin aiheet."*

Etusivulla oli kaupunki- ja maapalstojen alla myös ensimmäinen aihe.
Se tuli alkuperäisestä toiveesta sanatarkasti (*"Lontoo, Iso-Britannia
ja sen alla historia"*), mutta lopputulos oli epäsymmetrinen: historia
oli ainoa aihe ilman omaa sivuaan. Sen otsikko ei aloittanut sivua
kuten muiden, se jäi kahden palstan alle jatkoksi, eikä uusi tarttuva
osastonotsikko (v258) päässyt siinä oikeuksiinsa.

Muutos on kaksi riviä: sivumäärä on `1 + aiheet` entisen
`max(1, aiheet)` sijaan, ja aihe haetaan indeksillä `i - 1` eikä `i`.

Mitattu Lontoolla: sivu 1/10 on kaupunki ja maa ilman aihetta, sivu
2/10 on Historia omalla otsikollaan, sivu 3/10 Kuvataide. Ennen sivuja
oli yhdeksän ja historia oli osa etusivua.

## v262 — Nimilogo on kuva (5.8.2026)

Omistaja toimitti logon tiedostona: *"Käytä tätä läpinäkyvää logoa
pelissä."* Se ei ollut läpinäkyvä — tausta oli kirkkaanvihreä
(chroma key), ja omistaja huomasi sen itsekin heti perään.

**Vihreän avainnus.** Mitattu tiedostosta: tausta (11, 252, 11),
kulta (223, 182, 98). Erottelu tehdään suureella *vihreys* =
G − max(R, B), joka on molemmilla lineaarinen (R > B kummassakin),
joten sekoitussuhteen saa siitä suoraan: tausta 240, kulta −30, ja
reunapikselit siltä väliltä. Alfa on tuo suora, ja reunan väri
puretaan takaisin kaavalla F = (C − (1 − a)·K) / a.

Pelkkä avainnus ei riitä: reunoille jää vihreä hohde. Se poistetaan
säännöllä, joka pätee kaikelle kullalle — G on aina R:n ja B:n välissä,
joten `G = min(G, max(R, B))`.

Mitattu lopputuloksesta yläpalkin ruskealla taustalla: suurin vihreys
**−11**, eli yhtään vihertävää pikseliä ei jäänyt.

**Koko.** 720 × 176, 96 väriä, 28 kt. Väriero täyteen paletiin on
4,3/255 eli 1,7 % — näkymätön 36 pikselin korkuisessa logossa, ja
tiedosto kutistui 137 kt:sta.

**Asettelu.** Logon korkeus on sidottu entisen tekstilogon mittoihin,
jotta ylärivi ei muuta korkeuttaan: mitattu 36 px työpöydällä, 32 px
tabletilla, 22 px puhelimessa — kaikki täsmälleen samat kuin ennen.
Leveys seuraa kuvasuhdetta (4,09:1) ja kasvoi puhelimessa 80 → 91 px,
joka on sama budjetti kuin v237:ssä.

Samalla poistui koodia: kirjain kerrallaan flexillä tasattu alanimi ja
sen kaksi sääntöä olivat kiertotie sen ympäri, ettei kehitysselaimessa
ole pelin kirjasimia. Kuvassa mitat ovat kuvassa.

## v261 — Radio pysyy yhdellä rivillä (5.8.2026)

Omistaja iPadin kuvakaappauksesta: *"Miksi radio näyttää tuolta?"*
Kytkimet olivat pudonneet toiselle riville, säleikkö oli venynyt
vapautuneeseen tilaan ja kotelosta oli tullut puolityhjä ja puolet
liian korkea.

Syy on v257:n kavennus 880 → 800. Kotelon oma laskelma (samassa
tiedostossa, `@media max-width: 765px` -lohkon kommentissa) kertoo,
mitä yksi rivi vaatii: keskiö 440, mittari 112, säleikkö 80, kytkimet
102 ja kolme väliä 24 — eli 758, ja kotelon täyte päälle 777. Kun
`max-width` on 800, koko rivissä on **23 pikseliä pelivaraa.**

Ja rivitys päätetään osien TOIVEKOOISTA ennen kutistamista. Mikä
tahansa muutama pikseli riittää siis työntämään viimeisen osan
seuraavalle riville — esimerkiksi kytkinkilpien leveys pelin omalla
kirjasimella, jota kehitysselaimessa ei ole. Se on tämän repon
vanhin ansa, ja astuin siihen taas: mittasin kavennuksen selaimessa,
jossa mitta oli väärä.

Korjaus ei ole leveys vaan `flex-wrap: nowrap` yli 765 pikselin
ruudulla. Kahden rivin asettelu on jo olemassa omana lohkonaan
(`max-width: 765px`) ja se on tarkoituksellinen; sen yläpuolella
rivitys voi vain vahingoittaa. Nyt keskiö kutistuu muutaman pikselin —
sillä on `min-width: 0` — eikä mikään putoa riviltä.

Mitattu: kotelo pysyy 122 pikselin korkuisena 834, 768 ja 1440
pikselin ruudulla myös silloin, kun kytkinpylväs pakotetaan 145
pikselin levyiseksi (43 px leveämmäksi kuin täällä). Omistajan
iPadilla se oli 181.

### Opittua

**Tiukka asettelu ei ole tiivis vaan hauras.** Kun rivissä on 23
pikseliä pelivaraa, se ei ole "juuri sopiva" vaan rikki jokaisella
laitteella, jonka kirjasin, kieli tai zoom eroaa siitä yhdestä, jolla
mittasit. Jos mitta on tiukka tarkoituksella, rivitys on estettävä
erikseen — muuten pelivara on ainoa, mikä pitää asettelun kasassa.

## v260 — Osastonotsikon paksu yläviiva takaisin (4.8.2026)

Omistaja: *"Alkuperäinen tuplaviiva hävisi."* Sanomalehden osastoviiva
on paksu yllä ja ohut alla, ja paksu oli kadonnut kokonaan.

Syy oli v258:n paperikaistale otsikon yllä. `bottom: 100%` asettaa
absoluuttisen elementin alareunan **pehmustelaatikon** yläreunaan — ja
reunaviiva on sen yläpuolella, laatikon ja pehmusteen välissä. Kaistale
maalasi siis paperia tasan sen viivan päälle, jonka oli tarkoitus jäädä
näkyviin.

Pseudoelementtiä ei voi laittaa viivan alle z-indeksillä: `::before`
maalataan aina emonsa taustan JA reunan päälle samassa
pinoamiskontekstissa, myös negatiivisella z-indeksillä. Ainoa keino on
geometria — kaistaleen alareuna nostetaan viivan verran ylemmäs
(`bottom: calc(100% + var(--osaston-viiva))`).

Mitattu pikselirivi riviltä otsikon laatikon yläreunasta alkaen. Ennen:
rivit 0–2 kirkkaus 201/203/206 eli paperia, kun alaviiva luki 119.
Jälkeen: rivit 0–2 kirkkaus 74/73/73, alaviiva 119. Molemmat sekä
vieritettynä että vierittämättä.

### Opittua

**Reunaviiva ei ole laatikon sisällä.** `bottom: 100%`,
`height: 100%` ja muut prosenttimitat lasketaan pehmustelaatikosta,
eivät reunalaatikosta. Kun elementillä on reuna ja jokin asetetaan sen
viereen prosenteilla, reunan leveys on aina lisättävä käsin — muuten
uusi kerros syö juuri sen viivan, jonka piti näkyä.

## v259 — Vesistölinssi ja tarttuvan otsikon tausta (4.8.2026)

### Vesistölinssi

Omistajan päätös: *"Ota joet pois kokonaan. Täytyy tehdä niistä vaikka
oma linssi, missä näkyisi vain pelkät joet ja järvet. Nykyinen on liian
sekava."* Joet lähtivät pohjakartalta v255:ssä; nyt niillä on paikka.

`js/linssit/vesistot.js`. Kolme ratkaisua, joista jokainen oli
pakollinen:

**1. Kartta himmenee alta.** Ensimmäinen kerros on vaalea
pergamenttihuntu koko laudan yli. Ilman sitä uomat piirtyisivät täyden
kartan päälle, ja lopputulos olisi tarkalleen se sekavuus, joka pyydettiin
poistamaan. Huntu on koko linssin idea, ei koriste.

**2. Viivanleveys on ruudun pikseleitä, ei laudan yksiköitä.**
`vector-effect="non-scaling-stroke"`. Pohjakartan uomat mitattiin laudan
yksiköissä, jolloin ne levenevät kartan mukana — oikein maastolle,
väärin tälle. Linssi piirretään KERRAN eikä zoomin mukana, ja lauta on
12000 yksikköä leveä: maailmankuvassa yksi pikseli on noin kymmenen
yksikköä, joten 4 yksikön uoma olisi ollut näkymätön. Vesistökartta on
verkosto eikä maasto, ja verkoston viiva on merkintä, ei mitta.

**3. Nimet EIVÄT ole linssin kerroksessa.** Ne piirtyvät kartan omaan
maastonimikerrokseen (`drawMaastonimet`, uusi `joet`-lippu), joka
piirtyy uudelleen joka zoomilla ja osaa siksi näyttää nimen oikean
kokoisena ja vain kun se on luettava. Linssin sisällä nimi olisi
jäätynyt yhteen kokoon. Ankkuri on uoman kiinteä keskikohta — sama
korjaus kuin v253:ssa (*"Joen nimi hyppii uusiin paikkoihin"*).

Elementtejä on **212**, eli alle moottorin rasterointirajan (400). Se on
mitattu eikä arvattu, ja se on ehto: rasteroituna `non-scaling-stroke`
paistuisi kuvaan yhdellä mittakaavalla. Siksi järvi on yksi polku
(täyttö ja reuna samassa) ja joki yksi veto — pohjakartan kolmen vedon
nauha olisi nostanut luvun yli viiden sadan.

Linssi ansaitaan kokemuspisteillä (rekisterissä `manner: null`), eli se
on toinen kokemuspistelinssi radion jälkeen.

### Tarttuvan otsikon tausta

Omistaja v258:n jälkeen: *"Miksi muutit ulkoasua, piti vain pitää
ylhäällä näkyissä."* Kuvakaappauksessa otsikon takana oli tumma palkki,
jonka keskusta hohti.

Syy: annoin otsikolle saman taustan kuin kortille, ja `--card-bg` on
**säteittäinen liukuväri**. Liukuväri mitoitetaan sen elementin
laatikkoon johon se maalataan: kortissa ympyrä on tuhat pikseliä leveä
ja vaihtuu huomaamatta, kuudenkymmenen pikselin otsikossa koko liuku
puristuu otsikon mittaan.

Mitattu omistajan kuvakaappauksesta: palkissa `#ebd9b4` keskellä ja
`#d0b686` reunassa, kun paperi sen alla on tasainen `#e5d2a9` — eli
vaihtelua 27 yksikköä siellä, missä paperissa on 3.

Tilalla on tasainen pohjaväri ja sama rakeisuus kuin kortilla.
Rakeisuus on 140 pikselin laatta eikä liukuväri, joten se ei mitoitu
elementin mukaan. Pohjaväri on laskettu siitä, mitä se peittää.
Mitattu korjauksen jälkeen: palkki `#e6d2aa`, paperi `#e5cfa5`.

### Opittua

**Liukuväri on laatikkonsa kokoinen.** Kaksi elementtiä, joilla on sama
`background`-sääntö, eivät ole samanvärisiä, jos ne ovat eri kokoisia.
Se on ilmeistä jälkikäteen ja näkymätöntä koodissa. Kun peität jotain
osaksi, käytä väriä joka ei riipu peittäjän mitoista.

## v258 — Tutki-osaston otsikko tarttuu yläreunaan (4.8.2026)

Omistaja: *"Otsikko saisi pysyä näkyvissä myös alas vierittäessä."*
Kirjallisuus-sivu on pitkä (mitattu 3808 px puhelimella), ja sen
puolivälissä lukija ei enää tiedä, minkä osaston juttua lukee.

`.wiki-kategoria .aihe-nimi` on nyt `position: sticky`.

**Tarttumakohta ei ole nolla.** Se oli koko tehtävän ainoa oikea
kysymys, ja vastaus on eri kummassakin koossa:

- **Työpöydällä** arkin yläreuna ei ole kortin laatikon yläreuna.
  Paperin reuna on piirretty aaltoviiva, joka alkaa 6 px laatikon
  sisältä ja aaltoilee vielä 5 px syvemmälle (`arkinAariviiva`: `M = 6`,
  aallot 3,4 + 1,6). Nollassa otsikon yläviiva olisi jäänyt leikkauksen
  ulkopuolelle — eli näkymättömiin juuri siltä osin, joka oli tarkoitus
  näyttää.
- **Puhelimessa** paperireunaa ei ole, mutta yläreunassa on umpinainen
  turvakaista Dynamic Islandin alla
  (`env(safe-area-inset-top) + 0.55rem`). Otsikko pysähtyy tarkalleen
  sen alareunaan.

Molemmat arvot ovat samassa muuttujassa `--arkki-tarttuma`, joka
määritellään kortilla ja jonka puhelinsääntö korvaa. Mitattu: neula
pysähtyy 15 px:iin työpöydällä ja 9 px:iin puhelimella, kun sivua on
vieritetty 1400 px.

Kaksi pikkuseikkaa, jotka olisivat rikkoneet lopputuloksen:

1. **Yläreunus oli marginaali, ei pehmustetta.** Tarttuvan elementin
   pysähdyskohtaa siirtää sen oma marginaali, joten `margin: 0.2rem 0
   1rem` olisi jättänyt 3 px:n raon, jossa vierivä teksti vilkkuu.
   Marginaali pois, pehmuste tilalle.
2. **Otsikon yläpuolelle jää rako** (se 9–15 px). Se peitetään
   `::before`-kaistaleella, joka ulottuu palstan reunojen yli
   negatiivisella sivumarginaalilla — muuten teksti pilkottaisi
   sivuilta.

### Opittua

**Kun elementti tarttuu reunaan, kysy mikä reuna.** Laatikon reuna ja
näkyvä reuna ovat eri asia aina kun päällä on leikkaus, piirretty
kehys tai turva-alue. `top: 0` on oikea vastaus vain siinä
erikoistapauksessa, että ne sattuvat olemaan sama.

## v257 — Järvet takaisin, radio alas, VU-vahti (4.8.2026)

**Isot järvet takaisin kartalle, vain joet pois** (omistajan tarkennus).
Järvi on paikka kuten vuoristokin: se on kartalla siellä missä se on eikä
liiku silmissä. Joki on viiva, joka kulkee koko mantereen halki ja
risteää kaiken kanssa — juuri se teki kartasta sekavan. Järvien nimet
palasivat samalla; nimi piirretään sinne missä sen kohde on.

**Radio kiinni alareunaan ja kapeammaksi.** Kehyksellä oli pehmuste joka
puolella, ja laite kellui muutaman pikselin irti reunasta — pöytäradio
seisoo pöydällä eikä leiju sen yllä. Alapehmuste on enää se, mitä iOS:n
kotipainikepalkki vaatii. Kotelo 880 → 800 px; kavennus tulee säleikön
puolelta, jossa on eniten tyhjää, eikä syö mittarin kiinteää ikkunaa.

**VU-neula ei jää kuolleeksi soivan aseman päälle.** Mitattu lukema voi
jäädä nollaan syistä, joita tästä ympäristöstä ei näe: selain antaa
reitityksen mutta ei ääntä, iOS mykistää reititetyn elementin, tai
lähetys puskuroi. Vahti ei arvaa syytä eikä yritä korjata sitä — se
katsoo vain lopputulosta: jos mitattu lukema on ollut nolla
yhtäjaksoisesti 1,5 sekuntia, VAIKKA lähetys soi eikä ole vaimennettu,
lukija vaihdetaan jäljiteltyyn. Kerran virtaa kohti, ei takaisin:
sahaaminen näkyisi neulassa nykimisenä. Asteikko ei vaihdu, vain lukeman
lähde — "ei vaihdeta herkkyyttä" pysyy voimassa.

**v256:n tekstikoko tuli vasta nyt voimaan.** Tiedostossa oli JO
`.wiki-nosto .teksti` -sääntö, myöhempänä kuin uusi, ja koska ne ovat
samaa tarkkuutta, myöhempi voitti: lukukirjasin tuli voimaan mutta koko
ja rivinkorkeus jäivät vanhoiksi (0,9 rem / 1,5). Nyt yksi sääntö yhdessä
paikassa, ja mitattuna 16,3 px / 26,4 px. **Puolittain voimaan tullut
muutos on pahin laji, koska se näyttää tehdyltä.**

### Tutki-sivun kuvista

Kuvat eivät ole rikki koodin puolesta. Osoitteet ratkeavat oikein ja
tiedostot ovat peilissä: `curl` hakee molemmat esimerkkikuvat HTTP 200:lla
(986 kt ja 631 kt). Tästä ympäristöstä EI voi näyttää enempää — selain ei
pääse peiliin lainkaan (`ERR_CONNECTION_RESET`), koska hiekkalaatikon
proxy ei välitä selaimen pyyntöjä samaan tapaan kuin curlin.

Mitä tiedetään: jos kuvia epäonnistuu peräkkäin, peli sammuttaa peilin
istunnon ajaksi (`peiliPetti`, sessionStorage) ja siirtyy Commonsiin. Se
nollautuu kun sovellus suljetaan ja avataan uudelleen. CSS ei voi estää
kuvan latautumista, joten v256:n typografia ei ole syy.
