# ISS/raketti – yhdeksän tavoitekuvaehdokasta

**9/9 sallittua kokonaista generointia, yksi per kulma, järjestys r1/r2/r3/r4/a1/s1/t1/d1/d2. Ei uusintoja tai osakorjauksia.**
Sisäänrakennettu image_gen; alkuperäiset generoidut PNG-tavut säilyvät. PT näyttää kuvat ensin omistajalle. Tämä ei ole yhdeksän kuvan QA-hyväksyntä, pelitoimitus tai lupa tavoitella kuvien keksittyä geometriaa.

## Koko ja lähteiden ristiriidat

Kaikki native-PNG:t ovat **1086 × 1448 (3:4 pysty)**. Tilaustekstin 2752 px leveys / 16:10 ei täyty. Todelliset pelireferenssit ovat 2064 × 2752 pystykuvia ilman EXIF-kiertoa, ja niiden kuvatekstikin sanoo ”ipad pysty”. Säilytettiin tämä kamerarajaus eikä venytetty, leikattu tai keinotekoisesti suurennettu kuvia. Omistajalta kysyttiin formaattipreferenssiä, mutta vastausta ei saatu ennen tuotantoa; oletus ja poikkeama kerrotaan tässä avoimesti.

d2-lähdekuvassa ei näy telakointiporttia, vaikka tekstissä sitä pyydetään. Kuvassa on siksi **käsitteellinen porttilisäys**, joka ei todista Cupolan ja portin oikeaa fyysistä suhdetta. Tämän ristiriidan tulkinta on ilmoitettu ennen generointia. Ei mallinneta lisäystä tämän kuvan perusteella.

## Kulmakohtainen tarkistus

| Kulma | Tuottajan tila | Havainto |
|---|---|---|
| r1 | arvioehdokas | Yö, märkä betoni, keinovalo ja höyry onnistuvat. Valonheittimien asemat, rantamaaston yksityiskohdat ja kaapelit ovat keksittyjä. |
| r2 | hylkäyssuositus | Raketti näyttää jo irronneen alustasta: T+1/alustalla-ehto ei täyty. Savun sisäinen valo ja valkohehkuinen ydin ovat hyödyllisiä erillisinä valotavoitteina. |
| r3 | arvioehdokas varauksin | Laaja takaa-ajokamera ja pieni raketti säilyvät. Maiseman yleisvalo, tähtien yhtäaikainen näkyvyys ja pitkän savuvanan valaistus ovat elokuvamaisia, eivät varmennettua fysiikkaa. |
| r4 | arvioehdokas varauksin | Pitkä liekki ja savuvana ovat pääosassa; raketti on hieman suurempi/ylempänä kuin lähteessä. Etäisen savun laaja oranssi hehku on valotusvaraus. |
| a1 | arvioehdokas varauksin | Yksi Cupolan ikkuna, fyysinen kehys ja konsoli säilyvät; pieni aurinko ja ohut horisontti. Tähdet ja kaupunkivalot jäävät liian kirkkaiksi, vaakajuova on toivottua heikompi. Ei sellaisenaan valotusmalliksi. |
| s1 | hylkäyssuositus | Alasolu sisältää pyydetyn ohuen haarautuvan vaakasalamakanavan. Myös ylävasen solu on paikallisesti sinivalkoinen ja valaistunut: vain yksi välähdys koko näkymässä EI toteudu luotettavasti. |
| t1 | arvioehdokas varauksin | Kolme ohutta rinnakkaista vinoa meteoria sijoittuu kuvassa Maan kaaren alapuolelle; päät ja ohenevat vanat näkyvät. Korkeutta tai radianttia ei yhdestä kuvasta todenneta. Valotus ja maantiede ovat keksittyjä. |
| d1 | arvioehdokas varauksin | Ulkoinen lähestymiskamera ja päämoduulien sommittelu säilyvät. Aurinkopaneelien suunnat ja yksityiskohtainen ISS-topologia muuttuvat; ei rakennemallinnuksen lähteeksi. Kirkas päivä-Maa ja näkyvät tähdet ovat valotusvaraus. |
| d2 | vain käsitteellinen arvioehdokas | Portti lisättiin tekstiohjeen mukaan, vaikka lähdereferenssissä ei näy porttia. Cupolan kehys, konsoli ja Maa säilyvät. Portti, salvat, työkohdevalot ja niiden suhde Cupolaan ovat keksittyjä: eivät nykyisen peligeometrian tai oikean telakoinnin todiste. |

## Tavoiteltavaa pelissä

Fyysisesti perustellut yövalot, märän betonin heijastukset ja savun sisäinen hehku; pieni valkoinen liekin ydin ja tilallinen savuvana; Cupolan kehyksen oikea paikka ja valo; auringonnousun pieni ydin ja ohut kaari; **vain yksi salama** kerrallaan sekä sen ohuet haarat pilven reunalla; ohuet ilmakehän meteorit; ISS-materiaalien ja työkohdevalojen uskottava vaste.

## Keksittyä – ei mallinneta kuvasta

Tarkat ranta- ja kaupunkimuodot, kuvien valotus/optiset heijastumat, pilvien paikat, kaapelit ja apulaitteet, moduulien yksityiskohdat, paneelien uusi suunta, d2-portti ja sen kiinnitys sekä dramaturginen savun valaistus. Kuva ei anna mittoja, tarkkoja koordinaatteja tai varmennettua orbital-/valotusfysiikkaa. NASA-kuvaa ei kopioitu; annetut lähteet olivat pelikaappauksia.

Ei havaittu luettavaa tekstiä, logoja, UI-kerroksia tai lisättyä vinjettiä. Cupolan fyysinen reunus säilyy, eikä sitä tulkita vinjetiksi. Yksittäinen stilisoitu kuva ei todenna simulaation fysiikkaa. Riippumaton kaikkien lähde–tulosparien tarkistus on INDEPENDENT-QA-FI.md:ssä.

## Tila

Kaksi hylkäyssuositusta **r2/s1**, seitsemän arvioehdokasta (osa olennaisin varauksin), ei omistajan hyväksyntöjä. Kaikki yhdeksän tulosta toimitetaan läpinäkyvästi. Mahdolliset lisäyritykset tarvitsevat uuden tilauksen; niitä ei aloiteta automaattisesti. Ei R2-latausta, pelin muutoksia, tavoiteluuppia, mergeä tai pelijulkaisua.
