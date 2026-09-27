# Sisältökirjurin aloitusviesti (27.9.2026 klo ~19.0x)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri
(haara sisalto-pelikatalogi-20260927). Ensimmäinen komento:
`git fetch origin main` (liikkuu nopeasti, useita PR-junia rinnakkain).
Lue CLAUDE.md, docs/roolitus.md ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-i.md KOKONAAN
ennen töiden aloitusta.

TILA lyhyesti: PR #3428 (Codex, Ateena-tyyliuudistus) hyväksytty ja
kuitattu. PR #3444 (7 TIFF-kuvaa → JPG, Siirtosepän löydös) auki,
odottaa Julkaisijan junaa. Luxemburgin "0 nähtävyysjuttua" -löydös
todettu vanhentuneeksi, ei korjaustarvetta. 23 rikkinäistä
"kohtaamiset"-miniatyyriä on kuvaputken/Codexin jonossa, ei
Sisältökirjurin korjattavissa.

JONO (järjestyksessä):

1. **EUROOPAN ERÄ 7** — mittari jo ajettu, ei tarvitse laskea
   uudelleen: bryssel, kosice, bergen, ljubljana, dublin (kaikki
   numeroympyrat-kaupunkeja). Kullekin yksi uusi
   KULTTUURI_KATEGORIAT-lehtiaihe, adaptoituna vastaavan
   MAA_KATEGORIAT[ISO]-teeman valmiista nostoista (ei sanatarkkaa
   kopiota — MAA-taso on maalle, tämä kaupungille). Ehdokasaiheet ja
   ISO-koodit taulukossa luovutusraportin kohdassa 3. PAKOLLINEN
   ristiintarkistus ennen kirjoitusta: älä toista MAA_KATEGORIAT[ISO]:n
   tai kaupungin omien `kohteet`-kuvausten (maakartat.js) aiheita.
   Työtila: `./tools/uusi-worktree.sh sisaltokirjuri euroopan-era7`.
2. Kun Codex toimittaa seuraavan tyyliuudistuskaupungin (Ateenan
   jälkeen), sen tarkistus ohittaa Eurooppa-erän jonossa (Fablen
   priorisointi) — tarkista posti/-kansio (claude/postilaatikko-haara).
3. **7 pientä (<400 px) kuvaa** (Lissabon Maria Severa, Praha Dvořák,
   Sofia vankila, Bukarest ×2, Islanti Laxness, Sisilia nuket) —
   TARKISTA ETTEI Praha/Dvořák ole sama kuva jota jo käsittelin
   erässä 5 (PR #3435). Korkearesoluutioiset korvaajat Commonsista
   `tools/hae-commons.mjs`:llä (Maria Severa ja Laxness ovat
   1800-luvun/1955 harvinaisia kuvia — parempaa versiota ei
   välttämättä löydy, silloin jätä ennalleen ja kirjaa syy).
4. Nouméan/Antikytheran kuvakorjaus odottaa "VAIN EUROOPPA"
   -rajauksen päättymistä (Nouméa) — Antikythera on Eurooppaa mutta
   ei kiireellinen, voi tehdä milloin tahansa.

Täydet perustelut: docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-i.md.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan; käytä isolation:"worktree"
  jos agentin pitää työskennellä erillään jaetusta checkoutista.
- Älä mergaa checkout-haaraa (sisalto-pelikatalogi-20260927) äläkä
  poista sitä --delete-branch-lipulla — se on session checkout, ei työhaara.
- VAIN EUROOPPA (omistaja 27.9.) on MAANTIETEELLINEN rajaus: myös
  Euroopan valtioiden merentakaiset alueet (esim. Nouméa) EIVÄT kuulu
  piiriin toistaiseksi.
- Skandaalikiintiö 2-3/maa: tarkista SKANDAALIT[iso]?.length ennen
  uutta skandaalia (erä 7:n tehtävä on lehtiaihe, ei skandaali).
- Main liikkuu useita committeja tunnissa: fetch+rebase juuri ennen
  pushia, ei aiemmin. js/muutokset.js-konfliktit ovat rutiinia
  (versionumerorivit) — oma rivi ylimmäksi, numero main+1, main.js+sw.js
  samaan lukuun.
- Levyhälytyksen jälkeen (27.9. ~19.0x) enintään 3
  wt/sisaltokirjuri-* worktreetä kerrallaan — poista mergetyt/pushatut
  heti tools/uusi-worktree.sh --poista:lla.
