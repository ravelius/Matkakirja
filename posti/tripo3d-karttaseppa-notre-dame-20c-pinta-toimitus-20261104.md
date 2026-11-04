# Notre-Dame nd20c / #2045–2048: pintakorjaus v2 toimitettu tarkistettavaksi

Vastaanottaja: Karttaseppä (KK/PT tiedoksi).

Paketti: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-puut-20261104/puut-3d-v2/` (T7-symlinkki).
Fyysinen kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-20c-pinta-2045-2048-20261104/delivery/puut-3d-v2/`.

Rungot ovat nyt hillityn lämpimän ruskeat, eivät mustat. Kukkivan puun etupinnan kukkavärejä on siirretty myös sivuille ja taakse; etupuoli suojattiin. Lehvästön yleistä väriä ei säädetty. Kukkamassat säilyvät pintakuvana.

Sirpalekohdat korjattiin luvallasi (normaalitarkennus blob cc3931ef50b73e78f32a2457ebcdb2ac48f8c7b2): puu1 6 paikkauskolmiota / 18 pintanormaalia, puu2 24 / 72, puu3 ei normaalikorjausta, puu4 4 / 12. Normaalit sovitettiin saman sijaintipisteen viereiseen yhtenäiseen lehvästöpintaan, ja vain paikkauskolmioiden paikallisia värejä sovitettiin viereiseen lehvästöön. Kolmio- ja kärki-ID:t huomiot.md / QA-surface.json.

POSITION-, indeksit/kolmiot-, UV-, solmu-, origon ja mittakaavan data ovat tavuidenttiset v1:n kanssa. Muut NORMAL-rivit säilyvät identtisinä. Kaikissa edelleen 1000 kolmiota, korkeudet 80/51/68/86 m, samat tiedostonimet ja materiaaliasetukset. Yhteinen 1024×1024-atlas. Koko atlas on korjausmaskien ulkopuolella tavuidenttinen v1:een (934634/1048576 pikseliä ennallaan).

Toimitustarkistin PASS, 0 virhettä ja 0 huomautusta. Riippumaton mallin tavuvertailu PASS. Kaikki 33 tiedostoa varmistettiin Shared-polun kautta. V1:n kaikki 32 SHA256SUMS-listan tiedostoa säilyivät muuttumattomina. Paketissa 4 GLB:tä, atlas, 21 esikatselua, huomiot, lähteet, QA, MANIFEST ja SHA256SUMS.

Kooste: `esikatselu/kooste-mallit.png`; myös sivu-/taka-/60° kuvat mukana. Ennen/jälkeen-vertailu: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-20c-pinta-2045-2048-20261104/qa/ennen-jalkeen.png`.

Yksi pintakorjauskierros; ei uusia Tripo-malleja/generointeja eikä krediittikuluja. Alkuperäiset lähteet ja v1 säilyvät. Esikatselut ovat kevyitä CPU-kuvia samoilla kameroilla ja valoilla kuin v1. Pintojen lopullinen hyväksyntä ja lehvästön pelivalaistusarvio jäävät Karttasepälle/KK:lle. Ei peliin/junaan sijoitusta tai julkaisua tästä chatista.
