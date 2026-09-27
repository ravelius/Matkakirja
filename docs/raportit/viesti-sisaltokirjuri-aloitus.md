# Sisältökirjurin aloitusviesti (27.9.2026 klo ~17.5x, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri
(haara sisalto-pelikatalogi-20260927). Ensimmäinen komento:
`git fetch origin main` (liikkuu nopeasti, useita PR-junia rinnakkain).
Lue CLAUDE.md, docs/roolitus.md ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-h.md KOKONAAN
ennen töiden aloitusta.

TILA lyhyesti: Kolme Euroopan lehtikaupunkierää auki rinnakkain omina
worktree-PR:inään: #3429 (erä 4: Vilna/Sarajevo/Odessa/Amsterdam/
Tallinna), #3435 (erä 5: Praha/Krakova/Moskova/Sevilla/Budapest),
#3437 (erä 6: Tampere/Granada/Firenze/Oslo/Kobenhavn) — kaikki
mergeable, testit vihreät, odottavat Julkaisijan junaa. ÄLÄ mergaa
itse. Lisäksi Codex toimitti PR #3428: ensimmäinen kaupunkierä
(Ateena) omistajan tilaamasta nähtävyyskuvien tyyliuudistuksesta —
TÄMÄ ON PRIORITEETTI, ks. luovutusraportin kohta 4 (tarkistus +
sisältöpäätös 4 kuvasta + kuittaus Codexille).

JONO (järjestyksessä):

1. **Codex-tyyliuudistuksen Ateena-erän tarkistus + päätös** (PR #3428):
   tarkista kontaktiarkki omistajan kalibrointia vasten, päätä 4
   ei-paikka-kuvan kohtalo (Diogeneen astia, Elginin marmorit,
   Maratonhuijaus, Louis 1896), kuittaa Codexille postilaatikkoon.
2. **EUROOPAN ERÄ 7**: seuraavat 5 ohuinta mittarilla (aiheet+
   lehtinostotYht+jutut+kulttuurinostot, ks. luovutusraportin kohta 3
   — laske uudelleen, DONE-lista on nyt 30 kaupunkia). Kirjoita
   suoraan, UUSI PR. **PAKOLLINEN: ristiintarkistus ENNEN kirjoitusta**
   maalehden (MAA_KATEGORIAT) ja kohdekartan (NAHTAVYYSJUTUT) kanssa —
   ks. luovutusraportin kohta 3 tarkka menetelmä. Tämä on nyt pysyvä
   työtapa (erä 4:ssä 3/5 aihetta piti kirjoittaa uusiksi jälkikäteen
   päällekkäisyyden vuoksi; erissä 5–6 ei yhtään, koska tarkistus
   tehtiin ensin).
3. Kun Codex toimittaa seuraavan tyyliuudistuskaupungin, sen tarkistus
   ohittaa Eurooppa-erän jonossa (Fablen priorisointi).
4. **Siirtosepän eheystarkistus** (kohta 5, PR #3434): 23 rikkinäistä
   miniatyyriä, 7 TIFF-kuvaa, Luxemburgin nähtävyysjutut, 7 pientä
   kuvaa — TARKISTA ONKO VANHENTUNUT (esim. Luxemburg-löydös saattaa
   olla korjattu jo PR #3419:ssä). Nouméan kuvat odottavat "VAIN
   EUROOPPA" -rajauksen päättymistä, EI kiireellinen.

Täydet perustelut, menetelmät ja täsmälliset löydöslistat:
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-h.md.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan; käytä isolation:"worktree"
  jos agentin pitää työskennellä erillään jaetusta checkoutista.
- Älä mergaa checkout-haaraa (sisalto-tyo-<pvm>-<aika>) äläkä poista
  sitä --delete-branch-lipulla — se on session checkout, ei työhaara.
- VAIN EUROOPPA (omistaja 27.9.) on MAANTIETEELLINEN rajaus: myös
  Euroopan valtioiden merentakaiset alueet (esim. Nouméa) EIVÄT kuulu
  piiriin toistaiseksi.
- Skandaalikiintiö 2-3/maa: kaikki tähän mennessä käsitellyt 30
  Eurooppa-erän maata ovat jo 2-3/3, uusia skandaaleja tuskin tarvitaan
  lähiaikoina — tarkista silti aina ennen kirjoitusta.
- Main liikkuu useita committeja tunnissa: fetch+rebase juuri ennen
  pushia, ei aiemmin. js/muutokset.js-konfliktit ovat rutiinia
  (versionumerorivit) — ratkaisu luovutusraportin kohdassa 9.
