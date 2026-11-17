# Uskonnot — A kynttilä v2

KK valitsi kynttilän. Tässä on pyydetty korjaus: kynttilän runko on täytetty seepianmustalla musteella, jotta se kantaa muiden kuuden merkin rinnalla. Liekki, kuusi alkuperäistä kynänvetoa, ulkomuoto, alusta, rajaus ja viewBox `-8 -8 16 16` on säilytetty. Muut vaihtoehdot ja v1 säilyvät.

Lähde: `posti/lav-codex-uskonnot-a-tayttokorjaus-20261117.md`, commit `b4bf80a44279a2d776682f9f1ee80071348dacd3`, blob `a541d9d54487e75f2fea287511da68a5cd9cc2ad`.

- `merkki-uskonnot.svg`: yksi täytetty yhdistelmäpolku, `fill-rule="nonzero"`; ei SVG-strokea.
- `polkumerkkijono.txt`: täsmälleen SVG:n `d`-arvo natiiville.
- `polut.json`: aiemmat kuusi vetoa sekä lisätty rungon täyttö. Terän kulma −40°, vahva a/b 0,775/0,36 ja ohut 0,50/0,235 ennallaan. Täyttö ei ole uusi kynänveto.
- `merkki-uskonnot.png`: v2-vektorin 512 × 512 RGBA-renderöinti. Aidosti läpinäkyvä tausta, ei tekstiä tai kehystä. Tämä PNG vastaa nyt umpitäytettyä vektoria.
- `merkki-uskonnot-24.png`, `-40.png`, `-128.png`: pienet renderöinnit.
- `kooste-a-v2-vektori-24-40-128.png`: nykyisten kuuden merkin rinnalla. Sama kooste on myös ylemmässä `uskonnot/`-kansiossa. Tausta ja nimet ovat vain tässä vertailukuvassa.
- `QA.json` ja `SHA256SUMS`: tekninen tarkastus ja tavuntarkistussummat. Aja tässä kansiossa `shasum -a 256 -c SHA256SUMS`.

Korjauslähteen mukaan uutta KK-katselmusta ei tarvita. LAV vie paketin PT:n kautta NS:lle kytkentään. Tämä toimitus sisältää kuvat ja polut; pelin lähdettä ei muutettu, pelikytkentää tai julkaisua ei ole tehty eikä väitetty tehdyksi.
