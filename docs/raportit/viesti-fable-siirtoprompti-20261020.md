# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 20.10.2026 klo 17.5x; omistaja 17.49: "kun saat iphoneeni uuden version niin tehdään heti sen perään tilin vaihto, 95% käytetty")

Vanha tili: sami.reivinen@vvi.fi (org ddaee6a2; KK:n faktakorjaus 17.54), viikko 95 %, nollautuu 26.10. aamuyöllä; sen
taulu on ollut R6VQFTUNq629zSzah719Uy. UUSI TILI = PÄÄTILI (omistaja 17.54: "päätili. ollaan nyt tuolla tilillä jota suosittelet
ja se on kohta kulutettu"), Asemataulu https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix (read + publish samaan osoitteeseen,
tietokanta tiedostoista). PT tarkistaa `claude auth status` (komentorivi samalle tilille). Raja: päätilin linja on 50 %
(omistaja käyttää tiliä muuhunkin), mutta KK kysyy rajan kortilla vasta uudella tilillä. Tarkka tila: tämä tiedosto + PT:n uusin luovutus (git log, `viesti-fable-luovutus-20261020-*`).
Käytännön lista: docs/tilinvaihto.md (VOIMASSA OLEVA ARVO voittaa).

## 0. Vaihdon järjestys
1. NS kokoaa iPhone-paketin; KK asentaa omistajan iPhoneen ja lähettää PT:lle "iPhone asennettu".
2. Ennen sitä kaikki roolit paitsi NS ja PK ovat pushanneet luovutuksensa (pyydetty 17.5x); NS ja PK tekevät omansa heti asennuksen jälkeen.
3. KK tallentaa keskustelunsa (`python3 tools/tallenna-keskustelu.py <uuid> Keskustelukanava`) ja aloituksensa; PT tallentaa omansa samoin.
4. PT pysäyttää vanhan tilin sessiot (stop_session) ja ilmoittaa KK:lle "valmis vaihtoon"; KK kertoo omistajalle kohdan ODOTTAA OMISTAJAA.

## ODOTTAA OMISTAJAA (KK näyttää tämän omistajalle yhtenä viestinä)
- Vaihda Claude-sovellus uudelle tilille ja avaa uusi sessio kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, medium), liitä kohdan 1 viesti.
- Kirjaudu Chromessa claude.ai:hin ja puhelimen Claude-sovellukseen samalla uudella tilillä (Asemataulu ja ilmoitukset).
- Jos uusi PT pyytää sallintoja: `bash /Users/Shared/Claude/Matkakirja-fable/tools/tyotavat/palauta-sallinnat.sh`

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja. Nimeä session nimeksi "PÄÄTOIMITTAJA (Opus, medium)".
> Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. Lue CLAUDE.md, docs/raportit/viesti-fable-siirtoprompti-20261020.md
> KOKONAAN (origin/main tai haara fable-siirto-20261020), PT:n uusin luovutus KOKONAAN sekä docs/tilinvaihto.md (kohdat 0–8 ja VOIMASSA OLEVA ARVO).
> Ensin `claude auth status` ja set_remote_control self true. HETI sen jälkeen luo KESKUSTELUKANAVA (Opus, max, kansio Matkakirja-fable,
> start_session, irrotettuna) aloitusviestillä "Olet KESKUSTELUKANAVA (Opus, max). Lue
> /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md ja toimi sen TILINVAIHTO-kohdan mukaan."
> Omistaja puhuu vain KK:lle. Luo roolisessiot kohdan 2 mukaan, kytke Remote Control kaikille, päivitä id:t
> (`node tools/tyotavat/paivita-idt.mjs … --kirjoita`), käynnistä odottajavahti ja Codex-postivahti (kohta 4) ja ota tämän tilin
> Asemataulu käyttöön (osoitteet.md, tietokanta tiedostoista scratchpad/asemataulu/data/talo/*.json). EI jonokierros-cronia.
> Lopuksi `node tools/tyotavat/tilinvaihto-valmis.mjs`. Jatka kohdasta 3. Älä kerro omistajalle teknisiä yksityiskohtia.

## 2. Roolit (luodaan ne, joilla on jonoa tai keskeneräinen luovutus)
Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Aja git fetch origin, lue CLAUDE.md, Raamatun Ydinajatus kohta 2, oma uusin
luovutuksesi (MEMORY.md, Rooli-tilaraportit; tarkista git logista) ja jatka. Päätoimittajan session nimi on PÄÄTOIMITTAJA (Opus, medium).
Jos sait vanhoja PT:n viestejä, ne on jo tehty." Mallit ja kansiot: /Users/Shared/Claude/osoitekirja.md.

| Rooli | Luo heti? | Seuraava työ |
|---|---|---|
| Postivahti, Asemataulu | kyllä | normaali kierros; Postivahti herättää PT:n |
| Natiiviseppä | kyllä | juna 208 -runko (+ NUI 63d0fe853, VS cc9564c36, PK:n avaus), iPad Pro 13 uusimpaan runkoon |
| Pelikoodari | kyllä | Kielletyn kaupungin puuttuvat laatat (omistaja 17.42), "Majesteetti!"-uusinta kytkentään, P7–P9 |
| Valoseppä | kyllä | iso iPad: juoksu 0,8 + MSAA 2 (PT:n OK 17.4x) + kuvapari 1,0/MSAA4 vs 0,8/MSAA2 PT:lle; näkyvä ero → omistajan valinta |
| Linssiseppä | kyllä | taulun tutkiminen (ulosnipistys-208, omistaja 17.31) |
| Laitetestaaja | kyllä | GPU-mittaus raskas kohta (raja 14 ms), cc9564c36:n hehkukuvat |
| Äänittäjä | kyllä | "Majesteetti!"-otto, jos kesken; kertojan "Moona Lisa" palautelistalla |
| Julkaisija | kyllä | vahdit, merget |
| Natiivi-UI | kyllä (jono tyhjä, kaikki NUI-rivit valmiina 17.4x) | odottaa PT:n uutta erää |
| Lavastaja | vain jos luovutuksessa kesken | Codex PT733–737 toimittamatta (rakennukset-v13) |
| Karttaseppä, Projektiseppä, Sisältökirjuri, Työkaluseppä | ei | levossa (Olavinlinna tauolla) |

## 3. Tila 20.10. klo 17.5x
- Juna 208 AUKI. Julkaisu, lukitus ja TF VAIN omistajan pyynnöstä. Valmis julkaistavaksi, kun a) metrokartan pehmeät tekstit
  rungossa vihreänä (63d0fe853 NS:llä) ja b) juoksun GPU ≤ 14 ms isolla iPadilla (nyt 26,3 ms; 0,8 + MSAA 2 ≈ 12 ms).
  Sitten rivi KK:lle "208 valmis julkaistavaksi".
- iPhone-paketti (omistaja odottaa): avaus-208 + 4 huutoa (PK 384bd011b) + musiikki avaus-musiikki-v2/avaus-erhu-lyria-a.mp3
  (omistaja 17.45: "a versio on oikein hyvä, pidetään se"; ei uutta Lyria-kutsua) + VS cc9564c36 + NUI 63d0fe853 + LS:n zoomaus.
- MUSIIKKI AINA LYRIALLA (Raamattu 5.15, PR #5048). ISO IPAD VAPAASTI (9.11). SIMU HARVOIN (9.11).
- Työlista talo/tyolista v127 ajan tasalla 17.5x (NUI:n vanhentuneet rivit merkitty valmiiksi, uusi rivi "Kielletyn kaupungin puuttuvat laatat").

## 4. Ajastukset uudessa sessiossa
- Monitor "python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py", timeout_ms 1800000, uudelleen joka vanhenemisella.
- Monitor "/Users/Shared/Claude/hooks/codex-posti-vahti.sh", timeout_ms 1800000, uudelleen; postilaatikon fetch heti.
- EI jonokierros-cronia.
