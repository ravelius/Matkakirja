# Codex → Pelikoodari: takaa kiinniotto, molemmat Puyit ja neljä vartijahahmoa 27.10.2026

Lisätilauksen 1033 ensimmäinen tarkistuserä: catch_back/caught_back 0,90 s ja hold_back/caught_hold_back 1,20 s silmukka. Edestä/sivulta tulevat parit, rimpuilut ja muut parkour-liikkeet ovat yhä työn alla. Aiemmin hyväksytty eunukki-/door_push_run-toimitus säilyy erillään; tämä uusi pariliike tarvitsee oman pelitarkistuksensa.

GLB:t (eivät gitissä): `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/catch-back-review-v1/models/`

Kaksi Puyi-tiedostoa ja kahdeksan vartijatiedostoa: vartija sekä eunukit 1–3, kullekin erikseen perus- ja viitta-Puyin kontaktit. Puyin liike on sama kaikkien neljän vartijavalinnan kanssa. Käytä vartijan nimen perus/viitta-päätettä vastaavaa Puyita. Kaikki lähdemallien geometriat, UV:t, tekstuurit, rigit ja vanhat leikkeet säilyvät. Ei uusia Tripo-kutsuja tai krediittejä.

## Kohdistus ja ajoitus

Puyi-origo [0,0,0], molemmat +Z-suuntaan, vartijan yaw 0°. Vartijan juuren siirrot metreinä:

| Puyi | Vartija | X | Y | Z |
|---|---|---:|---:|---:|
|perus|vartija|-0.000781|0.000000|-0.397579|
|perus|eunukki-1|0.005899|0.000000|-0.389649|
|perus|eunukki-2|0.005938|0.000000|-0.389922|
|perus|eunukki-3|0.005918|0.000000|-0.383223|
|viitta|vartija|-0.000781|0.000000|-0.297387|
|viitta|eunukki-1|0.005899|0.000000|-0.289456|
|viitta|eunukki-2|0.005938|0.000000|-0.289730|
|viitta|eunukki-3|0.005918|0.000000|-0.283031|

Mallien lähtöpisteet eroavat: viittamallin keho on noin 10 cm eri Z-kohdassa. Älä käytä samaa juurisiirtoa perus- ja viittamallille. Tarkat arvot MANIFESTissa. Hahmojen lantioiden väli on noin 0,38 m.

Ote lähestyy 0,10 s alkaen ja on täysi 0,38 s kohdalla. Yhteinen hidastus 0,13–0,73 s; vartalon jousto jatkuu loppuun 0,90 s. Actor-juuria ei siirretä leikkeessä: controller hoitaa yhteisen etenemisen ja hidastuksen. Molemmat leikkeet on ajettava samalla ajalla. Catchin loppuasento vastaa täsmälleen holdin alkua, ja hold palaa samaan asentoon 1,20 s kohdalla. Hold sisältää pienen vartalon jouston, eikä ote vaihda pintakärkeä kesken liikkeen. Vanhaa geneeristä catchia ei soiteta uuden rinnalla.

## Tarkistus

Kaikki kahdeksan paria läpäisivät 120 Hz näytteistyksen (myös 60 Hz avainruutujen välit). Kokoverkon pienin lattiakorkeus pysyi noin 0,30 mm lattian yläpuolella. Kämmenen määritellyn kontaktipisteen ja seurattavan kaapupinnan ankkurin suurin ero oli noin 0,34 mm. Avainajat, äärellisyys, kvaternionien normit ja catch→hold/hold-silmukan jatkuvuus tarkistettu. Kyse on kontaktipisteestä, ei todistuksesta kaikkien sormikolmioiden ja vaatteen leikkaamattomuudesta.

Mukana neljän ruudun kiinniotto- ja pitoarkit perus-/viitta-Puyille, kahdeksan loppuasennon vertailu ja otteen lähikuvat. Ote on näkyvämpi ja vartija kumartuu lapsen tasolle. Viitan helman ja vartijan läheisyys vaatii edelleen jatkuvan pelitoiston tarkistuksen, kuten myös molempien hahmojen hidastuksen jalkakontakti. Viittalähteen aiemmin avoin täydellinen kainalokorjaus ei ratkea tällä animaatioerällä.

Pelikoodarilta pyydetään parikohdistuksen, liikkeen ajastuksen, kontaktien ja vaatteen tarkistus ennen tämän uuden erän hyväksymistä. Tässä ei väitetä peli-integraatiota tai omistajan hyväksyntää.

V1–V5-työkokeet säilyvät, mutta niitä ei saa ottaa toimituslähteeksi. V6 ratkaisee aiemman avoimen otteen, tavoittamattomien käsien ja erilaisten lähtöpisteiden ongelmat tässä rajatussa takaaottokokeessa. Toimitus on catch-back-review-v1; SHA256SUMS ja lähdekohtaiset tiedot MANIFESTissa.
