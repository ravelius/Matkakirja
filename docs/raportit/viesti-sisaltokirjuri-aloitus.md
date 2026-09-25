# Sisältökirjurin aloitusviesti (25.9.2026 klo 08.5x)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri. Ensimmäinen komento:
git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main. Lue CLAUDE.md,
docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT", ja docs/raportit/viesti-sisaltokirjuri-luovutus-20260925.md
kokonaan.

TILA: Linssikatalogi mainissa v2213:na (4 välilehteä, PR #3129+#3131 mergetty). PR #3138 auki:
kuvitus 155/155 valmis (KUVATEKSTIT-taulukko linssikatalogi.html:ssä, data.js koskematon),
Julkaisijan sisältöjunaa odottamassa. Fable pyysi lisäksi 14 vanhan sisältö-PR:n auditoinnin: 9
rebasettu ja CI vihreä, 2 (NC-lisenssikorvaukset #2897/#2895) rebasettu+korjattu mutta CI-tila
vahvistamatta, 1 (#2991 Julisteet Bergen/Sevilla) rebasettu mutta AIDOSTI PUNAINEN (puuttuva
julistekuva, ei tekstikorjaus), 2 suljettu vanhentuneena (#2981, #2935). Täysi tilataulukko
luovutuksen kohdassa 3.

ENSIMMÄINEN TEHTÄVÄ:
1. `gh pr checks 2897` ja `gh pr checks 2895` — jos CI vihreä, ilmoita Julkaisijalle että koko
   14 PR:n audit on valmis (kopioi luovutuksen kohdan 3 taulukko). Jos punainen, diagnosoi
   (todennäköisesti sama korjaus toimi, tarkista logi).
2. Kerro Fablelle/Julkaisijalle #2991:n blokkaus (Bergenin ja Sevillan julistekuvat puuttuvat
   kokonaan mittausjärjestelmästä) — tämä vaatii kuvageneraation, ei sinun tehtäväsi ellei erikseen
   pyydetä.
3. Kysy Fablelta/Julkaisijalta "4 PR / 4 h" -sisältöjunan tarkka mekaniikka (mainittu luovutuksessa,
   ei ehditty selvittää).
4. Sen jälkeen jatka Fablen seuraavaksi antamalla tehtävällä.

SITOVAT KÄYTÄNNÖT TÄLLÄ HETKELLÄ:
- **JUMI → FABLE (omistaja 25.9. klo 04.4x, korvaa JUMI → KORTTI):** jumissa (päätös puuttuu, työ
  ei etene, luokitin estää) EI tehdä AskUserQuestion-korttia eikä odoteta omistajaa — lähetä
  Fablelle YKSI viesti (tilanne, vaihtoehdot, oma suositus) ja jatka muuta työtä. Fable päättää tai
  vie omistajalle omassa sessiossaan. Työpöytäsovelluksen lupaikkunasta ilmoitetaan Fablelle heti.
- **VIESTIRAJA JA VARAKANAVAT:** SendMessage sallii ~10 viestiä per omistajan vuoro. Kun se täyttyy
  tai vastaa "Failed to send", käytä mcp__ccd_session_mgmt__send_message session id:llä.
- **Levynkäyttö:** älä aja npm ci uudessa worktreessä — symlinkkaa node_modules pääkassasta
  (ln -s /Users/Shared/Claude/Matkakirja-sisaltokirjuri/node_modules <worktree>/node_modules).
  Jos `tools/uusi-worktree.sh --poista` valittaa "not empty", poista symlinkki ensin.
- **Kuorma:** tarkista `uptime` ennen `node --test tests/*.test.mjs` (koko sarja). Yksittäiset
  kevyet testitiedostot (tests/lisenssit.test.mjs, tests/sisaltopaketti.test.mjs) ovat turvallisia
  kuormasta riippumatta. GitHub Actions -CI ei kärsi paikallisen Macin kuormasta — voi luottaa
  siihen kuorman ollessa korkea paikallisajon sijaan.
- **Versionosto rinnakkaisille haaroille:** ÄLÄ aja `tools/uusi-versio.mjs` usealle mergeämättömälle
  haaralle peräkkäin samaa mainia vasten — molemmat saavat saman numeron (todellinen tupla). Jos
  rebasaat useita PR:iä ilman että ne mergeytyvät välissä, jätä versionosto viimeiseksi askeleeksi
  sille joka oikeasti mergeää, tai bumppaa vain sen jälkeen kun edellinen on jo mergetty mainiin.
- Agentit vain Sonnet/Opus, enintään 4 rinnakkain. Kontekstin nollaus: kun Fable pyytää, kirjoita
  luovutus ja kutsu clear_session self samassa vuorossa. Viestit Fablelle vain PR-numero valmiista
  erästä, jumi tai kysymys, enintään 8 riviä. Testit ilman ääniä. Aikaleimat date-komennolla.
