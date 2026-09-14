# v1879: julkaistun ääni-integraation riippumaton tarkistus 14.9.2026

Julkaisu: main e344d5e7d8e9025718afd585439ac76031855ac7, PR #2443, v1879.

## Varmennettu
- 80/80 uuden Horatio/Livia-luennan runtime-teksti ja versionoitu ääniavain täsmäävät hyväksyttyyn lähteeseen ja aiemmin GET/SHA/tavumäärä-varmennettuihin tuotantokuitteihin.
- Viisi odottavaa kaupunkipakkaa ovat kokonaisina ennallaan julkaisua edeltävään versioon verrattuna: Sisilia, Islanti, Alpit, Lappi, Tromssa.
- Julkaistuista 45 kaupunkipakasta ja kolmesta ääni/cue-moduulista 48/48 GET-vastausta oli HTTP 200 ja täsmälleen julkaisun tavut.
- Neljä kohdennettua testitiedostoa: 39/39 PASS (horatio-runtime-audio, livia-aani, livia-eurooppa-cuet, horatio-livia-europe-batches).
- Oikea asennettu Matkakirja-sovellus päivitetty. Päivitysikkunassa näkyi v1879. Pariisissa näkyvät kokonaisina uusi Horation Tuileries'n raunioiden kuvaamistarina ja Livian siirreltävien vihreiden tuolien tarina. Pelaajan kaupunkia, rahaa tai matkareittiä ei muutettu.
- Havainnot ovat lähde-/tiedostotarkistus ja oikean pelin näkyvä kohtaus. Äänten sisältöä ei ole tässä riippumattomassa tarkistuksessa kuunneltu korvin. Tämä ei ole kuunteluhyväksyntä.

## Vielä auki
- Uusien 40 kaupungin luennoilta puuttuvat puheen sisältöön ajoitetut uudet eleet/kuuntelureaktiot. Vanhat ristiriitaiset kohdistukset on julkaisussa hylätty; puuttuvaa kohdistusta ei merkitä valmiiksi.
- Viimeinen viiden kaupungin erä jäi käyttörajaan. Kolme alkuperäistä H-ääntä on jo pelastettu: Sisilia, Islanti, Alpit. Näille tarvitaan vain olemassa olevien tavujen tallennusvienti, EI uutta synteesiä. Livia Sisilia/Islanti on etsittävä palvelun historiasta ennen uusintaa. Katso posti/v1879-aanet-eran5-jatko-oikaisu-20260914.md ja validoitu posti/horatio-era5-pelastettu-kolme-20260914.json.
- Livia-erän 1 mixed completed-with-errors -kuitin 7 onnistuneen rivin turvallinen osatulostuki on ratkaistava ennen kohdistusta. Alkuperäistä kuittia ei saa nimetä kokonaan onnistuneeksi.

## Oikeassa pelissä löytynyt kuvaristiriita
Uusien Pariisin Tuileries-tekstien rinnalla on edelleen vanha kuvateksti: ”Pariisi, 1873. Leipä kainalossa kulki kadun paras esiintyjä.” Pulun nykykuva on edelleen ”Pariisi: oopperan paras aitiopaikka jäi ilman samettia.”

Kuvatoimitus varmisti nykyisen mainin kentät ja katsoi kolme alkuperäistä: tarvitaan 3 korvaajaa olemassa oleviin slotteihin, ei uusi slotti:
1. I1: Garnierin työmaa -> Tuileries'n palanut runko puutarhan puolelta 1873.
2. I2: leipämies -> saman kohtaamisen toinen Tuileries-näkymä puiden alta.
3. P1: Garnierin kattoreuna -> nykyajan Tuileries, vihreät siirreltävät tuolit, kaksi naista keskustelemassa, näkymä pulun perspektiivistä.

Pariisi ei ollut vapautetussa neljän kuvan erässä: 0/3 korvaajaa generoitu. Pelkkä kuvatekstin vaihto ei korjaa kuvaa. Kuvatoimituksen raportti:
 /Users/samireivinen/Documents/ChatGPT/Matkakirja 2/output/horatio-livia-text-image-audit-20260914/pariisi-targeted-check/REPORT.md

Tämä QA-viesti ei käynnistä maksullisia uusinta-ajoja, krediittiostoja, massakuvagenerointia tai uusien kuvaehdokkaiden julkaisua.
