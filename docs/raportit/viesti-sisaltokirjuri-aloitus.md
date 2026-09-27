# Sisältökirjurin aloitusviesti (27.9.2026 klo 10.0x, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT",
docs/linssikatalogi.md (malli) ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-d.md kokonaan.

TILA lyhyesti: main = v2310. Kaikki edellisen vuoron PR:t mergetty,
jono tyhjä. UUSI TEHTÄVÄ omistajalta: docs/pelikatalogi.md — kts.
raportin kohta 4 täydelle spekille.

ENSIMMÄINEN TEHTÄVÄ:
1. Suunnittele pelikatalogin rakenne docs/linssikatalogi.md:n mallilla
   (elävä luettelo + oikeudet + 10 ensimmäisen ehdotus + omistajan
   ideat -osio).
2. Käynnistä tutkimusagentit maittain (Sonnet/Opus, 3-4 rinnan),
   selkeä tarkistuslista jokaiselle pelille (säännöt, oppimiskytkös,
   sopivuus 13+, botti/kaveri, oikeudet, lähde).
3. Kokoa tulokset docs/pelikatalogi.md:hen, PR Julkaisijan junaan
   (docs-only, ei versionostoa), rivi Fablelle.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Kohderyhmä 13+, EI lastenpeli.
- Vähemmän tietovisaa, enemmän pelejä joissa oppii tekemällä.
- `id: 'kaupunki'` (kannen) -kategorialle EI koskaan tehtava-kenttää.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan.
- Älä mergaa checkout-haaraa (sisalto-tyo-<pvm>-<aika>) äläkä poista
  sitä --delete-branch-lipulla — se on session checkout, ei työhaara.
