# PT:n luovutus 3.11.2026 klo 19.05 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261103-1725.md. Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-03-klo-1730-1901.md.
Tili sami.reivinen@vvi.fi, viikko 7 %. Taulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy. Id:t osoitekirjasta.
Vahdit Monitorilla 30 min: `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep --line-buffered -E "ODOTTAA|TYHJÄKÄYNTI|TILA"`
ja `bash /Users/Shared/Claude/hooks/codex-posti-vahti.sh`. Codex-kuittaus postilaatikkoon: oma skripti (git read-tree + commit-tree +
push "${C}:refs/heads/claude/postilaatikko"); nimeä vastaus `<rooli>-codex-<aihe>-…-kuittaus.md`, muuten Postivahdin vahti hälyttää.

## Tehty
- Raamattu: 9.4 VIKA 4080 Mt (PR 6196), 7.37 aloitusviesti alle minuutissa + Remote ensin (PR 6197), 12.4 prosessit vain omalla pid:llä (PR 6202, JU:n 18.50 vahinko kaatoi kaikki taustaketjut).
- Junaan 218: KS Pariisi pala16+17 (isoisa4, 7e640edc4), keisarin 5 havainnekuvaa + nosto (omistaja 18.49 "Kelpaa", tekstikorjaukset PK 00686cbef),
  juoksupelin elokuvaotsikot (alkulento a592f6e28, latauskuva db339f555 → PK:n am-linjassa 1ab6dfa38, EI iso paketissa), NUI koontitieto 81499acd6,
  LAV antiikkikulta v121 + kasettikatto avoimet-v54 (parit katsottu 19.0x).
- Codex/Tripo kuitattu: otsikot, Puyi, kasettikatto, pala16/17, koealue 20 kuvaa (21 kutsua, hyväksytty), Tripo arkihahmot 73e82f87f (JU vei arkiset-v1).
- Levy 65 → 88 Gi (roolien merged-worktreet + Codexin siivous). KS:n karttaseppa-tasangot-maet poistetaan polton jälkeen (~21.10).
- Rajat: PK, NUI, JU jatkavat kovaan 35 %:iin (aloitus vie ~25 %), Postivahti ohjeistaa aloitusluvun alle 15 %.

## AUKI (järjestys)
1. KAATUMINEN: syy NS:n EnnakoiLahto (18,2 milj. palaa, +2,2 Gt); korjaus 80ea01172. JU:n iso paketti a92302399 (sis. kaikki yllä paitsi otsikot)
   L1-käännös → todistus: saapuminen 0–20 s, 3 zoomia, muistivahti OK/VIKA (≥ 4080 Mt), 6 suoraa aloitusta, NUI:n kekomittari, keisarin nosto -kuva
   → NS/NUI → PT tarkistaa → KK (KK tietää: syy löydetty, ei vielä todistettu). Keisarin nosto näkyy iPadilla → PK rivi KK:lle.
2. PARIISIN KOEALUE (omistaja 18.41 "Laita minulle kuva, kun uusi Pariisin kartta valmistuu uudella menetelmällä"): VS k3 a040721ea JU-jonossa (L1 paketin jälkeen),
   KS:n v2-katot Codexilla (c3e423429 + 574dd2173), NS yhdistää NUI:n esinekerroksen c60372ead VS:n päälle (natiiviseppa/koealue-esineet-218).
   Kokoaja VS → pari nykyinen | koealue 3 zoomilla isolta → PT → KK (vasta kun katot + esineet mukana). Osakirjasto proto-3d/_kirjasto/kartta-osat/ (KS).
3. Omistajan linjaukset 18.43–18.45 työlistassa (vastuu KK): "Kartan osat kaikkiin kaupunkeihin", "Kartta elää kevyesti kaikissa kaupungeissa",
   juoksupelin malli yleiskäyttöiseksi elävää historiaa varten (LAV/PK/VS ohjeistettu).
4. NUI animaatiot 6b891fd1d (Animaatiot.cs korvaa Veneet.cs:n) → JU:n simu → pari PT:lle → junalupa.
5. PK: arkihahmojen kytkentä (pelikuvapari: maljakko takaa, sirpaleet) ja al/am-ajot L2:lla (taso1b, otsikot) → PT.
6. LAV: Yangxinmenin päädyn värivaihtelu (latausjärjestys?) tarkistus.

## Opit
- Väärä tehtävänjako: koealueen osa C oli jo NUI:lla (c60372ead) – tarkista luovutukset ennen jakoa (NS huomasi).
- Iso paketti pidetään puhtaana: PK:n haarat tuovat 100+ committia → vain cherry-pick tai erillinen linja.
- JU:n "VUORO" L1/L2 jakaa JU itse (muisti esikatseluvuoro-ju-lta); PT vain järjestyksen, kun JU kysyy.
