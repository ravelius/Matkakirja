# Karttaseppä: luovutus 3.11.2026 klo 23.00 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-2232.md. Syy: konteksti 25 % (7.37).
Y = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/` (python `/opt/homebrew/opt/python@3.14/bin/python3` ilman -I:tä),
R = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nahtavyydet-20261103/`. Codex-posti kuten ennen: wt/karttaseppa-postilaatikko, `git fetch` + `git checkout --detach origin/claude/postilaatikko`.
**Aja heti vahti uudelleen:** `Monitor` komennolla `zsh Y/vahti.zsh` (toimitukset `R/*/_review-*/SHA256SUMS`, taustaajot pid 65143 ja 68441). Vahti kertoo myös jo tulleet.

## PT:n voimassa olevat käskyt
- **Vain G:n päänähtävyydet (9):** Louvre, Eiffel, Riemukaari, Sacré-Cœur, Opéra, Grand Palais, Invalidit, Panthéon, Montparnasse. HdV, Oikeuspalatsi ja TSJ PERUTTU (SEIS 026cef3ca, `PERUTTU.md`); jos niistä tulee toimitus, sitä ei käytetä.
- Jokaisesta pari G:tä vasten PT:lle; KK hyväksyy; hyväksytty taso + alue.json NS:lle suoraan. Koko saa nousta kohti G:tä, jos pohjoiseen on tilaa; taso sovitaan NS:n kanssa.
- Siltaosa (tilattu) nähtävyyksien jälkeen: pari mallia vasten PT:lle; kirjastoon; NS sijoittaa OSM:stä.
- Korttelipinnassa autetaan VS:ää, mutta nähtävyydet ovat etusijalla.

## TEHTY
1. Tilaukset: f67823281 (1, 5–10), 30c0fffac (Grand Palais, Montparnasse, silta-arkki). Generaattorit Y/tee-nahtavyystilaukset.py, Y/tee-siltatilaus.py.
2. **Työkalu Y/istuta-nahtavyys.py** `<id> <kuva> <ulos> [lat lon] [--dx] [--dy] [--skaala]`: alfa ≥ 128 + siivous, skaalaus, alfan alareunan keskikohta (768, 880), savysovitus-2029, alue.json (NS:n alue_kuva-muoto), `-vs-G.jpg`, vesitesti OSM:stä (kaikki vesi + alin 120 px). +dx itään, +dy etelään. Ulos Y/tarkistus-nahtavyydet/<id>/.
   Skaala: G:n korkeus × 2,625 (sama kerroin kuin ND:llä) ÷ toimitettu korkeus. Codexin koko heittelee (Louvre +20 %, Riemukaari +59 %), joten skaalataan aina. Laajempaa pohjaa ei ole ND:n pohjan ulkopuolella (vaalea paperi + vesi); koko Pariisin kuva tulee VS:ltä.
3. **Louvre** (#1955): KK hyväksyi; `--skaala 0.91 --dx -60 --dy -30`, vesi 0 px, ND:n kanssa 0 px, viesti NS:lle 22.5x.
4. **Eiffel** (`--dx 30 --dy 30`, skaala 1,0; yläosa peittää takana olevaa Seineä, alin 120 px 0 px) ja **Riemukaari** (`--skaala 0.71`, vesi 0 px): parit PT:lle 22.5x, KK:n vastaus odottaa.
5. **Korttelipinta k5** Y/tarkistus-a2-k5/k5.png (Y/kortteli-k5.py k4-siirto.png:stä, ei ottoa; TARKISTUS-a2-k4.md): viesti VS:lle ja PT:lle.

## AVOIN (järjestyksessä)
1. Toimitukset jonossa: Sacré-Cœur, Opéra, Grand Palais, Invalidit, Panthéon, Montparnasse, silta-arkki. Sacré-Cœur skaala: 122 × 2,625 ÷ korkeus; muut samoin (G_BOX työkalussa). Ankkuri on arvio: tarkista vesi ja kohta.
2. KK:n vastaus Eiffel + Riemukaari → hyväksytyt NS:lle.
3. Silta-arkki: ei ole työkalua. Leikkaa ruudut 512 × 512, tarkista suunta ja pituus, vie kirjastoon (osakirjasto.py).
4. VS:n vastaus: jakoehdotus (KS pinta, VS julkisivureuna, muste, terävyys, saumat) ja k5:n pelikuva. Säätö: kortteli-k5.py voima ja muste. Heikkous: k4:n kehäkorttelit ovat isompia kuin 2029:n talot ja pihan kehä näyttää kehykseltä; muoto vaatisi uuden pohjan ja oton → kortti/PT.
5. Taustaajot: tasankoketju pid 65143 (ketju.valmis / ketju.virhe), esittelypaikkasilmukka pid 68441. ajo-muut.log loppui 22.42 Overpass 502 -virheisiin; tarkista, jääkö ajo vajaaksi. Jatkot edellisen luovutuksen AVOIN 3.
6. Vanhat: v7/v8 iso-pari (JU), pitkät ruudut.
