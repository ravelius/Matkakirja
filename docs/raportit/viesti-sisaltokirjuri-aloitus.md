# Sisältökirjurin aloitusviesti (25.9.2026 klo 12.2x, tilinvaihdon jälkeen)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M)
origin/main. Lue CLAUDE.md, Raamatun "TYÖTAPA JA SESSIOT", ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260925-b.md kokonaan (edellinen sessio
pysäytettiin kesken omistajan tilinvaihtoon, ei kontekstin nollaukseen — luovutus on
poikkeuksellisen yksityiskohtainen juuri siksi).

TILA lyhyesti:
1. **Renessanssisali (PR #3144)** — mergetty, valmis.
2. **Galleria 59 (PR #3147)** — valmis mergeen, sis. Codexin täydennyksen (Robinson
   Crusoe, Puerto Montt), CI vihreä.
3. **#2991 Julisteet Bergen/Sevilla** — korjattu (kuvamitat.json), CI vihreä, Julkaisijalle
   ilmoitettu että pito voi purkaa.
4. **Turistiopas-paketti (UUSI)**: 71 kaupungin matkailijalle-osio, 3 kaupungin erissä,
   30 oikean kaupungin/taajaman lista `docs/tyolista-opukselle.md`:ssä. Erä 1 (PR #3148)
   ja erä 2 (PR #3150) valmiit. **Erä 3 (Bermuda/Sitka/Coober Pedy) KESKEN** —
   kolme Opus-agenttia oli käynnissä pysäytyshetkellä, ei vielä committeja.

ENSIMMÄINEN TEHTÄVÄ:
1. `ListAgents` — tarkista elävätkö erän 3 agentit vielä (id:t ja worktree-polut
   luovutuksen kohdassa 5). Jos elossa: odota valmistumista, cherry-pickaa kolme
   commitia uuteen `sisaltokirjuri-turistiopas-era3`-haaraan (`origin/main`:sta),
   testaa (lisenssit+kuvatekstit+sisaltopaketti), pushaa, avaa PR, siivoa worktreet.
   Jos kadonneet: käynnistä 3 uutta samalla kaavalla (luovutuksen kohta 5b).
2. Kun erä 3 on PR:ssä, jatka erällä 4 (kaupunkilista luovutuksen kohdassa 5) —
   **ilman erillistä lupaa**, Fable on jo hyväksynyt jatkuvan erätahdin kunnes 30
   kaupungin lista on täynnä tai toisin käsketään.
3. Tarkista onko #3147/#3148/#3150 mergetty junassa — jos on, ei toimenpidettä.

SITOVAT KÄYTÄNNÖT TÄLLÄ HETKELLÄ:
- **JUMI → FABLE (omistaja 25.9. klo 04.4x, korvaa JUMI → KORTTI):** jumissa (päätös
  puuttuu, työ ei etene, luokitin estää) EI tehdä AskUserQuestion-korttia eikä odoteta
  omistajaa — lähetä Fablelle YKSI viesti (tilanne, vaihtoehdot, oma suositus) ja jatka
  muuta työtä. Fable päättää tai vie omistajalle omassa sessiossaan.
- **VIESTIRAJA JA VARAKANAVAT:** SendMessage sallii ~10 viestiä per omistajan vuoro.
  Kun se täyttyy tai vastaa "Failed to send", käytä
  mcp__ccd_session_mgmt__send_message session id:llä.
- **Levynkäyttö:** älä aja npm ci uudessa worktreessä — symlinkkaa node_modules
  pääkassasta (ln -s /Users/Shared/Claude/Matkakirja-sisaltokirjuri/node_modules
  <worktree>/node_modules).
- **Turistiopas-erän integrointikaava** (kolme rinnakkaista Opus-agenttia, isolation:
  worktree, EI pushia niiltä) → cherry-pick pääsessioon → testit → push → PR → siivous.
  Täysi kaava ja agenttipromptin runko: luovutus kohta 5/5b.
- **Kuorma:** tarkista `uptime` ennen `node --test tests/*.test.mjs` (koko sarja).
  Yksittäiset kevyet testitiedostot (tests/lisenssit.test.mjs,
  tests/kuvatekstit.test.mjs) ovat turvallisia kuormasta riippumatta. GitHub Actions
  -CI ei kärsi paikallisen Macin kuormasta.
- **Versionosto rinnakkaisille haaroille:** ÄLÄ aja `tools/uusi-versio.mjs` usealle
  mergeämättömälle haaralle peräkkäin samaa mainia vasten.
- Agentit vain Sonnet/Opus, enintään 4 rinnakkain. Kontekstin nollaus: kun Fable
  pyytää, kirjoita luovutus ja kutsu clear_session self samassa vuorossa — **tällä
  kertaa EI kutsuttu**, koska omistaja pysäytti tilinvaihtoon, uusi Fable lähettää
  aloitusviestin. Viestit Fablelle vain PR-numero valmiista erästä, jumi tai kysymys,
  enintään 8 riviä. Testit ilman ääniä. Aikaleimat date-komennolla.
