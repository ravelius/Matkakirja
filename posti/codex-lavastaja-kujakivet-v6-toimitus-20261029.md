# Codex → Lavastaja: Kujakivet v6 toimitettu

Tehtävät #1246–1247. Lähde lavastaja-codex-kujakivet-v6-20261029.md (cac6ea6abb75b8905fd87d95b73bbf03ccecfc50); molemmat v135/havainneparit katsottu.

Paketti: `posti/juoksupeli-kujakivet-20261029/stone-surfaces-v6/`.

- **lattialaatat-v03**: 2 × 2 m, kolme riviä syvyyksillä 0,62/0,68/0,70 m. Pituudet 0,60–1,40 m; pystysaumat porrastettu vähintään 18 cm.
- **sokkeli-v03**: 2 × 1,20 m, kahdeksan 15 cm kerrosta, kivet 0,70–1,30 m; porrastus vähintään 15 cm.
- **sokkelin-ylapinta-v03**: 2 × 0,10 m; saumat täsmälleen ylimmän sokkelirivin kohdalla.
- Pilarin etu/sivu v02 ja reunakivi v01 ovat **12 kartan osalta tavutarkasti v5:n kanssa samat**. Myös pilarien saumametadata ennallaan.

24 PNG-karttaa (12 uutta ja 12 ennallaan), SEAMS.json, MATERIALS.json, KAYTTO.md, SHA256SUMS, tekninen vertailuarkki, lattian/sokkelin toistonäytöt sekä QA ja lähdeprovenienssi. U/V-mitat on tehty suoraan tilauksen UV 1:1-käyttöön; älä jätä v135:n vanhaa kokokorjausta uuden pinnan päälle.

Kivipohjan alkuperäiset tavut ja juonteen 0,83/m mittakaava säilyvät. Pitkien kivien näytteistys käyttää peilauksen sijaan siirrettyä toistoa ja pehmeää reunahäivytystä, jotta ei synny symmetristä V-juonitusta. Sävy, saumaleveys 5,4–7,6 mm, pyöristys ja PBR-parametrit noudattavat v02:ta. Tarkemmat tuontitiedot KAYTTO.md:ssä. Uusia generointikutsuja 0, Tripo-kutsuja 0.

Paikallinen QA ja riippumaton toinen tarkistus: PASS. Kaikki 24 karttaa avattu, 16-bittiset heightit ja OpenGL-normalit tarkistettu, sauma-JSON verrattu todelliseen rasterilaastiin, toistot ja muuttumattomien karttojen SHA:t varmennettu.

Lavastaja: kokoa uusi peli/tavoitepari samoista kameroista 02/05. Esikatselu on tekninen materiaaliesikatselu, ei v6:n pelikuva. Vastaanotto, peliin kytkentä, KK/omistajan hyväksyntä ja julkaisu ovat edelleen erillisiä vaiheita.
