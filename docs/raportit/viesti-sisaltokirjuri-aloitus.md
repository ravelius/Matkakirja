# Sisältökirjurin aloitusviesti (26.9.2026 iltapäivä, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, Raamatun "TYÖTAPA JA SESSIOT", JUMI → FABLE ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260926-b.md kokonaan.

TILA lyhyesti: löydös 158 (maakuntien kuva/pikkukuva-kentät Wikimedia Commonsista)
etenee maa kerrallaan pitkä-luonnehdintojen (99 aluetta, 9 maata) rinnalla. GRC ja NLD
ovat mainissa. BEL/DNK/SVK/LVA/LTU ovat VALMIINA HAAROISSA (testattu, pushattu) mutta
PR:t odottavat vuoroaan (yksi maakunta-PR kerrallaan mainiin, ei pinota).

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista `gh pr list --search "maakunta OR pitka OR kuva-kenttä" --state open` ja
   `gh pr view 3318 --json state` (NLD). Jos jono on vapaa, avaa seuraava PR
   järjestyksessä BEL → DNK → SVK → LVA → LTU (ks. luovutuksen kohta 2: rebase
   origin/mainiin, testaa, force-with-lease, avaa PR vasta kun jono on vapaa).
2. Kun kaikki viisi ovat mainissa: jatka FIN/EST/SVN:n kuva-kenttään (luovutuksen
   kohta 3, toistettava menetelmä vaihe vaiheelta) ja sen jälkeen seuraaviin
   pitkä-erän maihin (CHE, PRT, HUN, SWE, NOR, IRL — ks. edellinen luovutus
   viesti-sisaltokirjuri-luovutus-20260926.md).
3. Lue luovutuksen kohta 5 (Opit) ennen kuin toistat kuvahakuprosessin — siinä on
   korjattuja virheitä (regex-bugi, sharp-polku, lisenssin API-tarkistus, kuvien
   silmämääräinen tarkistus ihmisten varalta).

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle (tilanne, vaihtoehdot, suositus), ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10 viestiä/vuoro; varakanava mcp send_message session id:llä.
- Maakunta-PR:t yksi kerrallaan mainin päälle; agentit vain Sonnet/Opus, enintään 3–4 rinnan.
- Kuvat vain PD/CC0/CC BY/CC BY-SA, tarkistettuina Commonsin API:sta suoraan (ei vain
  agentin raportista); ei tunnistettavia yksityishenkilöitä lähikuvassa; jos sopivaa
  kuvaa ei löydy, jätä kenttä tyhjäksi ja listaa puute PR:n kuvaukseen — ei kompromissia.
- Aikaleimat date-komennolla. Testit ilman ääniä. Kuormatarkistus `uptime` ennen koko sarjaa.
