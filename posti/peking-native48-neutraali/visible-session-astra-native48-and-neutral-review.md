# Native48 ja neutraali referenssi – visuaalinen arvio

2026-10-15T16:42:13.946407+03:00 (Europe/Helsinki). OFFGAME.

**Hyväksyn erikseen rajatun coffer48-korjauksen, kuuden historiallisen kontrolli-RGB-kuvan regressiotarkastuksen, kuuden semantic-kuvan karkean luokittelun ja kuusi neutraalia kuvaa materiaalien tarkastelureferensseiksi.** Kokonaislaatu, pelivienti ja runtime jäävät avoimiksi.

Kaikki **18/18 alkuperäistä on henkilökohtaisesti nähty**, dekoodattu ja SHA-256-pinnitetty; puuttuvia0. Kaikki ovat1600×900. Avasin lisäksi kaikki kuusi47:n RGB-vertailukuvaa uudelleen. Kierroksen47 semantic-kuvat oli katsottu aiemmassa arviossa; nyt niiden pinnit ja tarkka RGBA-vastaavuus tarkistettiin uudelleen.

Tallennetun native48-mallin itsenäisesti laskettu SHA-256: `41b70274ac53acd5805474df4aee326705af7356df8756c01d73f6be86d2891d`. Mallia ei avattu Blenderissä.

## Coffer-korjaus ja kontrollisarja

Taihedianin kehysrivit, syvennykset, terassit ja varjot pysyvät ehjinä. Pilotin hyöty säilyy koko kuvassa ilman havaittua uutta liitos- tai varjoregressiota. Full-native48:n alueen XYXY `[480,620,1310,820]` vertailu korjatun pilotin GPU-kuvaan antaa maksimin **8/255**, CPU-kuvaan **9/255**; kummassakaan ei ole vähintään20/255 eroavia pikseleitä. Tämä ei ole uusi täyden ruudun CPU/GPU-parivertailu.

Tunnetuissa koko kuvan kohdissa native48-GPU on `(1270,683)`→`[163,156,148]` ja `(519,776)`→`[178,173,166]`. Molemmat ovat enintään1/255 päässä pilotin korjatuista CPU- ja GPU-arvoista. Aiemman75/255-pisteen korjatun ulkonäön säilyminen on siten tuettu. Kaikkien723asennuksen yksittäisiä liitoksia tai koko ruudun laiteriippumattomuutta ei tällä todisteta. Uudet alapinnat ja sisäkatto säilyvät arvioituna A-yksityiskohtana.

| Kontrolli48 vs47, sama AgX | Suurin RGB-kanavaero /255 | Pikselit ≥20 |
|---|---:|---:|
| ilma | 3 | 0 |
| taihedian | 89 | 556 |
| aukio | 3 | 0 |
| beihai | 1 | 0 |
| jingshan | 1 | 0 |
| hutong_ilma | 6 | 0 |

Taihedianin suurempi ero on todellisen geometriakorjauksen paikallista kuvamuutosta; sitä ei kutsuta pelkäksi kohinaksi. Muissa viidessä kuvassa ero on enintään1–6/255 eikä näkyvää regressiota havaita. Kaikki kuusi semantic-kuvaa ovat dekoodattuna **RGBA-pikselitarkasti samat kuin47:ssä**. Ne näyttävät johdonmukaisilta: punainen rakennettu rakenne, vihreä puusto/runko, sininen vesi ja harmaa maa. Sama luokka kattaa kiven ja rappauksen sekä maan eri pintalajit; semantic ei yksin todenna cofferin topologiaa tai materiaalisaumoja.

## Näkymäkohtainen tarkastus

### ilma

**Kontrolli:** Palatsin katot, vallihauta, järvet, puustovyöhykkeet ja ympäristön massat säilyvät. Ei näkyvää uutta aukkoa, mustaa peittoa tai mittakaavaregressiota.

**Semantic:** Rakenteiden punainen, veden sininen, puuston vihreä ja maan harmaa seuraavat samoja pääalueita kuin47:ssä.

**Neutraali referenssi:** Keltaiset katot, punaiset seinät, harmaa kaupunki ja puusto erottuvat. Vesialueet ovat vihreämmän sävyisiä kuin historiallisessa kontrollissa, mutta niitä arvioidaan vain Blender-previewna. Koko mallin rajaus ja tasainen harmaa tausta näkyvät; ei laajaa valaistuksen peittovirhettä.

### taihedian

**Kontrolli:** Coffer-kehysten rivit, avoimet syvennykset ja terassien reunat pysyvät luettavina; pilotin paikallinen hyöty säilyy. Ei uutta näkyvää rakoa, liitosporrasta tai laajaa varjovirhettä. Kahden portin aiempi seinä/plintti-korjaus näyttää edelleen ehjältä.

**Semantic:** Hallin, portaiden, terassien ja kaiteiden rakenneluokka säilyy punaisena; piha harmaa ja puusto vihreä. Sama luokka ei erota marmoria rappauksesta eikä todista cofferin suljettua topologiaa.

**Neutraali referenssi:** Marmorin kuvio, portaat ja kehysrivit erottuvat. Punaseinä, kattotiilet ja räystäiden koristelu säilyttävät värieronsa; katot ovat voimakkaan oranssinkeltaisia mutta tiilikuvio näkyy. Etuhallin ovet ja räystään aluset jäävät syvään varjoon, joten niitä ei hyväksytä kaikilta osin optimaalisesti luettaviksi.

### aukio

**Kontrolli:** Kiveyskuviot, portti, kulkualueiden rajat ja reunapuusto säilyvät. Ei näkyvää uutta regressiota. Laajat tyhjät pinnat ja kulmikkaat nurmilaikut jäävät.

**Semantic:** Aukio, kiveys, tie ja nurmi ovat harmaata ground-luokkaa; puut vihreitä, rakennukset punaisia ja taustan vesi sinistä.

**Neutraali referenssi:** Vaalea kiveys ja tummat kuvioviivat erottuvat selvästi; portin punainen ja katto pysyvät luettavina. Valaistus ei hävitä kuviota, mutta laaja pinta näyttää edelleen tasaiselta ja toistuvalta; tämä ei yksin ole valaistusvirheen todiste.

### beihai

**Kontrolli:** Stupa, temppelit, rantareitti, metsäpeite ja veden rajat säilyvät ilman näkyvää uutta saumaa tai aukkoa.

**Semantic:** Sininen vesi, harmaa saarimaa, vihreä puusto sekä punainen stupa/temppelit/rantamuuri ovat johdonmukaiset.

**Neutraali referenssi:** Valkoisen stupan muoto ja kerrokset erottuvat, samoin temppelien harmaat katot ja punaiset seinät. Latvusten sulautumista ja veden pintakuvion toistoa jää. Rantamuuri ja nurmen kulmikkaat rajat näkyvät; vesi ei ole pelin vesimateriaali.

### jingshan

**Kontrolli:** Latvusten epäsäännöllinen siluetti, paviljongin kattotasot ja taustan rakennusrivit säilyvät. Paikalliset tummat välit, latvusryhmien sulautuminen ja toisto jäävät.

**Semantic:** Puusto/rungot vihreitä, paviljongit ja rakennukset punaisia, maan pilkahdukset harmaita; ei uutta luokkavaihdosta.

**Neutraali referenssi:** Lehvästö, rungot ja maan pilkahdukset erottuvat ilman yhtenäiseksi mustaksi muuttuvaa metsäpeittoa. Tiheä latvusmassa sulautuu edelleen ja peittää osan paviljongista; tummia sisäosia jää. Tämä on käytettävä referenssi, ei valmiin puustolaadun hyväksyntä.

### hutong_ilma

**Kontrolli:** Kattorivit, piha-aukot, puusto, nurmi ja puuvarjot säilyvät; ei uutta näkyvää katkeamaa. Pitkien samanlaisten kattorivien toisto jää.

**Semantic:** Punaiset rakennussiluetit ja piha-aukot, vihreä puusto sekä harmaa maa vastaavat RGB:tä. Nurmea ei erotella omaksi vihreäksi pintaluokaksi.

**Neutraali referenssi:** Harmaiden tiilikattojen suunta ja kuvio, ikkuna-/ovijaksot, kiveys, nurmi sekä lehdet ovat luettavissa. Varjot säilyttävät pihan ja puiden yhteyden. Terävät maapintarajat, laajan kiveyksen ja kattorivien toisto jäävät.

## Neutraalin referenssin hyväksynnän rajaus

Neutraali sarja valmistui ennen lopullista arviota, ja kaikki kuusi SHA:ta vastaavat render-proof.json-todistetta. Todiste nimeää Khronos PBR Neutral -muunnoksen, look None, exposure0, gamma1, valkoisen45° Sun-valon energialla2, tasaisen ympäristön RGB0,75 ja voimakkuuden0,7 sekä harmaan kamerataustan. Se ilmoittaa myös128näytettä, Metal-GPU:n ja sky/mist/bloom/compositorin puuttumisen. Nämä ovat luetun ajotodisteen asetuksia, eivät tässä uudelleen Blenderissä auditoituja scene-asetuksia.

Materiaalien päävärit ja tekstuurit erottuvat ilman havaittua laajaa puhkipalamista tai mustaksi katoamista. Taihedianin räystäiden aluset/ovet ja metsien tiheät sisäosat jäävät tummiksi, joten kaikkien yksityiskohtien luettavuus ei ole valmis. En havaitse valaistuksen ongelmaa, joka estäisi tämän sarjan käytön erillisenä materiaalireferenssinä; fysikaalista kalibrointia ei tehty.

Historiallisen AgX-kontrollin ja neutraalin sarjan pikseleitä ei samasteta eikä niiden välille lasketa regressiomittaria: sekä valaistus että värimuunnos eroavat. Neutraali kuva ei ole Unity-kuvakaappaus eikä vahvista lopullista pelin ulkoasua. Vesi on edelleen Blender-preview, jonka lopullista pelimateriaalia ei hyväksytä.

## Jäljelle jäävä laatu ja toimitusraja

Puuston sulautuminen ja toisto, hutongin pitkät samanlaiset kattorivit, geneerinen kaupunkiympäristö, aukion laajat tasaiset pinnat, kulmikkaat maa-/rantareunat ja preview-veden toistuva kuvio säilyvät. Cofferin syvyyspintojen tekstuurin suunnanvaihdot ja terävät reunat jäävät pilotin rajauksina. Aivan loistava -kokonaistavoite, vienti ja peliruntime ovat avoimia.

Tämä on kuvatarkastus: ei itsenäistä koko lähde-/tekstuurikäyttö-/korkeus-/pakkausauditointia eikä prosessin poistumisen auditointia. Kierroksen valmistumistilaa ei muutettu.

## Kaikki18 tarkastettua alkuperäistä

Jokainen seuraavista on **henkilökohtaisesti nähty tässä tehtävässä**,1600×900 ja ehjä. Täsmälliset absoluuttiset polut ovat JSONissa.

- **controlRGB / ilma — nähty**: `70bfaee535e76c24c33d62f8099386a1b3cc7591dcf33c9fde74368e924179b0`.

- **semantic / ilma — nähty**: `d3f68173bc7e91a3dcf926e274ddb70189a7dccf359e002807ebabf3b150c8c5`.

- **neutralReference / ilma — nähty**: `78b4f4e1b130dc23bac56f3244b49a04a5b1087b3c08ba2fd77f730e37293e41`.

- **controlRGB / taihedian — nähty**: `4148375db4fd0ee7e3fffcbd94bd5127f28de1d573fed0dae7983132ce01c2b3`.

- **semantic / taihedian — nähty**: `df54ed99b2a92b6d947c235333a0029089986ecf646236f5606ce579ccf04933`.

- **neutralReference / taihedian — nähty**: `7575bb84f9b976379b4329386c83a55b4aa97042267216748544d2a27541871a`.

- **controlRGB / aukio — nähty**: `4d4cf4ccc2d6faf989e944d685b4a4a8c04ce49c4946260f08997e17cf1b2d06`.

- **semantic / aukio — nähty**: `b49bc4dde24f85fad9b6e2cbef72e5a5166061fdd162d97cfa883028d859437b`.

- **neutralReference / aukio — nähty**: `65b9b14340c72359efa0934180df0d8cec9a8f4a19ea5565af6a16fa1ea4eb1b`.

- **controlRGB / beihai — nähty**: `d0e939e86b7cc19e542dce2d0208fba4e394b279a711915f35cfd7bbaca734de`.

- **semantic / beihai — nähty**: `b265fc44b272ca6e6713d2b723e96b8993c44c5fae3dcbdcea72dadb6863cd0a`.

- **neutralReference / beihai — nähty**: `9e9e65748d2d3e3714a2ef9cb89c1a921b9b9e25bff280b8c84ce2e42e0262eb`.

- **controlRGB / jingshan — nähty**: `18293c70ed9201c0c4c693b02a34605279c0c0497be7b1ef9ba84b254b4fb4c8`.

- **semantic / jingshan — nähty**: `02260f8c8f9ca64b19a3878ac72ee9bf32979e34b425b27500f69dc907f8fa9e`.

- **neutralReference / jingshan — nähty**: `daf171d53c42771550c1f5c86efd9f4bc59247c11dcb072af7d5e38a00a5fbac`.

- **controlRGB / hutong_ilma — nähty**: `079b28da22b01a15ad13aa8f9d45e3c624426cd740cf96250117a315f7dfb332`.

- **semantic / hutong_ilma — nähty**: `60ba060303197901fd0ab1cbc7697b6dea2d810bf5669e6710e2ad51079f14b6`.

- **neutralReference / hutong_ilma — nähty**: `9f988d7f519af9dbdd38e33c2bcdd11183b2cacc803582672a2d1ab2679f3812`.

Kirjoitin vain tämän Markdownin ja rinnakkaisen JSONin T7:lle. Ei Blender-ajoa, kuvamuokkauksia/johdannaiskuvatiedostoja, lähde-/mallimuutoksia, delegointia tai viestejä muille.
