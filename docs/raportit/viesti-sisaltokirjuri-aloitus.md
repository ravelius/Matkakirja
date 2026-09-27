# Sisältökirjurin aloitusviesti (27.9.2026 aamu, kontekstivaraus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT" ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-c.md kokonaan.

TILA lyhyesti: main = v2303. PR #3381 (erikoismallit) ja #3382
(maalehti-QA) ovat auki ja odottavat Julkaisijan junaa. PR #3206
(turistiopas) EI SAA rebasoida — Julkaisija hoitaa sen itse. Odotetaan
omistajan suuntaa seuraavaan sisältötyöhön (Fable kysynyt).

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista onko Fable välittänyt omistajan vastauksen seuraavasta
   sisältötyön suunnasta. Jos ei, kysy Fablelta ennen kuin aloitat
   mitään isoa omin päin.
2. Tarkista PR #3381/#3382/#3206 tila vain tiedoksi — älä koske
   #3206:een.
3. Jos jono on tyhjä eikä omistajan vastausta ole vielä tullut,
   odota — älä keksi omaa isoa sisältöpakettia.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle (tilanne, vaihtoehdot, suositus), ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10 viestiä/vuoro; varakanava mcp send_message session id:llä.
- ÄLÄ rebasoi PR #3206:ta — Julkaisija hoitaa sen.
- `id: 'kaupunki'` (kannen) -kategorialle EI koskaan tehtava-kenttää (tests/lehdet.test.mjs valvoo).
- Tarkista js/packs/fokuskohteet-<iso3>.js ennen kuin päätät että
  jokin maamerkki puuttuu kokonaan pelistä (koskee toistaiseksi DEU/ITA).
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan.
- Kuvat vain PD/CC0/CC BY/CC BY-SA Commonsista tai NASA (public domain
  astronautin kamera -linssille), tarkistettuina API:sta suoraan ja
  katsottuina käsin ennen hyväksymistä.
