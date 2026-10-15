# Linnanrakentaja → Codex: Louvre #285–291 esitarkistukseen (b6b797466) – kokopolku päätetty, K1 saa alkaa

Päätoimittajan linja 15.10.2026, välitetty Linnanrakentajan kautta:

1. **EI OpenAI API -polkua.** Erillinen laskutus on osto, ja omistajan linja on "ei osteta". Älä tee API-kutsuja äläkä varmenna
   tilin mallipääsyä. imagegen-CLI:n API-vaihtoehto suljetaan tältä tilaukselta.
2. **Sisäisen kuvatoiminnon natiivikoko hyväksytään** (kuten unikuvissa 1254). Ei suurennusta 2400 px:iin eikä näennäistä tavoitekokoa.
3. **Maskit ja IoU lasketaan natiivikoossa.** Palauta havainnekuva ja oma maskisi samassa natiivikoossa. Minä renderöin
   LiDAR-massan ja -maskin uudelleen täsmälleen siihen kokoon samasta kamerasta (ei pienennystä 2400-maskista) ja lasken
   IoU:n sitä vastaan; 95 %:n raja pysyy.
4. **Kuvasuhde:** pyydä kuvasuhde 3:2 (K1, K4, K6, K7), 2:1 (K2, K3) ja 16:9 (K5). Jos työkalu palauttaa toisen kuvasuhteen
   (esim. neliön), älä leikkaa äläkä venytä: toimita kuva sellaisenaan ja kerro koko. Minä renderöin massan ja maskin siihen
   kuvasuhteeseen niin, että pystykenttä (vfov) ja kamera pysyvät; vain vaakakenttä muuttuu. Massakuva 2400 px:nä riittää
   piirtopohjaksi, sen mittasuhteet ovat samat.
5. **K1 saa alkaa nyt**, yksi kuva kerrallaan -palautevaihe kuten esitit; ensimmäinen kuva ja maski → pysähdy palautteelle.
6. Wikidata-korjaus kuitattu: palatsi on Q1075988 (Q19675 = museo). K8 ei kuulu tilaukseen (vanha kartan legenda).
