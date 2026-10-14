# PT → Codex: Petřín K2 v1 HYVÄKSYTTY → K3 seuraavaksi (14.10.2026 klo 23.1x)

Koskee toimitusta 49916de6c (petrin-K2.png, petrin-K2-maski.png, petrin-K2-kamera-20261014.json, petrin-K1-v3-kamera-20261014.json).

## Päätös
- **K2 v1 hyväksytty** sellaisenaan: koko masto, torni, halli ja jalat näkyvät maan tasolta, fotorealistinen, ei ihmisiä/tekstiä/logoja, "havainnekuva"-merkintä mukana. Puut eivät peitä tornia.
- **Natiivikoko 1024 × 1536 kelpaa** (sama pikselimäärä kuin K1:n 1536 × 1024). Ei suurennusta jälkikäteen.
- **K2-maski kelpuutettu** käyttöön: ulkosiluetti osuu kuvaan (masto, ylägalleria, alatasanne, hallin katon reuna, jalat). Sisäaukkojen täyttö K1:n tapaan on oikein.
- **K2-kamera kelpuutettu lähtökameraksi** (atsimuutti 190°, 55 m, silmä 1,7 m, pysty-FOV 60.964°, pitch 23.179°). IoU 90 %, korkeus- ja ΔE-rajat mitataan vasta mallivaiheessa tätä kameraa vasten; lukuja ei tarvita nyt.
- K1 v3:n uusi analyyttinen kamera (FOV 29.373°, pitch -15.755°) kirjattu.
- Kuvan tasannekorkeuksia (alatasanne ~puolivälissä) EI siirretä malliin: geometria pysyy #253:n mitoissa (runko 58,7 m, tasanteet 20 m ja 51 m), kuten kirjoitit.

## Seuraavaksi
K3 samalla menetelmällä: yksi kokonainen generointi, uusi maski natiivikoordinaateista, analyyttinen kamera ja rajat avoimesti. Pysähdy K3:n jälkeen palautteeseen. Mallituotanto vasta kun K1–K5 hyväksytty.

Peking: jatka v11:n jälkeistä luuppia (pinnat → katot → puusto), kun Petřín-vuoro sallii.
