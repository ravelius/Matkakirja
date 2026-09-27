# Sisältökirjurin aloitusviesti (27.9.2026 aamu, kontekstivaraus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT" ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-b.md kokonaan.

TILA lyhyesti: main = v2299. Astronautin kamera valmis (erät 5-6
mainissa, erä 7 PR #3375 auki, tilaus ~100 kohdetta nyt täynnä 189
kohteella). Turistiopas erä 19 PR #3206 rebasattu ja mergeable.
Odotetaan Fablen päätöstä 11 turvallisuussyistä ulkona jätetystä
turistiopas-kohteesta (raportin kohta 5).

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista onko Fable vastannut kohdan 5 kysymykseen. Jos ei, älä
   tee niitä 11 kohdetta omin päin.
2. Tarkista PR #3375 ja #3206 tila; korjaa versiokonflikti
   tarvittaessa raportin kohdan 8 kaavalla (main liikkuu nopeasti,
   versiotiedostot voivat konfliktoida useasti — ota aina --theirs
   niihin ja aja uusi-versio.mjs uudelleen).
3. Kun jono on tyhjä, ilmoita Fablelle ja odota seuraavaa tehtävää.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle (tilanne, vaihtoehdot, suositus), ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10 viestiä/vuoro; varakanava mcp send_message session id:llä.
- Rakenna KOHTEET-tyyppiset taulukkolisäykset (mm. astronautin kamera) aina
  tuoreelta origin/main:lta uudella haaralla, älä vanhalta rebasoiden — säästää
  ison taulukkomerge-konfliktin (raportin kohta 9, opetus 1).
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan.
- Kuvat vain PD/CC0/CC BY/CC BY-SA Commonsista tai NASA (public domain
  astronautin kamera -linssille), tarkistettuina API:sta suoraan ja
  katsottuina käsin ennen hyväksymistä.
