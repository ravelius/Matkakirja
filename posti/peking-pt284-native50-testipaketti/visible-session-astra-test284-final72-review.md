# Astra: PT284, toimituspaketin 72 GLB:tä ja 15 uudelleentuontikuvaa

**Hyväksyttävä rajattuun välitestiin tunnetuin rajoituksin. Korkea lopullinen laatutavoite on edelleen kesken.** Katsotuissa kuvissa ei ilmene uutta laajaa rakennuspeiton rikkoutumista, materiaalien romahtamista tai V5-kattokorjauksen palautunutta virhettä. Puuston korttimaisuus ja LOD0→1-muutos ovat selviä; lisäksi aukion tiekaistojen vaaleampi materiaalivaste sekä hutongin hienodetaljien säilyminen jäävät lopullista laatua edeltäviin tarkistuksiin. OFFGAME jatkuu.

## Tarkastettu aineisto ja täsmäys

Katsoin henkilökohtaisesti kaikki 15 alkuperäistä toimitus-PNG:tä: koko alueen 6 LOD0-näkymää (1600 × 900) sekä laatan (2,3) kaikki 3 LOD-tasoa kolmesta kulmasta (960 × 540). Vertailin kuutta koko alueen kuvaa kuuteen native50-Neutral-alkuperäiseen. Oikea referenssihakemisto on `preview50/contract276-neutral`, ei `round50/neutral`; sen render-proof yksilöi kuvat ja native50-mallin. Kaikki 21 kuvapinniä tarkistettiin tositteista.

Laskin jokaisen 72 toimitus-GLB:n SHA256:n ja vertasin sitä sekä omaan GLB-proofiin, yhteiseen independent-binary-readbackiin että repack-kuittaukseen: kaikki täsmäävät. Render-proofin 26 eri syöte-GLB:tä täsmäävät näihin samoihin tiedostoihin, ja sen yhteisen readbackin SHA256 täsmää. 27 import-riviä sisältää laatan (2,3) LOD0:n kahdesti. **Kuvissa on 26 eri GLB:tä, ei kaikkien 72:n erillistä visuaalitestiä.**

Mitattu tiedostokoko on **154 356 152 tavua**. Tuottajan binääritosite ilmoittaa **1 374 177 kolmiota** ja rakennecheckien PASS-tuloksen. SHA- ja tiedostokokotarkistus on oma; rakenteellista mesh-/omistus-/materiaalibittiauditointia en suorittanut uudelleen.

Vientialue on ENU [-1100, -1750, 1100, 1250]. Native50:n pohjoisosa y1250–2000 ja pelivesi puuttuvat tarkoituksella. Blenderin TBN eroaa pelin shaderista; kuvat ovat geometrian, värin ja alfan diagnostiikkaa. Valaistus-/normal-materiaalivastetta ei hyväksytä Unityyn näiden perusteella. Native-referenssin 128 näytteen ja toimituskuvien 64 näytteen sekä esitysten erojen vuoksi koko kuvan pikselieroa ei käytetä laatu- tai yhtäläisyysmittarina.

## Kuuden kaupunkinäkymän havainnot

- **ilma:** 24 laatan alue muodostaa jatkuvan kaupunkikokonaisuuden näytetyssä ilmakuvassa. Palatsin katot, muurit, kaupunginosat ja aukion massat sijoittuvat referenssin mukaisesti. Ei selvää kokonaista puuttuvaa sisälaattaa tai leveää läpinäkyvää sisäsaumaa. Harmaat vesialueet ja lyhyempi pohjoisreuna ovat rajauksen mukaisia.
- **taihedian:** Kultakattojen peitto, tiilikuvio, punaseinät, marmoriportaat ja LOD0-kaiteet säilyvät. Keskirakennuksen kohdalla ei näy laatan saumasta syntyvää halkaisua tai uutta kattoläpäisyä. Taustan puut ovat aiempaa selvästi korttimaisempia. Syvät varjot ja PT303:n kattosävy pysyvät hyväksytyissä päätöksissä.
- **aukio:** Neljä native50:n vaaleaa massaa, muistomerkki, kiveys ja ruudukko säilyvät. Aukion ympäröivät leveät tie-/kaistanauhat ovat neutraalireferenssiä selvästi vaaleampia ja tasaisempia. Tämä on näkyvä materiaalivaste-ero, jonka syytä ei ratkaista kuvasta eikä kohdisteta alkuperäiseen kattosävyyn. Massojen myöhempi PT304-korjaus ei kuulu native50-vientiin.
- **beihai:** Saaren rakennukset, valkoinen torni ja rantareuna pysyvät koossa. Vesi ja pohjoisen vastarannan konteksti puuttuvat tarkoituksella. Tiheä puusto näyttää kerroksellisilta, risteäviltä korteilta: peitto toimii, mutta luonnollinen latvusmuoto ei säily native50:n tasolla.
- **jingshan:** Etualan yläkortit ja pystykortit muodostavat näkyviä vaakahyllyjä ja tummia risteyksiä. Tämä on selvä lähilaadun raja. Taustakaupungin puuttuminen kuuluu y1250-rajaukseen; halli ja paviljongit säilyvät.
- **hutong_ilma:** Pihat, rakennuspaikat ja kattorungot säilyvät vientialueella. Harmaiden kattojen hieno pintavaikutelma ja pienet julkisivudetaljit ovat yksinkertaisempia/pehmeämpiä; karkeaa UV-räjähdystä tai väärän materiaalin magentaa ei näy. Etualan puut ovat erittäin korttimaisia. Ylävasemman avoimet, leikkautuvat piha-/maaosat liittyvät pohjoiseen aluerajaan; kuva ei osoita kaikkien rajapintojen sulkeutumista.

## Konkreettiset puutteet ja välitestin rajat

- **Puuston lähilaatu:** Beihai, Jingshan ja hutong näyttävät selviä vaakakortteja, ristikoita ja toistuvia latvuslevyjä. Yläkortit pitävät latvuksen näkyvänä top-kulmasta, ja reunat ovat alfa-leikattuja; en näe laajaa puiden katoamista tai läpinäkymättömiä suorakaiteita. Muoto ei kuitenkaan vastaa natiivin puuston korkeaa laatua. Tummuuden voimakkuudesta ei voi erottaa kohdepelin normal-vastetta Blenderin TBN-erosta.
- **LOD-siirtymä:** saman kuvakulman LOD0→1 poistaa kaiteet ja terassin pienesineitä sekä vähentää muuta detaljia. Tämä on näkyvä muutos, ei todistus runtime-virheestä. Oikea vaihtoetäisyys, liike, alfareunat ja naapurilaattojen eri LOD-tasot on tarkistettava erikseen. LOD1→2 on selvästi pienempi muutos.
- **Tiekaistojen materiaalivaste:** aukion leveät reunanauhat ovat native50-Neutral-kuvaa vaaleampia. Tarkista viedyn tiemateriaalin baseColor/PBR-kytkentä ja kohdeshaderin vaste ennen lopullista materiaalien vastaavuuden hyväksyntää. Tämä näkyvä ero ei yksin kerro juurisyytä eikä oikeuta alkuperäisten RGB-kuvien tai kattosävyn muuttamista.
- **Hienot pinnat ja saumat:** hutongin kattotiilien pintavaikutelma ja pienet julkisivulistat yksinkertaistuvat. Suuria UV-venymiä, koko rakennuksen väärää tekstuuria tai selvästi avointa sisäistä laattasaumaa ei katsotuissa kuvissa näy. Tämä ei todista kaikkien UV-saumoiden, alapintojen tai alle pikselin rakojen virheettömyyttä. Rajalla säilyvien rakennusosien alta leikkautuva maanpinta on näkyvä aluerajauksen seuraus, ei osoitus kadonneesta sisälaatasta.

## V5-korjaus ja repack laatan (2,3) kaikissa LOD-tasoissa

Taihedianin aiempi P2-läpityöntymä pysyy korjattuna. Kohdassa (590,256) toimituskuvien RGB:t ovat LOD0 [183,133,46], LOD1 [181,131,44], LOD2 [184,133,46]. Kaikissa näkyy kultainen lape. Kattojen pääpeitto säilyy myös viisto- ja yläkuvissa, eikä aiempi tumma lovi palaudu.

LOD2:n toimitus-GLB on täsmälleen hyväksytyn V5-pilotin tiedosto (`471fd596784e5bf07810f43816eea2d2551c21ac04f5243d4250f68efe8615f2`). Sen kolme uutta PNG:tä eivät ole bittisamat: suurimmat RGB-kanavaerot V5-pilottiin ovat Taihedian 4, high-oblique 2 ja top 3/255; ≥20-eroja ei ole. Silmämääräinen korjaushyväksyntä säilyy.

Repack-kuittauksen mukaan laatan LOD0:ssa ja LOD1:ssä muuttui kummassakin 16 normal/MR-kuvaa; LOD2:ssa ei muuttunut yhtään. Siksi ei väitetä, että kaikkien kolmen LOD:n tekstuurit olisi tässä pienennetty. Koko paketin kuittaus ilmoittaa geometrian, albedon, alfan ja kompensoitujen puunormaalien suojauksen. En toistanut koko tätä tavuauditointia. Näissä kuvissa ei näy pienennyksen jälkeen uutta laajaa materiaalirikkoa, mutta puhdasta koko kaupungin repack-only-verrokkia tai pelin PBR-vastetta ei tässä arvioida.

| LOD | Kuva | V4 → toimitus: suurin kanavaero | Keskimääräinen ero | Pikseleitä ≥20 |
|---|---|---:|---:|---:|
| 0 | taihedian | 40 | 0.174107 | 81 |
| 0 | high-oblique | 34 | 0.197577 | 14 |
| 0 | top | 39 | 0.230523 | 8 |
| 1 | taihedian | 50 | 0.113209 | 75 |
| 1 | high-oblique | 31 | 0.163637 | 3 |
| 1 | top | 23 | 0.185114 | 2 |
| 2 | taihedian | 96 | 0.035525 | 112 |
| 2 | high-oblique | 58 | 0.009376 | 15 |
| 2 | top | 80 | 0.009914 | 15 |

Taulukko kuvaa yhtä aikaa diagonaalikorjauksen, mahdollisen repackin ja renderöinnin erot; se ei eristä yhtä syytä eikä ole hyväksymiskynnys. Muutoksia ei kuitata kokonaisuudessaan kohinaksi.

## Päätös

**Välitesti:** katsotut toimitusversiot sopivat rajattuun jatkotestiin. Syöteketju on tarkistettu, päämateriaalit ja rakennuspeitto ovat ymmärrettäviä, laatan (2,3) V5-korjaus säilyy ja tunnetut puusto-/LOD-rajoitukset on kirjattu. Tämä ei ole lupa integraatioon tai julkaisuun.

**Lopullinen korkea laatu:** ei hyväksytty. Puuston siluetti, todelliset LOD-vaihdot, materiaalivaste ja hienodetaljit, liikkuvat/sekamuotoiset laattasaumat, pelivesi sekä kohdepelin normal-valaistus tarvitsevat erillisen validoinnin. Muun alueen LOD1/2-kuvia ei katsottu. PT303:n hyväksyttyä kattosävyä tai hyväksyttyjä syviä varjoja ei avata uudelleen. PT304/native51:n massojen jatkokorjausta ei väitetä sisältyväksi native50-pakettiin.

Kirjoitin vain tämän raportin ja rinnakkaisen JSONin. Ei Blenderiä, toteutusmuutoksia, kuvamuokkauksia, alidelegointia tai viestejä muualle. JSON sisältää kaikki 72 GLB-pinniä, 15 toimituskuvaa, 6 natiivireferenssiä, tositteiden SHA256:t ja numeeriset vertailut.
