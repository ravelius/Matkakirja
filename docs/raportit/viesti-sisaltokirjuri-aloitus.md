# Sisältökirjurin aloitusviesti (27.9.2026 klo 14.0x, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: `git fetch origin main` (liikkuu, useita sessioita
rinnakkain). Lue CLAUDE.md, docs/roolitus.md ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-f.md KOKONAAN
ennen töiden aloitusta.

TILA lyhyesti: main = v2318+. Kolme PR:ää avoinna Julkaisijan junassa
(#3408, #3411, #3413 — ks. luovutusraportin kohta 2). Kolme worktreeta
odottaa niiden mergeä (sisaltokirjuri-nahtavyys-tasaus,
sisaltokirjuri-nahtavyys-tuotanto2, sisaltokirjuri-nahtavyys-tyyppi).

JONO (Fablen päätös 27.9. klo 14.0x, järjestyksessä):

1. **LÄHI-IDÄN NOSTOERÄ**: 13 kaupunkia (Damaskos, Ankara, Izmir,
   Riad, Kuwait, Doha, Mekka, Sana, Nikosia, Halab, Isfahan, Tabriz,
   Masqat) — kaikilla on jo NAHTAVYYSJUTUT-artikkelit mutta nolla
   nosto-kenttää. Kirjoita nostot olemassa olevista jutuista + kuvat.
   Sitten Novosibirsk samalla periaatteella.
2. **0/0-KAUPUNGIT omana eränä**: Kalgoorlie, Gao, Cayenne + 4 muuta
   tasapelissä (Macapá, João Pessoa, Santarém, Portovelho, Mount Isa,
   Geraldton, Broome) — tarvitsevat sekä jutut että nostot alusta.
3. **"HAVAINNEKUVA"-sana** (omistajan sääntö 13.4x): korvaa
   pelaajalle näkyvissä teksteissä "kuvitus"/"AI-kuva"/"generoitu
   kuva" sanalla "havainnekuva". Selvitä laajuus grepillä ensin.
4. **Codex-arviotilaus** kun PR #3413 on TUOTANNOSSA (ei vain
   mergetty — tarkista julkaisu erikseen): yhdistä 23 jäljellä
   olevaa poikkeamaa + jo tilatut 7 maalattua taustaa yhdeksi
   tilaukseksi postilaatikkoon.

Täydet perustelut ja menetelmät jokaiselle kohdalle:
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-f.md kohta 3.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan; käytä isolation:"worktree"
  jos agentin pitää työskennellä erillään jaetusta checkoutista.
- Älä mergaa checkout-haaraa (sisalto-tyo-<pvm>-<aika>) äläkä poista
  sitä --delete-branch-lipulla — se on session checkout, ei työhaara.
- Kuvien/assettien PR:ssä aja aina node tools/mittaa-miniatyyrit.mjs
  (sharp: symlinkkaa node_modules Matkakirja-fablesta jos puuttuu,
  ÄLÄ committoi symlinkkiä).
