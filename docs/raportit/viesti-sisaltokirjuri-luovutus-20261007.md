# Sisältökirjurin luovutus 7.10.2026 (päivitetty klo 16.30; tilinvaihto ~00)

## Valmista ja mergettyä tänään
- Oppaan kuvahaku: #4096, #4100 (236 paikkaa, 38 sallitun säteet); tools/oppaan-kuvat.mjs, peruste "kaupungin päänähtävyys".
- Faktapohjat: Kielletty kaupunki 1873 (#4110, #4112), Giza (#4119), Olavinlinna (#4125, #4130); Olavinlinnan tietokortit lähdetarkistettu (#4129); KK 1923/Giza lähdetarkistus PR #4151 (odottaa Päätoimittajaa).
- Kyproksen pohjoisosa (maakuntateksti + Pulu): #4145 mergetty.
- Codex-tilaukset (claude/postilaatikko, posti/): kuumailmapallo-latauskuva, 25 sallitun kaupungin kaupunkinäkymät (A), Olavinlinnan 12 tietokorttikuvitusta (B), **fotorealismi-lisäys**, Tott-uusinta (puhujakuvat peruttu omistajan huomautuksesta), **Pariisin 8 puuttuvaa yksityiskohtakuvaa** (posti/sisaltokirjuri-codex-pariisi-yksityiskohdat-20261007.md).
- **PARIISIN KUVAT VALMIIT**: haara `fable-pariisi-kuvat-2` (esittely-tyo/kuvat/pariisi-yksityiskohdat.json/.md, codex-tilaus-pariisi.md; 68 kuvaa, tarkistajat A1/A2/B, korjaukset), paketti viety ämpäriin `esittely/pariisi-v1/` (68 JPEG + JSON, vie-paketti 16.23, 69 tiedostoa, 0 virhettä; paketti `proto-3d/_valmiit/pariisi-yksityiskohdat-vienti-20261007`). Pelikoodari kytkee `media_url`-kentät.
- Kaikki worktreet poistettu (wt/sisaltokirjuri-* ei jäljellä).

## Kesken / jonossa
- Odotan Päätoimittajan uusia eriä. Muut esittelykaupungit: pilvityöt lopetettu (krediitit); jos Päätoimittaja haluaa ne paikallisesti, mallina Pariisin työtapa (ohje: esittely-tyo/kuvat/OHJE… haarassa fable-pariisi-kuvat historiassa; validaattori yhdista.py; Sonnet-kerääjät ja eri Sonnet-tarkistajat; kuvat Commons FilePath?width=1280 UA MatkakirjaBot, 1 req/s; rajaus + sips; vie-paketti).
- Codex-tuloksia (A, B, latauskuva, Tott, Pariisi) odotetaan postilaatikkoon; välitä ne Päätoimittajalle (yksi vertailukuva/erä), oppaan kaupunkinäkymäerät suoraan Julkaisijalle; latauskuva myös LS1:lle.

## Opit
- Wikimedia 429: ≤ 6–7 rinnakkaista; lataus 1 req/s oikealla UA:lla. Skannattu PDF: macOS PDFKit/Vision-OCR; journal.fi Anubis-suojaa ei kierretä (WebFetch hakee PDF:n).
- Viestit Päätoimittajalle send_messagella session id:llä `local_5df52e10-10e4-4b72-9554-0049db300dfe` (nimi → pidätys). Worktree poistetaan mergen jälkeen; 5 h raja/viikkoraja: pushaa luovutus ajoissa.
