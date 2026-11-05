# PT:n luovutus 3.11.2026 klo 17.25 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261103-1630.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md (PT local_8d8ebf72, KK local_d5f31591).
Tili sami.reivinen@vvi.fi (org ddaee6a2), viikko 2 %. Taulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.
Vahdit Monitorilla 30 min: `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep -E "ODOTTAA|TYHJÄKÄYNTI"` ja
`bash /Users/Shared/Claude/hooks/codex-posti-vahti.sh`. `date` ennen aikaleimoja. Ei jonokierros-cronia.

## Tehty tässä vuorossa
- TILINVAIHTO valmis 16.5x (loki, PR 6180, 6182–6185): tämän tilin 29.10. sessiot self-clearilla käyttöön; koe 10/10; tarkistin 0.
  ~/.claude/CLAUDE.md:ssä molempien tilien KK-id:t (omistaja 16.4x), tarkistin hyväksyy "local_… tilillä" -rivit.
- Raamattu 7.34 (TF vain omistajan pyynnöstä), 12.23 (PT tyhjentää itsensä KK:n pyynnöstä), 9.13 suorat aloitukset (PR 6191, 6192).
- Junaan: 218 VS sal11 769cb9ea6; 219 LAV saumat-v1 97ef79bd6. JU:n yhdistelmä c1a30e11f.
- Koe 9b9695a7d isolla tarkistettu: zoom, kyltit (pidetään, KS), reunat ok; palasauma + luoteiskulma = KS pala16/17 (Codex).

## AUKI (järjestys)
1. KAATUMINEN (omistaja 15.40): 44ecc31d1 kaatui bussi Lontoo → Pariisi + lähizoom (NUI 16.55); NS mittasi +410 Mt CPU (MVT-purku).
   JU ajaa 178f9da72 (44ecc + NS gc-mvt 2856c5cc3 + NUI muistiloki 1e5e36755) isolla 2× → NS/NUI/PT. Korkea pohja (keko 1,76 Gt) NS:llä.
   KK tietää, ettei korjattu. Pieneen ei asenneta ennen todistusta; pieni iPad ei käytössä tänään (omistaja lähti).
2. JU:n iso paketti 5d8e05273 (VS + NUI kuvamerkit + NS e1d619acf loppurajaus + KS 6cd9cf100 nimikerros) kaatumismittauksen jälkeen;
   pala16/17 takaraja 17.55. Todistus: luenta bussilla, saapuminen 0–20 s, 3 zoomia, kuvamerkit, ruutuajat → PT tarkistaa → KK.
3. PARIISIN KOEALUE striimikartan päälle (omistaja 16.51, suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-striimikartan-paalle.md):
   A KS valmis (Codex ab78cb4c0, 20 kuvaa; esinepaikat _tyo/karttaseppa/pariisi-koealue-20261103/); B VS (piirrostyyli ElavaTyyliin);
   C NUI kaatumisen + suorien aloitusten jälkeen.
4. SUORAT ALOITUKSET (omistaja 17.19, 9.13, suunnitelma …/20261103-testien-suorat-aloitukset.md): A NUI Testinäkymän osio,
   B JU skriptit + pienen iPadin raja, C NS muistivahti.
5. Juoksupeli: taso1b 34ece9356 KK:lle 17.2x (PT katsoi arkin 05). PK: salieste-häivytys e9d4526b8 → al-uusinta JU:n jonossa;
   Meridiaaniportin ajo epäonnistui (PK selvittää). Kamera A (räystäsnosto pois) kuitattu 16.4x.
6. LAV: pronssien kulta antiikkikullaksi v121 (Qianqingmen, 养心门, 宁寿门) → JU. Kasettikatto Codexilla.
7. LEVY (omistaja 17.0x "vapauttaa tilaa", tavoite ~80 Gi): 64 Gi 17.23. PT:n lokisiirto T7:lle (taustalla, skripti
   scratchpad-kansiossa siirra_lokit.py) lähes valmis; Sonnet-agentti listasi wt-kansion poistettavat →
   /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-fable/bfe367ad-7ff3-4fbb-bb04-91806b04d470/scratchpad/wt-poistettavat.tsv
   (jos valmis) → lähetä poistolistat rooleille (Raamattu 10.13; poistaa vain oma rooli). CoreDevice-välimuisti 14 Gt = omistajan toimi.
8. Codex: KK muistutti 17.0x (1edb7cf3d); Tripo arkihahmot työjaksossa 17–18 (8f48d8d8e).
9. Valoseppä: rakettivideo tauolla (08.51), ei aloiteta.

## Opit
- Toisen tilin sessiot eivät näy; uuden tilin omat vanhat sessiot tyhjenevät send_messagella "clear_session self" (tilinvaihto.md).
- paivita-kotikansiot.sh: --ohita ottaa pilkkulistan (`--ohita a,b`), toistettu lippu korvaa edellisen → Posti meni koti-haaraan; palautettu postivahti-haaraan.
- paivita-idt.mjs korvaa myös historiamerkinnät (osoitekirjan Päivitetty-rivi korjattu käsin).
