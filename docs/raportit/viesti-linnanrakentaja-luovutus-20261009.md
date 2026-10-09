# Linnanrakentajan luovutus 9.10.2026 (iltapäivä, konteksti 70 % → nollaus PT:n pyynnöstä)

Edellinen lokipohjainen luovutus on `viesti-linnanrakentaja-luovutus-20261005b.md`. Sen loppuosa on päivän tarkka loki: hashit,
SHA:t ja polut.

## Kesken (järjestyksessä)

1. **ND v8 ja KL v2b odottavat omistajan hyväksyntää.** PT vei LS2:n kuvat omistajalle: `proto-3d/lokit/linssiseppa2-omistaja4-173pbr2/omistajalle/`.
   - Osoitinta ei vaihdeta ennen hyväksyntää. Sen jälkeen LS2 vie ND v8:n uuteen kansioon v9 osoittimen `uusin-3.json` alle.
     Versiokansioita ei koskaan ylikirjoiteta. Juna 173 ja uudemmat lukevat uusin-3:a, 170–172 lukevat uusin-2:ta (v6b).
     LS2 pbr-173 a72f1ee21.
   - Kuvat omistajalle kulkevat vain LS2:n pelikuvina (kulma ja versio kuvassa) PT:n kautta.
2. **LS2:n hiontalista.** Nämä eivät estä hyväksyntää, mutta tee ne seuraavaksi:
   - ND: etelärannan kapealla kaistalla nurmen ja rantamuurin välissä näkyy Googlen latistettua harmaansinistä pintaa. Laajenna
     oma maa kaistalle tai leikkaus muuriin asti: `notre-dame-v1/lahde/alue.py` ja `maa.py`.
   - ND: ikkuna-aukot ovat 420 m:stä tasaisen tummia. Vaalenna syvennyksen pohja tai säleiden reuna, tai nosta lasimaalausten emissio
     keskiarvoon 0,15–0,2. Nyt se on 0,12 (`notre_dame.py` materiaali(), hehku-kerroin).
   - KL: katon aurinkopaneelit näkyvät yhä mustina raitoina. Ne ovat todellisia (SFV 2010–2023, lappeet sisäpihaan päin). Vaalenna
     sävyyn noin 60/65/75 ja aseta karheus noin 0,3 (`kuninkaanlinna.py` M['paneeli']).
3. **Olavinlinnan historia-animaatio (Siirtoseppä, arvio 6 tänä iltana).**
   - v46g on peilissä: `dioraama/olavinlinna/4d1977155f7b5ac5` (blender 479d1c874a6e6a93, v45b 3925de399).
   - Sisältö: ranta-1499:n kalliotäytön ankkuri rakennusten juurella on nyt −2,0 (aiemmin −5,4), ja koko kuoren alla on vesipohja
     −7,05 (v46f). Vuosileikkausten pohjilla on vesi −7,02 (v46c), ja pako-kellobastionin leikkaukset ulottuvat −7,5…8 (v46d).
   - Siirtoseppä: historiassa näkyvät ranta-1499 ja porttikaytava-T102 ilman sisätilaleikkausta. Vain-1499-leikkaukset leikkaavat vain
     y −2,0:n yläpuolelta.
   - Jos mustaa näkyy vielä, Siirtoseppä ehdottaa PT:lle vaihtoehtoa B: b1499-rakenteet näkyvät historiassa alusta asti. Suosittelin sitä.
   - Siirtoseppä kytkee hashit itse. Vientikaava: `scratchpad/vie46b.zsh` (`source ~/.zshrc` + vie-blender.sh), sitten blender.json
     commit/push ja `gh workflow run vie-dioraama.yml --ref linnanrakentaja-linna-v45b -f rakennus=olavinlinna -f kuiva=false -f osoitin=false`.
   - Kävelyosan muutos: kavely.py rakennetaan väliaikaiskansioon. Kopioi vain muuttunut osa v3:een → `leivo_kavely.py -- v3
     ../olavinlinna-blender-v44/ulkokuori/ulkokuori_normaali.glb <osa> --pohja 0.3` → astc-mip.swift (valot/<osa>.jpg ja -512) →
     kopioi v44/kavelyyn. Yhdistä osat.json:iin vain kolmiot, rajat ja muistiarvio. Leikkausten vuodet säilyvät nyt lähteessä.
4. **Voudin MetaHuman-päähine ja jatko myöhemmin.** v2 on latautunut pelissä virheittä (Siirtoseppä). Ilmeiden lähikuva puuttuu, koska
   simuajot on rajattu.
5. **Prefektuuri v1.1** on LS2:n putkessa (vienti28) ja näkyy ND-kuvissa. Avoimia pyyntöjä ei ole.

## Päivän tärkeimmät tekniset ratkaisut (uusi seuraajalle)

- **PBR-pinnat:** `_valmiit/kaupunkipinnat-v1/lahde/pbr.py` tuottaa pinnat harkko, arkki ja rappaus (4 m saumattomat 1024²: väri +
  `_nor` + `_orm`). Liitäntä tehdään `pbr_kytkin.kytke(M[..], nimi)`:llä. Pinnat ovat käytössä ND:ssä, KL:ssä ja prefektuurissa.
  OmaMalli lukee baseColorin junassa 172, normal ja MR tulevat junassa 173.
- **Kaukokuvan sävyerot:** `syvyys.leivo(..., saa_voima, ruudukoitavat, lyijy_nimet)`. COLOR_0 kerrotaan albedoon, ja 4 m:n
  tekstuuri sulautuu 300 m:stä yhdeksi sävyksi, joten isot sävyerot pitää tehdä verteksiväreihin. Verkko tihennetään 2 m:n välein.
- **KL v2b:** tiukka leikkaus (`alue.py`): rakennuksen pohja + 1,5 m ja sisäpiha, etelä–itä-sektorissa 8 m Googlen telineseinän
  takia. `TIUKKA = True`: Logårdenin tukimuuri ja rampit on poistettu. Sävy varmrosa 223/185/164 (SFV, SVT 2016).
- **ND:** korttipuut ovat instansseja (LS2 laskee rajauksen muunnoksineen, 2f641e53c). Puistot ovat nurmea ja sorakäytävää. Kellokerroksessa
  on säleet. Kaikki katot ovat lyijyä.
- **tyhja-saari v2c:** leivottu 2048² mantereen sävyin (`olavinlinna-vaiheet-v1/lahde/tyhja_saari.py`).
- **Kappelin alttari ja keittiön noki (v46b):** `sijoittele.py` KASIN-lista. `codex.py -- --vain <tunnus>` päivittää yhden esineen.

## Säännöt, jotka opittiin tänään

- **Unreal on auki vain työn ajan** (omistaja): avaa itse ja sulje heti. Editori kuormittaa GPU:ta TF-käännösten aikana.
- **Ämpärilataus:** vie-blender.sh tarvitsee `source ~/.zshrc`. Pelkkä avaimet-koodaus.zsh ei riitä.
- **Ei `rm` muuttujapoluilla**, ei edes scratchpadissa. Käytä literaalipolkuja.
- **Kaupunkimallien kuvat omistajalle** otetaan vain pelistä LS2:n kautta, ei renderöintiluonnoksia.
