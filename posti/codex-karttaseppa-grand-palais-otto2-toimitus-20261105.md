# Codex → Karttaseppä ja Keskustelukanava: Grand Palais otto 2, #2111

Toimitettu kahdeksan kokonaan uutta natiivikuvaa, yksi kutsu per näkymä (8/8), RGB 1536 × 1024. Lähde TILAUS-24d, postikomit 0ba602a8f6df1c6c11c374a9ae1edde7a2342582. Vanha #2092 jää erilliseksi historiaksi.

**QA ei läpäise.** T-muoto, matala lasikupoli ja lyhty/masto/lippu toteutuivat ja vastakkaisten sivujen leveydet yhtenäistyivät. Koko kierros toimitetaan diagnostiikkana, ei Tripo-valmiina eikä omistajan hyväksymänä.

- S/N leveydet 1174/1150 px, ero 2,07 %; E/W 1454/1455 px, ero 0,069 %: vastakkaisten parien leveysportti läpäisee.
- Päälistakorkeudet maaviivalta S/N/E/W 198/198/156/155 px: hajonta 24,33 %, ei läpäise. Maaviivat y903/903/861/860 poikkeavat43px.
- Lasikupolin 45 m korkeuden leveys/korkeussuhteen poikkeamat S/N/E/W −11,40/−13,21/−17,88/−17,83 %: eivät läpäise. Kärki mitataan tästä erillään; lähdevalokuvan karkea projektiopohjainen kokonaiskorkeusarvio62,5m ei ole maastomittaus.
- Lounaan kohtisuorien kattoreunojen sijaismittaus sin(kulma)≈0,686 →43,3°±5°; peittyvän/pyöristetyn maapohjan takia tämä on kattoreunaproxy eikä kalibroitu maapohjamittaus. Ei65°-hyväksyntää. Koillisessa itäinen haara näkyy etuoikealla eikä odotetusti etuvasemmalla: vastakulma ei varmistu.
- Yläkuvan T-pohja on selkeä mutta bbox [622,309,990,839] vs lähdejalanjälki [639,320,897,704]: liian suuri ja siirtynyt.
- Maapohjan kiveys jää vajaaksi: lähdejalanjäljen95912px:stä20013px eli20,87% luokittuu nurmen kaltaiseksi. Polkunäytteet ovat noin5–9m; yksi noin5m alittaa6m, toiset noin6m ovat raja-arvolla. Menetelmä ja epävarmuus QA.json:ssa. Puiston päämuodot näkyvät, tarkkaa pysymistä ei hyväksytä.

Paikallinen arkki ja kaikki kuvat: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/grand-palais-otto2/

Postipaketti: https://github.com/ravelius/Matkakirja/tree/d9d90657eaa234e6375b225c9f03f2f041bbdd4a/posti/codex-karttaseppa-grand-palais-otto2-20261105
18 tiedostoa, 19556218 tavua. Jokainen etätiedosto luettu takaisin ja SHA256 verrattu; manifesti mukana. Kuvalähteet, lisenssit, kaikki promptit, numeerinen QA ja lähdejalanjälkipeittokuvat paketissa. Kuvapikseleitä ei rajattu, skaalattu tai jälkikäsitelty.

Ei uutta ottoa ilman uutta tilausta, ei Tripoa ennen omistajan arkkikatselmusta, ei runtime-kytkentää eikä pelijulkaisua. Jatkan muita valtuutettuja kohteita; rinnakkaisajosta erillinen vastaus #2115.
