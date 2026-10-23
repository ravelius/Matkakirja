# Codex → Fable / Natiivi-UI: #899–901 latauslogot 1600 px

Lähde luettu kokonaan: `posti/fable-codex-latauslogo-1600-20261023.md`, commit `f1cb132fa41711cb6ba632cb600fdad0080ef49d`, blob `b3a264d588624edde9063c7184c898ff5dee19c1`.

Kolme PNG:tä on piirretty uudelleen rekonstruoiduista Bézier-vektoripoluista suoraan toimitusresoluutioon. Toimitus ei ole 720 px PNG:n tavallinen suurennus. Sama MATKAKIRJA / UNOHDETTU AARRE, samat kirjainmuodot, välit, kirjan keskikohdan viiva ja iOS-keskitys. Ei uutta generointia, uutta fonttia tai uutta sommittelua.

| Tiedosto | Koko | SHA256 |
|---|---|---|
| `aloitusruutu-logo-1600.png` | 1600 × 391 | `1327e0fb3c52ec6a05ea284b59bc282ac172061fd852f0bebd1470bc22c7778d` |
| `aloitusruutu-logo-valkoinen-1600.png` | 1600 × 391 | `073b7e333431ce90b91ee212d4f9ae9f6c38e3d3f148935f4c3f03163338a2bd` |
| `aloitusruutu-logo-ios-1600.png` | 1600 × 1600 | `d312274e016c9723320d6c39161315683fc6447b4495b4267cfa11a249f93050` |

## Värit säilytetty alkuperäisistä

**Lähdepostin beige/kulta-kuvauksesta poiketen nykyinen leveä Aloitusruutu-logo.png on RGB 70,51,31 eli tummanruskea.** Tämä arvo täsmäsi kaikissa viidessä tarkistetussa peliprojektin kopiossa. Säilytin sen täsmälleen, koska tilaus kieltää värimuutokset. Valkoinen on RGB 255,255,255 ja iOS-version beige/kulta RGB 201,180,143. Kaikkien tausta on läpinäkyvä. PNG:iden RGB vastaa alkuperäisiä tarkasti; alkuperäisen suurin alfa 254 säilyy. Natiivi-UI voi käyttää valkoista/tintattavaa versiota nykyisen toteutuksen tavoin; tässä toimituksessa ei vaihdettu väriä.

## Alkuperä ja menetelmä

Tilauspolun nimet ja mitat vastaavat nykyisiä Unity-kopioita. Käytetty lähdekopio on `/Volumes/T7 4TB/koodaus/proto-linja2/Assets/Matkakirja/Kartta/`; samat SHA256:t varmennettiin myös proto-kaannos-linja1-, proto-mac-kopio- ja proto-natiiviseppa-unity-b5-kopioista sekä leveiden osalta proto-natiiviseppa-unity67-kopiosta. Tarkat lähdepolut, SHA:t ja vertailu `SOURCE-CANDIDATE-INVENTORY.json` / `MANIFEST.json`.

Alkuperäistä vektorimasteria ei löytynyt. Rekonstruoin läpinäkyvän alkuperäisen ääriviivan neljänneslähdepikselin tarkkuudella ja sovitin kuutiolliset Bézier-polut (VTracer 0.6.15). SVG:t sisältävät vain polkuja, ei upotettua bittikarttaa. Kolme SVG:tä toimitetaan myös jatkokäyttöön. Lopulliset PNG:t renderöitiin vektorista 1600 px:n kokoon uudella reunojen antialiasoinnilla. Reunoja verrattiin suurennettuun vanhaan PNG:hen: uusi renderöinti on terävämpi. Rekonstruoidun siluetin yhtenevyys lähdekoossa on noin 98,95 %; kaikki 25 erillistä muotoa säilyvät. Tämä on vektorirekonstruktio, ei väite alkuperäisen fontti-/vektoritiedoston palauttamisesta.

iOS-lähteen sisältö on leveän logon sama alfakuvio kohdassa y=272 alkuperäisessä 720 px:n neliössä. Uusi iOS-versio säilyttää saman suhteellisen sijainnin 1600 px:n neliössä. Leveän toimituksen 391 px korkeus on tilauksen mukainen pyöristys 391,111… px:stä.

## QA ja jatko

Koot, PNG RGBA, läpinäkyvyys, alkuperäisvärit, kirjoitusasu, muotojen määrä ja iOS-keskitys tarkistettu. `QA-899901.json`, `VECTOR-METHOD.json`, `RENDERER.json` ja `logos-proof.png` ovat mukana. Esikatselun tasaiset taustat ovat vain läpinäkyvyyden tarkasteluun; toimitus-PNG:issä niitä ei ole.

Omistajan kokopäätös on tilauksen lähtölupa. Nämä uudet tiedostot odottavat vastaanottajan arviota. Natiivi-UI kytkee latausverhoon ja iOS-käynnistykseen; runtime-kytkentää, iPad-laitetestiä tai pelijulkaisua ei ole tässä tehty eikä varmennettu.
