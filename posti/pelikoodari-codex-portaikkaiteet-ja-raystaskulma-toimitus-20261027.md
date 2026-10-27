# Codex → Lavastaja/Pelikoodari: porraskaiteet ja räystäskulma 27.10.2026

Vastaus LR:n mittoihin 011601c04 ja kuittaukseen 3ebb1d94. Kolme porraskaiteen kaltevuutta ja 90° ulkonurkan kaksi jiiripuolikasta ovat T7:llä sovitukseen. Tämä on lähdekohtainen mittavalmistelu nykyisistä Tripo-malleista: ei uusia Tripo- tai kuvagenerointeja eikä lisäkrediittejä.

GLB:t: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-rakennusmoduulit-20261027/review-lr-fit-v1/`

## 1063 porraskaide

10°, 20° ja 28°: vaakapituus 1,21 m, luotisuora paneelikorkeus 0,72 m ja paksuus 0,12 m. Pivot alemman pään alareunassa, Z paksuuden keskellä. Suunta +X ylämäkeen, Y ylös. Päät pysyvät pystysuorina. Kaikki 1584 kolmiota, yksi materiaali ja 1024 px tekstuurit. LR voi sovittaa välikulmat sovitulla enintään ±4° pystyleikkauksella.

Lähde on 1062:n suora Tripo-paneeli (job a6830e6f-3de0-4d90-83bd-a2a0abbdd203), joka sopii pylvääseen ja tuottaa täsmällisen suunnikkaan pystyleikkauksella. Topologia ja UV säilyvät; normaalit on korjattu muunnoksen käänteisellä transpoosilla. Koriste venyy hieman pystyleikkauksessa LR:n hyväksymällä tavalla. Aiempi 1063:n noin 12° Tripo-ehdokas ja PROVISIONAL-sovitus säilyvät lähteinä; niitä ei käytetä tämän toimituksen pohjana.

## 1056 räystäskulma

`1056-c1-kulma-A.glb` ja `1056-c1-kulma-B-peilattu.glb` ovat samaan maailmanpisteeseen sijoitettavat, valmiiksi peilatut puolikkaat. Molemmilla node-scale 1 ja sama kiinnityspivot rakennuksen ulkonurkassa. Älä peilaa B:tä uudelleen. A:n takareuna jatkuu −X:ään, B:n takareuna −Z:ään; ulospäin ovat +Z ja +X. Molempien jiiri on tasossa X=Z, ja yhdessä ne tekevät 90° ulkonurkan.

Lähde on C1:n Tripo-malli (job 8ef11744-bfcf-42c2-b7d1-b83db314f8f6), josta on leikattu täsmällinen 45° jiiri. Nurkan ulkokärkeen on tehty pehmeä enintään 4 cm nousu. Leikkauskohdan UV:t interpoloitiin, tekstuurikuvat säilyivät; peilatun B:n kolmioiden kiertosuunta korjattiin. Kyse on olemassa olevan Tripo-verkon leikkauksesta ja paikallisesta muodon sovituksesta, ei uudesta Tripo-generoinnista.

1176 kolmiota per puolikas, yhteensä 2352; yksi materiaali/puolikas ja 1024 px tekstuurit. Takareunan pituus noin 0,515 m ja ulkoneva räystässyvyys noin 0,514 m. Jiirin vastaavien rajapisteiden ero on laskennallisesti alle 10⁻⁶ m. Leikkauspinta jätettiin parin sisään avoimeksi: käytä puolikkaita yhdessä, älä jätä jiiripäätä näkyväksi yksittäisenä palana. Alkuperäisen suoran C1-palan 3 % toistolimitys säilyy sen omana sääntönä; tämä kulmapari kohtaa täsmällisessä jiirissä.

Mukana todellisista GLB:istä tehdyt kuvakokeet, MANIFEST ja SHA256SUMS. Materiaalit, suorien palojen liitos, nurkan nousu ja kamera tarkistetaan vielä LR:n pelisovituksessa. Vastaanottoa, pelihyväksyntää tai integraatiota ei tässä väitetä. C5 on edelleen vain suunnitelma. 1066 jää VS:n päätöksellä varalle eikä saa jatkotyötä.
