# Sokkelon pintasarja Valosepälle — #706–710

Kahdeksan materiaaliparia: 8 COLOR- ja 8 ROUGHNESS-PNG:tä, kaikki 1024 × 1024. Seitsemän pyydettyä perusvaihtoehtoa sekä erillinen likaantunut seinän alareuna. Fyysinen toimituskansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-sokkelo-pinnat-706710-20261019/delivery`.

| Materiaali | Sisältö | Käyttö |
|---|---|---|
| `red-plaster` | Punainen kalkkirappaus | RepeatU/RepeatV |
| `red-plaster-lower` | Rappaus / likainen alareuna | RepeatU/ClampV |
| `grey-stone-base` | Harmaa kivisokkeli | RepeatU/RepeatV |
| `yellow-glazed-ridge` | Keltainen kate / harjapala | RepeatU/RepeatV |
| `yellow-glazed-edge` | Keltainen kate / reunapala v2 | RepeatU/RepeatV |
| `hexi-blue-gold` | Hexi / sininen ja kulta | RepeatU/ClampV |
| `hexi-green-gold` | Hexi / vihreä ja kulta | RepeatU/ClampV |
| `red-gate-9x9` | Punainen portti / 9 x 9 nastaa | RepeatU/RepeatV |

## Käyttö

Jokaisessa `materials/<id>/`-kansiossa ovat `color.png`, `roughness.png` ja `material.json`. COLOR on RGB8, sRGB-väriksi tulkittava taiteellinen pintakuva. ROUGHNESS on L8-dataa: 0 sileä, 1 karhea, arvo = byte / 255. Karheudelle sRGB-dekoodaus pois; kartta ei ole smoothness. Jos vastaanottajan shader käyttää smoothnessia, käännös on 1 − roughness. Shader-muunnosta tai pelin tuontiasetuksia ei ole tehty tässä toimituksessa.

Alareunan likaversio ja molemmat hexi-palkkilistat: **Repeat U, Clamp V**. Muiden pintojen toisto on U/V. Hexiä ei ole hyväksytty koko pinnan XY-toistoon. Portin yhdessä kuvassa on 81 kokonaista nastaa, 9 riviä × 9 saraketta.

## Tuotanto ja QA

Värit tehtiin sisäisellä `image_gen.imagegen`-työkalulla. Todelliset värioriginaalit ovat 1254 × 1254; toimituksen 1024-värit ovat vain kokonaisen kuvan LANCZOS-pienennöksiä. Alkuperäisiä ei ole retusoitu. Reunakatteen ensimmäinen kokonainen väriehdokas korvattiin yhdellä kokonaan uudella generoinnilla U-toiston parantamiseksi; vanha säilyy. Yhteensä 17 toteutunutta kuvakutsua: 9 väriä ja 8 valitsematonta generoitua karheusehdokasta. Ei avoimia kutsuja.

Lopulliset 8 karheuskarttaa ovat **uutta numeerista materiaalidataa**, eivät vanhojen generoitujen karheuskarttojen muokkauksia eivätkä albedon harmaasävy- tai inversiokuvia. Materiaaliluokat valitsevat taiteelliset karheusarvot samalta 1024-pikseliruudukolta, mukana pieni periodinen arvovaihtelu. Kulta on maalia/lakkaa sileämpi. Datakoodaus, koko, kohdistus ja arvot tarkistettiin riippumattomasti. Kaikki 17 alkuperäistä generointia säilyvät tuotantojuuren `native/`-kansiossa; niistä 8 generoitua karheusehdokasta ja ensimmäinen reunakatteen väri eivät kuulu valittuun materiaalipakettiin.

Toistoarkeissa ei havaittu selvää toimitusta estävää saumaa. Pienet paikalliset ääriviiva- ja kulumaerot voivat näkyä lähikuvassa; pikselitarkkaa tai pelimoottorissa varmennettua saumattomuutta ei väitetä. Kuvien värissä on paikallista reliefin valo-/varjosävyä: nämä ovat PBR-tyylisiä taiteellisia pintoja, eivät fotometrisesti erotettuja albedo-skannauksia. Kattodatan lasitearvot on varmennettu (harja noin 0,22, reuna noin 0,24); paljaan saven luokkaa ei tunnistettu luotettavasti. Saven 0,67 on reseptitavoite, ei kaikkien värissä näkyvien kulumien toteutunut arvo. Tarkat rajat löytyvät QA-raporteista.

`PROMPT-SET.json` / `.md` sisältävät käytetyt 17 promptia, todellisen sisäisen tuotantotavan ja alkuperäviitteet. `provenance/author_material_data.py` dokumentoi datan valmistuksen. `manifest.json` ja `SHA256SUMS.txt` yksilöivät toimitetut tavut. Mallien/UV:n muuttamista, sokkelo-703-juureen kirjoittamista, R2-siirtoa, runtime-kytkentää tai julkaisua ei ole tehty. Valosepän sävyvaihtelu ja nurkkavarjostus ovat erillistä integraatiotyötä.
