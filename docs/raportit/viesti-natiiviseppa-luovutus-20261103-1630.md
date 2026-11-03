# Natiivisepän luovutus 3.11.2026 klo 16.30 (tilinvaihto, PT 16.26; 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1622.md (sen TILA-osio on yhä voimassa
sellaisenaan: haarat, worktreet, simuketju, lukot, testit, poistettavat luovutus-worktreet; lue se myös: `git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä eikä omaa koodimuutosta commitoimatta.
Cron Unity-beeta luotu tässä sessiossa (b6d95de6) – nollauksen jälkeen luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).

## TEHTY TÄLLÄ VUOROLLA (16.25–16.30)
1. **Vieritys reunat ON valmis** (JU:n ketju 6da58f32b, lokit/natiiviseppa-fps-vieritys-6da58f32b-reunat-on-ipad-20261103-1612/liikeruudut.txt):
   kauko 1,0 % myöh. max 42 | keski 1,0 % max 41 | lähin 0,7 % (max 2594 = iPadin oma keskeytys applicationWillResignActive,
   konsoli r. 1658; muuten 24 ms) | zoom 0,5 % max 42. Vertailu aiempi ajo 029f984c8 14.34: kauko 2,4 / keski 0,2 / lähin 0,1 / zoom 0,4 %.
   → reunat on ei hidasta liikettä merkittävästi (keski/lähin hieman enemmän 41 ms -ruutuja). Pitkät ruudut 100–170 ms:
   ruudut 1003, 1005, 5531–5532 (PiirrosKerros.Purku 5–17 ms + EarlyUpdate 139 / Update 153 / PostLateUpdate 64–70 ms) ja 5546 (Laattapalvelin 90 ms).
2. **xctrace jää jumiin** aikarajan jälkeen ("Reached specified time limit, ending recording..." mutta prosessi elää, 0 % CPU):
   on-ajo seisoi 16.19–16.27, purettu `kill -INT <xctrace-pid>` → rc=0, ajo jatkui hakuun. Sama todennäköisesti 15.14-ajossa (429b75faf, ei rc-riviä).
   KORJAUS TEKEMÄTTÄ: ajo-laite.zsh:n `wait $XP` tarvitsee aikakatkaisun (esim. odota XT+60 s, sitten kill -INT).

## KESKEN (ei omaa prosessia; JU:n ketju jatkuu itsestään)
- **Reunat POIS -ajo käynnissä** 16.27 alkaen (JU:n Bash-ketju, iPad-lukko natiiviseppa pid 25863; loki
  /Users/Shared/Claude/julkaisija-tyokalut/vieritys-6da-pois.log, kansio lokit/natiiviseppa-fps-vieritys-6da58f32b-reunat-pois-ipad-20261103-1627).
  Jos ajo.log seisoo "ruutu"-rivillä ja xctrace.log sanoo "Reached specified time limit" > 1 min: `pkill -INT -f "xctrace record.*reunat-pois"`.
  Valmis = "VIERITYS VALMIS" lokissa → vertaa liikeruudut.txt on vs pois → PT ≤ 3 riviä (jonon kohta 1).

## JONO (järjestyksessä)
0. **UUSI PT 16.4x: Pariisin saapumisen loppurajaus lähemmäs** keskizoomin tasolle, jossa piirros näkyy täysin (f4334cbfd:llä täysi
   ~10,8 km ruudun leveys isolla iPadilla vaakana; keski 0.06 = 7,2 km täysi). Häivytystä EI löysennetä. Rajaus 3 kohteeseen on
   NUI:n 374582ef4 + c6c7cfd85 → sovi NUI:n kanssa (Natiivi-UI, id osoitekirjasta) kumpi muuttaa ja missä haarassa. Nykyinen loppurajaus:
   kohteet ≤ 12 km + 25 % reunat (natiiviseppa/loppurajaus-218) = laajan kokoinen → piirros lähes näkymätön. Todistus: saapuminen
   0–20 s kuvasarjana iPadilla JU:n vuorolla → PT.
1. Reunat pois -tulos (yllä KESKEN) → PT.
2. JU:n seuraava koe f4334cbfd + c5baa2fa7 (+ 693cf437f, 9d1ce79e5, ad08abe9a, 582fc208e): PiirrosKerros-osamerkinnät pitkissä
   ruuduissa, mip-varoitukset 0, pisin ruutu vs 693cf437f 140 ms, kuvat 3 zoomista → PT ≤ 3 riviä.
3. f4334cbfd:n koko tarkistus `zsh tyokalut/tarkista.sh` wt/proto-natiiviseppa-haivytys:ssä, kun simu/käännös vapaa (16.25 Unity
   -batchmode käynnissä PK:n esikatselussa).
4. xctrace-aikakatkaisu ajo-laite.zsh:hen (yllä kohta 2).
5. Vanhan jonon kohdat 2–5 ennallaan (354 ms PostLateUpdate → xctrace; osa D NUI:n A+C jälkeen; GC-haara vasta PT:n luvalla;
   odottavat). Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Kuten 16.22-luovutuksessa. Uusi worktree: wt/natiiviseppa-luovutus-20261103-1630 (saa poistaa mergen jälkeen).
