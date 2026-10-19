# #658 WIDE — kaksi vaakatason pajataustaa

Yksi kokonaan uusi sisäänrakennetun imagegenin kuvakutsu tehty. Alkuperäinen natiivi säilytetty tavuntarkasti:1981 × 793 RGB PNG. Työkalu palautti suhteen2,498:1; pyydettyä2556 × 1179 / noin13:6-kokoa ei väitetä palautuneeksi natiiviksi.

Katsoin henkilökohtaisesti natiivin, molemmat lopulliset PNG:t alkuperäisessä pikselikoossa sekä molemmat crop-esikatselut. Katsoin ennen kutsua molemmat omistajan hyväksymät pajareferenssit ja luin koko vaihe2-lähteen, video-täydennyksen sekä aiemman pilotin PT-kuittauksen. Lähdetiedostojen paikalliset Git-blob- ja SHA256-tarkisteet varmennettiin ennen kutsua.

## Sisältö ja rajaus

Uusi kuva on samaan hyväksyttyyn kynttilänvalaistuun kultasepänpajaan perustuva uusi valokuvamainen näkymä. Vasemmalla on pitkä paksu kynttilä, oikealla pienempi kynttilä, taustalla tummaa puuta, lämmintä kiveä ja sinertävä vinoruutuikkuna. Keskelläkin on jatkuva työpöydän pinta, työkalut, pajan seinä/palkki ja kalusteita. Ei tyhjää riipuksenmuotoista koloa. En havainnut riipusta, korua, narua, tekstiä, Havainnekuva-merkintää, käyttöliittymää tai ihmisiä. Vaha-, puu-, kivi- ja metallipinta vaikuttaa valokuvamaiselta; en havainnut varmaa proseduraalista puukuviota tai muokkaussaumaa.

Alkuperäinen13:6-suunnitelman61,57% keskialue ei soveltunut palautuneeseen leveämpään natiiviin. Lähde sallii erilliset rajaukset ja root valtuutti varsinaiseen natiiviin perustuvan harkitun vasemman siirron. Lopullinen iPad-rajain on[398,0,1455.849609375,793], leveys1057.849609375 eli53,3998% natiivin leveydestä. Molemmat kynttilärungot ja kokonaiset liekit säilyvät. Vasemman kynttiläjalan uloin reuna/uloke on osittain kuvarajassa; tämä on ilmoitettu avoimesti eikä lähde vaadi koko uloketta näkyviin.

## Lopulliset tekniset viennit

- iPhone vaaka2556 × 1179 RGB PNG. Keskitetty lähderajaus[130.912213740458,0,1850.087786259542,793]. Tasainen suurennus1.4867591424968474×.
- iPad vaaka2732 × 2048 RGB PNG. Edellä kuvattu hieman vasemmalle siirretty rajaus. Tasainen suurennus2.5825977301387137×.

Pillow resize(box=...)-toiminnon Lanczos rajaa ja skaalaa luvallisen lähdealueen yhdellä teknisellä viennillä. Ei retusointia, outpaintia, yhdistelyä, täyttöä, maskia tai paikallista kuvanmuokkausta. iPad on luonnollisesti pehmeämpi suurennos; siihen ei väitetä syntyneen uutta alkuperäistä yksityiskohtaa. Tarkat liukulukurajaimet, keskikohdat, skaalat, SHA256- ja purettujen RGB-pikselien tarkisteet ovat CROPS.jsonissa.

Ensimmäinen keskitetty iPad-rajain leikkasi jalustaa enemmän; sen tekninen historia säilytettiin työarkistossa. Lopullisessa toimituspaketissa on vain valittu x398-versio ja sen esikatselu. Uutta kuvakutsua ei tehty.

## Toimituksen rajat

Paketti on omavarainen: native/, previews/, sources/, references/, kaksi target-PNG:tä ja QA/MANIFEST/CROPS/PROMPTS/GENERATION/PROVENANCE/SOURCE-MANIFEST. Esikatselujen vihreä rajain ja tekstit ovat vain QA-kuvissa; varsinaisissa taustoissa niitä ei ole.

Pysty on lähteen mukaan päätapa, mutta tämän tekijän scope on vain kaksi vaakatiedostoa. Portrait-agentti tuottaa pystyt. En käyttänyt Tripoa enkä tehnyt malleja, renderipareja tai Cycles-videoita. Niiden omistajuus on erillisellä3D-tekijällä. Muut kuusi aarretta eivät kuulu tähän toimeksiantoon. Root hoitaa kokoamisen ja postitoimituksen. Uusien taustojen PT/omistajahyväksyntää, videovalmiutta, runtimea, R2-toimitusta tai pelijulkaisua ei väitetä valmiiksi.
