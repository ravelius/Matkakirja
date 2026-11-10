# Natiivisepän luovutus 10.11.2026 klo 16.35

Edellinen: -1435 (71236a21e, haara natiiviseppa-luovutus-20261110-1435) KOKONAAN VOIMASSA paitsi alla päivitetyt kohdat; lue se ensin
(`git show 71236a21e:docs/raportit/viesti-natiiviseppa-luovutus-20261110-1435.md`). Syy: kontekstivahti 25 % (7.37). Älä poista mitään.

## TEHTY TÄLLÄ VUOROLLA
- Cron luotu (sessiokohtainen, luo uudelleen): "4 9 * * *" → /opt/homebrew/bin/python3.14
  /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py (OIKEA POLKU: tyokalut/, ei _tyo/; ilman -I:tä); UUSI → PT "UNITY UUSI: …".
- Ajovahti: Monitor `bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/ajovahti/vahti.sh` (30 min, uudelleen aseteltava). Korjattu: olemassa
  olevat ajot merkitään alussa (ei ALKOI/HILJAA-toistoa), kuviot + tahdistus-1c + natiiviseppa-marseille-*. KÄYNNISTÄ seuraajana.

## KÄRKI: MARSEILLEN STRIIMIKARTTA – TILANNE
Striimikartta = elävä kartta (Laattapalvelin.Elava.cs: Z11–Z17 piirretään laitteella Z9/Z10-pohja + OpenFreeMap-vektoripala).
1. NUI:n Mac-vertailu ef774d9fd EI ollut sama korkeus: Marseille vain 30–120 km (nimizoom-katto), Barcelona b-0 1,7 km. Samoilla korkeuksilla
   Marseille (m-3 30 km) näyttää tiet kuten Barcelona (b-1). "Laatta-aukko"-hypoteesi ei saa tukea.
2. Vika TOISTUU 1,7 km:ssä: iPad fb16ab5de-u m-2 ja NUI:n Mac zoomaus-1 fb16ab5de (_tyo/natiivi-ui/kaupunkinimi-zoomaus-1-marseille-ennen-jalkeen.png):
   tasainen beige = vain Z10-pohja suurennettuna, elävät palat eivät piirry. iPadilla pallo 57,9 % yli 2 min, EI yhtään "palvelin virhe"- eikä
   "elävä kartta: …"-virheriviä; esilataajan kuvissa "Request timeout" (verkko hidas siinä hetkessä).
3. Data kunnossa: OpenFreeMap planet 20261101 Marseillen z13/z14 = 200 (170–600 kt); pohjasarja vain z9–z10 kaikissa kaupungeissa (z11+ = elävä).
   Kartta-testit ElavaPurkuKoe (f2fe729b1): Marseillen 9 + Barcelonan 4 tuoretta palaa purkautuvat ja piirtyvät, 0 poikkeusta, 54–151 ms.
   → Vika on lataus-/piirtoputkessa tai Cesiumin pyynnöissä, ei datassa eikä jäsentimessä.
4. "Vuotavat paikat" EI todennäköinen: käynnissä-luku sisältää luokittelemattomat näkyvän jonon ja esijonon haut (Lataa ilman luokkaa), ja
   nälkä163b on istunnon KUMULATIIVINEN laskuri. Lataa-korutiinia ei pysäytetä missään (ei StopCoroutine), timeout 15 s × 3.
5. DIAGNOSTIIKKA b4ea8d380 (haara natiiviseppa/marseille-striimi, wt /Users/Shared/Claude/wt/proto-selvittaja-marseille, juna-224 89b687706 päällä,
   natiivi-backup, unity 0): "MATKAKIRJA elävä tila: elävä kesken N (näkyviä), piirto vapaana a/b, näkyvä odottaa, mvt jonossa/haussa, purku,
   piirretty/levyltä/virheitä | palvelin <JonoTila>" 5 s välein kun näkyvää odottaa (≤ 200 riviä), sama ElavaTila VARTIJA-riveillä.
6. AJO JU:lle lähetetty 16.33 (kuittausta ei vielä): Mac f2fe729b1, skenaario _tyo/natiiviseppa/marseille-striimi/sk-marseille-mac-1.txt
   (matkalento 1,7 km Marseille + Barcelona, kuvat 5/20/60 s, pallo pyynnot paalle) → lokit/natiiviseppa-marseille-mac-1-f2fe729b1.
   LUE: tilarivit ja "elävä pyyntö/vastaus" Marseillen paloille (z13 ≈ 4218/3001, z14 ≈ 8436/6002). Mahdolliset haarat:
   a) pyyntöjä ei tule (Cesium ei pyydä z11+ → katso SSE/maxLevel/kaupunkinäkymän tila), b) piirto kesken/odottaa (semafori, vanhemman haku
   jonossa), c) mvt jonossa (ElavaVerkkoPaikat 6, kiire). Korjaa → OK-ehto: Marseille katuverkko isolla iPadilla (JU:n vuoro) myös hidastetulla
   verkolla → ilmoita NUI:lle (poistaa korttipoikkeuksen, NUI 3e8796b49 avaa nyt Marseillesta kortin) + PT:lle 3 riviä (syy + sha).
7. Omistaja 16.18: "download ongelma" mahdollinen; verkon hidastus: tarkista Raamatusta/JU:lta sallittu tapa (ei asetusmuutoksia itse).

## MUUT (ennallaan -1435:stä)
britannia-2-kylma, kertoja-esilataus, PE (0421, 4444, kehys-pe-juna224-1) PK7:n jälkeen, OX/OC/OC2 matalimmalla, tahdistus-puhdas d834e0623 (MR19 tarkistus).

## VIESTIT TÄLLÄ VUOROLLA
JU: ajopyyntö marseille-mac-1 (16.33). PT: ei vielä (kärjen syy ei valmis).
