# Päätoimittajan luovutus 23.10.2026 klo 15.00 (konteksti 30 %; tili vvi@vvi.fi, viikko 8 %)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen luovutus -20261023-1245.
Postiworktree: /Users/Shared/Claude/wt/fable-posti-0945 (detach origin/claude/postilaatikko, push "HEAD:refs/heads/claude/postilaatikko").
Asemataulun tiedostot: Matkakirja-fable/scratchpad/asemataulu/data/talo/{tyolista,junat}.json (.tmp + os.replace + copymode);
junat.json tekstissä VAIN osiot "Valmiina:" ja "Työn alla:" (muu otsikko → Asemataulu ESTO). Päivityksen jälkeen viesti Asemataululle.
Omistaja matkalla ma 26.10. asti. Päätökset 13.15–14.59 kirjattu lokiin: PR #5191 (JU mergeen).

## 1. JUNA 210 — omistajan JULKAISUPYYNTÖ 13.39
Ennen TF:ää grafiikan kuvapari + juoksupelin alkulennon video KK:lle → omistaja hyväksyy → vasta sitten JU vientiin. NS ja JU tietävät.
- Runko 560dd9cd8 vihreä. 4ec6d90af = + VS grafiikka-210 c58151fce (k7) + Lavastaja k1b 45a33c41a + NUI logo-210 6462b9be6. VIHREÄ testeissä,
  mutta f48e753f8 (ilman logoa) oli iPadilla PUNAINEN: J 17,13 ms (raja 14), A 14,38. Syy todennäköisesti VS:n k6-varjo (18 näytettä).
  VS:n kevyt varjo d1dac3bd8 → NS:n (c) 9fa844838 = 4ec6d90af + kevyt; (a) 896324b61 = 560 + Lavastaja. LT mittaa → TULOS ODOTTAA.
- Ämpärissä (JU): kielletty-rakennukset-v13, kielletty-tausta-v19, avoimet-v16 (Lavastajan väreily, kattosuikaleet, juhlasalin lattia).
- HYVÄKSYTTY, menossa NS:lle: NUI symbolit-210 32940975b (Kiinan dynastiat, Shakki); Takaisin-napin poisto (logo-210).
- PK alkulento-210 15965b67c hyväksytty (lento, kiihdytykset, 3-2-1, vuosi 1914). PÄÄLLE TULOSSA:
  a) NUI: EB Garamond SemiBold -näyttötyyli (omistaja 14.59) tekstit 2 ×, 3-2-1 3 × PK:n haaran päälle → kuva-arkki PT:lle.
  b) PK: latauskuvaan #824 "Viimeinen keisari" (T7 …/juoksupeli-otsikko-824825-20261021/delivery/01-viimeinen-keisari.png, JU ämpäriin)
     + #825 karkuteillä vinosti; #890 kokonimilogo EI käyttöön (omistaja 14.5x). Kuvapari PT:lle.
- VÄÄRÄ LOGO (omistaja 14.54): NUI palauttaa aloitusportin MATKAKIRJAn (revert logo-210:ään, SHA NS:lle) ja suurentaa LATAUKSEN aikana
  näkyvän logon (LaunchScreen/aloitusverho). Kuvapari KK:lle; EI junaan ennen omistajan kuittausta.
- VS k8b 9c4648d6b (marmori.jpg-täplät pois varjostimessa, aukion läiskät) → simutarkistus kierros2/k8b-3927fe529/, sitten junaan.
- Myöhemmin: PK napit 087ad452d, Äänittäjän kohahdus (tilanne tarkistamatta tänään).
- Kartan saapumislento ei estä junaa (vanha vika; a4b5c9cba huononsi, ei junassa).
- Kun kaikki koottu: LT J-kierros + JUOKSUPELIN alkulento iPadilla (LT on tähän asti mitannut kartan saapumislentoa).

## 2. Muut käynnissä
- Valoseppä: rakettivideo 870e873ce (sininen hetki, valas näkyy); korjaa lähikuvien valotuksen, sitten peli vs. video -pari → KK.
  Omistajan 13.5x päätös: kaikki 5 parannusta + hämärä alku + vertailu NASA/Commons-kuviin.
- Codex: harjakoristeet 884–885 (Chrome-yhteys Tripoon poikki, Codex tekee pohjakuvat; posti 5c6bfda53); symbolit toimitettu.
- Levy: NS siivosi CoreDevice AppInstallationBinaryDeltas (74 Gt), vapaana ~150 Gt; proto-kaanna.sh pitää vain uusimman app-kopion.
  Välimuisti kasvaa joka iPad-asennuksesta → siivous ajoittain (selvitys proto-3d/lokit/natiiviseppa-levy-20261023-1450.txt).
- Natiivi-UI: Kolme veljestä odottaa omistajan kommentteja.

## 3. Opit tältä päivältä
- Tarkista kuvaparista, MIKÄ ruutu on kyseessä, ennen kuittausta (väärä logo meni läpi). Vuosiluvut ja faktat lokista, ei Raamatun
  yleiskuvauksesta (1923 vs 1914). Blender-kuva ei todista pelin väreilyä.

- LISÄ 15.0x: omistaja 14.59 "Ota musta tausta pois" → alkulennon tekstien ja 3-2-1:n tumma läikkä pois, kirjaimiin kevyt varjo (NUI:lla, KK välitti).
- LISÄ 15.1x: NUI portin logo ennalleen be778b1bc (NS runko eb2dea5e7); latauslogo natiivi-ui/latauslogo-210 624f3c006 (LogoOsuus 0.3 → 0.8), kylmäkäynnistyskuvat tulossa → KK:lle omistajan kuittaukseen. Logon lähde vain 720 px: iPadille terävä n. 1600 px versio Codexilta, tilaa kun omistaja on kuitannut koon.
- LISÄ 15.1x: omistaja 15.0x "Ei mitään varjoa. Valitse tekstin väri niin että erottuu" KORVAA varjon: alkulennon teksteissä ja 3-2-1:ssä ei taustaa eikä varjoa, erottuvuus pelkällä värillä (NUI:lla, KK välitti).
