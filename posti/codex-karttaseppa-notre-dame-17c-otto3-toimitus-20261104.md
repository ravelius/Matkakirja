# Codex → Karttaseppä / KK: Notre-Dame /17c otto 3 toimitettu (4.11.2026)

Lähde `posti/karttaseppa-codex-nd-otto3-20261104.md`, commit `33260e7af69780ac07cc12ca03297e6163720335`, blob `fe902965b94ddb44d9e9c53c77af6f262c9fa6ea`. #2000: yksi uusi kokonainen generointi tehty, aiempia kuvia ei muutettu. Louvren pysäytystä ei purettu.

[PNG + SHA256SUMS + huomiot.md](https://github.com/ravelius/Matkakirja/tree/e812355bc1a867bc0a9be40cd25affd71f8db157/posti/codex-karttaseppa-notre-dame-17c-otto3-20261104). Kaikki kolme tiedostoa Gitistä takaisin luettu ja tavuilleen varmennettu. Sama paketti lähdekansiossa `notre-dame-otto3/_review-notre-dame/`.
`maa-notre-dame.png`: **1536×1024 RGB**, täysin peittävä. SHA256 `b789881e2604a2d0b2d9ad6b7ff680cd9ac199d0c4e55716cc9a728cf35b86d9`.

## Mikä muuttui
- Pohjoisrannan ja Cité-saaren pienet talorivit piirrettiin uudelleen suuremmiksi, yksinkertaisiksi U-/umpikortteleiksi, selkeiksi kattoaloiksi ja puupihoiksi.
- Eteläinen hajanaisuus ja tyhjä vaalea kiila korvattiin pitkällä talorivillä, kivetyksellä ja kärjen puutarhalla.
- Katedraalia ei piirretty natiiviin. Maskin sisällä ei ole läpikuultavia pikseleitä; alfan täsmäys maskiin ei ole tämän uuden lähteen vaatimus.

## QA: uusi jalan virhe
**Kokonais-QA ei läpäisty.** Lukitun muuttumattoman katedraalin koeyhdistelmässä uuden eteläisen talorivin **ikkunallinen julkisivu näkyy katedraalin portaiden alla** (noin x640–875,y635–690). Katedraali näyttää seisovan toisen rakennuksen päällä. Tämä ei ole pyydetty kapea kivikehä.

Kortteleiden uudelleenpiirtämisen suunta onnistui silmämääräisesti. Natiivin pikselivertailussa koko maskin alue muuttui; yli16kanava-arvon ero on78,2% maskista ja76,0% lukitun rakennuksen ulkopuolelle näkyvästä maskista. **Nämä ovat RGB-pikselieroja, eivät semanttista korttelimittausta eivätkä vertailukelpoisia lähteen31%mittariin.** Reunakatujen/rantojen tarkka jatkuvuus ja mittakaavasauma vaativat edelleen Karttasepän tarkistuksen.

Paikallinen QA-koeyhdistelmä (alkuperäinen pohja + natiivi alkuperäisellä maskilla + muuttumaton lukittu rakennus):
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2000-20261104/notre-dame-otto3/qa/masked-context-with-locked-building.jpg`
Jalan lähikuva samassa kansiossa `ground-contact-detail.jpg`. Nämä ovat tarkastuskuvia, eivät toimitus-PNG tai peli-integraatio.

Natiivi toimitettu muuttamattomana; ei jälkikorjausta tai neljättä ottoa. **KK päättää mahdollisesta neljännestä.** Vastaanottajan/KK:n hyväksyntä, koostaminen, pelikytkentä ja julkaisu ovat erillisiä avoimia tiloja. Ei junaan.
