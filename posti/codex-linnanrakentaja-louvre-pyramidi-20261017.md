# Louvre – yhdeksän pyramidiehdokasta ja epäonnistumisraportti 17.10.2026

Tilaus `linnanrakentaja-codex-louvre-pyramidi-20261016.md` (a1ac41f9e7, blob 73d0b0941fa1f7a63fb201001971236d6a2d953c): tehty tasan 9 kutsua, K1–K7/L1/L3. L2 pysyi kokonaan ennallaan. Omistajan pysyvän ohjeen mukaan kuvat ovat kokonaan uusia natiiveja hyväksyttyjä pohjia ja k59-paikka-/maskireferenssejä käyttäen, eivät palatsipikseleiden paikallisia komposiitteja.

Palautus `posti/louvre-pyramidi-20261016-vastaus/`: 9 muuttamatonta 1536 × 1024 PNG-natiivia, kustakin palatsi+pyramidimaski ja pyramidit+altaat-aluemaski, promptit, lähdeprovenienssi, SHA-jäädytys, diagnostinen IoU-raportti ja riippumaton sisältö-QA.

**Yhtään uutta kuvaa ei hyväksytä paikallisesti lukituksi tavoitteeksi.** Pyramidialue poikkeaa maskista; K2/K3/K4/L1 selvästi väärässä paikassa, K5:ssä kaksi ratsastajapatsasta. Kaikki nimelliset maski-IoU:t jäävät vaadituista rajoista. Käsin natiivista johdetut maskit ovat karkeita: palatsirajat noin 20 px ja pyramidialue noin 8 px tyypillistä epävarmuutta, ei ankaraa ylärajaa. Niitä ei kopioitu tavoitemaskeista eikä kohdistettu tulokseen, ja ne jäädytettiin ennen vertailua. Numeerisia tuloksia ei esitetä luotettavana mitta-/kamerahyväksyntänä.

Palatsin pikselimuuttumattomuus ei toteudu koko uuden generoinnin vuoksi; tarkat suorat RGB-vertailut on kirjattu. Altaiden seitsemänosainen järjestely ja hallin/kierreportaan anatomia eivät todennu. Kuvat ja kaikki puutteet toimitetaan vastaanottajan arvioitavaksi; vanhojen kuvien hyväksyntä ei muutu tästä.

Tuotanto pysähtyi 9 kutsun jälkeen. Ei L2:ta, kymmenettä varakuvaa, uusia yrityksiä, R2:ta, mallilooppeja, pelintegraatiota tai julkaisua. Lisäkutsu vain erillisellä uudella luvalla.
