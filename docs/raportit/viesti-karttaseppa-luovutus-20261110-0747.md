# Karttaseppä: luovutus 10.11.2026 klo 07.47 (KS)
Syy: konteksti 26 % (PT 07.5x), luonteva väli: [210] ei aloitettu. Korvaa -0625:n.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `B=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/`

## UUSI TYÖTAPA (PT 07.4x, omistaja 07.40): TYÖLISTA ON JONO
`T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py`
- `python3 -I $T seuraava KS` → nyt + seuraavat. `tehty "OTSIKKO" "mitä, sha, kuvat"` → seuraava nousee → ALOITA HETI.
  `este "OTSIKKO" "syy"` → seuraava nousee. Rivi PT:lle kuten ennen.
- Sisältötekstit (kysymykset, selitteet) hyväksyy KK, ei omistajan kortti: tuo PT:n kautta KK:lle (PT 07.4x).

## VALMIIT TÄSSÄ VUOROSSA
1. PR 6536 (Lontoon juttukuvat) mainissa 1b8d975ca.
2. PR 6537 (Pariisin 15 kuvaselitettä 8 juttuun, selite 12 sanatarkasti) mainissa 7f2f8cd91. Pariisin 22 kysymystä olivat jo
   datassa (#6531, #6532). Kaappaus: `$B/pelinakyma/juttukuvat-pariisi.mjs` (kuvat pariisi-selitteet-0629/).
3. Lontoon tekstit `$B/lontoo-tekstit-kortille-20261110.md` (16 kysymystä + 15 selitettä datassa, tarkistettu sanatarkasti;
   2 uutta Richmond Parkille) → omistaja 07.36 KELPAA → PR 6541 mainissa 55fd2d1ab (poikkeuslista -1). Työlistalla "tehty".
4. [208] Louvren korttelit → este (ei KS-tuotosta; haamukuva VS + S-G-l'Auxerrois-kysymys), PT 07.5x.

## TYÖN ALLA / JONO
0. **[210] Lontoo samalla toteutuksella (NYT, PT 07.5x)**: talokone + korttelit Lontoon nähtävyyksien ympärille kuten Pariisissa.
   ENSIN rajaus + Mac-kuva PT:lle. Aloita: `seuraava KS`, Pariisin toteutus (Louvren/ND:n korttelit, Raamattu 2.206,
   muisti kaupungit-koodilla-talokone), Lontoon nykytila (koe7 Lontoo ok; palat lontoo/palat-d11-katot-koe7).
a. **Koe7 iPad-pari (työlistalla "odottaa")**: iPadilla koe6 = koe7 pikselilleen, lähikatot litteät toisin kuin Macilla samalla
   kameralla. Kuvat `$K/kuvat/a/pt/pari-pariisi-ipad-koe6-koe7-lahi-{45,70}.png`, analyysi `$K/ipad-pari-koe6-koe7-20261110.md`.
   PT 06.5x: koe7 EI junaan. JU:lta pyydetty 06.5x Documents-palojen koot + md5 (odotus koe6 2918988 t cb1803911e7d80bdd980d7b147b3c7d6,
   koe7 2919204 t 6cce06f4dbac762b627d544911a8afe0; tiedosto 15_16596_11270.bytes). Vastaus ei ollut tullut 07.47.
   - Koot väärin → kopio uusiksi JU:lla (uudet kansionimet, esim. talopalat-pariisi-koe7b) → uusi pari.
   - Koot oikein → syy b: Mac-ajo ILMAN `maasto siirtyma` (JU:n vuorolla) → uusi pari PT:lle.
   - Tarkistettu: TaloKerros.cs (b804a87d6) ei tee tasoja eikä välimuistia talopaloille (yksi verkko per pala), joten sama data
     piirtyy samoin → kansioiden sisältö on todennäköisin syy.
b. **Levysiirto NAS:lle (PT 06.4x)**: skripti `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/siirto-worktreet-20261110.sh`
   (rsync → diff ilman ._-tiedostoja → git worktree remove), kohde NAS-Homes/…/Matkakirja-arkisto/karttaseppa/worktreet-20261110.
   07.47: siirretty 4 (lontoo-juttukuvat, lontoo-kyltit, luovutus-0457, luovutus-2144; 1,6 Gt kukin); luovutus-0625 jäi
   (katkenneen rsyncin .tmp-jäämä NAS:lla, aja uudelleen lopuksi); käynnissä (pid 52470) loput 8: pariisi-mallinostot, tf-talot,
   proto-karttaseppa-{lontoo-oikea,nostokysymykset,sade-220,talot,tietonapautus,yhteinen}. Loki scratchpadissa (häviää):
   tarkista `ls /Users/Shared/Claude/wt/ | grep karttaseppa` ja aja skripti uudelleen (rsync jatkaa, puuttuvat = PUUTTUU).
   JÄÄVÄT: karttaseppa-katot-koe7 (kesken), karttaseppa-postilaatikko (vahti käyttää), tämän luovutuksen worktree.
   Valmis → rivi PT:lle: montako, paljonko (Gt).
c. Nimiotto Lontoolle: KK:n vastaus (PT:n kautta) → PK:lle (ennallaan -0625 c).

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Monitor tappaa komennon 30 min kohdalla: pitkät ajot `run_in_background`-Bashilla, ei Monitorilla.

## LISÄYS 07.5x (PT, tuli nollauksen aikana) — TEE ENNEN [210]:n kuvaa
- **KK:n Pariisi-pino, kysymys 5**: "Pariisin tarkka alue ylhäältä ilman lohkon rajoja (koe 7.11. 11.3x) – jatketaanko?"
  Korttiaineisto tuotantopohjan `kysymys-omistajalle.md` mukaan tiedostoon
  `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/pariisi-pino-20261110/5-tarkka-alue.md`
  + YKSI pari (≤ 2000 px, laitekuva), luvut, aiemmat päätökset, suositus. VAIN olemassa olevista kuvista (ei uusia ajoja).
  ("Lontoon 2 kysymystä ensin" = PR 6541, jo mainissa 55fd2d1ab.) Työlistalla "odottaa: Pariisin tarkka alue neliöksi?".
